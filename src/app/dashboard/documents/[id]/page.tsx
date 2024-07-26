import { adminDB } from '#/firebaseAdmin';
import PDFViewer from '@/components/Dashboard/PDFViewer';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

// Make sure there is some sort of check here to make sure that the owner of the document is the same as the user who is logged in.
async function ChatWithDocumentPage({ params: { id } }: { params: { id: string } }) {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDB.collection('users').doc(userId!).collection('files').doc(id).get();

  const url = ref.data()?.downloadURL;
  // console.log("🚀 ~ ChatWithDocumentPage ~ url:", url)
  // if (!url) {
  //   return <div>No URL</div>;
  // }

  return (
    <main className='grid h-full overflow-hidden lg:grid-cols-5'>
      {/* Right Side  */}
      <div className='col-span-5 overflow-y-auto lg:col-span-2'>{/* Chat Window  */}</div>
      {/* Left Side  */}
      <div className='lg:border-accent-2 col-span-5 border-r-2 bg-light-100/60 lg:col-span-3'>
        {/* PDF Viewer  */}
        <PDFViewer url={url} />
      </div>
    </main>
  );
}

export default ChatWithDocumentPage;
