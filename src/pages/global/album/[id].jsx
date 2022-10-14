import { useEffect } from 'react'
import useSpotify from '@/contexts/spotify'
import { useRouter } from 'next/router'
import PageBanner from '../../../components/global/PageBanner'
import Tracklist from '../../../components/global/Tracklist'
import Loader from '../../../components/Loader'

function Album() {
  const {
    isReady,
    album, getAlbum
  } = useSpotify()
  const { query: { id } } = useRouter()

  useEffect(() => {
    if (id && isReady) {
      getAlbum(id)
    }
  }, [id, isReady])

  if (!album) return <Loader />

  const bannerInfo = {
    name: album.name,
    primaryColor: album.primaryColor,
    images: album.images,
    releaseDate: album.releaseDate,
    total: album.total
  }

  console.log(album)

  return (
    <div className="mb-14 pb-8">
      <PageBanner pageTitle="album" bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-60 w-full absolute z-0 bg-gradient-to-b" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
        <div className="px-8 pt-4 max-w-[1955px]">
          <Tracklist tracks={album.tracks.items} />
        </div>
      </div>
    </div>
  )
}

export default Album
