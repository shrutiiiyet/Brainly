import { Brainly } from "../../icons/BrainlyIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { FacebookIcon, DocumentIcon } from '../../icons/FacebookIcon';
import { SidebarComponent } from "./SidebarComponent";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";
import { LogoutIcon } from "../../icons/LogoutIncon";
import { Button } from "./Button";

export function SideBar({ selectedType, onSelectType, setLogoutModal }: {
    selectedType: string;
    onSelectType: (type: string) => void;
    setLogoutModal: any;
}) {
    
    return <>
        <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Brainly/>
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarComponent text={"All"} icon={<DocumentIcon/>} active={selectedType==="All"} onclick={() => {onSelectType("All")}} />
                <SidebarComponent text={"Twitter"} icon={<TwitterIcon/>} active={selectedType==="twitter"} onclick={() => {onSelectType("twitter")}}/>
                <SidebarComponent text={"Youtube"} icon={<YoutubeIcon/>} active={selectedType==="youtube"} onclick={() => {onSelectType("youtube")}}/>
                <SidebarComponent text={"Instagram"} icon={<InstagramIcon/>} active={selectedType==="instagram"} onclick={() => {onSelectType("instagram")}}/>
                <SidebarComponent text={"Pinterest"} icon={<PinterestIcon/>} active={selectedType==="pinterest"} onclick={() => {onSelectType("pinterest")}}/>
                <SidebarComponent text={"Facebook"} icon={<FacebookIcon/>} active={selectedType==="facebook"} onclick={() => {onSelectType("facebook")}}/>
            </div>
            <div className="pt-72">
                 <Button size="md" text='Logout' startIcon={<LogoutIcon/>} onClick={()=>{
                    setLogoutModal(true)
                    }} variant='primary'></Button> 
            </div>
            </div>
    </>
}