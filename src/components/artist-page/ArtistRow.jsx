import ArtistRowTitle from './ArtistRowTitle'
import Tracklist from '../global/Tracklist'
import ArtistRowGrid from './ArtistRowGrid'

const ArtistRow = ({ title, display, list, playContextTrack }) => {
  if (list && list.length > 0) {
    return (
      <div>
        <ArtistRowTitle title={title} />
        {display === 'list'
          ? <Tracklist tracks={list} styleName="simplify" playContextTrack={playContextTrack} />
          : <ArtistRowGrid list={list} />}
      </div>
    )
  }
  return null
}

export default ArtistRow
