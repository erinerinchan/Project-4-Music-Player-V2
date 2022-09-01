import React from 'react'
import Cards from './Cards'

const Grid = React.forwardRef(({ playlists }, ref) => (
  <div className="grid grid-cols-[autofill_minmax(164px,_1fr)] grid-rows-[1fr] overflow-y-hidden overflow-x-hidden grid gap-4 z-[3]">
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

// when you map through an array, the array cannot be undefined. In this case you map it too early before react gets the value of playlists. I use optional chaining when mapping array because it can prevent this crash

// check out optional chaining ES6
