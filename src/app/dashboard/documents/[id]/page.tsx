import { adminDb } from '#/firebaseAdmin';
import ChatWindow from '@/components/Dashboard/ChatWindow';
import PDFViewer from '@/components/Dashboard/PDFViewer';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

// Make sure there is some sort of check here to make sure that the owner of the document is the same as the user who is logged in.
async function ChatWithDocumentPage({ params: { id } }: { params: { id: string } }) {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDb.collection('users').doc(userId!).collection('files').doc(id).get();
  const url = ref.data()?.downloadURL;

  return (
    <div className='flex h-[calc(100vh-64px)] flex-col overflow-hidden lg:flex-row'>
      <div className='border-accent-200 dark:border-accent-700 h-1/2 w-full border-b lg:h-full lg:w-1/2 lg:border-b-0 lg:border-r'>
        <PDFViewer url={url} />
      </div>
      <div className='h-1/2 w-full lg:h-full lg:w-1/2'>
        <ChatWindow id={id} />
      </div>
    </div>
  );
}

export default ChatWithDocumentPage;
