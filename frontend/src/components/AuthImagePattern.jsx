const AuthImagePattern = ({
  title,
  subtitle,
  gridSize = 9,
}) => {
  //////////////////////////////////////////////////////
  // Generate Pattern
  //////////////////////////////////////////////////////

  const pattern = Array.from({ length: gridSize });

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <section className="hidden lg:flex flex-1 items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">

        {/* Animated Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-10">

          {pattern.map((_, index) => (
            <div
              key={index}
              className={`
                aspect-square rounded-2xl
                transition-all duration-700
                bg-primary/10
                hover:bg-primary/20
                hover:scale-105
                ${
                  index % 2 === 0
                    ? "animate-pulse"
                    : ""
                }
              `}
            />
          ))}

        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-base leading-7 text-base-content/70">
          {subtitle}
        </p>

      </div>
    </section>
  );
};

export default AuthImagePattern;