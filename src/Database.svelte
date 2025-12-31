<script lang="ts">
	import ChampionData from "./ChampionData.svelte";
	import type { Champion, ChampionLists } from "./champions.svelte";
	import { champions } from "./champions.svelte";

	let currentRoleFilter: keyof ChampionLists = $state(
		"all",
	) as keyof ChampionLists;

	let currentChampion: Champion = $state("aatrox") as Champion;
</script>

{#snippet RoleFilterButton(filter: keyof ChampionLists)}
	<button
		class={currentRoleFilter == filter ? "selected" : ""}
		onclick={() => {
			if (currentRoleFilter != filter) {
				currentRoleFilter = filter;
			} else if (currentRoleFilter == filter) {
				currentRoleFilter = "all";
			}
		}}
		><img
			src={`./img/role_icons/${filter}_icon.webp`}
			alt={`${filter} icon`}
		/></button
	>
{/snippet}

{#snippet ChampionIcon(champion: Champion)}
	<button
		class={currentChampion == champion ? "selected" : ""}
		onclick={() => {
			currentChampion = champion;
		}}
	>
		<img
			class="champion-icon"
			src={`./img/champion_icons/${champion[0].toUpperCase() + champion.slice(1)}.webp`}
			alt={`${champion} icon`}
		/>
	</button>
{/snippet}

<div class="wrapper">
	<div id="champions">
		<div class="util">
			<div class="role-filter-buttons">
				{@render RoleFilterButton("top")}
				{@render RoleFilterButton("jungle")}
				{@render RoleFilterButton("mid")}
				{@render RoleFilterButton("adc")}
				{@render RoleFilterButton("support")}
			</div>
			<input type="text" placeholder="Search..." />
		</div>

		<div id="champions-container">
			{#each champions[currentRoleFilter] as champion}
				{@render ChampionIcon(champion)}
			{/each}
		</div>
	</div>
	<div id="champion-tierlists-container">
		<ChampionData champion={currentChampion} />
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: row;

		gap: 10px;
	}

	#champions {
		width: 50%;
		height: 100%;

		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.util {
		width: 400px;
		height: 32px;
		min-height: 32px;

		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		gap: 2px;

		overflow: hidden;
	}

	.role-filter-buttons > button {
		width: 32px;
		height: 32px;

		background: none;
		padding: 0;
		margin: 0;
	}

	.role-filter-buttons > button > img {
		width: 32px;
		height: 32px;
	}

	#champions-container {
		width: 100%;
		min-height: 0;
		max-height: calc(100% - 32px);

		display: flex;
		flex-flow: row wrap;

		gap: 2px;

		overflow: auto;
	}

	#champions-container > button {
		width: 80px;
		height: 80px;

		padding: 0;
		margin: 0;

		border: none;
		border-radius: 0;
	}

	#champions-container > button > img {
		width: 78px;
		height: 78px;
	}

	#champion-tierlists-container {
		width: 50%;
		height: 100%;
	}
</style>
