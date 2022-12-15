import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("../Terminal"), { ssr: false });

interface AboutSectionProps {
  subtitle?: string;
  title: string;
  description: string[];
}

const AboutSection = ({ description, title, subtitle }: AboutSectionProps) => {
  return (
    <section className="mx-auto mt-28 grid max-w-7xl grid-cols-3 gap-8 rounded-md p-4">
      <div>
        <h1 className="font-semibold uppercase text-info-light">{subtitle}</h1>
        <h2 className="mb-4 text-4xl font-bold text-white">{title}</h2>
        <div className="space-y-4">
          {description.map((paragraph) => (
            <p key={paragraph} className="text-main-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <Terminal className="col-span-2" />
    </section>
  );
};

export default AboutSection;
