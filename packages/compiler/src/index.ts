export { buildResource, validateResource, writeTypeScriptProjects } from "./build";
export type { BuildOptions, BuildResult } from "./build";
export { doctor } from "./doctor";
export type { DoctorLine } from "./doctor";
export { loadConfig, repoRoot, RESOURCE_NAME } from "./config";
export { mapLuaPosition, resourceNameFromLua } from "./sourcemap";
