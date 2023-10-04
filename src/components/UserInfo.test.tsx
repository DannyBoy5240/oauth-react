import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserInfo from "./UserInfo";
import { LOGOUT } from "../redux/types";

const mockStore = configureStore([]);

describe("UserInfo component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          name: "Test User",
          email: "test@example.com",
          avatar: "https://example.com/avatar.jpg",
        },
      },
    });
  });

  it("renders user information correctly", () => {
    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    const userName = screen.getByText("Test User");
    const userEmail = screen.getByText("test@example.com");
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();

    const logoutButton = screen.getByText("Log out");
    expect(logoutButton).toBeInTheDocument();
  });

  it("dispatches logout action when the logout button is clicked", () => {
    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: LOGOUT }]);
  });
});
