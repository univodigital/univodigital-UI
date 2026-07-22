/**
 * Layout primitives — Container, Section, Grid, Stack, Spacer, Divider,
 * PageWrapper, ContentWrapper, Navbar.
 */

export { Container, type ContainerProps } from "./container";
export { Section, type SectionProps } from "./section";
export { Grid, type GridProps } from "./grid";
export { Stack, type StackProps } from "./stack";
export { Spacer } from "./spacer";
export { Divider, type DividerProps } from "./divider";
export { PageWrapper, type PageWrapperProps } from "./page-wrapper";
export {
  ContentWrapper,
  type ContentWrapperProps,
} from "./content-wrapper";
export {
  Navbar,
  DesktopNav,
  MobileNav,
  HamburgerButton,
  NavLink,
  isNavActive,
} from "./navbar";
export { SkipToContent } from "./skip-to-content";

export type { GapToken, SpaceScale, SemanticSpace } from "./types";
