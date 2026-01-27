import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-snow flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-oxblood mb-2">404 - Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-ember text-frost rounded-lg hover:bg-ember/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
