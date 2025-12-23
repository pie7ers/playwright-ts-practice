import { PlaywrightTestConfig } from "@playwright/test";

export function mergePlaywrightConfig(base: PlaywrightTestConfig, override: PlaywrightTestConfig){
  return {
    ...base,
    ...override,
    use: {
      ...base.use,
      ...override.use,
    },
    expect: {
      ...base.expect,
      ...override.expect,
    },
    projects: override.projects ?? base.projects,
    reporter: override.reporter ?? base.reporter,
  }
}