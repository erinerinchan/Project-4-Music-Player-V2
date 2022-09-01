import React from 'react'
import Title from './Title'
import Grid from '../global/Grid'

const Row = React.forwardRef(({ name, playlists, id }, ref) => (
  <div className="w-full grid gap-4 auto-cols-auto auto-rows-auto">
    <Title title={name} id={id} />
    <Grid ref={ref} playlists={playlists} />
  </div>
))

export default Row
