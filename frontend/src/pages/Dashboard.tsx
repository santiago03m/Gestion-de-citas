import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../hooks/useAuth'

type Paciente = {
  id: number
  nombre: string
  documento?: string
  telefono?: string
  correo?: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, auth } = useAuth()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)

    ;(async () => {
      try {
        const res = await api.get('/pacientes')
        if (!mounted) return

        const payload = res.data
        let list: Paciente[] = []
        if (Array.isArray(payload)) {
          list = payload
        } else if (payload && Array.isArray(payload.data)) {
          list = payload.data
        } else if (payload && Array.isArray(payload.pacientes)) {
          list = payload.pacientes
        } else {
          console.warn('Unexpected payload for /pacientes:', payload)
        }

        setPacientes(list)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la lista de pacientes')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Título */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
                <p className="text-sm font-medium text-gray-900">{auth?.username || 'Usuario'}</p>
                <p className="text-xs text-gray-500">
                  {auth?.roles && auth.roles.length > 0 
                    ? auth.roles.map(role => role.charAt(0) + role.slice(1).toLowerCase()).join(', ')
                    : 'Usuario'}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-danger"
                title="Cerrar sesión"
              >
                <span className="hidden sm:inline">Cerrar sesión</span>
                <svg className="sm:hidden h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Card principal */}
        <div className="card">
          {/* Header de la card */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
                <p className="text-sm text-gray-600 mt-1">Lista completa de pacientes registrados</p>
              </div>
              <button className="btn-primary">
                <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Paciente
              </button>
            </div>
          </div>

          {/* Estados de carga */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 font-medium">Cargando pacientes...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 text-red-600 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Error al cargar datos</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Tabla de pacientes */}
          {!loading && !error && (
            <>
              {pacientes.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No hay pacientes</h3>
                  <p className="mt-2 text-sm text-gray-600">Comienza agregando tu primer paciente</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pacientes.map((p) => (
                        <tr key={p.id}>
                          <td className="font-mono text-xs">{p.id}</td>
                          <td className="font-medium text-gray-900">{p.nombre}</td>
                          <td className="text-gray-600">{p.documento || '-'}</td>
                          <td className="text-gray-600">{p.telefono || '-'}</td>
                          <td className="text-gray-600">{p.correo || '-'}</td>
                          <td>
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                title="Ver detalles"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button 
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150"
                                title="Editar"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                title="Eliminar"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Paginación (placeholder) */}
              {pacientes.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Mostrando <span className="font-medium">{pacientes.length}</span> paciente(s)
                  </p>
                  <div className="flex gap-2">
                    <button className="btn-secondary" disabled>Anterior</button>
                    <button className="btn-secondary" disabled>Siguiente</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
