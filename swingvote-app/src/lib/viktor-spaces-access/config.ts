import type { ViktorSpaceAccessMode } from "./types";

type ViktorSpacesEnv = Pick<
  ImportMetaEnv,
  | "VITE_VIKTOR_AUTH_CLIENT_ID"
  | "VITE_VIKTOR_SPACES_ACCESS_MODE"
  | "VITE_VIKTOR_SPACES_API_URL"
  | "VITE_VIKTOR_SPACES_SPACE_ID"
>;

function getDefaultViktorSpacesEnv(): ViktorSpacesEnv {
  const viteEnv = import.meta.env as ViktorSpacesEnv | undefined;
  if (viteEnv) {
    return viteEnv;
  }
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  return (runtime.process?.env ?? {}) as ViktorSpacesEnv;
}

export function getViktorSpaceAccessMode(
  _env?: ViktorSpacesEnv,
): ViktorSpaceAccessMode {
  // Force space_auth — public landing with Convex auth for protected pages
  return "space_auth";
}

export function getViktorSpacesSpaceId(
  env: ViktorSpacesEnv = getDefaultViktorSpacesEnv(),
): string {
  return env.VITE_VIKTOR_SPACES_SPACE_ID || "";
}

export function getViktorAuthBaseUrl(
  env: ViktorSpacesEnv = getDefaultViktorSpacesEnv(),
): string {
  return env.VITE_VIKTOR_SPACES_API_URL || "";
}

export function getViktorAuthClientId(
  env: ViktorSpacesEnv = getDefaultViktorSpacesEnv(),
): string {
  const configured = env.VITE_VIKTOR_AUTH_CLIENT_ID;
  if (configured) return configured;
  const spaceId = getViktorSpacesSpaceId(env);
  return spaceId ? `space-${spaceId}` : "";
}
