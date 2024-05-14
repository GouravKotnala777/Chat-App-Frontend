import { BsEye, BsEyeSlash } from "react-icons/bs";
import "../styles/components/form.component.scss";
import { ChangeEvent, useState } from "react";

export interface FormFieldTypes extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    selectOptions?:{
      value:string;
      placeHolder:string;
    }[]
  }

interface FormTypes {
    formHeading:string;
    formFields:FormFieldTypes[];
    onChangeFunc:(e:ChangeEvent<HTMLInputElement>) => void;
    onSelectFunc?:(e:ChangeEvent<HTMLSelectElement>) => void;
    onClickFunc:() => Promise<void>;
}

const Form = ({formHeading, formFields, onChangeFunc, onSelectFunc, onClickFunc}:FormTypes) => {
    const [isPasswordHide, setIsPaaswordHide] = useState<boolean>(true);

    return(
        <div className="form_cont">
            <div className="form_heading">{formHeading}</div>
            <div className="form_fields_cont">
                {
                    formFields.map((input, index) => (
                        input.type === "text" || input.type === "number" ?
                            <input key={index} type={input.type} name={input.name} className="form_inp" placeholder={input.placeholder} onChange={onChangeFunc} />
                            :
                            input.type === "password" ?
                                <div className="password_inp_cont">
                                    <input key={index} type={isPasswordHide ? input.type : "text"} name={input.name} placeholder={input.placeholder} onChange={onChangeFunc} />
                                    <span onClick={() => setIsPaaswordHide(!isPasswordHide)}>{isPasswordHide ? <BsEyeSlash /> : <BsEye />}</span>
                                </div>
                                :
                                input.type === "file" ?
                                    <input key={index} type={input.type} name={input.name}  className="form_inp" placeholder={input.placeholder} onChange={onChangeFunc} />
                                    :
                                    input.type === "select" ?
                                        <select key={index}  name={input.name} onChange={onSelectFunc}>
                                            <option value={undefined}>Select</option>
                                            {input.selectOptions?.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option.value}>{option.placeHolder}</option>
                                            ))}
                                        </select>
                                        :
                                        <input key={index} type={input.type} name={input.name} className="form_inp" placeholder={input.placeholder} onChange={onChangeFunc} />
                    ))
                }
                <button onClick={onClickFunc}>{formHeading}</button>
            </div>
        </div>
    )
};

export default Form;