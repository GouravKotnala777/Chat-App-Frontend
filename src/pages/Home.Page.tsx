import "../styles/pages/home.scss";
import AppLayout from "../components/layout/AppLayout.Component";

const Home = () => {
    return (
      <div className="home_cont">
        <div className="message_cont">
          Select chat to start a conversation...
        </div>
      </div>
    )
}
  
export default AppLayout()(Home);
  