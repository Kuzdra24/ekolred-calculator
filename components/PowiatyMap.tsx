"use client";

import L from "leaflet";

import powiaty from "@/public/geoData/powiaty.json";
import { useLayoutEffect } from "react";

export default function PowiatyMap() {

    useLayoutEffect(() => {
        const map = L.map('map').setView([52.0, 19.0], 6);

        var powiatData: any = powiaty;

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var powiatLayer = L.geoJSON(powiatData, {
            style: {
                fillColor: '#fbb6', // Initial color
                fillOpacity: 0.6,
                color: '#ff0000',
                weight: 0.25
            }
        }).addTo(map);

        powiatLayer.bindTooltip((layer: any): any => {
            return layer.feature.properties.nazwa;
        });

        powiatLayer.on('click', function (e) {
            e.layer.feature.properties.active = !e.layer.feature.properties.active ?? true;
            e.layer.setStyle({ fillColor: e.layer.feature.properties.active ? 'green' : '#fbb6' });

            var powiatName = e.layer.feature.properties.nazwa;
            console.log(powiatName);
        });

    }, []);


    return <div id="map" style={{ height: "500px", width: "50%" }}></div>;
}