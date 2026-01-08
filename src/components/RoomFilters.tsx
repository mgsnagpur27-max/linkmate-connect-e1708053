import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type PropertyType = Database["public"]["Enums"]["property_type"];
type TenantPreference = Database["public"]["Enums"]["tenant_preference"];

interface RoomFiltersProps {
  location: string;
  onLocationChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  propertyType: PropertyType | "all";
  onPropertyTypeChange: (value: PropertyType | "all") => void;
  tenantPreference: TenantPreference | "all";
  onTenantPreferenceChange: (value: TenantPreference | "all") => void;
}

const PRICE_RANGES = [
  { label: "All Prices", value: "all" },
  { label: "₹5,000 - ₹10,000", value: "5000-10000" },
  { label: "₹10,000 - ₹15,000", value: "10000-15000" },
  { label: "₹15,000 - ₹20,000", value: "15000-20000" },
  { label: "₹20,000+", value: "20000-100000" },
];

const PROPERTY_TYPES: { label: string; value: PropertyType | "all" }[] = [
  { label: "All Types", value: "all" },
  { label: "1 BHK", value: "1 BHK" },
  { label: "2 BHK", value: "2 BHK" },
  { label: "3 BHK", value: "3 BHK" },
  { label: "1 Bed", value: "1 Bed" },
  { label: "2 Bed", value: "2 Bed" },
];

const TENANT_PREFERENCES: { label: string; value: TenantPreference | "all" }[] = [
  { label: "All Preferences", value: "all" },
  { label: "Bachelor", value: "Bachelor" },
  { label: "Family", value: "Family" },
  { label: "Girls", value: "Girls" },
  { label: "Working", value: "Working" },
  { label: "Any", value: "Any" },
];

export function RoomFilters({
  location,
  onLocationChange,
  priceRange,
  onPriceRangeChange,
  propertyType,
  onPropertyTypeChange,
  tenantPreference,
  onTenantPreferenceChange,
}: RoomFiltersProps) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-card border border-border/50 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Price Range */}
        <Select value={priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Property Type */}
        <Select value={propertyType} onValueChange={onPropertyTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tenant Preference */}
        <Select value={tenantPreference} onValueChange={onTenantPreferenceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Tenant Preference" />
          </SelectTrigger>
          <SelectContent>
            {TENANT_PREFERENCES.map((pref) => (
              <SelectItem key={pref.value} value={pref.value}>
                {pref.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
