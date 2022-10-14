import ArtistRowItem from './ArtistRowItem'

const ArtistRowGrid = ({ list }) => (
  <div className="flex flex-row gap-x-9 gap-y-4">
    {list.map((item, index) => <ArtistRowItem key={index} info={item} />)}
  </div>
)

export default ArtistRowGrid
