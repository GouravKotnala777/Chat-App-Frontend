import { useState } from "react";


const About = () => {
  const [a, setA] = useState<number>(0);
  const ss = "Naruto";

  const func = (aa:string) => {
    console.log(aa);
  };

    return (
      <>
        About
        <h1>{a}</h1>
        <button onClick={() => func()}>Fetch</button>
      </>
    )
}
  
export default About;
  