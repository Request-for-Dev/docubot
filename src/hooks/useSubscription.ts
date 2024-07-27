'use client';

import { db } from '#/firebase';
import { useUser } from '@clerk/nextjs';
import { collection, doc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const FREE_DOC_LIMIT = 2;
const PRO_DOC_LIMIT = 20;

function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState<boolean | null>(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  console.log('🚀 ~ useSubscription ~ isOverFileLimit:', isOverFileLimit);
  const { user } = useUser();

  const userDocRef = user ? doc(db, 'users', user.id) : null;
  const userFilesCollectionRef = user ? collection(db, 'users', user.id, 'files') : null;

  const [snapshot, loading, error] = useDocument(userDocRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [docsSnapshot, docsLoading, docsError] = useCollection(userFilesCollectionRef);

  useEffect(() => {
    console.log('🚀 ~ DEBUG ~ snapshot from useEffect #1 Hook:', snapshot);
    if (snapshot && snapshot.exists()) {
      const data = snapshot.data();
      console.log('🚀 ~ DEBUG ~ data from useEffect #1 Hook:', data);
      setHasActiveMembership(data?.hasActiveMembership ?? false);
    } else {
      setHasActiveMembership(false);
    }
  }, [snapshot]);

  useEffect(() => {
    if (!docsSnapshot || hasActiveMembership === null) return;

    const docs = docsSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_DOC_LIMIT : FREE_DOC_LIMIT;
    console.log('🚀 ~ DEBUG ~ docs from useEffect#2 Hook:', docs);
    console.log('Checking if the user is over the Doc Limit.', docs.length, usersLimit);
    setIsOverFileLimit(docs.length >= usersLimit);
  }, [docsSnapshot, hasActiveMembership]);

  console.log('🚀 ~ DEBUG ~ hasActiveMembership from pre return:', hasActiveMembership);

  return {
    hasActiveMembership,
    isOverFileLimit,
    loading,
    error,
    docsLoading,
    docsError,
  };
}

export default useSubscription;
