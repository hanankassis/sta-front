import HomeNav from '../components/home/HomeNav'
import SharedFooter from '../components/Shared/SharedFooter'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <HomeNav />
    <main>

    <Outlet/>
    </main>
    <SharedFooter/>
    </>
  )
}
