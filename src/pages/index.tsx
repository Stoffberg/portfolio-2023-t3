import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "phosphor-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stoffberg.dev</title>
        <meta name="description" content="Personal Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-main-dark pb-12 tracking-tight">
        <nav className="p-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <h1 className="text-2xl font-bold text-white">Stoffberg.dev</h1>
            <ul className="flex gap-12 font-medium text-main-light">
              <li>About</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
            <div className="flex gap-6 font-medium">
              <button className="rounded-full p-2 tracking-tight text-main-light">
                Login
              </button>
              <button className="rounded-full bg-accent-light py-2 px-6 tracking-tight text-white hover:bg-accent-dark">
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        <article className="relative z-20 mx-auto my-28 max-w-7xl text-center">
          <div className="absolute top-32 left-8 z-10 space-y-2 rounded-md border border-main-border bg-main-medium p-8 text-left font-medium">
            <span className="uppercase text-main-light">Lines of code</span>
            <div className="flex gap-4">
              <span className="text-4xl font-bold text-white">83,135</span>
              <div className="h-max rounded-full bg-info-dark px-2">
                <span className="uppercase text-info-light">Private</span>
              </div>
            </div>
          </div>
          <div className="absolute top-8 right-12 z-10 space-y-2 rounded-md border border-main-border bg-main-medium p-8 text-left font-medium">
            <span className="uppercase text-main-light">Projects</span>
            <div className="flex gap-4">
              <span className="text-4xl font-bold text-white">29</span>
              <div className="h-max rounded-full bg-warning-dark px-2">
                <span className="uppercase text-warning-light">Published</span>
              </div>
            </div>
          </div>
          <svg
            width="400"
            height="300"
            viewBox="0 0 100 100"
            fill="none"
            className="absolute top-36 left-12"
          >
            <path
              d="M0.5 0.50123C55.0557 0.769652 99.2303 44.9443 99.4988 99.5H50.4971C50.3992 91.0927 47.8315 78.7714 40.4058 68.4578C32.876 57.9999 20.3724 49.6397 0.5 49.5017V0.50123Z"
              stroke="url(#linear-gradient)"
            />
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="0"
                y1="100"
                x2="100"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.0383121"
                  stop-color="#5ABDDE"
                  stop-opacity="0"
                />
                <stop offset="0.572917" stop-color="#5ABDDE" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            width="280"
            height="300"
            viewBox="0 0 103 103"
            fill="none"
            className="absolute right-12"
          >
            <path d="M101 102L1 2V102H101Z" stroke="url(#linear-gradient-2)" />
            <defs>
              <linearGradient
                id="linear-gradient-2"
                x1="1"
                y1="102"
                x2="101"
                y2="102"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#C4852A" />
                <stop offset="1" stop-color="#C4852A" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="mx-auto max-w-sm space-y-6">
            <h3 className="font-semibold uppercase text-info-light">
              Hello, I&apos;m Dirk Stoffberg
            </h3>
            <h1 className="text-5xl font-bold text-white">
              Turn you ideas into reality.
            </h1>
            <p className="text-main-light">
              A central place for all my projects, ideas and thoughts. Contact
              me for business inquiries.
            </p>
            <div className="grid grid-cols-2 gap-4 font-medium">
              <button className="rounded-full bg-accent-light py-2 px-6 tracking-tight text-white hover:bg-accent-dark">
                Contact Me
              </button>
              <button className="rounded-full bg-main-medium p-2 tracking-tight text-white hover:bg-main-border">
                Read Further
              </button>
            </div>
          </div>
          <div className="ml-auto mt-24 grid w-7/12 grid-cols-3 gap-4 pr-12">
            <div className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white">
              <GithubLogo className="my-auto mr-4 h-5 w-5" />
              <span>GitHub</span>
            </div>
            <div className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white">
              <InstagramLogo className="my-auto mr-4 h-5 w-5" />
              <span>Instagram</span>
            </div>
            <div className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white">
              <LinkedinLogo className="my-auto mr-4 h-5 w-5" />
              <span>LinkedIn</span>
            </div>
          </div>
        </article>
        <section className="mx-auto max-w-7xl">
          <h1 className="mt-16 mb-4 text-center text-4xl font-bold text-white">
            Interested Technologies
          </h1>
          <p className="mb-8 text-center text-main-light">
            This is a small collection of randomly selected technologies
            I&apos;ve used over the years
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg
                  viewBox="0 0 24 24"
                  className="aspect-square h-10 fill-white py-1"
                >
                  <title>Next.js</title>
                  <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"></path>
                </svg>
                <p className="text-xl font-medium text-white">Next.js</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Next.js is a hybrid framework for building heavily optimized
                  web applications in React. It empowers me to quickly mock up
                  websites that used to take weeks in the span of a few hours.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg viewBox="0 0 512 512" className="aspect-square h-10 py-1">
                  <title>TypeScript</title>
                  <rect width="512" height="512" rx="50" fill="#3178c6"></rect>
                  <path
                    d="m317 407v50c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4 11-2.3 20-6.1 28-11 8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9-5.2-2.6-9.7-5.2-13-7.8-3.7-2.7-6.5-5.5-8.5-8.4-2-3-3-6.3-3-10 0-3.4 0.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6 4.7-1.1 9.9-1.6 16-1.6 4.2 0 8.6 0.31 13 0.94 4.6 0.63 9.3 1.6 14 2.9 4.7 1.3 9.3 2.9 14 4.9 4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21-4.7 8.4-7 18-7 30 0 15 4.3 28 13 38 8.6 11 22 19 39 27 6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5 2.5 3.4 3.8 7.4 3.8 12 0 3.2-0.78 6.2-2.3 9s-3.9 5.2-7.1 7.2-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7-11 0-22-1.9-32-5.7-11-3.8-21-9.5-30-17zm-84-123h64v-41h-179v41h64v183h51z"
                    clip-rule="evenodd"
                    fill="#fff"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                <p className="text-xl font-medium text-white">Typescript</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Typescript is a superset of JavaScript that adds static typing
                  to the language. I use it in conjunction with tRPC to build my
                  APIs or wuth generics to build typesafe libraries.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg viewBox="0 0 24 24" className="h-10 fill-white py-1">
                  <title>Prisma</title>
                  <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z"></path>
                </svg>
                <p className="text-xl font-medium text-white">Prisma</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Prisma is an ORM for Typescipt that works with most SQL
                  databases and MongoDB. It is a great tool for quickly
                  connecting to databases and preforming queries with typesafety
                  guaranteed.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4  py-2">
                <svg
                  viewBox="0 0 24 24"
                  className="aspect-square h-10 fill-[#06B6D4] py-1"
                >
                  <title>Tailwind CSS</title>
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"></path>
                </svg>
                <p className="text-xl font-medium text-white">TailwindCSS</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Tailwind CSS is a css framework that allows you to quickly and
                  effectively style a webpage. It lets me enter a flow state and
                  focus on the logic of the application instead of the styling.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <Image
                  src="/nextauth.webp"
                  width={24}
                  height={24}
                  className="aspect-square h-10 w-8 py-1"
                  alt={"NextAuth"}
                />
                <p className="text-xl font-medium text-white">NextAuth</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  It provides a free drop-in authentication solution for
                  Next.js. Can be set up to work with databases, web tokens and
                  practically any OAuth provider. All the complexity is handled
                  by default.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg
                  viewBox="0 0 512 512"
                  className="aspect-square h-10 fill-[#398CCB] py-1"
                >
                  <title>tRPC</title>
                  <rect width="512" height="512" rx="150" fill="#398CCB"></rect>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M255.446 75L326.523 116.008V138.556L412.554 188.238V273.224L435.631 286.546V368.608L364.6 409.615L333.065 391.378L256.392 435.646L180.178 391.634L149.085 409.615L78.0538 368.538V286.546L100.231 273.743V188.238L184.415 139.638L184.462 139.636V116.008L255.446 75ZM326.523 159.879V198.023L255.492 239.031L184.462 198.023V160.936L184.415 160.938L118.692 198.9V263.084L149.085 245.538L220.115 286.546V368.538L198.626 380.965L256.392 414.323L314.618 380.712L293.569 368.538V286.546L364.6 245.538L394.092 262.565V198.9L326.523 159.879ZM312.031 357.969V307.915L355.369 332.931V382.985L312.031 357.969ZM417.169 307.846L373.831 332.862V382.985L417.169 357.9V307.846ZM96.5154 357.9V307.846L139.854 332.862V382.915L96.5154 357.9ZM201.654 307.846L158.315 332.862V382.915L201.654 357.9V307.846ZM321.262 291.923L364.6 266.908L407.938 291.923L364.6 316.962L321.262 291.923ZM149.085 266.838L105.746 291.923L149.085 316.892L192.423 291.923L149.085 266.838ZM202.923 187.362V137.308L246.215 162.346V212.377L202.923 187.362ZM308.015 137.308L264.723 162.346V212.354L308.015 187.362V137.308ZM212.154 121.338L255.446 96.3231L298.785 121.338L255.446 146.354L212.154 121.338Z"
                    fill="white"
                  ></path>
                </svg>
                <p className="text-xl font-medium text-white">tRPC</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  tRPC connects your frontend logic to your backend logic by
                  providing type inference and a unified API for both.
                  Iterations are done with ease and without any fear of breaking
                  the frontend.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg
                  className="aspect-square h-10 py-1"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <title>PlanetScale</title>
                  <path
                    d="M0 20C9.40317e-07 8.95427 8.95427 -9.40317e-07 20 0C28.1214 7.09998e-07 35.1122 4.84073 38.2446 11.7943L11.7943 38.2446C10.6593 37.7333 9.58053 37.1191 8.5699 36.4141L24.984 20H20L5.85787 34.1421C2.23858 30.5228 -4.82823e-07 25.5228 0 20Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M39.999 20.0065L20.0059 39.9996C31.0461 39.9959 39.9953 31.0468 39.999 20.0065Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p className="text-xl font-medium text-white">PlanetScale</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  PlanetScale is a MySQL compatable, database-as-a-service that
                  makes it easy to host a website with a database that scales
                  with your traffic. It&apos;s serverless and has an extremely
                  generous free tier.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg
                  className="aspect-square h-10 w-8 py-1"
                  width="76"
                  height="65"
                  viewBox="0 0 76 65"
                  fill="none"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
                </svg>
                <p className="text-xl font-medium text-white">Vercel</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Vercel is a hosting platform that makes deploying an
                  application to the web as simple as connecting GitHub to the
                  project. Automatic deployments for your fullstack application
                  gets done in about a minute.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 rounded-t-md border border-main-border bg-main-border px-4 py-2">
                <svg
                  className="aspect-square h-10 fill-[#398CCB] py-1"
                  viewBox="0 0 166 155.3"
                >
                  <title>Solid.js</title>
                  <path
                    d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
                    fill="#76b3e1"
                  />
                  <linearGradient
                    id="a"
                    gradientUnits="userSpaceOnUse"
                    x1="27.5"
                    y1="3"
                    x2="152"
                    y2="63.5"
                  >
                    <stop offset=".1" stop-color="#76b3e1" />
                    <stop offset=".3" stop-color="#dcf2fd" />
                    <stop offset="1" stop-color="#76b3e1" />
                  </linearGradient>
                  <path
                    d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
                    opacity=".3"
                    fill="url(#a)"
                  />
                  <path
                    d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
                    fill="#518ac8"
                  />
                  <linearGradient
                    id="b"
                    gradientUnits="userSpaceOnUse"
                    x1="95.8"
                    y1="32.6"
                    x2="74"
                    y2="105.2"
                  >
                    <stop offset="0" stop-color="#76b3e1" />
                    <stop offset=".5" stop-color="#4377bb" />
                    <stop offset="1" stop-color="#1f3b77" />
                  </linearGradient>
                  <path
                    d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
                    opacity=".3"
                    fill="url(#b)"
                  />
                  <linearGradient
                    id="c"
                    gradientUnits="userSpaceOnUse"
                    x1="18.4"
                    y1="64.2"
                    x2="144.3"
                    y2="149.8"
                  >
                    <stop offset="0" stop-color="#315aa9" />
                    <stop offset=".5" stop-color="#518ac8" />
                    <stop offset="1" stop-color="#315aa9" />
                  </linearGradient>
                  <path
                    d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
                    fill="url(#c)"
                  />
                  <linearGradient
                    id="d"
                    gradientUnits="userSpaceOnUse"
                    x1="75.2"
                    y1="74.5"
                    x2="24.4"
                    y2="260.8"
                  >
                    <stop offset="0" stop-color="#4377bb" />
                    <stop offset=".5" stop-color="#1a336b" />
                    <stop offset="1" stop-color="#1a336b" />
                  </linearGradient>
                  <path
                    d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
                    fill="url(#d)"
                  />
                </svg>
                <p className="text-xl font-medium text-white">Solid.js</p>
              </div>
              <div className="grow rounded-b-md border border-main-border bg-main-medium p-4">
                <p className="text-main-light">
                  Solid.js is a fontend framework with APIs similar to React.js
                  but with major speed and quality of life improvements. I
                  generally prefer using Solid if I&apos;m not using Next.js.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
