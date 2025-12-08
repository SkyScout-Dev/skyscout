import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";
import { searchAirports, Airport } from "@/data/airports";
import { cn } from "@/lib/utils";

interface AirportSearchProps {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  id?: string;
}

const AirportSearch = ({ value, onChange, placeholder, id }: AirportSearchProps) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.length >= 1) {
      const searchResults = searchAirports(newQuery);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (airport: Airport) => {
    setQuery(airport.code);
    onChange(airport.code);
    setIsOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleBlur = () => {
    // If user typed a valid 3-letter code, use it directly
    if (query.length === 3) {
      onChange(query.toUpperCase());
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        ref={inputRef}
        id={id}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= 1 && results.length > 0 && setIsOpen(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="bg-secondary/50 border-border uppercase"
        autoComplete="off"
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
          <ul className="max-h-64 overflow-y-auto py-1">
            {results.map((airport, index) => (
              <li
                key={airport.code}
                onClick={() => handleSelect(airport)}
                className={cn(
                  "px-3 py-2 cursor-pointer flex items-start gap-3 transition-colors",
                  index === selectedIndex
                    ? "bg-primary/10 text-foreground"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Plane className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{airport.code}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {airport.city}, {airport.country}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {airport.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
