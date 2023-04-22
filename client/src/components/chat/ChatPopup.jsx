import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import * as React from "react";
import ChatItem from "./ChatItem";
export default function ChatPopUp(props) {
    return (<Menu menuButton={<MenuButton>
          <i className="fa-regular fa-comment-lines text-colorIconMenu text-lg"></i>
        </MenuButton>} transition>
      <div className="w-[300px] ">
        <h2 className="m-0 px-[10px] text-info">Chat</h2>
        <MenuItem>
          <ChatItem />
        </MenuItem>
        <MenuItem>
          <ChatItem />
        </MenuItem>
        <MenuItem>
          <ChatItem />
        </MenuItem>
        <MenuItem>
          <ChatItem />
        </MenuItem>
        <MenuItem>
          <ChatItem />
        </MenuItem>
        <MenuItem>
          <ChatItem />
        </MenuItem>
      </div>
    </Menu>);
}
