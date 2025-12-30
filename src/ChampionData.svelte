<script lang="ts">
	import { Blindability, champions_data } from "./champion_data.svelte";
	import type {
		ChampionData,
		ChampionRoleData,
		RoleTierlists,
	} from "./champion_data.svelte";
	import type { Champion } from "./champions.svelte";
	import Tierlist from "./Tierlist.svelte";
	import { capitalize } from "./util";

	const { champion }: { champion: Champion } = $props();

	let currentRoleFilter: keyof ChampionData = $state(
		"top",
	) as keyof ChampionData;

	const champion_data = $derived.by(function (): ChampionData {
		const data = champions_data.get(champion);
		if (data == null) {
			throw `could not get champion data for ${champion}`;
		}
		return data;
	});

	const role_data = $derived.by(function (): ChampionRoleData {
		if (champion_data == null) {
			throw `could not get champion data for ${champion}`;
		}

		return champion_data[currentRoleFilter];
	});

	const roles: Array<keyof RoleTierlists> = [
		"top",
		"jungle",
		"mid",
		"adc",
		"support",
	];
</script>

{#snippet RoleFilterButton(filter: keyof ChampionData)}
	<button
		class={currentRoleFilter == filter ? "selected" : ""}
		onclick={() => {
			currentRoleFilter = filter;
		}}
		><img
			src={`./img/role_icons/${filter}_icon.webp`}
			alt={`${filter} icon`}
		/></button
	>
{/snippet}

<div class="wrapper">
	<div class="util">
		<div class="role-filter-buttons">
			{@render RoleFilterButton("top")}
			{@render RoleFilterButton("jungle")}
			{@render RoleFilterButton("mid")}
			{@render RoleFilterButton("adc")}
			{@render RoleFilterButton("support")}
		</div>
	</div>
	<div class="role-data-container">
		{#if role_data != null}
			<div class="properties-container">
				<div class="blindability-container">
					{#if role_data.blindability != null}
						<label for="champion-blindability-selection"
							>Blindability</label
						>
						<select
							id="champion-blindability-selection"
							value={role_data.blindability}
						>
							<option value={Blindability.HIGH_BLINDABILITY}
								>Very blindable</option
							>
							<option value={Blindability.MEDIUM_BLINDABILITY}
								>Somewhat blindable</option
							>
							<option value={Blindability.LOW_BLINDABILITY}
								>Not blindable</option
							>
						</select>
					{:else}<div>Blindability for {champion} is null</div>
					{/if}
				</div>
				{#if role_data.viable != null}
					<div>
						<label for="champion-viability-checkbox"
							>Viable {currentRoleFilter}</label
						>
						<input
							id="champion-viability-checkbox"
							type="checkbox"
							checked={role_data.viable}
						/>
					</div>
				{:else}<div>
						{champion}
						{currentRoleFilter} viability is null
					</div>
				{/if}
			</div>
			<hr />
			{#if role_data.counters != null}
				<div>Counters</div>
				{#each roles as role}
					<div class="tierlist-container">
						<Tierlist
							tierlist={role_data.counters[role]}
							name={`${capitalize(champion)} ${currentRoleFilter} - ${role} counters`}
						/>
					</div>
				{/each}
			{:else}
				<div>Counters to {champion} are null</div>
			{/if}
			<hr />
			{#if role_data.synergies != null}
				<div>Synergies</div>
				{#each roles as role}
					{#if role != currentRoleFilter}
						<div class="tierlist-container">
							<Tierlist
								tierlist={role_data.synergies[role]}
								name={`${capitalize(champion)} ${currentRoleFilter} - ${role} synergies`}
							/>
						</div>
					{/if}
				{/each}
			{:else}
				<div>Synergies with {champion} are null</div>
			{/if}
		{:else}<div>Champion data for {champion} is null</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;

		display: flex;
		flex-flow: column nowrap;

		gap: 10px;

		overflow: auto;
		padding: 10px;
	}

	.util {
		height: 32px;
		width: 200px;

		display: flex;
		flex-flow: row nowrap;

		gap: 2px;
	}

	.role-filter-buttons {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.role-filter-buttons > button {
		width: 32px;
		height: 32px;

		background: none;
		padding: 0;
		margin: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.role-filter-buttons > button > img {
		width: 32px;
		height: 32px;
	}

	.role-data-container {
		width: 100%;
		height: calc(100% - 32px);

		display: flex;
		flex-flow: column nowrap;

		gap: 10px;
	}

	.tierlist-container {
		width: 100%;
		max-height: 500px;
	}

	.selected {
		border: 1px solid gold !important;
	}

	.properties-container {
		width: 100%;
		height: 50px;

		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
		align-items: center;
	}

	hr {
		width: 100%;
	}
</style>
