import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title:string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card(props: CardProps) {

    return <>
        <div className="p-8 bg-white rounded-md max-w-96 border-gray-200 border">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        <ShareIcon/>
                    </div>
                    <div>
                        {props.title}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500  cursor-pointer">
                        <a href={props.link} target="_blank">
                        <ShareIcon/>
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon/>
                    </div>
                </div>
            </div>

            <div className="w-full pt-4">

                {props.type==="youtube" && <iframe src={props.link.replace("watch", "embed").replace("?v=", "/")} 
                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                
                {props.type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={props.link.replace("x.com", "twitter.com")}></a> 
                </blockquote> 
                }
            </div>
        </div>
    </>
}