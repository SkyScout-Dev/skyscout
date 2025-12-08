import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AMADEUS_API_KEY = Deno.env.get('AMADEUS_API_KEY');
const AMADEUS_API_SECRET = Deno.env.get('AMADEUS_API_SECRET');

// Cache for access token
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    console.log('Using cached access token');
    return cachedToken.token;
  }

  console.log('Fetching new access token from Amadeus');
  
  const response = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_API_KEY!,
      client_secret: AMADEUS_API_SECRET!,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to get access token:', error);
    throw new Error(`Failed to authenticate with Amadeus: ${error}`);
  }

  const data = await response.json();
  
  // Cache the token (expires_in is in seconds, subtract 60s for safety margin)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  console.log('Successfully obtained access token');
  return data.access_token;
}

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  travelClass?: string;
  currency?: string;
  maxResults?: number;
}

async function searchFlights(params: FlightSearchParams) {
  const token = await getAccessToken();
  
  const searchParams = new URLSearchParams({
    originLocationCode: params.origin.toUpperCase(),
    destinationLocationCode: params.destination.toUpperCase(),
    departureDate: params.departureDate,
    adults: String(params.adults || 1),
    currencyCode: params.currency || 'USD',
    max: String(params.maxResults || 10),
  });

  if (params.returnDate) {
    searchParams.set('returnDate', params.returnDate);
  }

  // Map travel class to Amadeus format
  if (params.travelClass) {
    const classMapping: Record<string, string> = {
      economy: 'ECONOMY',
      premium_economy: 'PREMIUM_ECONOMY',
      business: 'BUSINESS',
      first: 'FIRST',
    };
    searchParams.set('travelClass', classMapping[params.travelClass] || 'ECONOMY');
  }

  const url = `https://api.amadeus.com/v2/shopping/flight-offers?${searchParams.toString()}`;
  console.log('Searching flights with URL:', url);

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Flight search failed:', error);
    throw new Error(`Flight search failed: ${error}`);
  }

  const data = await response.json();
  console.log(`Found ${data.data?.length || 0} flight offers`);
  
  return data;
}

// Parse Amadeus duration format (e.g., "PT6H15M" to "6h 15m")
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;
  
  const hours = match[1] ? `${match[1]}h` : '';
  const minutes = match[2] ? ` ${match[2]}m` : '';
  return `${hours}${minutes}`.trim();
}

// Transform Amadeus response to our format
function transformFlightOffers(amadeusData: any) {
  const dictionaries = amadeusData.dictionaries || {};
  const carriers = dictionaries.carriers || {};
  
  return amadeusData.data.map((offer: any) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    const carrierCode = firstSegment.carrierCode;
    const airlineName = carriers[carrierCode] || carrierCode;
    
    return {
      id: offer.id,
      airline: airlineName,
      airlineCode: carrierCode,
      departureTime: firstSegment.departure.at.split('T')[1].substring(0, 5),
      arrivalTime: lastSegment.arrival.at.split('T')[1].substring(0, 5),
      departureCity: firstSegment.departure.iataCode,
      arrivalCity: lastSegment.arrival.iataCode,
      departureDate: firstSegment.departure.at.split('T')[0],
      arrivalDate: lastSegment.arrival.at.split('T')[0],
      duration: parseDuration(itinerary.duration),
      stops: segments.length - 1,
      price: parseFloat(offer.price.total),
      currency: offer.price.currency,
      flightClass: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin?.toLowerCase() || 'economy',
      numberOfBookableSeats: offer.numberOfBookableSeats,
      segments: segments.map((seg: any) => ({
        departure: seg.departure,
        arrival: seg.arrival,
        carrierCode: seg.carrierCode,
        flightNumber: seg.number,
        aircraft: seg.aircraft?.code,
        duration: parseDuration(seg.duration),
      })),
    };
  });
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
      throw new Error('Amadeus API credentials not configured');
    }

    const { origin, destination, departureDate, returnDate, travelClass, currency, adults } = await req.json();

    console.log('Search request:', { origin, destination, departureDate, returnDate, travelClass, currency });

    if (!origin || !destination || !departureDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: origin, destination, departureDate' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const amadeusData = await searchFlights({
      origin,
      destination,
      departureDate,
      returnDate,
      travelClass,
      currency,
      adults,
      maxResults: 20,
    });

    const flights = transformFlightOffers(amadeusData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        flights,
        meta: {
          count: flights.length,
          currency: currency || 'USD',
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in search-flights function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
