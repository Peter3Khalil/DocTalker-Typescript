import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { cn } from '../../utils/helperFunctions';
import Link from 'next/link';
export type Chat = {
  id: string;
  name: string;
};

const ChatItem: FC<Chat> = ({ id, name }) => {
  const router = useRouter();
  const { chatId: activeChatId } = router.query;
  const isActive = activeChatId == id;
  return (
    <li
      className={cn(
        'mb-1 w-full overflow-hidden whitespace-nowrap break-all rounded',
        {
          'hover:bg-muted/20 dark:hover:bg-muted-foreground/20': !isActive,
          'bg-primary': isActive,
        },
      )}
    >
      <Link href={`/chat/${id}`}>
        <p className="w-full overflow-hidden  text-ellipsis p-2 text-md leading-none">
          {name}
        </p>
      </Link>
    </li>
  );
};
export default ChatItem;
