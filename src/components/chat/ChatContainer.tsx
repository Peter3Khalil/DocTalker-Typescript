import React, { FC, useState } from 'react';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { cn } from '../../utils/helperFunctions';

const ChatContainer = () => {
  return (
    <div
      id="chat"
      className={cn('relative  flex h-full flex-1 flex-col gap-2 pb-3 pt-4')}
    >
      <ChatBody />
      <ChatFooter />
    </div>
  );
};
export default ChatContainer;
