import { Plane, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlightCardProps {
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  flightClass: string;
}

const FlightCard = ({
  airline,
  airlineLogo,
  departureTime,
  arrivalTime,
  departureCity,
  arrivalCity,
  duration,
  stops,
  price,
  currency,
  flightClass,
}: FlightCardProps) => {
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      CAD: "C$",
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="group p-6 rounded-2xl gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover animate-scale-in">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Airline Info */}
        <div className="flex items-center gap-4 lg:w-48">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
            {airlineLogo ? (
              <img src={airlineLogo} alt={airline} className="w-8 h-8 object-contain" />
            ) : (
              <Plane className="w-6 h-6 text-primary" />
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground">{airline}</div>
            <div className="text-sm text-muted-foreground capitalize">{flightClass}</div>
          </div>
        </div>

        {/* Flight Times */}
        <div className="flex-1 flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{departureTime}</div>
            <div className="text-sm text-muted-foreground">{departureCity}</div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              {duration}
            </div>
            <div className="w-full h-px bg-border relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="p-1 bg-background rounded-full border border-border">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{arrivalTime}</div>
            <div className="text-sm text-muted-foreground">{arrivalCity}</div>
          </div>
        </div>

        {/* Price & Book */}
        <div className="flex items-center gap-6 lg:w-48 justify-between lg:justify-end">
          <div className="text-right">
            <div className="text-3xl font-bold text-gradient">
              {getCurrencySymbol(currency)}{price}
            </div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>
          <Button variant="default" size="default">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
