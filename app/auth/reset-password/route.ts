import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Handles the password reset redirect from Supabase email links.
 * Supabase appends ?code=... (PKCE) or #access_token=... (implicit).
 * We exchange the code for a session and forward the user to the
 * reset-password UI page.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      const base = isLocalEnv
        ? origin
        : forwardedHost
          ? `https://${forwardedHost}`
          : origin

      return NextResponse.redirect(`${base}/reset-password`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Invalid+or+expired+reset+link`)
}
