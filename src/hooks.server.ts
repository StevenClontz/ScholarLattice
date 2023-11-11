import { PUBLIC_SUPABASE_SERVER_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import type { Database } from './types'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient<Database>(PUBLIC_SUPABASE_SERVER_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: event.cookies
  })

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  event.locals.getProfile = async () => {
    const session = await event.locals.getSession()
    if (session) {
      const { data: profile  } = await event.locals.supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .single() 
      return profile
    }
    return null
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}