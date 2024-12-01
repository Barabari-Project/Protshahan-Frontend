import { React, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import communityJsonData from "../json/beat.json"; // Renamed imported data to avoid conflict
import { useInView } from "react-intersection-observer"; // Import the hook

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EduChart = () => {
  const firstGenerationLearners =
    communityJsonData?.First_Generation_Learner || [];
  const totalRespondents = firstGenerationLearners[3]?.total_attended || 0;

  const firstGenPercentage = firstGenerationLearners.map((item) => {
    const firstGenLearner = item?.["First_Generation_Learner"];
    const totalAttended = item?.["total_attended"];
    if (firstGenLearner && totalAttended) {
      return ((firstGenLearner / totalAttended) * 100).toFixed(2);
    }
    return "0";
  });

  const chartData = {
    labels: firstGenerationLearners.map((item) => item.Salary),
    datasets: [
      {
        label: "First Generation Learner Percentage (%)",
        data: firstGenPercentage,
        backgroundColor: [
          "rgb(224, 70, 31)",
          "rgb(101, 25, 11)",
          "rgb(134, 37, 15)",
        ],
        borderColor: "#2D3748",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000, // Set animation duration for smooth transition
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#2D3748",
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const salary = firstGenerationLearners[index]?.Salary;
            const total = firstGenerationLearners[index]?.total_attended;
            const percentage = firstGenPercentage[index];
            return `${salary}: ${percentage}% (${total} responses) from the total ${totalRespondents}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Salary",
          color: "#e8461e",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#2D3748",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage (%)",
          color: "#e8461e",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#2D3748",
        },
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
      },
    },
  };

  const [communityChartData, setCommunityChartData] = useState(null);

  useEffect(() => {
    const applicantsData =
      communityJsonData?.community_or_gec?.applicants || [];
    setCommunityChartData({
      labels: applicantsData.map((item) => item.type),
      datasets: [
        {
          label: "Applicants Count",
          data: applicantsData.map((item) => item.percentage_of_total),
          backgroundColor: ["rgb(224, 70, 31)", "rgb(101, 25, 11)"],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const CommunityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        color: "#e8461e",
        font: {
          size: 14,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.raw}% Applicants from the total ${
              communityJsonData?.community_or_gec?.total_applicants || "N/A"
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Applicant Type",
          color: "#e8461e",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#2D3748",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Applicants Percentage (%)",
          color: "#e8461e",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#2D3748",
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

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
          ctx.fillText(`${percentage}%`, x, y - 5);
          ctx.restore();
        });
      },
    },
  ];

  // Scroll animation trigger for charts
  const { ref: chartRef, inView: chartInView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Trigger when 50% of the chart is in view
  });

  return (
    <div className="flex justify-center items-center gap-6 bg-[#dcdcdc] max-md:flex-col">
      <div
        ref={chartRef}
        className={`w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg transition-opacity duration-1000 ${
          chartInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="font-lato text-lg font-semibold text-[#121331] mb-5 text-center">
          First-Generation Learners: Salary Analysis Overview
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={chartData} options={options} plugins={plugins} />
        </div>
      </div>
      <div
        className={`w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg transition-opacity duration-1000 ${
          chartInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="font-lato text-lg font-semibold text-[#121331] mb-5 text-center">
          Community or GEC Bar Chart
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          {communityChartData && (
            <Bar
              data={communityChartData}
              options={CommunityOptions}
              plugins={plugins}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EduChart;
