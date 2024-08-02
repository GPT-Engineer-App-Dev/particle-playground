import { Home, Sparkles } from "lucide-react";
import Index from "./pages/Index.jsx";
import ParticleGenerator from "./pages/ParticleGenerator.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Particle Generator",
    to: "/particles",
    icon: <Sparkles className="h-4 w-4" />,
    page: <ParticleGenerator />,
  },
];
