<script lang="ts">
    import { UserIcon } from '@indaco/svelte-iconoir/user'
    import { UserBadgeCheckIcon } from '@indaco/svelte-iconoir/user-badge-check'
  	import Gravatar from '$lib/Gravatar.svelte'
	export let data
	const {submissions, registrations, profile, userProfile } = data
</script>

<div style="display:inline-block;float:right">
	<Gravatar email={profile.email} size={150} rating="pg"/>
</div>

<h2 style="margin-top:0">
	Profile
</h2>

{#if userProfile && profile.id === userProfile.id }
	<p><a href={`/profiles/${profile.id}/edit`}>Edit your Profile</a></p>
{/if}

<h3>
	{profile.first_name} {profile.last_name}
	{#if profile.verified}
		<span title="Verified"><UserBadgeCheckIcon/></span>
	{:else}
		<UserIcon/>
	{/if}
</h3>
{#if profile.affiliation && profile.affiliation !== ""}
	<h4>{profile.affiliation}</h4>
{/if}
<ul>
	<li>
		<a href={`mailto:${profile.email}`}>{profile.email}</a>
	</li>
    {#if profile.website && profile.website !== ""}
        <li><a href={profile.website}>{profile.website}</a></li>
    {/if}
</ul>

{#if submissions && submissions.length > 0}
<h3>Submissions</h3>
<ul>
	{#each submissions as submission}
		<li>
			<a href={`/collections/${submission.collection_id}`}>
				{submission.title}
			</a>
		</li>
	{/each}
</ul>
{/if}

{#if registrations && registrations.length > 0}
<h3>Registrations</h3>
<ul>
	{#each registrations as registration}
		<li>
			<a href={`/collections/${registration.registration_options?.collections?.id}`}>
				{registration.registration_options?.collections?.title}
			</a>:
			{registration.registration_options?.title}
		</li>
	{/each}
</ul>
{/if}