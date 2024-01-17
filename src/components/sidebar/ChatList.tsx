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
        {chats.map((chat) => (
          <ChatItem key={chat.id} name={chat.chatName} id={chat.id} />
        ))}
      </ul>
    </nav>
  );
};

export default ChatList;
