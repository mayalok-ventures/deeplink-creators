'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import CustomCursor from './CustomCursor'
import { ReactNode } from 'react'

interface GlobalScrollWrapperProps {
    children: ReactNode;
}

export default function GlobalScrollWrapper({ children }: GlobalScrollWrapperProps) {
    return (
        <ReactLenis root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, wheelMultiplier: 1 }}>
            <CustomCursor />
            {children}
        </ReactLenis>
    );
}
