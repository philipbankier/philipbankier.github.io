import { renderToStaticMarkup } from "react-dom/server";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import type { HomeProps } from "./content/contracts";
export function renderHome(props: HomeProps): string {
  return renderToStaticMarkup(<Home {...props} />);
}
export function renderNotFound(): string {
  return renderToStaticMarkup(<NotFound />);
}
