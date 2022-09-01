import { useState, useEffect, useContext } from 'react'
import useSpotify from '@/contexts/spotify'
import axios from 'axios'
import Link from 'next/link'
import Row from '../../components/library-page/Row'
import { TokenContext } from '../../contexts/context'

function Library({ playlists }) {
  const { isReady, spotifyApi } = useSpotify()
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const token = useContext(TokenContext)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (token) {
      const cancelSource = axios.CancelToken.source()

      const makeRequests = async () => {
        const requestArtist = spotifyApi.isFollowingArtists(token, cancelSource)
        const requestAlbum = spotifyApi.containsMySavedAlbums(token, cancelSource)

        const [_artists, _albums] = await Promise.all([requestArtist(), requestAlbum()])
        setArtists(_artists.data.artists.items)
        setAlbums(_albums.data.items)
      }

      makeRequests()

      return () => cancelSource.cancel()
    }
  }, [isReady])

  return (
    <div className="flex flex-row px-8 space-x-5 max-w-[1955px] z-[3]" style={{ paddingTop: '16px' }}>
      <Link href="/library/playlist">
        <a>
          <Row name="Playlists" playlists={playlists} />
        </a>
      </Link>
      <Link
        href={{
          pathname: '/library/artist',
          query: { artist: 'artist', artistId: 'artistId' }
        }}
      >
        <a>
          <Row name="Artists" playlists={artists} />
        </a>
      </Link>
      <Link
        href={{
          pathname: '/library/album',
          query: { album: 'album', albumId: 'albumId' }
        }}
      >
        <a>
          <Row name="Albums" playlists={albums} />
        </a>
      </Link>
    </div>
  )
}

export default Library
