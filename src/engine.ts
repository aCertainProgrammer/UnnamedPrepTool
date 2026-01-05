import type { TeamChampionPools } from "./champion_pools.svelte";
import { champions, type Champion } from "./champions.svelte";
import {
	getDraftTeams,
	getNextDraftPickIndex,
	type Draft,
} from "./drafting.svelte";

export type SuggestedPicks = [Champion, number][];

export function minimax(
	draft: Draft,
	depth: number,
	alpha: number,
	beta: number,
	maximizingPlayer: boolean,
	index: number,
	blue_team_pool: TeamChampionPools,
	red_team_pool: TeamChampionPools,
	suggested_picks: SuggestedPicks,
	start_depth: number,
	prune: boolean = false,
): number {
	if (depth == 0 || index == 9) {
		return evaluate(draft, blue_team_pool, red_team_pool);
	}

	const next_pick_index = getNextDraftPickIndex(index);

	if (maximizingPlayer) {
		let maxEval = -10000000;
		const children = getDraftChildren(draft, next_pick_index);

		for (const child of children) {
			const draft_eval = minimax(
				child,
				depth - 1,
				alpha,
				beta,
				isIndexMaximizingPlayer(next_pick_index),
				next_pick_index,
				blue_team_pool,
				red_team_pool,
				suggested_picks,
				start_depth,
				true,
			);
			if (depth == start_depth) {
				suggested_picks.push([
					child.picks[next_pick_index],
					draft_eval,
				]);
			}

			maxEval = Math.max(maxEval, draft_eval);
			alpha = Math.max(alpha, draft_eval);
			if (prune && beta <= alpha) {
				break;
			}
		}
		return maxEval;
	} else {
		let minEval = 10000000;
		const children = getDraftChildren(draft, next_pick_index);

		for (const child of children) {
			const draft_eval = minimax(
				child,
				depth - 1,
				alpha,
				beta,
				isIndexMaximizingPlayer(next_pick_index),
				next_pick_index,
				blue_team_pool,
				red_team_pool,
				suggested_picks,
				start_depth,
				true,
			);
			if (depth == start_depth) {
				suggested_picks.push([child.picks[index], draft_eval]);
			}

			minEval = Math.min(minEval, draft_eval);
			beta = Math.min(beta, draft_eval);
			if (prune && beta <= alpha) {
				break;
			}
		}
		return minEval;
	}
}

export function evaluate(
	draft: Draft,
	blue_team_pool: TeamChampionPools,
	red_team_pool: TeamChampionPools,
): number {
	let currentEval = 0;

	let roles = Object.keys(blue_team_pool) as Array<keyof TeamChampionPools>;
	const { blue, red } = getDraftTeams(draft);

	for (const champion of blue) {
		for (const role of roles) {
			if (blue_team_pool[role].low_comfort.includes(champion)) {
				currentEval += 0.1;
			} else if (blue_team_pool[role].medium_comfort.includes(champion)) {
				currentEval += 0.3;
			} else if (blue_team_pool[role].high_comfort.includes(champion)) {
				currentEval += 0.5;
			}
		}
	}

	for (const champion of red) {
		for (const role of roles) {
			if (red_team_pool[role].low_comfort.includes(champion)) {
				currentEval -= 0.1;
			} else if (red_team_pool[role].medium_comfort.includes(champion)) {
				currentEval -= 0.3;
			} else if (red_team_pool[role].high_comfort.includes(champion)) {
				currentEval -= 0.5;
			}
		}
	}

	return currentEval;
}

function getDraftChildren(draft: Draft, pickIndex: number): Draft[] {
	const drafts = [];

	for (const champion of champions.all) {
		if (!draft.picks.includes(champion)) {
			const newDraft: Draft = structuredClone(draft);
			newDraft.picks[pickIndex] = champion;

			drafts.push(newDraft);
		}
	}

	return drafts;
}

export function isIndexMaximizingPlayer(currentIndex: number) {
	if (currentIndex < 5) {
		return true;
	}

	return false;
}
