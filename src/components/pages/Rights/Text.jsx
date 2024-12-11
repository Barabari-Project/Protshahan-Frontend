import React, { useState, useEffect, useRef } from "react";

const TimelineScroller = () => {
  const years = [2000, 2005, 2010, 2015, 2020]; // Sample years
  const [highlightedYear, setHighlightedYear] = useState(null);
  const yearRefs = useRef([]);

  const handleScroll = () => {
    yearRefs.current.forEach((ref, index) => {
      const rect = ref.getBoundingClientRect();

      // Highlight the active year on the left scroller
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        setHighlightedYear(years[index]);
      }

      // For the text size and position animation on scroll (right-side text only)
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        const scrollProgress = Math.min(
          1,
          Math.max(0, (window.scrollY - rect.top) / rect.height)
        );

        // Font size animation
        ref.querySelector("h2").style.fontSize = `${Math.max(20, 20 + scrollProgress * 40)}px`;

        // Position animation: move the text down and stop at the bottom
        const translateY = Math.min(scrollProgress, 1) * window.innerHeight * 0.4; // Adjust the distance the text moves
        ref.querySelector("h2").style.transform = `translateY(${translateY}px)`;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Scroller */}
      <div className="sticky top-0 w-1/4 h-full bg-gray-100 p-4">
        {years.map((year) => (
          <div
            key={year}
            className={`text-lg p-2 mb-4 transition-all ${
              highlightedYear === year
                ? "text-purple-600 font-bold scale-125"
                : "text-gray-600"
            }`}
          >
            {year}
          </div>
        ))}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 space-y-16">
        {years.map((year, index) => (
          <div
            key={year}
            ref={(el) => (yearRefs.current[index] = el)}
            className="border rounded-md p-6 shadow-lg bg-white flex"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 transition-all duration-300">
                {year}
              </h2>
            </div>
            <div>
              <p className="mt-4 text-gray-600">
                This is some content for the year {year}. Scroll to see more years
                and their content. Notice how the left-side year scroller updates
                and highlights the active year.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineScroller;
