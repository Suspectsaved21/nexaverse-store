import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle, Search, ShoppingCart } from "lucide-react";
import Cart from "../cart/Cart";

interface Profile {
  username: string | null;
}

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error fetching profile",
      });
    } else {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with increased margin */}
          <Link to="/" className="text-2xl font-bold text-nexa-primary mr-12">
            Nexa
          </Link>

          {/* Navigation Links with better spacing */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-gray-600 hover:text-nexa-primary transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-nexa-primary transition-colors">Shop</Link>
            <Link to="/contact" className="text-gray-600 hover:text-nexa-primary transition-colors">Contact</Link>
          </div>

          {/* Search Bar with flex-grow */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-12">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>

          {/* Auth & Cart with consistent spacing */}
          <div className="flex items-center space-x-6">
            <Cart />
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
                <span className="text-sm text-gray-600">
                  {profile?.username || 'Set username'}
                </span>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
