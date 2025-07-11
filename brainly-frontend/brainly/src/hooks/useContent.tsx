import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = () => {

    const [contents, setContents] = useState([]);

    function refresh(type?: string) {

        const url = type 
          ? `${BACKEND_URL}/api/v1/content/filter?filter=${type}` 
          : `${BACKEND_URL}/api/v1/content`;
          
        const response = axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data.content)
        });
    }

    useEffect(() => {
        refresh();
        // let interval = setInterval(() => {
        //     refresh();
        // }, 10*1000);

        // return () => {
        //     clearInterval(interval);
        // }
    }, [])

    return {contents, refresh};
}