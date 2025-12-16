import { useEffect } from 'react';
import HomeNav from '../../components/home/HomeNav'
import SharedFooter from '../../components/Shared/SharedFooter'
import { Outlet } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css';


export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Duration of animations (in milliseconds)
      // once: true, // Whether animation should happen only once - while scrolling down
	  easing: 'ease-in-out',
    });
  }, []);

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
