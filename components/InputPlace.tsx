'use client'
import { useState } from "react";

interface InputPropTypes {
  name: string;
  id: string;
}

export const InputPlace: React.FC<InputPropTypes> = ({ name, id}) => {

    const [place, setPlace] = useState<string>(''); 
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setPlace(newValue);
    };

    return (
        <input
            className="border shadow-grey-500/100 p-2 w-96 rounded-xl border-solid-10 border-grey-200"
            id={id}
            name={name}
            type="text"
            placeholder="Podaj lokalizację (ulica / miasto / kod pocztowy)"
            value={place} 
            onChange={handleInputChange} 
            autoFocus
        />
    );
};
