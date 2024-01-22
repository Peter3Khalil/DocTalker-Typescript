import React, {  forwardRef } from 'react';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { cn } from '../../utils/helperFunctions';
type Props = {
  className?: string;
};
const ChatContainer = forwardRef<HTMLDivElement, Props>(
  function ChatContainer({ className }, ref) {
    return (
      <div
        id="chat"
        ref={ref}
        className={cn(
          'relative flex h-full flex-1 flex-col gap-2 pb-3 ',
          className,
        )}
      >
        <ChatBody />
        <ChatFooter />
      </div>
    );
  },
);
export default ChatContainer;
