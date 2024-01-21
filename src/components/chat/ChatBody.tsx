import React, { useEffect, useState } from 'react';
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
          'lg:max-w-[60%]': !isOpened,
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
const Arrow = () => {
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = () => {
    const chatBody = document.getElementById('chatBody');
    console.log(Number.parseInt(chatBody.scrollTop + chatBody.clientHeight));
    console.log(chatBody.scrollHeight);
    if (
      Number.parseInt(chatBody.scrollTop + chatBody.clientHeight) ===
      chatBody.scrollHeight
    ) {
      setIsBottom(true);
    } else setIsBottom(false);
  };
  const goToBottom = () => {
    const chatBody = document.getElementById('chatBody');
    //Smooth scrolling
    chatBody.scrollTo({
      top: chatBody.scrollHeight + 100,
      behavior: 'smooth',
    });
    setIsBottom(true);
  };
  useEffect(() => {
    const chatBody = document.getElementById('chatBody');
    chatBody.addEventListener('scroll', handleScroll);
    return () => chatBody.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {!isBottom && (
        <div onClick={goToBottom} className="absolute bottom-0 z-10">
          Arrow
        </div>
      )}
    </>
  );
};
export default ChatBody;
