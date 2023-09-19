"use client";
import Autocomplete from "react-google-autocomplete";

interface InputPlaceProps {
  onPlaceSelect: (place: any) => void; // Zastąp "any" odpowiednim typem, jeśli jest dostępny
}

export const InputPlace: React.FC<InputPlaceProps> = ({onPlaceSelect}) => {
 
  return (
    <>
      <Autocomplete
        className="border shadow-grey-500/100 p-2 w-86 rounded-xl border-solid-10 border-grey-200"
        apiKey={process.env.GOOGLE_API_KEY}
        onPlaceSelected={(place) => onPlaceSelect(place)}
      />
    </>
  );
};
