<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Database from "@tauri-apps/plugin-sql";
  import {db} from '$lib/database'
  import { sql } from "drizzle-orm";

  let name = $state("");
  let greetMsg = $state("");

  async function greet(event: Event) {
    event.preventDefault();
    await db.run(sql`select * from sqlite_master`).then(console.log)
    // db.select('select 1').then(console.log)
    // console.log(await db.select().from(transaction))
    greetMsg = await invoke("greet", { name });
  }
</script>

<main class="m-0 min-h-screen flex flex-col items-center justify-center text-center text-gray-900 bg-gray-50 dark:text-gray-50 dark:bg-gray-900">
  <h1 class="text-center">Welcome to Tauri + Svelte</h1>

  <div class="flex justify-center">
    <a href="https://vitejs.dev" target="_blank" class="font-medium text-blue-600 no-underline hover:text-blue-500 dark:hover:text-cyan-400">
      <img src="/vite.svg" class="h-24 p-6 transition-all duration-700 hover:drop-shadow-[0_0_32px_#747bff]" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank" class="font-medium text-blue-600 no-underline hover:text-blue-500 dark:hover:text-cyan-400">
      <img src="/tauri.svg" class="h-24 p-6 transition-all duration-700 hover:drop-shadow-[0_0_32px_#24c8db]" alt="Tauri Logo" />
    </a>
    <a href="https://kit.svelte.dev" target="_blank" class="font-medium text-blue-600 no-underline hover:text-blue-500 dark:hover:text-cyan-400">
      <img src="/svelte.svg" class="h-24 p-6 transition-all duration-700 hover:drop-shadow-[0_0_32px_#ff3e00]" alt="SvelteKit Logo" />
    </a>
  </div>
  <p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>

  <form class="flex justify-center gap-2" onsubmit={greet}>
    <Input id="greet-input" placeholder="Enter a name..." bind:value={name} class="w-auto" />
    <Button type="submit">Greet</Button>
  </form>
  <p class="mt-4">{greetMsg}</p>
</main>
