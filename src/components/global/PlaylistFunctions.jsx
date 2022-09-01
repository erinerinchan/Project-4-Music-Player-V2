import { useContext } from 'react'
import Play from '../icons/Play'
import Heart from '../icons/Heart'
import { LoginContext, PlayContext } from '../../contexts/context'

function PlayButtonLarge({ loggedIn, playContext }) {
  const updatePlayer = useContext(PlayContext)
  if (loggedIn) {
    return (
      <button
        className="flex center justify-center w-14 h-14 bg-[#1DB954] text-white border-0 rounded-lg mr-8 outline-none"
        title="Play"
        onClick={() => {
          playContext()
          setTimeout(() => updatePlayer(), 500)
        }}
        type="button"
      >
        <Play height="28" width="28" />
      </button>
    )
  }
  return (
    <button
      className="flex center justify-center w-14 h-14 bg-[#1DB954] text-white border-0 rounded-lg mr-8 outline-none"
      title="Play"
      data-tip="play"
      data-for="tooltipMain"
      data-event="click"
      type="button"
    >
      <Play height="28" width="28" />
    </button>
  )
}

function LikeButton({ follow, onFollow, loggedIn }) {
  if (loggedIn) {
    return (
      <button
        className={`w-8 h-8 bg-transparent border-0 bg-[white] ${follow ? 'noHover' : ''} outline-none`}
        style={{ color: follow ? 'var(--spotify-green)' : null }}
        title={follow ? 'Remove from Library' : 'Save to Your Library'}
        onClick={onFollow}
        type="button"
      >
        <Heart fill={follow} />
      </button>
    )
  }
  return (
    <button
      className="w-8 h-8 bg-transparent border-0 bg-[white] outline-none"
      title="Save to Your Library"
      data-tip="like"
      data-for="tooltipMain"
      data-event="click"
      type="button"
    >
      <Heart fill={follow} />
    </button>
  )
}

function FollowButton({ follow, onFollow, loggedIn }) {
  if (loggedIn) {
    return (
      <button
        className="followButton outline-none"
        onClick={onFollow}
        type="button"
      >
        {follow ? 'following' : 'follow'}
      </button>
    )
  }
  return (
    <button
      className="text-xs leading-4 font-bold tracking-widest uppercase text-center text-white bg-transparent py-1.5 px-3.5 border-2 box-border rounded outline-none"
      data-tip="follow"
      data-for="tooltipMain"
      data-event="click"
      onClick={() => console.log('hi')}
      type="button"
    >
      {follow ? 'following' : 'follow'}
    </button>
  )
}

function MoreButton({ onClick }) {
  return (
    <button
      className="w-8 h-5 bg-transparent border-0 text-[white] text-base outline-none"
      title="More"
      onClick={onClick}
      type="button"
    >
      • • •
    </button>
  )
}

function PlaylistFunctions({ type, follow, onFollow, setMessage, playContext }) {
  const loggedIn = useContext(LoginContext)

  switch (type) {
    case 'playOnly':
      return (
        <div className="flex relative py-6 px-8 w-full items-center">
          <PlayButtonLarge loggedIn={loggedIn} playContext={playContext} />
        </div>
      )
    case 'none':
      return (
        <div className="flex relative py-6 px-8 w-full items-center">
          <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')} />
        </div>
      )
    case 'user':
      return (
        <div className="flex relative py-6 px-8 w-full items-center">
          <FollowButton follow={follow} onFollow={onFollow} loggedIn={loggedIn} />
          <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')} />
        </div>

      )
    case 'artist':
      return (
        <div className="flex relative py-6 px-8 w-full items-center">
          <PlayButtonLarge loggedIn={loggedIn} playContext={playContext} />
          <FollowButton follow={follow} onFollow={onFollow} loggedIn={loggedIn} />
          <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')} />
        </div>
      )
    default:
      return (
        <div className="flex relative py-6 px-8 w-full items-center">
          <PlayButtonLarge loggedIn={loggedIn} playContext={playContext} />
          <LikeButton follow={follow} onFollow={onFollow} loggedIn={loggedIn} />
          <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')} />
        </div>
      )
  }
}

export default PlaylistFunctions
