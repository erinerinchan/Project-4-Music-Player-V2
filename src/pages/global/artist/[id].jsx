import { useEffect } from 'react'
import useSpotify from '@/contexts/spotify'
import { useRouter } from 'next/router'
import PageBanner from '@/components/global/PageBanner'
import AboutMenu from '@/components/artist-page/AboutMenu'

function Artist() {
  const {
    isReady,
    artist, getArtist,
    artistTopTracks, getArtistTopTracks,
    artistAlbums, getArtistAlbums,
    artistSingles, getArtistSingles,
    artistRelatedArtists, getArtistRelatedArtists,
    artistAppearOn, getArtistAppearOn,
    artistCompilations, getArtistCompilations,
    setTracksQueue
  } = useSpotify()
  const { query: { id } } = useRouter()

  useEffect(() => {
    if (id && isReady) {
      getArtist(id)
      getArtistTopTracks(id)
      getArtistAlbums(id)
      getArtistSingles(id)
      getArtistRelatedArtists(id)
      getArtistAppearOn(id)
      getArtistCompilations(id)
    }
  }, [id, isReady])

  const bannerInfo = {
    name: artist?.name,
    followers: artist?.followers,
    primaryColor: artist?.primaryColor,
    images: artist?.images
  }

  return (
    <div className="mt-[-60px] pb-8">
      <PageBanner pageTitle="artist" bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-[232px] w-full absolute z-0 bg-gradient-to-b" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
        <div className="py-0 px-8 max-w-[1955px] z-[3]">
          <AboutMenu
            id={id}
            artistTopTracks={artistTopTracks}
            artistAlbums={artistAlbums}
            artistSingles={artistSingles}
            artistRelatedArtists={artistRelatedArtists}
            artistAppearOn={artistAppearOn}
            artistCompilations={artistCompilations}
            setTracksQueue={setTracksQueue}
          />
        </div>
      </div>
    </div>
  )
}

export default Artist
