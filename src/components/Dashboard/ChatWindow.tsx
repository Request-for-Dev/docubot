//ChatWindow.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { FormEvent, useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '@/c/ui/button';
import { Input } from '@/c/ui/input';
import { Loader2 } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { db } from '#/firebase';
import { collection, orderBy, query } from '@firebase/firestore';
import toast from 'react-hot-toast';

// import ChatMessage from '@/components/Dashboard/ChatMessage';
// eslint-disable-next-line import/no-cycle
import { askQuestion } from '@/actions/openAI/askQuestion';

export type Message = {
  id?: string;
  role: 'human' | 'ai' | 'placeholder';
  message: string;
  createdAt: Date;
};
function ChatWindow({ id }: { id: string }) {
  const { user } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const [snapshot, loading, error] = useCollection(
    user &&
      query(collection(db, 'users', user?.id, 'files', id, 'chat'), orderBy('createdAt', 'asc'))
  );

  useEffect(() => {
    if (!snapshot) return;
    console.log('Updated snapshot', snapshot.docs);

    const lastMessage = messages.pop();

    if (lastMessage?.role === 'ai' && lastMessage.message === 'DocuBot is thinking...') {
      //return this as a dummy place holder message
      return;
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();
      return { id: doc.id, role, message, createdAt: createdAt.toDate() };
    });
    setMessages(newMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = input;
    setInput('');

    //Optimistic Message Update
    setMessages((prev) => [
      ...prev,
      { role: 'human', message: q, createdAt: new Date() },
      { role: 'ai', message: 'DocuBot is thinking...', createdAt: new Date() },
    ]);

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      console.log('DEBUG', success, message);

      if (!success) {
        toast.error(`Error: ${message}`);

        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: 'ai',
              message: `Oops, there was an Error: ${message}`,
              createdAt: new Date(),
            },
          ])
        );
      } else {
        toast.success('DocuBot has answered your question!');
        // Handle successful case here if needed
      }
    });
  };
  return (
    <div className='flex h-[90%] flex-col overflow-y-scroll'>
      {/* Chat Contents  */}
      <div className='w-full flex-1'>
        {/* Chat Messages  */}

        {messages.map((message) => (
          <div key={message.id} className='flex flex-col space-y-1'>
            {/* <ChatMessage message={message} /> */}
            <div className='flex items-center space-x-2'>
              <div
                className={`flex items-center space-x-1 ${message.role === 'ai' ? 'text-accent' : 'text-primary'}`}
              >
                <span className='font-bold'>{message.role === 'ai' ? 'DocuBot' : 'You'}</span>
                <span className='text-xs'>{message.createdAt.toLocaleString()}</span>
              </div>
              <div>{message.message}</div>
            </div>
          </div>
        ))}
      </div>
      <form
        action=''
        onSubmit={handleSubmit}
        className='sticky bottom-0 flex space-x-2 bg-accent2/75 p-5'
      >
        <Input placeholder='' value={input} onChange={(e) => setInput(e.target.value)} />
        <Button type='submit' disabled={!input || isPending}>
          {isPending ? <Loader2 className='animate-spin-slow text-accent' /> : 'Ask'}
        </Button>
      </form>
    </div>
  );
}

export default ChatWindow;
