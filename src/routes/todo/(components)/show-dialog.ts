import { writable } from "svelte/store";

function createDialog() {
    const { subscribe, set } = writable(false)

    return {
        subscribe,
        set: (value: boolean) => set(value)
    }
}

export const showDialog = createDialog()