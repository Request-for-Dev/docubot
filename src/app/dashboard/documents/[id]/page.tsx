import React from 'react';

// Make sure there is some sort of check here to make sure that the owner of the document is the same as the user who is logged in.
function ChatWithDocumentPage({ params: { id } }: { params: { id: string } }) {
  return <div>ChatWithDocumentPage: {id}</div>;
}

export default ChatWithDocumentPage;
