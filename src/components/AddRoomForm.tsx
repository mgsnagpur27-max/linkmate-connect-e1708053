import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateRoom } from "@/hooks/useRooms";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type PropertyType = Database["public"]["Enums"]["property_type"];
type TenantPreference = Database["public"]["Enums"]["tenant_preference"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  location: z.string().min(3, "Location must be at least 3 characters").max(100),
  price: z.coerce.number().min(1000, "Price must be at least ₹1,000").max(100000),
  property_type: z.enum(["1 BHK", "2 BHK", "3 BHK", "1 Bed", "2 Bed"] as const),
  tenant_preference: z.enum(["Bachelor", "Family", "Girls", "Working", "Any"] as const),
  contact_number: z
    .string()
    .regex(/^[\d\s+()-]{10,15}$/, "Please enter a valid phone number"),
});

type FormData = z.infer<typeof formSchema>;

interface AddRoomFormProps {
  userId: string;
  onSuccess?: () => void;
}

const PROPERTY_TYPES: PropertyType[] = ["1 BHK", "2 BHK", "3 BHK", "1 Bed", "2 Bed"];
const TENANT_PREFERENCES: TenantPreference[] = ["Bachelor", "Family", "Girls", "Working", "Any"];

export function AddRoomForm({ userId, onSuccess }: AddRoomFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const createRoom = useCreateRoom();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      price: 0,
      property_type: "1 BHK",
      tenant_preference: "Any",
      contact_number: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createRoom.mutateAsync({
        owner_id: userId,
        title: data.title,
        location: data.location,
        price: data.price,
        property_type: data.property_type,
        tenant_preference: data.tenant_preference,
        contact_number: data.contact_number,
        images: images,
        is_active: true,
      });

      toast({
        title: "Room listed!",
        description: "Your property has been listed successfully.",
      });

      form.reset();
      setImages([]);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Failed to list room",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Spacious 2 BHK Near Metro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Koramangala, Bangalore" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="property_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tenant_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TENANT_PREFERENCES.map((pref) => (
                      <SelectItem key={pref} value={pref}>
                        {pref}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Room Images</label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            userId={userId}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-owner text-primary-foreground"
          disabled={createRoom.isPending}
        >
          {createRoom.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Listing...
            </>
          ) : (
            "List Property"
          )}
        </Button>
      </form>
    </Form>
  );
}
