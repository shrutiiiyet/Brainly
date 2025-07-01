import { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants;
    size?: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}


const variantStyles = {

    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

// const sizeStyles = {
//     "sm": "py-1 px-1 text-sm ",
//     "md": "py-2 px-2 text-md",
//     "lg": "py-3 px-3 text-xl"
// }

const defaultStyles = " px-4 py-2 rounded-md font-normal"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className= {`${variantStyles[props.variant]} ${defaultStyles}}` + `${props.fullWidth? " w-full flex justify-center" : ""}`
     + `${props.loading? "opacity-45" : ""}`}>
        <div className="flex items-center cursor-pointer">
            {props.startIcon}
            {props.text}
            {props.endIcon}
        </div>
        </button>
} 