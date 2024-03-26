import { fail } from "@sveltejs/kit"
import { superValidate, message } from "sveltekit-superforms";
import { taskSchema, type Task } from "./(data)/schemas";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types.js";

let tasks: Task[] = [
	{
		id: "TODO-8782",
		title: "Go to the park with the familly",
		status: "in progress",
		label: "documentation",
		priority: "medium"
	},
	{
		id: "TODO-7878",
		title: "Play video games",
		status: "backlog",
		label: "documentation",
		priority: "medium"
	},
	{
		id: "TODO-7839",
		title: "Eat Food!",
		status: "todo",
		label: "bug",
		priority: "high"
	},
	{
		id: "TODO-5207",
		title: "Code",
		status: "in progress",
		label: "bug",
		priority: "low"
	}
]

export const load = async () => {
	return {
		tasks,
		form: await superValidate(zod(taskSchema)),
	};
};

export const actions: Actions = {
	delete: async ({ url }) => {
		const id = url.searchParams.get('id')

		tasks = tasks.filter(task => task.id != id)

		return {
			status: 200
		}
	},

	update: async ({ request }) => {
		const editForm = await superValidate(request, zod(taskSchema));

		if (!editForm.valid) return fail(400, { editForm })

		const taskToUpdate = tasks.findIndex(task => task.id === editForm.data.id)

		tasks[taskToUpdate] = editForm.data

		return message(editForm, { text: "good good!" })
	},

	create: async ({ request }) => {
		const formData = await request.formData()

		const id = formData.get('id') as string
		const title = formData.get('title') as string
		const status = formData.get('status') as string
		const label = formData.get('label') as string
		const priority = formData.get('priority') as string

		const task = {
			id,
			title,
			label,
			status,
			priority
		}

		tasks.push(task)

		return {

			status: 200
		}
	},
};
