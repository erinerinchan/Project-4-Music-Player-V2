import { useEffect } from 'react'

import useSpotify from '@/contexts/spotify'
import Cards from '../../components/search-page/Cards'

function SearchPage() {
  const { isReady, genres, getCategories } = useSpotify()

  useEffect(() => {
    if (isReady) {
      getCategories()
    }
  }, [isReady])

  return (
    <>
      {/* Browse All Genres */}
      <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
        <section className="bg-black ml-12 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
          <h1 className="text-white font-bold">Browse All Genres</h1>
          <div className="grid grid-cols-2 lg:grid-cols-6 flex-wrap auto-rows-auto gap-4 my-4">
            {genres.map((g) => <Cards key={g.id} info={g} />)}
          </div>
        </section>
      </main>
    </>
  )
}

SearchPage.layoutOptions = {
  search: true,
  posters: true
}

export default SearchPage
