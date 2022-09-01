import React from 'react'
import useSpotify from '@/contexts/spotify'
import Play from '../icons/Play'
import Music from '../icons/Music'
import Music2 from '../icons/Music2'
import msTimeFormat from '../../utilities/utils'

const simplyStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const TracklistItem = React.forwardRef(({ track, styleName, highlight }, ref) => {
  const { setTracksQueue, setIsPlaying } = useSpotify()
  const { album, name, explicit, duration_ms } = track // eslint-disable-line camelcase

  let thumbNail
  if (styleName === 'simplify' && album.images.length > 0) {
    thumbNail = album.images[album.images.length - 1].url
  }

  const formattedTime = msTimeFormat(duration_ms)

  const handleClick = () => {
    setTracksQueue([track])
    setIsPlaying(true)
  }

  return (
    <li
      ref={ref}
      className={`track-list-item h-20 relative transition-colors list-none select-none flex ${highlight ? 'highlight' : null}`}
    >
      <div
        className="box-border relative text-right pr-4 w-10 track-list-item-icon"
        style={styleName === 'simplify' ? simplyStyle : null}
      >
        <button
          className={
            styleName === 'simplify' ? (
              'icon-play text-white bg-none border-none m-0 outline-none'
            ) : (
              'icon-play text-white bg-none border-none m-0 mt-3 outline-none'
            )
          }
          onClick={handleClick}
          type="button"
        >
          <Play height="20" width="20" />
        </button>

        <div
          className={
            styleName === 'simplify' ? (
              'icon-music pt-1 text-white opacity-60'
            ) : (
              'icon-music pt-1 text-white opacity-60 mt-3'
            )
          }
          style={{
            marginTop: styleName === 'simplify' ? '0' : null
          }}
        >
          <Music />

        </div>
      </div>

      {styleName === 'simplify' && (
      <div className="h-full flex align-center">
        <div className="bg-[#282828] text-white w-12 h-12 shadow-slate-200 mr-4 flex align-center justify-center relative">
          {thumbNail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={thumbNail}
              style={{ width: '100%', height: '100%' }}
              alt=""
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '35%',
                bottom: '35%',
                left: '35%',
                right: '35%'
              }}
            >
              <Music2 />
            </div>
          )}
        </div>
      </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div
          className={
            styleName === 'simplify' ? 'h-full flex align-center' : 'mt-3'
          }
        >
          <div className="text-base leading-5 tracking-wide text-white text-ellipsis">{name}</div>

          {styleName !== 'simplify' && (
          <div className="flex align-center relative">
            <span
              className="mr-3 ml-0.5 inline-flex justify-center align-center bg-slate-400 text-[#121212] rounded-sm uppercase text-[9px] leading-3 min-w-[16px] h-4 px-0.5"
              style={explicit ? { display: 'flex' } : { display: 'none' }}
            />
            {album && (
            <span className="text-white opacity-60 transition-opacity no-underline text-ellipsis">
              <a href={`/album/${album.id}`}>{album.name}</a>
              </span>
            )}
          </div>
          )}
        </div>
      </div>

      <div className="text-right pr-4 tracking-normal w-16">
        <div
          className={`text-white opacity-60 ${
            styleName === 'simplify' ? 'h-full flex align-center' : 'mt-3'
          }`}
        >
          <span>{formattedTime}</span>
        </div>
      </div>
    </li>
  )
})

export default TracklistItem
