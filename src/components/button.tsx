interface ButtonProps{
    size: "sm" | "md" | "lg";
    text?: string;
    onclick?: ()=>void;
    icon?: React.ReactElement;
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-8 w-8/12"
}

const defaultStyles = "border-b-current hover:cursor-pointer hover:bg-gray-500 rounded-md bg-gray-700 text-white"

export const Button = (props: ButtonProps) => {
    return(
        <button onClick={props.onclick} className={`flex justify-center items-center ${defaultStyles} ${sizeStyles[props.size]}
        `}>
            {props.text} {props.icon && props.icon}
        </button>
    )
}