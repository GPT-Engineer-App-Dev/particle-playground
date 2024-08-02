import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Particle Generator</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Experience the magic of interactive particle systems. Control speed, shape, and interaction modes with your cursor.
      </p>
      <Link to="/particles">
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
          Try Particle Generator
        </Button>
      </Link>
    </div>
  );
};

export default Index;
