/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { FloatingNav } from './components/FloatingNav';
import { SectionNav } from './components/SectionNav';
import { SmoothScroll } from './components/SmoothScroll';
import { HeroSection } from './components/HeroSection';
import { ProductGallery } from './components/ProductGallery';
import { FullMenu } from './components/FullMenu';
import { AboutUs } from './components/AboutUs';
import { Partnering } from './components/Partnering';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="w-full min-h-screen bg-black">
      <Navbar />
      <FloatingNav />
      <SmoothScroll />
      <SectionNav />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="gallery">
        <ProductGallery />
      </section>
      <section id="full-menu">
        <FullMenu />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="partnering">
        <Partnering />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
