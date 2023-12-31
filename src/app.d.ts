import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './types/supabase.ts'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			getProfile(): Promise<Database["public"]["Tables"]["full_profiles"]["Row"] | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Error {}
		// interface Platform {}
	}
}
