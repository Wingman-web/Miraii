import React from 'react'
import Hero from './Hero/Hero'
import { RevealZoom } from './Gateway/Gateway' 
import ScrollVideoComponent from './Mirai_Grace/Mirai_Grace'
import MiraiPodsIntro from './4_Pods/4_pods'
import MiraiPodsSlider from './Mirai_Pods_Slider/Pods_Slider'
import ClubhouseIntro from './4_Level_Clubhouse/4_Level_Clubhouse'
import MiraiClubhouse from './ClubeHouse_Img_controller/ClubeHouse_Controller'
import InteractiveMap from './Interative_Map/Interative_Map'
import ContactForm from './Contact_us/Contact_us'
import Footer from './Footer/Footer'
import SixthElement from './Sixth_Element/Sixth_element'


const Home = () => {
  return (
    <div>
      {/* All sections before Contact - wrapped with higher z-index */}
      <div className="relative z-10 bg-black">
        <Hero />
        {/* Spacer to offset the fixed hero so page content starts after it */}
        <div className="h-screen" aria-hidden="true" />
        <SixthElement />
        <RevealZoom />
        <ScrollVideoComponent />
        <MiraiPodsIntro />
        <MiraiPodsSlider />
        <ClubhouseIntro />
        <MiraiClubhouse />
        <InteractiveMap />
      </div>

      {/* Contact Form - Fixed position with z-index: 1 */}
      <ContactForm />

      {/* Spacer - Creates scroll room to see the fixed contact section */}
      <div className="relative h-screen" style={{ zIndex: 0 }} />

      {/* Footer - Scrolls up and covers the contact section with z-index: 10 */}
      <Footer />
    </div>
  )
}

export default Home