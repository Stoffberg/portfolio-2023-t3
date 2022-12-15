import Image from "next/image";

const GridTiles = [
  {
    title: "Next.js",
    description:
      "Next.js is a hybrid framework for building heavily optimized web applications in React. It empowers me to quickly mock up websites that used to take weeks in the span of a few hours.",
    image: (
      <svg viewBox="0 0 24 24" className="aspect-square h-10 fill-white py-1">
        <title>Next.js</title>
        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"></path>
      </svg>
    ),
  },
  {
    title: "Prisma",
    description:
      "Prisma is an ORM for Typescipt that works with most SQL databases and MongoDB. It is a great tool for quickly connecting to databases and preforming queries with typesafety guaranteed.",
    image: (
      <svg viewBox="0 0 24 24" className="h-10 fill-white py-1">
        <title>Prisma</title>
        <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z"></path>
      </svg>
    ),
  },
  {
    title: "Tailwind CSS",
    description:
      "Tailwind CSS is a css framework that allows you to quickly and effectively style a webpage. It lets me enter a flow state and focus on the logic of the application instead of the styling.",
    image: (
      <svg viewBox="0 0 24 24" className="aspect-square h-10 fill-[#06B6D4] py-1">
        <title>Tailwind CSS</title>
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"></path>
      </svg>
    ),
  },
  {
    title: "NextAuth",
    description:
      "It provides a free drop-in authentication solution for Next.js. Can be set up to work with databases, web tokens and practically any OAuth provider. All the complexity is handled by default.",
    image: <Image src="/nextauth.webp" width={32} height={35} alt={"NextAuth"} />,
  },
  {
    title: "TypeScript",
    description:
      "Typescript is a superset of JavaScript that adds static typing to the language. I use it in conjunction with tRPC to build my APIs or with generics to build typesafe libraries.",
    image: (
      <svg viewBox="0 0 512 512" className="aspect-square h-10 py-1">
        <title>TypeScript</title>
        <rect width="512" height="512" rx="50" fill="#3178c6"></rect>
        <path
          d="m317 407v50c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4 11-2.3 20-6.1 28-11 8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9-5.2-2.6-9.7-5.2-13-7.8-3.7-2.7-6.5-5.5-8.5-8.4-2-3-3-6.3-3-10 0-3.4 0.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6 4.7-1.1 9.9-1.6 16-1.6 4.2 0 8.6 0.31 13 0.94 4.6 0.63 9.3 1.6 14 2.9 4.7 1.3 9.3 2.9 14 4.9 4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21-4.7 8.4-7 18-7 30 0 15 4.3 28 13 38 8.6 11 22 19 39 27 6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5 2.5 3.4 3.8 7.4 3.8 12 0 3.2-0.78 6.2-2.3 9s-3.9 5.2-7.1 7.2-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7-11 0-22-1.9-32-5.7-11-3.8-21-9.5-30-17zm-84-123h64v-41h-179v41h64v183h51z"
          clipRule="evenodd"
          fill="#fff"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    title: "tRPC",
    description:
      "tRPC connects your frontend logic to your backend logic by providing type inference and a unified API for both. Iterations are done with ease and without any fear of breaking the frontend.",
    image: (
      <svg viewBox="0 0 512 512" className="aspect-square h-10 fill-[#398CCB] py-1">
        <title>tRPC</title>
        <rect width="512" height="512" rx="150" fill="#398CCB"></rect>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M255.446 75L326.523 116.008V138.556L412.554 188.238V273.224L435.631 286.546V368.608L364.6 409.615L333.065 391.378L256.392 435.646L180.178 391.634L149.085 409.615L78.0538 368.538V286.546L100.231 273.743V188.238L184.415 139.638L184.462 139.636V116.008L255.446 75ZM326.523 159.879V198.023L255.492 239.031L184.462 198.023V160.936L184.415 160.938L118.692 198.9V263.084L149.085 245.538L220.115 286.546V368.538L198.626 380.965L256.392 414.323L314.618 380.712L293.569 368.538V286.546L364.6 245.538L394.092 262.565V198.9L326.523 159.879ZM312.031 357.969V307.915L355.369 332.931V382.985L312.031 357.969ZM417.169 307.846L373.831 332.862V382.985L417.169 357.9V307.846ZM96.5154 357.9V307.846L139.854 332.862V382.915L96.5154 357.9ZM201.654 307.846L158.315 332.862V382.915L201.654 357.9V307.846ZM321.262 291.923L364.6 266.908L407.938 291.923L364.6 316.962L321.262 291.923ZM149.085 266.838L105.746 291.923L149.085 316.892L192.423 291.923L149.085 266.838ZM202.923 187.362V137.308L246.215 162.346V212.377L202.923 187.362ZM308.015 137.308L264.723 162.346V212.354L308.015 187.362V137.308ZM212.154 121.338L255.446 96.3231L298.785 121.338L255.446 146.354L212.154 121.338Z"
          fill="white"
        ></path>
      </svg>
    ),
  },
  {
    title: "PlanetScale",
    description:
      "PlanetScale is a MySQL compatable, database-as-a-service that makes it easy to host a website with a database that scales with your traffic. It&apos;s serverless and has an extremely generous free tier.",
    image: (
      <svg className="aspect-square h-10 py-1" viewBox="0 0 40 40" fill="none">
        <title>PlanetScale</title>
        <path
          d="M0 20C9.40317e-07 8.95427 8.95427 -9.40317e-07 20 0C28.1214 7.09998e-07 35.1122 4.84073 38.2446 11.7943L11.7943 38.2446C10.6593 37.7333 9.58053 37.1191 8.5699 36.4141L24.984 20H20L5.85787 34.1421C2.23858 30.5228 -4.82823e-07 25.5228 0 20Z"
          fill="currentColor"
        ></path>
        <path d="M39.999 20.0065L20.0059 39.9996C31.0461 39.9959 39.9953 31.0468 39.999 20.0065Z" fill="currentColor"></path>
      </svg>
    ),
  },
  {
    title: "Vercel",
    description:
      "Vercel is a hosting platform that makes deploying an application to the web as simple as connecting GitHub to the project. Automatic deployments for your fullstack application gets done in about a minute.",
    image: (
      <svg className="aspect-square h-10 w-8 py-1" width="76" height="65" viewBox="0 0 76 65" fill="none">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
      </svg>
    ),
  },
  {
    title: "Solid.js",
    description:
      "Solid.js is a fontend framework with APIs similar to React.js but with major speed and quality of life improvements. I generally prefer using Solid if I&apos;m not using Next.js.",
    image: (
      <svg className="aspect-square h-10 fill-[#398CCB] py-1" viewBox="0 0 166 155.3">
        <title>Solid.js</title>
        <path d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z" fill="#76b3e1" />
        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="27.5" y1="3" x2="152" y2="63.5">
          <stop offset=".1" stopColor="#76b3e1" />
          <stop offset=".3" stopColor="#dcf2fd" />
          <stop offset="1" stopColor="#76b3e1" />
        </linearGradient>
        <path d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z" opacity=".3" fill="url(#a)" />
        <path d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z" fill="#518ac8" />
        <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="95.8" y1="32.6" x2="74" y2="105.2">
          <stop offset="0" stopColor="#76b3e1" />
          <stop offset=".5" stopColor="#4377bb" />
          <stop offset="1" stopColor="#1f3b77" />
        </linearGradient>
        <path d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z" opacity=".3" fill="url(#b)" />
        <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="18.4" y1="64.2" x2="144.3" y2="149.8">
          <stop offset="0" stopColor="#315aa9" />
          <stop offset=".5" stopColor="#518ac8" />
          <stop offset="1" stopColor="#315aa9" />
        </linearGradient>
        <path d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z" fill="url(#c)" />
        <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="75.2" y1="74.5" x2="24.4" y2="260.8">
          <stop offset="0" stopColor="#4377bb" />
          <stop offset=".5" stopColor="#1a336b" />
          <stop offset="1" stopColor="#1a336b" />
        </linearGradient>
        <path d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z" fill="url(#d)" />
      </svg>
    ),
  },
];

export default GridTiles;
