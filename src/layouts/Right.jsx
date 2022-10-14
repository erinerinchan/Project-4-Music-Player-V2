import { useEffect } from 'react'

import useSpotify from '@/contexts/spotify'

import RecentlyPlayed from '../components/dashboard/RecentlyPlayed'

function Right() {
  const { isReady, recentlyPlayed, getMyRecentlyPlayedTracks } = useSpotify()

  useEffect(() => {
    if (isReady) {
      getMyRecentlyPlayedTracks()
    }
  }, [isReady])

  return (
    <section className="p-4 px-10 space-y-3">
      {/* Recently played tracks */}
      <h1 className="text-white font-bold">Recently Played</h1>
      <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll overflow-x-scroll scrollbar-hide h-[250px] md:h-[400px]">
        {
          recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
            />
          ))
        }
      </div>
      <button className="btn text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out" type="button">
        View All
      </button>
    </section>
  )
}

export default Right
