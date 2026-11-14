import { useEffect, type RefObject } from "react";

// Closes a menu when the visitor clicks or taps outside it, or presses Escape.
export function useDismiss(
  wrapperRef: RefObject<HTMLElement | null>,
  buttonRef: RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const wrapper = wrapperRef.current;
      if (wrapper && !wrapper.contains(event.target as Node)) {
        close();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focusWasInside = wrapperRef.current?.contains(document.activeElement);
      close();
      if (focusWasInside) buttonRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wrapperRef, buttonRef, open, close]);
}