import { useEffect } from 'react'

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  sourceRef?: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (!sourceRef?.current || !sourceRef.current.contains(e.target as Node))
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback, ref, sourceRef])
}
