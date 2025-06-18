export default function HeroSection({ searchTerm, onSearchChange }) {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl mb-8">
          Discover amazing places to stay around the world
        </p>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by location or property name..."
            className="w-full px-4 py-3 bg-blue-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </section>
  );
}
