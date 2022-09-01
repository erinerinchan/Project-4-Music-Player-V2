import Link from 'next/link'

const style = {
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '16px',
  letterSpacing: 'normal',
  textTransform: 'none'
}

const AboutNavItem = ({ label, to }) => (
  <li className="inline-block">
    <Link href={to} className="mr-2 text-white relative inline-block no-underline my-2 mx-4 rounded" activeClassName="bg-[#333]">
      <a>
        <span style={style}>{label}</span>
      </a>
    </Link>
  </li>
)

export default AboutNavItem
