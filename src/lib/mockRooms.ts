import { Database } from "@/integrations/supabase/types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

export const mockRooms: Omit<Room, "owner_id">[] = [
  {
    id: "mock-1",
    title: "Spacious 2 BHK Near IIT Delhi",
    location: "Hauz Khas, New Delhi",
    price: 18000,
    property_type: "2 BHK",
    tenant_preference: "Any",
    contact_number: "+91 98765 43210",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-2",
    title: "Cozy 1 BHK for Working Professionals",
    location: "Koramangala, Bangalore",
    price: 15000,
    property_type: "1 BHK",
    tenant_preference: "Working",
    contact_number: "+91 98765 43211",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-3",
    title: "Modern 1 Bed Room Near College",
    location: "Andheri West, Mumbai",
    price: 8000,
    property_type: "1 Bed",
    tenant_preference: "Bachelor",
    contact_number: "+91 98765 43212",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-4",
    title: "Girls PG with All Amenities",
    location: "Sector 62, Noida",
    price: 7000,
    property_type: "1 Bed",
    tenant_preference: "Girls",
    contact_number: "+91 98765 43213",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-5",
    title: "Family Friendly 3 BHK Apartment",
    location: "Salt Lake, Kolkata",
    price: 20000,
    property_type: "3 BHK",
    tenant_preference: "Family",
    contact_number: "+91 98765 43214",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-6",
    title: "Budget Friendly 2 Bed Sharing",
    location: "Kothrud, Pune",
    price: 5000,
    property_type: "2 Bed",
    tenant_preference: "Bachelor",
    contact_number: "+91 98765 43215",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ez2-d-a2eb?w=800",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-7",
    title: "Premium 2 BHK Near Tech Park",
    location: "Whitefield, Bangalore",
    price: 22000,
    property_type: "2 BHK",
    tenant_preference: "Working",
    contact_number: "+91 98765 43216",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-8",
    title: "Affordable 1 BHK Student Housing",
    location: "Powai, Mumbai",
    price: 12000,
    property_type: "1 BHK",
    tenant_preference: "Any",
    contact_number: "+91 98765 43217",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-9",
    title: "Fully Furnished 1 Bed Near Metro",
    location: "Rajouri Garden, Delhi",
    price: 9500,
    property_type: "1 Bed",
    tenant_preference: "Working",
    contact_number: "+91 98765 43218",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-10",
    title: "Spacious 3 BHK for Large Family",
    location: "Jubilee Hills, Hyderabad",
    price: 25000,
    property_type: "3 BHK",
    tenant_preference: "Family",
    contact_number: "+91 98765 43219",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
