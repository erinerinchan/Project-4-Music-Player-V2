import { useEffect } from 'react'
import { MdOutlineSettings } from 'react-icons/md'
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { BiBell } from 'react-icons/bi'
import Dropdown from '@/layouts/Dropdown'
import useSpotify from '@/contexts/spotify'

function Navbar({ layoutOptions }) {
  const { search, setSearch, searchAlbums, searchTracks, searchPlaylists } = useSpotify()

  useEffect(() => {
    searchAlbums()
    searchTracks()
    searchPlaylists()
  }, [search])

  return (
    <div id="navbar" className="flex flex-wrap ml-[90px] w-[calc(100vw-90px)] justify-end p-3 sticky top-0 bg-black">
      {/* Search bar */}
      {
        layoutOptions?.search && (
          <div className="flex items-center grow bg-[#1a1a1a] rounded-full overflow-hidden border-2 border-[#333333] px-5">
            <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1a1a1a] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#fafafa] text-xs"
              placeholder="Search for Albums, Songs or Playlists..."
              search={search}
            />
          </div>
        )
      }

      {/* Icons */}
      <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-12 p-3 px-4 mx-4">
        <HiOutlineShieldCheck className="text-[#ccc] text-xl" />
        <MdOutlineSettings className="text-[#ccc] text-xl" />
        <BiBell className="text-[#CCCCCC] text-xl" />
      </div>

      {/* Profile */}
      <Dropdown />
    </div>
  )
}

export default Navbar
