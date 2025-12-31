export type Champion = string;

export type ChampionLists = {
	all: Array<Champion>;
	top: Array<Champion>;
	jungle: Array<Champion>;
	mid: Array<Champion>;
	adc: Array<Champion>;
	support: Array<Champion>;
};

export const champions: ChampionLists = {
	all: [
		"ahri",
		"akali",
		"alistar",
		"ashe",
		"camille",
		"gnar",
		"jarvan",
		"jax",
		"jinx",
		"leona",
		"missfortune",
		"nautilus",
		"orianna",
		"rakan",
		"renekton",
		"sejuani",
		"syndra",
		"wukong",
		"xayah",
		"xinzhao",
	],
	top: ["camille", "gnar", "jax", "renekton"],
	jungle: ["jarvan", "sejuani", "wukong", "xinzhao"],
	mid: ["ahri", "akali", "orianna", "syndra"],
	adc: ["ashe", "jinx", "missfortune", "xayah"],
	support: ["alistar", "leona", "nautilus", "rakan"],
};

export type TeamData = {
	toplane_data: PlayerData;
	jungle_data: PlayerData;
	midlane_data: PlayerData;
	botlane_data: PlayerData;
	support_data: PlayerData;
};

export type PlayerData = {
	champion_tierlist: Tierlist;
};

export type Tierlist = {
	tiers: Array<Tier>;
};

export type Tier = {
	champions: Array<Champion>;
	name: string;
	color: string;
};
