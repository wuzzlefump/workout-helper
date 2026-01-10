"use client";
export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">You are offline</h1>
      <p className="text-gray-600 mb-6">
        It looks like you don't have an internet connection. Some parts of the
        app may be unavailable.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition-transform"
      >
        Try Again
      </button>
    </div>
  );
}
