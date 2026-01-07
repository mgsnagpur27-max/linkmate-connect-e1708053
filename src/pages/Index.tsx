import { Link } from "react-router-dom";
import RoleCard from "@/components/RoleCard";
import { GraduationCap, Home, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient">Linkmate</h1>
          {user ? (
            <Link to={role === 'student' ? '/student' : '/owner'}>
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline">
                <LogIn size={18} className="mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="text-gradient block">Living Space</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect students with room owners seamlessly. Whether you're searching for a room or listing one, we've got you covered.
          </p>
        </div>

        {/* Cards Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <RoleCard
            to="/student"
            title="Student"
            description="Browse verified listings and find the ideal room that fits your budget and lifestyle."
            icon={<GraduationCap size={36} />}
            variant="student"
          />
          <RoleCard
            to="/owner"
            title="Owner"
            description="List your property and connect with verified students looking for accommodation."
            icon={<Home size={36} />}
            variant="owner"
          />
        </div>

        {/* Trust indicators */}
        <div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified Listings
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Secure Platform
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Growing Community
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground animate-fade-in">
        <p>© 2026 Linkmate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
