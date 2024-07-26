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
  const [numPages, setNumPages] = useState<number>();
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
    <div>
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
  );
}

export default PDFViewer;
