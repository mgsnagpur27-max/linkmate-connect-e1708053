import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mockRooms } from "@/lib/mockRooms";
import { Database } from "@/integrations/supabase/types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];
type RoomInsert = Database["public"]["Tables"]["rooms"]["Insert"];

const MIN_ROOMS_TO_SHOW = 12;

export interface RoomFilters {
  location?: string;
  priceRange?: { min: number; max: number };
  propertyType?: Database["public"]["Enums"]["property_type"];
  tenantPreference?: Database["public"]["Enums"]["tenant_preference"];
}

function applyFiltersToMockRooms(
  rooms: Omit<Room, "owner_id">[],
  filters: RoomFilters
): Room[] {
  let filteredMock = [...rooms] as Room[];

  if (filters.location) {
    filteredMock = filteredMock.filter((r) =>
      r.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.priceRange) {
    filteredMock = filteredMock.filter(
      (r) =>
        r.price >= filters.priceRange!.min &&
        r.price <= filters.priceRange!.max
    );
  }

  if (filters.propertyType) {
    filteredMock = filteredMock.filter(
      (r) => r.property_type === filters.propertyType
    );
  }

  if (filters.tenantPreference) {
    filteredMock = filteredMock.filter(
      (r) => r.tenant_preference === filters.tenantPreference
    );
  }

  return filteredMock;
}

export function useRooms(filters: RoomFilters = {}) {
  return useQuery({
    queryKey: ["rooms", filters],
    queryFn: async () => {
      let query = supabase
        .from("rooms")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.priceRange) {
        query = query
          .gte("price", filters.priceRange.min)
          .lte("price", filters.priceRange.max);
      }

      if (filters.propertyType) {
        query = query.eq("property_type", filters.propertyType);
      }

      if (filters.tenantPreference) {
        query = query.eq("tenant_preference", filters.tenantPreference);
      }

      const { data, error } = await query;

      if (error) throw error;

      const dbRooms = data || [];
      
      // Always ensure we show at least MIN_ROOMS_TO_SHOW rooms
      // Combine DB rooms with mock rooms if needed
      if (dbRooms.length < MIN_ROOMS_TO_SHOW) {
        const filteredMockRooms = applyFiltersToMockRooms(mockRooms, filters);
        
        // Get mock room IDs that don't conflict with DB rooms
        const dbRoomIds = new Set(dbRooms.map(r => r.id));
        const nonConflictingMockRooms = filteredMockRooms.filter(
          r => !dbRoomIds.has(r.id)
        );
        
        // Add enough mock rooms to reach minimum
        const roomsNeeded = MIN_ROOMS_TO_SHOW - dbRooms.length;
        const mockRoomsToAdd = nonConflictingMockRooms.slice(0, roomsNeeded);
        
        return [...dbRooms, ...mockRoomsToAdd];
      }

      return dbRooms;
    },
  });
}

export function useOwnerRooms(ownerId: string | undefined) {
  return useQuery({
    queryKey: ["owner-rooms", ownerId],
    queryFn: async () => {
      if (!ownerId) return [];

      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("owner_id", ownerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!ownerId,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (room: Omit<RoomInsert, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("rooms")
        .insert(room)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["owner-rooms"] });
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomId: string) => {
      const { error } = await supabase.from("rooms").delete().eq("id", roomId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["owner-rooms"] });
    },
  });
}
