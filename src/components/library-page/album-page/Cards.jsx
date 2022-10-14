import React from 'react'
import Link from 'next/link'
import useSpotify from '@/contexts/spotify'
import CardDisplay from './CardDisplay'
import CardInfo from '../../genre-page/CardInfo'
import Play from '../../icons/Play'

function getDescription(type, info) {
  switch (type) {
    case 'playlist':
      return info.description || `By ${info.owner.display_name}`
    case 'album': {
      const artists = info.artists?.map((object) => object.name)
      return artists?.length === 1 ? artists[0] : artists?.join(', ')
    }
    case 'artist':
      return 'artist'
    case 'track': {
      const artists = info.artists.map((object) => object.name)
      return artists.length === 1 ? artists[0] : artists.join(', ')
    }
    default:
      return null
  }
}

function getImageURL(type, info) {
  switch (type) {
    case 'track': {
      return info.album.images[0].url
    }
    default: {
      return info.album.images[0]?.url
    }
  }
}

const Cards = React.forwardRef(({ info, type }, ref) => {
  const { name, id } = info
  const { setTracksQueue, setIsPlaying } = useSpotify()
  const description = getDescription(type, info)
  const imageURL = getImageURL(type, { album: info })

  const handleClick = () => {
    setTracksQueue([info])
    setIsPlaying(true)
  }

  return (
    <div className="relative select-none">
      {/* eslint-disable-next-line no-nested-ternary */}
      <Link href={info.to ? info.to : type === 'track' ? `/album/${info.album.id}?highlight=${id}` : `/global/${type}/${id}`} style={{ textDecoration: 'none', color: 'var(--main-text)', zIndex: '3' }}>
        <a>
          <div ref={ref} className="bg-[#272727] p-5 rounded-lg w-full h-full cursor-pointer relative">
            {/* Card Display */}
            <CardDisplay url={imageURL} type={type} />
            {/* Card Info */}
            <CardInfo title={name} description={description} />
          </div>
        </a>
      </Link>
      <button
        className="flex items-center justify-center bg-[#1DB954] text-white border-0 rounded-full m-0 absolute w-8 h-8 bottom-0 right-0 mb-4 mr-5 outline-0"
        title="Play"
        onClick={handleClick}
        type="button"
      >
        <Play height="17" width="17" />
      </button>
    </div>
  )
})

export default Cards
