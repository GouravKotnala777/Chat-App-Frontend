import "../../styles/pages/admin/dashboard.scss";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Chats";


const Dashboard = () => {

    return(
        <div className="dashboard_cont">
            <AdminLayout >
                <>
                    <div className="heading">Dashboard</div>
                    <div className="line_chart_cont">
                        <LineChart value={[1, 2, 3, 4, 5, 6, 7]} />
                    </div>
                    <div className="doughnut_chart_cont">
                        <DoughnutChart labels={["Single Chats Vs Group Chats"]} value={[23, 66]} />
                    </div>
                </>
            </AdminLayout>
        </div>
    )
};

export default Dashboard;