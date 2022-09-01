import { HomeIcon } from '@heroicons/react/solid'
import { VscLibrary } from 'react-icons/vsc'
import { RiCompassFill } from 'react-icons/ri'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { AiOutlineDownload } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
// import Playlist from './Playlist'

function Sidebar() {
  return (
    <section id="sidebar" className="fixed top-0 z-40 flex flex-col items-center bg-black w-[90px] h-[calc(100vh-70px)] space-y-8 p-4 overflow-y-scroll">
      <div>
        <Image
          src="/logo.png"
          alt="logo"
          width="56"
          height="56"
          objectFit="contain"
        />
      </div>
      <div>
        <div className="flex flex-col space-y-8">
          <Link href="/dashboard/Dashboard"><a><HomeIcon className="sidebarIcons" size={25} /></a></Link>
          <Link href="/search/SearchPage"><a><RiCompassFill className="sidebarIcons" size={25} /></a></Link>
          <Link href="/library"><a><VscLibrary className="sidebarIcons" size={25} /></a></Link>
          <Link href="/liked-songs/LikedSongs"><a><BsFillSuitHeartFill className="sidebarIcons" size={25} /></a></Link>
          {/* <Playlist /> */}
          <Link href="https://spotify.com/download"><a><AiOutlineDownload className="sidebarIcons" size={25} /></a></Link>
        </div>
      </div>
    </section>
  )
}

export default Sidebar

// If you have a page path called e.g. /library, you dont have to create /library/Library for the index page
// Just use /library/index.jsx, this is equal to /library
