import { useState, useMemo } from "react";
import { Search, Home } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { RoomCard } from "@/components/RoomCard";
import { RoomCardSkeleton } from "@/components/RoomCardSkeleton";
import { RoomFilters } from "@/components/RoomFilters";
import { useRooms, RoomFilters as RoomFiltersType } from "@/hooks/useRooms";
import { Database } from "@/integrations/supabase/types";

type PropertyType = Database["public"]["Enums"]["property_type"];
type TenantPreference = Database["public"]["Enums"]["tenant_preference"];

const Student = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all");
  const [tenantPreference, setTenantPreference] = useState<TenantPreference | "all">("all");

  const filters = useMemo<RoomFiltersType>(() => {
    const f: RoomFiltersType = {};

    if (location.trim()) {
      f.location = location.trim();
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      f.priceRange = { min, max };
    }

    if (propertyType !== "all") {
      f.propertyType = propertyType;
    }

    if (tenantPreference !== "all") {
      f.tenantPreference = tenantPreference;
    }

    return f;
  }, [location, priceRange, propertyType, tenantPreference]);

  const { data: rooms, isLoading, error } = useRooms(filters);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 rounded-2xl bg-gradient-student">
            <Search size={24} className="text-primary-foreground md:hidden" />
            <Search size={28} className="text-primary-foreground hidden md:block" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Find Your Perfect Room
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            Browse through verified listings from trusted property owners in your preferred area.
          </p>
        </div>

        {/* Filters */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <RoomFilters
            location={location}
            onLocationChange={setLocation}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            tenantPreference={tenantPreference}
            onTenantPreferenceChange={setTenantPreference}
          />
        </div>

        {/* Results */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              {isLoading ? "Loading..." : `${rooms?.length || 0} Rooms Found`}
            </h2>
          </div>

          {error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Failed to load rooms. Please try again.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <RoomCardSkeleton key={i} />
              ))}
            </div>
          ) : rooms && rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Home size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No rooms found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Student;
