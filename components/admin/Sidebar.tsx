"use client";
import React, { useState } from "react";
import home from "../../public/assets/icons/home.svg";
import apps from "../../public/assets/icons/apps.svg";
import angleSm from "../../public/assets/icons/angle-small-down.svg";
import marker from "../../public/assets/icons/marker.svg";
import document from "../../public/assets/icons/document.svg";
import users from "../../public/assets/icons/users.svg";

import Image from "next/image";
import Link from "next/link";

export const Sidebar: React.FC<{ session: any }> = ({ session }) => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  interface sidebarDataProp {
    slug: string;
    name: string;
    icon?: string;
    subItems?: Array<sidebarDataProp>;
  }

  const sidebarData: Array<sidebarDataProp> = [
    {
      slug: "/admin",
      name: "Dashboard",
      icon: home,
    },
    {
      slug: "#",
      name: "Kalkulator",
      icon: apps,
      subItems: [
        {
          name: "moduły",
          slug: "/admin",
        },
        {
          name: "falowniki",
          slug: "/admin",
        },
        {
          name: "magazyny energii",
          slug: "/admin",
        },
      ],
    },
    {
      slug: "#",
      name: "Mapa powiatow",
      icon: marker,
    },
    {
      slug: "#",
      name: "Oferty",
      icon: document,
    },
    {
      slug: "#",
      name: "Moderatorzy",
      icon: users,
    },
  ];
  return (
    <div className="dashboard-layout">
      <nav className="side-nav bg-gray-700">
        <div>
          <h2 className="header">Panel Administratora</h2>

          <ul className="menu">
            {sidebarData.map(({ slug, name, icon, subItems }) => (
              <li className="menu-item flex" key={name}>
                {subItems ? (
                  <div className="w-full">
                    <Link
                      href={slug}
                      className="submenu flex hover:bg-gray-600 w-full p-3 rounded-md"
                      onClick={() => setIsCalcOpen(!isCalcOpen)}
                    >
                      <div className="white-svg-icon mr-5 w-12">
                        <Image
                          src={icon ? icon : ""}
                          alt={`icon ${name}`}
                          width={24}
                          height={24}
                        />
                      </div>
                      {name}
                      <div className="white-svg-icon w-full flex justify-end">
                        <Image
                          className={isCalcOpen ? "rotate-180" : ""}
                          src={angleSm}
                          alt={`icon ${name}`}
                          width={20}
                          height={20}
                        />
                      </div>
                    </Link>
                    {isCalcOpen && (
                      <ul className="submenu-list ml-4">
                        {subItems.map((subItem) => (
                          <li
                            className="submenu-item m-2 hover:bg-gray-600 w-5/6 p-2 rounded-md "
                            key={subItem.name}
                          >
                            <Link href={subItem.slug}>{subItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Render regular link for other items
                  <Link
                    href={slug}
                    className="flex items-center hover:bg-gray-600 w-full p-3 rounded-md"
                  >
                    <div className="white-svg-icon mr-5">
                      <Image
                        src={icon ? icon : ""}
                        alt={`icon ${name}`}
                        width={24}
                        height={24}
                      />
                    </div>
                    {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="user">
          <span style={{ fontSize: "0.75rem" }}>Zalogowano:</span>
          <br />
          <a
            href="/admin/settings"
            style={{ display: "block", marginTop: "0.5rem" }}
          >
            🔗 {session.user.firstName + " " + session.user.lastName}
          </a>
        </div>
      </nav>
    </div>
  );
};
