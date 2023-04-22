import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
function Arrow({ children, disabled, onClick }) {
    return (<button disabled={disabled} onClick={onClick} style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            right: "1%",
            opacity: disabled ? "0" : "1",
            userSelect: "none"
        }}>
            {children}
        </button>);
}
export function LeftArrow() {
    const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } = React.useContext(VisibilityContext);
    const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible));
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleElements.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleElements]);
    return (<Arrow disabled={disabled} onClick={async () => scrollPrev()}>
            <div className="hidden md:block btn btn-circle text-white bg-gray-800 bg-opacity-50 absolute left-2 z-10">
                <i className="fa-regular fa-arrow-left"></i>
            </div>
        </Arrow>);
}
export function RightArrow() {
    const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(VisibilityContext);
    const [disabled, setDisabled] = React.useState(!visibleElements.length && isLastItemVisible);
    React.useEffect(() => {
        if (visibleElements.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleElements]);
    return (<Arrow disabled={disabled} onClick={async () => scrollNext()}>
            <div className="hidden md:block btn btn-circle text-white bg-gray-800 bg-opacity-50 absolute right-2 z-10">
                <i className="fa-regular fa-arrow-right"></i>
            </div>
        </Arrow>);
}
