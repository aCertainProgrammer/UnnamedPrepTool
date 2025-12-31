<script lang="ts">
	import {
		champions_data,
		importChampionsData,
	} from "./champion_data.svelte";
	import Database from "./Database.svelte";
	import TeamPools from "./TeamPools.svelte";
	import { exportData } from "./util";

	type Screen = "settings" | "pools" | "database" | "draft";
	let currentScreen: Screen = $state("database") as Screen;
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
	<button
		onclick={() => {
			document.getElementById("database-data-upload")?.click();
		}}>Upload database data</button
	>
	<input
		style="display:none"
		id="database-data-upload"
		type="file"
		oninput={async (event: any) => {
			const file = event.target.files[0] as File;
			const json = await file.text();
			const data = JSON.parse(json);
			importChampionsData(data);
		}}
	/>
	<button
		onclick={() => {
			exportData(champions_data.entries().toArray(), "database.json");
		}}>Download database data</button
	>
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
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 4px;
	}

	main {
		width: 100%;
		height: calc(100% - 50px);
	}
</style>
