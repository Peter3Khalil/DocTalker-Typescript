import React, { useState } from 'react';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { cn } from '../../utils/helperFunctions';

const ChatContainer = () => {
  const [res, setRes] = useState(null);
  return (
    <div className={cn('relative  flex h-full flex-1 flex-col gap-2 pb-3 pt-4')}>
      <ChatBody messages={res} />
      <ChatFooter setRes={setRes} />
    </div>
  );
};
export default ChatContainer;
