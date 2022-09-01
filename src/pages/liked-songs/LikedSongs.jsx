import { useEffect, useState } from 'react'
import useSpotify from '@/contexts/spotify'
import PageBanner from '../../components/global/PageBanner'
import PlaylistFunctions from '../../components/global/PlaylistFunctions'
import Tracklist from '../../components/global/Tracklist'

function LikedSongs() {
  const {
    isReady,
    likedSongs,
    getLikedSongs,
    setTracksQueue, setIsPlaying
  } = useSpotify()

  const bannerInfo = {
    name: 'Liked Songs',
    description: '',
    followers: 0,
    primary_color: 'rgb(70, 62, 118)',
    images: [{ url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' }]
  }

  useEffect(() => {
    if (isReady) {
      getLikedSongs()
    }
  }, [isReady])

  console.log(likedSongs)

  return (
    <div className="mt-[-60px] pb-8" style={{ display: `${likedSongs.length === 0 ? 'none' : 'block'}` }}>
      <PageBanner pageTitle="playlist" bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-[232px] w-full absolute z-0 bg-[#121212]" style={{ backgroundColor: `${bannerInfo.primary_color}` }} />
        <PlaylistFunctions type="playOnly" setIsPlaying={setIsPlaying} />
        <div className="px-8 max-w-[1955px] z-[3]">
          {/* ref={lastRef} */}
          <Tracklist tracks={likedSongs} setTracksQueue={setTracksQueue} />
        </div>
      </div>
    </div>
  )
}

export default LikedSongs