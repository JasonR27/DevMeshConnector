import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
