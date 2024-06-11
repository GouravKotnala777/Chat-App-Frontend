


const Test = () => {
    
    const onClickHandler = () => {
        console.log("aaaaaaaaa");
    }

    return(
        <>
            <div className="box" style={{border:"2px solid red", width:"500px", margin:"0px auto", textAlign:"center"}}>
                Test
                <button onClick={onClickHandler} style={{cursor:"pointer", padding:"10px 20px"}}>Num</button>
            </div>
        </>
    )
};

export default Test;