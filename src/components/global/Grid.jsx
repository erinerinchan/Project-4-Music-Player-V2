import React from 'react'
import Cards from './Cards'

const Grid = React.forwardRef(({ playlists }, ref) => (
  <div className="grid grid-cols-[autofill_minmax(164px,_1fr)] grid-rows-[1fr] overflow-y-scroll overflow-x-scroll gap-4 scrollbar-hide z-[3]">
    {playlists?.map((playlist, index) => {
      if (playlist) {
        if (index + 1 < playlist.length) {
          return <cards key={playlist.id} info={playlist} type={playlist.type} />
        }
        return <Cards ref={ref} key={playlist.id} info={playlist} type={playlist.type} />
      }
      return null
    })}
  </div>
))

export default Grid
