import { RefObject } from "react";

interface Props {
    refElem: RefObject<HTMLElement | null>;
}

export const SkipToContent: React.FC<Props> = ({ refElem }) => {
    return (
        <button
            className="skip-link"
            onClick={() => {
                console.log("click");
                refElem.current?.focus();
            }}
        >
            Skip to main content
        </button>
    );
};
