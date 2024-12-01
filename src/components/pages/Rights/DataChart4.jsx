import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import JsonData from "../json/rights/Data.json";
import { useInView } from 'react-intersection-observer'; // For scroll detection

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart4 = () => {
  const [chartData, setChartData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const { ref: pieChartRef, inView: pieChartInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: barChartRef, inView: barChartInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const homeVisitsData = {
      conducted: JsonData.home_visits.home_visit_conducted_count,
      notConducted: JsonData.home_visits.home_visit_not_conducted_count,
    };
    setChartData({
      labels: ["Conducted", "Not Conducted"],
      datasets: [
        {
          label: "Home Visits",
          data: [homeVisitsData.conducted, homeVisitsData.notConducted],
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });

    const membersDistribution = JsonData.family_members.members_distribution;
    const labels = membersDistribution.map((item) => item.range);
    const data = membersDistribution.map((item) => item.percentage_of_total);
    setMemberData({
      labels,
      datasets: [
        {
          label: "Family Members",
          data,
          backgroundColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "rgb(134, 37, 15)", // Color 3
            "#121331", // Color 4
            "gray",
          ],
          borderColor: [
            "rgb(224, 70, 31)", // Color 1
            "rgb(101, 25, 11)", // Color 2
            "gray",
            "#121331", // Color 4
            "rgb(134, 37, 15)", // Color 3
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 10, // Reduced padding
          usePointStyle: true,
          color: "#e8461e",
        },
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const totalEntries = JsonData.home_visits.total_entries;
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${totalEntries}`;
          },
        },
      },
    },
  };

  const memberOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}% from the total ${JsonData.family_members.total_entries}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Family Members Range",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        ticks: {
          maxRotation: 0, // Keep the labels horizontal
        },
        grid: {
          display: false, // Remove gridlines on the y-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage of Total (%)",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        beginAtZero: true,
        min: 0,
        max: 65,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
        grid: {
          display: false, // Remove gridlines on the y-axis
        },
      },
    },
  };
// customize plugins

const plugins = [
  {
    id: "percentageLabels",
    afterDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const datasets = chart.data.datasets[0].data;

      chart.getDatasetMeta(0).data.forEach((bar, index) => {
        const { x, y } = bar.tooltipPosition();
        const percentage = datasets[index];

        ctx.save();
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#2D3748";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${percentage}%`, x, y - 5); // Positioning above the bar
        ctx.restore();
      });
    },
  },
];
  return (
    <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      {/* Home Visits Pie Chart */}
      <div
        ref={pieChartRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
        style={{ opacity: pieChartInView ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Home Visits Conducted by us
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {chartData && pieChartInView && <Pie data={chartData} options={options} />}
        </div>
      </div>

      {/* Family Members Bar Chart */}
      <div
        ref={barChartRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
        style={{ opacity: barChartInView ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Age-Based Population Distribution
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {memberData && barChartInView && <Bar data={memberData} options={memberOptions} plugins={plugins} />}
        </div>
      </div>
    </div>
  );
};

export default DataChart4;
