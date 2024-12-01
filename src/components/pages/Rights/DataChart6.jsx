<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

<<<<<<< HEAD
import IncomeIssuesJson from "../json/rights/Data.json"; // Replace with the correct path

const DataChart6 = () => {
  const [isBarVisible, setBarVisible] = useState(false);
  const [isDoughnutVisible, setDoughnutVisible] = useState(false);

  const barRef = useRef(null);
  const doughnutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === barRef.current && entry.isIntersecting) {
            setBarVisible(true);
          }
          if (entry.target === doughnutRef.current && entry.isIntersecting) {
            setDoughnutVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (barRef.current) observer.observe(barRef.current);
    if (doughnutRef.current) observer.observe(doughnutRef.current);

    return () => {
      if (barRef.current) observer.unobserve(barRef.current);
      if (doughnutRef.current) observer.unobserve(doughnutRef.current);
    };
  }, []);

=======
// Importing data
// import dataJson from "../json/beat.json"; // Replace with the correct path
import IncomeIssuesJson from "../json/rights/Data.json"; // Replace with the correct path

const DataChart6 = () => {
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
  // Lost Parent Chart Data Processing
  const lostParentData = Array.isArray(IncomeIssuesJson?.has_lost_parent)
    ? IncomeIssuesJson.has_lost_parent
    : [];

  const lostParentPercentage = lostParentData.map((item) => {
    const lostParentCount = item?.has_lost_a_parent || 0;
    const totalAttended = item?.total_attended || 1; // Avoid division by zero
    return ((lostParentCount / totalAttended) * 100).toFixed(2);
  });

  const lostParentChartData = {
    labels: lostParentData.map((item) => item?.Salary || "Unknown"),
    datasets: [
      {
        label: "Lost A Parent Percentage (%)",
<<<<<<< HEAD
        data: isDoughnutVisible ? lostParentPercentage : [], // Animate on visibility
=======
        data: lostParentPercentage,
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        backgroundColor: ["rgb(224, 70, 31)", "rgb(101, 25, 11)"],
        borderWidth: 1,
      },
    ],
  };

  const lostParentOptions = {
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
      },
      title: {
        display: true,
        text: "Percentage of People Who Have Lost A Parent by Salary",
        color: "#2D3748",
        font: {
          size: 16,
        },
      },
<<<<<<< HEAD
    },
  };

  const [barChartData, setBarChartData] = useState({});
=======
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = lostParentData[index]?.Salary || "Unknown";
            const total = lostParentData[index]?.total_attended || 0;
            const percentage = lostParentPercentage[index];
            return `${salary}: ${percentage}% (${total} responses)`;
          },
        },
      },
    },
  };

  // Rented Chart Data Processing
  const [chartData, setChartData] = useState({});
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6

  useEffect(() => {
    const rentedData = IncomeIssuesJson?.rented_people;

    if (rentedData) {
      const chartData = {
        labels: Object.keys(rentedData),
        datasets: [
          {
            label: "Count of People",
<<<<<<< HEAD
            data: isBarVisible
              ? Object.values(rentedData).map((item) => item.count || 0)
              : [], // Animate on visibility
=======
            data: Object.values(rentedData).map((item) => item.count || 0),
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
            backgroundColor: [
              "rgb(224, 70, 31)", // Color 1
              "rgb(101, 25, 11)", // Color 2
            ],
            borderWidth: 1,
          },
        ],
      };
<<<<<<< HEAD
      setBarChartData(chartData);
    } else {
      console.error("Data for 'rented_people' not found.");
    }
  }, [isBarVisible]);
=======
      setChartData(chartData);
    } else {
      console.error("Data for 'rented_people' not found.");
    }
  }, []);
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
<<<<<<< HEAD
    },
    scales: {
      y: {
        beginAtZero: true,
=======

      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex; // Index of the hovered bar
            const label = tooltipItem.label; // Label ("Yes" or "No")
            const percentage =
              IncomeIssuesJson.rented_people[label]?.percentage || 0; // Get percentage from the JSON
            const count = tooltipItem.raw; // Get the count value
            return `Percentage: ${percentage}%, Count: ${count}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,

>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        title: {
          display: true,
          text: "Percentage of People (%)",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
<<<<<<< HEAD
        grid:{
          display:false
        }
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
      x: {
        title: {
          display: true,
          text: "Responses",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
<<<<<<< HEAD
        grid:{
          display:false
        }
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
    },
  };

<<<<<<< HEAD
  return (
    <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      {/* Bar Chart */}
      <div
        ref={barRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Rented People Count
        </h2>
        {Object.keys(barChartData).length ? (
          <div className="w-full max-md:h-[54vh] h-full">
            <Bar data={barChartData} options={options} />
=======
  // Render Charts
  return (
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Rented People Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Rented People Count
        </h2>
        {Object.keys(chartData).length ? (
          <div className="w-full max-md:h-[54vh] h-full">
            <Bar data={chartData} options={options} />
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
          </div>
        ) : (
          <p>No data available for rented people.</p>
        )}
      </div>
<<<<<<< HEAD

      {/* Doughnut Chart */}
      <div
        ref={doughnutRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
=======
      {/* Lost Parent Doughnut Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Salary Analysis - Lost A Parent Percentage
        </h2>
        {lostParentData.length ? (
          <div className="w-full max-md:h-[54vh] h-full">
            <Doughnut data={lostParentChartData} options={lostParentOptions} />
          </div>
        ) : (
          <p>No data available for lost parent chart.</p>
        )}
      </div>
    </div>
  );
};

export default DataChart6;
