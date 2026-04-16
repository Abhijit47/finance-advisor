// Mocking the Next Request and Response since we can't test it normally in jest without polyfills
import { POST } from "../src/app/api/chat/route";
// import { z } from "zod";

describe("API Route - Edge Cases and Integration Flows", () => {
  it("fails with 400 when input is missing", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toContain("Invalid input structure.");
  });

  it("fails with 400 when input is too short", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ input: "" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it("fails with 400 when input is too long", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ input: "a".repeat(3000) }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
