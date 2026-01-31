"use client"

import { forwardRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ProjectCardProps } from "./types"

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
        const rotations = [-12, 0, 12]
        const translations = [-55, 0, 55]

        return (
            <div
                ref={ref}
                className={cn(
                    "absolute w-24 h-20 rounded-lg overflow-hidden shadow-xl", // increased width, decreased height for better aspect ratio
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
                    left: "-48px", // Half of w-24 (96px)
                    top: "-40px",  // Half of h-20 (80px)
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
                        className="object-cover bg-muted/20"
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
