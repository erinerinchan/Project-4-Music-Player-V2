import Music2 from '../icons/Music2'

function followerTitle(title) {
  switch (title) {
    case 'profile':
      return 'Followers'
    case 'artist':
      return 'monthly listeners'
    default:
      return 'Likes'
  }
}

const followerStyle = {
  fontSize: '16px',
  lineHeight: '2',
  marginTop: '4px',
  color: '#fff'
}

const spanStyle = {
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  marginTop: '4px',
  wordBreak: 'break-word',
  overflow: 'hidden'
}

function PageBanner({ pageTitle, bannerInfo }) {
  const { name, description, user, followers, primaryColor, images, releaseDate, total } = bannerInfo
  let formattedLikes
  let imgURL
  if (images && images.length > 0) {
    imgURL = images[0].url
  }

  if (followers) {
    formattedLikes = followers.total.toLocaleString('en-US')
  }
  return (
    <div className="max-h-[500px] min-h-[340px] h-[30vh] text-white relative py-8 px-6 flex overflow-hidden items-end" style={{ backgroundColor: `${primaryColor}`, height: pageTitle === 'artist' ? '40vh' : '30vh' }}>
      <div className={`mr-6 w-48 h-48 flex items-center justify-center z-[2] min-w-[192px] bg-[#282828] text-[#7f7f7f] ${pageTitle === 'profile' || pageTitle === 'artist' ? 'rounded-[50%]' : null}`}>
        {imgURL
          ? (
            <img
              loading="lazy"
              src={imgURL}
              className={`w-full min-w-[192px] object-cover object-center z-[3] ${pageTitle === 'profile' || pageTitle === 'artist' ? 'rounded-[50%]' : null}`}
              alt=""
            />
          )
          : (
            <div className="svgSizing">
              <Music2 className="w-12 h-12" />
            </div>
          )}
      </div>

      <div className="z-[1] flex flex-col">
        <h2 className="font-bold mt-4 mb-1 text-xs uppercase">{pageTitle}</h2>
        <span style={spanStyle}>
          <h1 className={name.length > 15 ? 'py-[0.08em] text-5xl leading-[60px] font-black tracking-tight' : 'py-[0.08em] text-5xl leading-[60px] font-black tracking-tight'}>{name}</h1>
        </span>
        <p className="text-white text-sm leading-4 font-normal mt-4 flex items-center" style={{ display: description === '' ? 'none' : 'flex' }}>{description}</p>
        <div className="flex flex-wrap items-center mt-2">
          {user && user[0] && user.map((person, index) => (
            <a key={index} href={`/${person.type}/${person.id}`}>{person.type === 'artist' ? person.name : person.display_name}</a>
          ))}
          {total !== 0 && total
            && <h2>{total} Playlists</h2>}
          {followers !== 0
            && <h2 style={pageTitle === 'artist' ? followerStyle : null}>{formattedLikes} {followerTitle(pageTitle)}</h2>}
          {releaseDate
            && <h2>{releaseDate}</h2>}
        </div>
      </div>
      <div className="absolute w-full h-full left-0 bottom-0 bg-[#121212]" />
    </div>
  )
}

export default PageBanner
