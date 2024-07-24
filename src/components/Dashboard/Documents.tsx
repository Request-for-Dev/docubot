import PlaceholderDocument from './PlaceholderDocument';

function Documents() {
  return (
    <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-5 rounded-md bg-dark-700/40 p-5 lg:justify-start'>
      {/* Map through the Users Documents. */}

      {/* Placeholder Document Card  */}
      <PlaceholderDocument />
    </div>
  );
}

export default Documents;
