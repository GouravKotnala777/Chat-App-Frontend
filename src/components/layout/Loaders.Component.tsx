import { Skeleton } from "@mui/material";
import Header from "./Header.Component";
import Title from "../shared/Title.Component";


export const LayoutLoaders = () => {

    return(
        <div className="loader_cont">
            <div className="app_layout_cont">
                <Title title="Chat App" description="this is description" />
                <Header />
                <div className="three_sections_cont">
                    <div className="left_section"><Skeleton variant="rectangular" /></div>
                    <div className="middle_section">
                        <Skeleton variant="rectangular" height={"100vh"} />
                    </div>
                    <div className="right_section"><Skeleton variant="rectangular" /></div>
                </div>
                
            </div>
        </div>
    )
};
