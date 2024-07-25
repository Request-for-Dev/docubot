/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { storage, db } from '#/firebase';
import { useUser } from '@clerk/nextjs';
import { doc, setDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { generateVectorEmbeddings } from '@/actions/generateVectorEmbeddings';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export enum UploadStatusText {
  UPLOADING = 'Uploading document.',
  UPLOADED = 'Document uploaded.',
  SAVING = 'Saving document to database.',
  GENERATING = 'Generating AI Embeddings, please wait...',
  ERROR = 'There has been an error uploading your document.',
}

export type Status = UploadStatusText[keyof UploadStatusText];
function useUpload() {
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const { user } = useUser();

  const handleUploadDocument = async (file: File) => {
    if (!file || !user) return;

    // TODO: Free/Pro Limitations

    const fileToUploadToDB = uuidv4(); // example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

    const storageRef = ref(storage, `users/${user.id}/files/${fileToUploadToDB}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot: { bytesTransferred: number; totalBytes: number }) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setStatus(UploadStatusText.UPLOADING);
        setProgress(uploadProgress);
      },
      (error: Error) => {
        console.error('Error uploading the document:', error);
        // TODO: Send Error to Sentry
      },
      async () => {
        setStatus(UploadStatusText.UPLOADED);

        const docDownloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setStatus(UploadStatusText.SAVING);

        await setDoc(doc(db, 'users', user.id, 'files', fileToUploadToDB), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadURL: docDownloadURL,
          ref: uploadTask.snapshot.ref.fullPath,
          createdAt: new Date(),
        });

        setStatus(UploadStatusText.GENERATING);

        // Generate AI Vector Embeddings
        await generateVectorEmbeddings(fileToUploadToDB);

        setDocId(fileToUploadToDB);
      }
    );
  };
  return { progress, status, docId, handleUploadDocument };
}

export default useUpload;
