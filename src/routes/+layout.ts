import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_CLIENT_URL } from '$env/static/public'
import type { Database } from '../types'
import type { LayoutLoad } from './$types'
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_CLIENT_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch,
        },
        cookies: {
            get(key) {
                if (!isBrowser()) {
                    return JSON.stringify(data.session)
                }

                const cookie = combineChunks(key, (name) => {
                    const cookies = parse(document.cookie)
                    return cookies[name]
                })
                return cookie
            },
        },
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    let profile:Database["public"]["Tables"]["profiles"]["Row"]|null = null

    if (session) {
        const client = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
            .single() 
        profile = client.data
    }

    return { supabase, session, profile }
}