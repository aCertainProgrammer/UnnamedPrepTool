<script lang="ts">
	import type { Tierlist, Tier } from "./champions.svelte";

	const { tierlist, name }: { tierlist: Tierlist; name: string } = $props();
</script>

{#snippet Tier(tier: Tier)}
	<div class="tier-container">
		<div class="tier-name" style="background: {tier.color};">
			<span>
				{tier.name}
			</span>
		</div>
		<div class="tier-champions">
			{#each tier.champions as champion}
				<img
					class="champion-icon"
					src={`./img/champion_icons/${champion[0].toUpperCase() + champion.slice(1)}.webp`}
					alt={`${champion} icon`}
				/>
			{/each}
		</div>
	</div>
{/snippet}
<div class="wrapper">
	<div class="tierlist-name">{name}</div>
	{#each tierlist.tiers as tier}
		{@render Tier(tier)}
	{/each}
</div>

<style>
	.wrapper {
		width: 100%;
		height: fit-content;

		display: flex;
		flex-flow: column nowrap;

		overflow: scroll;
	}

	.tierlist-name {
		height: 30px;
		width: 100%;

		background: #0a0440;
		border: 1px solid #666666;
	}

	.tier-container {
		width: 100%;
		min-height: 80px;

		display: flex;
		flex-flow: row nowrap;

		background: #0a0440;
	}

	.tier-name {
		width: 80px;
		max-width: 80px;
		min-height: 80px;

		display: flex;
		align-items: center;
		justify-content: center;

		filter: brightness(90%);
	}

	.tier-name > span {
		color: black;
		max-width: 80px;
	}

	.tier-champions {
		width: calc(100% - 80px);
		display: flex;
		flex-flow: row wrap;

		gap: 4px;
		padding: 2px;
		padding-left: 4px;
	}

	.champion-icon {
		width: 78px;
		height: 78px;
	}
</style>
