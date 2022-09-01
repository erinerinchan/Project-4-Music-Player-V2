import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSpotify from '@/contexts/spotify'
import useInfiScroll from '../../../hooks/useInfiScroll'
import PageBanner from '../../../components/global/PageBanner'
import PlaylistFunctions from '../../../components/global/PlaylistFunctions'
import Tracklist from '../../../components/global/Tracklist'

function useHighlight() {
  return new URLSearchParams(useRouter().search).get('highlight')
}

function Album() {
  const {
    isReady,
    getAlbums
  } = useSpotify()
  const { query: { id } } = useRouter()
  const { setTracksQueue, setIsPlaying } = useSpotify()

  const highlight = useHighlight()

  const [bannerInfo, setbannerInfo] = useState({
    albumType: '',
    name: '',
    description: '',
    user: [],
    followers: 0,
    primaryColor: '#262626',
    images: [],
    releaseDate: ''
  })

  const [tracks, setTracks] = useState([])
  const [setUri] = useState('')
  const { setCallback, lastRef } = useInfiScroll(setTracks)

  useEffect(() => {
    setTracks([])
    setCallback(null)
    setbannerInfo({
      albumType: '',
      name: '',
      description: '',
      user: [],
      followers: 0,
      primaryColor: '#262626',
      images: [],
      releaseDate: ''
    })
    setUri('')

    if (id && isReady) {
      getAlbums
        .then((data) => {
          // eslint-disable-next-line no-shadow
          const { albumType, name, artists, primaryColor, tracks, images, releaseDate, uri } = data
          // eslint-disable-next-line no-shadow
          setbannerInfo((bannerInfo) => ({ ...bannerInfo, albumType, name, user: artists, primaryColor, images, releaseDate }))
          setTracks(tracks.items)
          setCallback(tracks.next)
          setUri(uri)
        })
    } else {
      // eslint-disable-next-line no-console
      console.log('ERROR!')
    }
  }, [id, isReady])

  return (
    <div className="m-[-60px] pb-8" style={{ display: tracks.length === 0 ? 'none' : 'block' }}>
      <PageBanner pageTitle={bannerInfo.albumType} bannerInfo={bannerInfo} />
      <div className="relative">
        <div className="h-[232px] w-full absolute z-0 bg-[#121212]" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
        <PlaylistFunctions setIsPlaying={setIsPlaying} />
        <div className="px-8 max-w-[1955px] z-[3]">
          <Tracklist ref={lastRef} tracks={tracks} highlight={highlight} setTracksQueue={setTracksQueue} />
        </div>
      </div>
    </div>
  )
}

export default Album
