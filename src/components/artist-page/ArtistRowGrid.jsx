import ArtistRowItem from './[ArtistRowItemId]'

const ArtistRowGrid = ({ list }) => (
  <div className="grid gap-x-9 gap-y-4 grid-cols-[autofill_minmax(200px,_1fr)]">
    {list.map((item, index) => <ArtistRowItem key={index} info={item} />)}
  </div>
)

export default ArtistRowGrid
