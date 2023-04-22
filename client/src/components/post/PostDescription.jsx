import * as React from "react";
export default function PostDescription({ children }) {
    return (<div className="my-2 text-sm leading-6">
      <p className="line-clamp-3">{children}</p>
    </div>);
}
