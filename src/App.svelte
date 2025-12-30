<script lang="ts">
	import Database from "./Database.svelte";

	type Screen = "settings" | "pools" | "database";
	let currentScreen: Screen = $state("database") as Screen;
</script>

<div id="top-buttons">
	<button
		onclick={() => {
			currentScreen = "settings";
		}}>Settings</button
	>
	<button
		onclick={() => {
			currentScreen = "pools";
		}}>Pools</button
	>
	<button
		onclick={() => {
			currentScreen = "database";
		}}>Database</button
	>
</div>
<main>
	{#if currentScreen == "settings"}
		<div>Settings</div>
	{:else if currentScreen == "pools"}
		<div>Pools</div>
	{:else if currentScreen == "database"}
		<Database />
	{/if}
</main>

<style>
	#top-buttons {
		height: 50px;
	}

	main {
		width: 100%;
		height: calc(100% - 50px);
	}
</style>
