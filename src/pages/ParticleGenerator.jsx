import React, { useState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const ParticleGenerator = () => {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(2);
  const [shape, setShape] = useState('circle');
  const [interactionMode, setInteractionMode] = useState('attract');
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
        });
      }
      setParticles(newParticles);
    };

    const updateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let { x, y, speedX, speedY } = particle;

          if (interactionMode === 'attract' || interactionMode === 'repel') {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              const force = interactionMode === 'attract' ? 0.5 : -0.5;
              speedX += (dx / distance) * force;
              speedY += (dy / distance) * force;
            }
          }

          x += speedX;
          y += speedY;

          if (x < 0 || x > canvas.width) speedX *= -1;
          if (y < 0 || y > canvas.height) speedY *= -1;

          return { ...particle, x, y, speedX, speedY };
        })
      );
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        if (shape === 'circle') {
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        } else if (shape === 'square') {
          ctx.rect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
        } else if (shape === 'triangle') {
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.closePath();
        }
        ctx.fillStyle = 'rgba(100, 100, 255, 0.7)';
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, shape, interactionMode, mousePos]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative h-screen" onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <Label htmlFor="speed-control">Speed</Label>
          <Slider
            id="speed-control"
            min={1}
            max={10}
            step={0.1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="shape-select">Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger id="shape-select">
              <SelectValue placeholder="Select shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="interaction-select">Interaction Mode</Label>
          <Select value={interactionMode} onValueChange={setInteractionMode}>
            <SelectTrigger id="interaction-select">
              <SelectValue placeholder="Select interaction mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="attract">Attract</SelectItem>
              <SelectItem value="repel">Repel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ParticleGenerator;
