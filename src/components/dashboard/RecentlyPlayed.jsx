import useSpotify from '@/contexts/spotify'

function RecentlyPlayed({ track }) {
  const { setTracksQueue, setIsPlaying } = useSpotify()

  const handlePlay = () => {
    setTracksQueue([track])
    setIsPlaying(true)
  }

  return (
    <div id="comps-dashboard-recently-played" className="flex items-center space-x-3" onClick={handlePlay}>
      {/* eslint-disable-next-line */}
      <img
        src={track.albumUrl}
        className="rounded-full w-[52px] h-[52px]"
        alt="track-album-url"
      />
      <div>
        <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
          {track.title}
        </h4>
        <p className="text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
          {track.artist}
        </p>
      </div>
    </div>
  )
}

export default RecentlyPlayed
