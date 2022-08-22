import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import { requireLogin } from '../src/utils/auth-utils';
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const mockedFetch = fetch as any;

describe("Authentication middleware", () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    const headerError = {
        "error": {
            "status": 400,
            "message": "Missing session id from headers"
        }
    };

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    it("correctly handles when request is without headers", async () => {
        await requireLogin(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockResponse.json).toBeCalledWith(headerError);

    });

    it("correclty handles request without session id in request headers", async () => {
        mockRequest = {
            headers: {}
        };
        await requireLogin(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockResponse.json).toBeCalledWith(headerError);

    });

    it("correctly handles authentication request errors", async () => {
        mockRequest = {
            headers: { session_id: "mock-session-id" }
        };
        mockedFetch.mockReturnValueOnce(Promise.resolve(new Response(
            JSON.stringify({ "access_token": "mock-access-token" })
        )));
        await requireLogin(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);

    });

    it("correctly attaches access token if authentication resolves successfully", async () => {
        mockRequest = {
            headers: { session_id: "mock-session-id" }
        };
        mockedFetch.mockReturnValueOnce(Promise.resolve(new Response(
            JSON.stringify({ "access_token": "mock-access-token" })
        )));
        await requireLogin(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockRequest.headers['access_token']).toEqual("mock-access-token");
    });

    it("correclty handles if authentication call response is an error", async () => {
        const mock_auth_error = { "error": { "status": 404, "message": "No token associated with given session id" } };
        mockRequest = {
            headers: { session_id: "mock-session-id" }
        };
        mockedFetch.mockReturnValueOnce(Promise.resolve(new Response(
            JSON.stringify(mock_auth_error),
            { status: 404 }
        )));
        await requireLogin(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockResponse.json).toBeCalledWith(mock_auth_error);
    })
});