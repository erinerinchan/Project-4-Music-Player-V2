import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import useSpotify from '@/contexts/spotify'
import { useRouter } from 'next/router'
import getLocale from '../../../utilities/locale'
import { TokenContext, LoginContext, MessageContext, PlayContext } from '../../../contexts/context'
import PageBanner from '../../../components/global/PageBanner'
import PlaylistFunctions from '../../../components/global/PlaylistFunctions'
import AboutMenu from '../../../components/artist-page/[AboutMenuId]'
import Loader from '../../../components/Loader'
import reqWithToken from '../../../utilities/reqWithToken'
import putWithToken from '../../../utilities/putWithToken'
import makeAxiosRequest from '../../../utilities/makeAxiosRequest'

function ArtistPage() {
  const { isReady, spotifyApi } = useSpotify()
  const { query: { id } } = useRouter()

  const token = useContext(TokenContext)
  const loggedIn = useContext(LoginContext)
  const setMessage = useContext(MessageContext)
  const [loader, setLoader] = useState(true)
  const setPlay = useContext(PlayContext)

  const [bannerInfo, setbannerInfo] = useState({
    name: '',
    description: '',
    user: [],
    followers: 0,
    primary_color: 'rgb(83, 83, 83)',
    images: [],
    total: 0
  })

  const [locale] = getLocale()

  const [tracks, setTracks] = useState([])
  const [album, setAlbum] = useState([])
  const [single, setSingle] = useState([])
  const [appear, setAppear] = useState([])
  const [compilation, setCompilation] = useState([])
  const [related, setRelated] = useState([])
  const [follow, setFollow] = useState(false)
  const [uri, setUri] = useState('')

  const source = axios.CancelToken.source()
  useEffect(() => {
    setTracks([])
    setAlbum([])
    setSingle([])
    setAppear([])
    setCompilation([])
    setRelated([])
    setFollow(false)
    setUri('')
    setLoader(true)

    const [artistSource, requestArtist] = spotifyApi.getArtists(id)
    const [tracksSource, requestTracks] = spotifyApi.getArtistTopTracks(id, locale)
    const [albumSource, requestAlbum] = spotifyApi.getArtistAlbums(id, locale)
    const [singleSource, requestSingle] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albumsinclude_groups=single&country=${locale}`)
    const [appearSource, requestAppear] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albumsinclude_groups=appears_on&country=${locale}`)
    const [compilationSource, requestCompilation] = makeAxiosRequest(`https://api.spotify.com/v1/artists/{id}/albums?include_groups=compilation&country=${locale}`)
    const [relatedSource, requestRelated] = spotifyApi.getArtistRelatedArtists(id)
    if (loggedIn && id) {
      const requestFollow = reqWithToken('https://api.spotify.com/v1/me/following/contains?type=artist&ids={id}', token, source)
      requestFollow()
        .then((response) => {
          setFollow(response.data[0])
        })
        .catch((error) => console.log(error))
    }

    const makeRequest = async () => {
      try {
        const [artistData,
          tracksData,
          albumData,
          singleData,
          appearData,
          compilationData,
          relatedData] = await Promise.all([requestArtist(), requestTracks(), requestAlbum(), requestSingle(), requestAppear(), requestCompilation(), requestRelated()])
        // eslint-disable-next-line no-shadow
        const { name, followers, primaryColor, images, uri } = artistData
        // eslint-disable-next-line
        setbannerInfo((bannerInfo) => ({ ...bannerInfo, name, followers, primaryColor, images }))
        setUri(uri)
        // eslint-disable-next-line no-shadow
        const tracks = tracksData.tracks.length > 5 ? tracksData.tracks.slice(0, 5) : tracksData.tracks
        // eslint-disable-next-line no-shadow
        const album = albumData.items
        // eslint-disable-next-line no-shadow
        const single = singleData.items
        // eslint-disable-next-line no-shadow
        const appear = appearData.items
        // eslint-disable-next-line no-shadow
        const compilation = compilationData.items
        // eslint-disable-next-line no-shadow
        const related = relatedData.artists
        setTracks((old) => [...old, ...tracks])
        setAlbum((old) => [...old, ...album])
        setSingle((old) => [...old, ...single])
        setAppear((old) => [...old, ...appear])
        setCompilation((old) => [...old, ...compilation])
        setRelated((old) => [...old, ...related])
        setLoader(false)
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }

    if (id) {
      makeRequest()
    }
    return () => {
      artistSource.cancel()
      tracksSource.cancel()
      albumSource.cancel()
      singleSource.cancel()
      appearSource.cancel()
      compilationSource.cancel()
      relatedSource.cancel()
      source.cancel()
    }
    // eslint-disable-next-line
    }, [id, isReady])

  const followArtist = () => {
    if (loggedIn) {
      const request = spotifyApi.followArtists(token, source, {}, follow ? 'DELETE' : 'PUT')
      request()
        .then((response) => {
          if (response.status === 204) {
            if (follow) {
              setMessage('Unsaved from your collection')
            } else {
              setMessage('Saved to your collection')
            }
            setFollow(!follow)
          } else {
            setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
          }
        })
        .catch((error) => setMessage(`ERROR: ${error}`))
    }
  }

  const playContext = () => {
    const body = {
      context_uri: uri
    }
    const request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source, body)
    request()
      .then((response) => {
        if (response.status === 204) {
          setTimeout(() => setPlay(), 500)
        } else {
          setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
        }
      })
      .catch((error) => setMessage(`ERROR: ${error}`))
  }

  const playContextTrack = (trackUri) => {
    const body = {
      uris: [trackUri]
    }
    const request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source, body)
    request()
      .then((response) => {
        if (response.status === 204) {
          setTimeout(() => setPlay(), 500)
        } else {
          setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
        }
      })
      .catch((error) => setMessage(`ERROR: ${error}`))
  }

  return (
    loader
      ? <Loader />
      : (
        <div className="m-[-60px] pb-8" style={{ display: tracks.length === 0 ? 'none' : 'block' }}>
          <PageBanner pageTitle="artist" bannerInfo={bannerInfo} />
          <div className="relative">
            <div className="h-[232px] w-full absolute z-0 bg-[#121212]" style={{ backgroundColor: `${bannerInfo.primary_color}` }} />
            <PlaylistFunctions type="artist" follow={follow} onFollow={followArtist} setMessage={setMessage} playContext={playContext} />
            <div className="px-8 max-w-[1955px] z-[3]">
              <AboutMenu id={id} related={related} tracks={tracks} album={album} single={single} appear={appear} compilation={compilation} playContextTrack={playContextTrack} />
            </div>
          </div>
        </div>
      )
  )
}

export default ArtistPage
