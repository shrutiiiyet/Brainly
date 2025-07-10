import { Brainly } from "../../icons/BrainlyIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { FacebookIcon, DocumentIcon } from '../../icons/FacebookIcon';
import { SidebarComponent } from "./SidebarComponent";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";
import { LogoutIcon } from "../../icons/LogoutIncon";
import { Button } from "./Button";
import { useState } from "react";

export function SideBar() {
    
    const [curr, setCurr] = useState("All")

    return <>
        <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Brainly/>
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarComponent text={"All"} icon={<DocumentIcon/>} onclick={() => {setCurr("All")}}/>
                <SidebarComponent text={"Twitter"} icon={<TwitterIcon/>} onclick={() => {setCurr("Twitter")}}/>
                <SidebarComponent text={"Youtube"} icon={<YoutubeIcon/>} onclick={() => {setCurr("Youtube")}}/>
                <SidebarComponent text={"Instagram"} icon={<InstagramIcon/>} onclick={() => {setCurr("Instagram")}}/>
                <SidebarComponent text={"Pinterest"} icon={<PinterestIcon/>} onclick={() => {setCurr("Pinterest")}}/>
                <SidebarComponent text={"Facebook"} icon={<FacebookIcon/>} onclick={() => {setCurr("Facebook")}}/>
            </div>
            <div className="pt-72">
                 <Button size="md" text='Logout' startIcon={<LogoutIcon/>} onClick={()=>{}} variant='primary'></Button> 
            </div>
            </div>
    </>
}