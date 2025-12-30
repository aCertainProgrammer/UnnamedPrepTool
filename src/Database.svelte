<script lang="ts">
	import type { Champion, ChampionLists } from "./champions.svelte";
	import { champions } from "./champions.svelte";

	let currentRoleFilter: keyof ChampionLists = $state(
		"all",
	) as keyof ChampionLists;
</script>

{#snippet RoleFilerButton(filter: keyof ChampionLists)}
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
			src={`./public/img/role_icons/${filter}_icon.webp`}
			alt={`${filter} icon`}
		/></button
	>
{/snippet}

{#snippet ChampionIcon(champion: Champion)}
	<img
		class="champion-icon"
		src={`./public/img/champion_icons/${champion[0].toUpperCase() + champion.slice(1)}.webp`}
		alt={`${champion} icon`}
	/>
{/snippet}

<div class="wrapper">
	<div id="champions">
		<div id="util">
			<div id="role-filter-buttons">
				{@render RoleFilerButton("top")}
				{@render RoleFilerButton("jungle")}
				{@render RoleFilerButton("mid")}
				{@render RoleFilerButton("adc")}
				{@render RoleFilerButton("support")}
			</div>
			<input type="text" placeholder="Search..." />
		</div>

		<div id="champions-container">
			{#each champions[currentRoleFilter] as champion}
				{@render ChampionIcon(champion)}
			{/each}
		</div>
	</div>
	<div id="champion-tierlists-container">ChampionTierlists</div>
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

	#util {
		width: 400px;
		height: 32px;
		min-height: 32px;

		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		gap: 2px;

		overflow: hidden;
	}

	#role-filter-buttons > button {
		width: 32px;
		height: 32px;

		background: none;
		padding: 0;
		margin: 0;
	}

	#role-filter-buttons > button > img {
		width: 32px;
		height: 32px;
	}

	#champions-container {
		width: 100%;
		min-height: 0;
		max-height: calc(100% - 32px);

		display: flex;
		flex-flow: row wrap;

		gap: 1px;

		overflow: auto;
	}

	#champions-container > img {
		width: 80px;
		height: 80px;
	}

	.selected {
		border: 1px solid gold;
	}
</style>
