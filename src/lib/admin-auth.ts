const ADMIN_HASH = 'ee9a5c2516c45df10ca699c67ff7987d3f95000ece979c2b7f1b42417f7efcb4'
const SESSION_KEY = '__dlc_admin_session'
const SESSION_DURATION = 4 * 60 * 60 * 1000

async function sha256(message: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string): Promise<boolean> {
    const hash = await sha256(password)
    let match = true
    const h1 = hash
    const h2 = ADMIN_HASH
    if (h1.length !== h2.length) return false
    for (let i = 0; i < h1.length; i++) {
        if (h1[i] !== h2[i]) match = false
    }
    return match
}

export function setAdminSession(): void {
    if (typeof window === 'undefined') return
    const expires = Date.now() + SESSION_DURATION
    const token = btoa(JSON.stringify({ v: 1, exp: expires }))
    sessionStorage.setItem(SESSION_KEY, token)
}

export function isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = sessionStorage.getItem(SESSION_KEY)
    if (!token) return false
    try {
        const data = JSON.parse(atob(token))
        if (Date.now() > data.exp) {
            sessionStorage.removeItem(SESSION_KEY)
            return false
        }
        return true
    } catch {
        sessionStorage.removeItem(SESSION_KEY)
        return false
    }
}

export function clearAdminSession(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(SESSION_KEY)
}
