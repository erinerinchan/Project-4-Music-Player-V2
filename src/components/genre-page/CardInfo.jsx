function cardInfo({ title, description }) {
  return (
    <div className="h-[66px]">
      <h2 className="text-base font-bold leading-6 tracking-normal normal-case truncate text-white">{title}</h2>
      <p className="text-xs text-[#B3B3B3] font-normal leading-4 normal-case text-ellipsis overflow-hidden mt-1 whitespace-normal line-clamp-2">{description}</p>
    </div>
  )
}

export default cardInfo
