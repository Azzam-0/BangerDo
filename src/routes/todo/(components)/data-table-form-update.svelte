<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { taskSchema, type Task } from '../(data)/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';
	import { labels } from '../(data)/data.js';
	import { statuses } from '../(data)/data.js';
	import { priorities } from '../(data)/data.js';
	import { showDialog } from './show-dialog';

	export let row: Task;

	const form = superForm(row, {
		validators: zodClient(taskSchema),
		onResult({ result }) {
			if (result.type === 'success') {
				console.log('SUCCESS');
			}
		}
	});

	const { form: formData, enhance } = form;

	$: selectedPriority = $formData.priority
		? {
				label: $formData.priority,
				value: $formData.priority
			}
		: undefined;

	$: selectedLabel = $formData.label
		? {
				label: $formData.label,
				value: $formData.label
			}
		: undefined;

	$: selectedStatus = $formData.status
		? {
				label: $formData.status,
				value: $formData.status
			}
		: undefined;
</script>

<Dialog.Root bind:open={$showDialog}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title class="text-center">Update this todo</Dialog.Title>
			<Dialog.Description class="text-center">
				Make sure you make it clear and small!
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/update" use:enhance>
			{row.id}
			<input hidden name="id" value={row.id} />
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} name="title" bind:value={$formData.title} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="label">
				<Form.Control let:attrs>
					<Form.Label>Label</Form.Label>
					<Select.Root
						selected={selectedLabel}
						onSelectedChange={(v) => {
							v && ($formData.label = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="label" />
						</Select.Trigger>
						<Select.Content>
							{#each labels as label}
								<Select.Item value={label.value} label={label.label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden value={$formData.label} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="status">
				<Form.Control let:attrs>
					<Form.Label>Status</Form.Label>
					<Select.Root
						selected={selectedStatus}
						onSelectedChange={(v) => {
							v && ($formData.status = v.value);
							console.log(row);
						}}
					>
						<Select.Trigger {...attrs} class="form-control w-full">
							<Select.Value placeholder="Status" />
						</Select.Trigger>
						<Select.Content>
							{#each statuses as status}
								<Select.Item value={status.value} label={status.label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden value={$formData.status} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="priority">
				<Form.Control let:attrs>
					<Form.Label>Priority</Form.Label>
					<Select.Root
						selected={selectedPriority}
						onSelectedChange={(v) => {
							v && ($formData.priority = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Priority" />
						</Select.Trigger>
						<Select.Content>
							{#each priorities as priority}
								<Select.Item value={priority.value} label={priority.label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden value={$formData.priority} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Form.Button type="submit" on:click={() => showDialog.set(false)}>Save Changes</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
