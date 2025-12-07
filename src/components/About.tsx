import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Compare prices across 500+ airlines instantly",
  "Find hidden deals and error fares",
  "Get real-time price alerts",
  "Book with confidence using trusted partners",
  "Access exclusive member-only discounts",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Travel Smarter, <span className="text-gradient">Save More</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SkyScout was founded by frequent travelers who were tired of overpaying for flights. 
              We built an AI-powered platform that does the hard work of finding the best deals so you 
              can focus on planning your adventure.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our advanced algorithms scan thousands of routes, compare prices across hundreds of 
              airlines, and surface the deals that matter most to you.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl gradient-card border border-border overflow-hidden shadow-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl font-bold text-gradient mb-4">35%</div>
                  <div className="text-xl text-foreground font-semibold mb-2">Average Savings</div>
                  <div className="text-muted-foreground">compared to booking directly</div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
