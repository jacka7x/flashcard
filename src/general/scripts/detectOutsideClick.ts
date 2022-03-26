import { useEffect } from "react";

export function useOutsideClick(ref: React.RefObject<HTMLElement> | null, callback: Function) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        ref 
        && ref.current
        && event.target instanceof HTMLElement
        && !ref.current.contains(event.target)
      ) {callback()
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
}