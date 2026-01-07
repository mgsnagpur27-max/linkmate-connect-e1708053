import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Star, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Student = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && role && role !== 'student') {
      navigate('/owner');
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
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-student">
            <Search size={28} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Room
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Browse through verified listings from trusted property owners in your preferred area.
          </p>
        </div>

        {/* Search Bar Placeholder */}
        <div className="max-w-2xl mx-auto mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card border border-border/50">
            <MapPin className="text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Enter your college or area..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="px-6 py-2.5 rounded-lg bg-gradient-student text-primary-foreground font-medium transition-all hover:opacity-90 hover:shadow-lg">
              Search
            </button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-6">Featured Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-muted-foreground">Room Preview</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Cozy Student Room</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star size={14} className="text-secondary fill-current" />
                      4.8
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Near University Campus</p>
                  <p className="font-bold text-primary">₹5,000/month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
