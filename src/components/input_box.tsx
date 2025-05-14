import React from "react";
interface InputBoxProps {
    placeholder_text: string;
}

export const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
    ({ placeholder_text }, ref) => {
        return(
            <input
                type="text"
                placeholder={placeholder_text}
                className="bg-gray-700 px-6 py-4 mr-1 w-7/12 rounded"
                ref={ref}
            />
        )
    }
);