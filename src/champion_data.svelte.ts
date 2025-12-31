import { SvelteMap } from "svelte/reactivity";
import { champions, type Champion, type Tierlist } from "./champions.svelte";

export type RoleTierlists = {
	top: Tierlist;
	jungle: Tierlist;
	mid: Tierlist;
	adc: Tierlist;
	support: Tierlist;
};

export type CounterTierlist = {
	impossible: Champion[];
	hard: Champion[];
	outscales: Champion[];
};

export type SynergyTierlist = {
	perfect: Champion[];
	some: Champion[];
};

export type SynergyRoleTierlists = {
	top: SynergyTierlist;
	jungle: SynergyTierlist;
	mid: SynergyTierlist;
	adc: SynergyTierlist;
	support: SynergyTierlist;
};

export type CounterRoleTierlists = {
	top: CounterTierlist;
	jungle: CounterTierlist;
	mid: CounterTierlist;
	adc: CounterTierlist;
	support: CounterTierlist;
};

export type ChampionRoleData = {
	counters: CounterRoleTierlists;
	synergies: SynergyRoleTierlists;
};

export type ChampionData = {
	top: ChampionRoleData;
	jungle: ChampionRoleData;
	mid: ChampionRoleData;
	adc: ChampionRoleData;
	support: ChampionRoleData;
};

export const champions_data: SvelteMap<Champion, ChampionData> =
	new SvelteMap();

for (const champion of champions.all) {
	champions_data.set(champion, {
		top: {
			counters: {
				top: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				jungle: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				mid: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				adc: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				support: {
					impossible: [],
					hard: [],
					outscales: [],
				},
			},
			synergies: {
				top: {
					perfect: [],
					some: [],
				},
				jungle: {
					perfect: [],
					some: [],
				},
				mid: {
					perfect: [],
					some: [],
				},
				adc: {
					perfect: [],
					some: [],
				},
				support: {
					perfect: [],
					some: [],
				},
			},
		},
		jungle: {
			counters: {
				top: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				jungle: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				mid: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				adc: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				support: {
					impossible: [],
					hard: [],
					outscales: [],
				},
			},
			synergies: {
				top: {
					perfect: [],
					some: [],
				},
				jungle: {
					perfect: [],
					some: [],
				},
				mid: {
					perfect: [],
					some: [],
				},
				adc: {
					perfect: [],
					some: [],
				},
				support: {
					perfect: [],
					some: [],
				},
			},
		},
		mid: {
			counters: {
				top: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				jungle: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				mid: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				adc: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				support: {
					impossible: [],
					hard: [],
					outscales: [],
				},
			},
			synergies: {
				top: {
					perfect: [],
					some: [],
				},
				jungle: {
					perfect: [],
					some: [],
				},
				mid: {
					perfect: [],
					some: [],
				},
				adc: {
					perfect: [],
					some: [],
				},
				support: {
					perfect: [],
					some: [],
				},
			},
		},
		adc: {
			counters: {
				top: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				jungle: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				mid: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				adc: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				support: {
					impossible: [],
					hard: [],
					outscales: [],
				},
			},
			synergies: {
				top: {
					perfect: [],
					some: [],
				},
				jungle: {
					perfect: [],
					some: [],
				},
				mid: {
					perfect: [],
					some: [],
				},
				adc: {
					perfect: [],
					some: [],
				},
				support: {
					perfect: [],
					some: [],
				},
			},
		},
		support: {
			counters: {
				top: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				jungle: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				mid: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				adc: {
					impossible: [],
					hard: [],
					outscales: [],
				},
				support: {
					impossible: [],
					hard: [],
					outscales: [],
				},
			},
			synergies: {
				top: {
					perfect: [],
					some: [],
				},
				jungle: {
					perfect: [],
					some: [],
				},
				mid: {
					perfect: [],
					some: [],
				},
				adc: {
					perfect: [],
					some: [],
				},
				support: {
					perfect: [],
					some: [],
				},
			},
		},
	});
}

export type ImportData = Array<[Champion, ChampionData]>;

export function importChampionsData(data: ImportData) {
	data.forEach((entry) => {
		const champion = entry[0];
		const data = entry[1];

		champions_data.set(champion, data);
	});
}
