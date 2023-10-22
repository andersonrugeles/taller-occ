import LayoutComponent from "../../../Layout/Layout";
import * as React from "react";
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";
import { useSession } from "next-auth/react";
import * as nextRouter from "next/router";
import * as nextAuthReact from "next-auth/react";
import { useRouter } from 'next/router'
jest.mock("next-auth/react");
describe("Render component Layout", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" },
    };
    useSession.mockReturnValueOnce([mockSession, "authenticated"]);
  });

  it("renders correctly", async () => {
    await act(async () => {
      render(
        <LayoutComponent>
          <div>children</div>
        </LayoutComponent>
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it("Render text in component", async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" },
    };
    useSession.mockReturnValueOnce([mockSession, "authenticated"]);
    render(
      <LayoutComponent>
        <div>children</div>
      </LayoutComponent>
    );
    const textElement = screen.getByText("Home");
    expect(textElement).toBeInTheDocument();
  });

  it("Click in collapsed", async () => {
    // mock useRouter
    jest.mock("next/router", () => ({
      useRouter: jest.fn(),
    }));

    // setup a new mocking function for push method
    const pushMock = jest.fn();

    // mock a return value on useRouter
    useRouter.mockReturnValue({
      query: {},
      // return mock for push method
      push: pushMock,
      // ... add the props or methods you need
    });
    const nextAuthReactMocked = nextAuthReact;
    nextAuthReactMocked.useSession.mockImplementation((_options) => {
      return { data: null, status: "loading" };
    });
    await render(
      <LayoutComponent>
        <div>children</div>
      </LayoutComponent>
    );
    const btnCollapsed = screen.getByTestId("btn-collapsed");
    const btnCar = screen.getByTestId("btn-car");
    await fireEvent.click(btnCollapsed);
    await fireEvent.click(btnCar);
  });

  it("Click in Home", async () => {
    // mock useRouter
    jest.mock("next/router", () => ({
      useRouter: jest.fn(),
    }));

    // setup a new mocking function for push method
    const pushMock = jest.fn();

    // mock a return value on useRouter
    useRouter.mockReturnValue({
      query: {},
      // return mock for push method
      push: pushMock,
      // ... add the props or methods you need
    });
    const nextAuthReactMocked = nextAuthReact;
    nextAuthReactMocked.useSession.mockImplementation((_options) => {
      return { data: null, status: "loading" };
    });
    await render(
      <LayoutComponent>
        <div>children</div>
      </LayoutComponent>
    );
    const btnHome= screen.getByTestId("btn-home");
    await fireEvent.click(btnHome);
  });
});
