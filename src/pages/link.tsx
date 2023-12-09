import { type NextPage } from "next";
import { useRouter } from "next/router";

import Head from "next-head-seo";
import Navbar from "../components/Navbar";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const LinkPage: NextPage = () => {
  const router = useRouter();

  const [link, setLink] = useState("");
  const [url, setUrl] = useState("");
  const setLinkServerside = trpc.link.set.useMutation();

  const handleWrap = async () => {
    if (link) return navigator.clipboard.writeText(link);
    if (!url) return;

    const res = await setLinkServerside.mutateAsync({ url });
    navigator.clipboard.writeText(res);
    setLink(res);
  };

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
            { title: "Home", func: () => router.push("/") },
            { title: "About", func: () => router.push("/") },
            { title: "Experience", func: () => router.push("/") },
          ]}
        />
        <div className="mx-auto mt-24 max-w-md space-y-6 md:mt-40">
          <h1 className="font-semibold uppercase text-info-light">Redis in middleware experiment</h1>
          <h2 className="text-5xl font-bold text-white">Link Wrapper</h2>
          <p className="text-main-light">Create a localized link to direct outside trafic through your website to a destination</p>
          <div className="flex gap-4 font-medium">
            <input className="grow rounded-full bg-main-medium p-2 text-white" placeholder="https://google.com" onChange={(e) => setUrl(e.target.value)} />

            <button
              className={`rounded-full ${
                link ? "bg-accent-light hover:bg-accent-dark" : "bg-main-medium enabled:hover:bg-main-border disabled:opacity-50"
              } p-2 tracking-tight text-white`}
              onClick={handleWrap}
              disabled={!url}
            >
              {link ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default LinkPage;
