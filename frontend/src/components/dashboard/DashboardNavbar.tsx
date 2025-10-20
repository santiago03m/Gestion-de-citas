type DashboardNavbarProps = {
  username?: string;
  roles?: string[];
  onLogout: () => void;
};

export default function DashboardNavbar({ username, roles, onLogout }: DashboardNavbarProps) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="h-6 w-6 text-white"
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">Gestión de Citas</p>
            </div>
          </div>

          {/* User info y logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {username || "Usuario"}
              </p>
              <p className="text-xs text-gray-500">
                {roles && roles.length > 0
                  ? roles
                      .map((role) => role.charAt(0) + role.slice(1).toLowerCase())
                      .join(", ")
                  : "Usuario"}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="btn-danger"
              title="Cerrar sesión"
            >
              <span className="hidden sm:inline">Cerrar sesión</span>
              <svg
                className="sm:hidden h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
