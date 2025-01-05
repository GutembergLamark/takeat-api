import { AppError } from "./AppError";

describe("AppError", () => {
  test("Shold create an instance of AppError", () => {
    const error = new AppError("mensagem de erro", 400);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("mensagem de erro");
    expect(error.statusCode).toBe(400);
  });
});
