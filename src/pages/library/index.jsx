import { useEffect, useState } from 'react'
import useSpotify from '@/contexts/spotify'
import useInfiScroll from '@/hooks/useInfiScroll'
import Link from 'next/link'
import Cards from '../../components/library-page/playlist-page/Cards'
import Row from '../../components/library-page/Row'

function Library({ playlists }) {
  const [artists] = useState([])
  const [albums] = useState([])
  const {
    isReady,
    userPlaylists, getUserPlaylists
  } = useSpotify()
  const { setCallback, lastRef } = useInfiScroll(10)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isReady) {
      getUserPlaylists()
      setCallback(() => () => {
        getUserPlaylists()
      })
    }
  }, [isReady])

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
        {userPlaylists.map((playlist, i) => (
          <Cards
            key={playlist.id}
            ref={i === userPlaylists.length - 1 ? lastRef : null}
            info={playlist}
            type="playlist"
          />
        ))}
      </div>
    </div>
  )
}

export default Library
