import { type NextPage } from "next";

import Head from "next-head-seo";
import Navbar from "../components/Navbar";

import LandingSection from "../components/sections/LandingSection";

import GridSection from "../components/sections/GridSection";
import GridTiles from "../data/GridTiles";

import AboutSection from "../components/sections/AboutSection";

const Home: NextPage = () => {
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
            { title: "Home", href: "/" },
            { title: "About", href: "/" },
            { title: "Experience", href: "/" },
          ]}
          actions={[{ title: "Contact me", href: "/", accent: true }]}
        />

        <LandingSection />
        <GridSection
          title="Interested Technologies"
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
        />
      </main>
    </>
  );
};

export default Home;
