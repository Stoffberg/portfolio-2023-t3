interface GridTile {
  title: string;
  image: JSX.Element;
  description: string;
  accent?: boolean;
}

interface GridSectionProps {
  title: string;
  subtitle?: string;
  gridTiles: GridTile[];
  gridCols: number;
}

const GridSection = ({ title, subtitle, gridCols, gridTiles }: GridSectionProps) => {
  const gridColsClass = `repeat(${gridCols}, minmax(0, 1fr))`;
  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="mt-16 mb-4 text-center text-3xl sm:text-4xl font-bold text-white">{title}</h1>
      <p className="mb-8 text-center text-main-light">{subtitle}</p>
      <div className="relative flex flex-col md:grid gap-8 px-4" style={{ gridTemplateColumns: gridColsClass }}>
        {gridTiles.map((tile, tileIndex) => (
          <div className={`z-10 flex-col ${(tileIndex + 1) % 2 === 0 ? "hidden md:flex" : "flex"}`} key={tile.title}>
            <div className={`flex items-center gap-4 rounded-t-md border ${tile.accent ? "lg:border-main-light border-main-border" : "border-main-border"} bg-main-border px-4 py-2`}>
              {tile.image}
              <p className="text-xl font-medium text-white">{tile.title}</p>
            </div>
            <div className={`grow rounded-b-md border-x border-b ${tile.accent ? "lg:border-main-light border-main-border" : "border-main-border"} bg-main-medium p-4`}>
              <p className="text-main-light">{tile.description}</p>
            </div>
          </div>
        ))}
        <svg width="350" height="350" viewBox="0 0 100 100" className="absolute -top-20 -right-16 rotate-90 hidden lg:block">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M99 1H1V99H20V21V20H21H99V1ZM40 99H21V21H99V40H41H40V41V99ZM41 99H99V41H41V99ZM40 100H21H20H1H0V99V1V0H1H99H100V1V20V21V40V41V99V100H99H41H40Z"
            fill="url(#paint0_linear_129_6)"
          />
          <defs>
            <linearGradient id="paint0_linear_129_6" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5BBEDF" />
              <stop offset="0.583333" stopColor="#5BBEDF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg width="350" height="350" viewBox="0 0 100 100" className="absolute -bottom-20 -left-16 -rotate-90 hidden lg:block">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M99 1H1V99H20V21V20H21H99V1ZM40 99H21V21H99V40H41H40V41V99ZM41 99H99V41H41V99ZM40 100H21H20H1H0V99V1V0H1H99H100V1V20V21V40V41V99V100H99H41H40Z"
            fill="url(#paint0_linear_129_6)"
          />
          <defs>
            <linearGradient id="paint0_linear_129_6" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5138EE" />
              <stop offset="0.583333" stopColor="#5138EE" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default GridSection;
