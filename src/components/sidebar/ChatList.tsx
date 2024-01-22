import React, { FC } from 'react';
import ChatItem from './ChatItem';
import { Chat } from './ChatItem';
type ChatListProps = {
  chats: Chat[];
};
const ChatList: FC<ChatListProps> = ({ chats }) => {
  return (
    <nav>
      <ul className=" w-full overflow-y-auto pr-1" id="chatList">
        {chats?.length !== 0
          ? chats
              ?.reverse()
              .map((chat) => (
                <ChatItem key={chat.id} chatName={chat.chatName} id={chat.id} />
              ))
          : null}
      </ul>
    </nav>
  );
};

export default ChatList;
