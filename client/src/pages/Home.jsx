import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
// import Aseeda from '../components/Aseeda'
import Menu from '../components/Menu'


const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      {/* <Menu /> */}
      <hr className="h-px my-8 bg-transparent bg-gradient-to-r from-transparent via-gray-300 to-transparent border-0" />
      <Categories />
      <hr className="h-px my-8 bg-transparent bg-gradient-to-r from-transparent via-gray-300 to-transparent border-0 mt-16" />

      <BestSeller />
      <BottomBanner />
      {/* <NewsLetter /> */}
     
    </div>
  )
}

export default Home
