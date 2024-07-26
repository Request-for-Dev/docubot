/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@/c/ui/button';
import { Loader2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer({ url }: { url: string }) {
  console.log('🚀 ~ PDFViewer ~ url:', url);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('🚀 ~ fetchFile ~ url:', url);

        const file = await response.blob();
        setFile(file);
      } catch (error) {
        console.error('Error fetching file:', error);
        setError('Failed to fetch PDF file');
      }
    };
    fetchFile();
  }, [url]);

  const onDocumentLoadSucess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
    setLoading(false);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='sticky top-0 z-50 rounded-b-lg bg-light-500/30 p-2'>
        <div className='grid max-w-6xl grid-cols-6 gap-2 px-2'>
          <Button
            variant='outline'
            className=''
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              }
            }}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <p className='flex items-center justify-center'>
            {pageNumber} of {numPages}
          </p>
          <Button
            variant='outline'
            className=''
            onClick={() => {
              if (pageNumber < numPages!) {
                setPageNumber(pageNumber + 1);
              }
            }}
            disabled={pageNumber >= numPages!}
          >
            Next
          </Button>

          <Button
            variant='outline'
            className=''
            onClick={() => setRotation((rotation + 90) % 360)}
          >
            <RotateCw className='text-accent2' />
          </Button>
          <Button
            variant='outline'
            className=''
            onClick={() => setScale(scale * 1.2)}
            disabled={scale >= 1.5}
          >
            <ZoomIn className='text-accent2' />
          </Button>
          <Button
            variant='outline'
            className=''
            onClick={() => setScale(scale / 1.2)}
            disabled={scale <= 0.5}
          >
            <ZoomOut className='text-accent2' />
          </Button>
        </div>
      </div>

      <div className='h-full'>
        {!file ? (
          <Loader2 className='mt-20 h-20 w-20 animate-spin-slow text-accent2' />
        ) : (
          <Document
            file={file}
            loading={null}
            onLoadSuccess={onDocumentLoadSucess}
            onLoadError={(error) => {
              console.log('Error loading the file:', error);
              setError('Failed to load PDF file');
            }}
            rotate={rotation}
            className='m-4 overflow-scroll'
          >
            <Page pageNumber={pageNumber} scale={scale} className='shadow-lg' />
          </Document>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
