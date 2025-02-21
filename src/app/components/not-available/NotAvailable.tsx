const NotAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#110d0d] text-white p-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">🚫 AI Features Not Available</h2>
            <p className="text-gray-300 mb-2">
                This feature requires <strong>Google Chrome</strong> with AI APIs enabled.
            </p>
            <ol className="text-gray-400 list-decimal list-inside mb-4">
                <li>Open <code className="bg-gray-700 p-1 rounded">chrome://flags/</code> in Chrome.</li>
                <li>Search for <strong>&quot;AI APIs&quot;</strong> and enable it.</li>
                <li>Restart Chrome and try again.</li>
            </ol>
            <p className="text-gray-500">If you&apos;re not using Chrome, try switching to it.</p>
        </div>
  )
}

export default NotAvailable
