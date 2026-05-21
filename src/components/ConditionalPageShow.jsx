'use client';
import { usePathname } from 'next/navigation';
import ProjectFlow from './ProjectFlow';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';
// import FacilityCardOfHomePage from './FacilityCardOfHomePage';

export default function ConditionalSections({children}) {
  const pathname = usePathname();
  
  if (pathname !== '/') return null;
  
  return (
    <>
      {children}
      <ProjectFlow/>
      <WhyChooseUs />
      <Footer/>
    </>
  );
}