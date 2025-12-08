import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plane, ArrowLeft, CalendarIcon, Search as SearchIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import FlightCard from "@/components/FlightCard";
import AirportSearch from "@/components/AirportSearch";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "AUD", label: "AUD (A$)" },
  { value: "CAD", label: "CAD (C$)" },
];

const flightClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  flightClass: string;
  numberOfBookableSeats?: number;
}

const SearchPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [currency, setCurrency] = useState("USD");
  const [flightClass, setFlightClass] = useState("economy");
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!origin || !destination || !departDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (origin.length !== 3 || destination.length !== 3) {
      toast.error("Please select valid airport codes");
      return;
    }

    setIsSearching(true);
    setFlights([]);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('search-flights', {
        body: {
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departureDate: format(departDate, 'yyyy-MM-dd'),
          returnDate: isRoundTrip && returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined,
          travelClass: flightClass,
          currency: currency,
          adults: 1,
        },
      });

      if (error) {
        console.error('Search error:', error);
        toast.error("Failed to search flights. Please try again.");
        return;
      }

      if (data.error) {
        console.error('API error:', data.error);
        toast.error(data.error);
        return;
      }

      const sortedFlights = [...(data.flights || [])].sort((a: Flight, b: Flight) => a.price - b.price);
      setFlights(sortedFlights);

      if (sortedFlights.length === 0) {
        toast.info("No flights found for this route and date");
      } else {
        toast.success(`Found ${sortedFlights.length} flights`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSearching(false);
    }
  };

  const isFormValid = origin.length === 3 && destination.length === 3 && departDate && (isRoundTrip ? returnDate : true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">SkyScout</span>
          </Link>

          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-2 text-center">Find Your Flight</h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your travel details to discover the cheapest options
          </p>

          <div className="p-8 rounded-3xl gradient-card border border-border shadow-card">
            {/* Trip Type Toggle */}
            <div className="flex items-center gap-4 mb-8">
              <Label htmlFor="round-trip" className="text-foreground">Round Trip</Label>
              <Switch
                id="round-trip"
                checked={isRoundTrip}
                onCheckedChange={setIsRoundTrip}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Origin */}
              <div className="space-y-2">
                <Label htmlFor="origin">From</Label>
                <AirportSearch
                  id="origin"
                  value={origin}
                  onChange={setOrigin}
                  placeholder="Search city or airport code..."
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">To</Label>
                <AirportSearch
                  id="destination"
                  value={destination}
                  onChange={setDestination}
                  placeholder="Search city or airport code..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Departure Date */}
              <div className="space-y-2">
                <Label>Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-secondary/50",
                        !departDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-secondary/50",
                        !returnDate && "text-muted-foreground"
                      )}
                      disabled={!isRoundTrip}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => date < (departDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Currency */}
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Class */}
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={flightClass} onValueChange={setFlightClass}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {flightClasses.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleSearch}
              disabled={!isFormValid || isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Searching for best deals...
                </>
              ) : (
                <>
                  <SearchIcon className="h-5 w-5" />
                  Search Flights
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {isSearching ? (
                  "Searching..."
                ) : flights.length > 0 ? (
                  <>
                    <span className="text-gradient">{flights.length}</span> flights found
                  </>
                ) : (
                  "No flights found"
                )}
              </h2>
              {flights.length > 0 && (
                <div className="text-muted-foreground text-sm">
                  Sorted by lowest price
                </div>
              )}
            </div>

            <div className="space-y-4">
              {flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  airline={flight.airline}
                  airlineLogo=""
                  departureTime={flight.departureTime}
                  arrivalTime={flight.arrivalTime}
                  departureCity={flight.departureCity}
                  arrivalCity={flight.arrivalCity}
                  duration={flight.duration}
                  stops={flight.stops}
                  price={flight.price}
                  flightClass={flight.flightClass}
                  currency={currency}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
