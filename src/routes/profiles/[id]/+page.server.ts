import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getProfile  }, params }) => {

	const { data: profile } = await supabase
		.from('full_profiles')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (profile === null) {
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	const { data: submissions } = await supabase
		.from('submissions')
		.select()
		.eq(`profile_id`, params.id)

	const userProfile = await getProfile()

	return { profile, submissions, userProfile }
}
