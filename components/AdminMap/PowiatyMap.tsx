"use client";

import L from "leaflet";
import powiaty from "@/public/geoData/powiaty.json";
import { useEffect, useLayoutEffect, useState } from "react";

export default function PowiatyMap({ maxZoom = 10 }) {
    const [powiatyData, setPowiatyData] = useState<any>(powiaty);
    const [selectedPowiat, setSelectedPowiat] = useState<any>(null);

    const fetchPowiatyData = async () => {
        let pow = JSON.parse(JSON.stringify(powiatyData));

        let res = await fetch("http://localhost:3000/api/powiaty");
        let json = await res.json();

        for (let p of pow.features) {
            for (let fp of json) {
                if (fp.id == p.properties.id) {
                    p.properties.aktywny = fp.aktywny;
                    p.properties.stawka = fp.stawka;

                    console.log("CHANGED ACTIVE - ", fp.nazwa);
                    break;
                }
            }
        }

        return pow
    };

    const styleFunction = (feature: any): any => {
        return {
            fillColor: feature.properties.aktywny ? 'green' : '#dcdcc09f', // Initial color
            fillOpacity: 0.6,
            color: '#f100d5', // border color
            weight: 0.25
        }
    };

    const updatePowiat = async (id: number, nazwa: string, stawka: number, aktywny: boolean) => {
        return await fetch('http://localhost:3000/api/powiaty', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nazwa, stawka, aktywny })
        });
    };

    const createMapFromFetchedData = async () => {
        var powiatData: any = await fetchPowiatyData();

        const map = L.map('map', { maxZoom }).setView([52.0, 19.0], 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxNativeZoom: maxZoom,
        }).addTo(map);

        var powiatLayer = L.geoJSON(powiatData, {
            style: styleFunction,
        }).addTo(map);


        powiatLayer.bindTooltip((layer: any): any => {
            return layer.feature.properties.nazwa;
        });

        powiatLayer.on('click', async function (e) {
            // let wasActive = e.layer.feature.properties.active ?? false;
            // var powiatName = e.layer.feature.properties.nazwa;

            // console.log(wasActive, e.layer.feature.properties.stawka);
            let aktywny = !e.layer.feature.properties.aktywny ?? true;

            const response = await updatePowiat(e.layer.feature.properties.id, e.layer.feature.properties.nazwa,
                e.layer.feature.properties.stawka ?? 10, aktywny);

            if (response.status == 201) {
                e.layer.feature.properties.aktywny = aktywny;
                e.layer.setStyle({ fillColor: aktywny ? 'green' : '#dcdcc09f' });
            }

            setSelectedPowiat(e.layer.feature.properties);
        });
    };

    useEffect(() => {
        createMapFromFetchedData();
    }, []);


    return (
        <>
            <div className="flex">
                <div id="map" style={{ height: "500px", width: "500px" }}></div>
                {selectedPowiat != null && <div>
                    Powait: {selectedPowiat.nazwa} <br />
                    Stawka: {selectedPowiat.stawka} <br />
                    Aktywny: {selectedPowiat.aktywny ? "TAK" : "NIE"} <br />
                </div>}
            </div>
        </>
    )
}