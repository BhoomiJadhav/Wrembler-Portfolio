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
    name: "Restaurant Booking Website",
    category: "personal",
    href: "https://www.instagram.com/wrembler.studios/",
    images: {
      col1Top: restaurantweb,
      col1Bottom: restaurantweb,
      col2: restaurantweb,
    },
  },
  {
    number: "03",
    name: "Brand Launch Digital",
    category: "Personal",
    href: "#",
    images: {
      col1Top:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1Bottom:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
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
