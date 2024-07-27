/* eslint-disable import/prefer-default-export */
'use server';

import { adminDb } from '#/firebaseAdmin';
// eslint-disable-next-line import/no-cycle
import { Message } from '@/components/Dashboard/ChatWindow';
import { auth } from '@clerk/nextjs/server';
import { generateLangChainCompletion } from '../langchain/langchain';

const FREE_LIMIT = 10;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PRO_LIMIT = 100;
export async function askQuestion(id: string, question: string) {
  auth().protect();
  const { userId } = await auth();

  const chatRef = adminDb
    .collection('users')
    .doc(userId!)
    .collection('files')
    .doc(id)
    .collection('chat');

  //Check how many questions the user has asked
  const chatSnapshot = await chatRef.get();
  const userMessages = chatSnapshot.docs.filter((doc) => doc.data().role === 'human');

  // Tomorrow Limit the users by tier

  const userMessage: Message = {
    role: 'human',
    message: question,
    createdAt: new Date(),
  };

  if (userMessages.length < FREE_LIMIT) {
    await chatRef.add(userMessage);
  } else {
    return {
      success: false,
      message: 'You have reached the free limit of 3 questions',
    };
  }

  //Generate AI response
  const reply = await generateLangChainCompletion(id, question);

  const aiMessage: Message = {
    role: 'ai',
    message: reply,
    createdAt: new Date(),
  };

  await chatRef.add(aiMessage);

  return {
    success: true,
    message: null,
  };
}
