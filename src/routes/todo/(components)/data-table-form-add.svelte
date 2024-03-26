<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { taskSchema } from '../(data)/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';
	import { labels } from '../(data)/data.js';
	import { statuses } from '../(data)/data.js';
	import { priorities } from '../(data)/data.js';
	import { enhance } from "$app/forms";

	export let data: SuperValidated<Infer<typeof taskSchema>>;

	const form = superForm(data, {
		validators: zodClient(taskSchema)
	});

	const { form: formData } = form;

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

<Dialog.Root>
	<Dialog.Trigger
		><Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">New Todo</Button
		></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title class="text-center">Create a new todo</Dialog.Title>
			<Dialog.Description class="text-center">
				Make sure you make it clear and small!
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/create" class="align-center space-y-8" use:enhance>
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Form.Label for="id" class="id">Id</Form.Label>
					<Input {...attrs} name="id" bind:value={$formData.id} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label for="title" class="title">Title</Form.Label>
					<Input {...attrs} name="title" bind:value={$formData.title} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="label">
				<Form.Control let:attrs>
					<Form.Label for="title" class="title">Label</Form.Label>
					<Select.Root
						selected={selectedLabel}
						onSelectedChange={(v) => {
							v && ($formData.label = v.value);
						}}
					>
						<Select.Trigger {...attrs} class="form-control w-full">
							<Select.Value placeholder="label" />
						</Select.Trigger>
						<Select.Content>
							{#each labels as label}
								<Select.Item value={label.value} label={label.label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.label} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="status">
				<Form.Control let:attrs>
					<Form.Label for="title" class="title">Status</Form.Label>
					<Select.Root
						selected={selectedStatus}
						onSelectedChange={(v) => {
							v && ($formData.status = v.value);
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
					<input hidden bind:value={$formData.status} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="priority">
				<Form.Control let:attrs>
					<Form.Label class="title">Priority</Form.Label>
					<Select.Root
						selected={selectedPriority}
						onSelectedChange={(v) => {
							v && ($formData.priority = v.value);
						}}
					>
						<Select.Trigger {...attrs} class="form-control w-full">
							<Select.Value placeholder="Priority" />
						</Select.Trigger>
						<Select.Content>
							{#each priorities as priority}
								<Select.Item value={priority.value} label={priority.label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.priority} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Form.Button type="submit">Add Todo</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
