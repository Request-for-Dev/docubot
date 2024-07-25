/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CheckCircle, CircleArrowDown, Hammer, Rocket, Save } from 'lucide-react';
import toast from 'react-hot-toast';
function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    toast.success(`DocuBot has consumed the Document: ${acceptedFiles[0].name}` as string);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({
    onDrop,
  });

  return (
    <div className='font mx-auto flex max-w-7xl flex-col items-center gap-4'>
      <div
        {...getRootProps()}
        className={`mt-12 flex h-86 w-[75%] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-10 text-center text-accent2 dark:border-accent2 dark:text-accent ${
          isDragAccept
            ? 'border-accent3 bg-accent4/50 dark:border-accent3 dark:bg-accent/40 dark:text-accent2'
            : 'border-accent bg-light-500/30 dark:bg-dark-600/30'
        } ${isFocused ? 'border-accent4' : 'border-accent'}`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center space-y-6'>
          <Image src='/logo.png' alt='' width={75} height={75} />
          {isDragActive ? (
            <>
              <Rocket className='h-14 w-14 animate-ping text-accent2' />
              <p>Drop Documents for DocuBot here...</p>
            </>
          ) : (
            <>
              <CircleArrowDown className='h-14 w-14 animate-caret-blink text-accent2 dark:text-accent' />
              <p>Feed me some Documents by dropping them in front of me or clicking here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
