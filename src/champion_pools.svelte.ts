import type { Champion } from "./champions.svelte";

export type ChampionPool = {
	comfort_blinds: Array<Champion>;
	comfort_counterpicks: Array<Champion>;
	blinds: Array<Champion>;
	counterpicks: Array<Champion>;
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
		comfort_blinds: ["aatrox", "ksante", "ambessa", "renekton", "sion"],
		comfort_counterpicks: ["darius"],
		blinds: ["gnar", "ornn", "chogath"],
		counterpicks: [
			"jax",
			"drmundo",
			"zaahen",
			"vladimir",
			"garen",
			"olaf",
			"kled",
			"gwen",
			"mordekaiser",
			"reksai",
		],
	},
	jungle: {
		comfort_blinds: ["jarvan", "vi", "lillia", "trundle"],
		comfort_counterpicks: ["kindred", "udyr"],
		blinds: ["xinzhao", "wukong"],
		counterpicks: ["drmundo"],
	},
	mid: {
		comfort_blinds: ["neeko", "viktor", "taliyah", "syndra"],
		comfort_counterpicks: ["veigar", "lux", "aurora", "ziggs"],
		blinds: ["mel", "hwei", "orianna", "ahri"],
		counterpicks: ["anivia", "lissandra", "galio"],
	},
	adc: {
		comfort_blinds: ["ashe", "xayah", "jinx"],
		comfort_counterpicks: ["kaisa", "ezreal", "kalista"],
		blinds: ["missfortune", "jhin"],
		counterpicks: ["caitlyn", "twitch"],
	},
	support: {
		comfort_blinds: ["nautilus", "rell", "alistar"],
		comfort_counterpicks: ["pyke", "bard"],
		blinds: ["leona", "nami"],
		counterpicks: ["lulu", "braum"],
	},
};

export const enemy_team_champion_pools: TeamChampionPools = {
	top: {
		comfort_blinds: ["aatrox", "gnar", "ambessa", "ornn"],
		comfort_counterpicks: ["darius", "irelia", "camille"],
		blinds: ["ksante", "renekton"],
		counterpicks: ["mordekaiser", "malphite", "gwen"],
	},
	jungle: {
		comfort_blinds: ["wukong", "xinzhao"],
		comfort_counterpicks: ["olaf", "nidalee"],
		blinds: ["jarvan", "ambessa"],
		counterpicks: ["mordekaiser"],
	},
	mid: {
		comfort_blinds: ["orianna", "syndra", "yone"],
		comfort_counterpicks: ["lissandra", "vex"],
		blinds: ["mel", "galio"],
		counterpicks: ["zed", "jayce"],
	},
	adc: {
		comfort_blinds: ["missfortune", "jhin", "ashe"],
		comfort_counterpicks: ["draven", "tristana", "kalista"],
		blinds: ["jinx", "kogmaw"],
		counterpicks: ["syndra", "nilah"],
	},
	support: {
		comfort_blinds: ["thresh", "leona", "alistar"],
		comfort_counterpicks: ["braum", "renata"],
		blinds: ["nautilus", "milio"],
		counterpicks: ["pyke", "yuumi"],
	},
};
