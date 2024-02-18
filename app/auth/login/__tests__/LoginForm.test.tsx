import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./../components/LoginForm";
import "@testing-library/jest-dom";
import { LOCALSTORAGE_RECENT_USER } from "@/app/constants";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const localStorageMock = {
  getItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockUsers = [
  { username: "testuser", password: "testpassword" },
  { username: "admin", password: "adminpassword" },
];

describe("LoginForm component", () => {
  test("renders Task Management Login header", () => {
    const { getByText } = render(<LoginForm users={[]} />);
    const headerElement = getByText("Task Management Login");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders username and password fields", () => {
    const { getByText } = render(<LoginForm users={mockUsers} />);
    const usernameInput = getByText("Username");
    const passwordInput = getByText("Password");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("input the form login then display correctly", async () => {
    const { getByTestId } = render(<LoginForm users={mockUsers} />);
    const usernameInput = getByTestId("username") as HTMLInputElement;
    const passwordInput = getByTestId("password") as HTMLInputElement;
    const submitButton = getByTestId("submit");

    fireEvent.change(usernameInput, { target: { value: "user1" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    expect(usernameInput.value).toBe("user1");
    expect(passwordInput.value).toBe("123");
  });

  test("displays an alert with invalid credentials", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const { getByTestId } = render(<LoginForm users={mockUsers} />);
    const usernameInput = getByTestId("username") as HTMLInputElement;
    const passwordInput = getByTestId("password") as HTMLInputElement;
    const submitButton = getByTestId("submit");

    fireEvent.change(usernameInput, { target: { value: "invaliduser" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid username or password");
    });

    alertMock.mockRestore();
  });

  test("displays an alert with empty fields", async () => {
    // Mocking window.alert
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const { getByTestId } = render(<LoginForm users={mockUsers} />);
    const submitButton = getByTestId("submit");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Please enter username and password"
      );
    });

    alertMock.mockRestore();
  });

  it("sets recent user from local storage on username", async () => {
    localStorageMock.getItem.mockReturnValue("user10");

    const { getByTestId } = render(<LoginForm users={mockUsers} />);
    const usernameInput = getByTestId("username") as HTMLInputElement;

    expect(localStorageMock.getItem).toHaveBeenCalledWith(
      LOCALSTORAGE_RECENT_USER
    );
    expect(usernameInput.value).toBe("user10");
  });

  test("submits the form with valid credentials", async () => {});

  test("displays loading spinner while submitting", async () => {});
});
