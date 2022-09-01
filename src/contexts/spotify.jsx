import SpotifyWebApi from 'spotify-web-api-js'
import { useEffect, useState, createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'

const SpotifyContext = createContext()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID
})

export function SpotifyProvider({ children }) {
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const [isReady, setIsReady] = useState(false)

  // Playing State
  const [isPlaying, setIsPlaying] = useState(false)

  // Tracks
  const [currentTrack, setCurrentTrack] = useState(null)
  const [tracksQueue, setTracksQueue] = useState([])

  // Recently Played | API
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isRecentlyPlayedLoading, setIsRecentlyPlayedLoading] = useState(false)

  // New Releases | API
  const [newReleases, setNewReleases] = useState([])
  const [isNewReleasesLoading, setIsNewReleasesLoading] = useState(false)

  // Searches | API
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState(false)

  // Genres (Categories) | API
  const [genres, setGenres] = useState([])
  const [isGenresLoading, setIsGenresLoading] = useState(false)

  // Genre (Category) | API
  const [genre, setGenre] = useState(null)
  const [isGenreLoading, setIsGenreLoading] = useState(false)

  // Genre (Category) Playlists | API
  const [genrePlaylists, setGenrePlaylists] = useState([])
  const [isGenrePlaylistsLoading, setIsGenrePlaylistsLoading] = useState(false)
  const [categoryPlaylistsOffset, setCategoryPlaylistsOffset] = useState(0)
  const [categoryPlaylistsTotal, setCategoryPlaylistsTotal] = useState(null)

  // Individual Playlist | API ?
  const [playlist, setPlaylist] = useState(null)
  const [isPlaylistLoading, setPlaylistLoading] = useState(false)

  // Follow Playlist | API ?
  const [followPlaylist, setFollowPlaylist] = useState(null)
  const [isFollowPlaylistLoading, setFollowPlaylistLoading] = useState(false)

  // Individual Artist | API ?
  const [artist, setArtist] = useState(null)
  const [isArtistLoading, setIsArtistLoading] = useState(false)

  // Artists | API ?
  const [artists, setArtists] = useState([])
  const [isArtistsLoading, setIsArtistsLoading] = useState(false)
  const [artistsOffset, setArtistsOffset] = useState(0)
  const [artistsTotal, setArtistsTotal] = useState(null)

  // Individual Album | API ?
  const [album, setAlbum] = useState(null)
  const [isAlbumLoading, setIsAlbumLoading] = useState(false)

  // Albums | API ?
  const [albums, setAlbums] = useState([])
  const [isAlbumsLoading, setIsAlbumsLoading] = useState(false)
  const [albumsOffset, setAlbumsOffset] = useState(0)
  const [albumsTotal, setAlbumsTotal] = useState(null)

  // Liked songs | API ?
  const [likedSongs, setLikedSongs] = useState([])
  const [isLikedSongsLoading, setIsLikedSongsLoading] = useState(false)
  const [likedSongsOffset, setLikedSongsOffset] = useState(0)
  const [likedSongsTotal, setLikedSongsTotal] = useState(null)

  // Initial API Setting
  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken)
      setIsReady(true)
    }
  }, [accessToken])

  const getMyRecentlyPlayedTracks = () => {
    if (!isRecentlyPlayedLoading) {
      setIsRecentlyPlayedLoading(true)
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
        setRecentlyPlayed(
          res.items.map(({ track }) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url
          }))
        )
      }).finally(() => {
        setIsRecentlyPlayedLoading(false)
      })
    }
  }

  const getNewReleases = () => {
    if (!isNewReleasesLoading) {
      setIsNewReleasesLoading(true)
      spotifyApi.getNewReleases().then((res) => {
        setNewReleases(
          res.albums.items.map((track) => ({
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url
          }))
        )
      }).finally(() => {
        setIsNewReleasesLoading(false)
      })
    }
  }

  const searchTracks = () => {
    if (search) {
      if (!isSearchResultsLoading) {
        setIsSearchResultsLoading(true)
        spotifyApi.searchTracks(search).then((res) => {
          setSearchResults(
            res.tracks.items.map((track) => ({
              id: track.id,
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
              popularity: track.popularity
            }))
          )
        }).finally(() => {
          setIsSearchResultsLoading(false)
        })
      }
    } else {
      setSearchResults([])
    }
  }

  const getCategories = () => {
    if (!isGenresLoading) {
      setIsGenresLoading(true)
      spotifyApi.getCategories({ limit: 50 }).then((res) => {
        setGenres(res.categories.items)
      }).finally(() => {
        setIsGenresLoading(false)
      })
    }
  }

  const getCategory = (genreId) => {
    if (!isGenreLoading) {
      setIsGenreLoading(true)
      spotifyApi.getCategory(genreId).then((res) => {
        setGenre(res.name)
      }).finally(() => {
        setIsGenreLoading(false)
      })
    }
  }

  const getCategoryPlaylists = (genreId) => {
    if (!isGenrePlaylistsLoading && (categoryPlaylistsTotal === null || categoryPlaylistsTotal > categoryPlaylistsOffset)) {
      setIsGenrePlaylistsLoading(true)
      spotifyApi.getCategoryPlaylists(genreId, { limit: 10, offset: categoryPlaylistsOffset }).then((res) => {
        setCategoryPlaylistsTotal(res.playlists.total)
        setCategoryPlaylistsOffset((offset) => (offset + 10))
        setGenrePlaylists((list) => [...list, ...res.playlists.items])
      }).finally(() => {
        setIsGenrePlaylistsLoading(false)
      })
    }
  }

  const getPlaylist = (playlistId) => {
    if (!isPlaylistLoading) {
      setPlaylistLoading(true)
      spotifyApi.getPlaylist(playlistId).then((res) => {
        setPlaylist(res)
      }).finally(() => {
        setPlaylistLoading(false)
      })
    }
  }

  const getFollowPlaylist = (playlistId) => {
    if (!isFollowPlaylistLoading) {
      setFollowPlaylistLoading(true)
      spotifyApi.followPlaylist(playlistId).then((res) => {
        setFollowPlaylist(res.followPlaylist.item)
      }).finally(() => {
        setFollowPlaylistLoading(false)
      })
    }
  }

  const getAlbum = (albumId) => {
    if (!isAlbumLoading) {
      setIsAlbumLoading(true)
      spotifyApi.getAlbum(albumId).then((res) => {
        setAlbum(res.album.item)
      }).finally(() => {
        setIsAlbumLoading(false)
      })
    }
  }

  const getAlbums = (albumIds) => {
    if (!isAlbumsLoading && (albumsTotal === null || albumsTotal > albumsOffset)) {
      setIsAlbumsLoading(true)
      spotifyApi.getAlbums(albumIds, { limit: 10, offset: albumsOffset }).then((res) => {
        setAlbumsTotal(res.albums.total)
        setAlbumsOffset((offset) => (offset + 10))
        // eslint-disable-next-line no-shadow
        setAlbums((album) => [...album, ...res.albums.items])
      }).finally(() => {
        setIsAlbumsLoading(false)
      })
    }
  }

  const getArtist = (artistId) => {
    if (!isArtistLoading) {
      setIsArtistLoading(true)
      spotifyApi.getArtist(artistId).then((res) => {
        setArtist(res.artist.item)
      }).finally(() => {
        setIsArtistLoading(false)
      })
    }
  }

  const getArtists = (artistIds) => {
    if (!isArtistsLoading && (artistsTotal === null || artistsTotal > artistsOffset)) {
      setIsArtistsLoading(true)
      spotifyApi.getArtists(artistIds, { limit: 20, offset: artistsOffset }).then((res) => {
        setArtistsTotal(res.artists.total)
        setArtistsOffset((offset) => (offset + 20))
        // eslint-disable-next-line no-shadow
        setArtists((artist) => [...artist, ...res.artists.items])
      }).finally(() => {
        setIsArtistsLoading(false)
      })
    }
  }

  const getLikedSongs = () => {
    if (!isLikedSongsLoading && (likedSongsTotal === null || likedSongsTotal > likedSongsOffset)) {
      setIsLikedSongsLoading(true)
      spotifyApi.getMySavedTracks({ limit: 20, offset: likedSongsOffset }).then((res) => {
        setLikedSongsTotal(res.total)
        setLikedSongsOffset((offset) => (offset + 20))
        setLikedSongs((likedSong) => [...likedSong, ...res.items])
      }).finally(() => {
        setIsLikedSongsLoading(false)
      })
    }
  }

  const contextData = {
    spotifyApi,
    isReady,
    accessToken,
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    tracksQueue,
    setTracksQueue,
    recentlyPlayed,
    getMyRecentlyPlayedTracks,
    newReleases,
    getNewReleases,
    search,
    setSearch,
    searchResults,
    searchTracks,
    genres,
    getCategories,
    genre,
    getCategory,
    genrePlaylists,
    categoryPlaylistsOffset,
    setCategoryPlaylistsOffset,
    categoryPlaylistsTotal,
    setCategoryPlaylistsTotal,
    getCategoryPlaylists,
    playlist,
    setPlaylist,
    getPlaylist,
    followPlaylist,
    setFollowPlaylist,
    getFollowPlaylist,
    artist,
    setArtist,
    getArtist,
    artists,
    setArtists,
    artistsOffset,
    setArtistsOffset,
    artistsTotal,
    setArtistsTotal,
    getArtists,
    album,
    setAlbum,
    getAlbum,
    albums,
    setAlbums,
    albumsOffset,
    setAlbumsOffset,
    albumsTotal,
    setAlbumsTotal,
    getAlbums,
    likedSongs,
    setLikedSongs,
    likedSongsOffset,
    setLikedSongsOffset,
    likedSongsTotal,
    setLikedSongsTotal,
    getLikedSongs
  }

  return <SpotifyContext.Provider value={contextData}>{children}</SpotifyContext.Provider>
}

const useSpotify = () => useContext(SpotifyContext)
export default useSpotify
