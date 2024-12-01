import React from "react";
import { Bar } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";
import IncomeIssuesJson from "../json/rights/Data.json";
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
  const { ref: abuseRef, inView: abuseInView } = useInView({ triggerOnce: true });
  const { ref: domesticRef, inView: domesticInView } = useInView({ triggerOnce: true });

  const abuseSurvivorData = IncomeIssuesJson?.abuse_survivor || [];
  const abuseSurvivorPercentage = abuseSurvivorData.map((item) => {
    const survivorCount = item?.survivor_of_abuse;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const domesticViolenceData = IncomeIssuesJson?.domestic_violence || [];
  const domesticViolencePercentage = domesticViolenceData.map((item) => {
    const survivorCount = item?.survivor_of_domestic_violence;
    const totalAttended = item?.total_attended;
    return survivorCount && totalAttended
      ? ((survivorCount / totalAttended) * 100).toFixed(2)
      : "0";
  });

  const abuseChartData = {
    labels: abuseSurvivorData.map((item) => item.salary),
    datasets: [
      {
        label: "Abuse Survivor Percentage (%)",
        data: abuseSurvivorPercentage,
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
      },
    ],
  };

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
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = abuseSurvivorData[index]?.salary || domesticViolenceData[index]?.salary;
            const percentage =
              abuseSurvivorPercentage[index] || domesticViolencePercentage[index];
            const total =
              abuseSurvivorData[index]?.total_attended ||
              domesticViolenceData[index]?.total_attended;
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
        ticks: { stepSize: 5 },
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Salary",
          font: { size: 13, weight: "bold" },
        },grid: {
          display: false,
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
      <div
        ref={abuseRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Abuse Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={abuseChartData} options={chartOptions} plugins={plugins}/>
        </div>
      </div>
      <div
        ref={domesticRef}
        className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Domestic Violence Survivor Percentage Relative to Salary
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={domesticChartData} options={chartOptions} plugins={plugins}/>
        </div>
      </div>
    </div>
  );
};

export default DataChart5;
