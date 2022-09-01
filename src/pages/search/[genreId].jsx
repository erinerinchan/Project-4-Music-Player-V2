import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSpotify from '@/contexts/spotify'
import useInfiScroll from '@/hooks/useInfiScroll'
import Cards from '../../components/global/Cards'
import PageTitle from '../../components/genre-page/PageTitle'

function Genre() {
  const {
    isReady,
    genre, getCategory,
    genrePlaylists, getCategoryPlaylists
  } = useSpotify()
  const { query: { genreId } } = useRouter()
  const { setCallback, lastRef } = useInfiScroll(10)

  useEffect(() => {
    if (genreId && isReady) {
      getCategory(genreId)
      getCategoryPlaylists(genreId)
      setCallback(() => () => {
        getCategoryPlaylists(genreId)
      })
    }
  }, [genreId, isReady])

  return (
    <div className="flex pt-4 pb-8 max-w-[1955px]">
      <PageTitle name={genre?.name} />
      <div className="my-4 grid gap-4 grid-cols-6 auto-rows-auto">
        {genrePlaylists.map((playlist, i) => (
          <Cards
            key={playlist.id}
            ref={i === genrePlaylists.length - 1 ? lastRef : null}
            info={playlist}
            type="playlist"
          />
        ))}
      </div>
    </div>
  )
}

export default Genre
