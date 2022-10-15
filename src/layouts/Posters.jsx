import { useEffect } from 'react'
import useSpotify from '@/contexts/spotify'
import Poster from '../components/dashboard/Poster'

export default function Posters() {
  const { isReady, searchResults, newReleases, getNewReleases } = useSpotify()
  const posterData = searchResults.length === 0 ? newReleases.slice(0, 4) : searchResults.slice(0, 4)

  useEffect(() => {
    if (isReady) {
      getNewReleases()
    }
  }, [isReady])

  return (
    <div id="posters" className="overflow-y-scroll scrollbar-hide h-96 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        posterData.map((track) => (
          <Poster
            key={track.id}
            track={track}
          />
        ))
      }
    </div>
  )
}
