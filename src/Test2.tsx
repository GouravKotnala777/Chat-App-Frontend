// import { useEffect, useState } from "react";

import { memo } from "react";


const Test2 = ({adjective, onClickHandler}:{adjective?:string; onClickHandler?:{name:string}}) => {

    console.log(`${JSON.stringify(onClickHandler)}Test2 is rendering....`);

    return(
        <>
            <div className="box" style={{border:"2px solid blue", width:"500px", margin:"200px auto 10px auto", textAlign:"center"}}>
                <h1>Child</h1>
                <h1>{adjective}</h1>
                {/* <button onClick={onClickHandler} style={{cursor:"pointer", padding:"10px 20px"}}>Num</button> */}
            </div>
        </>
    )
};

// export default Test2;
export default memo(Test2);