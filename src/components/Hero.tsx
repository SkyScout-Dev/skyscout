import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8 animate-fade-up">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Flight Search</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find the{" "}
            <span className="text-gradient">Cheapest Flights</span>
            {" "}in Seconds
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Our AI scans thousands of airlines and routes to find you the best deals. 
            Save time and money on your next adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/search">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Plane className="h-5 w-5" />
                Find My Flight
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Learn How It Works
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Airlines Searched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">$2.3M</div>
              <div className="text-sm text-muted-foreground mt-1">Saved by Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
