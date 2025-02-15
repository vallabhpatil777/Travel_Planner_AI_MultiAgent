export interface ItineraryState {
    city: string;
    interests: string[];
    itinerary: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
  
  export interface ItineraryRequest {
    city: string;
    interests: string[];
  }
  