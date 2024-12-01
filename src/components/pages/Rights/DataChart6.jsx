import React, { useState, useEffect, useRef } from "react";
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
        data: isDoughnutVisible ? lostParentPercentage : [], // Animate on visibility
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
    },
  };

  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    const rentedData = IncomeIssuesJson?.rented_people;

    if (rentedData) {
      const chartData = {
        labels: Object.keys(rentedData),
        datasets: [
          {
            label: "Count of People",
            data: isBarVisible
              ? Object.values(rentedData).map((item) => item.count || 0)
              : [], // Animate on visibility
            backgroundColor: [
              "rgb(224, 70, 31)", // Color 1
              "rgb(101, 25, 11)", // Color 2
            ],
            borderWidth: 1,
          },
        ],
      };
      setBarChartData(chartData);
    } else {
      console.error("Data for 'rented_people' not found.");
    }
  }, [isBarVisible]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage of People (%)",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
        grid:{
          display:false
        }
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
        grid:{
          display:false
        }
      },
    },
  };

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
          </div>
        ) : (
          <p>No data available for rented people.</p>
        )}
      </div>

      {/* Doughnut Chart */}
      <div
        ref={doughnutRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
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
