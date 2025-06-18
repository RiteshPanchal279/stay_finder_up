import { Link } from "react-router-dom";

export default function Header({ isLoggedIn, userRole, onLogout }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-700">StayFinder</h1>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {userRole === "host" && (
                  <Link
                    to="/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
