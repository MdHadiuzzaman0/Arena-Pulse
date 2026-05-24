'use client';
import { usePathname } from 'next/navigation';
import ProjectFlow from './ProjectFlow';
import WhyChooseUs from './WhyChooseUs';
import Ratings from './Ratings';
import Review from './Review';

export default function ConditionalSections({children}) {
  const pathname = usePathname();
  
  if (pathname !== '/') return null;
  
  return (
    <>
      <Ratings />
      <ProjectFlow/>
      {children}
      <WhyChooseUs />
      <Review/>
    </>
  );
}