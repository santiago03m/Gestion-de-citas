import api from './api'


export type AuthResponse = {
	accessToken: string
	refreshToken?: string
	roles?: string[]
	email?: string
}

export async function loginRequest(email: string, password: string) {
	const body = { email, password }
		const res = await api.post<AuthResponse>('/auth/authenticate', body)
	return res.data
}

export function saveTokens(data: AuthResponse) {
	// Ajusta según lo que devuelva tu backend
	localStorage.setItem('accessToken', data.accessToken)
	if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
	if (data.roles) localStorage.setItem('roles', JSON.stringify(data.roles))
	if (data.email) localStorage.setItem('username', data.email)
}


export function clearAuth() {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('roles')
	localStorage.removeItem('username')
}
