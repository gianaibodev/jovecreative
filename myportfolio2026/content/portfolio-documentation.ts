export interface ShaderCredit {
  name: string;
  author: string;
  source: string;
  license?: string;
  description: string;
}

export interface LibraryCredit {
  name: string;
  version: string;
  author: string;
  license: string;
  purpose: string;
  url?: string;
}

export const shaderCredits: ShaderCredit[] = [
  {
    name: "LightSpeed Loader",
    author: "Matthias Hurrle (@atzedent)",
    source: "Custom fragment shader integration",
    description: "A high-performance WebGL 2.0 shader creating a 'warp speed' entrance effect. Features custom hue-shifting particle systems.",
    license: "Custom"
  },
  {
    name: "MeshGradient & Dithering",
    author: "Paper Design",
    source: "@paper-design/shaders-react",
    description: "Dynamic multi-color mesh gradients combined with an overlay dithering pass to create a unique 'Pixel-Art editorial' aesthetic.",
    license: "MIT"
  },
  {
    name: "Adaptive Wave Shader",
    author: "Community Open Source",
    source: "GLSL Fragment Shader",
    description: "A noise-based wave system used for the hero background, dynamically interpolating between light and dark modes.",
    license: "Open Source"
  },
  {
    name: "Gallery Distortion Shader",
    author: "OGL Library Community",
    source: "OGL Pipeline",
    description: "Interactive wave distortions implemented via the Object-Oriented Graphics Library for high-performance 3D gallery effects.",
    license: "MIT"
  }
];

export const libraryCredits: LibraryCredit[] = [
  {
    name: "Next.js 16",
    version: "16.1.0",
    author: "Vercel",
    license: "MIT",
    purpose: "The backbone of the application, utilizing App Router for state-of-the-art routing and SSR/ISR performance.",
    url: "https://nextjs.org"
  },
  {
    name: "Three.js & R3F",
    version: "0.182.0",
    author: "mrdoob / pmndrs",
    license: "MIT",
    purpose: "Powering the interactive 3D components and complex shader planes.",
    url: "https://threejs.org"
  },
  {
    name: "Framer Motion",
    version: "12.23.26",
    author: "Framer",
    license: "MIT",
    purpose: "Handling the 'Apple-style' physics-based animations and page transitions.",
    url: "https://framer.com/motion"
  },
  {
    name: "GSAP",
    version: "3.14.2",
    author: "GreenSock",
    license: "Standard",
    purpose: "Orchestrating complex sequence-based animations in the hero and text reveals.",
    url: "https://gsap.com"
  }
];

