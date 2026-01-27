import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-snow">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-oxblood">Marketing Studio</h1>
        </div>
        <div className="space-y-4">
          <Link
            href="/editor"
            className="block p-6 bg-white rounded-lg border border-opal hover:border-basalt transition-colors"
          >
            <h2 className="text-xl font-semibold text-oxblood mb-2">Mockup Editor</h2>
            <p className="text-gray-600">Create and edit ad copy mockups with AI assistance</p>
          </Link>
          <Link
            href="/campaigns"
            className="block p-6 bg-white rounded-lg border border-opal hover:border-basalt transition-colors"
          >
            <h2 className="text-xl font-semibold text-oxblood mb-2">Campaigns</h2>
            <p className="text-gray-600">Manage your marketing campaigns and mockups</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
