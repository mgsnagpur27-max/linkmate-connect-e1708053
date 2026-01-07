import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Camera, Users, TrendingUp, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Owner = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && role && role !== 'owner') {
      navigate('/student');
    }
  }, [user, role, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="w-full py-6 px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gradient">Linkmate</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-owner">
            <Home size={28} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            List Your Property
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Reach thousands of verified students looking for accommodation near their campus.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {[
            {
              icon: <Camera size={24} />,
              title: "Easy Listing",
              description: "Upload photos and details in minutes with our simple listing process.",
            },
            {
              icon: <Users size={24} />,
              title: "Verified Students",
              description: "Connect only with verified students from recognized institutions.",
            },
            {
              icon: <TrendingUp size={24} />,
              title: "Maximum Visibility",
              description: "Your listing reaches students actively searching in your area.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="p-6 bg-card rounded-xl shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border/50 text-center animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to List Your Property?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join hundreds of property owners who have successfully found tenants through Linkmate.
          </p>
          <button className="px-8 py-3.5 rounded-xl bg-gradient-owner text-primary-foreground font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:scale-105">
            Create Your Listing
          </button>
        </div>
      </main>
    </div>
  );
};

export default Owner;
