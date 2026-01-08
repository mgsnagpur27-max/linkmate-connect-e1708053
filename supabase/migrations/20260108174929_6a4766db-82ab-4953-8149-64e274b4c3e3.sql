-- Create property type enum
CREATE TYPE public.property_type AS ENUM ('1 BHK', '2 BHK', '3 BHK', '1 Bed', '2 Bed');

-- Create tenant preference enum
CREATE TYPE public.tenant_preference AS ENUM ('Bachelor', 'Family', 'Girls', 'Working', 'Any');

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  property_type public.property_type NOT NULL,
  tenant_preference public.tenant_preference NOT NULL DEFAULT 'Any',
  contact_number TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rooms
-- Everyone can view active rooms
CREATE POLICY "Anyone can view active rooms"
ON public.rooms
FOR SELECT
USING (is_active = true);

-- Owners can insert their own rooms
CREATE POLICY "Owners can insert their own rooms"
ON public.rooms
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own rooms
CREATE POLICY "Owners can update their own rooms"
ON public.rooms
FOR UPDATE
USING (auth.uid() = owner_id);

-- Owners can delete their own rooms
CREATE POLICY "Owners can delete their own rooms"
ON public.rooms
FOR DELETE
USING (auth.uid() = owner_id);

-- Create index for search performance
CREATE INDEX idx_rooms_location ON public.rooms USING gin(to_tsvector('english', location));
CREATE INDEX idx_rooms_price ON public.rooms(price);
CREATE INDEX idx_rooms_property_type ON public.rooms(property_type);
CREATE INDEX idx_rooms_tenant_preference ON public.rooms(tenant_preference);

-- Trigger for updated_at
CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public)
VALUES ('room_images', 'room_images', true);

-- Storage policies for room_images bucket
CREATE POLICY "Anyone can view room images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'room_images');

CREATE POLICY "Authenticated users can upload room images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'room_images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own room images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'room_images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own room images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'room_images' AND auth.uid()::text = (storage.foldername(name))[1]);