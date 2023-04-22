import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./Arrow";
import usePreventBodyScroll from "./usePreventBodyScroll";
import React from "react";
function HorizontalList({ children }) {
    const { disableScroll, enableScroll } = usePreventBodyScroll();
    const onWheel = (apiObj, ev) => {
        const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
        if (isThouchpad) {
            ev.stopPropagation();
            return;
        }
        if (ev.deltaY < 0) {
            apiObj.scrollNext();
        }
        else if (ev.deltaY > 0) {
            apiObj.scrollPrev();
        }
    };
    return (<div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                {children ? children : <></>}
            </ScrollMenu>
        </div>);
}
export default HorizontalList;
