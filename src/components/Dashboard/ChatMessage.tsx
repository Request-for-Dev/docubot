import React from 'react';
// eslint-disable-next-line import/no-cycle
import { Message } from './ChatWindow';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { BotMessageSquare } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import CodeBlock from './CodeBlock';
import { MarkdownRenderer } from './Markdown';
function ChatMessage({ message }: { message: Message }) {
  const isHuman = message.role === 'human';
  const { user } = useUser();

  return (
    <div className={`chat w-full ${isHuman ? 'chat-end flex flex-row-reverse' : 'chat-start'}`}>
      <div className='chat-image-avatar'>
        <div className='w-10 rounded-full'>
          {isHuman ? (
            user?.imageUrl && (
              <Image
                src={user.imageUrl}
                width={40}
                height={40}
                alt='user'
                className='rounded-full'
              />
            )
          ) : (
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
              <BotMessageSquare className='h-6 w-6 text-white' />
            </div>
          )}
        </div>
      </div>

      <div className={`chat-bubble prose ${isHuman && 'bg-accent2 text-white'}`}>
        <MarkdownRenderer>{message.message}</MarkdownRenderer>
      </div>
    </div>
  );
}

export default ChatMessage;
