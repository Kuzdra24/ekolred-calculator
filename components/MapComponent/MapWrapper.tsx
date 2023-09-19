"use client";
import React, { useState, useEffect } from "react";
import { InputPlace } from "./InputPlace";
import PowiatyMap from "./PowiatyMap";

export const MapWrapper = () => {
  const [city, setCity]: any = useState({});

  return (
    <div className="bg-white w-max flex rounded-xl drop-shadow-xl">
      <PowiatyMap />
      <div className="p-6 flex flex-col items-center justify-around">
        <InputPlace onPlaceSelect={(place) => setCity(place)} />
        <div>
          <p>
            <strong>Lokalizacja: </strong> {city.formatted_address}
          </p>
          <p>
            <strong>Powiaty: </strong>
          </p>
        </div>
      </div>
    </div>
  );
};
