import { Search, Filter, CreditCard } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell Us Your Trip",
    description: "Enter your destination, dates, and preferences. Our AI starts scanning immediately.",
  },
  {
    number: "02",
    icon: Filter,
    title: "Compare Options",
    description: "Browse through curated results sorted by price, duration, or convenience.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Book & Save",
    description: "Click through to the airline or trusted partner to complete your booking at the best price.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Finding cheap flights has never been easier. Just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="text-center">
                <div className="text-7xl font-bold text-secondary mb-6">{step.number}</div>
                <div className="p-4 rounded-2xl bg-primary/10 w-fit mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 translate-x-1/2 w-16 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
