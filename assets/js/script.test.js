/**
 * @jest-environment jsdom
 */

const { game, addTurn, lightsOn, newGame, playerTurn, showScore, showTurns } = require("./script");

jest.spyOn(window, "alert").mockImplementation(() => {});

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
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
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
    //test("game.currentGame.length = 0", () => {
    //    expect(game.currentGame.length).toBe(0);
    //});
    test("game.currentGame.length = 1", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("game.playerMoves.length = 0", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("document#score = 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("data-listener = true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay tests", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn => game.currentGame.length = 2", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("button.classList = light", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns => game.turnNumber = 0", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("playerMoves => currentGame => playerTurn => score = 1", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("playerMoves = wrong => playerTurn => alert = Wrong move!", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("showTurns => turnInProgress = true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
});