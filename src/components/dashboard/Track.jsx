import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'
import { ImHeadphones } from 'react-icons/im'
import useSpotify from '@/contexts/spotify'

function Track({ track }) {
  const { isPlaying, currentTrack, setTracksQueue, setIsPlaying } = useSpotify()
  const [hasLiked, setHasLiked] = useState(false)

  const handlePlay = () => {
    setTracksQueue([track])
    setIsPlaying(true)
  }

  return (
    <div className="flex items-center justify-between cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex flex-col grow">
        {/* eslint-disable-next-line */}
        <img
          src={track.albumUrl}
          alt="track-album-url"
          className="rounded-xl h-12 w-12 object-cover"
        />
        <div className="w-[calc(100%-3rem)] relative">
          <div className="flex flex-col justify-center h-full w-full">
            <p className="text-white text-sm font-semibold truncate mt-3">
              {track.title}
            </p>
            <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
              {track.artist}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 ml-2">
        <div className="text-white flex space-x-1 text-sm font-semibold">
          <ImHeadphones className="text-lg" />
          <h4 className="font-sans">{track.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40 mr-7">
          <AiFillHeart
            className={`text-xl ml-3 icon ${hasLiked ? 'text-[#1ED760]' : 'text-[#868686]'}`}
            onClick={() => setHasLiked(!hasLiked)}
          />
          {
            isPlaying && currentTrack?.uri && track.ur ? (
              <div
                className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-white text-xl" />
              </div>
            ) : (
              <div
                className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-white text-xl ml-[1px]" />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Track
