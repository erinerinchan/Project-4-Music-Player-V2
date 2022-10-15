function CardDisplay({ url, type }) {
  return (
    <div className="relative w-full pb-4 mb-4 bg-transparent shadow-lg" style={{ borderRadius: type === 'artist' ? '50%' : '0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        loading="lazy"
        className="h-full w-full top-0 left-0"
        style={{ width: '172px', height: '172px', borderRadius: type === 'artist' ? '50%' : '0' }}
        alt="card-display"
      />
    </div>
  )
}

export default CardDisplay
