import { useState, useRef, useCallback } from 'react'

function useInfiScroll() {
  const observer = useRef()
  const [callback, setCallback] = useState(null)

  const lastRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && callback) {
        callback()
      }
    }, { threshold: 0.75 })

    if (node) observer.current.observe(node)
  }, [callback])

  return { setCallback, lastRef }
}

export default useInfiScroll
