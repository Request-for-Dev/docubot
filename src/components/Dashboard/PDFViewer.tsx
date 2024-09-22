'use client';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { Button } from '@/c/ui/button';
import { Loader2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Input } from '../ui/input';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(0.9);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const file = await response.blob();
        setFile(file);
      } catch (error) {
        console.error('Error fetching file:', error);
        setError('Failed to fetch PDF file');
      }
    };
    fetchFile();
  }, [url]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, numPages)));
  };

  const handlePageNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      handlePageChange(value);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='sticky top-0 z-50 rounded-b-lg bg-accent3/30 p-2'>
        <div className='grid max-w-6xl grid-cols-6 gap-2'>
          <Button
            variant='outline'
            className=''
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <div className='flex items-center justify-center'>
            <Input
              type='number'
              min={1}
              max={numPages}
              value={currentPage}
              onChange={handlePageNumberInput}
              className='mr-2 w-16 text-center'
            />
            of {numPages}
          </div>
          <Button
            variant='outline'
            className=''
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= numPages}
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

      <div className=''>
        {!file ? (
          <Loader2 className='mt-20 h-20 w-20 animate-spin-slow text-accent2' />
        ) : (
          <Document
            file={file}
            loading={null}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              setError('Failed to load PDF file');
            }}
            rotate={rotation}
            className='m-4 overflow-scroll'
          >
            <Page pageNumber={currentPage} scale={scale} className='shadow-lg' />
          </Document>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
