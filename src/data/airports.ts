export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  // United States
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", country: "USA" },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "USA" },
  { code: "DEN", name: "Denver International", city: "Denver", country: "USA" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "USA" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "USA" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International", city: "Atlanta", country: "USA" },
  { code: "MIA", name: "Miami International", city: "Miami", country: "USA" },
  { code: "BOS", name: "Logan International", city: "Boston", country: "USA" },
  { code: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "USA" },
  { code: "MCO", name: "Orlando International", city: "Orlando", country: "USA" },
  { code: "PHX", name: "Phoenix Sky Harbor International", city: "Phoenix", country: "USA" },
  { code: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "USA" },
  { code: "EWR", name: "Newark Liberty International", city: "Newark", country: "USA" },
  { code: "MSP", name: "Minneapolis-Saint Paul International", city: "Minneapolis", country: "USA" },
  { code: "DTW", name: "Detroit Metropolitan", city: "Detroit", country: "USA" },
  { code: "PHL", name: "Philadelphia International", city: "Philadelphia", country: "USA" },
  { code: "CLT", name: "Charlotte Douglas International", city: "Charlotte", country: "USA" },
  { code: "SAN", name: "San Diego International", city: "San Diego", country: "USA" },
  { code: "TPA", name: "Tampa International", city: "Tampa", country: "USA" },
  { code: "PDX", name: "Portland International", city: "Portland", country: "USA" },
  { code: "HNL", name: "Daniel K. Inouye International", city: "Honolulu", country: "USA" },
  
  // United Kingdom
  { code: "LHR", name: "Heathrow", city: "London", country: "UK" },
  { code: "LGW", name: "Gatwick", city: "London", country: "UK" },
  { code: "STN", name: "Stansted", city: "London", country: "UK" },
  { code: "MAN", name: "Manchester", city: "Manchester", country: "UK" },
  { code: "EDI", name: "Edinburgh", city: "Edinburgh", country: "UK" },
  { code: "BHX", name: "Birmingham", city: "Birmingham", country: "UK" },
  
  // Europe
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "ORY", name: "Orly", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt", city: "Frankfurt", country: "Germany" },
  { code: "MUC", name: "Munich", city: "Munich", country: "Germany" },
  { code: "BER", name: "Berlin Brandenburg", city: "Berlin", country: "Germany" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas", city: "Madrid", country: "Spain" },
  { code: "BCN", name: "El Prat", city: "Barcelona", country: "Spain" },
  { code: "FCO", name: "Fiumicino", city: "Rome", country: "Italy" },
  { code: "MXP", name: "Malpensa", city: "Milan", country: "Italy" },
  { code: "ZRH", name: "Zurich", city: "Zurich", country: "Switzerland" },
  { code: "VIE", name: "Vienna International", city: "Vienna", country: "Austria" },
  { code: "CPH", name: "Copenhagen", city: "Copenhagen", country: "Denmark" },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway" },
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden" },
  { code: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland" },
  { code: "DUB", name: "Dublin", city: "Dublin", country: "Ireland" },
  { code: "LIS", name: "Lisbon Portela", city: "Lisbon", country: "Portugal" },
  { code: "ATH", name: "Athens International", city: "Athens", country: "Greece" },
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "Turkey" },
  { code: "PRG", name: "Václav Havel", city: "Prague", country: "Czech Republic" },
  { code: "WAW", name: "Chopin", city: "Warsaw", country: "Poland" },
  { code: "BRU", name: "Brussels", city: "Brussels", country: "Belgium" },
  
  // Asia
  { code: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { code: "HND", name: "Haneda", city: "Tokyo", country: "Japan" },
  { code: "KIX", name: "Kansai International", city: "Osaka", country: "Japan" },
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { code: "PEK", name: "Beijing Capital International", city: "Beijing", country: "China" },
  { code: "PVG", name: "Pudong International", city: "Shanghai", country: "China" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "China" },
  { code: "SIN", name: "Changi", city: "Singapore", country: "Singapore" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { code: "CGK", name: "Soekarno-Hatta International", city: "Jakarta", country: "Indonesia" },
  { code: "MNL", name: "Ninoy Aquino International", city: "Manila", country: "Philippines" },
  { code: "DEL", name: "Indira Gandhi International", city: "New Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", country: "India" },
  { code: "TPE", name: "Taiwan Taoyuan International", city: "Taipei", country: "Taiwan" },
  { code: "SGN", name: "Tan Son Nhat International", city: "Ho Chi Minh City", country: "Vietnam" },
  { code: "HAN", name: "Noi Bai International", city: "Hanoi", country: "Vietnam" },
  
  // Middle East
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "UAE" },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { code: "TLV", name: "Ben Gurion", city: "Tel Aviv", country: "Israel" },
  { code: "JED", name: "King Abdulaziz International", city: "Jeddah", country: "Saudi Arabia" },
  { code: "RUH", name: "King Khalid International", city: "Riyadh", country: "Saudi Arabia" },
  
  // Oceania
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "MEL", name: "Melbourne", city: "Melbourne", country: "Australia" },
  { code: "BNE", name: "Brisbane", city: "Brisbane", country: "Australia" },
  { code: "PER", name: "Perth", city: "Perth", country: "Australia" },
  { code: "AKL", name: "Auckland", city: "Auckland", country: "New Zealand" },
  { code: "WLG", name: "Wellington International", city: "Wellington", country: "New Zealand" },
  
  // Canada
  { code: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada" },
  { code: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
  { code: "YUL", name: "Montréal-Trudeau International", city: "Montreal", country: "Canada" },
  { code: "YYC", name: "Calgary International", city: "Calgary", country: "Canada" },
  
  // Latin America
  { code: "MEX", name: "Benito Juárez International", city: "Mexico City", country: "Mexico" },
  { code: "CUN", name: "Cancún International", city: "Cancún", country: "Mexico" },
  { code: "GRU", name: "São Paulo/Guarulhos International", city: "São Paulo", country: "Brazil" },
  { code: "GIG", name: "Rio de Janeiro/Galeão International", city: "Rio de Janeiro", country: "Brazil" },
  { code: "EZE", name: "Ministro Pistarini International", city: "Buenos Aires", country: "Argentina" },
  { code: "SCL", name: "Arturo Merino Benítez International", city: "Santiago", country: "Chile" },
  { code: "LIM", name: "Jorge Chávez International", city: "Lima", country: "Peru" },
  { code: "BOG", name: "El Dorado International", city: "Bogotá", country: "Colombia" },
  { code: "PTY", name: "Tocumen International", city: "Panama City", country: "Panama" },
  { code: "SJO", name: "Juan Santamaría International", city: "San José", country: "Costa Rica" },
  
  // Africa
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg", country: "South Africa" },
  { code: "CPT", name: "Cape Town International", city: "Cape Town", country: "South Africa" },
  { code: "CAI", name: "Cairo International", city: "Cairo", country: "Egypt" },
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya" },
  { code: "ADD", name: "Bole International", city: "Addis Ababa", country: "Ethiopia" },
  { code: "CMN", name: "Mohammed V International", city: "Casablanca", country: "Morocco" },
  { code: "LOS", name: "Murtala Muhammed International", city: "Lagos", country: "Nigeria" },
];

export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 1) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return airports
    .filter(airport => 
      airport.code.toLowerCase().includes(normalizedQuery) ||
      airport.city.toLowerCase().includes(normalizedQuery) ||
      airport.name.toLowerCase().includes(normalizedQuery) ||
      airport.country.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, 10);
}
