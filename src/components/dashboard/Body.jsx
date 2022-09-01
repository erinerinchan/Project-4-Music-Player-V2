import { useEffect } from 'react'
import useSpotify from '@/contexts/spotify'
import Track from './Track'

export default function Body() {
  const {
    isReady,
    searchResults, newReleases,
    getNewReleases
  } = useSpotify()

  useEffect(() => {
    if (isReady) {
      getNewReleases()
    }
  }, [isReady])

  const tracksTitle = searchResults.length === 0 ? 'New Releases' : 'Tracks'
  const tracksData = searchResults.length === 0 ? newReleases.slice(4, newReleases.length) : searchResults.slice(4, searchResults.length)

  return (
    <section className="bg-black p-4 space-y-8 grow">
      <div className="flex gap-x-8">
        {/* Genres */}
        <div className="hidden xl:inline max-w-xs">
          <h1 className="text-white font-bold mb-3">Genres</h1>
          <div className="flex flex-wrap gap-x-2 gap-y-2.5 mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="btn" type="button">All Genres</button>
        </div>

        {/* New releases */}
        <div className="px-10 grow">
          <h1 className="text-white font-bold mb-3">{tracksTitle}</h1>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96">
            {
              tracksData.map((track) => (
                <Track
                  key={track.id}
                  track={track}
                />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
