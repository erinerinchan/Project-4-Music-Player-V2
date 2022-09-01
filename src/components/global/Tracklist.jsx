import React from 'react'
import TracklistItem from './TracklistItem'

const Tracklist = React.forwardRef(({ tracks, styleName, highlight, playContextTrack }, ref) => (
  <div className="relative">
    <ol className="w-full mb-6">
      {tracks?.map((track, index) => (
        <TracklistItem
          {...(index + 1 < tracks.length ? {} : { ref })}
          track={track.track}
          key={track.track.id}
          styleName={styleName}
          highlight={track.track.id === highlight}
          playContextTrack={playContextTrack}
        />
      ))}
    </ol>
  </div>
)
)

export default Tracklist
