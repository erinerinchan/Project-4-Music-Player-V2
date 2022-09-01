import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import PageBanner from '../../../components/global/PageBanner'
import PlaylistFunctions from '../../../components/global/PlaylistFunctions'
import Tracklist from '../../../components/global/Tracklist'
import Loader from '../../../components/Loader'
import useId from '../../../hooks/useId'
import useInfiScroll from '../../../hooks/useInfiScroll'
import { TokenContext, MessageContext, PlayContext } from '../../../contexts/context'
import putWithToken from '../../../utilities/putWithToken'
import makeAxiosRequest from '../../../utilities/makeAxiosRequest'

function useHighlight() {
  return new URLSearchParams(useRouter().search).get('highlight')
}

export default function AlbumPage() {
  const id = useId()
  const token = useContext(TokenContext)
  const setMessage = useContext(MessageContext)
  const updatePlayer = useContext(PlayContext)
  const [loader, setLoader] = useState(true)

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
  const [uri, setUri] = useState('')
  const { setCallback, lastRef } = useInfiScroll(setTracks)
  const source = axios.CancelToken.source()

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
    setLoader(true)
    // eslint-disable-next-line no-shadow
    const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/albums/${id}`)
    if (id) {
      makeRequest()
        .then((data) => {
          // eslint-disable-next-line no-shadow
          const { albumType, name, artists, primaryColor, tracks, images, releaseDate, uri } = data
          // eslint-disable-next-line no-shadow
          setbannerInfo((bannerInfo) => ({ ...bannerInfo, albumType, name, user: artists, primaryColor, images, releaseDate }))
          setTracks(tracks.items)
          setCallback(tracks.next)
          setUri(uri)
          setLoader(false)
        })
        .catch((error) => {
          setLoader(false)
          setMessage(`ERROR: ${error}`)
        })
    }

    return () => source.cancel()
    // eslint-disable-next-line
    }, [id])

  const playContext = () => {
    const body = {
      context_uri: uri
    }
    const request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source, body)
    request()
      .then((response) => {
        if (response.status === 204) {
          setTimeout(() => updatePlayer(), 500)
        } else {
          setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
        }
      })
      .catch((error) => setMessage(`ERROR: ${error}`))
  }

  const playContextTrack = (trackUri) => {
    const body = {
      context_uri: uri,
      offset: { uri: trackUri }
    }
    const request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source, body)
    request()
      .then((response) => {
        if (response.status === 204) {
          setTimeout(() => updatePlayer(), 500)
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
        <div className="listPage" style={{ display: `${tracks.length === 0 ? 'none' : 'block'}` }}>
          <PageBanner pageTitle={bannerInfo.albumType} bannerInfo={bannerInfo} />
          <div className="playListContent">
            <div className="playListOverlay" style={{ backgroundColor: `${bannerInfo.primaryColor}` }} />
            <PlaylistFunctions onFollow={() => setMessage('Oops looks like the Spotify API does not support following albums')} setMessage={setMessage} playContext={playContext} />
            <div className="page-content">
              <Tracklist ref={lastRef} tracks={tracks} highlight={highlight} playContextTrack={playContextTrack} />
            </div>
          </div>
        </div>
      )
  )
}
