import { BACKEND_URL } from "../../config";
import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./ModalInput"
import { useRef, useState } from "react";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = 'twitter',
    Instagram = 'instagram',
    Pinterest = 'pinterest',
    Facebook = 'facebook'
}

export function CreateContentModal({open, onClose}) {

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    
    const [type, setType] = useState(ContentType.Youtube);

    const addContent = async() => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();
    }

    return <>
        <div>
            {open && <div>
            
                <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 opacity-60 flex justify-center">
                </div>
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                    <div className="flex flex-col justify-center"> 
                            <span className="bg-white p-4 rounded-md">
                                <div className="flex justify-end cursor-pointer">
                                    <div onClick={onClose}>
                                        <CrossIcon/>
                                    </div>
                                </div>  
                                <div className="flex flex-col">
                                    <Input reference={titleRef} placeholder={"Enter title"}></Input>
                                    <Input reference={linkRef} placeholder={"Enter link"}></Input>
                                </div>
                                <h1>Type</h1>
                                <div className="flex gap-2 p-4">
                                    <Button text='Youtube'variant={type == ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                        setType(ContentType.Youtube)
                                    }}></Button>

                                    <Button text='Twitter'variant={type == ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                        setType(ContentType.Twitter)
                                    }}></Button>

                                    <Button text='Instagram'variant={type == ContentType.Instagram ? "primary" : "secondary"} onClick={() => {
                                        setType(ContentType.Instagram)
                                    }}></Button>

                                    <Button text='Pinterest'variant={type == ContentType.Pinterest ? "primary" : "secondary"} onClick={() => {
                                        setType(ContentType.Pinterest)
                                    }}></Button>

                                    <Button text='Facebook'variant={type == ContentType.Facebook ? "primary" : "secondary"} onClick={() => {
                                        setType(ContentType.Facebook)
                                    }}></Button>

                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={addContent} variant="primary" text="Submit"></Button>
                                </div>
                            </span>
                    </div>
                </div>
            </div>}
        </div>
    </> 
}