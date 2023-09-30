import { useState, useMemo } from "react";
import Map from "./Map";
import PlacesAutocomplete from "./PlacesAutocomplete";
import powiaty from "@/public/geoData/powiaty.json";
import { useLoadScript, Libraries } from "@react-google-maps/api";
const turf = require("@turf/turf");

export default function ClientMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const libraries: Libraries | undefined = useMemo(() => ["places"], []);

  const initialCenter = {
    lat: 50.6667,
    lng: 17.9253,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey ? apiKey : "",
    libraries: libraries,
  });

  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const [availableRegion, setAvailableRegion] = useState<any>(null);
  const [error, setError] = useState("");

  const getPowiatID = (selectedLocation: any, powiaty: any) => {
    if (selectedLocation) {
      const point = turf.point([selectedLocation.lng, selectedLocation.lat]);

      for (const feature of powiaty.features) {
        if (feature.geometry.type === "Polygon") {
          const polygon = turf.polygon(feature.geometry.coordinates);
          if (turf.booleanPointInPolygon(point, polygon)) {
            return feature.properties.id;
          }
        } else if (feature.geometry.type === "MultiPolygon") {
          for (const coordinates of feature.geometry.coordinates) {
            const polygon = turf.polygon(coordinates);

            if (turf.booleanPointInPolygon(point, polygon)) {
              return feature.properties.id;
            }
          }
        }
      }

      return -1;
    } else {
      setError("Nie wybrano miejsca");
      console.log("nie wybrano");
    }
    setError("Niedostepny");
    return null;
  };

  const handleSubmit = async () => {
    const regionId: number | null = getPowiatID(selected, powiaty);

    if (regionId) {
      let response = await fetch(`/api/regions/${regionId}`, { method: "GET" });
      let json = await JSON.parse(await response.json());

      if (json.active) {
        setAvailableRegion(json);
        setError("");
      } else {
        setAvailableRegion(null);
        setError("Podany region jest nie dostepny");
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Map selected={selected} center={center} />
      <div className="p-4 flex flex-col justify-center items-center">
        <PlacesAutocomplete
          setSelected={setSelected}
          setCenter={setCenter}
          setError={setError}
          error={error}
        />
        <button
          onClick={handleSubmit}
          className="bg-teal-500 w-1/2 mb-5 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer focus:outline-none"
        >
          Sprawdź
        </button>
        {availableRegion && (
          <p>
            stawka: <strong>{availableRegion.price}</strong>
          </p>
        )}
      </div>
    </>
  );
}
