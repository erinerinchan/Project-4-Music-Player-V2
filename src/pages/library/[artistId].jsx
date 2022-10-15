import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSpotify from '@/contexts/spotify'
import useInfiScroll from '@/hooks/useInfiScroll'
import Link from 'next/link'
import Cards from '../../components/library-page/artist-page/Cards'
import Row from '../../components/library-page/Row'

function ArtistPage() {
  const [playlists] = useState([])
  const [artists] = useState([])
  const [albums] = useState([])
  const {
    isReady,
    Artists, getArtists
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const LinksBtns = () => (
    <div className="flex flex-row px-8 space-x-5 max-w-[1955px] z-[3]" style={{ paddingTop: '16px' }}>
      <Link
        href={{
          pathname: '/library',
          query: { playlist: 'library', libraryId: 'libraryId' }
        }}
      >
        <a>
          <Row name="Playlists" playlists={playlists} />
        </a>
      </Link>
      <Link
        href={{
          pathname: '/library/[artistId]',
          query: { artist: 'artist', artistId: 'artistId' }
        }}
      >
        <a>
          <Row name="Artists" playlists={artists} />
        </a>
      </Link>
      <Link
        href={{
          pathname: '/library/album/[albumId]',
          query: { album: 'album', albumId: 'albumId' }
        }}
      >
        <a>
          <Row name="Albums" playlists={albums} />
        </a>
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col pt-4 pb-8 max-w-[1955px]">
      <LinksBtns />
      <div className="my-4 grid gap-4 grid-cols-6 auto-rows-auto">
        {Artists.map((artist, i) => (
          <Cards
            key={artist.id}
            ref={i === Artists.length - 1 ? lastRef : null}
            info={artist}
            type="artist"
          />
        ))}
      </div>
      <br />
      <br />
    </div>
  )
}

export default ArtistPage
