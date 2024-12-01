import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import JsonData from "../json/rights/Data.json";
<<<<<<< HEAD
import { useInView } from 'react-intersection-observer'; // For scroll detection
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6

ChartJS.register(ArcElement, Tooltip, Legend);

const DataChart4 = () => {
  const [chartData, setChartData] = useState(null);
  const [memberData, setMemberData] = useState(null);
<<<<<<< HEAD
  const { ref: pieChartRef, inView: pieChartInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: barChartRef, inView: barChartInView } = useInView({ triggerOnce: true, threshold: 0.1 });
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6

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
<<<<<<< HEAD
        grid: {
          display: false, // Remove gridlines on the y-axis
        },
      },
      y: {
=======
      },
      y: {
        
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
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
<<<<<<< HEAD
        grid: {
          display: false, // Remove gridlines on the y-axis
        },
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
    },
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      {/* Home Visits Pie Chart */}
      <div
        ref={pieChartRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
        style={{ opacity: pieChartInView ? 1 : 0, transition: 'opacity 1s ease' }}
      >
=======
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Home Visits Pie Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Home Visits Conducted by us
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
<<<<<<< HEAD
          {chartData && pieChartInView && <Pie data={chartData} options={options} />}
=======
          {chartData && <Pie data={chartData} options={options} />}
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        </div>
      </div>

      {/* Family Members Bar Chart */}
<<<<<<< HEAD
      <div
        ref={barChartRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
        style={{ opacity: barChartInView ? 1 : 0, transition: 'opacity 1s ease' }}
      >
=======
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        <h2 className="font-lato text-xl text-[#121331] mb-3 text-center font-semibold">
          Age-Based Population Distribution
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
<<<<<<< HEAD
          {memberData && barChartInView && <Bar data={memberData} options={memberOptions} />}
=======
          {memberData && <Bar data={memberData} options={memberOptions} />}
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        </div>
      </div>
    </div>
  );
};

export default DataChart4;
