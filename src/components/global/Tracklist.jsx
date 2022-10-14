import React from 'react'
import TracklistItem from './TracklistItem'

const Tracklist = React.forwardRef(({ tracks, styleName, highlight }, ref) => (
  <div className="relative">
    <ol className="w-full mb-6">
      {tracks?.map((track, index) => (
        <TracklistItem
          {...(index + 1 < tracks.length ? {} : { ref })}
          track={track?.track || track}
          key={track?.track?.id || track?.id}
          styleName={styleName}
          highlight={(track?.track?.id || track?.id) === highlight}
        />
      ))}
    </ol>
  </div>
)
)

export default Tracklist
