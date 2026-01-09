import { useState } from "react";
import { MapPin, Home, Users, Heart, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const defaultImage = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800";
  const imageUrl = room.images && room.images.length > 0 ? room.images[0] : defaultImage;

  const handleSubmitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[+]?[\d\s-]{10,15}$/.test(phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("student_applications").insert({
        user_id: user?.id || null,
        name: name.trim(),
        phone: phone.trim(),
        email: user?.email || `${phone.replace(/\D/g, '')}@placeholder.com`,
        preferred_location: room.location,
        budget: room.price,
        move_in_date: new Date().toISOString().split("T")[0],
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Interest Submitted!",
        description: "The owner will contact you soon.",
      });
    } catch (error: any) {
      console.error("Error submitting interest:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="mt-auto pt-3 border-t border-border/50">
          <p className="font-bold text-lg text-primary mb-3">
            {formatPrice(room.price)}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 py-2 text-sm text-secondary font-medium">
              <Check size={16} />
              Interest Submitted!
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmitInterest} className="space-y-2">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm"
              />
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full bg-gradient-student text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "Submit Interest"
                )}
              </Button>
            </form>
          ) : (
            <Button
              size="sm"
              className="w-full bg-gradient-student text-primary-foreground"
              onClick={() => setShowForm(true)}
            >
              <Heart size={14} className="mr-1.5" />
              I'm Interested
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
