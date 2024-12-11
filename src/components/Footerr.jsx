
import React, { useEffect, useState } from "react";
const journeyData = {
  2022: [
    "Swaracha School delivers a 100% pass result for the 8th consecutive year.",
    "Swarachna School bags the highest number of medals in the District Athletic Meet.",
    "The organisation’s efforts to fight against COVID-19 help 2 lakh people receive the vaccine.",
    "With 1,800 Girl Icons and 35,163 adolescent girls, Milaan begins implementation of phase 1 of the 3-year strategy of the Girl Icon Program.",
  ],
  2021: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  2020: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  2019: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  2018: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  2017: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  2016: [
    "Milaan starts a free-of-cost hostel for 120 girls impacted by COVID-19.",
    "The organisation partners with 17 community health centres in Sitapur and its women health workers to support the fight against COVID-19 in vulnerable and remote communities.",
    "The Girl Icon Program scales 5x in three states of India - Uttar Pradesh, Madhya Pradesh, and Karnataka.",
    "Milaan lays down a 3-year strategy for the Girl Icon Program to work with 100,000 adolescent girls by 2025.",
    "The organisation commissions primary and secondary research to address violence against women and girls in public spaces in rural Uttar Pradesh.",
  ],
  // Repeat similarly for other years if needed
};



const OurJourney = () => {
  const [activeYear, setActiveYear] = useState("2022");

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('div[id^="year-"]');
      const scrollPos =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPos + 100 &&
          section.offsetTop + section.offsetHeight > scrollPos + 100
        ) {
          setActiveYear(section.id.split("-")[1]);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Our Journey</h1>
      <div className="flex">
        {/* Left Scaler */}
        <div className="w-[8%] pr-4 relative">
          <ul
            className="text-sm leading-10 sticky top-1/2 transform -translate-y-1/2"
            id="year-list"
          >
            {Object.keys(journeyData).map((year) => (
              <li key={year} className="mb-2">
                <a
                  href={`#year-${year}`}
                  className={`year-link flex items-center space-x-2 ${
                    activeYear === year ? "font-bold text-purple-700" : ""
                  }`}
                >
                  {/* Dot before year */}
                  <span
                    className={`inline-block rounded-full bg-purple-700 mr-2 transition-all duration-300 ${
                      activeYear === year ? "w-28 h-4" : "w-2 h-2"
                    }`}
                  ></span>
                  <span
                    className={`transition-all duration-300 ${
                      activeYear === year ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {year}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-5/6">
          {Object.keys(journeyData).map((year) => (
            <div
              key={year}
              id={`year-${year}`}
              className={`ml-8 py-6 ${
                activeYear === year ? "" : ""
              }`}
            >
              <div className="flex gap-5">
                {/* Sticky Year */}
                <div className="w-1/4">
                  <h2
                    className={`font-bold text-purple-700 sticky top-20 transition-all duration-300 ${
                      activeYear === year ? "text-[3rem]" : "text-lg"
                    }`}
                  >
                    {year}
                  </h2>
                </div>

                {/* Paragraph List */}
                <div className="w-3/4 border-b-2 border-b-blue-700 pb-5">
                  <ul className="list-disc pl-5">
                    {journeyData[year].map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurJourney;
