import { useEffect } from 'react'
import useSpotify from '@/contexts/spotify'
import { useRouter } from 'next/router'
import PageBanner from '../../../components/global/PageBanner'
import Tracklist from '../../../components/global/Tracklist'
import Loader from '../../../components/Loader'

function Playlist() {
  const {
    isReady,
    playlist, getPlaylist
  } = useSpotify()
  const { query: { id } } = useRouter()

  useEffect(() => {
    if (id && isReady) {
      getPlaylist(id)
    }
  }, [id, isReady])

  if (!playlist) return <Loader />

  const bannerInfo = {
    name: playlist.name,
    description: playlist.description,
    followers: playlist.followers,
    primaryColor: playlist.primaryColor,
    images: playlist.images
  }

  return (
    <div className="mb-14 pb-8">
      <PageBanner pageTitle="playlist" bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-60 w-full absolute z-0 bg-gradient-to-b" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
        <div className="px-8 pt-4 max-w-[1955px]">
          <Tracklist tracks={playlist.tracks.items} />
        </div>
      </div>
    </div>
  )
}

export default Playlist
