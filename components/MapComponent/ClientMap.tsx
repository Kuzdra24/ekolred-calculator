import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import powiaty from "@/public/geoData/powiaty.json";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const turf = require("@turf/turf");

export default function ClientMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey ? apiKey : "",
    libraries: ["places"],
  });

  const initialCenter = {
    lat: 50.6667,
    lng: 17.9253,
  };

  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(initialCenter);

  const mapContainerStyle = {
    width: "500px",
    height: "500px",
  };

  const getPowiatID = (selectedLocation: any, powiaty: any) => {
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
    return null;
  };

  const handleSubmit = async () => {
    const regionId: number | null = getPowiatID(selected, powiaty);

    if (regionId) {
      fetch(`/api/regions/${regionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Pobrano region:", data);
        })
        .catch((error) => {
          console.error("Wystąpił błąd:", error);
        });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center">
        <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} />
        <button
          onClick={handleSubmit}
          className="bg-teal-500 w-1/2 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer focus:outline-none"
        >
          Sprawdź
        </button>
        powiat: <strong>{}</strong>
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete: React.FC<{ setSelected: any; setCenter: any }> = ({
  setSelected,
  setCenter,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string): Promise<void> => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCenter({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input mb-5 w-123 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
