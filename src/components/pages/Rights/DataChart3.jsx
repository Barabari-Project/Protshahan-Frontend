import React, { useState, useRef, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import JsonData from "../json/rights/Data.json"; // Import the JSON data
import { useInView } from "react-intersection-observer";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DataChart3 = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [isIncomeVisible, setIncomeVisible] = useState(false);
  const incomeRef = useRef(null);

  const [animate, setAnimate] = useState(false);
  const { ref: genderRef, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) setAnimate(true);
    },
  });

  // Intersection Observer for income chart
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === incomeRef.current && entry.isIntersecting) {
            setIncomeVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (incomeRef.current) observer.observe(incomeRef.current);

    return () => {
      if (incomeRef.current) observer.unobserve(incomeRef.current);
    };
  }, []);

  // Prepare income distribution data
  useEffect(() => {
    const incomeDistribution = JsonData.monthly_income.income_distribution;
    const labels = incomeDistribution.map((item) => item.range);
    const data = incomeDistribution.map((item) => item.percentage_of_total);

    setIncomeData({
      labels: labels,
      datasets: [
        {
          label: "Income Distribution",
          data: isIncomeVisible ? data : [],
          backgroundColor: [
            "rgb(224, 70, 31)",
            "rgb(101, 25, 11)",
            "rgb(134, 37, 15)",
            "#121331",
            "gray",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [isIncomeVisible]);

  const incomeOptions = {
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
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.monthly_income.total_entries}`;
          },
        },
      },
    },
  };

  const genderData = {
    labels: JsonData.gender_distribution.map((item) => item.gender),
    datasets: [
      {
        label: "Number of People",
        data: JsonData.gender_distribution.map((item) => (animate ? item.count : 0)),
        backgroundColor: ["rgb(101, 25, 11)", "#e74c3c"],
        borderColor: ["#2980b9", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  const genderOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const genderData =
              JsonData.gender_distribution[tooltipItem.dataIndex];
            return `${tooltipItem.label}: ${genderData.percentage_of_total}% from the total ${JsonData.total}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Gender",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of People",
        },
      },
    },
    animation: {
      duration: animate ? 1000 : 0,
    },
  };

  // Customize plugins
  const plugins = [
    {
      id: "percentageLabels",
      afterDatasetsDraw(chart) {
        const { ctx, data } = chart;
        const datasets = chart.data.datasets[0].data;

        chart.getDatasetMeta(0).data.forEach((bar, index) => {
          const { x, y } = bar.tooltipPosition();
          const percentage = JsonData.gender_distribution[index].percentage_of_total; // Correct percentage value

          ctx.save();
          ctx.font = "bold 12px Arial";
          ctx.fillStyle = "#2D3748";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(`${percentage}%`, x, y - 5); // Display percentage above the bar
          ctx.restore();
        });
      },
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      {/* Doughnut Chart Section */}
      <div
        ref={incomeRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 py-6 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
          Income-Based Distribution of People
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {incomeData && <Doughnut data={incomeData} options={incomeOptions} />}
        </div>
      </div>

      {/* Gender Chart Section */}
      <div
        ref={genderRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="text-xl font-semibold text-[#121331] mb-4 text-center">
          Gender Distribution of People
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={genderData} options={genderOptions} plugins={plugins} />
        </div>
      </div>
    </div>
  );
};

export default DataChart3;
