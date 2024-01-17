import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '../../utils/helperFunctions';
import { IoSend } from '../shared/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { RootState } from '@/redux/store';
const ChatFooter = () => {
  const { isOpened } = useSelector((state: RootState) => state.document);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDisabled = message.trim() == '';
  const handleOnchange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    setMessage('');
  };
  const handleOnfocus = () => {
    const form = document.getElementById('form');
    if (!form) return;
    form.classList.add('border-primary');
  };
  const handleOnblur = () => {
    const form = document.getElementById('form');
    if (!form) return;
    form.classList.remove('border-primary');
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  return (
    <div
      className={cn('flex w-full shrink-0 items-center justify-center p-2', {
        'mx-auto lg:max-w-[60%]': !isOpened,
      })}
    >
      <form
        id="form"
        onSubmit={handleOnSubmit}
        className="relative flex min-h-[10px] w-full items-center rounded border-2"
      >
        <textarea
          className="h-[50px] max-h-[200px] w-full resize-none bg-inherit py-2 pl-2 pr-14 text-md outline-none"
          placeholder="Type a message"
          id="message"
          ref={textareaRef}
          value={message}
          onChange={handleOnchange}
          onFocus={handleOnfocus}
          onBlur={handleOnblur}
        />
        <Tippy content={'Send'}>
          <button
            className="absolute right-0 top-[50%] flex h-8 w-8 translate-x-[-30%] translate-y-[-50%] items-center justify-center rounded bg-primary text-lg text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            type="submit"
            disabled={isDisabled}
          >
            <IoSend />
          </button>
        </Tippy>
      </form>
    </div>
  );
};

export default ChatFooter;
