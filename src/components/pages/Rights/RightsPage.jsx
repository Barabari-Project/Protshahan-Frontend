import React, { useState, useEffect, useRef } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CounterSection from "./CounterSection";
import DataChart3 from "./DataChart3";
import IndiaMap from "./IndiaMap";
import occupationsData from "../json/rights/Data.json";
// import GovtLinkage from "../Education/DataChart2";
import DataChart4 from "./DataChart4";
import DataChart5 from "./DataChart5";
import DataChart6 from "./DataChart6";
import DataChart2 from "./DataChart2";
import DataChart7 from "./DataChart7";
import TextScroll from "./Text";
import TimelineScroller from "./Text";

ChartJS.register(ArcElement, Tooltip, Legend);

const Rights = () => {
  const [selectedData, setSelectedData] = useState("gender");

  // Destructure the data with a fallback to empty objects or default values
  const {
    "4-9 Years": fourToNine = { count: 0, percentage: 0 },
    "10-19 Years": tenToNineteen = { count: 0, percentage: 0 },
    "20-29 Years": twentyToTwentyNine = { count: 0, percentage: 0 },
    total_people: { all: total = 0 } = {}, // Destructure `total_people` correctly
  } = occupationsData;

  // Data for the chart
  const data = {
    labels: ["4-9 Years", "10-19 Years", "20-29 Years"],
    datasets: [
      {
        label: "Age Distribution",
        data: [fourToNine.count, tenToNineteen.count, twentyToTwentyNine.count], // Updated to use correct values
        backgroundColor: ["#3c3950", "#ce441a", "#919191"], // Colors for each section
      },
    ],
  };

  const ageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const currentValue = tooltipItem.raw;
            // Ensure the total value is valid before dividing
            const percentage =
              total > 0 ? ((currentValue / total) * 100).toFixed(2) : 0;
            return `${currentValue} people (${percentage}%) from the total ${total} people`;
          },
        },
      },
    },
  };

  const [professionData, setProfessionData] = useState(null);

  useEffect(() => {
    const employmentData =
      occupationsData?.parent_profession?.employment_data || [];
    const totalCount = occupationsData?.parent_profession?.total_count || 1;

    const flattenedData = employmentData.flatMap((item) => {
      if (item.category === "Organised Sector" && item.details) {
        return item.details.map((detail) => ({
          category: `${item.category} - ${detail.role}`,
          count: detail.count,
        }));
      }
      return { category: item.category, count: item.count };
    });

    const finalData = flattenedData.map((item) => ({
      category: item.category,
      count: item.count,
      percentage: (item.count / totalCount) * 100,
    }));

    const filteredData = finalData.filter((item) => item.count >= 5);

    setProfessionData({
      labels: filteredData.map((item) => item.category),
      datasets: [
        {
          label: "Profession Percentage",
          color: "#e8461e",
          data: filteredData.map((item) => item.percentage),
          backgroundColor: [
            "rgb(224, 70, 31)",
            "rgb(101, 25, 11)",
            "rgb(134, 37, 15)",
            "rgb(223, 107, 79)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const professionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const percentage = professionData.datasets[0].data[index];
            return `${tooltipItem.dataset.label}: ${percentage.toFixed(
              2
            )}% from the total [${occupationsData.parent_profession.total_count}]`;
          },
        },
      },
    },
  };

  // Animation section
  const [isDoughnutVisible, setDoughnutVisible] = useState(false);
  const [isPieVisible, setPieVisible] = useState(false);

  const doughnutRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === doughnutRef.current && entry.isIntersecting) {
            setDoughnutVisible(true);
          }
          if (entry.target === pieRef.current && entry.isIntersecting) {
            setPieVisible(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger animation when 30% of the chart is visible
    );

    if (doughnutRef.current) observer.observe(doughnutRef.current);
    if (pieRef.current) observer.observe(pieRef.current);

    return () => {
      if (doughnutRef.current) observer.unobserve(doughnutRef.current);
      if (pieRef.current) observer.unobserve(pieRef.current);
    };
  }, []);

  return (
    <div className="bg-[#3c3950] min-h-screen font-lato">
      <div className="bg-[#212331] text-white py-8 px-4 max-md:px-0 ">
        <div className="flex text-2xl md:text-4xl p-4">
          <h1 className="text-yellow-400">
            Protsahan - For a Better Future | Data Visualization
          </h1>
        </div>
        <div className="bg-[#3c3950] rounded-lg shadow-lg pt-4">
          <div className="border-[2px] border-dashed border-white rounded-md p-5 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              <div className="text-white">
                <span className="text-[#e8461e] mr-2">Timeline:</span>
                Child entering Protsahan
              </div>
              <div className="flex flex-wrap justify-center">
                <p className="text-white text-center">
                  <span className="text-[#e8461e] mr-2">
                    Potential Consumers:
                  </span>
                  Protsahan Executive Team | Governmental Bodies
                </p>
              </div>
            </div>
            <div className="text-center p-4 text-white">
              <p>
                These set of data visualisations paints a story of the enrolment
                data of students on a specified date range/month/year. It tells
                the user how many children have enrolled in Protsahan, basic
                data related to the pool of children, etc.
              </p>
            </div>
          </div>
          <CounterSection />
          <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
            {/* Doughnut Chart */}
            <div
              ref={doughnutRef}
              className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
            >
              <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
                Age: 4-29 Years Boys & Girls
              </h2>
              <div className="w-full max-md:h-[54vh] h-full">
                {isDoughnutVisible && <Doughnut data={data} options={ageOptions} />}
              </div>
            </div>

            {/* Pie Chart */}
            <div
              ref={pieRef}
              className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
            >
              <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
                Profession Percentage Data
              </h2>
              <div className="w-full max-md:h-[54vh] h-full">
                {isPieVisible && (
                  <Pie data={professionData} options={professionOptions} />
                )}
              </div>
            </div>
          </div>

          <div className="p-6 m-4 bg-[#3c3950]">
            <IndiaMap />
          </div>

          <div className="py-4 text-center m-6">
            <DataChart2 />
          </div>
          <div className="py-4 text-center m-6">
            <DataChart3 />
          </div>
          <div className="py-4 text-center m-6">
            <DataChart4 />
          </div>
          <div className="py-4 text-center m-6">
            <DataChart5 />
          </div>
          <div className="py-4 text-center m-6">
            <DataChart6 />
          </div>
          <div className="py-4 text-center m-6">
            <DataChart7 />
          </div>
          <div className="py-4 text-center m-6">
          <TimelineScroller/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Rights;
