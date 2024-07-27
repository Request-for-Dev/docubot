import { auth } from '@clerk/nextjs/server';
import PlaceholderDocument from './PlaceholderDocument';
import { adminDb } from '#/firebaseAdmin';
import { FileText, Download, Trash2 } from 'lucide-react';
async function Documents() {
  auth().protect();

  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const documentsSnapshot = await adminDb
    .collection('users')
    .doc(userId)
    .collection('files')
    .get();

  return (
    <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-5 rounded-md bg-dark-700/40 p-5 lg:justify-start'>
      {/* Map through the Users Documents. */}
      {documentsSnapshot.docs.map((document) => (
        <div
          key={document.id}
          className='m-2 flex h-80 w-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-md'
        >
          <div className='flex items-center justify-center bg-blue-500 p-4'>
            <FileText className='text-white' size={48} />
          </div>
          <div className='flex flex-grow flex-col justify-between p-4'>
            <div>
              <h3 className='mb-1 truncate text-sm font-bold text-gray-800'>
                {document.data().name}
              </h3>
              <p className='text-xs text-gray-600'>Size: {document.data().size}</p>
            </div>
            <div className='flex flex-col space-y-2'>
              <button
                disabled
                className='flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600'
              >
                <Download className='mr-2' size={14} />
                Download
              </button>
              <button className='flex w-full items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-red-600'>
                <Trash2 className='mr-2' size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Placeholder Document Card  */}
      <PlaceholderDocument />
    </div>
  );
}

export default Documents;
