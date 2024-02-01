import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { dateConvert } from "../../utils/dateConvert";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, zoomPlugin);

const GeneralLineChart = ({ t, items, mode, setNewMarkers, summary }) => {
    const isSpeedMode = mode === "speed";
    const labels = items.map((el) => dateConvert(el.datetime));
    const chartData = items.map((el) => el[mode]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: isSpeedMode ? `${t("speed")}, ${t("kmh")}` : `${t("satellites")}`,
                data: chartData,
                fill: true,
                backgroundColor: "#1677ff34",
                borderColor: "#1677ff",
                cubicInterpolationMode: "monotone"
            }
        ]
    };
    // const handlePointClick = (e) => console.log(e);
    const handlePointClick = (e, elements) => {
        if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            setNewMarkers((prev) => [
                ...prev,
                {
                    latitude: items[clickedElementIndex].latitude,
                    longitude: items[clickedElementIndex].longitude,
                    name: summary.tracker_name,
                    color: summary.tracker_color,
                    address: summary?.address,
                    gsmsl: items[clickedElementIndex].gsmsl,
                    satellites: items[clickedElementIndex].satellites,
                    speed: items[clickedElementIndex].speed
                }
            ]);
        }
    };

    const options = {
        onClick: handlePointClick,
        animation: false,
        plugins: {
            legend: {
                display: false
            },
            zoom: {
                pan: {
                    enabled: true, // Enable panning
                    mode: "x" // Allow horizontal panning (X-axis)
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: "x"
                }
            }
        },
        responsive: true,
        elements: {
            point: {
                radius: 3
            }
        },
        scales: {
            x: {
                min: 0,
                max: 1000
            },
            y: {
                min: 0,
                max: isSpeedMode ? 200 : 40
            }
        }
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};

export default GeneralLineChart;
