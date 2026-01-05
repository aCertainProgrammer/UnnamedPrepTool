<script lang="ts">
	import {
		ally_team_champion_pools,
		enemy_team_champion_pools,
	} from "./champion_pools.svelte";
	import type {
		ChampionPool,
		TeamChampionPools,
	} from "./champion_pools.svelte";
	import type { Tierlist } from "./champions.svelte.ts";
	import TierlistView from "./TierlistView.svelte";
	import { capitalize } from "./util";

	function makePlayerTierlist(pool: ChampionPool): Tierlist {
		return {
			tiers: [
				{
					name: "High comfort",
					color: "deepskyblue",
					champions: pool.high_comfort,
				},
				{
					name: "Medium comfort",
					color: "limegreen",
					champions: pool.medium_comfort,
				},
				{
					name: "Can play",
					color: "yellow",
					champions: pool.low_comfort,
				},
			],
		};
	}

	type TierlistViewData = {
		tierlist: Tierlist;
		name: string;
	};

	function makePlayerTierlistViewData(
		tierlist: Tierlist,
		name: string,
	): TierlistViewData {
		return {
			tierlist: tierlist,
			name: name,
		};
	}

	const ally_tierlist_view_data: Array<TierlistViewData> = [];
	const enemy_tierlist_view_data: Array<TierlistViewData> = [];
	const keys = Object.keys(ally_team_champion_pools) as Array<
		keyof TeamChampionPools
	>;

	keys.forEach((key) => {
		ally_tierlist_view_data.push(
			makePlayerTierlistViewData(
				makePlayerTierlist(ally_team_champion_pools[key]),
				`Ally ${key} pool`,
			),
		);
		enemy_tierlist_view_data.push(
			makePlayerTierlistViewData(
				makePlayerTierlist(enemy_team_champion_pools[key]),
				`Enemy ${key} pool`,
			),
		);
	});
</script>

<div class="wrapper">
	<div class="pools-container">
		{#each ally_tierlist_view_data as tierlist_view_data}
			<TierlistView
				tierlist={tierlist_view_data.tierlist}
				name={tierlist_view_data.name}
			/>
		{/each}
	</div>
	<div class="pools-container">
		{#each enemy_tierlist_view_data as tierlist_view_data}
			<TierlistView
				tierlist={tierlist_view_data.tierlist}
				name={tierlist_view_data.name}
			/>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;

		display: flex;
		flex-flow: row nowrap;

		justify-content: space-between;
		gap: 40px;
	}

	.pools-container {
		width: 50%;
		height: 100%;

		display: flex;
		flex-flow: column nowrap;
		gap: 10px;

		overflow: auto;
	}
</style>
