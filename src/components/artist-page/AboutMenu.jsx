import Link from 'next/link'
import useSpotify from '@/contexts/spotify'
import AboutNavItem from './AboutNavItem'
import ArtistRow from './ArtistRow'

function AboutMenu({ id, artistTopTracks, artistAlbums, artistSingles, artistRelatedArtists, artistAppearOn, artistCompilations }) {
  const { setTracksQueue } = useSpotify()

  console.log(artistTopTracks)

  return (
    <>
      <nav>
        <ul className="text-left list-none">
          <AboutNavItem label="Overview" to={`/global/artist/${id}`} />
        </ul>
      </nav>

      <div style={{ paddingTop: '1.5em', position: 'relative' }}>
        <Link href={`/global/album/${id}`}>
          <a>
            <ArtistRow title="Popular" display="list" list={artistTopTracks} setTracksQueue={setTracksQueue} />
            <ArtistRow title="Discography" display="grid" list={artistAlbums} setTracksQueue={setTracksQueue} />
            <ArtistRow title="Singles and EPs" display="grid" list={artistSingles} setTracksQueue={setTracksQueue} />
            <ArtistRow title="Compilations" display="grid" list={artistAppearOn} setTracksQueue={setTracksQueue} />
          </a>
        </Link>
        <Link href={`/global/artist/${id}`}>
          <a>
            <ArtistRow title="Fans also like" display="grid" list={artistRelatedArtists} setTracksQueue={setTracksQueue} />
          </a>
        </Link>
        <Link href={`/global/album/${id}`}>
          <a>
            <ArtistRow title="Appears On" display="grid" list={artistCompilations} setTracksQueue={setTracksQueue} />
          </a>
        </Link>
      </div>
    </>
  )
}

export default AboutMenu
