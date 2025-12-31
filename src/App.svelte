<script lang="ts">
	import Database from "./Database.svelte";
	import TeamPools from "./TeamPools.svelte";

	type Screen = "settings" | "pools" | "database" | "draft";
	let currentScreen: Screen = $state("pools") as Screen;
</script>

{#snippet ScreenSwitchButton(screen: Screen)}
	<button
		class={currentScreen == screen ? "selected" : ""}
		onclick={() => {
			currentScreen = screen;
		}}>{screen[0].toUpperCase() + screen.slice(1)}</button
	>
{/snippet}

<div id="top-buttons">
	{@render ScreenSwitchButton("settings")}
	{@render ScreenSwitchButton("pools")}
	{@render ScreenSwitchButton("database")}
	{@render ScreenSwitchButton("draft")}
</div>
<main>
	{#if currentScreen == "settings"}
		<div>Settings</div>
	{:else if currentScreen == "pools"}
		<TeamPools />
	{:else if currentScreen == "database"}
		<Database />
	{:else if currentScreen == "draft"}
		<div>Draft</div>
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
