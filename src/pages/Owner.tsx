import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Plus, List, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AddRoomForm } from "@/components/AddRoomForm";
import { OwnerRoomCard } from "@/components/OwnerRoomCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useOwnerRooms } from "@/hooks/useRooms";

const Owner = () => {
  const navigate = useNavigate();
  const { user, role, loading, isAuthenticated } = useAuth();
  const { data: rooms, isLoading: roomsLoading } = useOwnerRooms(user?.id);
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    if (!loading && (!isAuthenticated || role !== "owner")) {
      navigate("/auth");
    }
  }, [loading, isAuthenticated, role, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || role !== "owner") {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 rounded-2xl bg-gradient-owner">
            <Home size={24} className="text-primary-foreground md:hidden" />
            <Home size={28} className="text-primary-foreground hidden md:block" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Manage Your Properties
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            List new rooms or manage your existing properties all in one place.
          </p>
        </div>

        {/* Tabs */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="add" className="gap-2">
                <Plus size={16} />
                Add Room
              </TabsTrigger>
              <TabsTrigger value="listings" className="gap-2">
                <List size={16} />
                My Listings
                {rooms && rooms.length > 0 && (
                  <span className="ml-1 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                    {rooms.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add">
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Add New Property
                </h2>
                <AddRoomForm
                  userId={user!.id}
                  onSuccess={() => setActiveTab("listings")}
                />
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Your Listings
                </h2>

                {roomsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-card rounded-xl p-4 shadow-card border border-border/50 flex gap-4">
                        <Skeleton className="w-48 h-32" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : rooms && rooms.length > 0 ? (
                  <div className="space-y-4">
                    {rooms.map((room) => (
                      <OwnerRoomCard key={room.id} room={room} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl shadow-card border border-border/50">
                    <Home size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No listings yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add your first property to start receiving inquiries.
                    </p>
                    <button
                      onClick={() => setActiveTab("add")}
                      className="text-primary hover:underline"
                    >
                      Add your first room →
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Owner;
