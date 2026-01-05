import { expect, test } from "vitest";
import { isIndexMaximizingPlayer } from "../src/engine.ts";

test("maximizing player", () => {
	expect(isIndexMaximizingPlayer(0)).toBe(true);
	expect(isIndexMaximizingPlayer(1)).toBe(true);
	expect(isIndexMaximizingPlayer(2)).toBe(true);
	expect(isIndexMaximizingPlayer(3)).toBe(true);
	expect(isIndexMaximizingPlayer(4)).toBe(true);
	expect(isIndexMaximizingPlayer(5)).toBe(false);
	expect(isIndexMaximizingPlayer(6)).toBe(false);
	expect(isIndexMaximizingPlayer(7)).toBe(false);
	expect(isIndexMaximizingPlayer(8)).toBe(false);
	expect(isIndexMaximizingPlayer(9)).toBe(false);
});
