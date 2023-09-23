"use client";

import L from "leaflet";
import powiaty from "@/public/geoData/powiaty.json";
import { useEffect, useState } from "react";

export default function PowiatyMap({ maxZoom = 10, style= {} }) {
  const [powiatyData, setPowiatyData] = useState<any>(powiaty);
  const [selectedPowiat, setSelectedPowiat] = useState<any>(null);
  const [price, setPrice] = useState<string>('0');

  const fetchPowiatyData = async () => {
    let pow = JSON.parse(JSON.stringify(powiatyData));

    let res = await fetch(`http://localhost:3000/api/regions`);
    let json = await res.json();

    for (let p of pow.features) {
      for (let fp of json) {
        if (fp.id == p.properties.id) {
          p.properties.aktywny = fp.active;
          p.properties.stawka = fp.price;
          break;
        }
      }
    }

    return pow;
  };

  const styleFunction = (feature: any): any => {
    return {
      fillColor: feature.properties.aktywny ? "green" : "#dcdcc09f", // Initial color
      fillOpacity: 0.6,
      color: "#f100d5", // border color
      weight: 0.25,
    };
  };

  const updatePowiat = async (
    id: number,
    name: string,
    price: number,
    active: boolean
  ) => {
    return await fetch("http://localhost:3000/api/regions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, price, active }),
    });
  };

  const createMapFromFetchedData = async () => {
    var powiatData: any = await fetchPowiatyData();

    const map = L.map("map", { maxZoom }).setView([52.0, 19.0], 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxNativeZoom: maxZoom,
    }).addTo(map);

    var powiatLayer = L.geoJSON(powiatData, {
      style: styleFunction,
    }).addTo(map);

    powiatLayer.bindTooltip((layer: any): any => {
      return layer.feature.properties.nazwa;
    });

    powiatLayer.on("click", async function (e) {
      let aktywny = !e.layer.feature.properties.aktywny ?? true;
      setPrice(e.layer.feature.properties.price);
      const response = await updatePowiat(
        e.layer.feature.properties.id,
        e.layer.feature.properties.nazwa,
        e.layer.feature.properties.stawka ?? 10,
        aktywny
      );

      if (response.status == 201) {
        e.layer.feature.properties.aktywny = aktywny;
        e.layer.setStyle({ fillColor: aktywny ? "green" : "#dcdcc09f" });
      }

      setSelectedPowiat(e.layer.feature.properties);
    });

    return () => {
      map.remove();
    };
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        id: selectedPowiat.id,
        stawka: price,
      };

      await fetch("http://localhost:3000/api/regions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Wystąpił błąd podczas zapytania:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await createMapFromFetchedData();
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        <div id="map" style={style}></div>
        {selectedPowiat != null && (
          <div className="p-4">
            <h2 className="capitalize">{selectedPowiat.nazwa}</h2>
            Stawka: {selectedPowiat.stawka} <br />
            Aktywny: {selectedPowiat.aktywny ? "TAK" : "NIE"} <br />
            <form onSubmit={handleSubmit}>
              <input type="checkbox" name="" id="active_chbx" />
              <label htmlFor="active_chbx">Aktywny</label>
              <br />
              <input
                className="border-solid border-2 border-cyan-800"
                type="number"
                placeholder="Stawka"
                value={price ? price : selectedPowiat.stawka}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input type="submit" />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
