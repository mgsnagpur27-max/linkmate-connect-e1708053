import { useState } from "react";
import { MapPin, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteRoom } from "@/hooks/useRooms";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

interface OwnerRoomCardProps {
  room: Room;
}

export function OwnerRoomCard({ room }: OwnerRoomCardProps) {
  const deleteRoom = useDeleteRoom();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDelete = async () => {
    try {
      await deleteRoom.mutateAsync(room.id);
      toast({
        title: "Room deleted",
        description: "Your listing has been removed.",
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      toast({
        title: "Failed to delete",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const defaultImage = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800";
  const imageUrl = room.images && room.images.length > 0 ? room.images[0] : defaultImage;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
        <img
          src={imageUrl}
          alt={room.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <Badge className="absolute top-2 left-2 bg-gradient-student text-primary-foreground text-xs">
          {room.property_type}
        </Badge>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{room.title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin size={12} />
            <span>{room.location}</span>
          </div>
          <p className="font-bold text-primary">{formatPrice(room.price)}/mo</p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Listed {new Date(room.created_at).toLocaleDateString()}
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {deleteRoom.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove your room listing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
