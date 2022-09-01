import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'

import useSpotify from '@/contexts/spotify'

function Poster({ track }) {
  const { isPlaying, currentTrack, setTracksQueue, setIsPlaying } = useSpotify()

  const handlePlay = () => {
    setTracksQueue([track])
    setIsPlaying(true)
  }

  return (
    <div
      className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105  hover:text-white/100 transition duration-200 ease-out group mx-auto border-2 border-[#262626]"
      onClick={handlePlay}
    >
      {/* eslint-disable-next-line */}
      <img
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
        src={track.albumUrl}
        alt="track-image"
      />
      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {
            isPlaying && currentTrack?.uri === track.uri ? (
              <BsFillPauseFill className="text-xl" />
            ) : (
              <BsFillPlayFill className="text-xl ml-[1px]" />
            )
          }
        </div>

        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  )
}

export default Poster
