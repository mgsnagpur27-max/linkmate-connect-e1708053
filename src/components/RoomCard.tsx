import { useState } from "react";
import { MapPin, Phone, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [showContact, setShowContact] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const defaultImage = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800";
  const imageUrl = room.images && room.images.length > 0 ? room.images[0] : defaultImage;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <Badge className="absolute top-3 left-3 bg-gradient-student text-primary-foreground">
          {room.property_type}
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-1">
          {room.title}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin size={14} className="shrink-0" />
          <span className="text-sm line-clamp-1">{room.location}</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Home size={12} />
            <span>{room.property_type}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users size={12} />
            <span>{room.tenant_preference}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
          <p className="font-bold text-lg text-primary">
            {formatPrice(room.price)}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>

          {showContact ? (
            <a
              href={`tel:${room.contact_number}`}
              className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              <Phone size={14} />
              {room.contact_number}
            </a>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowContact(true)}
              className="text-sm"
            >
              <Phone size={14} className="mr-1.5" />
              Contact
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
