<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';
	import { superForm } from 'sveltekit-superforms/client';
	export let data
	const { form, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json'
	});
    import { DataTransferDownIcon } from '@indaco/svelte-iconoir/data-transfer-down';
	import Gravatar from '$lib/Gravatar.svelte';
	$: emails = $form.registrations
		.map(s=>s.full_profiles?.email).join(", ")
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Manage Registrations for {data.collection.short_title}: {data.collection.title}
</h2>

<h3>Emails for registrations</h3>
<textarea readonly style="width:100%">{emails}</textarea>

<h3>
	All registrations ({$form.registrations.length})
	{#if $tainted}
		<DataTransferDownIcon/>
	{/if}
</h3>
<form method="POST" use:enhance>
	<div>
		<table>
			<thead>
				<tr>
					<th>Registrant</th>
					<th>Affiliation</th>
					<th>Profile Approval</th>
					<th>Registration Option</th>
					<th>Registered On</th>
				</tr>
			</thead>
			<tbody>
				{#each $form.registrations as registration, i}
					<tr>
						<td>
							<Gravatar email={registration.full_profiles?.email} size={25}/>
							{registration.full_profiles?.first_name} {registration.full_profiles?.last_name}
							<a href={`mailto:${registration.full_profiles?.email}`}><code>{registration.full_profiles?.email}</code></a>
							<small>[<a target="_blank" href={`/profiles/${registration.full_profiles?.id}`}>View Profile</a>]</small>
						</td>
						<td>
							{registration.full_profiles?.affiliation}
						</td>
						<td style="text-align:center">
							{#if registration.full_profiles}
								<input
									type="checkbox"
									bind:checked={registration.full_profiles.verified}
									/>
								{#if $tainted?.registrations?.[i]?.full_profiles?.verified}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
						</td>
						<td>
							{#if registration.registration_options}
								<select bind:value={registration.registration_options.id}>
									{#each data.registration_options as option}
										<option value={option.id}>
											{option.title}
										</option>
									{/each}
								</select>
								{#if $tainted?.registrations?.[i]?.registration_options?.id}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
						</td>
						<td style="font-size:0.8em">
							{new Date(registration.created_at).toLocaleDateString()}
							{new Date(registration.created_at).toLocaleTimeString()}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<button name="submit" disabled={!$tainted}>
		{#if $tainted}
			Save changes <DataTransferDownIcon/>
		{:else}
			All changes saved
		{/if}
	</button>
	{#if $errors.registrations}
		There was an error in saving changes.
	{/if}
</form>


{#if dev}
	<SuperDebug data={$form} />
{/if}

<style>
	@media (max-width: 1024px) {
		table tr {
			border-bottom: 1px solid black;
		}
	}
	@media (min-width: 1025px) {
		table td {
			border-bottom: 1px solid black;
		}
	}
</style>