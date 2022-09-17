import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSpotify from '@/contexts/spotify'
import useInfiScroll from '@/hooks/useInfiScroll'
import Cards from '../../components/library-page/artist-page/Cards'
// import Row from '../../../components/library-page/Row'

function ArtistPage() {
  const {
    isReady,
    artists, getArtists
  } = useSpotify()
  const { query: { artistId } } = useRouter()
  const { setCallback, lastRef } = useInfiScroll(10)

  useEffect(() => {
    if (artistId && isReady) {
      getArtists(artistId)
      setCallback(() => () => {
        getArtists(artistId)
      })
    }
  }, [artistId, isReady])

  return (
    <div className="flex pt-4 pb-8 max-w-[1955px]">
      <div className="my-4 grid gap-4 grid-cols-6 auto-rows-auto">
        {artists.map((artist, i) => (
          <Cards
            key={artist.id}
            ref={i === artists.length - 1 ? lastRef : null}
            info={artist}
            type="artist"
          />
        ))}
      </div>
    </div>
  )
}

export default ArtistPage
