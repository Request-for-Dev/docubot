/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { db } from '#/firebase';
import { useUser } from '@clerk/nextjs';
import { collection, doc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

// number of documents by subscription tier
const FREE_DOC_LIMIT = 2;
const PRO_DOC_LIMIT = 20;
function useSubscription() {
  const [hasActiveMembership, setHasActiveMembership] = useState(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const { user } = useUser();

  // Listen to the User document for changes
  const [snapshot, loading, error] = useDocument(user && doc(db, 'users', user.id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // Listen to the User's Documents collection for changes
  const [docsSnapshot, docsLoading, docsError] = useCollection(
    user && collection(db, 'users', user.id, 'files')
  );

  // Realtime listener for the users collections
  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();
    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);
  }, [snapshot]);

  useEffect(() => {
    if (!docsSnapshot || hasActiveMembership === null) return;

    const docs = docsSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_DOC_LIMIT : FREE_DOC_LIMIT;

    console.log('Checking if the user is over the Doc Limit.', docs.length, usersLimit);
    if (docs.length >= usersLimit) {
      setIsOverFileLimit(true);
    } else {
      setIsOverFileLimit(false);
    }
  }, [docsSnapshot, hasActiveMembership]);

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
