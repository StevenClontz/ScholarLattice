import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { registrationWorksheetSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, `/collections/${params.id}`)
	}

	const { data: collection } = await supabase
		.from('collections')
		.select(`*`)
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const profile = await getProfile()
			
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}
	
	const { data: registration_options } = await supabase
		.from('registration_options')
		.select()
		.eq(`collection_id`, params.id)
	
	if (registration_options === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const { data: registrations, error: regError } = await supabase
		.from('registrations')
		.select(`
			id, created_at,
			registration_options(id, title),
			full_profiles(id, first_name, last_name, affiliation, website, verified, email)
		`)
		.in(`registration_option_id`, registration_options.map(ro=>ro.id))
		.order('created_at', {ascending: false})
	
	if (registrations === null) {
		console.log(regError)
		throw error(500, "Registrations could not be loaded from server. Please try again.")
	}

	const form = await superValidate(
		{ registrations },
		registrationWorksheetSchema
	);

	return { form, collection, registration_options }
}

export const actions = {
	default: async ({ params, request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			throw redirect(303, `/collections/${params.id}`)
		}

		const form = await superValidate(request, registrationWorksheetSchema);
		console.log('POST', form);
		
		if (!form.valid) {
			return fail(400, { form });
		}

		const profileStatusData = form.data.registrations.map(r=>{
			return {id: r.full_profiles?.id || "", verified: r.full_profiles?.verified || false}
		})
		console.log(profileStatusData)

		const { error: profileError } = await supabase
			.from('profiles_status')
			.upsert(profileStatusData)

		const registrationData = form.data.registrations.map(s=>{
			return {
				id: s.id || "", 
				profile_id: s.full_profiles?.id || "", 
				registration_option_id: s.registration_options?.id || ""
			}
		})
		console.log(registrationData)

		const { error: registrationError } = await supabase
			.from('registrations')
			.upsert(registrationData)

		if (profileError || registrationError) {
			console.log(profileError)
			console.log(registrationError)
			return fail(500, { form });
		}

		throw redirect(303, `/collections/${params.id}/registrations/manage`)
	}
}