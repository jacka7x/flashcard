import { useRef, useEffect } from 'react'

export const useInterval =
    (callback: () => void, delay: number | null): void => {

    const savedCallback: React.MutableRefObject<(() => void) | undefined> =
        useRef<() => void>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current()
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
