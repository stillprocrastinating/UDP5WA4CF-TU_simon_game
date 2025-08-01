/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore } = require("script");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.body.innerHTML = fileContents;
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices ids exist", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame tests", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("game.score = 0", () => {
        expect(game.score).toEqual(0);
    });
    test("game.currentGame.length = 0", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("game.playerMoves.length = 0", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("document#score = 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});