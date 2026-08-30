// Official Admin Password SHA-256 Hash for "Mflica2026deeplink@"
const ADMIN_HASH = 'fc61bcffaee1dd2f53bb895a39d2d864a24fae9e6aa20992d3cf613735279966'
const SESSION_KEY = '__dlc_admin_session'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

async function sha256(message: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string): Promise<boolean> {
    const hash = await sha256(password)
    return hash === ADMIN_HASH
}

export function setAdminSession(): void {
    if (typeof window === 'undefined') return
    const expires = Date.now() + SESSION_DURATION
    const token = btoa(JSON.stringify({ v: 1, exp: expires }))
    sessionStorage.setItem(SESSION_KEY, token)
    localStorage.setItem(SESSION_KEY, token)
}

export function isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY)
    if (!token) return false
    try {
        const data = JSON.parse(atob(token))
        if (Date.now() > data.exp) {
            sessionStorage.removeItem(SESSION_KEY)
            localStorage.removeItem(SESSION_KEY)
            return false
        }
        return true
    } catch {
        sessionStorage.removeItem(SESSION_KEY)
        localStorage.removeItem(SESSION_KEY)
        return false
    }
}

export function clearAdminSession(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(SESSION_KEY)
}
