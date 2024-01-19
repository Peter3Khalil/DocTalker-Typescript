import CTA from "@/components/landingPageComponents/CTA";
import Features from "@/components/landingPageComponents/Features";
import Footer from "@/components/landingPageComponents/Footer";
import Hero from "@/components/landingPageComponents/Hero";
import Statistics from "@/components/landingPageComponents/Statistics";
import Testimonials from "@/components/landingPageComponents/Testimonials";
import Head from "next/head";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Doctalker - Doctalker documents Management </title>
        <meta
          name="description"
          content="Doctalker - Doctalker documents Management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <Features />
        <Statistics />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
