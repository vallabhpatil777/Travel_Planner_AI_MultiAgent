import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";

const ItineraryDisplay = () => {
  const { itinerary, status, error } = useSelector(
    (state: RootState) => state.itinerary
  );


const formatItinerary = (text: string) => {
  return text
    .split("\n")
    .map((line, index) => {
      if (line.startsWith("* ")) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.replace("* ", "")}
          </li>
        );
      }
      return <p key={index}>{line}</p>;
    });
};

return (
  <>
    {(status === "loading" || status === "failed" || (status === "succeeded" && itinerary)) && (
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-lg w-full border border-gray-700 mt-6">
        {status === "succeeded" && itinerary && (
          <h2 className="text-2xl font-semibold text-center mb-4">📍 Your Itinerary</h2>
        )}

        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Loader className="animate-spin" size={20} />
            <p>Generating itinerary...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={20} />
            <p className="text-sm">Error: {error}</p>
          </div>
        )}

        {status === "succeeded" && itinerary && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <CheckCircle size={20} />
              <p className="font-semibold">Itinerary Ready!</p>
            </div>

            <div className="text-gray-300">
              <ul className="list-disc pl-4">{formatItinerary(itinerary)}</ul>
            </div>
          </div>
        )}
      </div>
    )}
  </>
);
};

export default ItineraryDisplay;
