import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plane, ArrowLeft, CalendarIcon, Search as SearchIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import FlightCard from "@/components/FlightCard";
import { cn } from "@/lib/utils";

const airlines = [
  { value: "any", label: "Any Airline" },
  { value: "united", label: "United Airlines" },
  { value: "delta", label: "Delta Airlines" },
  { value: "american", label: "American Airlines" },
  { value: "southwest", label: "Southwest Airlines" },
  { value: "jetblue", label: "JetBlue" },
  { value: "british", label: "British Airways" },
  { value: "lufthansa", label: "Lufthansa" },
  { value: "emirates", label: "Emirates" },
  { value: "singapore", label: "Singapore Airlines" },
];

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

// Mock flight data
const mockFlights = [
  {
    airline: "Emirates",
    airlineLogo: "",
    departureTime: "08:30",
    arrivalTime: "14:45",
    departureCity: "JFK",
    arrivalCity: "LHR",
    duration: "6h 15m",
    stops: 0,
    price: 487,
    flightClass: "economy",
  },
  {
    airline: "British Airways",
    airlineLogo: "",
    departureTime: "10:15",
    arrivalTime: "16:30",
    departureCity: "JFK",
    arrivalCity: "LHR",
    duration: "6h 15m",
    stops: 0,
    price: 524,
    flightClass: "economy",
  },
  {
    airline: "Delta",
    airlineLogo: "",
    departureTime: "14:00",
    arrivalTime: "22:45",
    departureCity: "JFK",
    arrivalCity: "LHR",
    duration: "8h 45m",
    stops: 1,
    price: 392,
    flightClass: "economy",
  },
  {
    airline: "United Airlines",
    airlineLogo: "",
    departureTime: "18:30",
    arrivalTime: "06:45",
    departureCity: "JFK",
    arrivalCity: "LHR",
    duration: "7h 15m",
    stops: 0,
    price: 445,
    flightClass: "economy",
  },
  {
    airline: "Lufthansa",
    airlineLogo: "",
    departureTime: "21:00",
    arrivalTime: "11:30",
    departureCity: "JFK",
    arrivalCity: "LHR",
    duration: "9h 30m",
    stops: 1,
    price: 356,
    flightClass: "economy",
  },
];

const SearchPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [airline, setAirline] = useState("any");
  const [currency, setCurrency] = useState("USD");
  const [flightClass, setFlightClass] = useState("economy");
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [flights, setFlights] = useState<typeof mockFlights>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setFlights([]);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Return mock results sorted by price
    const sortedFlights = [...mockFlights].sort((a, b) => a.price - b.price);
    setFlights(sortedFlights);
    setIsSearching(false);
    setHasSearched(true);
  };

  const isFormValid = origin && destination && departDate && (isRoundTrip ? returnDate : true);

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
                <Input
                  id="origin"
                  placeholder="City or Airport (e.g., New York, JFK)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">To</Label>
                <Input
                  id="destination"
                  placeholder="City or Airport (e.g., London, LHR)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-secondary/50 border-border"
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

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Preferred Airline */}
              <div className="space-y-2">
                <Label>Preferred Airline</Label>
                <Select value={airline} onValueChange={setAirline}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select airline" />
                  </SelectTrigger>
                  <SelectContent>
                    {airlines.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                {flights.length > 0 ? (
                  <>
                    <span className="text-gradient">{flights.length}</span> flights found
                  </>
                ) : (
                  "Searching..."
                )}
              </h2>
              {flights.length > 0 && (
                <div className="text-muted-foreground text-sm">
                  Sorted by lowest price
                </div>
              )}
            </div>

            <div className="space-y-4">
              {flights.map((flight, index) => (
                <FlightCard
                  key={index}
                  {...flight}
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
