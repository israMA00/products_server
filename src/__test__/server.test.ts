import db from "../config/db";
import { dbConnection } from "../server";

jest.mock("../config/db");

describe("CONSOLE.LOG ERROR",() => {
    
    test("send a console.log message id Db is not connected", async() => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("error"))
        const response = jest.spyOn(console, "log");

        await dbConnection();

        expect(response).toHaveBeenCalledWith(expect.stringContaining("ERROR DB NOT CONNECTED"));
    })
})


