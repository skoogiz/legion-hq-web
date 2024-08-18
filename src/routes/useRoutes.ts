import {RouterLink, routesConfig} from "./routes";

type HookReturnValue = {
  routes: Record<string, RouterLink>;
};

export function useRoutes(): HookReturnValue {
  const config = routesConfig;
  return config;
}
