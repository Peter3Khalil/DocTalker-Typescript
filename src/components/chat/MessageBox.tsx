import React, { FC, useEffect, useState } from 'react';
import { cn } from '../../utils/helperFunctions';
import { Doc } from '../shared/Logo';
import { FaUser } from '../shared/Icons';

const formatText = (text: string) => {
  //Replace all - with •
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (line.startsWith('-')) {
      lines[index] = line.replace('-', '•');
    }
  });
  text = lines.join('\n');
  return text;
};

type MessageBoxProps = {
  message: string;
  isBot?: boolean;
};
const MessageBox: FC<MessageBoxProps> = ({ message, isBot = false }) => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsDisplayed(true);
    }, 100);
  }, []);
  return (
    <div
      className={cn(
        'flex w-full items-center rounded bg-accent px-4 py-3 text-accent-foreground  opacity-0 transition-all duration-300 ease-in-out',
        {
          'bg-primary text-primary-foreground': !isBot,
          'opacity-100': isDisplayed,
        },
      )}
    >
      <div className="flex items-start gap-1">
        {isBot ? (
          <h3 className="text-[10px]">
            <Doc className="rounded-md" />
          </h3>
        ) : (
          <FaUser className="shrink-0" />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-md font-bold leading-none">
            {isBot ? 'Talker' : 'You'}
          </h1>
          <p className="break-before-all whitespace-pre-line text-sm">
            {message.startsWith('Typing') ? (
              <h1 className="animate-pulse text-lg font-bold">Typing...</h1>
            ) : (
              formatText(message)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
