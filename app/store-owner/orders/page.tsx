export default function OrdersPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Orders Dashboard</h1>
        <p className="text-xl text-gray-600 mb-6">Coming Soon!</p>
        <div className="w-24 h-24 rounded-full bg-blue-100 animate-pulse flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-500 mt-6">We're working hard to bring you a better way to manage your orders.</p>
      </div>
    </div>
  )
}
