<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
	import type { TableViewModel } from 'svelte-headless-table';
	import Button from '$lib/components/ui/button/button.svelte';
	import Cross2 from 'svelte-radix/Cross2.svelte';
	import { statuses, priorities } from '../(data)/data.js';
	import type { Writable } from 'svelte/store';
	import DataTableFormAdd from './data-table-form-add.svelte';
	import type { Task, taskSchema } from '../(data)/schemas.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	
	export let tableModel: TableViewModel<Task>;
	export let form: SuperValidated<Infer<typeof taskSchema>>

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.priority}
			title="Priority"
			options={priorities}
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.status = [];
					$filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>
	<div class="flex items-center justify-between">
		<div class="flex flex-1 items-center space-x-2">
			<DataTableViewOptions {tableModel}/>
			<DataTableFormAdd data={form} />
		</div>
	</div>
</div>
