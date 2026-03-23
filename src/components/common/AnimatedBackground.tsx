import { memo, useEffect, useRef } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';
import type { BackgroundAnimation } from '../../api/types/customization';

import './AnimatedBackground.scss';

interface OwnProps {
  animation: BackgroundAnimation;
}

const AnimatedBackground: FC<OwnProps> = ({ animation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    let time = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * (animation.speed || 1);
        this.vy = (Math.random() - 0.5) * (animation.speed || 1);
        this.size = Math.random() * 3 + 1;
        this.color = animation.colors[Math.floor(Math.random() * animation.colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      const count = Math.floor((animation.intensity || 0.5) * 100);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawGradient = () => {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      animation.colors.forEach((color, index) => {
        gradient.addColorStop(index / (animation.colors.length - 1), color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawWaves = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      animation.colors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin((x + time * (animation.speed || 1) * 10 + index * 100) * 0.01) * 50 
            + canvas.height / 2 + index * 50;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
    };

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGradient();
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    };

    const drawStars = () => {
      if (!ctx) return;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
    };

    const drawMatrix = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '15px monospace';
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.fillText(String.fromCharCode(Math.random() * 128), particle.x, particle.y);
        
        particle.y += animation.speed || 1;
        if (particle.y > canvas.height) {
          particle.y = 0;
        }
      });
    };

    const animate = () => {
      time++;
      
      switch (animation.type) {
        case 'gradient':
          drawGradient();
          break;
        case 'particles':
          drawParticles();
          break;
        case 'waves':
          drawWaves();
          break;
        case 'stars':
          drawStars();
          break;
        case 'matrix':
          drawMatrix();
          break;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animation]);

  return <canvas ref={canvasRef} className="AnimatedBackground" />;
};

export default memo(AnimatedBackground);
