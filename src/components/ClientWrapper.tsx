'use client';

import CustomCursor from './CustomCursor';
import FloatingElements from './FloatingElements';
import Navbar from './Navbar';
import BackToTop from './BackToTop';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <FloatingElements />
      <Navbar />
      {children}
      <BackToTop />
    </>
  );
}