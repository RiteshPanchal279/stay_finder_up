import { useState, useEffect } from "react";
import API from "../api";
import { toast } from "sonner";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await API.get(`${process.env.VITE_BACKEND_URL}/listings`);
      setListings(Array.isArray(res.data) ? res.data : res.data.listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return { listings, loading, refetch: fetchListings };
}
