import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


import data from "../json/education/StudentPassOut.json"
function Dashboard() {
  const [currentChart, setCurrentChart] = useState("year");

  const generateYearlyChartData = () => {
    const labels = data.map(item => item.year);
    const totalSubjects = data.map(item => {
      return item.classwise.reduce((total, classData) => {
        return total + Object.values(classData.subjectWise).reduce((sum, num) => sum + num, 0);
      }, 0);
    });

    return {
      labels,
      datasets: [
        {
          label: "Total Subjects",
          data: totalSubjects,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    };
  };

  const generateClasswiseChartData = (year, subject) => {
    const classData = data.find(item => item.year === year).classwise;
    const labels = classData.map(item => item.class);
    const subjectData = classData.map(item => item.subjectWise[subject] || 0);

    return {
      labels,
      datasets: [
        {
          label: `${subject} by Class`,
          data: subjectData,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1
        }
      ]
    };
  };

  const handleBarClick = (year, subject) => {
    setCurrentChart({ year, subject });
  };

  const handleBack = () => {
    setCurrentChart("year");
  };

  return (
    <div>
      {currentChart === "year" ? (
        <>
          <Bar
            data={generateYearlyChartData()}
            options={{
              onClick: (e, element) => {
                if (element.length) {
                  const year = data[element[0]._index].year;
                  const subject = Object.keys(data[element[0]._index].classwise[0].subjectWise)[0];
                  handleBarClick(year, subject);
                }
              },
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Total Subjects per Year"
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </>
      ) : (
        <>
          <Bar
            data={generateClasswiseChartData(currentChart.year, currentChart.subject)}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `${currentChart.subject} per Class in ${currentChart.year}`
                },
                legend: {
                  display: false
                }
              }
            }}
          />
          <button onClick={handleBack} className="mt-4 p-2 bg-blue-500 text-white">
            Back to Yearly Chart
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
