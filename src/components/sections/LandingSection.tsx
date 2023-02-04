import Link from "next/link";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "phosphor-react";
import { useEffect, useState, forwardRef } from "react";

const MAX_LINES_OF_CODE = 83135;
const MAX_PROJECTS = 29;

const NXIValue = (currentValue: number, maxValue: number, iterationMax: number, divisor: number) =>
  currentValue + Math.min(iterationMax, (maxValue - currentValue) / divisor);

interface LandingSectionProps {
  maxLinesOfCode?: number;
  maxNumProjects?: number;
}

const LandingSection = forwardRef<HTMLElement, LandingSectionProps>(({ maxLinesOfCode, maxNumProjects }, ref) => {
  const [stopAnimation, setStopAnimation] = useState(false);
  const [timeBetweenInterval, setTimeBetweenInterval] = useState(10);
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [projects, setProjects] = useState(0);

  const maxLines = maxLinesOfCode || MAX_LINES_OF_CODE;
  const maxProjects = maxNumProjects || MAX_PROJECTS;

  useEffect(() => {
    if (stopAnimation) return;

    const interval = setInterval(() => {
      if (linesOfCode < maxLines) setLinesOfCode(NXIValue(linesOfCode, maxLines, 3689, 5));
      if (projects < maxProjects) setProjects(NXIValue(projects, maxProjects, 1, 12));

      setTimeBetweenInterval(timeBetweenInterval + 1);

      if (Math.round(linesOfCode) === maxLines) setStopAnimation(true);
    }, timeBetweenInterval);

    return () => clearInterval(interval);
  }, [linesOfCode, maxLines, maxProjects, projects, stopAnimation, timeBetweenInterval]);

  return (
    <article className="relative z-20 mx-auto my-28 max-w-7xl text-center" ref={ref}>
      <div className="absolute top-32 left-8 z-10 space-y-2 rounded-md border border-main-border bg-main-medium p-8 text-left font-medium">
        <span className="uppercase text-main-light">Lines of code</span>
        <div className="flex gap-4">
          {/* format the lines of code with a seperator on the thousants */}
          <span className="text-4xl font-bold text-white">{Math.round(linesOfCode).toLocaleString()}</span>
          <div className="h-max rounded-full bg-info-dark px-2">
            <span className="uppercase text-info-light">Private</span>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-12 z-10 space-y-2 rounded-md border border-main-border bg-main-medium p-8 text-left font-medium">
        <span className="uppercase text-main-light">Projects</span>
        <div className="flex gap-4">
          <span className="text-4xl font-bold text-white">{Math.round(projects).toLocaleString()}</span>
          <div className="h-max rounded-full bg-warning-dark px-2">
            <span className="uppercase text-warning-light">Published</span>
          </div>
        </div>
      </div>
      <svg width="400" height="300" viewBox="0 0 100 100" fill="none" className="absolute top-36 left-12">
        <path
          d="M0.5 0.50123C55.0557 0.769652 99.2303 44.9443 99.4988 99.5H50.4971C50.3992 91.0927 47.8315 78.7714 40.4058 68.4578C32.876 57.9999 20.3724 49.6397 0.5 49.5017V0.50123Z"
          stroke="url(#linear-gradient)"
        />
        <defs>
          <linearGradient id="linear-gradient" x1="0" y1="100" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0.0383121" stopColor="#5ABDDE" stopOpacity="0" />
            <stop offset="0.572917" stopColor="#5ABDDE" />
          </linearGradient>
        </defs>
      </svg>

      <svg width="280" height="300" viewBox="0 0 103 103" fill="none" className="absolute right-12">
        <path d="M101 102L1 2V102H101Z" stroke="url(#linear-gradient-2)" />
        <defs>
          <linearGradient id="linear-gradient-2" x1="1" y1="102" x2="101" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C4852A" />
            <stop offset="1" stopColor="#C4852A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-sm space-y-6">
        <h1 className="font-semibold uppercase text-info-light">Hello, I&apos;m Dirk Stoffberg</h1>
        <h2 className="text-5xl font-bold text-white">Turn your ideas into reality.</h2>
        <p className="text-main-light">A central place for all my projects, ideas and thoughts. Contact me for business inquiries.</p>
        <div className="grid grid-cols-2 gap-4 font-medium">
          <button className="rounded-full bg-accent-light py-2 px-6 tracking-tight text-white hover:bg-accent-dark">Contact Me</button>
          <button className="rounded-full bg-main-medium p-2 tracking-tight text-white hover:bg-main-border">Read Further</button>
        </div>
      </div>
      <div className="ml-auto mt-24 grid w-7/12 grid-cols-3 gap-4 pr-12">
        <Link
          href="https://github.com/Stoffberg"
          className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white"
        >
          <GithubLogo className="my-auto mr-4 h-5 w-5" />
          <span>GitHub</span>
        </Link>
        <Link
          href="https://www.instagram.com/dirksbeukes"
          className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white"
        >
          <InstagramLogo className="my-auto mr-4 h-5 w-5" />
          <span>Instagram</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/dirk-beukes-445387230"
          className="flex items-center rounded-md border border-main-border bg-main-medium p-2 text-left font-medium text-white"
        >
          <LinkedinLogo className="my-auto mr-4 h-5 w-5" />
          <span>LinkedIn</span>
        </Link>
      </div>
    </article>
  );
});
LandingSection.displayName = "LandingSection";

export default LandingSection;
