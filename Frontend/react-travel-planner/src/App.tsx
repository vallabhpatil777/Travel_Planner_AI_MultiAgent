import ItineraryForm from "./components/ItineraryForm";
import ItineraryDisplay from "./components/ItineraryDisplay";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg text-center"
      >
        🚀 Travel Planner AI ✈️
      </motion.h1>
      <ItineraryForm />

      <ItineraryDisplay />
    </div>
  );
}

export default App;
