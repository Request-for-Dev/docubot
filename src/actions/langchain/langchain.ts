/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import pineconeClient from '@/lib/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { PineconeConflictError } from '@pinecone-database/pinecone/dist/errors';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';
import { adminDB } from '#/firebaseAdmin';
import { auth } from '@clerk/nextjs/server';

//Initialize the OpenAI model with LangChain using your API key
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4o',
});

export const indexName = 'docubot';

export async function generateDocs(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('No user logged in');
    //TODO: Send Error to Sentry
  }

  console.log('--- Fecthing the download URL from Firebase... ---');
  const firebaseRef = await adminDB
    .collection('users')
    .doc(userId)
    .collection('files')
    .doc(docId)
    .get();

  const downloadURL = firebaseRef.data()?.downloadURL;

  if (!downloadURL) {
    throw new Error('Download URL not found');
    //TODO: Send Error to Sentry
  }

  console.log(`--- Download URL fetched sucessfully. ${downloadURL} ---`);

  // Fetch the PDF from the specified URL
  const response = await fetch(downloadURL);

  // Load  the PDF into into a PDFDocument Object
  const data = await response.blob();

  //Load the PDF document from the specified path
  console.log('--- Loading PDF Document... ---');
  const loader = new PDFLoader(data);
  const docs = await loader.load();
  console.log('--- PDF Document loaded sucessfully. ---');

  //Split the PDF into smaller chunks for smoother processing
  console.log('--- Splitting PDF into smaller chunks... ---');
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`--- PDF Document split into ${splitDocs.length} chunks sucessfully. ---`);

  return splitDocs;
}
async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
  if (namespace === null) throw new Error('Namespace value is not provided'); //TODO: Send Error to Sentry
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
}
export async function generateEmbeddingsWithPineconeVectorStore(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('No user logged in');
    //TODO: Send Error to Sentry
  }

  let pineconeVectorStore;

  // Generate Vector Embeddings for the split documents with Pinecone
  console.log('--- Generating Vector Embeddings with Pinecone. Begin... ---');
  const embeddings = new OpenAIEmbeddings();
  const index = pineconeClient.index(indexName);

  const namespaceAlreadyExists = await namespaceExists(index, docId);
  if (namespaceAlreadyExists) {
    console.log(
      `--- ${docId} namespace already exsist in Pinecone. Reusing exsisting embeddings... ---`
    );

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  } else {
    // If the namespace does not exist, download the PDF file from Firebase Storage then generate the Vector Embeddings, and store them in Pinecone vectorr store.
    const splitDocs = await generateDocs(docId);

    console.log(
      `--- Storing Vector Embeddings in namespace ${docId} in the ${indexName} Pinecone Vector Store. Begin... ---`
    );

    pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  }
}
