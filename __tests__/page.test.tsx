import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/app/page";

// Mocking fetch for API tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        responseText: JSON.stringify({
          budgeting: { necessities: 50, wants: 30, savings: 20 },
          advice: "Good plan",
          actionItems: ["Do this", "Do that"],
        }),
      }),
  })
) as jest.Mock;

describe("App UI Rendering and Integration", () => {
  it("renders the main components correctly", () => {
    render(<App />);
    expect(screen.getByText("Hello! I am your AI Financial Advisor.")).toBeInTheDocument();
    expect(screen.getByText("No Dashboard Data Yet")).toBeInTheDocument();
  });

  it("handles user input and API simulation", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/I make \$5000 a month/i);
    const sendButton = screen.getByText("Send");

    // Type input
    fireEvent.change(input, { target: { value: "I need a budget" } });
    expect(input).toHaveValue("I need a budget");

    // Send
    fireEvent.click(sendButton);

    // After click, the input should be empty and the loader icon should appear
    expect(input).toHaveValue("");
  });
});
