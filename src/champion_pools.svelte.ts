import type { Champion } from "./champions.svelte";

export type ChampionPool = {
	high_comfort: Array<Champion>;
	medium_comfort: Array<Champion>;
	low_comfort: Array<Champion>;
};

export type TeamChampionPools = {
	top: ChampionPool;
	jungle: ChampionPool;
	mid: ChampionPool;
	adc: ChampionPool;
	support: ChampionPool;
};

export const ally_team_champion_pools: TeamChampionPools = {
	top: {
		high_comfort: ["gnar", "jax"],
		medium_comfort: ["renekton"],
		low_comfort: ["camille"],
	},
	jungle: {
		high_comfort: ["jarvan", "xinzhao"],
		medium_comfort: ["sejuani", "wukong"],
		low_comfort: [],
	},
	mid: {
		high_comfort: ["orianna", "syndra"],
		medium_comfort: [],
		low_comfort: ["ahri", "akali"],
	},
	adc: {
		high_comfort: ["jinx", "ashe"],
		medium_comfort: ["missfortune", "xayah"],
		low_comfort: [],
	},
	support: {
		high_comfort: ["alistar", "nautilus"],
		medium_comfort: ["rakan"],
		low_comfort: ["leona"],
	},
};

export const enemy_team_champion_pools: TeamChampionPools = {
	top: {
		high_comfort: ["renekton", "camille"],
		medium_comfort: ["jax"],
		low_comfort: ["gnar"],
	},
	jungle: {
		high_comfort: ["sejuani", "xinzhao"],
		medium_comfort: ["wukong"],
		low_comfort: ["jarvan"],
	},
	mid: {
		high_comfort: ["ahri"],
		medium_comfort: ["akali"],
		low_comfort: ["orianna", "syndra"],
	},
	adc: {
		high_comfort: ["xayah", "ashe"],
		medium_comfort: ["jinx"],
		low_comfort: ["missfortune"],
	},
	support: {
		high_comfort: ["leona", "rakan"],
		medium_comfort: ["nautilus"],
		low_comfort: ["alistar"],
	},
};
