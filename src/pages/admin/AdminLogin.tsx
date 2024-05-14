import { useState } from "react";
import Form, { FormFieldTypes } from "../../components/Form.Component";

const loginFormFields:FormFieldTypes[] = [
    {type:"password", name:"security_key", placeholder:"Security Key"}
  ];

const AdminLogin = () => {
    const [securityKey, setSecurityKey] = useState<string>();

    const onClickHandler = async() => {
        try {
            console.log(securityKey);
        } catch (error) {
            console.log(error);      
        }
    };

    return(
        <>
            <Form formHeading="Admin Login" formFields={loginFormFields} onChangeFunc={(e) => setSecurityKey(e.target.value)} onClickFunc={onClickHandler} />
        </>
    )
};

export default AdminLogin;