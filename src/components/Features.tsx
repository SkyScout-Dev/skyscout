import { Brain, Clock, Globe, Shield, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Search",
    description: "Our intelligent algorithm analyzes millions of routes to find hidden deals other sites miss.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not minutes. Our optimized search delivers instant flight options.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Search over 500 airlines worldwide, including budget carriers and premium options.",
  },
  {
    icon: Shield,
    title: "Price Protection",
    description: "We show transparent pricing with all fees included. No surprises at checkout.",
  },
  {
    icon: Clock,
    title: "Flexible Dates",
    description: "Find the cheapest days to fly with our smart calendar that highlights best prices.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized suggestions based on your travel preferences and history.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">SkyScout</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've built the smartest flight search engine to help you travel more for less.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
