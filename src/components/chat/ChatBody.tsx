import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageBox from './MessageBox';
import { cn } from '../../utils/helperFunctions';
import { RootState } from '@/redux/store';

const ChatBody = () => {
  const { isOpened } = useSelector((state: RootState) => state.document);
  const { messages } = useSelector((state: RootState) => state.messages);
  useEffect(() => {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);

  return (
    <div
      id="chatBody"
      className={cn(
        'relative flex h-full w-full justify-center overflow-auto px-4',
      )}
    >
      <div
        className={cn('flex h-full w-full flex-col gap-2', {
          'lg:max-w-[50%]': !isOpened,
        })}
      >
        {messages?.map((message, index) => (
          <MessageBox
            key={index}
            message={message.content}
            isBot={message.role === 'assistant'}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatBody;
