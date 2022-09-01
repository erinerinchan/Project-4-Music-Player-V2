import Body from '@/components/dashboard/Body'
import Right from '@/layouts/Right'

function Dashboard() {
  return (
    <main className="flex flex-col md:flex-row bg-black">
      <Body />
      <Right />
    </main>
  )
}

Dashboard.layoutOptions = {
  search: true,
  posters: true
}

export default Dashboard
