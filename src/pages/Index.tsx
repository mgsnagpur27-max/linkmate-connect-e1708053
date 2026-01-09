import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Banknote, 
  Clock, 
  Users, 
  Home, 
  Search,
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
              🎉 Trusted by 10,000+ students across India
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="text-gradient block mt-2">Living Space</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connect with verified room owners instantly. No brokerage, no hassle — 
              just the perfect room waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student">
                <Button size="lg" className="bg-gradient-student text-primary-foreground gap-2 px-8 h-14 text-lg">
                  <Search size={20} />
                  Find a Room
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/owner">
                <Button size="lg" variant="outline" className="gap-2 px-8 h-14 text-lg border-2">
                  <Home size={20} />
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { number: "5000+", label: "Active Listings" },
              { number: "10K+", label: "Happy Students" },
              { number: "50+", label: "Cities Covered" },
              { number: "4.8", label: "User Rating", icon: <Star size={16} className="text-yellow-500 fill-yellow-500" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-1">
                  {stat.number}
                  {stat.icon}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              The Smarter Way to Find Rooms
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We've simplified room hunting so you can focus on what matters — settling into your new space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <ShieldCheck className="text-primary" size={32} />,
                title: "Verified Owners",
                description: "Every property owner is verified for your safety and peace of mind.",
              },
              {
                icon: <Banknote className="text-secondary" size={32} />,
                title: "Zero Brokerage",
                description: "Connect directly with owners — no middlemen, no extra fees.",
              },
              {
                icon: <Clock className="text-primary" size={32} />,
                title: "24/7 Support",
                description: "Our dedicated team is always here to help you find your perfect room.",
              },
              {
                icon: <Users className="text-secondary" size={32} />,
                title: "Large Community",
                description: "Join thousands of students who found their ideal living space with us.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-student p-8 md:p-12">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                  🏠 Partner with Linkmate
                </h3>
                <p className="text-primary-foreground/80 max-w-md">
                  Are you a property developer or real estate company? Advertise with us and reach thousands of students.
                </p>
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                className="whitespace-nowrap gap-2"
              >
                Advertise Here
                <ArrowRight size={18} />
              </Button>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Find Your Room in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Search & Filter",
                description: "Browse listings by location, price, and preferences to find rooms that match your needs.",
              },
              {
                step: "02",
                title: "Connect Directly",
                description: "Contact verified owners instantly through our platform — no middlemen involved.",
              },
              {
                step: "03",
                title: "Move In",
                description: "Schedule visits, finalize the deal, and move into your new home hassle-free.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="text-7xl md:text-8xl font-bold text-primary/10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/student">
              <Button size="lg" className="bg-gradient-student gap-2">
                Start Searching Now
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Find Your Perfect Room?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of students who've already found their ideal living space through Linkmate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student">
              <Button size="lg" className="bg-gradient-student gap-2 px-8">
                <Search size={18} />
                I'm a Student
              </Button>
            </Link>
            <Link to="/owner">
              <Button size="lg" className="bg-gradient-owner gap-2 px-8">
                <Home size={18} />
                I'm an Owner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
