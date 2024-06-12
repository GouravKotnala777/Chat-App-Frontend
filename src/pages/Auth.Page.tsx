import "../styles/pages/auth.scss";
import { ChangeEvent, useState } from "react";
import Form, { FormFieldTypes } from "../components/Form.Component";
import toast, {Toaster} from "react-hot-toast";



interface RegisterFormTypes {
  name:string;
  userName:string;
  password:string;
  bio:string;
  // mobile:string;
}



const loginFormFields:FormFieldTypes[] = [
  {type:"text", name:"userName", placeholder:"User Name"},
  {type:"text", name:"password", placeholder:"Password"}
];
const registerFormFields:FormFieldTypes[] = [
  {type:"text", name:"name", placeholder:"Name"},
  {type:"text", name:"userName", placeholder:"User Name"},
  {type:"text", name:"password", placeholder:"Password"},
  {type:"text", name:"bio", placeholder:"Bio"},
  {type:"file", name:"avatar", placeholder:"Avarar"}
  // {type:"text", name:"mobile", placeholder:"Mobile"},
  // {type:"select", name:"gender", placeholder:"Gender", selectOptions:[{value:"male", placeHolder:"Male"}]},
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [authFormData, setAuthFormData] = useState<RegisterFormTypes>();
  const [avatar, setAvatar] = useState<File|undefined>();


  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      if (e.target.files && e.target.files?.length > 0) {
        console.log(e.target.files);
        console.log(e.target.files[0]);
        setAvatar(e.target.files[0])
      }
    }
    else{
      setAuthFormData({...authFormData!, [e.target.name]:e.target.value});
    }
  };
  const onSelectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    setAuthFormData({...authFormData!, [e.target.name]:e.target.value});
  };
  const onClickHandler = async() => {
    try {
      const formData = new FormData();
      formData.append("name", authFormData?.name as string);
      formData.append("userName", authFormData?.userName as string);
      formData.append("password", authFormData?.password as string);
      formData.append("bio", authFormData?.bio as string);
      formData.append("avatar", avatar as File);
      console.log(authFormData);
      console.log(formData);
      const res = await fetch(isLogin?`${import.meta.env.VITE_SERVER}/api/v1/user/login`:`${import.meta.env.VITE_SERVER}/api/v1/user/new`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:isLogin?JSON.stringify({userName:authFormData?.userName, password:authFormData?.password}):formData
      });

      const data = await res.json();

      console.log("----Auth.tsx onClickHandler");
      console.log(data.success);
      console.log("----Auth.tsx onClickHandler");

      if (data.success === false) {
        toast.error(data.message, {
          duration:1000,
          position:"bottom-center"
        })
      }
      else{
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error Occured", {
        duration:1000,
        position:"bottom-center"
      })
      console.log("----Auth.tsx onClickHandler");
      console.log(error);      
      console.log("----Auth.tsx onClickHandler");
    }
  };


    return (
      <>
        <Toaster />


        <h1>Login</h1>
        <h1>{JSON.stringify(import.meta.env.VITE_SERVER)}</h1>
        <h1>Login</h1>




        {isLogin ? 
          <Form formHeading="Login" formFields={loginFormFields} onChangeFunc={onChangeHandler} onSelectFunc={onSelectHandler} onClickFunc={onClickHandler} />
          : 
          <Form formHeading="Register" formFields={registerFormFields} onChangeFunc={onChangeHandler} onSelectFunc={onSelectHandler} onClickFunc={onClickHandler} /> 
        }

        <div className="or_cont">
          <span></span>
          <div className="or">Or</div>
          <span></span>
        </div>

        <div className="login_toggler_cont">
          <span>{isLogin ? "Already have account" : "Don't have account"} <button className="login_toggler" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "register here" : "login here"}</button></span>
          <span><button className="login_toggler" onClick={() => setIsLogin(!isLogin)}>{isLogin && "forget password"}</button></span>
        </div>
      </>
    )
}
  
export default Auth;
  