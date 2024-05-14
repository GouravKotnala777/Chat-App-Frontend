import "./styles/pages/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute.Component";
import About from "./pages/About.Page";
import ChatManagement from "./pages/admin/ChatManagement";


// import Home from "./pages/Home.Page";
// import About from "./pages/About.Page";
// import Auth from "./pages/Auth.Page";
// import About2 from "./pages/About2";

const Home = lazy(() => import("./pages/Home.Page"));
const Auth = lazy(() => import("./pages/Auth.Page"));
// const About = lazy(() => import("./pages/About.Page"));
// const About2 = lazy(() => import("./pages/About2"));
const Chat = lazy(() => import("./pages/Chat.Page"));
const Groups = lazy(() => import("./pages/Group.Page"));


const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));


const user:boolean = true;

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatID" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="/login" element={
            <ProtectedRoute user={!user} redirect="/">
              <Auth />
            </ProtectedRoute>}
            />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
