import SpotifyPlayer from 'react-spotify-web-playback'

import useSpotify from '@/contexts/spotify'

function Player() {
  const {
    isReady, accessToken,
    isPlaying, setIsPlaying,
    setCurrentTrack, tracksQueue
  } = useSpotify()

  if (!isReady) return null

  return (
    <div id="player" className="fixed bottom-0 w-full">
      {/* Premium Users */}
      <SpotifyPlayer
        styles={{
          activeColor: '#fff',
          bgColor: '#181818',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          height: '70px',
          sliderTrackColor: '#535353',
          sliderTrackBorderRadius: '4px',
          sliderHandleColor: '#fff',
          errorColor: '#fff'
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (state.isPlaying) {
            setIsPlaying(true)
            setCurrentTrack(state.track)
          } else {
            setIsPlaying(false)
            setCurrentTrack(null)
          }
        }}
        play={isPlaying}
        uris={tracksQueue.map((t) => t.uri)}
        magnifySliderOnHover
        autoPlay
      />
    </div>
  )
}

export default Player
