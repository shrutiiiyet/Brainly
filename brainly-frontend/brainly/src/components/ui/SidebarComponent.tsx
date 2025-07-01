import { ReactElement } from "react";

export function SidebarComponent({text, icon}: {
    text: String;
    icon: ReactElement;
}) {

    return <div className="flex text-gray-700 py-2 hover:bg-gray-200 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150">
        <div className="pr-2">
            {icon} 
        </div>
        <div>
            {text}
        </div>
    </div>
}