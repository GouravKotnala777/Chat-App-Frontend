import { SyntheticEvent } from "react";
import unKnownUser from "/unknownUser.png";


export const imageWithFallbackHandler = (e:SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = unKnownUser;
};