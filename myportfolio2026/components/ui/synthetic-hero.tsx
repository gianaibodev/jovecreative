"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

gsap.registerPlugin(useGSAP);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform float u_dark;

  vec2 toPolar(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);
    vec2 polar = toPolar(p);
    float r = polar.x;
    float a = polar.y;
    vec2 i = p;
    float c = 0.0;
    float rot = r + u_time + p.x * 0.100;
    for (float n = 0.0; n < 4.0; n++) {
      float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
      p *= mat2(cos(rot - sin(u_time / 10.0)), sin(rot), -sin(cos(rot) - u_time / 10.0), cos(rot)) * -0.25;
      float t = r - u_time / (n + 30.0);
      i -= p + sin(t - i.y) + rr;
      c += 2.2 / length(vec2((sin(i.x + t) / 0.15), (cos(i.y + t) / 0.15)));
    }
    c /= 8.0;
    vec3 darkBg = vec3(0.02, 0.05, 0.08);
    vec3 darkWave = vec3(0.2, 0.5, 0.7);
    vec3 lightBg = vec3(0.95, 0.98, 1.0);
    vec3 lightWave = vec3(0.4, 0.7, 1.0);
    vec3 bgColor = mix(lightBg, darkBg, u_dark);
    vec3 waveColor = mix(lightWave, darkWave, u_dark);
    float intensity = smoothstep(0.0, 1.0, c * 0.6);
    vec3 finalColor = mix(bgColor, waveColor, intensity);
    fragColor = vec4(finalColor, 1.0);
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`;

function ShaderPlane({
  vertexShader: vs,
  fragmentShader: fs,
  uniforms,
}: {
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [key: string]: { value: unknown } };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vs}
        fragmentShader={fs}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href?: string; primary?: boolean; onClick?: () => void }>;
  microDetails?: Array<string>;
}

const SyntheticHero = ({
  title = "An experiment in light, motion, and the quiet chaos between.",
  description = "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
  badgeText = "React Three Fiber",
  badgeLabel = "Experience",
  ctaButtons = [
    { text: "Explore the Canvas", href: "#explore", primary: true },
    { text: "Learn More", href: "#learn-more" },
  ],
  microDetails = [
    "Immersive shader landscapes",
    "Hand-tuned motion easing",
    "Responsive, tactile feedback",
  ],
}: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      u_dark: { value: isDark ? 1.0 : 0.0 },
    }),
    [isDark]
  );

  useGSAP(
    () => {
      if (!headingRef.current) return;

      document.fonts.ready.then(() => {
        gsap.set(headingRef.current, {
          filter: "blur(16px)",
          y: 24,
          autoAlpha: 0,
          scale: 1.04,
        });
        if (badgeWrapperRef.current) {
          gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -8 });
        }
        if (paragraphRef.current) {
          gsap.set(paragraphRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }
        const microItems = microRef.current
          ? Array.from(microRef.current.querySelectorAll("li"))
          : [];
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (badgeWrapperRef.current) {
          tl.to(badgeWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);
        }
        tl.to(
          headingRef.current,
          { filter: "blur(0px)", y: 0, autoAlpha: 1, scale: 1, duration: 0.9 },
          0.1
        );
        if (paragraphRef.current) {
          tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.55");
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35");
        }
        if (microItems.length > 0) {
          tl.to(microItems, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.25");
        }
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const forceCanvasStyles = (canvas: HTMLCanvasElement) => {
      canvas.style.setProperty("pointer-events", "none", "important");
      canvas.style.setProperty("touch-action", "pan-y", "important");
      canvas.classList.add("hero-shader-canvas");
    };

    const existingCanvas = section.querySelector("canvas");
    if (existingCanvas) forceCanvasStyles(existingCanvas as HTMLCanvasElement);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node instanceof HTMLCanvasElement) forceCanvasStyles(node);
            if (node instanceof HTMLElement) {
              const c = node.querySelector?.("canvas");
              if (c) forceCanvasStyles(c as HTMLCanvasElement);
            }
          });
        }
        if (m.type === "attributes" && m.target instanceof HTMLCanvasElement) {
          forceCanvasStyles(m.target);
        }
      }
    });

    observer.observe(section, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });

    const interval = setInterval(() => {
      const c = section.querySelector("canvas");
      if (c) forceCanvasStyles(c as HTMLCanvasElement);
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative flex items-center justify-center min-h-screen overflow-visible"
      style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
    >
      <div
        className="hero-canvas-wrapper absolute inset-0 z-0 pointer-events-none"
        style={{ touchAction: "pan-y", pointerEvents: "none" }}
      >
        {mounted && (
          <Canvas
            key={isDark ? "dark" : "light"}
            gl={{ antialias: false, alpha: true }}
            dpr={dpr}
            style={{ width: "100%", height: "100%", touchAction: "pan-y", pointerEvents: "none" }}
            performance={{ min: 0.5 }}
          >
            <ShaderPlane
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              uniforms={shaderUniforms}
            />
          </Canvas>
        )}
      </div>

      <div
        className="hero-content relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-full"
        style={{ touchAction: "pan-y" }}
      >
        <div ref={badgeWrapperRef}>
          <Badge className="mb-6 bg-white/40 dark:bg-white/[0.03] hover:bg-white/50 dark:hover:bg-white/[0.08] text-blue-600 dark:text-blue-300 backdrop-blur-xl border border-zinc-300 dark:border-white/[0.12] uppercase tracking-wider font-medium flex items-center gap-2 px-4 py-1.5 shadow-md transition-all duration-300">
            <span className="text-[10px] font-bold tracking-[0.18em] text-blue-600/80 dark:text-blue-100/80">
              {badgeLabel}
            </span>
            <span className="h-1 w-1 rounded-full bg-blue-600/40 dark:bg-blue-200/60" />
            <span className="text-xs font-semibold tracking-tight text-blue-600 dark:text-blue-200">
              {badgeText}
            </span>
          </Badge>
        </div>

        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl max-w-4xl font-light tracking-tight text-foreground mb-4 px-2"
        >
          {title}
        </h1>

        <p
          ref={paragraphRef}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light px-4"
        >
          {description}
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          {ctaButtons.map((button, index) => {
            const isPrimary = button.primary ?? index === 0;
            const classes = isPrimary
              ? "px-10 py-4 rounded-full text-base font-bold backdrop-blur-2xl bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/10 text-blue-600 dark:text-white shadow-xl dark:shadow-none shadow-[0_15px_35px_rgba(59,130,246,0.25),0_5px_15px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2 hover:bg-blue-500/20 dark:hover:bg-white/10 hover:shadow-2xl"
              : "px-10 py-4 rounded-full text-base font-bold border border-zinc-300 dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.03] text-foreground dark:text-white hover:bg-white/60 dark:hover:bg-white/[0.08] backdrop-blur-2xl transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl active:scale-95";

            if (button.href) {
              return (
                <Button key={index} variant={isPrimary ? undefined : "outline"} className={classes} asChild>
                  <a href={button.href}>
                    {button.text}
                    {isPrimary && (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 group-hover:translate-x-1 transition-transform">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    )}
                  </a>
                </Button>
              );
            }
            return (
              <Button key={index} variant={isPrimary ? undefined : "outline"} className={classes} onClick={button.onClick}>
                {button.text}
              </Button>
            );
          })}
        </div>

        {microDetails.length > 0 && (
          <ul
            ref={microRef}
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light tracking-tight text-muted-foreground/85"
          >
            {microDetails.map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blue-500/40 dark:bg-blue-200/60" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SyntheticHero;
