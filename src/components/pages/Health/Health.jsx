import React from "react";
import { Bar } from "react-chartjs-2";
import dataJson from "../json/health/health.json";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

<<<<<<< HEAD
// Register chart.js components
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const dataObject = dataJson["Spectrum of Vulnerability (VAF)"];

  // Extract labels and values from the JSON
  const labels = Object.keys(dataObject);
  const values = Object.values(dataObject);

  // Chart data configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Vulnerability Spectrum",
        data: values,
        backgroundColor: "#e0461f",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
<<<<<<< HEAD
      tooltip: {
        enabled: true, // Disable the default tooltip to use custom positioning
      },
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
<<<<<<< HEAD
        grid: {
          display: false,
        },
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
      },
      y: {
        title: {
          display: true,
          text: "Values",
          color: "#e8461e",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        beginAtZero: true,
        min: 0,
        max: 20,
        ticks: {
          stepSize: 5, // Set increment to 5
        },
<<<<<<< HEAD
        grid: {
          display: false,
        },
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
        color: "#e8461e",
      },
    },
  };
<<<<<<< HEAD

  // Custom plugin to display the tooltip-like text above the bars
  const tooltipPlugin = {
    id: "tooltipAboveBars",
    afterDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const dataset = data.datasets[0];
      const datasetMeta = chart.getDatasetMeta(0);
      datasetMeta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        const { x, y } = bar.tooltipPosition();

        ctx.save();
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#2D3748"; // Color for the text
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(value, x, y - 5); // Position the value above the bar
        ctx.restore();
      });
    },
  };
=======
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6

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
<<<<<<< HEAD
          <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
            <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
                Spectrum of Vulnerability
              </h2>
              <div className="w-full max-md:h-[54vh] h-full">
                <Bar
                  data={chartData}
                  options={options}
                  plugins={[tooltipPlugin]} // Add the plugin here
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
=======
    <div className="flex  justify-center items-center gap-6 p-5 bg-[#dcdcdc]  max-md:flex-col">
      <div className="w-1/2 max-md:w-full h-[75vh] bg-white p-5 flex justify-center items-center flex-col shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4 text-[#121331]">
          Spectrum of Vulnerability
        </h2>
        <div className="w-full max-md:h-[54vh] h-full">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
>>>>>>> 6a8d991b856ad7570e3325adcafd57bd955ca6c6
  );
};

export default BarChart;
