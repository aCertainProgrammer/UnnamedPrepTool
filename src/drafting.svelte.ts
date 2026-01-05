import type { Champion } from "./champions.svelte";

export type Draft = {
	picks: Array<Champion | "">;
};

export function getNextDraftPickIndex(index: number) {
	if (index == -1) {
		return 0;
	}

	const returnVals = [5, 2, 7, 4, 9, 6, 1, 8, 3, -1];
	return returnVals[index];
}

export function getDraftTeams(draft: Draft): {
	blue: Champion[];
	red: Champion[];
} {
	return {
		blue: [
			draft.picks[0],
			draft.picks[1],
			draft.picks[2],
			draft.picks[3],
			draft.picks[4],
		],
		red: [
			draft.picks[5],
			draft.picks[6],
			draft.picks[7],
			draft.picks[8],
			draft.picks[9],
		],
	};
}
