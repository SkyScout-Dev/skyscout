import { Plane, Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">SkyScout</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The smartest way to find cheap flights. Our AI-powered search engine helps 
              travelers save thousands on airfare every year.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li><Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">Search Flights</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Price Alerts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} SkyScout. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
