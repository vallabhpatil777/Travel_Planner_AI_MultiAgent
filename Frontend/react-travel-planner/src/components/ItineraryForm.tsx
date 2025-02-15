import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchItinerary } from "../store/itinerarySlice";
import { motion } from "framer-motion";

const ItineraryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState<string>("");
  const [interests, setInterests] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const interestsArray = interests.split(",").map((item) => item.trim());
    dispatch(fetchItinerary({ city, interests: interestsArray }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-lg w-full border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-center mb-6">🌍 Plan Your Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Enter city..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter interests (comma-separated)..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:shadow-lg transition duration-300"
        >
          ✈️ Generate Itinerary
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ItineraryForm;
