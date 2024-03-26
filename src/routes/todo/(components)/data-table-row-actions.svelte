<script lang="ts">
	import DotsHorizontal from 'svelte-radix/DotsHorizontal.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { taskSchema, type Task } from '../(data)/schemas.js';
	import { enhance } from '$app/forms';
	export let row: Task;
	const task = taskSchema.parse(row);
	import DataTableFormUpdate from './data-table-form-update.svelte';
	import { showDialog } from './show-dialog.js';

	let showAlert = false;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Open menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<DropdownMenu.Item on:click={() => showDialog.set(true)}>Edit</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => (showAlert = true)}>
			Delete Todo<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<AlertDialog.Root bind:open={showAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="text-center">Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description class="text-center">
				This action cannot be undone. This will permanently delete your todo and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>
				<form action="?/delete&id={task.id}" method="POST" use:enhance>
					<button type="submit">Delete</button>
				</form>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<DataTableFormUpdate row={task} />
