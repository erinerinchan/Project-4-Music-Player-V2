import CD from '../icons/CD'

const ArtistRowItem = ({ info }) => {
  const { name, type, id, images } = info
  let thumbNail
  if (images.length > 0) {
    thumbNail = images[0].url
  }

  return (
    <div className="artistRowItem">
      <a href={`/${type}/${id}`}>
        <div className="bg-[#282828] flex align-center justify-center relative">
          {thumbNail
            ? <img loading="lazy" src={thumbNail} style={{ width: '100%', height: '100%' }} alt="" />
            : (
              <div className="text-white absolute inset-[35%]">
                <CD />
              </div>
            )}
        </div>
      </a>
      <div className="mt-3 mb-1 w-full overflow-hidden text-ellipsis text-center block">
        <a href={`/${type}/${id}`} className="text-sm leading-5 tracking-wide font-bold text-white normal-case no-underline cursor-pointer">{name}</a>
      </div>
    </div>
  )
}

export default ArtistRowItem
