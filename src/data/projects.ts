export interface Project {
  number: string;
  name: string;
  category: string;
  href: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}
import modakalay from "../assets/modakalay.png";
import restaurantweb from "../assets/restaurantweb.png";
import lumiere from "../assets/lumiere.png";
import landingpage from "../assets/landingpage.png";

export const projects: Project[] = [
  {
    number: "01",
    name: "Modakalay ",
    category: "personal",
    href: "https://modakalay.netlify.app/",
    images: {
      col1Top: modakalay,
      col1Bottom: modakalay,
      col2: modakalay,
    },
  },
  {
    number: "02",
    name: "Landing Page",
    category: "personal",
    href: "https://bhoomijadhav.github.io/Landing-Page/",
    images: {
      col1Top: landingpage,
      col1Bottom: landingpage,
      col2: landingpage,
    },
  },
  {
    number: "03",
    name: "Restaurant Booking Website",
    category: "personal",
    href: "https://noirvine.lovable.app/",
    images: {
      col1Top: restaurantweb,
      col1Bottom: restaurantweb,
      col2: restaurantweb,
    },
  },
  {
    number: "04",
    name: "Lumiere",
    category: "Personal",
    href: "https://sparkle-softly-studio.lovable.app/",
    images: {
      col1Top: lumiere,
      col1Bottom: lumiere,
      col2: lumiere,
    },
  },
];
