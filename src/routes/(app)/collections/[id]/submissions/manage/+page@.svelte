<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';
	import { superForm } from 'sveltekit-superforms/client';
	export let data
	const { form, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json'
	});
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
    import { DataTransferDownIcon } from '@indaco/svelte-iconoir/data-transfer-down';
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Manage Submissions for {data.collection.short_title}: {data.collection.title}
</h2>

<form method="POST" use:enhance>
	<div>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Abstract</th>
					<th>Submitter Name</th>
					<th>Affiliation</th>
					<th>Profile Approval</th>
					<th>Submission Status</th>
				</tr>
			</thead>
			<tbody>
				{#each $form.submissions as submission, i}
					<tr>
						<td>
							<Markdown md={submission.title || ""} {plugins}/>
						</td>
						<td>
							<Markdown md={submission.abstract || ""} {plugins}/>
						</td>
						<td>
							{submission.profiles?.first_name} {submission.profiles?.last_name}
							<small>[<a target="_blank" href={`/profiles/${submission.profiles?.id}`}>View Profile</a>]</small>
						</td>
						<td>
							{submission.profiles?.affiliation}
						</td>
						<td style="text-align:center">
							{#if submission.profiles?.profiles_status}
								<input
									type="checkbox"
									bind:checked={submission.profiles.profiles_status.verified}
									/>
								{#if $tainted?.submissions?.[i]?.profiles?.profiles_status?.verified}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
						</td>
						<td>
							{#if submission.submissions_status}
								<select bind:value={submission.submissions_status.status}>
									<option value="submitted">
										Submitted
									</option>
									<option value="accepted">
										Accepted
									</option>
									<option value="declined">
										Declined
									</option>
								</select>
								{#if $tainted?.submissions?.[i]?.submissions_status?.status}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
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
	{#if $errors.submissions}
		There was an error in saving changes.
	{/if}
</form>


{#if dev}
	<SuperDebug data={$form} />
{/if}