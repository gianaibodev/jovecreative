'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ErrorBoundary } from "@/components/error-boundary";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-slate-100 dark:bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 dark:block hidden"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-neutral-50 dark:to-neutral-400">
            Interactive 3D
          </h3>
          <p className="mt-4 text-slate-600 dark:text-neutral-300 max-w-lg">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[300px]">
          <ErrorBoundary
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center border-l border-zinc-300 dark:border-white/10">
                <p className="text-sm text-muted-foreground">
                  Interactive 3D preview is currently unavailable on this device.
                </p>
              </div>
            }
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </ErrorBoundary>
        </div>
      </div>
    </Card>
  )
}


