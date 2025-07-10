import { ShareIcon } from "../../icons/ShareIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { FacebookIcon } from "../../icons/FacebookIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";

interface CardProps {
    title:string;
    link: string;
    type: "twitter" | "youtube" | "pinterest" | "facebook" | "instagram";
    description: string
}

export function Card(props: CardProps) {

    //for pinterest
    const parts = props.link.split('/');
    const pinId = parts[parts.length - 2];

    return <>
        <div className="p-8 bg-white rounded-md max-w-96 border-gray-200 border max-h-300">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500">
                        {props.type == 'youtube' && <YoutubeIcon/>}
                        {props.type == 'twitter' && <TwitterIcon/>}
                        {props.type == 'facebook' && <FacebookIcon/>}
                        {props.type == 'instagram' && <InstagramIcon/>}
                        {props.type == 'pinterest' && <PinterestIcon/>}
                    </div>
                    <div className="font-medium">
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
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    height="300"></iframe>}
                </div>
                
                <div>
                    {props.type === "twitter" && <div>
                    <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>
                    </div>}
                </div>

                <div>
                    {props.type === 'instagram' && <iframe
                        src={`${props.link}embed`}
                        height="320"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                    ></iframe>}
                </div>

                <div>
                    {props.type === "pinterest" && <iframe
                            src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                            width="320"
                            height="320"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>}
                </div>

                <div>
                    {props.type === 'facebook' && <iframe
                            src={`https://www.facebook.com/plugins/post.php?href=${props.link}`}
                            width=""
                            height="320"
                            style={{ border: "none", overflow: "hidden" }}
                            //scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>}
                </div>
            </div>
        </div>
    </>
}