import { type NextPage } from "next";

import Head from "next-head-seo";
import Navbar from "../components/Navbar";

import LandingSection from "../components/sections/LandingSection";

import GridSection from "../components/sections/GridSection";
import GridTiles from "../data/GridTiles";

import AboutSection from "../components/sections/AboutSection";
import TradingSection from "../components/sections/TradingSection";

import { type MutableRefObject, useRef } from "react";

const scrollToRef = (ref: MutableRefObject<HTMLElement | null>) => {
  if (ref.current) window.scrollTo({ top: ref.current.offsetTop - 50, behavior: "smooth" });
};

const Home: NextPage = () => {
  const LandingRef = useRef<HTMLElement | null>(null);
  const AboutRef = useRef<HTMLElement | null>(null);
  const ExperienceRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Head
        title={"Stoffberg.dev"}
        canonical={"https://stoffberg.dev"}
        description={"Personal Portfolio Website made by Dirk Stoffberg Beukes"}
        og={{
          title: "Stoffberg.dev",
          description: "Personal Portfolio Website made by Dirk Stoffberg Beukes",
          url: "https://stoffberg.dev",
          image: "https://stoffberg.dev/landing.png",
          type: "profile",
          siteName: "Stoffberg.dev",
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <main className="min-h-screen bg-main-dark pb-20 tracking-tight">
        <Navbar
          title="Stoffberg.dev"
          links={[
            { title: "Home", func: () => scrollToRef(LandingRef) },
            { title: "About", func: () => scrollToRef(AboutRef) },
            { title: "Experience", func: () => scrollToRef(ExperienceRef) },
          ]}
          ref={LandingRef}
        />

        <LandingSection />
        <GridSection
          title="Familiar Technologies"
          subtitle="This is a small collection of randomly selected technologies I've used over the years"
          gridCols={3}
          gridTiles={GridTiles}
        />

        <AboutSection
          title="Rapid Prototyper"
          subtitle="Informal Title"
          description={[
            "This is the best description I can formulate to describe myself. I specialize in creating Proof of Concept Software Solutions but small to medium scale applications can be done quite easily as well. A normal project takes me about one week.",
            "Starting with the design and then moving onto the implementation, the project is scaffolded with a database, authentication, a basic frontend, backend and deployed to the cloud for users to start using can happen in a few hours. This is record time compared to the normal developer workflow.",
            "At the end of the day, this is also what I find the most fun and it keeps me motivated to continue learning and improving my skills.",
          ]}
          ref={AboutRef}
        />

        <TradingSection
          title="General Experience"
          subtitle="Market Value"
          description={[
            "My portfolio includes a diverse range of technologies, including React, Python, Rust, Vue, Svelte, .Net, Javascript, Typescript, React Native, Expo, C++, C, Java, Flutter, and Dart. This broad range of expertise allows me to provide innovative and effective solutions to meet the specific needs of my clients.",

            "I have honed my skills through various projects with Zamaqo, Octoco, Cloud Direct and freelancing, where I have gained vast experience in delivering top-notch software solutions. My goal is to always deliver high-quality results that meet and exceed client expectations.",

            "I strive to continuously learn and improve my skills, so I can deliver even better results with each project, focusing on the speed and quality I deliver with.",
          ]}
          ref={ExperienceRef}
        />
      </main>
    </>
  );
};

export default Home;
