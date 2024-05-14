import "../styles/components/skeleton.component.scss";

const Skeleton = ({height, width}:{height?:string; width?:string;}) => {

    return(
        <div className="skeleton_cont" style={{height:height?height:"30px", width:width?width:"100%"}}></div>
    )
}

export default Skeleton;