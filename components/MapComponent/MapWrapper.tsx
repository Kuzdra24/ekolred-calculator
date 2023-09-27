"use client";
import React from "react";


import dynamic from "next/dynamic";
const ClientMap = dynamic(
  () => import("@/components/MapComponent/ClientMap"),
  { ssr: false }
);

export const MapWrapper = () => {

  return (
    <div className="bg-white w-max flex rounded-xl drop-shadow-xl">
      <ClientMap />
    </div>
  );
};
