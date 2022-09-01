import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function useId(page) {
  const [id, setId] = useState(null)
  const location = useRouter()

  useEffect(() => {
    const path = location.pathname.split('/')

    if (path.length === 3) {
      setId(path[path.length - 1])
    } else if (path.length > 3) {
      // eslint-disable-next-line no-shadow
      const idIndex = path.findIndex((path) => path === page) + 1
      setId(path[idIndex])
    } else {
      setId('')
    }
  }, [location, page])

  return id
}

export default useId
