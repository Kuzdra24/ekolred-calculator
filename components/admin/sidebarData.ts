import marker from "../../public/assets/icons/marker.svg";
import document from "../../public/assets/icons/document.svg";
import users from "../../public/assets/icons/users.svg";
import home from "../../public/assets/icons/home.svg";
import apps from "../../public/assets/icons/apps.svg";

interface sidebarDataProp {
  slug: string;
  name: string;
  icon?: string;
  subItems?: Array<sidebarDataProp>;
}

export const sidebarData: Array<sidebarDataProp> = [
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
    slug: "/admin/serviceRegion",
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
