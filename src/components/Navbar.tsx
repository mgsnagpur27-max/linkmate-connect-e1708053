import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, role, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold text-gradient">Linkmate</span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={role === "owner" ? "/owner" : "/student"}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User size={16} />
                    <span className="hidden sm:inline">{user?.email?.split("@")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground">
                    Role: {role || "Not set"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="bg-gradient-student text-primary-foreground">
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
