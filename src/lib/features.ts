import moment from "moment";


const fileFormat = (url="") => {
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") 
        return "video";
    
    if (fileExt === "mp3" || fileExt === "wav")
        return "audio";

    if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") 
        return "image";

    return "file";
};

const transformImage = (url:string) => url;

const getLast7Days = () => {
    const currentDate = moment();
    const last7Days:string[] = [];
    
    for (let i = 0; i < 7; i++) {
        const dayDate = currentDate.clone().subtract(i, "days");
        const datName = dayDate.format("dddd");
        last7Days.unshift(datName);
        // currentDate.subtract(1, "days");
    }
    return last7Days;
};


export {fileFormat, transformImage, getLast7Days};