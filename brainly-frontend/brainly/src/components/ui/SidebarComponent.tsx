import { ReactElement } from "react";

export function SidebarComponent({text, icon, active, onclick}: {
    text: String
    icon: ReactElement
    onclick?: ()=> void
    active?: boolean
}) {   
    return <div 
    onClick={onclick}   
    className={`flex text-gray-700 py-2 hover:bg-gray-200 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150
    ${active ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
    >
        <div className="pr-2">
            {icon} 
        </div>
        <div>
            {text}
        </div>
    </div>
}