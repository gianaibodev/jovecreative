"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface PerformanceContextType {
    performanceMode: boolean
    setPerformanceMode: (value: boolean) => void
    isLowEndDevice: boolean
}

const PerformanceContext = createContext<PerformanceContextType>({
    performanceMode: false,
    setPerformanceMode: () => { },
    isLowEndDevice: false,
})

export function usePerformance() {
    return useContext(PerformanceContext)
}

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
    const [performanceMode, setPerformanceModeState] = useState(false)
    const [isLowEndDevice, setIsLowEndDevice] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        // Check device capabilities
        const checkDeviceCapability = () => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory
            const isLowMemory = deviceMemory !== undefined && deviceMemory < 4
            const hardwareConcurrency = navigator.hardwareConcurrency
            const isLowCPU = hardwareConcurrency !== undefined && hardwareConcurrency < 4

            return prefersReducedMotion || isLowMemory || isLowCPU
        }

        const isLowEnd = checkDeviceCapability()
        setIsLowEndDevice(isLowEnd)

        // Load saved preference or auto-detect
        const savedMode = localStorage.getItem("performance-mode")
        if (savedMode !== null) {
            setPerformanceModeState(savedMode === "true")
        } else {
            // Auto-enable for low-end devices
            setPerformanceModeState(isLowEnd)
        }
    }, [])

    const setPerformanceMode = (value: boolean) => {
        setPerformanceModeState(value)
        localStorage.setItem("performance-mode", String(value))
    }

    return (
        <PerformanceContext.Provider value={{ performanceMode, setPerformanceMode, isLowEndDevice }}>
            {children}
        </PerformanceContext.Provider>
    )
}
