"use client";

import L from "leaflet";
import powiaty from "@/public/geoData/powiaty.json";
import { useEffect, useState } from "react";

type SelectedRegion = {
  id: number,
  nazwa: number,
  price: number,
  active: boolean,
};

export default function PowiatyMap({ maxZoom = 10, style = {} }) {
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(null);

  const [price, setPrice] = useState<string>('0');
  const [active, setActive] = useState<boolean>(false);

  const fetchPowiatyData = async () => {
    let pow = JSON.parse(JSON.stringify(powiaty));

    let res = await fetch(`http://localhost:3000/api/regions`);
    let json = await res.json();

    for (let p of pow.features) {
      for (let fp of json) {
        if (fp.id == p.properties.id) {
          p.properties.active = fp.active;
          p.properties.price = fp.price;
          break;
        }
      }
    }

    return pow;
  };

  const styleFunction = (feature: any): any => {
    return {
      fillColor: feature.properties.active ? "green" : "#dcdcc09f", // Initial color
      fillOpacity: 0.6,
      color: "#f100d5", // border color
      weight: 0.25,
    };
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
      powiatLayer.resetStyle();
      e.layer.setStyle({ fillColor: "#2447e49f" });

      setSelectedRegion(e.layer.feature.properties);
      setPrice(e.layer.feature.properties.price ?? "");
      setActive(e.layer.feature.properties.active ?? false);
    });

    return () => {
      map.remove();
    };
  };

  const handleSubmit = async (e: any) => {
    try {
      const updatedData = {
        id: selectedRegion?.id,
        name: selectedRegion?.nazwa,
        active: active,
        price: price,
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
        {selectedRegion != null && (
          <div className="p-4">

            <h2 className="capitalize font-bold">{selectedRegion.nazwa}</h2>
            <br />

            <form onSubmit={handleSubmit}>
              <label htmlFor="active_chbx">Aktywny: </label>
              <input type="checkbox" name="" id="active_chbx" checked={active} onChange={(e) => setActive(e.target.checked)} />

              <br />


              Stawka:<br />
              <input
                className="border-solid border-2 border-cyan-800"
                type="number"
                placeholder="Stawka"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />

              <br />

              <button>Zapisz</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
