import "../styles/pages/auth.scss";
import { ChangeEvent, useState } from "react";
import Form, { FormFieldTypes } from "../components/Form.Component";




interface RegisterFormTypes {
  name:string;
  email:string;
  password:string;
  mobile:string;
}



const loginFormFields:FormFieldTypes[] = [
  {type:"text", name:"email", placeholder:"Email"},
  {type:"text", name:"password", placeholder:"Password"}
];
const registerFormFields:FormFieldTypes[] = [
  {type:"text", name:"name", placeholder:"User Name"},
  {type:"text", name:"email", placeholder:"Email"},
  {type:"text", name:"password", placeholder:"Password"},
  {type:"text", name:"mobile", placeholder:"Mobile"},
  {type:"select", name:"gender", placeholder:"Gender", selectOptions:[{value:"male", placeHolder:"Male"}]},
  {type:"file", name:"avatar", placeholder:"Avarar"}
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [authFormData, setAuthFormData] = useState<RegisterFormTypes>();

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setAuthFormData({...authFormData!, [e.target.name]:e.target.value});
  };
  const onSelectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    setAuthFormData({...authFormData!, [e.target.name]:e.target.value});
  };

  const onClickHandler = async() => {
    try {
      console.log(authFormData);
    } catch (error) {
      console.log(error);      
    }
  };

    return (
      <>
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
  