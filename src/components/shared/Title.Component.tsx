import { Helmet } from "react-helmet-async";


const Title = ({title="Chat App", description="This is ChatApp"}:{title:string; description:string;}) => {

    return(
        <Helmet>
            <title>{title}</title>
            <meta name="Description" content={description} />
        </Helmet>
    )
};

export default Title;