import Image from 'next/image'

function Card({ info }) {
  const { icons, name, id } = info
  const imgLink = icons[0].url

  const titleStyle = {
    fontSize: '24px',
    padding: '16px',
    lineHeight: '1.3em',
    letterSpacing: '-.04em',
    overflowWrap: 'break-word',
    position: 'absolute',
    zIndex: '1',
    bottom: '0',
    textAlign: 'left',
    margin: 'auto',
    hyphens: 'auto'
  }

  const overlayStyle = {
    background: 'linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.4))',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '200%',
    height: '200%'
  }

  return (
    <div className="relative overflow-hidden after:block after:pb-[100%]">
      <a href={`/search/${id}`} className="w-full absolute text-white">
        <h3 style={titleStyle}>{name}</h3>
        <div style={overlayStyle} />
        <Image
          className="rounded-lg"
          loading="lazy"
          src={imgLink}
          alt="cards"
          width="200%"
          height="200%"
        />
      </a>
    </div>
  )
}

export default Card
