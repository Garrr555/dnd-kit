import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
}

export default function Button (props: ButtonProps) {

    const { children } = props;

    return(
        <div className="rounded-lg bg-blue-500 px-3 py-2 text-white font-semibold">
            {children}
        </div>
    )
}