import { SvelteMap } from "svelte/reactivity";
import type { Champion, Tierlist } from "./champions.svelte";

export enum Blindability {
	HIGH_BLINDABILITY = 0,
	MEDIUM_BLINDABILITY = 1,
	LOW_BLINDABILITY = 2,
}

export type RoleTierlists = {
	top: Tierlist;
	jungle: Tierlist;
	mid: Tierlist;
	adc: Tierlist;
	support: Tierlist;
};

export type ChampionRoleData = {
	counters: RoleTierlists;
	synergies: RoleTierlists;
	blindability: Blindability;
	viable: Boolean;
};

export type ChampionData = {
	top: ChampionRoleData;
	jungle: ChampionRoleData;
	mid: ChampionRoleData;
	adc: ChampionRoleData;
	support: ChampionRoleData;
};

function createTierlist(
	s: string[] = [],
	a: string[] = [],
	b: string[] = [],
	c: string[] = [],
): Tierlist {
	return {
		tiers: [
			{ name: "S", color: "deepskyblue", champions: s },
			{ name: "A", color: "limegreen", champions: a },
			{ name: "B", color: "yellow", champions: b },
			{ name: "C", color: "orange", champions: c },
		],
	};
}

export const champions_data: SvelteMap<Champion, ChampionData> = new SvelteMap([
	[
		"aatrox",
		{
			top: {
				counters: {
					top: createTierlist(["irelia", "yone"], ["fiora", "jax"]),
					jungle: createTierlist(["taliyah", "rengar"]),
					mid: createTierlist(["taliyah", "malzahar"]),
					adc: createTierlist(["samira"]),
					support: createTierlist(["braum"]),
				},
				synergies: {
					top: createTierlist(),
					jungle: createTierlist(["jarvan"]),
					mid: createTierlist(["ryze"]),
					adc: createTierlist(),
					support: createTierlist(["seraphine"]),
				},
				blindability: Blindability.HIGH_BLINDABILITY,
				viable: true,
			},
			jungle: {
				counters: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				synergies: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				blindability: Blindability.HIGH_BLINDABILITY,
				viable: true,
			},
			mid: {
				counters: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				synergies: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				blindability: Blindability.HIGH_BLINDABILITY,
				viable: false,
			},
			adc: {
				counters: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				synergies: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				blindability: Blindability.HIGH_BLINDABILITY,
				viable: false,
			},
			support: {
				counters: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				synergies: {
					top: createTierlist(),
					jungle: createTierlist(),
					mid: createTierlist(),
					adc: createTierlist(),
					support: createTierlist(),
				},
				blindability: Blindability.HIGH_BLINDABILITY,
				viable: false,
			},
		},
	],
]);
