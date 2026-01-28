import { useState, useEffect, useCallback, useRef } from "react";

/**
 * USE MOUSE POSITION HOOK
 * -----------------------
 * Hook otimizado para rastrear posição do cursor com throttling.
 * 
 * Performance:
 * - Throttling para evitar re-renders excessivos
 * - Cleanup adequado de event listeners
 * - Suporte a SSR (retorna posição padrão no servidor)
 */

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  throttleMs?: number;
  enabled?: boolean;
}

export function useMousePosition({ 
  throttleMs = 50, 
  enabled = true 
}: UseMousePositionOptions = {}): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdateRef = useRef<number>(0);

  const updateMousePosition = useCallback(
    (event: MouseEvent) => {
      const now = Date.now();
      
      // Throttling: só atualiza se passou tempo suficiente
      if (now - lastUpdateRef.current >= throttleMs) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
        lastUpdateRef.current = now;
      }
    },
    [throttleMs]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition, enabled]);

  return mousePosition;
}
