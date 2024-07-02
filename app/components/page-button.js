export default function PageTypes({ page, onClick }) {
  return (
    <div className="flex items-center justify-center bg-gray-300 text-black font-indie-flower px-3 py-8 mr-4 rounded-md border border-black hover:bg-gray-400 text-4xl">
      <button onClick={onClick}>
        <p>{page}</p>
      </button>
    </div>
  );
}
