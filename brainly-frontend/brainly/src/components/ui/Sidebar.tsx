import { Brainly } from "../../icons/BrainlyIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarComponent } from "./SidebarComponent";

export function SideBar() {
    
    return <>
        <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Brainly/>
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarComponent text={"Twitter"} icon={<TwitterIcon/>}/>
                <SidebarComponent text={"Youtube"} icon={<YoutubeIcon/>}/>
            </div>
        </div>
    </>
}