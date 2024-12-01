import React from "react";
<<<<<<< HEAD
import { Bar } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";
import IncomeIssuesJson from "../json/rights/Data.json";
=======
import { Pie, Doughnut, Bar } from "react-chartjs-2";
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
<<<<<<< HEAD

=======
import IncomeIssuesJson from "../json/rights/Data.json"; // Import the JSON data
// import { text } from "d3";

// Register chart.js components for Pie, Doughnut, and Bar charts
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const DataChart5 = () => {
<<<<<<< HEAD
  const { ref: abuseRef, inView: abuseInView } = useInView({ triggerOnce: true });
  const { ref: domesticRef, inView: domesticInView } = useInView({ triggerOnce: true });

=======
  // Abuse Survivor data
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
  const abuseSurvivorData = IncomeIssuesJson?.abuse_survivor || [];
  const abuseSurvivorPercentage = abuseSurvivorData.map((item) => {
    const survivorCount = item?.survivor_of_abuse;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

<<<<<<< HEAD
  const domesticViolenceData = IncomeIssuesJson?.domestic_violence || [];
  const domesticViolencePercentage = domesticViolenceData.map((item) => {
    const survivorCount = item?.survivor_of_domestic_violence;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const abuseChartData = {
=======
  const chartData = {
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    labels: abuseSurvivorData.map((item) => item.salary),
    datasets: [
      {
        label: "Abuse Survivor Percentage (%)",
        data: abuseSurvivorPercentage,
<<<<<<< HEAD
        backgroundColor: abuseInView
          ? ["rgb(224, 70, 31)", "rgb(101, 25, 11)"]
          : ["rgba(224, 70, 31, 0.2)", "rgba(101, 25, 11, 0.2)"],
        borderColor: "#2F855A",
        borderWidth: 1,
        // Add the animation properties here
        animation: {
          duration: 1000,
          easing: "easeInOutQuad",
        },
=======
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "rgb(101, 25, 11)", // Color 2
        ],
        borderColor: "#2F855A",
        borderWidth: 1,
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
    ],
  };

<<<<<<< HEAD
  const domesticChartData = {
    labels: domesticViolenceData.map((item) => item.salary),
    datasets: [
      {
        label: "Domestic Violence Survivor Percentage (%)",
        data: domesticViolencePercentage,
        backgroundColor: domesticInView
          ? ["rgb(224, 70, 31)", "#121331"]
          : ["rgba(224, 70, 31, 0.2)", "rgba(18, 19, 49, 0.2)"],
        borderColor: "#e8461e",
        borderWidth: 1,
        // Add the animation properties here
        animation: {
          duration: 1000,
          easing: "easeInOutQuad",
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
=======
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#e8461e",
        font: { size: 16 },
      },
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
<<<<<<< HEAD
            const salary = abuseSurvivorData[index]?.salary || domesticViolenceData[index]?.salary;
            const percentage =
              abuseSurvivorPercentage[index] || domesticViolencePercentage[index];
            const total =
              abuseSurvivorData[index]?.total_attended ||
              domesticViolenceData[index]?.total_attended;
=======
            const salary = abuseSurvivorData[index]?.salary;
            const percentage = abuseSurvivorPercentage[index];
            const total = abuseSurvivorData[index]?.total_attended;
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
<<<<<<< HEAD
        ticks: { stepSize: 5 },
=======
        ticks: {
          stepSize: 5, // Set increment to 5
        },
        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
      x: {
        title: {
          display: true,
          text: "Salary",
<<<<<<< HEAD
          font: { size: 13, weight: "bold" },
=======
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
    },
  };

  // Domestic Violence data
  const domesticViolenceData = IncomeIssuesJson?.domestic_violence || [];
  const domesticViolencePercentage = domesticViolenceData.map((item) => {
    const survivorCount = item?.survivor_of_domestic_violence;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const DomesticChartData = {
    labels: domesticViolenceData.map((item) => item.salary),
    datasets: [
      {
        label: "Domestic Violence Survivor Percentage (%)",
        data: domesticViolencePercentage,
        backgroundColor: [
          "rgb(224, 70, 31)", // Color 1
          "#121331", // Color 4
        ],
        borderColor: "#e8461e",
        borderWidth: 1,
      },
    ],
  };

  const DomesticOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#e8461e",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = domesticViolenceData[index]?.salary;
            const percentage = domesticViolencePercentage[index];
            const total = domesticViolenceData[index]?.total_attended;
            return `${salary}: ${percentage}% of ${total} responses`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 30,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
        title: {
          display: true,
          text: "Number of Scholarships Disbursed",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
        },
      },
      x: {
        title: {
          display: true,
          text: "Salary",
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#e8461e",
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        },
      },
    },
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center gap-6 p-5 bg-[#dcdcdc] max-md:flex-col">
      <div
        ref={abuseRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
=======
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      {/* Abuse Survivor Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Abuse Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
<<<<<<< HEAD
          <Bar data={abuseChartData} options={chartOptions} />
        </div>
      </div>
      <div
        ref={domesticRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
=======
          <Bar data={chartData} options={options} />
        </div>
      </div>
      {/* Domestic Violence Bar Chart */}
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Domestic Violence Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
<<<<<<< HEAD
          <Bar data={domesticChartData} options={chartOptions} />
=======
          <Bar data={DomesticChartData} options={DomesticOptions} />
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        </div>
      </div>
    </div>
  );
};

export default DataChart5;
