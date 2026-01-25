"use client";

import React, { useRef, useEffect } from "react";

interface MousePosition {
  x: number | undefined;
  y: number | undefined;
  radius: number;
}

interface ParticleTextProps {
  hideInteractionHint?: boolean;
}

const ParticleText = ({ hideInteractionHint = false }: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<MousePosition>({ x: undefined, y: undefined, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      color: string;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 2;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 40 + 5;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mouse.current.x === undefined || mouse.current.y === undefined) {
          const dx = this.x - this.baseX;
          const dy = this.y - this.baseY;
          this.x -= dx / 10;
          this.y -= dy / 10;
          return;
        }

        let dx = (mouse.current.x as number) - this.x;
        let dy = (mouse.current.y as number) - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (mouse.current.radius - distance) / mouse.current.radius;
        if (force < 0) force = 0;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      if (!ctx || !canvas) return;
      particlesArray = [];
      const text = "Loading";
      const fontSize = Math.min(window.innerWidth / 6, 200);
      const textX = canvas.width / 2;
      const textY = canvas.height / 2;

      ctx.font = `bold ${fontSize}px "Arial Black", Gadget, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0.2, "#41d1ff");
      gradient.addColorStop(0.5, "#41a9ff");
      gradient.addColorStop(0.8, "#61dafb");
      ctx.fillStyle = gradient;

      ctx.fillText(text, textX, textY);
      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < textCoordinates.height; y += 4) {
        for (let x = 0; x < textCoordinates.width; x += 4) {
          const alphaIndex = y * 4 * textCoordinates.width + x * 4 + 3;
          if (textCoordinates.data[alphaIndex] > 128) {
            const r = textCoordinates.data[alphaIndex - 3];
            const g = textCoordinates.data[alphaIndex - 2];
            const b = textCoordinates.data[alphaIndex - 1];
            const color = `rgb(${r},${g},${b})`;
            particlesArray.push(new Particle(x, y, color));
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.draw();
        p.update();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        width: "100dvw",
        minHeight: "100dvh",
        height: "100dvh",
        background: "#0a0f18",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }}></canvas>
      {!hideInteractionHint && (
        <div
          className="particle-loading-hint"
          style={{
            position: "absolute",
            bottom: "4%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(65, 169, 255, 0.9)",
            fontSize: "14px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10000,
            fontWeight: 500,
            letterSpacing: "0.5px",
            textShadow: "0 2px 10px rgba(65, 169, 255, 0.3)",
            maxWidth: "90%",
          }}
        >
          <span className="hidden sm:inline">Move your mouse to interact</span>
          <span className="sm:hidden">Touch and move to interact</span>
        </div>
      )}
    </div>
  );
};

export default ParticleText;

