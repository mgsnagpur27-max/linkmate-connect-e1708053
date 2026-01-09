import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, MapPin, Phone, Mail, User, IndianRupee, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  preferred_location: z.string().min(2, "Location must be at least 2 characters").max(200),
  budget: z.number().min(1000, "Budget must be at least ₹1,000").max(100000, "Budget cannot exceed ₹1,00,000"),
  move_in_date: z.string().min(1, "Please select a move-in date"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function StudentApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: user?.email || "",
      preferred_location: "",
      budget: 10000,
      move_in_date: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("student_applications").insert({
        user_id: user.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        preferred_location: data.preferred_location,
        budget: data.budget,
        move_in_date: data.move_in_date,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll connect you with matching room owners soon.",
      });

      reset();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Submit Your Requirements</CardTitle>
        <CardDescription>
          Let us know what you're looking for and we'll match you with the perfect room.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User size={16} /> Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} /> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_location" className="flex items-center gap-2">
              <MapPin size={16} /> Preferred Location
            </Label>
            <Input
              id="preferred_location"
              placeholder="e.g., Koramangala, Bangalore"
              {...register("preferred_location")}
              className={errors.preferred_location ? "border-destructive" : ""}
            />
            {errors.preferred_location && (
              <p className="text-sm text-destructive">{errors.preferred_location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <IndianRupee size={16} /> Monthly Budget (₹)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="10000"
              {...register("budget", { valueAsNumber: true })}
              className={errors.budget ? "border-destructive" : ""}
            />
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="move_in_date" className="flex items-center gap-2">
              <Calendar size={16} /> Expected Move-in Date
            </Label>
            <Input
              id="move_in_date"
              type="date"
              {...register("move_in_date")}
              min={new Date().toISOString().split("T")[0]}
              className={errors.move_in_date ? "border-destructive" : ""}
            />
            {errors.move_in_date && (
              <p className="text-sm text-destructive">{errors.move_in_date.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-student"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
