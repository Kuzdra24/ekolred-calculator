"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'

import powiaty from "@/public/geoData/powiaty.json";

export default function PowiatyMap() {
    const position: any = [52.0, 19.0];

    const setColor = ({ properties }: any) => {
        return {
            fillColor: '#fbb6',
            fillOpacity: 0.6,
            color: '#ff0000',
            weight: 1
        };
    };

    const clickFeature = (feature: any, layer: any) => {
        layer.on({
            'click': (e: any) => {
                e.target.feature.properties.active = !e.target.feature.properties.active ?? true;
                e.target.setStyle({ fillColor: e.target.feature.properties.active ? 'green' : '#fbb6' });
                console.log(e.target.feature.properties.nazwa);
            },
        });
    };

    return (
        <>
            <span style={{color: 'red'}}>CLICK NA POWIAT!!</span>
            <MapContainer zoom={6} scrollWheelZoom={true} style={{ width: "1000px", height: '500px' }} center={position}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={powiaty as any} style={setColor} onEachFeature={clickFeature} />
            </MapContainer>
        </>
    );
}