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

  // Individual Playlist | API
  const [playlist, setPlaylist] = useState(null)
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false)

  // User's Playlists| API
  const [userPlaylists, setUserPlaylists] = useState([])
  const [isUserPlaylistsLoading, setIsUserPlaylistsLoading] = useState(false)

  // User's Artists | API
  const [Artists, setArtists] = useState([])
  const [isArtistsLoading, setIsArtistsLoading] = useState(false)

  // Artist | API
  const [artist, setArtist] = useState(null)
  const [isArtistLoading, setIsArtistLoading] = useState(false)

  // Artist's Top Tracks | API
  const [artistTopTracks, setArtistTopTracks] = useState([])
  const [isArtistTopTracksLoading, setIsArtistTopTracksLoading] = useState(false)

  // Artist's Albums | API
  const [artistAlbums, setArtistAlbums] = useState([])
  const [isArtistAlbumsLoading, setIsArtistAlbumsLoading] = useState(false)

  // Artist's Singles | API
  const [artistSingles, setArtistSingles] = useState([])
  const [isArtistSinglesLoading, setIsArtistSinglesLoading] = useState(false)

  // Artist's Related Artists | API
  const [artistRelatedArtists, setArtistRelatedArtists] = useState([])
  const [isArtistRelatedArtistsLoading, setIsArtistRelatedArtistsLoading] = useState(false)

  // Artist's Appear On | API
  const [artistAppearOn, setArtistAppearOn] = useState([])
  const [isArtistAppearOnLoading, setIsArtistAppearOnLoading] = useState(false)

  // Artist's Compilations | API
  const [artistCompilations, setArtistCompilations] = useState([])
  const [isArtistCompilationsLoading, setIsArtistCompilationsLoading] = useState(false)

  // User's Albums | API
  const [Albums, setAlbums] = useState([])
  const [isAlbumsLoading, setIsAlbumsLoading] = useState(false)

  // Album | API
  const [album, setAlbum] = useState(null)
  const [isAlbumLoading, setIsAlbumLoading] = useState(false)

  // Liked songs | API
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

  const searchAlbums = () => {
    if (search) {
      if (!isSearchResultsLoading) {
        setIsSearchResultsLoading(true)
        spotifyApi.searchAlbums(search).then((res) => {
          setSearchResults(
            // eslint-disable-next-line no-shadow
            res.albums.items.map((album) => ({
              id: album.id,
              artist: album.artists[0].name,
              title: album.name,
              uri: album.uri,
              albumUrl: album.images[0].url,
              popularity: album.popularity
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

  const searchPlaylists = () => {
    if (search) {
      if (!isSearchResultsLoading) {
        setIsSearchResultsLoading(true)
        spotifyApi.searchPlaylists(search).then((res) => {
          setSearchResults(
            // eslint-disable-next-line no-shadow
            res.playlists.items.map((playlist) => ({
              id: playlist.id,
              title: playlist.name,
              uri: playlist.uri,
              albumUrl: playlist.images[0].url,
              popularity: playlist.popularity
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
    if (!isGenrePlaylistsLoading) {
      setIsGenrePlaylistsLoading(true)
      spotifyApi.getCategoryPlaylists(genreId, { limit: 50 }).then((res) => {
        setGenrePlaylists(res.playlists.items)
      }).finally(() => {
        setIsGenrePlaylistsLoading(false)
      })
    }
  }

  const getPlaylist = (playlistId) => {
    if (!isPlaylistLoading) {
      setIsPlaylistLoading(true)
      spotifyApi.getPlaylist(playlistId).then((res) => {
        setPlaylist(res)
      }).finally(() => {
        setIsPlaylistLoading(false)
      })
    }
  }

  const getUserPlaylists = (userId) => {
    if (!isUserPlaylistsLoading) {
      setIsUserPlaylistsLoading(true)
      spotifyApi.getUserPlaylists(userId, { limit: 50 }).then((res) => {
        setUserPlaylists(res.items)
      }).finally(() => {
        setIsUserPlaylistsLoading(false)
      })
    }
  }

  const getArtists = (artistIds) => {
    if (!isArtistsLoading) {
      setIsArtistsLoading(true)
      spotifyApi.getFollowedArtists(artistIds, { limit: 50 }).then((res) => {
        setArtists(res.artists.items)
      }).finally(() => {
        setIsArtistsLoading(false)
      })
    }
  }

  // It is supposed to be a string, not an object
  const getArtist = (artistId) => {
    if (!isArtistLoading) {
      setIsArtistLoading(true)
      spotifyApi.getArtist(artistId).then((res) => {
        setArtist(res)
      }).finally(() => {
        setIsArtistLoading(false)
      })
    }
  }

  const getArtistTopTracks = (artistId) => {
    if (!isArtistTopTracksLoading) {
      setIsArtistTopTracksLoading(true)
      spotifyApi.getArtistTopTracks(artistId, 'HK', { limit: 5 }).then((res) => {
        setArtistTopTracks(res.tracks)
      }).finally(() => {
        setIsArtistTopTracksLoading(false)
      })
    }
  }

  const getArtistAlbums = (artistId) => {
    if (!isArtistAlbumsLoading) {
      setIsArtistAlbumsLoading(true)
      spotifyApi.getArtistAlbums(artistId, { limit: 8, include_groups: 'album' }).then((res) => {
        setArtistAlbums(res.items)
      }).finally(() => {
        setIsArtistAlbumsLoading(false)
      })
    }
  }

  const getArtistSingles = (artistId) => {
    if (!isArtistSinglesLoading) {
      setIsArtistSinglesLoading(true)
      spotifyApi.getArtistAlbums(artistId, { limit: 8, include_groups: 'single' }).then((res) => {
        setArtistSingles(res.items)
      }).finally(() => {
        setIsArtistSinglesLoading(false)
      })
    }
  }

  const getArtistRelatedArtists = (artistId) => {
    if (!isArtistRelatedArtistsLoading) {
      setIsArtistRelatedArtistsLoading(true)
      spotifyApi.getArtistRelatedArtists(artistId, { limit: 8 }).then((res) => {
        setArtistRelatedArtists(res.artists)
      }).finally(() => {
        setIsArtistAlbumsLoading(false)
      })
    }
  }

  const getArtistAppearOn = (artistId) => {
    if (!isArtistAppearOnLoading) {
      spotifyApi.getArtistAlbums(artistId, { limit: 8, include_groups: 'appears_on' }).then((res) => {
        setArtistAppearOn(res.items)
      }).finally(() => {
        setIsArtistAppearOnLoading(false)
      })
    }
  }

  const getArtistCompilations = (artistId) => {
    if (!isArtistCompilationsLoading) {
      spotifyApi.getArtistAlbums(artistId, { limit: 8, include_groups: 'compilation' }).then((res) => {
        setArtistCompilations(res.items)
      }).finally(() => {
        setIsArtistCompilationsLoading(false)
      })
    }
  }

  const getAlbums = () => {
    if (!isAlbumsLoading) {
      setIsAlbumsLoading(true)
      spotifyApi.getMySavedAlbums({ limit: 50 }).then((res) => {
        setAlbums(res.items)
      }).finally(() => {
        setIsAlbumsLoading(false)
      })
    }
  }

  const getAlbum = (albumId) => {
    if (!isAlbumLoading) {
      setIsAlbumLoading(true)
      spotifyApi.getAlbum(albumId).then((res) => {
        setAlbum(res)
      }).finally(() => {
        setIsAlbumLoading(false)
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
    searchAlbums,
    searchTracks,
    searchPlaylists,
    genres,
    getCategories,
    genre,
    getCategory,
    genrePlaylists,
    getCategoryPlaylists,
    playlist,
    setPlaylist,
    getPlaylist,
    userPlaylists,
    getUserPlaylists,
    Artists,
    setArtists,
    getArtists,
    artist,
    setArtist,
    getArtist,
    artistTopTracks,
    setArtistTopTracks,
    getArtistTopTracks,
    artistAlbums,
    setArtistAlbums,
    getArtistAlbums,
    artistSingles,
    setArtistSingles,
    getArtistSingles,
    artistRelatedArtists,
    setArtistRelatedArtists,
    getArtistRelatedArtists,
    artistAppearOn,
    setArtistAppearOn,
    getArtistAppearOn,
    artistCompilations,
    setArtistCompilations,
    getArtistCompilations,
    Albums,
    setAlbums,
    getAlbums,
    album,
    setAlbum,
    getAlbum,
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
