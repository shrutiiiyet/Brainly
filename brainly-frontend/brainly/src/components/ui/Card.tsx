import { ShareIcon } from "../../icons/ShareIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";

interface CardProps {
    title:string;
    link: string;
    type: "twitter" | "youtube" | "pinterest" | "document" | "instagram";
}

export function Card(props: CardProps) {

    return <>
        <div className="p-8 bg-white rounded-md max-w-96 max-h-82 border-gray-200 border">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        {props.type == 'youtube' && <YoutubeIcon/>}
                        {props.type == 'twitter' && <TwitterIcon/>}
                        {props.type == 'document' && <DocumentIcon/>}
                        {props.type == 'instagram' && <InstagramIcon/>}
                        {props.type == 'pinterest' && <PinterestIcon/>}
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
                </div>
            </div>
            <div className="w-full pt-4">

                <div>
                    {props.type==="youtube" && <iframe src={props.link.replace("watch", "embed").replace("?v=", "/")} 
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                </div>
                
                <div>
                    {props.type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>}
                </div>

                {/* <div>
                    {props.type === 'instagram' && <blockquote className="instagram-media" >
                        <a href={props.link}> </a>
                    </blockquote>}
                </div> */}
                </div>
        </div>
    </>
}