<script lang="ts">
	import { champions_data } from "./champion_data.svelte";
	import type {
		ChampionData,
		ChampionRoleData,
		CounterRoleTierlists,
		RoleTierlists,
		SynergyRoleTierlists,
	} from "./champion_data.svelte";
	import type { Champion, Tierlist } from "./champions.svelte";
	import TierlistView from "./TierlistView.svelte";
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

	function createCounterTierlist(
		s: Champion[] = [],
		a: Champion[] = [],
		b: Champion[] = [],
	): Tierlist {
		return {
			tiers: [
				{ name: "Impossible", color: "tomato", champions: s },
				{ name: "Hard", color: "orange", champions: a },
				{
					name: "Even but outscales",
					color: "yellow",
					champions: b,
				},
			],
		};
	}

	function createSynergyTierlist(
		s: Champion[] = [],
		a: Champion[] = [],
	): Tierlist {
		return {
			tiers: [
				{ name: "Perfect synergy", color: "limegreen", champions: s },
				{ name: "Some synergy", color: "yellow", champions: a },
			],
		};
	}

	const counterTierlists: RoleTierlists = $derived.by(() => {
		let tierlists: RoleTierlists = {
			top: {
				tiers: [],
			},
			jungle: {
				tiers: [],
			},
			mid: {
				tiers: [],
			},
			adc: {
				tiers: [],
			},
			support: {
				tiers: [],
			},
		};
		const keys = Object.keys(role_data.counters) as Array<
			keyof CounterRoleTierlists
		>;

		keys.forEach((key) => {
			const counter_tierlist = role_data.counters[key];
			tierlists[key] = createCounterTierlist(
				counter_tierlist.impossible,
				counter_tierlist.hard,
				counter_tierlist.outscales,
			);
		});

		return tierlists;
	});
	const synergyTierlists: RoleTierlists = $derived.by(() => {
		let tierlists: RoleTierlists = {
			top: {
				tiers: [],
			},
			jungle: {
				tiers: [],
			},
			mid: {
				tiers: [],
			},
			adc: {
				tiers: [],
			},
			support: {
				tiers: [],
			},
		};
		const keys = Object.keys(role_data.counters) as Array<
			keyof SynergyRoleTierlists
		>;

		keys.forEach((key) => {
			const synergy_tierlist = role_data.synergies[key];
			tierlists[key] = createSynergyTierlist(
				synergy_tierlist.perfect,
				synergy_tierlist.some,
			);
		});

		return tierlists;
	});
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
			{#if role_data.counters != null}
				<div>Counters</div>
				{#each roles as role}
					<div class="tierlist-container">
						<TierlistView
							tierlist={counterTierlists[role]}
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
							<TierlistView
								tierlist={synergyTierlists[role]}
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
