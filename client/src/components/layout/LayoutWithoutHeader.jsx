import * as React from "react";
import BackTop from "./BackTop";
import Footer from "./Footer";
export default function LayoutWithoutHeader({ children }) {
    return (<>
            <main>{children}</main>
            <BackTop />
            <Footer />
        </>);
}
