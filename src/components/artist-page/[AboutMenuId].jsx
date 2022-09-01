import Link from 'next/link'
import AboutNavItem from './AboutNavItem'
import Grid from '../global/Grid'
import ArtistRow from './ArtistRow'

function AboutMenu({ id, related, tracks, album, single, appear, compilation, playContextTrack }) {
  return (
    <>
      <nav className="menuNav">
        <ul className="text-left list-none">
          <AboutNavItem label="Overview" to={`/artist/${id}`} />
          <AboutNavItem label="Related Artist" to={`/artist/${id}/related`} />
        </ul>
      </nav>

      <div style={{ paddingTop: '1.5em', position: 'relative' }}>
        <Link href={`/artist/${id}`}>
          <a>
            <ArtistRow title="Popular" display="list" list={tracks} playContextTrack={playContextTrack} />
            <ArtistRow title="Albums" display="grid" list={album} />
            <ArtistRow title="Singles and EPs" display="grid" list={single} />
            <ArtistRow title="Compilations" display="grid" list={appear} />
            <ArtistRow title="Appears On" display="grid" list={compilation} />
          </a>
        </Link>
        <Link href={`/artist/${id}/related`}>
          <a>
            <Grid playlists={related} />
          </a>
        </Link>
      </div>
    </>
  )
}

export default AboutMenu
