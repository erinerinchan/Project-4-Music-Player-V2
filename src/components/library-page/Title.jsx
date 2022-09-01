function Title({ title, id }) {
  return (
    <div className="flex align-center justify-between z-[2]">
      <h1 style={{ fontSize: '24px',
        lineHeight: '28px',
        letterSpacing: '-0.04em',
        fontWeight: '700',
        color: 'white' }}
      >{title}</h1>
      {id ? <a href={`/search/${id}`} className="text-xs uppercase font-bold leading-4 tracking-wider no-underline text-[#b3b3b3]">see all</a> : null}
    </div>
  )
}

export default Title
