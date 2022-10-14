import Link from 'next/link'
import useSpotify from '@/contexts/spotify'
import CD from '../icons/CD'
import Play from '../icons/Play'

const ArtistRowItem = ({ info }) => {
  const { name, type, id, images } = info
  let thumbNail
  if (images.length > 0) {
    thumbNail = images[0].url
  }
  const { setTracksQueue, setIsPlaying } = useSpotify()

  const handleClick = () => {
    setTracksQueue([info])
    setIsPlaying(true)
  }

  return (
    <div className="relative select-none bg-[#272727] p-5 rounded-lg cursor-pointer">
      <Link href={`/global/${type}/${id}`}>
        <a>
          <div>
            {thumbNail
            // eslint-disable-next-line @next/next/no-img-element
              ? <img loading="lazy" src={thumbNail} style={{ width: '172px', height: '172px', borderRadius: type === 'artist' ? '50%' : '0' }} alt="" />
              : (
                <div className="text-white">
                  <CD />
                </div>
              )}
          </div>
          <div className="flex flex-row">
            <div className="mt-3 mb-1 overflow-hidden text-ellipsis w-[155px] line-clamp-1 text-white">
              <a href={`/global/${type}/${id}`} className="text-sm font-bold text-white normal-case no-underline cursor-pointer">{name}</a>
            </div>
            <button
              className="flex items-center justify-center bg-[#1DB954] text-white rounded-full  absolute w-8 h-8 bottom-0 right-0 mb-4 mr-5"
              title="Play"
              onClick={handleClick}
              type="button"
            >
              <Play height="17" width="17" />
            </button>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ArtistRowItem
