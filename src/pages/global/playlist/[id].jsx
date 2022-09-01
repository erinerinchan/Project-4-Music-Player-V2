import { useEffect, useState } from 'react'
import useSpotify from '@/contexts/spotify'
import { useRouter } from 'next/router'
import PageBanner from '../../../components/global/PageBanner'
import PlaylistFunctions from '../../../components/global/PlaylistFunctions'
import Tracklist from '../../../components/global/Tracklist'
import Loader from '../../../components/Loader'

function Playlist() {
  const {
    isReady,
    playlist, getPlaylist,
    getFollowPlaylist
  } = useSpotify()
  const { query: { id } } = useRouter()

  const [like] = useState(false)

  useEffect(() => {
    if (id && isReady) {
      getPlaylist(id)
    }
  }, [id, isReady])

  const followThePlaylist = () => {
    getFollowPlaylist({}, like ? 'DELETE' : 'PUT')
  }

  if (!playlist) return <Loader />

  const bannerInfo = {
    name: playlist.name,
    description: playlist.description,
    followers: playlist.followers,
    primaryColor: playlist.primaryColor,
    images: playlist.images // optional
  }

  return (
    <div className="mb-14 pb-8">
      <PageBanner pageTitle="playlist" bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-60 w-full absolute z-0 bg-gradient-to-b" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
        <PlaylistFunctions onFollow={followThePlaylist} follow={like} />
        <div className="px-8 max-w-[1955px]">
          <Tracklist tracks={playlist.tracks.items} />
        </div>
      </div>
    </div>
  )
}

export default Playlist
