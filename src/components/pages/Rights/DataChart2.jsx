<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";

// Register necessary components
ChartJS.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

// Import JSON data
import scholarshipData from "../json/rights/Data.json";

const DataChart2 = () => {
  const [chartData, setChartData] = useState(null);
  const [supportRequestData, setSupportRequestData] = useState(null);
<<<<<<< HEAD
  const [isLineVisible, setLineVisible] = useState(false);
  const [isDoughnutVisible, setDoughnutVisible] = useState(false);

  const lineRef = useRef(null);
  const doughnutRef = useRef(null);

  // Setup Line Chart Data
  useEffect(() => {
=======

  useEffect(() => {
    // Extracting labels and data from the JSON
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    const categories = Object.keys(scholarshipData.categories_of_scholarship);
    const percentages = Object.values(
      scholarshipData.categories_of_scholarship
    ).map((item) => item.percentage);

<<<<<<< HEAD
=======
    // Setting up data for the line chart
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Scholarship Percentage",
          data: percentages,
          borderColor: "#e8461e",
<<<<<<< HEAD
          backgroundColor: "rgba(224, 70, 31, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#212331",
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#e8461e",
          pointHoverBorderWidth: 2,
=======
          backgroundColor: "red",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#212331",
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        },
      ],
    });
  }, []);

<<<<<<< HEAD
  // Setup Doughnut Chart Data
  useEffect(() => {
    const supportTypes = scholarshipData.support_request.support_types;
    const labels = supportTypes.map((item) => item.type);
    const data = supportTypes.map((item) => item.percentage_of_total);

    setSupportRequestData({
      labels: labels,
      datasets: [
        {
          label: "Support Request Distribution",
          data: data,
          backgroundColor: [
            "rgb(224, 70, 31)",
            "rgb(101, 25, 11)",
            "gray",
            "rgb(134, 37, 15)",
            "rgb(50, 105, 170)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

=======
  const options = {
    responsive: true,
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
<<<<<<< HEAD
          label: (tooltipItem) => {
=======
          label: function (tooltipItem) {
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total 628`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage (%)",
          color: "#e8461e",
        },
      },
      x: {
        title: {
          display: true,
          text: "Scholarship Category",
        },
      },
    },
<<<<<<< HEAD
    animation: {
      duration: 2000, // 2-second animation
      easing: "easeInOutQuart", // Smooth easing
    },
  };

  const doughnutChartOptions = {
=======
  };

  // Set up support chart data
  useEffect(() => {
    // Extract support types and their percentages from the imported data
    const supportTypes = scholarshipData.support_request.support_types;
    const labels = supportTypes.map((item) => item.type);
    const data = supportTypes.map((item) => item.percentage_of_total);

    setSupportRequestData({
      labels: labels,
      datasets: [
        {
          label: "Support Request Distribution",
          data: data,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "gray", // Color 4
            "rgb(134, 37, 15)", // Color 3
            "rgb(50, 105, 170)", // Color 5 // In Kind Scholarship Support
          ],

          borderWidth: 1,
        },
      ],
    });
  }, []);

  const supportRequestOptions = {
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 15,
          padding: 20,
          usePointStyle: true,
          color: "#e8461e",
        },
      },
      tooltip: {
        callbacks: {
<<<<<<< HEAD
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${scholarshipData.support_request.total_entries}`;
=======
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${scholarshipData.support_request.total_entries}`; // Show percentage in tooltip
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
          },
        },
      },
    },
<<<<<<< HEAD
    animation: {
      duration: 1500, // 1.5-second animation
      easing: "easeOutBounce", // Bouncy easing
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === lineRef.current && entry.isIntersecting) {
            setLineVisible(true);
          }
          if (entry.target === doughnutRef.current && entry.isIntersecting) {
            setDoughnutVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (lineRef.current) observer.observe(lineRef.current);
    if (doughnutRef.current) observer.observe(doughnutRef.current);

    return () => {
      if (lineRef.current) observer.unobserve(lineRef.current);
      if (doughnutRef.current) observer.unobserve(doughnutRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col bg-[#dcdcdc] py-4">
      {/* Line Chart Section */}
      <div
        ref={lineRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="font-lato text-xl text-[#121331] mb-5 text-center font-semibold">
          Categories of Provided Scholarships by us
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {isLineVisible && chartData && (
            <Line data={chartData} options={lineChartOptions} />
          )}
        </div>
      </div>

      {/* Doughnut Chart Section */}
      <div
        ref={doughnutRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="font-lato text-xl text-[#121331] mb-5 text-center pt-3 font-semibold">
          Support Channels Breakdown
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {isDoughnutVisible && supportRequestData && (
            <Doughnut
              data={supportRequestData}
              options={doughnutChartOptions}
            />
          )}
        </div>
      </div>
    </div>
=======
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-3 max-md:flex-col bg-[#dcdcdc] py-4">
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-xl text-[#121331] mb-5 text-center font-semibold">
            Categories of Provided Scholarships by us
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            {chartData && <Line data={chartData} options={options} />}
          </div>
        </div>

        {/* Support Request Doughnut Chart */}
        <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
          <h2 className="font-lato text-xl text-[#121331] mb-5 text-center pt-3 font-semibold">
            Support Channels Breakdown
          </h2>
          <div className="w-full max-md:h-[54vh] h-full">
            {supportRequestData && (
              <Doughnut
                data={supportRequestData}
                options={supportRequestOptions}
              />
            )}
          </div>
        </div>
      </div>
    </>
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
  );
};

export default DataChart2;
