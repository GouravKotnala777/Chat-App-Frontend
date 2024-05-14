import "../styles/pages/home.scss";
import AppLayout from "../components/layout/AppLayout.Component";

const Home = () => {
    return (
      <div className="home_cont">
        <div className="message_cont">
          Select a friend to chat
        </div>
      </div>
    )
}
  
export default AppLayout()(Home);
  