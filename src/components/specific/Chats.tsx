import { Line, Doughnut } from "react-chartjs-2";
import {ArcElement, CategoryScale, ChartData, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip, plugins, scales} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(Tooltip, CategoryScale, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);


const labels:string[] = getLast7Days();
const lineChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:true
        }
    },
    scales:{
        x:{
            display:true
        },
        y:{
            display:true
        }
    }
};
const doughnutChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false
        }
    },
    cutout:120
};

const LineChart = ({value=[]}:{value:number[]}) => {
    const data: ChartData<"line"> = {
        labels,
        datasets: [
            {
                data:value,
                label:"Revenue 1",
                fill:false,
                backgroundColor:"rgba(175, 192, 192, 0.2)",
                borderColor:"rgba(75, 12, 192, 1)"
            }
        ]
    };

    return(
        <Line data={data} options={lineChartOptions} />
    )
};
const DoughnutChart = ({labels, value=[]}:{labels:string[], value:number[]}) => {
    const data: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                data:value,
                label:"Total Chats Vs Groups",
                backgroundColor:["rgba(75, 12, 192, 1)", "orange"],
                borderColor:["rgba(75, 12, 192, 1)", "orange"],
                offset:20
            }
        ]
    };

    return(
        <Doughnut data={data} options={doughnutChartOptions} />
    )
};

export {LineChart, DoughnutChart};