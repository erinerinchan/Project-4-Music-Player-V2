import PlaylistItem from './PlaylistItem'

function Playlist({ playlists }) {
  return (
    <div className="my-1 overflow-hidden flex-[1] min-h-full max-h-min overflow-y-auto">
      <ul className="relative list-none h-0 whitespace-nowrap">
        {playlists.map((playlist) => <PlaylistItem key={playlist.id} name={playlist.name} id={playlist.id} />)}
      </ul>
    </div>
  )
}

export default Playlist
