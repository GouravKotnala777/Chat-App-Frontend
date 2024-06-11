import "./styles/pages/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute.Component";
import About from "./pages/About.Page";
import ChatManagement from "./pages/admin/ChatManagement";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducerInitialState, userExists, userNotExists } from "./redux/reducers/authReducer";
import { LayoutLoaders } from "./components/layout/Loaders.Component";
import { SocketProvider } from "./socket";
import Test from "./Test";


const Home = lazy(() => import("./pages/Home.Page"));
const Auth = lazy(() => import("./pages/Auth.Page"));
const Chat = lazy(() => import("./pages/Chat.Page"));
const Groups = lazy(() => import("./pages/Group.Page"));


const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));



function App() {
  const {isLoading, user} = useSelector((state:{authReducer:AuthReducerInitialState}) => state.authReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch(`${server}/api/v1/user/me`, {
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    }).then((res) => res.json())
    .then((data) => {
      console.log("----- App.tsx  me");
      console.log(data);
      dispatch(userExists({
        _id:data.message._id,
        name:data.message.name,
        userName:data.message.userName,
        bio:data.message.bio,
        avatar:data.message.avatar.public_id
      }))
      console.log("----- App.tsx  me");
    })
    .catch((error) => {
      console.log("----- App.tsx  me");
      console.log(error);
      dispatch(userNotExists())
      console.log("----- App.tsx  me");
    });
  }, [dispatch]);

  return isLoading ? (<BrowserRouter><LayoutLoaders /></BrowserRouter>):(
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
          {/* <h1>Logined User {user?.name}</h1> */}
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={!!user} />
            </SocketProvider>
          }>
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

          <Route path="/test" element={<Test />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
