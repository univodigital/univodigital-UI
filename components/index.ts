/**
 * Component architecture barrel.
 *
 * Structure (per docs):
 * - ui/       → atomic primitives (Button, Card, Input, …)
 * - layout/   → Container, Section, Grid, Stack, …
 * - sections/ → marketing sections (Hero, Services, …)
 * - shared/   → cross-cutting composites
 */

export * from "./layout";
export * from "./ui";
export * from "./sections";
export * from "./shared";
