import { useState, useRef, useCallback } from 'react'
import reqWithToken from '../utilities/reqWithToken'

function useTokenScroll(setList, token, source) {
  const [next, setNext] = useState(null)

  const observer = useRef()
  const lastRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && next) {
        const makeRequest = reqWithToken(next, token, source)
        makeRequest()
          .then((response) => {
            const { data } = response
            const resultList = data.items.map((track) => track.track)
            // eslint-disable-next-line no-shadow
            const next = data.next || data.playlists.next
            setList((tracks) => [...tracks, ...resultList])
            setNext(next)
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.log(error))
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
    }, [next])

  return [setNext, lastRef]
}

export default useTokenScroll
