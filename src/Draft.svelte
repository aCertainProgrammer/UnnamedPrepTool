<script lang="ts">
	import {
		ally_team_champion_pools,
		enemy_team_champion_pools,
	} from "./champion_pools.svelte";
	import { type Draft } from "./drafting.svelte";
	import { evaluate, minimax, type SuggestedPicks } from "./engine";
	import { capitalize } from "./util";

	const draft: Draft = {
		picks: [
			"camille",
			"xinzhao",
			"ahri",
			"jinx",
			"rakan",
			"sejuani",
			"akali",
			"missfortune",
			"nautilus",
			"",
		],
	};

	const suggested_picks: SuggestedPicks = [];
	let draft_eval = minimax(
		draft,
		1,
		1,
		-1000000,
		true,
		4,
		ally_team_champion_pools,
		enemy_team_champion_pools,
		suggested_picks,
		1,
	);
	console.log(draft_eval);
</script>

<div class="wrapper">
	<div class="picks">
		{#each draft.picks as pick, index}
			{#if index < 5}
				<img
					src={`./img/champion_icons/${pick == "" ? "Pick" : capitalize(pick)}.webp`}
					alt={`${pick} icon`}
				/>
			{/if}
		{/each}
	</div>
	<div class="middle">
		<div class="eval">
			<span>Current evaluation: {draft_eval.toPrecision(2)}</span>
		</div>
		<div class="pick-suggestions">
			{#each suggested_picks as [pick, evaluation]}
				<div class="pick-suggestion">
					<img
						src={`./img/champion_icons/${pick == "" ? "Pick" : capitalize(pick)}.webp`}
						alt={`${pick} icon`}
					/>
					<div>{evaluation.toPrecision(2)}</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="picks">
		{#each draft.picks as pick, index}
			{#if index >= 5}
				<img
					src={`./img/champion_icons/${pick == "" ? "Pick" : capitalize(pick)}.webp`}
					alt={`${pick} icon`}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: start;

		gap: 10px;
	}

	.picks {
		width: 80px;
		height: fit-content;

		display: flex;
		flex-flow: column nowrap;
	}

	.middle {
		width: calc(100% - 2 * 80px);
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: start;
		align-items: start;
	}

	.eval {
		height: 50px;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;

		text-align: center;
	}

	.pick-suggestions {
		min-height: 0;
		max-height: calc(100% - 50px);
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: start;

		overflow: auto;
	}

	.pick-suggestion {
		width: 160px;
		display: flex;
		border: 1px solid #666666;
		align-items: center;
		gap: 4px;
		font-size: 2rem;
	}
</style>
