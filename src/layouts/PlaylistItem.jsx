import Link from 'next/link'

function PlaylistItem({ name, id }) {
  return (
    <li className="m-0">
      <Link href={`/playlist/${id}`} className="text-white no-underline h-8 leading-8 text-sm font-medium overflow-hidden cursor-default" activeStyle={{ color: '#fff' }}>
        <a>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap block">
            {name}
          </div>
        </a>
      </Link>
    </li>
  )
}

export default PlaylistItem
