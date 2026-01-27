"use client"

import { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { X, ExternalLink, ChevronLeft, ChevronRight, FolderOpen, Star } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  image: string
  title: string
}

interface AnimatedFolderProps {
  title: string
  projects: Project[]
  className?: string
  color?: string
  href?: string
  isPinned?: boolean
}

export function AnimatedFolder({ title, projects, className, color, href, isPinned = false }: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const router = useRouter()

  // Use passed color or default blue
  const baseH = color ? color.split(',')[0].replace('hsl(', '') : "217"
  const baseS = color ? color.split(',')[1] : "91%"

  const toGlassTint = (c?: string, alpha = 0.22) => {
    const base = c ?? (isDark ? "hsl(217, 70%, 50%)" : "hsl(217, 91%, 60%)")
    return base.replace("hsl(", "hsla(").replace(")", `,${alpha})`)
  }

  // Increase saturation/opacity for both themes - more vibrant and visible
  const folderBackColor = toGlassTint(color, 0.45)
  const folderFrontColor = toGlassTint(color, 0.55)
  const folderTabColor = toGlassTint(color, 0.65)
  const folderGlowColor = toGlassTint(color, 0.30)

  const handleProjectClick = (project: Project, index: number) => {
    const cardEl = cardRefs.current[index]
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect())
    }
    setSelectedIndex(index)
    setHiddenCardId(project.id)
  }

  const handleCloseLightbox = () => {
    setSelectedIndex(null)
    setSourceRect(null)
  }

  const handleCloseComplete = () => {
    setHiddenCardId(null)
  }

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex)
    setHiddenCardId(projects[newIndex]?.id || null)
  }

  const handleFolderClick = (e: React.MouseEvent) => {
    // Only redirect on desktop (when hovered), not on mobile
    // On mobile, users can tap project cards to preview them
    if (href && isHovered && window.innerWidth >= 768) {
      // Add delay to allow microinteractions to be seen
      setTimeout(() => {
        router.push(href)
      }, 5000)
    }
  }

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "p-4 sm:p-6 md:p-8 rounded-2xl cursor-pointer",
          "border border-black/5 dark:border-white/[0.12]",
          "transition-all duration-500 ease-out",
          "hover:border-white/20 dark:hover:border-white/20",
          "group",
          "w-full max-w-sm overflow-visible",
          className,
        )}
        style={{
          minWidth: "min(280px, 100%)",
          maxWidth: "100%",
          minHeight: "320px",
          perspective: "1000px",
          backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015)), radial-gradient(circle at 50% 20%, ${folderGlowColor}, transparent 50%)`,
          zIndex: isHovered ? 40 : 1, // Increase z-index on hover
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleFolderClick}
      >
        {/* Backdrop blur layer - moved here to prevent clipping children in Safari */}
        <div className="absolute inset-0 rounded-2xl backdrop-blur-2xl bg-white/22 dark:bg-white/[0.065] -z-10 pointer-events-none" />

        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 70%, hsl(var(--accent)) 0%, transparent 70%)",
            opacity: isHovered ? 0.03 : 0,
          }}
        />

        <div className="relative flex items-center justify-center mb-4" style={{ height: "160px", width: "200px", position: "relative", overflow: "visible" }}>
          {/* Folder back layer - z-index 10 */}
          <div
            className="absolute rounded-lg backdrop-blur-lg"
            style={{
              width: "128px",
              height: "96px",
              left: "50%",
              top: "50%",
              marginLeft: "-64px",
              marginTop: "-48px",
              backgroundColor: folderBackColor,
              border: "1px solid rgba(255,255,255,0.14)",
              transform: isHovered
                ? "translateY(0) rotateX(-15deg)"
                : "translateY(0) rotateX(0deg)",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
              opacity: 1,
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className="absolute rounded-t-md backdrop-blur-lg"
            style={{
              width: "48px",
              height: "16px",
              top: "calc(50% - 48px - 12px)",
              left: "calc(50% - 64px + 16px)",
              backgroundColor: folderTabColor,
              border: "1px solid rgba(255,255,255,0.16)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
              opacity: 1,
            }}
          />

          {/* Project cards - z-index 20, between back and front */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className="absolute rounded-lg backdrop-blur-lg"
            style={{
              width: "128px",
              height: "96px",
              left: "50%",
              top: "calc(50% - 48px + 4px)",
              marginLeft: "-64px",
              backgroundColor: folderFrontColor,
              border: "1px solid rgba(255,255,255,0.16)",
              transform: isHovered
                ? "translateY(0) rotateX(25deg) translateY(8px)"
                : "translateY(0) rotateX(0deg)",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
              opacity: 1,
            }}
          />

          {/* Folder shine effect - z-index 31 */}
          <div
            className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
            style={{
              left: "50%",
              top: "calc(50% - 48px + 4px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 50%)",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "translateX(-50%) rotateX(25deg) translateY(8px)"
                : "translateX(-50%) rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Folder title */}
        <h3
          className="text-lg font-semibold text-foreground mt-4 transition-all duration-300 z-40 relative flex items-center gap-2"
          style={{
            transform: isHovered ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {isPinned && (
            <Star
              className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0"
              aria-label="Featured category"
            />
          )}
          {title}
        </h3>

        {/* Project count */}
        <p
          className="text-sm text-muted-foreground transition-all duration-300 z-40 relative mb-4"
          style={{
            opacity: isHovered ? 0.7 : 1,
          }}
        >
          {projects.length} projects
        </p>

        {/* View Details Link - Visible on mobile, appears on hover on desktop */}
        {href && (
          <Link
            href={href}
            className={cn(
              "z-50 relative px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-500",
              "border border-white/20 shadow-lg backdrop-blur-md",
              "text-white flex items-center gap-2",
              "md:opacity-0 md:translate-y-3",
              "md:group-hover:opacity-100 md:group-hover:translate-y-0",
              "hover:scale-105 active:scale-95 group/btn"
            )}
            style={{
              backgroundColor: folderTabColor, // Using the folder's tab color for consistency
              boxShadow: `0 8px 16px -4px ${folderGlowColor}, inset 0 1px 1px rgba(255,255,255,0.3)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Explore Category
            <FolderOpen className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        )}

        {/* Hover hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
          <span>Hover to explore</span>
        </div>
      </div>

      <ImageLightbox
        projects={projects.slice(0, 3)}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  )
}

interface ImageLightboxProps {
  projects: Project[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  sourceRect: DOMRect | null
  onCloseComplete?: () => void
  onNavigate: (index: number) => void
}

function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">("initial")
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  const [prevIndex, setPrevIndex] = useState(currentIndex)
  const [isSliding, setIsSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const containerRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length
  const hasNext = internalIndex < totalProjects - 1
  const hasPrev = internalIndex > 0

  const currentProject = projects[internalIndex]
  const previousProject = projects[prevIndex]

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? "left" : "right"
      const prevIdx = internalIndex
      const targetIdx = currentIndex

      setTimeout(() => {
        setSlideDirection(direction)
        setPrevIndex(prevIdx)
        setIsSliding(true)
      }, 0)

      const timer = setTimeout(() => {
        setInternalIndex(targetIdx)
        setIsSliding(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, isOpen, internalIndex, isSliding])

  useEffect(() => {
    if (isOpen) {
      const targetIdx = currentIndex
      setTimeout(() => {
        setInternalIndex(targetIdx)
        setPrevIndex(targetIdx)
        setIsSliding(false)
      }, 0)
    }
  }, [isOpen, currentIndex])

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return
    onNavigate(internalIndex + 1)
  }, [internalIndex, totalProjects, isSliding, onNavigate])

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return
    onNavigate(internalIndex - 1)
  }, [internalIndex, isSliding, onNavigate])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    onClose()
    setTimeout(() => {
      setIsClosing(false)
      setShouldRender(false)
      setAnimationPhase("initial")
      onCloseComplete?.()
    }, 400)
  }, [onClose, onCloseComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") navigateNext()
      if (e.key === "ArrowLeft") navigatePrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleClose, navigateNext, navigatePrev])

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setTimeout(() => {
        setShouldRender(true)
        setAnimationPhase("initial")
        setIsClosing(false)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimationPhase("animating")
          })
        })
      }, 0)
      const timer = setTimeout(() => {
        setAnimationPhase("complete")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, sourceRect])

  const handleDotClick = (idx: number) => {
    if (isSliding || idx === internalIndex) return
    onNavigate(idx)
  }

  if (!shouldRender || !currentProject) return null

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {}

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const targetWidth = Math.min(768, viewportWidth - 64)
    const targetHeight = Math.min(viewportHeight * 0.85, 600)

    const targetX = (viewportWidth - targetWidth) / 2
    const targetY = (viewportHeight - targetHeight) / 2

    const scaleX = sourceRect.width / targetWidth
    const scaleY = sourceRect.height / targetHeight
    const scale = Math.max(scaleX, scaleY)

    const translateX = sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2)
    const translateY = sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2)

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    }
  }

  const getFinalStyles = (): React.CSSProperties => {
    return {
      transform: "translate(0, 0) scale(1)",
      opacity: 1,
    }
  }

  const currentStyles = animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles()

  return (
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8")}
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        style={{
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className={cn(
          "absolute top-5 right-5 z-50",
          "w-10 h-10 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-105 active:scale-95",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
        }}
      >
        <X className="w-4 h-4" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigatePrev()
        }}
        disabled={!hasPrev || isSliding}
        className={cn(
          "absolute left-4 md:left-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          navigateNext()
        }}
        disabled={!hasNext || isSliding}
        className={cn(
          "absolute right-4 md:right-8 z-50",
          "w-12 h-12 flex items-center justify-center",
          "rounded-full bg-muted/50 backdrop-blur-md",
          "border border-border",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-300 ease-out hover:scale-110 active:scale-95",
          "disabled:opacity-0 disabled:pointer-events-none",
        )}
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform: animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms",
        }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.95)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
          transformOrigin: "center center",
        }}
      >
        <div
          className={cn("relative overflow-hidden", "rounded-2xl", "bg-card", "ring-1 ring-border", "shadow-2xl")}
          style={{
            borderRadius: animationPhase === "initial" && !isClosing ? "8px" : "16px",
            transition: "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)" : "none",
              }}
            >
              {projects.map((project, idx) => (
                <div key={project.id} className="relative w-full h-[400px] md:h-[600px] flex-shrink-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - Project preview image in lightbox viewer`}
                    fill
                    className="object-contain bg-background"
                  />
                </div>
              ))}
            </div>

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/20 via-transparent to-card/10" />
          </div>

          <div
            className={cn("px-6 py-5", "bg-card", "border-t border-border")}
            style={{
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform: animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-foreground tracking-tight truncate h-7">
                  {currentProject?.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-muted-foreground">
                    <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                      ←
                    </kbd>
                    <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-muted text-muted-foreground rounded border border-border">
                      →
                    </kbd>{" "}
                    to navigate
                  </p>
                  <div className="flex items-center gap-1.5">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          idx === internalIndex
                            ? "bg-foreground scale-110"
                            : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                className={cn(
                  "flex items-center gap-2 px-4 py-2",
                  "text-sm font-medium text-muted-foreground",
                  "bg-muted/50 hover:bg-muted",
                  "rounded-lg border border-border",
                  "transition-all duration-200 ease-out",
                  "hover:text-foreground",
                )}
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  image: string
  title: string
  delay: number
  isVisible: boolean
  index: number
  onClick: () => void
  isSelected: boolean
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12]
    const translations = [-55, 0, 55]

    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl",
          "bg-card border border-border",
          "cursor-pointer hover:ring-2 hover:ring-accent/50",
          isSelected && "opacity-0",
        )}
        style={{
          transform: isVisible
            ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 10 - index,
          left: "-40px",
          top: "-56px",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} - Project thumbnail card in ${title} category folder`}
            fill
            priority
            loading="eager"
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-primary-foreground truncate">
          {title}
        </p>
      </div>
    )
  },
)

ProjectCard.displayName = "ProjectCard"

