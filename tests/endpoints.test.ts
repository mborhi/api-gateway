import fetch from 'node-fetch';
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const mockedFetch = fetch as any;

describe("Authentication service endpoints", () => {
    it("correctly formats the recieved token", () => {

    });
});

describe("Retrieval service endpoints", () => {
    it("correctly formats recieved data", () => {

    });
});

describe("Playback service endpoints", () => {
    it("correctly formats recieved data", () => {

    });
});
