/**
 * OPEN//77 client declarations for catalogue build 2.50.0+op77.148.
 * Generated from the official Devkit index. Do not edit by hand.
 */
/// <reference path="./tstl-language-extensions.d.ts" />

/** JSON-like table accepted by OPEN//77 natives. */
type Open77Table = Record<string, unknown>;
/** Callback passed to a native. `this: void` keeps TSTL from inserting a self argument. */
type Open77Callback = (this: void, ...args: unknown[]) => void;

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

declare function assert(this: void, value: unknown, message?: string): unknown;
declare function error(this: void, message: unknown, level?: number): never;
declare function pcall(this: void, fn: Open77Callback, ...args: unknown[]): LuaMultiReturn<[boolean, unknown]>;
declare function tonumber(this: void, value: unknown, base?: number): number | undefined;
declare function tostring(this: void, value: unknown): string;
declare function type(this: void, value: unknown): string;

/**
 * Listens for a local event.
 *
 * Registers a callback on the current resource's local event bus. The handler is owned by the current resource generation and is discarded automatically when that generation stops or reloads; it never receives network traffic unless the event was separately registered as a network event.
 *
 * @since 2.31.0+op77.3
 * @failure invalid_event_or_handler_limit
 * @open77Return handler id
 */
declare function AddEventHandler(this: void, event: string, handler: Open77Callback): number;

/**
 * FiveM compatibility: watches a state-bag key with FiveM's argument list.
 *
 * No permission. `bagName` is nil for every bag, `global`, `player:<id>`, `<kind>:<id>`, or `entity:<id>` -- the last matches any entity kind with that id. `key` may be nil for every key. The handler is called as `fn(bagName, key, value, reserved, replicated)`, where `reserved` is always nil and `replicated` always true, so a ported signature lines up. It shares the subscription index with `Open77.state.onChange`, so only this resource is touched.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_handler_or_watcher_limit, invalid_state_selector
 * @open77Return subscription id, or nil | reason: invalid_state_selector, invalid_handler_or_watcher_limit
 */
declare function AddStateBagChangeHandler(this: void, key: string, bagName: string, handler: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowAim(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowCrouch(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowDodge(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowInteraction(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowJump(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowRunning(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowShoot(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allow or block a local-player action.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function AllowWeapons(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Cancels a tick created by `SetTick`.
 *
 * Takes effect on the next pass: the tick body never runs again after this returns. Tick ids and timer ids come from one per-resource counter and never collide, so this is the cancellation `ClearTimeout` performs; both names exist because FiveM has both.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean
 */
declare function ClearTick(this: void, id: number): boolean;

/**
 * Cancels a timer created by `SetTimeout`.
 *
 * Cancels a pending timeout owned by the current resource generation. It returns `false` when the id is unknown or the callback has already begun; cancelling cannot interrupt a callback that is currently running.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean
 */
declare function ClearTimeout(this: void, id: number): boolean;

/**
 * Starts a coroutine managed by the host.
 *
 * Its body may call `Wait`, which an ordinary function cannot.
 *
 * @since 2.31.0+op77.3
 * @failure task_limit_or_stopping
 * @open77Return void
 */
declare function CreateThread(this: void, body: Open77Callback);

/**
 * FiveM-style alias for `Open77.kvp.delete`.
 *
 * FiveM-familiar alias for `Open77.kvp.delete`. It atomically removes only the named key owned by the calling resource and reports whether that key existed.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean | reason
 */
declare function DeleteResourceKvp(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * DestroySound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function DestroySound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Whether an id is live in the registry that owns that kind.
 *
 * FiveM has one opaque handle space; Open77 has one registry per kind, so the kind is required: vehicle, npc, elevator, prop, effect, player (loot is server-only). The one-argument FiveM form cannot be answered and returns false, kind_required. Each kind answers under its own registry's permissions, so a resource that may not read that kind gets false -- call the namespace function directly to tell denied from absent. Other reasons: id_required, invalid_entity_id, unknown_entity_kind, kind_unavailable_on_client.
 *
 * @since 2.31.13+op77.67
 * @failure id_required, invalid_entity_id, kind_required, kind_unavailable_on_client, unknown_entity_kind
 * @open77Return boolean | reason for the refusal
 */
declare function DoesEntityExist(this: void, kind: string, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * FiveM compatibility: a table carrying one entity's state bag.
 *
 * No permission. FiveM has one entity namespace and Open77 has three registries, so the id is probed against the mirror as vehicle, then npc, then prop, and falls back to vehicle. `Open77.state.entity(kind, id)` is always unambiguous and is what a new resource should use.
 *
 * @since 2.31.13+op77.67
 * @open77Return table { state }
 */
declare function Entity(this: void, id: number | string): Open77Table;

/**
 * FiveM-style alias for `Open77.runtime.executeCommand`.
 *
 * Resolves against the client registry only and reports whether it matched; it never forwards to the server by itself. The chat composer uses that answer to decide whether to spend a net event.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean | reason
 */
declare function ExecuteCommand(this: void, line: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Declares a function callable by other resources, and proxies calls to theirs.
 *
 * Publishes a named function from the current resource so another resource can call it through `Open77.exports.call`. The registration is tied to the current generation, so stale functions cannot survive a stop or hot reload.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean
 */
declare function exports(this: void, name: string, body: Open77Callback): boolean;

/**
 * Request or release a native local-player freeze.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function FreezePosition(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Request or release a native local-player freeze.
 *
 * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
 *
 * @permission players.controls
 * @since 2.31.13+op77.63
 * @open77Return true, or false, reason
 */
declare function FreezeRotation(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Name of the current resource.
 *
 * Returns the immutable manifest name of the resource whose Lua VM is executing. Use it for diagnostics and namespacing, not as a mutable display label.
 *
 * @since 2.31.0+op77.3
 * @open77Return string
 */
declare function GetCurrentResourceName(this: void): string;

/**
 * Monotonic milliseconds since an arbitrary epoch.
 *
 * The FiveM name for the clock behind `Open77.time.monotonic()`, which reports seconds. The epoch is arbitrary and is not wall clock: only the difference between two readings means anything, and the client and the server share no origin. The server has the same global. See the FiveM compatibility guide.
 *
 * @since 2.31.13+op77.67
 * @open77Return integer milliseconds
 */
declare function GetGameTimer(this: void): number;

/**
 * TweakDBID of a record name -- not a GTA hash.
 *
 * CRC-32/ISO-HDLC of the name in the low 32 bits, the name length in byte 4, which is what REDengine computes. This is deliberately NOT the Jenkins one-at-a-time hash FiveM returns: Open77 records are TweakDB strings, so a hash constant copied out of a FiveM resource names a GTA model and matches nothing here. The server computes the identical value.
 *
 * @since 2.31.13+op77.67
 * @open77Return integer TweakDBID
 */
declare function GetHashKey(this: void, text: string): number;

/**
 * Real caller of the currently executing export.
 *
 * Returns nil outside an export callback. Use this value for service ownership instead of accepting a forgeable owner argument.
 *
 * @since 2.31.0+op77.3
 * @open77Return resource name, or nil
 */
declare function GetInvokingResource(this: void): string | undefined;

/**
 * Generation of the resource invoking the current export.
 *
 * Returns nil outside an export callback. A changed generation lets a service retire handles left by an older VM.
 *
 * @since 2.31.0+op77.3
 * @open77Return integer, or nil
 */
declare function GetInvokingResourceGeneration(this: void): number | undefined;

/**
 * FiveM-style alias for `Open77.runtime.commands`.
 *
 * Client-side. Each entry carries `name`, `resource`, `restricted` and, when the registrar declared them, `help` and `parameters` -- two fields more than FiveM's, because the composer needs them to build a completion.
 *
 * @since 2.31.13+op77.67
 * @open77Return array of tables
 */
declare function GetRegisteredCommands(this: void): Open77Table;

/**
 * FiveM-style alias for `Open77.kvp.get`.
 *
 * FiveM-familiar alias for `Open77.kvp.get`. It returns the original stored Lua type or nil when absent and stays inside the active connection-address and calling-resource namespace.
 *
 * @since 2.31.0+op77.3
 * @open77Return value or nil | reason
 */
declare function GetResourceKvp(this: void, key: string, arg2?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * State of a resource on this client: `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name this host does not know. There is no `started`: a resource that is up reads `running`, so `== "started"` is never true.
 *
 * Reads the lifecycle state currently known by the client resource host: `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name this host does not know. There is no `started`: a resource that is up reads `running`, so `== "started"` is never true. A snapshot only: it does not start, stop, or wait for the target resource. `Open77.resource.state` is the same function.
 *
 * @since 2.31.0+op77.3
 * @failure missing
 * @open77Return one of the eight state names
 */
declare function GetResourceState(this: void, resource: string): unknown;

/**
 * GetSoundState: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @failure permission_denied:audio.play, sound_not_found
 * @open77Return table, or nil, reason
 */
declare function GetSoundState(this: void, id: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * The server-wide state bag, read-only on the client.
 *
 * The FiveM spelling of `Open77.state.global`, mirroring what the server replicated. Reading a key the server never set, or that this client has not received yet, answers nil — check `Open77.state.ready()` before treating a nil as an absence. Writing is refused: the client never writes a bag, because a bag is shared state and a client that could write one could write another player's job or another vehicle's keys. Ask with `Open77.state.request`, which the server arbitrates and republishes.
 *
 * @since 2.31.13+op77.67
 * @open77Return the global bag, indexable by key
 */
declare function GlobalState(this: void): unknown;

/**
 * False in the client VM, true in the server VM.
 *
 * How one shared script branches between the two sides.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean
 */
declare function IsDuplicityVersion(this: void): boolean;

/**
 * Graph-produced aiming state, including toggle aim.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerAiming(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Crouched locomotion state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerCrouching(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Native underwater swimming state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerDiving(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Mounted in the driver seat.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerDriver(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Falling phase.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerFalling(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Locomotion ground contact.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerGrounded(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Native vehicle mounting state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerInVehicle(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Jump or double-jump phase.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerJumping(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Mounted in a non-driver seat.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerPassenger(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Reloading state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerReloading(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Graph trigger state, not confirmation of a projectile or damage.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerShooting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Sliding locomotion state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerSliding(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Sprint state rather than a velocity threshold.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerSprinting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Native surface-swimming or diving state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerSwimming(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Vault traversal state.
 *
 * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
 *
 * @permission players.read
 * @since 2.31.13+op77.63
 * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
 * @open77Return boolean, or nil, reason
 */
declare function IsPlayerVaulting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Alias of `GetHashKey`; returns a TweakDBID.
 *
 * Kept so ported code reads naturally, but it is not the Jenkins hash the name suggests -- see GetHashKey.
 *
 * @since 2.31.13+op77.67
 * @open77Return integer TweakDBID
 */
declare function joaat(this: void, text: string): number;

/**
 * Reads a file belonging to the calling resource.
 *
 * The FiveM spelling of `Open77.resource.readFile`, and no more powerful: the path resolves under this resource's own root, keeps the 1 MiB cap, and naming another resource returns nil, cross_resource_read_denied rather than quietly reading your own file. A traversal returns nil, invalid_resource_path. The server has the same global rooted at the resource's data/ directory, plus SaveResourceFile.
 *
 * @since 2.31.13+op77.67
 * @failure cross_resource_read_denied
 * @open77Return file contents, or nil plus a reason
 */
declare function LoadResourceFile(this: void, resourceName: string, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * PauseSound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function PauseSound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Play2DSound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, invalid_audio_arguments, invalid_audio_asset, invalid_position, network_audio_requires_server, permission_denied:audio.play
 * @open77Return integer handle, or nil, reason
 */
declare function Play2DSound(this: void, asset: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;

/**
 * Play3DSound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, invalid_audio_arguments, invalid_audio_asset, invalid_position, network_audio_requires_server, permission_denied:audio.play
 * @open77Return integer handle, or nil, reason
 */
declare function Play3DSound(this: void, asset: string, position: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;

/**
 * FiveM compatibility: a table carrying one player's state bag and `source`.
 *
 * No permission. `Player(id).state` is the same bag as `Open77.state.player(id)`, read-only on the client. `source` is the id that was passed in. Present so ported code runs unchanged; new code can use either.
 *
 * @since 2.31.13+op77.67
 * @open77Return table { state, source }
 */
declare function Player(this: void, id: number | string): Open77Table;

/**
 * PlaySound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function PlaySound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Writes to the Open77 log, prefixed with the resource name.
 *
 * Writes a resource-prefixed line to the Open77 log. Values are converted with bounded formatting; this does not send a chat message or write into a WebUI page.
 *
 * @since 2.31.0+op77.3
 * @open77Return void
 */
declare function print(this: void, ...args: unknown[]);

/**
 * Builds a quaternion: a plain { x, y, z, w } table with three rotation methods.
 *
 * Available in both runtimes. Deliberately minimal -- normalize (a zero quaternion becomes the identity, never NaN), mul (Hamilton product, this rotation then the other) and rotate (returns a vector3), plus unpack and table. No arithmetic operators and no #. It exists so the { x =, y =, z =, w = } orientation that Open77.effects and Open77.props already accept becomes computable; the result stays exactly that table.
 *
 * @since 2.31.13+op77.67
 * @open77Return quat, or nil, reason
 */
declare function quat(this: void, x: number, y: number, z: number, w: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * FiveM-style alias for `Open77.runtime.registerCommand`.
 *
 * Client-side. The server runtime has its own `RegisterCommand` with the same handler shape but real ACL enforcement behind `restricted`; read both before porting a command that is meant to be admin-only.
 *
 * @since 2.31.13+op77.67
 * @open77Return true, or false | reason
 */
declare function RegisterCommand(this: void, name: string, handler: Open77Callback, restricted?: boolean, suggestion?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Declares a named, rebindable action bound to a key.
 *
 * Declares a named, rebindable action bound to a key, as an engine primitive. Requires `input.actions`. Accepts a spec table `{ id, name, key, hold, onPressed, onReleased }` or the positional form `(id, name, key, onPressed [, onReleased])`; the callback receives the mapping id, fires on the key-down edge (and key-up in hold mode), and never fires while a page owns the keyboard. Returns the effective key (the player's saved rebind, else the default). The player rebinds it from Pause -> Settings -> KEY BINDINGS, and the choice persists machine-globally across servers and relaunches. Mirrored as `Open77.input.registerKeyMapping`.
 *
 * @permission input.actions
 * @since 2.31.7+op77.16
 * @open77Return boolean: true when the mapping is installed, false when it was refused | string: the effective key (the player's rebinding, or the default) on success, the reason on refusal
 */
declare function RegisterKeyMapping(this: void, id: string, name: string, key: string, onPressed?: Open77Callback, onReleased?: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Allows an event to arrive from the server.
 *
 * Allows an authenticated server event with this name to enter the current resource, and optionally attaches a handler in the same call. Registration is generation-scoped, requires `network.events`, and does not turn arbitrary client events into server events.
 *
 * @permission network.events
 * @since 2.31.0+op77.3
 * @failure permission_denied:network.events
 * @open77Return handler id
 */
declare function RegisterNetEvent(this: void, event: string, handler?: Open77Callback): number;

/**
 * Removes a handler.
 *
 * Removes the exact callback previously registered for the named local event. It returns `false` when that event/callback pair is not owned by the current resource generation.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean
 */
declare function RemoveEventHandler(this: void, event: string, handler: Open77Callback): boolean;

/**
 * FiveM compatibility: stops a state-bag change subscription.
 *
 * No permission. The same function as `Open77.state.offChange`; takes the id either registration returned.
 *
 * @since 2.31.13+op77.67
 * @open77Return true, otherwise false
 */
declare function RemoveStateBagChangeHandler(this: void, subscription: number): boolean;

/**
 * Loads a local Lua module or a published dependency library into the caller's client VM.
 *
 * Client-only Lua module loader. Loads a local module, or a published module from a declared, running dependency using `@provider` / `@provider/module`. The dependency form requires the development client update introduced with PolyZone. Dots map to folders; omit `.lua`. Code executes synchronously in the caller's VM, permissions and budget. Results are cached by resolved file per caller generation; no returned value becomes `true`. Lookup/loading failures return `nil, reason`; circular imports are rejected. Reload consumers to adopt changed library code. Unlike exports, no live Lua object crosses a VM boundary. No HTTP, native `package` loader or unrestricted filesystem access is exposed; the dedicated-server sandbox has no `require`.
 *
 * @since 2.31.0+op77.3
 * @failure circular_module_dependency, invalid_module_name, module_dependency_not_declared, module_dependency_not_running
 * @open77Return module value (true when no value is returned), or nil on loading failure | reason on failure
 */
declare function require(this: void, module: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Unproject a normalized screen point into a world-space ray.
 *
 * Requires world.query. x/y use normalized top-left viewport coordinates in [0,1]. maxDistance defaults to 100 metres and must be finite in [0.1,1000]. Returns origin, unit direction, endpoint position and maxDistance; this is not a collision result. Uses the active camera and checks projection consistency. Returns nil/reason if the camera or projection is unavailable. Identical global alias: Screen2DPointTo3DSpace. See screen-picking.md and context-menu.md. Requires the new screen-picking client, not the earlier .62 release.
 *
 * @permission world.query
 * @since 2.31.13+op77.63
 * @open77Return ray table, or nil, reason
 */
declare function Screen2DPointTo3DSpace(this: void, x: number, y: number, maxDistance?: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * SeekSound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function SeekSound(this: void, id: number, seconds: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * FiveM-style alias for `Open77.kvp.set`.
 *
 * FiveM-familiar alias for `Open77.kvp.set`. It stores one typed value in the calling resource's persistent namespace for the active connection address; it cannot select another server or resource.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean | reason
 */
declare function SetResourceKvp(this: void, key: string, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * SetSoundPosition: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function SetSoundPosition(this: void, id: number, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * SetSoundVolume: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function SetSoundVolume(this: void, id: number, volume: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Runs a function once per host tick.
 *
 * A scheduler task looping with an implicit `Wait(0)`: same per-frame budget, same task cap, stopped with the resource. An error inside the function is logged and the tick survives it; after five consecutive failures the tick logs `tick cancelled after 5 consecutive failures` and cancels itself. One successful pass resets the count.
 *
 * @since 2.31.13+op77.67
 * @failure task_limit_or_stopping
 * @open77Return tick id, or nil plus invalid_tick_function / task_limit_or_stopping
 */
declare function SetTick(this: void, body: Open77Callback): unknown | undefined;

/**
 * Runs a function once, later.
 *
 * Schedules a Lua callback after at least the requested number of milliseconds without blocking the game thread. The timer belongs to the current resource generation and is cancelled automatically on stop or hot reload.
 *
 * @since 2.31.0+op77.3
 * @failure task_limit_or_stopping
 * @open77Return timer id
 */
declare function SetTimeout(this: void, milliseconds: number, body: Open77Callback): number;

/**
 * StopSound: local package audio.
 *
 * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.play
 * @since 2.31.13+op77.63
 * @open77Return true, or failure, reason
 */
declare function StopSound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Publishes an event to every handler in this resource's VM.
 *
 * Dispatches an event only inside the client resource runtime. Arguments must fit the runtime's bounded script-value representation; use `TriggerServerEvent` for traffic that must cross the network.
 *
 * @since 2.31.0+op77.3
 * @failure event_payload_not_serializable, reserved_animation_event, reserved_cyberware_event, reserved_dash_event, reserved_effect_event, reserved_hacking_event, reserved_interaction_event, reserved_loading_screen_event, reserved_player_model_event, resource_preparing
 * @open77Return true, or false, reason
 */
declare function TriggerEvent(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Sends an event to the server.
 *
 * Serializes and sends an event to the connected server with the caller's authenticated player identity. It requires `network.events`; tables must be serializable and payload limits are enforced before anything is queued.
 *
 * @permission network.events
 * @since 2.31.0+op77.3
 * @failure invalid_network_event, network_payload_not_serializable, network_payload_too_large, network_unavailable, permission_denied:network.events, reserved_callback_event, reserved_event, resource_preparing
 * @open77Return boolean
 */
declare function TriggerServerEvent(this: void, event: string, ...args: unknown[]): boolean;

/**
 * Builds a vector of the size the arguments imply.
 *
 * Available in both runtimes. With two, three or four numbers it builds a vector2, vector3 or vector4. With a single table it picks the size from the axes actually present: w means vector4, else z means vector3, else y means vector2 -- which makes vec(position) the short way to wrap a position returned by any existing API. A quaternion is refused, because vec makes vectors.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector2, vector3 or vector4, or nil, reason
 */
declare function vec(this: void, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 2D vector: a plain { x, y } table with vector behaviour.
 *
 * Available in both runtimes. Same operators, swizzles and methods as vector3, minus cross, which answers nil, "cross_requires_vector3". Takes two finite numbers, or one vector or { x =, y = } table to copy.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector2, or nil, reason
 */
declare function vector2(this: void, x: number, y: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 3D vector: a plain { x, y, z } table with vector behaviour.
 *
 * Available in both runtimes, from the shared prelude scripting/lua/open77_vector.lua. Takes three finite numbers, or one vector or { x =, y =, z = } table to copy. The result IS a table with real x, y and z fields, so every API that accepts a position table accepts it unchanged and json.encode emits {"x":..,"y":..,"z":..}. Supports + - * / (by a vector, a position table or a number), unary minus, # for magnitude, == (exact, same kind only), tostring/.. as vector3(1.0, 2.0, 3.0), the swizzles .xy/.xz/.yz/.xyz/.zyx, and the methods length, lengthSquared, distance, distanceSquared, normalize (zero stays zero), dot, cross, lerp (unclamped), unpack and table. Fields are read-only except the components themselves, which Lua 5.4 cannot intercept. Operators raise; this constructor returns nil, reason. See the Vectors and quaternions guide.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector3, or nil, reason
 */
declare function vector3(this: void, x: number, y: number, z: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 4D vector: a plain { x, y, z, w } table with vector behaviour.
 *
 * Available in both runtimes. Same operators and methods as vector3, minus cross. Its swizzles reach w, so v.xyz narrows a vector4 to a vector3. Takes four finite numbers, or one vector or { x =, y =, z =, w = } table to copy.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector4, or nil, reason
 */
declare function vector4(this: void, x: number, y: number, z: number, w: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Suspends the current coroutine.
 *
 * Only usable inside a `CreateThread`.
 *
 * @since 2.31.0+op77.3
 * @open77Return void
 */
declare function Wait(this: void, milliseconds: number);

interface WebUIPageApi {
    /**
     * Destroys the surface.
     *
     * Destroys this resource-owned browser surface, removes all of its Lua event handlers and invalidates the page handle. Resource teardown performs the same cleanup automatically.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    destroy(): boolean;
    /**
     * Check whether this resource-owned page currently owns keyboard or cursor focus.
     *
     * Call page:hasFocus(). Reads actual focus ownership and presentation availability without changing either. Returns false if another surface owns focus or this surface cannot present. Only accepts a live page handle owned by the calling resource. Combine with setFocus(false,false), hide and resource-scoped control cleanup when closing a modal. See screen-picking.md and the generic open77_contextmenu package.
     *
     * @since 2.31.13+op77.63
     * @open77Return boolean
     */
    hasFocus(): boolean;
    /**
     * Hides the surface.
     *
     * Makes the owned browser surface invisible without destroying its document or handlers. Visibility is client-local and can be restored with `show()`.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    hide(): boolean;
    /**
     * Numeric id of the surface.
     *
     * Returns the opaque client-local surface id for diagnostics and host integration. It is not a network id and must not be persisted across page destruction or resource reload.
     *
     * @since 2.31.0+op77.3
     * @open77Return integer
     */
    id(): number;
    /**
     * Removes a handler registered with `on`.
     *
     * Removes one WebUI callback id previously returned by `page:on`. The id is the only argument -- there is no event name parameter. It must belong to this page and the current resource generation.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    off(handlerId: number): boolean;
    /**
     * Listens for an event the page raised with `Open77.emit`.
     *
     * Registers a Lua callback for an event emitted by this page's JavaScript bridge. Event names and handler counts are bounded, and the registration is automatically removed with the page or resource generation.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_event_or_web_handler_limit
     * @open77Return handler id
     */
    on(event: string, handler: Open77Callback): number;
    /**
     * Answers an `invoke` call made by the page.
     *
     * Completes a pending JavaScript request identified by its request id with a JSON-serializable Lua value. The payload is the SECOND argument and the success flag the third: `page:reply(requestId, { accepted = true })` resolves the promise, and a third argument of `false` rejects it. Success defaults to true when omitted. The payload is positional and cannot be skipped -- an absent third argument fails with `invalid_webui_reply`, though an explicit `nil` is accepted. Request ids are page-local and invalid or unsupported payloads are rejected.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_webui_reply
     * @open77Return boolean
     */
    reply(requestId: number, payload: Open77Table, ok?: boolean): boolean;
    /**
     * Sends an event to the page.
     *
     * Sends a named event and JSON-serializable payload from Lua to this page's JavaScript runtime. This is local UI IPC, not a network event, and both event names and payloads are bounded.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_webui_event_payload
     * @open77Return boolean
     */
    send(event: string, payload?: Open77Table): boolean;
    /**
     * Gives the surface focus, cursor and keyboard separately.
     *
     * The FIRST argument is keyboard capture, not a general `focused` flag, and the second is the cursor: `page:setFocus(true, true)` takes both, `page:setFocus(false, true)` takes only the mouse. Keyboard capture is asked for separately so a page can take the mouse without depriving the game of the movement keys. The optional third argument keeps game input alive while the page holds focus and requires `webui.keep_input`; without that permission it fails with `permission_denied:webui.keep_input`.
     *
     * @permission webui.keep_input
     * @since 2.31.0+op77.3
     * @failure permission_denied:webui.keep_input
     * @open77Return boolean
     */
    setFocus(keyboard: boolean, cursor?: boolean, keepInput?: boolean): boolean;
    /**
     * Shows the surface.
     *
     * Avoid calling this right after `create` — see the race described in `Open77.webui.create`.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    show(): boolean;
}
interface WebUIApi {
    Page: WebUIPageApi;
}

declare const WebUI: WebUIApi;

interface CitizenApi {
    /**
     * Waits for a promise; exactly promise:await().
     *
     * Provided because ported code writes it this way. It needs a managed task like any await: outside one it answers nil, await_requires_scheduler_coroutine rather than parking the VM.
     *
     * @since 2.31.13+op77.67
     * @failure await_requires_scheduler_coroutine, promise_cancelled
     * @open77Return the resolved values, or nil, reason
     */
    Await(this: void, promise: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of ClearTick.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function.
     *
     * @since 2.31.13+op77.67
     * @open77Return boolean
     */
    ClearTick(this: void, id: number): boolean;
    /**
     * Alias of ClearTimeout.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function.
     *
     * @since 2.31.13+op77.67
     * @open77Return boolean
     */
    ClearTimeout(this: void, id: number): boolean;
    /**
     * Alias of CreateThread.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. Citizen.CreateThreadNow is deliberately absent: this scheduler starts a task on the next pass, and resuming one inline from inside a running task would reset that task's instruction counter and deadline mid-flight.
     *
     * @since 2.31.13+op77.67
     * @failure task_limit_or_stopping
     * @open77Return task id
     */
    CreateThread(this: void, body: Open77Callback): number;
    /**
     * Alias of SetTick.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. See SetTick for the per-frame budget and the five-consecutive-failure cancellation.
     *
     * @since 2.31.13+op77.67
     * @failure task_limit_or_stopping
     * @open77Return tick id, or nil, reason
     */
    SetTick(this: void, body: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of SetTimeout.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function.
     *
     * @since 2.31.13+op77.67
     * @failure task_limit_or_stopping
     * @open77Return timer id
     */
    SetTimeout(this: void, milliseconds: number, body: Open77Callback): number;
    /**
     * Writes to the resource log at debug level; the same function as Open77.log.debug.
     *
     * FiveM's trace channel, mapped onto the log this resource already writes to. It is not a separate sink and has no separate filter.
     *
     * @since 2.31.13+op77.67
     * @open77Return void
     */
    Trace(this: void, ...args: unknown[]): void;
    /**
     * Alias of Wait.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. Only usable inside a managed task.
     *
     * @since 2.31.13+op77.67
     * @open77Return void
     */
    Wait(this: void, milliseconds: number): void;
}

declare const Citizen: CitizenApi;

interface Open77PromiseApi {
    /**
     * Schedules a continuation for when the promise settles.
     *
     * Not chainable: it returns the id of the task it schedules, not a new promise, so p:next(a):next(b) does not work and sequences belong in a CreateThread with :await(). The id cancels a continuation that is still waiting. A rejection is recognised by shape -- the nil, <string reason> pair :await() returns -- which is this codebase's failure convention everywhere, so a promise deliberately resolved with a leading nil followed by a string reads as rejected.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_promise_handler, task_limit_or_stopping
     * @open77Return task id, or nil, reason
     */
    next(onResolved?: Open77Callback, onRejected?: Open77Callback): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Settles a promise you created with promise.new as failed.
     *
     * Same shape and same refusals as resolve. A non-string reason becomes promise_rejected, because the reason has to survive as text for the awaiter's nil, reason pair to mean anything.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false, reason
     */
    reject(reason?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Settles a promise you created with promise.new, with the values the awaiter receives.
     *
     * Only a promise this resource created can be resolved; one returned by Open77.exports.call or Open77.net.call is settled by the runtime. Settling twice answers false, promise_already_settled, and a promise whose single consumer has already taken its value answers false, promise_cancelled. On the client the values cross the same serialization boundary exports use, so one that cannot be carried is refused with false, promise_value_not_serializable rather than silently dropped.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false, reason
     */
    resolve(...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * State of the promise, without waiting.
     *
     * Returns the promise state without yielding the current coroutine. Use it for polling or diagnostics; `await()` remains the normal way to receive a completed export result.
     *
     * @since 2.31.0+op77.3
     * @failure cancelled, pending, rejected, resolved
     * @open77Return "pending", "resolved" or "rejected"
     */
    status(): unknown;
}
interface Open77AbilitiesApi {
    /**
     * Admits or refuses a pending slam activation.
     *
     * Requires `player.abilities.project`. `allowed` must be a boolean -- there is no third answer, and a non-boolean is refused as `invalid_approval` rather than read as false. The sequence must match a pending activation on this owned request.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return true, or nil | reason: invalid_request, invalid_sequence, invalid_approval
     */
    approveSlam(this: void, request: number, sequence: number, allowed: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Cancels a slam activation, with a reason.
     *
     * Requires `player.abilities.project`. The reason is a string of 1 to 96 characters and is required: an unexplained cancellation would leave nothing in the log to explain a slam that did not happen.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return true, or nil | reason: invalid_request, invalid_sequence, invalid_reason
     */
    cancelSlam(this: void, request: number, sequence: number, reason: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Configures the calling resource's native Ground Slam projector.
     *
     * Client support API requiring player.abilities.project and a running resource. options may contain ground and air booleans (at least one true), staminaManaged=true, maxDurationMs from 500 through 15000 and finite maxFallSpeed greater than zero through 60. These are adapter readiness bounds, not arbitrary motion or damage controls. Returns a configuration request handle or nil, reason; native projection acknowledgement and server admission are still required. Server creators normally use Open77.abilities.define/grant through the optional support resource. No paid implant or vanilla perk progression is changed. See ground-slam.md; a returned handle does not prove playable native movement.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_configuration, permission_denied:player.abilities.project, resource_not_running, server_managed_required
     * @open77Return request handle, or nil, reason
     */
    configureSlam(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Projects a correlated, server-accepted Ground Slam phase for an observer.
     *
     * Client support API requiring player.abilities.project and a running resource. Accepts a positive safe-integer playerId, a 32-hex-character activation ID, uint32 sequence greater than zero, phase, airborne boolean and elapsedMs from zero through 30000. Phases are windup, descent, contact, impact, recovery, complete, cancelled or rejected. It owns presentation only and never authorizes movement, damage or entitlement. Owner-scoped cleanup, incarnation checks and Dash/Slam pose arbitration remain native responsibilities. true means the adapter accepted the presentation request; actual rendering and sound require live observation. See ground-slam.md for the authoritative public workflow.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_activation, invalid_phase, invalid_presentation, permission_denied:player.abilities.project, resource_not_running
     * @open77Return true, or nil, reason
     */
    presentSlam(this: void, playerId: number, activationId: string, sequence: number, phase: string, airborne: boolean, elapsedMs: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Releases this resource's ground-slam ownership.
     *
     * Requires `player.abilities.project`. Takes no arguments: the owner is the calling resource, which cannot be supplied. Resource stop releases it for you, so a reloading gamemode never leaves the slam claimed.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return true, or nil | reason: abilities_backend_unavailable
     */
    releaseSlam(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Asks the native layer to begin a slam and returns its sequence.
     *
     * Requires `player.abilities.project`. The returned sequence identifies this activation for `approveSlam` and `cancelSlam`; it is how a late answer is stopped from acting on the wrong slam.
     *
     * @permission player.abilities.project
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return sequence (integer), or nil | reason: invalid_request, abilities_backend_unavailable
     */
    requestSlam(this: void, request: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The local character's current ground-slam activity, with its recent history.
     *
     * Requires `player.abilities.read`. Returns `{ request, sequence, phaseSequence, impactSequence, elapsedMs, phase, mode, reason, grounded, position, contact, verticalSpeed, history }`, where `history` holds up to sixteen recent phase receipts. It is what the presenting resource replays through `presentSlam`; it is observation, not authority.
     *
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return table, or nil | reason: permission_denied:player.abilities.read, abilities_backend_unavailable
     */
    slamActivity(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The phase of a ground-slam configuration request.
     *
     * Requires `player.abilities.read`. Takes the request id `configureSlam` returned and answers the native phase plus a reason. One dispatcher serves the six slam operations, so they share identical permission, lifetime and handle checks.
     *
     * @since 2.31.13+op77.67
     * @failure abilities_backend_unavailable, invalid_approval, invalid_reason, invalid_request, invalid_sequence, resource_not_running
     * @open77Return phase string | reason
     */
    slamState(this: void, request: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77AnchorsApi {
    /**
     * Removes every world anchor owned by the calling resource.
     *
     * Other resources are unaffected. Anchors are also cleared automatically on stop, reload, world exit, and when their page is destroyed.
     *
     * @since 2.31.0+op77.7
     * @open77Return true on success, otherwise false | reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Anchors a world point, projected by the plugin on every game frame.
     *
     * No permission of its own: the capability is the one `Open77.camera.project` already grants ungated, with the sampling moved off the Lua tick.
     *
     * Options require exactly one of `position` (a fixed world point) or `entity` (followed live, with an optional world-axis `offset`) -- passing both, or neither, is refused with `position_or_entity_required`. They also accept `tag` (`[A-Za-z0-9_.:-]`, 32 bytes), `maxDistance` (default 100.0), `minDistance` (default 0.0) and `visible` (default true).
     *
     * `render` selects the delivery and is fixed for the anchor's life: `page` (the default) publishes coordinates to a WebUI page, while `card`, `ring` and `dot` are drawn natively by the plugin in the frame that presents them. `page` is REQUIRED only for `render = "page"`; a native style has nowhere to publish and needs no surface at all, though a page passed alongside one is still ownership-checked. A page this resource does not own is refused with `stale_or_unowned_page`.
     *
     * Native styles take a `presentation` table: `label`, `sublabel` (192 bytes each), `key` (`card` only, 8 bytes), `color`, `accent`, `background` (`#RRGGBB` or `#RRGGBBAA`; anything else is refused as `invalid_color` / `invalid_accent` / `invalid_background`), `scale`, `thickness`, `radius` and `groundOffset` (`ring`), `progress` (`card`; negative draws no bar) and `showDistance`. The colour defaults are the OPEN//77 design tokens -- `color` `#F2F6F8`, `accent` `#22D8E2`, `background` `#0A1220F0` -- and they matter more than defaults usually do, because `presentation` is patched whole: see `Open77.anchors.update`.
     *
     * The batched `open77:anchors` event a page receives is the COMPLETE set for that surface; an id that is absent is hidden, out of its distance band, behind the camera, or its entity is not streamed. Treat absence as gone rather than holding the last coordinate. Limits are 32 anchors per resource and 128 in total.
     *
     * @since 2.31.0+op77.7
     * @failure anchors_backend_unavailable, options_must_be_a_table
     * @open77Return anchor handle string, or nil | reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the calling resource's world anchors with their last projection.
     *
     * Each snapshot carries its requested definition plus `render` (echoing its style), `resolved` (where the anchor actually was on the last frame -- for an entity anchor the live transform plus the offset, not what was registered) and `screen` (`x`, `y` normalised to [0..1] with a top-left origin, and `depth` in metres in front of the camera), `distance`, `onScreen`, and `projected`. An invisible anchor is still projected and still listed, so this stays the way to decide which of a resource's world points deserve one of its 32 slots.
     *
     * @since 2.31.0+op77.7
     * @failure anchors_backend_unavailable
     * @open77Return array of { id, tag, kind, render, entity, offset, surface, maxDistance, minDistance, visible, projected, onScreen, distance, position, resolved, screen }, or nil | reason
     */
    list(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes one resource-owned world anchor.
     *
     * Removing an unknown handle succeeds, so teardown is idempotent.
     *
     * @since 2.31.0+op77.7
     * @open77Return true on success, otherwise false | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Patches a resource-owned world anchor.
     *
     * Top-level fields are patched individually: only what you supply changes. **`presentation` is the exception and is patched WHOLE.** `update(handle, { presentation = { label = "Locked" } })` does not keep the colours you set at creation -- it resets `color`, `accent`, `background` and every other presentation field to its default. Always resend the complete presentation table, or keep it in a local and patch that. A prompt changes its label, its key and its hold progress on the same frame or not at all, which is why the table has one dirty flag rather than eleven.
     *
     * Neither `page` nor the anchor's kind is patchable; patching a field the kind does not own -- `position` on an entity anchor, `entity` or `offset` on a position anchor -- is refused with `anchor_kind_mismatch` rather than ignored. `render` is fixed at creation and a patch carrying it is refused with `render_is_not_patchable`. Re-pointing an entity anchor at a new `entity` is supported, which is the respawn case. Ownership prevents mutation of another resource's anchor.
     *
     * @since 2.31.0+op77.7
     * @open77Return true on success, otherwise false | reason
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77AnimationsApi {
    /**
     * Cancel the local player's RP action and pending requests.
     *
     * Stops local presentation and queues a reliable self-cancellation request. Omitting playbackId also abandons pending starts; late acceptances are cancelled. Supply the ID from request() or sequence() in delayed callbacks so they cannot stop a replacement action. A mismatched active ID rejects with stale_playback. Resolving true means cancellation was queued (or nothing was active), not that the server has acknowledged the stop; observe onPlayerAnimationChanged for authoritative state. A player may cancel their own server-started action, never another player's action. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to true when cancellation is queued or already inactive | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    cancel(this: void, playbackId?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Look up which RP profile owns a clip name.
     *
     * Clip-first discovery: the counterpart of get(), for a caller that knows the animation name but not the action that carries it. Resolves to a copy of the owning profile, or nil when no shipped device's authored tree contains that clip. Clip names are case-sensitive. A name can appear in the game's 23,044-entry discovery inventory and still resolve to nil here: only the 70 clips of the twelve shipped devices are addressable. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.67
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to the owning profile table, or nil when no shipped device carries the clip | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    clip(this: void, clip: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * List every addressable clip with the profile that owns it.
     *
     * The closest thing this engine has to enumerating an animation dictionary. Returns one row per clip, { clip = string, profile = string }, sorted by clip name. The optional query is a case-insensitive substring matched against the clip name and the profile ID; it must be at most 128 characters. This is the complete addressable set, not a catalogue of what exists: a clip plays only because a shipped device's authored workspot tree carries it. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.67
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to an array of { clip, profile } rows | nil, reason if dispatch fails; await() returns nil, invalid_query if the query is too long
     */
    clips(this: void, query?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The clip a body is currently playing.
     *
     * Returns false when it is playing nothing — which is a state, not an error.
     *
     * @since 2.31.0+op77.3
     * @open77Return clip name, or false | reason, when applicable
     */
    current(this: void, entity: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Look up one RP profile without starting playback.
     *
     * Resolves to a copy of the profile, including its default clip and exact allowed variants. Profile IDs are case-sensitive. An unknown ID resolves to nil without an error; check the second await result to distinguish a failed request from a missing profile. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to a profile table, or nil when absent | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    get(this: void, profileId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Find synchronized RP animation profiles in the local catalogue.
     *
     * Returns all supported profiles when the query is empty, or a case-insensitive substring match across ID, label and category (up to 128 characters). Definitions include kind, clip variants and rig metadata. Choose a kind=layer profile such as drink_walk to preserve locomotion; catalogue membership does not prove native rendering. Resolves asynchronously to copied definitions. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to a profile array | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    list(this: void, query?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Plays a named animation on a body.
     *
     * Does not work on the local player: their body cannot hold a workspot. Use `Open77.animations.playSelf` for that, which stands a double in for them.
     *
     * @since 2.31.0+op77.3
     * @failure animations_unavailable_on_this_host, invalid_entity_id
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    play(this: void, entity: number | string, animation: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Plays an emote on the local player, through a stand-in body.
     *
     * The player's own body cannot hold a workspot, so an invisible double takes their place for the length of the clip. This is a separate call rather than `play` with the player's id because the mechanism is genuinely different.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    playSelf(this: void, animation: string, thirdPerson?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Request a synchronized RP action for the local player.
     *
     * Requests an action for the authenticated local player. Use cancel() for this synchronized action, not the legacy local stop(entity). Returns authoritative acceptance and playbackId, not proof of native presentation. Options are clip, durationMs, loop and item. The clip must belong to the selected profile. loop defaults to true. Looping profiles may use omitted/zero duration for indefinite playback; once profiles and loop=false use the measured clip duration when available, otherwise 5000 ms. Explicit nonzero durations must be integers from 1000 to 600000 ms. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal. itemContact is server-only, including false; client requests return item_requires_server. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact) for the experimental server adapter.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to the server-accepted playback state | nil, reason if dispatch fails; await() returns nil, reason if rejected or timed out
     */
    request(this: void, profileId: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Request a synchronized RP action for the local player by clip name.
     *
     * Resolves an exact clip through the shipped profile catalogue; a missing clip returns unknown_clip. Discovery inventories are not allowlists. A clip shared with a workspot resolves to the stationary profile: use play/request with a layer profile ID to select walking behavior. Options are durationMs, loop and item; the clip is the argument. Unsupported upperBody, blendIn, blendOut, blendMs, holdLastFrame, flags, dict and playbackRate options return unsupported_option:<key>; upperBody does not convert arbitrary clips. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal. itemContact is server-only, including false; client requests return item_requires_server. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact) for the experimental server adapter.
     *
     * @since 2.31.13+op77.67
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to the accepted playback state including playbackId | nil, unknown_clip when no shipped device carries the clip; nil, reason on rejection
     */
    requestClip(this: void, clip: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Request an ordered RP sequence for the local player.
     *
     * Takes no playerId; requests a sequence for the local player. Accepts 1–16 steps with profile, optional clip, durationMs and item. Each omitted duration uses the measured clip cycle when available, otherwise 5000 ms; steps must last 1000–600000 ms and the total cannot exceed 600000 ms. The sequence option loop defaults to false. A hold_item_walk → drink_walk → hold_item_walk chain preserves the prop ID while the item record stays the same. Each new play call gets a new playbackId; a sequence coordinates one player. Workspot transitions may require asynchronous exit/re-entry. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal. itemContact is server-only, including false; client requests return item_requires_server. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact) for the experimental server adapter.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to the server-accepted playback state | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    sequence(this: void, steps: Open77Table, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read the last active RP state visible to this client.
     *
     * Defaults to the local player, or accepts a visible player's network ID. Resolves to a copied canonical state, or nil when inactive or unavailable. It does not query arbitrary players outside the routing bucket or verify native rendering. Fields include playerId, playbackId, epoch, revision, active, steps, loop and step timing. On the client, onPlayerAnimationChanged receives this state as a Lua table; the server event instead passes JSON. Do not use a client observation to grant authoritative rewards. Declare dependency 'open77_animations' in your resource manifest. This asynchronous facade requires the service in the same downloaded resource host, not a separate bootstrap host. Await from a managed coroutine/event handler. No animations.presentation capability is required by the caller; underscore hooks are internal.
     *
     * @since 2.31.13+op77.48
     * @failure open77_animations
     * @open77Return Open77.Promise resolving to active playback state, or nil when unavailable | nil, reason if dispatch fails; await() returns nil, reason if rejected
     */
    state(this: void, playerId?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops whatever a body is playing and releases what was set up for it.
     *
     * Stops the workspot animation currently managed by Open77 for the selected body and releases its native animation state. It does not claim or stop arbitrary game animations that Open77 does not own.
     *
     * @since 2.31.0+op77.3
     * @failure animations_unavailable_on_this_host, invalid_entity_id
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    stop(this: void, entity: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops the local player's emote and removes the stand-in.
     *
     * Ends the local-player emote created by `playSelf` and removes its stand-in body. Cleanup is idempotent and is also performed when the owning resource generation stops.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    stopSelf(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77AppearanceApi {
    /**
     * Applies a previously captured appearance snapshot to the local player.
     *
     * Requires `player.appearance.edit`. The runtime validates the schema, build, catalog digest, gender, option identities, choice bounds, and duplicates before touching the game.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    apply(this: void, snapshot: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Captures the local player's complete validated appearance snapshot.
     *
     * Requires `player.appearance.read`. The snapshot is bound to schema version 1, game build 2.31, a catalog digest, gender hash, and at most 256 head/body/arms options.
     *
     * @permission player.appearance.read
     * @since 2.31.0+op77.3
     * @failure appearance_unavailable_on_this_host, catalog_digest_failed, permission_denied:player.appearance.read
     * @open77Return table { schemaVersion, gameBuild, catalogDigest, gender, options }, or nil | reason
     */
    capture(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Capture the local native body appearance groups.
     *
     * Requires player.appearance.read. Returns {family,groups}, with native part/name hashes and resource key pairs. This readback is for trusted projection services, not a committed character edit or visual proof. Use the selected durable identity adapter for persistence.
     *
     * @permission player.appearance.read, player.cyberware.read
     * @since 2.31.13+op77.45
     * @open77Return body table, or nil, reason
     */
    captureBody(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Finishes the current appearance commit transaction.
     *
     * Requires `player.appearance.edit`. Call after a successful apply/persistence flow so the native editor can release its commit state.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    finishCommit(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether the local appearance editor is open.
     *
     * Requires `player.appearance.read`; returns false when the permission or backend is unavailable.
     *
     * @permission player.appearance.read
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isOpen(this: void): boolean;
    /**
     * Opens the local Cyberpunk appearance editor.
     *
     * Requires `player.appearance.edit`. The optional value may be a mode string or `{ mode = string }`; `ripperdoc` is used by default.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    open(this: void, options?: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Starts a guarded body-family transition.
     *
     * Starts a guarded transition to the requested body family and optionally resumes the native editor afterward. It requires player.appearance.edit; completion is consumed with takeBodyFamilyTransition.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    switchBodyFamily(this: void, gender: string, resumeEditor?: boolean): void;
    /**
     * Consumes the pending body-family transition result.
     *
     * Consumes the pending body-family transition result once, returning its serialized payload or nil while no result is ready. It requires player.appearance.edit.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @failure permission_denied:player.appearance.edit
     * @open77Return value | reason (when the first is nil)
     */
    takeBodyFamilyTransition(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77AssetsApi {
    /**
     * Lists generic files declared by the current resource.
     *
     * Returns the resource files declared by the current manifest. It is an allow-list view, not a directory listing, and does not grant access to undeclared files or arbitrary paths.
     *
     * @since 2.31.0+op77.3
     * @open77Return array of relative paths
     */
    list(this: void): unknown;
    /**
     * Validates a declared PNG texture for resource APIs.
     *
     * The path must match the manifest's `files` allowlist. PNG textures are limited to 512 KiB and 512 by 512 pixels.
     *
     * @since 2.31.0+op77.3
     * @failure texture
     * @open77Return descriptor { type, asset, mime, width, height, bytes }, or nil | reason
     */
    texture(this: void, path: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77AudioApi {
    /**
     * DestroySound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    destroy(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * GetSoundState: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @failure permission_denied:audio.play, sound_not_found
     * @open77Return table, or nil, reason
     */
    getState(this: void, id: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * PauseSound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    pause(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * PlaySound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    play(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Play2DSound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, invalid_audio_arguments, invalid_audio_asset, invalid_position, network_audio_requires_server, permission_denied:audio.play
     * @open77Return integer handle, or nil, reason
     */
    play2D(this: void, asset: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Play3DSound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, invalid_audio_arguments, invalid_audio_asset, invalid_position, network_audio_requires_server, permission_denied:audio.play
     * @open77Return integer handle, or nil, reason
     */
    play3D(this: void, asset: string, position: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * SeekSound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    seek(this: void, id: number, seconds: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * SetSoundPosition: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    setPosition(this: void, id: number, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * SetSoundVolume: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    setVolume(this: void, id: number, volume: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * StopSound: local package audio.
     *
     * Requires audio.play; network=true is rejected. MP3/PCM WAV decode asynchronously off the game thread. getState reports actual decoder state and cached PCM reuse. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.play
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    stop(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77BlipsApi {
    /**
     * Makes a blip follow an Open77 entity.
     *
     * Changes an owned blip from a fixed world position to tracking a streamed Open77 entity. The entity id is ephemeral and the call requires `ui.vanilla.map`; remove or reattach the blip when its gameplay target changes.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    attachToEntity(this: void, id: string, entity: number | string, slot?: string, offset?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes every blip owned by the current resource.
     *
     * Removes every vanilla-map blip owned by the calling resource generation. Other resources' blips are left untouched, and generation teardown performs the same cleanup automatically.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return true
     */
    clear(this: void): boolean;
    /**
     * Clears the player's map waypoint, whoever set it.
     *
     * Untracks the waypoint, including one the player placed themselves, which is what `DeleteWaypoint` means, and destroys the pin only when this resource owns it; another resource's pin stays registered. Clearing when there was no waypoint is a success that reports `false` as its second value, so a caller reconciling state can tell the two apart without an error. Requires `ui.vanilla.map`.
     *
     * @permission ui.vanilla.map
     * @since 2.31.13+op77.67
     * @open77Return true | whether a waypoint was actually cleared | reason on failure: permission_denied:ui.vanilla.map, waypoint_unavailable_on_this_host, wrong_thread, world_unavailable
     */
    clearWaypoint(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Creates a resource-owned vanilla map pin.
     *
     * Requires `ui.vanilla.map`. Provide exactly one of `position` or `entity`. Set `routable = true` on a positional blip to use Cyberpunk's trusted custom-waypoint definition; its sprite becomes `CustomPositionVariant` and `track(id)` can then start native GPS routing. The returned 64-bit generation handle is a decimal string and is cleaned up automatically when the resource stops. Experimental SVG icons and per-blip RGB/RGBA colors require the matching native client adapter. Declare SVG assets in the manifest; use icon = { asset, size } and color = "#RRGGBB" or "#RRGGBBAA". PNG blip icons are not supported by this adapter.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @failure blips_backend_unavailable, permission_denied:ui.vanilla.map
     * @open77Return decimal-string blip id, or nil | reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one blip owned by the current resource.
     *
     * Returns a read-only snapshot of one blip owned by the calling resource. The handle must still belong to the current generation; a stale or foreign id is rejected.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @failure blips_backend_unavailable, invalid_blip_id, permission_denied:ui.vanilla.map
     * @open77Return snapshot table, or nil | reason
     */
    get(this: void, id: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists blips owned by the current resource.
     *
     * Lists snapshots of all vanilla-map blips owned by the calling resource generation. The returned tables are copies and changing them does not mutate the map.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @failure blips_backend_unavailable, permission_denied:ui.vanilla.map
     * @open77Return array of snapshot tables
     */
    list(this: void): Open77Table;
    /**
     * Removes one owned blip.
     *
     * Deletes one blip owned by the calling resource and invalidates its handle. Removal is resource-scoped, so one package cannot erase another package's map state.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Activates or deactivates a vanilla mappin.
     *
     * Updates the active/highlighted state of an owned vanilla-map blip. This changes presentation only and does not create a route or change server state.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setActive(this: void, id: string, active: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the custom fullscreen-map description of an owned blip.
     *
     * Requires `ui.vanilla.map`. The description is displayed by Open77's fullscreen-map tooltip for the selected native mappin.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    setDescription(this: void, id: string, description: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a declared SVG icon or restores the native sprite.
     *
     * Experimental native SVG adapter; requires the matching OPEN//77 client and Cyberpunk 2077 2.31. Accepts a declared resource-relative .svg path, { asset, size }, or false to restore the native sprite. Size is 16–128 native Ink units (default 48). Color overrides remain when the icon is cleared. Visual-only edits preserve tracking; malformed or unsupported SVG leaves the existing icon unchanged. URLs and PNG/WebP are rejected.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @failure permission_denied:ui.vanilla.map, asset_not_declared:..., blip_icon_requires_svg, invalid_icon_size, svg_element_unsupported, svg_attribute_unsupported, svg_geometry_outside_viewport, svg_complexity_limit, svg_polygon_limit, blip_visual_budget_exceeded, native_unavailable
     * @open77Return boolean | reason
     */
    setIcon(this: void, id: string, icon: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes the fullscreen-map tooltip title.
     *
     * Open77 keeps the label in private script data, independent from the vanilla variant's generic title.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setLabel(this: void, id: string, label: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a blip to a world position.
     *
     * Also detaches an entity-following blip.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setPosition(this: void, id: string, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Switches a blip off beyond a distance and back on when the player returns.
     *
     * Requires `ui.vanilla.map`. `metres` is 0..4000; `false` or `0` clears the gate. This is Open77's own distance test driving the vanilla `SetMappinActive`, not a mappin property: `gamemappinsMappinData` has no range field. It is therefore NOT FiveM's `SetBlipAsShortRange`, which hides a blip from the minimap only -- 2.31 offers no per-surface control, so out of range means off on the HUD, the minimap and the world map alike. It composes with `active` rather than overriding it. An entity-following blip is measured from the body it follows, and keeps its last state while that body is not streamed in.
     *
     * @permission ui.vanilla.map
     * @since 2.31.13+op77.67
     * @open77Return boolean | reason
     */
    setRange(this: void, id: string, metres: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes the vanilla mappin variant.
     *
     * Accepts an exact 2.31 variant name, a stable alias, or an integer from 0 through 146. See `wiki/blips.md` for the complete list.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setSprite(this: void, id: string, sprite: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the custom fullscreen-map title of an owned blip.
     *
     * Requires `ui.vanilla.map`. This is the semantic title alias of `setLabel`; the HUD does not permanently render it beside the icon.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    setTitle(this: void, id: string, title: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets another owned blip as the routing alternative.
     *
     * Passing nil clears it. This does not force the world-map controller to start tracking.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setTrackingAlternative(this: void, id: string, target: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes vanilla through-wall visibility.
     *
     * Controls whether an owned world marker remains visible when geometry occludes it. The setting affects presentation on this client only and requires `ui.vanilla.map`.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    setVisibleThroughWalls(this: void, id: string, visible: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Places the player's map waypoint, replacing whatever was tracked.
     *
     * Registers a routable custom-position mappin and makes it the tracked destination, so the vanilla GPS calculates a road route to it exactly as it does for a waypoint the player set by hand. The pin is owned by the calling resource and is destroyed when that resource stops, so a crashed taxi script leaves no permanent arrow on the map. Calling it again moves the same pin rather than registering a second one. Requires `ui.vanilla.map`.
     *
     * @permission ui.vanilla.map
     * @since 2.31.13+op77.67
     * @open77Return true | reason on failure: permission_denied:ui.vanilla.map, invalid_position, waypoint_unavailable_on_this_host, too_many_blips, wrong_thread, world_unavailable
     */
    setWaypoint(this: void, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists every usable mappin variant in the current build.
     *
     * Returns 147 entries for Cyberpunk 2077 2.31. This metadata query does not require map mutation permission.
     *
     * @since 2.31.0+op77.3
     * @failure blips_backend_unavailable
     * @open77Return array of { name, value }
     */
    sprites(this: void): Open77Table;
    /**
     * Selects this blip as the vanilla manually tracked destination.
     *
     * Follows the same internal `MappinSystem` operation as selecting a pin on the fullscreen map. This changes the tracked id; native road calculation additionally requires the blip to have been created with `routable = true`. Returns `changed = false` when this blip is already tracked.
     *
     * @permission ui.vanilla.map
     * @since 2.31.7+op77.16
     * @open77Return true | whether tracking changed | reason on failure
     */
    track(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Safely clears manual tracking for this blip.
     *
     * The native action is invoked only if this owned blip is currently tracked, so a resource cannot untrack a quest or another system's pin.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return true | whether it was tracked
     */
    untrack(this: void, id: string): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Updates several properties of an owned blip.
     *
     * Updates mutable fields on an owned blip. Visual-only icon/color changes preserve its native identity and tracking selection. Structural changes register a replacement before removing the previous mappin. position switches to positional mode; entity switches to attached mode. routable cannot be changed. Invalid SVG or color replacements leave the existing visual unchanged.
     *
     * @permission ui.vanilla.map
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Where the player's map waypoint is, or nil when there is none.
     *
     * Reads the vanilla waypoint, the manually tracked mappin, whoever set it: this resource, another resource, or the player right-clicking the fullscreen map. `nil` with no reason means there is simply no waypoint; `nil` WITH a reason means the question could not be asked. A GPS script has to tell those apart, because cancelling a fare is correct for only the first. Requires `ui.vanilla.map`.
     *
     * @permission ui.vanilla.map
     * @since 2.31.13+op77.67
     * @failure permission_denied:ui.vanilla.map, waypoint_unavailable_on_this_host
     * @open77Return table { x, y, z }, or nil when no waypoint is set | reason (only on failure): permission_denied:ui.vanilla.map, waypoint_unavailable_on_this_host, native_unavailable, wrong_thread, world_unavailable
     */
    waypoint(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77CallbacksApi {
    /**
     * Alias of Open77.net.call.
     *
     * Open77.callbacks is the same four functions under a second name, for resources that prefer to read the callback surface as its own namespace. Pick one spelling per resource; the two are the same functions, not copies.
     *
     * @since 2.31.13+op77.67
     * @open77Return Open77.Promise, or nil, reason
     */
    call(this: void, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.callAwait.
     *
     * Awaits the promise, so it needs a CreateThread or another managed task.
     *
     * @since 2.31.13+op77.67
     * @open77Return the handler's return values, or nil, reason
     */
    callAwait(this: void, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.register.
     *
     * Answers a question the server asks with Open77.net.callClient. The handler receives the call's arguments and no source, because the caller is always the server.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or nil, reason
     */
    register(this: void, name: string, handler: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.unregister.
     *
     * Stops answering that name; a later request is refused with callback_not_found on the next frame.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false, reason
     */
    unregister(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77CameraApi {
    /**
     * Takes the view with a scripted camera, optionally blending into it.
     *
     * Client-only; requires `camera.script`. `options.blendMs` (0..60000) interpolates from wherever the view currently is; omit it for a cut. Returns `true` and, as a SECOND value, an `Open77.Promise` that resolves when the blend completes and REJECTS with a reason if the shot is released first -- `player_died`, `resource_stopped`, `camera_superseded` and the rest. A cut settles before the call returns and hands back no promise. Refused with `camera_held_by:<resource>` when another resource has the view (never silently stolen), with `camera_unavailable` when the player is dead or a perspective transition is in flight, and with `invalid_argument` past the 250 m streaming range.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_blend_ms, invalid_camera_id, permission_denied:camera.script
     * @open77Return true and an Open77.Promise, or false, reason
     */
    activate(this: void, camId: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The ray from the camera along its forward vector: what the reticle points at.
     *
     * `Open77.camera.view()` plus `Open77.world.raycast` in one call. Unlike `Open77.inspector.target`, which answers with an entity under the crosshair or nothing, this hits empty pavement too, which is what placing a prop, a blip or a teleport target needs. `maxDistance` defaults to 200 m and is capped at 5000. Requires `world.query`. Takes the same `entities` option as `Open77.world.raycast`, adding an `entity` table naming what the reticle is actually on, which is the targeting and shot-validation question this call exists for. Without the option the result is unchanged.
     *
     * @permission world.query
     * @since 2.31.9+op77.22
     * @failure camera_unavailable, invalid_distance, permission_denied:world.query
     * @open77Return table { hit, position, normal, material, distance }, or nil | reason: permission_denied:world.query, invalid_distance, camera_unavailable, or the engine status
     */
    aimRay(this: void, maxDistance?: number, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Parents a scripted camera to an entity, or restores the player's own camera.
     *
     * Attaches the Open77 camera to a game entity using the supplied local offset and rotation. Camera ownership is local to the resource generation; attaching replaces the resource's previous detached/attached camera state.
     *
     * @permission camera.script
     * @since 2.31.0+op77.3
     * @failure camera_unavailable_on_this_host, invalid_camera_id, invalid_camera_offset, invalid_entity_id, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    attach(this: void, camId?: number, entity?: number | string, offset?: Vector3): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * This resource's scripted cameras, and whether it holds the view.
     *
     * Client-only; requires `camera.script`. Owner-scoped for the camera list, like `Open77.screen.state`. `holder` is NOT owner-scoped: it names whoever has the view, including another resource, because that is the one question a `camera_held_by:` refusal leaves a caller asking. `phase` is `idle`, `blending_in`, `holding` or `blending_out`.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_snapshot, permission_denied:camera.script
     * @open77Return table { held, holder, phase, activeCamera, blendRemainingMs, cameras }
     */
    cameras(this: void): Open77Table;
    /**
     * Releases this resource's preview orbit and framing.
     *
     * Requires camera.preview. Clears the calling resource's preview orbit and releases preview ownership. It is a successful no-op if no preview is owned; it refuses to clear another resource's preview with camera_preview_owned.
     *
     * @permission camera.preview
     * @since 2.31.13+op77.45
     * @open77Return true, or false, reason
     */
    clearOrbit(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Configures the playable third-person camera's framing, anchor, FOV and shoulder.
     *
     * Client-only; requires `camera.style`. Acquires an exclusive resource-instance style or patches the caller's existing configuration. `style` selects `classic`, `shoulder` or `centered` and resets that preset before applying other fields; without it, fields patch the current configuration (classic on first use). `anchor` is `eyes` or `body` (feet), stable gameplay pivots rather than animated bones. `hip`, `aim` and `explore` accept distance (0.8..8 metres), offset (vector3 or complete x/y/z table: view-right -2..2, view-forward -1..1, world-up -1.5..3 metres), and fov (0 to restore the captured gameplay lens, otherwise 40..110 native component degrees). Other fields: shoulder (`left`/`right`), transition (0..3 seconds, default 0.3), runSpeed (0.5..15 m/s, default 2.5), runFov and sprintFov (0 disabled or 40..110). Aiming overrides sprint, which overrides running. Collision and native-camera safety still win. Unknown fields and invalid/non-finite values are rejected atomically. Does not enable TPP: use `Open77.perspective.setThirdPerson` separately. Stop/reload, coroutine failure and host teardown release the claim. Errors include `permission_denied:camera.style`, `camera_style_unavailable`, `invalid_camera_style_fields`, `invalid_camera_style` and `camera_style_owned`.
     *
     * @permission camera.style
     * @since 2.31.13+op77.78
     * @open77Return true on success, otherwise false | reason on failure
     */
    configureThirdPerson(this: void, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Creates a scripted camera and returns its id.
     *
     * Client-only; requires `camera.script`. Nothing is rendered until `activate`. Options: `position` (world vector3, required unless `attachTo`), `attachTo` (entity; `0` is the local player's body), `offset` (vector3 in the parent's frame, X right / Y forward / Z up; also accepted as `position`), `lookAt` (a world vector3 OR an entity, re-solved every frame), `rotation` (quaternion `{x,y,z,w}` or Euler degrees `{pitch,yaw,roll}`, used when there is no `lookAt`), `fov` (5..170 degrees; omit or 0 to leave the engine's field of view alone). 16 cameras per resource, 64 per client. See the Scripted cameras guide.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_body, invalid_camera_fov, invalid_camera_look_at, invalid_camera_options, invalid_camera_position, invalid_camera_rotation, invalid_entity_id, permission_denied:camera.script
     * @open77Return camera id, or nil, reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Gives the view back to the player, optionally blending out.
     *
     * Client-only; requires `camera.script`. `options.blendMs` blends back to the player's own eyes and finishes exactly on them, so the restore writes the value already on screen. Only the holder may. Returns `true` and an `Open77.Promise` for a blended hand-back; an instant one is already finished and hands back none.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_blend_ms, permission_denied:camera.script
     * @open77Return true and an Open77.Promise, or false, reason
     */
    deactivate(this: void, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Destroys a scripted camera.
     *
     * Client-only; requires `camera.script`. Destroying the camera you are looking through is legal and IS a release: the view comes back. Refusing would let a resource paint itself into a corner, and silently keeping the view would be worse.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_id, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    destroy(this: void, camId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Detaches the camera from the body, with an offset in the body's own space.
     *
     * Detaches the Open77 camera from its target while retaining a controllable camera view. It does not synchronize a camera to other players and is automatically restored during resource cleanup.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    detach(this: void, x: number, y: number, z: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Un-parents a scripted camera from its entity.
     *
     * Client-only; requires `camera.script`. NOT spelled `detach`: `Open77.camera.detach()` already means 'move the player's own camera off their eyes' and all of its arguments are optional, so there is no arity left to overload. The camera keeps the pose it had; the next `setTransform` places it.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_id, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    detachFrom(this: void, camId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Rides an entity: a camera behind it, aimed at it, both re-solved every frame.
     *
     * Client-only; requires `camera.script`. Entity `0` is the local player's body. `options`: `distance` (metres behind, 0..100, default 4.0), `height` (metres above, -50..50, default 1.5), `side` (metres right, -50..50, default 0), `fov` (5..170 degrees; omit or 0 to leave it alone), `blendMs` (0..60000). The offsets are in the TARGET's own frame, so `distance` means behind him rather than north of him. ONE camera per resource: calling `follow` again retargets it and returns the same id, superseding the previous call's promise with `camera_superseded`. `Open77.camera.unfollow` gives the view back and destroys it. Not a new way to hold the view -- it is `create` + `lookAt` + `activate`, so every release rule on the Scripted cameras page applies unchanged. The world streams around the player's BODY, not around the lens, so a distant target renders an empty frame: move the body there first. See the Scripted cameras guide.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_blend_ms, invalid_camera_fov, invalid_camera_options, invalid_entity, invalid_follow_distance, invalid_follow_height, invalid_follow_side, permission_denied:camera.script
     * @open77Return camera id and a blend promise, or nil, reason
     */
    follow(this: void, entity: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Points a scripted camera at a world point or an entity.
     *
     * Client-only; requires `camera.script`. A vector3 aims at a fixed world point; anything else is read as an entity id, and `0` is the local player's own body. The aim is re-solved EVERY frame, so a tracked entity that moves stays centred -- this is FiveM's `PointCamAtEntity`, not a snapshot. An entity that streams out holds the last aim instead of snapping the camera to the world origin.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_id, invalid_camera_look_at, invalid_entity_id, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    lookAt(this: void, camId: number, target: Vector3): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets this resource's preview orbit yaw on an active third-person rig.
     *
     * Requires camera.preview. Sets a resource-owned preview orbit yaw in degrees, normalized modulo 360. The yaw must be finite. Returns false/reason if another resource owns the preview, the preview backend is unavailable, or the native operation fails. Use clearOrbit to release the owned preview.
     *
     * @permission camera.preview
     * @since 2.31.13+op77.45
     * @open77Return true, or false, reason
     */
    orbit(this: void, yawDegrees: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Projects a world point into normalized WebUI viewport coordinates.
     *
     * Uses REDengine's active camera projection. `(0,0)` is the top-left and `(1,1)` the bottom-right. `onScreen` is false for points behind the view or beyond the viewport.
     *
     * @since 2.31.0+op77.3
     * @failure camera_unavailable_on_this_host, invalid_world_position
     * @open77Return table { x, y, depth, distance, onScreen }, or nil | reason
     */
    project(this: void, position: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Releases this resource's camera style and shake, restoring underlying framing and FOV.
     *
     * Client-only; requires `camera.style`. Releases the caller's style and shake and blends back to the underlying framing and captured gameplay lens. Does not turn third person off, clear a perspective lock or alter server policy. Safe when no style is configured; another resource's style returns `camera_style_owned` instead of being reset. Other errors: `permission_denied:camera.style`, `camera_style_unavailable`. Stop/reload, coroutine failure and host teardown also release the style automatically.
     *
     * @permission camera.style
     * @since 2.31.13+op77.78
     * @open77Return true on success, otherwise false | reason on failure
     */
    resetThirdPerson(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Unproject a normalized screen point into a world-space ray.
     *
     * Requires world.query. x/y use normalized top-left viewport coordinates in [0,1]. maxDistance defaults to 100 metres and must be finite in [0.1,1000]. Returns origin, unit direction, endpoint position and maxDistance; this is not a collision result. Uses the active camera and checks projection consistency. Returns nil/reason if the camera or projection is unavailable. Identical global alias: Screen2DPointTo3DSpace. See screen-picking.md and context-menu.md. Requires the new screen-picking client, not the earlier .62 release.
     *
     * @permission world.query
     * @since 2.31.13+op77.63
     * @open77Return ray table, or nil, reason
     */
    screenRay(this: void, x: number, y: number, maxDistance?: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Pick a world surface/entity, with optional visible F7 self targeting.
     *
     * Requires world.query. Same normalized coordinates and distance limits as screenRay. Optional {static=true,dynamic=true,self=false} strict boolean options; at least one of static/dynamic must be enabled. Physical world, vehicle and NPC-hitbox categories are included, not query-only player sensors. self=true with dynamic=true also picks the active visible F7 body using animated slot capsules, without enabling collision. A closer physical hit wins. This approximation returns hitSource=self_presentation, local playerId and isLocalPlayer=true, but no physical normal/material; hidden/suspended bodies are excluded. Ordinary physical hits add normal, camera distance, material, entityLookupAvailable and optional target. A miss has hit=false and position at the ray endpoint, not a surface. target distinguishes decimal-string engineEntity/local entity handles from canonical playerId, vehicleId, npcId and propId; propId is a decimal string. Never interchange these IDs. NPC records use Character.* when available. No nearest-object fallback or server authority. See screen-picking.md and context-menu.md for contracts and examples.
     *
     * @permission world.query
     * @since 2.31.13+op77.63
     * @open77Return raycast table, or nil, reason
     */
    screenRaycast(this: void, x: number, y: number, maxDistance?: number, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Sets the field of view, in degrees.
     *
     * Changes the field of view of the camera currently controlled by Open77. The value is validated by the native backend and applies only to this client's presentation.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    setFov(this: void, degrees: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves and/or turns a scripted camera.
     *
     * Client-only; requires `camera.script`. Two forms: `setTransform(camId, position?, rotation?)` for a per-frame dolly, and `setTransform(camId, { position =, rotation =, fov = })` when the field of view changes too. Setting a rotation CLEARS a previous `lookAt` -- an explicit rotation is an explicit aim, and a stale look-at silently overriding it would be a trap. Cheap enough to call every frame.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, empty_camera_transform, invalid_camera_fov, invalid_camera_id, invalid_camera_position, invalid_camera_rotation, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    setTransform(this: void, camId: number, position?: Vector3, rotation?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Shakes a scripted camera with a named preset.
     *
     * Client-only; requires `camera.script`. Presets: `hand`, `drunk`, `explosion`, `earthquake`; an unknown name is refused rather than defaulted. `amplitude` defaults to 1.0 and is capped at 4.0, `ms` defaults to 500. Additive on top of the resolved pose, so it composes with a blend and with a look-at instead of fighting either, and it decays exactly to rest. Omit `camId` to shake the camera this resource currently holds.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_id, invalid_shake_argument, invalid_shake_preset, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    shake(this: void, camId?: number, preset?: string, amplitude?: number, milliseconds?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Starts or replaces a finite positional shake on the caller's playable TPP style.
     *
     * Client-only; requires `camera.style` and a style already owned via configureThirdPerson. options: amplitude (vector3 or complete x/y/z table, each 0..0.2 metres, default 0.02/0.01/0.015), frequency (0.1..20 Hz, default 8), duration (0.05..10 seconds, default 0.5). Axes are view-right, view-forward, world-up. Shakes move the pivot before collision resolution; they do not rotate aim, inject roll or change player position. Natural attack/release envelope; a new shake replaces the old one rather than stacking. Wall-clock expiry continues while another camera owns the view. Unknown fields and invalid/non-finite values are refused. Errors: `permission_denied:camera.style`, `camera_style_unavailable`, `invalid_camera_shake`, `camera_style_not_owned`. Cleanup follows the owning style's lifecycle; do not restart it every frame.
     *
     * @permission camera.style
     * @since 2.31.13+op77.78
     * @open77Return true on success, otherwise false | reason on failure
     */
    shakeThirdPerson(this: void, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops a scripted camera's shake immediately.
     *
     * Requires `camera.script`. Cancels the shake started by `Open77.camera.shake` on that camera and leaves the camera itself where it is -- it is not a deactivate, and a camera with no shake running accepts it without complaint, so a cleanup path may call it unconditionally. Refuses with `permission_denied:camera.script`, `camera_unavailable_on_this_host` when the host exposes no scripted-camera backend, `invalid_camera_id`, or `camera_not_found` for a camera this resource does not own. Shakes are released with the camera, so a resource that stops does not leave the view trembling.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_camera_id, permission_denied:camera.script
     * @open77Return true, or false, reason
     */
    stopShake(this: void, camId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Immediately stops only the calling resource's third-person camera shake.
     *
     * Client-only; requires `camera.style`. Safe when the caller owns no shake and never stops another resource's effect. Keeps the style and selected perspective unchanged. Explicit stop is immediate, unlike the natural expiry envelope. Errors: `permission_denied:camera.style`, `camera_style_unavailable`.
     *
     * @permission camera.style
     * @since 2.31.13+op77.78
     * @open77Return true on success, otherwise false | reason on failure
     */
    stopThirdPersonShake(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Controls the legacy camera-only third-person path.
     *
     * Legacy camera-only control, not the playable perspective arbiter. Prefer `Open77.perspective.setThirdPerson(enabled, force)` to switch or lock the playable FPP/TPP view, and `Open77.camera.configureThirdPerson(options)` for shoulder framing, anchors, movement FOV and shake. The legacy call changes the camera without coordinating all body, weapon and input owners. Turning it off restores the view the game had before the call, rather than some default.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    thirdPerson(this: void, enabled: boolean, distance?: number, height?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the requested third-person camera style and whether it is active or owned.
     *
     * Client-only read; no permission required. Returns configured, owned (by the calling resource), active, shaking, appliedFov, and the full configuration: style, anchor, shoulder, hip/aim/explore (distance, offset, fov), transition, runSpeed, runFov and sprintFov. style names the base preset, even after custom patches. active is false while FPP, a native vehicle/scripted camera or wardrobe owns the view; a configured style resumes when the playable TPP rig returns. appliedFov is the last rig-written FOV, not necessarily the current camera's lens; use `Open77.camera.view()` for the rendered view. Returns `nil, camera_style_unavailable` when the backend is absent.
     *
     * @since 2.31.13+op77.78
     * @open77Return snapshot table, or nil on failure | reason on failure
     */
    thirdPersonState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Ends a follow camera: blends the view back, then destroys it.
     *
     * Client-only; requires `camera.script`. `options.blendMs` is 0..60000. Answers `false, "not_following"` when this resource has no follow camera. The camera is destroyed even when the view had already been released by something else, so a follow can never be left behind. See the Scripted cameras guide.
     *
     * @permission camera.script
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_blend_ms, not_following, permission_denied:camera.script
     * @open77Return true and a blend promise, or false, reason
     */
    unfollow(this: void, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The world ray behind a screen point.
     *
     * Client-only and UNGATED, like `project` and `view`: it reads the camera, it does not move it. `x` and `y` are 0..1 with the origin at the TOP LEFT -- exactly the frame `Open77.camera.project` returns, which is what makes `unproject(project(p))` a round trip. Returns `{ origin, direction }` in world space, `direction` normalised.
     *
     * @since 2.31.13+op77.67
     * @failure camera_unavailable_on_this_host, invalid_screen_point
     * @open77Return table { origin, direction }, or nil, reason
     */
    unproject(this: void, x: number, y: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Where the view is: position, forward vector, field of view.
     *
     * Returns the latest game-thread camera snapshot used by projection and presentation APIs. It is a same-client read and may return `nil, reason` while the game camera is unavailable.
     *
     * @since 2.31.0+op77.3
     * @open77Return position (x, y, z) | forward (x, y, z) | field of view
     */
    view(this: void): LuaMultiReturn<[unknown, string | undefined]>;
}
interface Open77CharacterApi {
    /**
     * What the local player is aiming at, if it is a thing rather than scenery.
     *
     * Requires **both** `player.aim.read` and `world.query`: where the player looks is about the player, what is there is a world entity read, and granting the first must not quietly hand out the second. Uses the engine's own look-at target, not a physics ray -- a physics ray answers with geometry and carries no entity reference. Returns `engineEntity`, `className`, `kind`, `family`, `position` and `distance`, plus `entity` and one of `playerId`/`vehicleId`/`npcId` when the thing is an Open77 body, or canonical decimal-string `propId` for a replicated prop. `family` is the raw class family and `kind` is that refined by ownership, exactly as `Open77.camera.aimRay({ entities = true })` refines it, so a vanilla crowd ped reads `populationNpc` in both. Three outcomes, kept apart on purpose: a table, a BARE `nil` for "pointing at scenery or nothing", and `nil, reason` when the question could not be asked.
     *
     * @permission player.aim.read, world.query
     * @since 2.31.13+op77.67
     * @failure aim_unavailable_on_this_host, permission_denied:player.aim.read, permission_denied:world.query
     * @open77Return table, bare nil, or nil, reason
     */
    aimedEntity(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * One coherent aim snapshot, with the staleness counter that makes it honest.
     *
     * Requires `player.aim.read`. Returns `aiming`, `firing`, `weaponDrawn` and `stateSequence`. `stateSequence` rises on every observed CHANGE of the aim or reload bits; difference it across two reads to tell a live aim from a mirror that has not moved in minutes. It is evidence, never a gate -- nothing times an aim out, because a player may hold one as long as they like. `weaponDrawn` is a live check for a weapon object in the right hand: false proves empty hands, true does not say which weapon family. The read costs no raycast, advances no sequence and disturbs no ballistics.
     *
     * @permission player.aim.read
     * @since 2.31.13+op77.67
     * @failure aim_unavailable_on_this_host, permission_denied:player.aim.read
     * @open77Return table, or nil, reason
     */
    aimState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The animation currently playing on this character.
     *
     * Reads the current animation snapshot for an entity, or for the local player when omitted. The result is observational and can change on the next frame; it does not grant animation ownership.
     *
     * @since 2.31.0+op77.3
     * @open77Return clip name, or nil
     */
    animation(this: void, entity?: number | string): unknown | undefined;
    /**
     * The alias table the slot resolver uses, as data.
     *
     * No permission: it describes the API, not a body, the way `Open77.blips.sprites()` does. Returns `{ alias, slot }` pairs -- `head` to `Head`, `pelvis`/`hips` to `Hips`, `left_hand` to `LeftHand`/`left_hand`, `right_hand` to `RightHand`/`right_hand`. `chest`, `feet` and `hands` are deliberately absent: nothing measured on a 2.31 body publishes a chest or a foot slot, and a pair of hands is not one position.
     *
     * @since 2.31.13+op77.67
     * @failure game_unavailable_on_this_host
     * @open77Return array of { alias, slot }
     */
    boneAliases(this: void): Open77Table;
    /**
     * The world position of one of an entity's slots.
     *
     * Requires `world.transform`. FiveM's `GetWorldPositionOfEntityBone`. `name` is a slot name the body publishes or one of the aliases `boneAliases()` lists; matching ignores case and punctuation. Anything the body does not carry is `unknown_bone`, by name, rather than a position taken from somewhere else. Read through the native `entSlotComponent.GetSlotTransform`.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure game_unavailable_on_this_host, invalid_bone, permission_denied:world.transform
     * @open77Return table { x, y, z }, or nil | reason
     */
    bonePosition(this: void, entity?: unknown, name?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists the slot names an entity actually publishes.
     *
     * Requires `world.transform`. Cyberpunk has no `GetEntityBoneIndexByName`: what an entity publishes is `entSlotComponent.slots[].slotName`, authored per entity. So the question is inverted -- this call reports what this particular body carries, instead of handing out a vocabulary and hoping. An EMPTY array is a real answer, not a failure: most entities carry no slot component. Works on vehicles too, whose occupant slots derive from the same component.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure game_unavailable_on_this_host, permission_denied:world.transform
     * @open77Return array of strings, or nil | reason
     */
    bones(this: void, entity?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The unit vector an entity is facing along.
     *
     * Requires `world.transform`. FiveM's `GetEntityForwardVector`. The same `entEntity.GetWorldForward` read `Open77.character.state().forward` answers with, so the two cannot disagree.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure permission_denied:world.transform
     * @open77Return table { x, y, z }, or nil | reason
     */
    forward(this: void, entity?: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads an entity's position and its own three axes, in world space.
     *
     * Requires `world.transform`. Returns `{ position, forward, right, up }`, every axis normalised, in one engine pass. The axes are read from `entEntity.GetWorldForward/GetWorldRight/GetWorldUp`, including pitch and roll. Accepts a receiver-local entity id, a canonical `{playerId}`, `{vehicleId}`, `{npcId}` or `{propId}` selector, or `{engineEntity, radius?}`. A prop id is canonical unsigned-64 decimal text. An engine id may be a lossless decimal/hex string or a Lua integer bit pattern. A canonical id on a decorated ray record takes precedence over `engineEntity`; an unavailable canonical parent never falls through to another identity.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure permission_denied:world.transform
     * @open77Return table, or nil | reason
     */
    frame(this: void, entity?: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Speed projected on the ground, without the vertical component.
     *
     * Returns horizontal movement speed for the selected character, excluding vertical velocity. Entity ids refer to the current client stream and must not be persisted as server identity.
     *
     * @since 2.31.0+op77.3
     * @open77Return number
     */
    groundSpeed(this: void, entity?: number | string): number;
    /**
     * Current health.
     *
     * Reads the engine-side health visible for the selected character on this client. For replicated player gameplay rules use the server-authoritative player health APIs; this helper is a presentation snapshot, not authority.
     *
     * @since 2.31.0+op77.3
     * @open77Return number
     */
    health(this: void, entity?: number | string): number;
    /**
     * Whether the local player is aiming down sights.
     *
     * Requires `player.aim.read`. Read from the player's own weapon animation graph, not from `Open77.perspective.state().aiming` -- that field has only two writers, a trigger pull and the third-person self-view's per-frame gate, and the second is skipped entirely in first person, so in FPP it reports whatever the last shot said for as long as the player does not shoot again. **The underlying bit is a latched mirror, not a poll**: it keeps its value between two pushes from the graph, so `true` alone cannot distinguish "aiming now" from "the last thing the graph ever said was aim". Use `Open77.character.aimState().stateSequence` when that distinction matters. `nil, "aim_state_unavailable"` when nothing has been observed yet.
     *
     * @permission player.aim.read
     * @since 2.31.13+op77.67
     * @failure aim_unavailable_on_this_host, permission_denied:player.aim.read
     * @open77Return boolean, or nil, reason
     */
    isAiming(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether the character is alive.
     *
     * Reports the current engine alive/dead flag for the selected character. It is useful for presentation and diagnostics but may lag the authoritative server health transition by a replication frame.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isAlive(this: void, entity?: number | string): boolean;
    /**
     * Whether a weapon is drawn.
     *
     * Reports whether the selected character is currently considered armed by the game presentation state. It does not enumerate inventory or prove that a weapon action is server-authorized.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isArmed(this: void, entity?: number | string): boolean;
    /**
     * Whether the character is crouching.
     *
     * Reads the character's current crouch presentation flag. Omit the entity to inspect the local player; remote values exist only while that proxy is streamed.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isCrouched(this: void, entity?: number | string): boolean;
    /**
     * Whether they occupy the driver's seat.
     *
     * Returns whether the selected character occupies the canonical driver seat of a vehicle. Use `seat()` when the exact seat and vehicle entity are also needed.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isDriver(this: void, entity?: number | string): boolean;
    /**
     * Whether they hold a workspot (an emote is running).
     *
     * Reports whether Open77 currently presents the character in an emote/workspot state. This is a transient local snapshot and is cleared with the owning presentation lifecycle.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isEmoting(this: void, entity?: number | string): boolean;
    /**
     * Whether the local player is holding the trigger.
     *
     * Requires `player.aim.read`. The FiveM `IsPedShooting` equivalent, read from `gameweaponAnimFeature_WeaponData` on the player's own graph -- it is the trigger being HELD, not a shot event, so it stays true across a burst and is true even when the shot is refused. Same call and same snapshot as `isAiming()`; call `aimState()` once if you want both without two reads. Nothing here reads a key or a bind: a player who fires from a script or a macro raises the same flag, because the same thing happened to the same graph.
     *
     * @permission player.aim.read
     * @since 2.31.13+op77.67
     * @failure aim_unavailable_on_this_host, permission_denied:player.aim.read
     * @open77Return boolean, or nil, reason
     */
    isFiring(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether the local body is being held still.
     *
     * Client-only; requires `player.freeze`. True while the server's freeze bit is set OR any client resource holds a local claim -- including one that is not yours. It is **not** true merely because you are dead: `Open77.character.isAlive` answers that question, and answers it better.
     *
     * @permission player.freeze
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason for the refusal
     */
    isFrozen(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether the character is touching the ground.
     *
     * Reads the engine grounded flag for the selected character. The value is sampled from the current client frame and should not be used alone for authoritative movement validation.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isGrounded(this: void, entity?: number | string): boolean;
    /**
     * Whether the character is mounted in a vehicle.
     *
     * Reports whether the character is mounted in a vehicle according to the current client presentation. Call `seat()` to retrieve the mounted slot and vehicle entity id.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isInVehicle(this: void, entity?: number | string): boolean;
    /**
     * Whether the character is sliding.
     *
     * Reads the current sliding locomotion flag for the selected character. It is an observational state and does not start or stop a slide.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isSliding(this: void, entity?: number | string): boolean;
    /**
     * Whether the character is vaulting.
     *
     * Reads the current vaulting locomotion flag for the selected character. Remote values are available only while the corresponding proxy is streamed.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isVaulting(this: void, entity?: number | string): boolean;
    /**
     * Turns a point in an entity's own frame into world coordinates.
     *
     * Requires `world.transform`. FiveM's `GetOffsetFromEntityInWorldCoords`. The offset is in the entity's frame: `+y` ahead, `+x` to its right, `+z` up, which is REDengine's convention. Accepts the same target selectors as `frame`. The vector may be passed alone -- `offsetToWorld(vector3(0, 2, 0))` means two metres in front of the local player -- but an identity selector without a vector is refused. Pitch and roll are in the answer for a tilted entity, because they are in the engine's axes.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure game_unavailable_on_this_host, permission_denied:world.transform
     * @open77Return table { x, y, z }, or nil | reason
     */
    offsetToWorld(this: void, entity?: unknown, offset?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The character's position.
     *
     * Returns the character's current world-space coordinates from the game-thread snapshot. Omit the entity for the local player; do not persist a client entity id as a network identity.
     *
     * @since 2.31.0+op77.3
     * @open77Return x, y, z
     */
    position(this: void, entity?: number | string): unknown;
    /**
     * The seat occupied in a vehicle, if any.
     *
     * Returns the canonical seat name and the mounted vehicle's client entity id when the character is in a vehicle. A character that is not mounted returns `nil`; both values are snapshots and the entity id is valid only in the current client stream.
     *
     * @since 2.31.0+op77.3
     * @open77Return seat name and vehicle entity id, or nil | reason when the character could not be read
     */
    seat(this: void, entity?: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Holds the local player's body still, without a server round trip.
     *
     * Client-only; requires `player.freeze`. **Presentation-local**: it holds YOUR body on YOUR machine, for a menu, a progress bar or a short scripted beat where a server round trip would be felt. The server's `Open77.players.setFrozen` outranks it outright -- while the server holds you, releasing your own claim changes nothing and the second return value stays `true`.
     *
     * The hold is the engine's own `GameplayRestriction.NoMovement`, the same record vanilla death applies. It stops every locomotion input -- walk, run, sprint, jump, dodge, slide, vault -- and deliberately stops nothing else: camera, chat, voice, menus, interaction prompts and damage all keep working, and you can still be killed where you stand.
     *
     * The claim is keyed by your resource, so another resource's claim survives your release. Yours is dropped for you when your resource stops or reloads, when you die, and when the session ends -- a freeze whose owner is gone is the one failure this must not have. The second return value is whether the body is still held afterwards by anybody at all.
     *
     * @permission player.freeze
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | effectiveFrozen, or the reason for the refusal
     */
    setFrozen(this: void, frozen: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Instantaneous speed, all components.
     *
     * Returns total character movement speed, including vertical motion, from the latest local snapshot. Use `groundSpeed()` when only horizontal locomotion is relevant.
     *
     * @since 2.31.0+op77.3
     * @open77Return number
     */
    speed(this: void, entity?: number | string): number;
    /**
     * One complete snapshot of a character.
     *
     * A single engine pass fills the whole record even when the caller only wanted the speed. That is deliberate: every field then describes the **same instant**, so a caller cannot see a body grounded and airborne in the same breath.
     *
     * With no argument, answers about the local player. An integer is an **Open77 entity id**.
     *
     * A table `{ engineEntity = n, radius? }` reads a body Open77 does **not** own -- a vanilla population ped, a traffic car -- addressed by its engine id, because it has no Open77 id to address it with. Those answers carry `source = "observed"` and `owned = false`, `id` is 0, and only what can be read straight off the object is filled in: placement, orientation and health. Locomotion, weapon and vehicle state come from Open77's own replication and are left unset rather than guessed at. The body is located among what is streamed around the local player, so `entity_not_observed` means "not in view from here", which for a vanilla ped is an ordinary outcome and not an error. There is no write counterpart: every mutator is keyed by an Open77 id and answers `npc_not_found` for one of these.
     *
     * @since 2.31.0+op77.3
     * @open77Return table { isPlayer, attached, id, engineId, position, orientation, forward, velocity, speed, groundSpeed, yaw, alive, health, grounded, crouched, sliding, vaulting, air, fall, landing, weapon…, inVehicle, seat, driver } | reason, when the first is nil
     */
    state(this: void, entity?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The equipped weapon and its state.
     *
     * Returns the drawn weapon's recognized item id and category for the selected character. It returns `nil` when no recognized weapon is currently presented and does not expose or mutate inventory.
     *
     * @since 2.31.0+op77.3
     * @open77Return table { itemId, category }, or nil | reason when the character could not be read
     */
    weapon(this: void, entity?: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Turns a world point into an entity's own frame.
     *
     * Requires `world.transform`. The exact inverse of `offsetToWorld`: the basis is orthonormal, so its transpose is its inverse. `y > 0` means the point is in front of the entity.
     *
     * @permission world.transform
     * @since 2.31.13+op77.67
     * @failure game_unavailable_on_this_host, permission_denied:world.transform
     * @open77Return table { x, y, z }, or nil | reason
     */
    worldToOffset(this: void, entity?: unknown, point?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Horizontal orientation, in degrees.
     *
     * Returns the selected character's current world yaw in degrees. The value is a presentation snapshot and should be normalized by the caller when computing angular deltas.
     *
     * @since 2.31.0+op77.3
     * @open77Return number
     */
    yaw(this: void, entity?: number | string): number;
}
interface Open77ChuteApi {
    /**
     * Arms the grav-chute with a gravity, descent rate and optional glide speed.
     *
     * Requires `player.chute`. `player.chute` is its own permission rather than a member of `player.travel`, because the chute moves nobody: it rewrites the fall, and a gamemode that may teleport is not thereby a gamemode that may change gravity. Every bound is enforced in the native layer; the Lua side only refuses what Lua can get wrong first -- a missing argument, or one that is not a number.
     *
     * @permission player.chute
     * @since 2.31.9+op77.22
     * @open77Return true, otherwise false | reason: permission_denied:player.chute, chute_unavailable_on_this_host
     */
    arm(this: void, gravity: number, descentRate: number, glideSpeed?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Disarms the grav-chute.
     *
     * Requires `player.chute`. Restores the gravity and descent the engine had before `arm`. Disarming when nothing is armed succeeds. Like `arm`, it is refused on a host with no chute backend (`chute_unavailable_on_this_host`).
     *
     * @permission player.chute
     * @since 2.31.9+op77.22
     * @open77Return true, otherwise false | reason
     */
    disarm(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether this client last accepted an arm or a disarm.
     *
     * Requires `player.chute`. It reports the last arm/disarm **this client accepted**, not a reading of the script side, which lags by up to one poll of the bridge loop. Treat it as bookkeeping, never as proof the player is falling slowly. Without the permission or a chute backend it answers false rather than an error.
     *
     * @permission player.chute
     * @since 2.31.9+op77.22
     * @open77Return boolean
     */
    isArmed(this: void): boolean;
}
interface Open77ClipboardApi {
    /**
     * Writes UTF-8 text to the operating-system clipboard.
     *
     * Client-only and requires `clipboard.write` on the resource whose VM performs the call. Text is limited to 256 KiB, must be valid UTF-8 and cannot contain an embedded NUL. The operation is write-only: resources cannot inspect the user's existing clipboard. A temporarily owned clipboard returns `false, clipboard_busy`; callers should let the player retry instead of polling every frame.
     *
     * @permission clipboard.write
     * @since 2.31.0+op77.3
     * @failure clipboard_text_contains_nul, clipboard_text_too_large, clipboard_unavailable_on_this_host, permission_denied:clipboard.write
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    setText(this: void, text: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77CyberwareApi {
    /**
     * Answer the owned native second-jump intent with the server's decision.
     *
     * Requires player.cyberware.project and a running resource. request is the owned native request; sequence is the positive uint32 of the pending action reported by legsActivity; allowed is a boolean. true means the matching pending native intent accepted the decision, not that a jump was consumed, displaced or rendered. Open77 buffers an eligible press for at most 750 ms, so a late grant still has to pass the native timeout and the original native predicates. Stamina is charged on server admission and is not refunded when native execution later expires. This is a trusted projection primitive, not a public server-side jump command or a security boundary against a modified client.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, invalid_approval, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return true on acceptance | nil, reason on rejection
     */
    approveLegJump(this: void, request: number, sequence: number, allowed: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Read local native Gorilla melee activity.
     *
     * Requires player.cyberware.read. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. Returns {sequence,holding,variant,record,chargeExpired} when a usable native Gorilla weapon is observed; unavailable/unarmed states return nil, reason. This is client observation, not authoritative charge, damage or cooldown. The platform forwards bounded intent and the server validates it.
     *
     * @permission player.cyberware.read
     * @since 2.31.13+op77.63
     * @failure cyberware_backend_unavailable, permission_denied:player.cyberware.read
     * @open77Return activity table | nil, reason on rejection
     */
    attackState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Capture the local native Gorilla Arms posture profiles.
     *
     * Requires player.cyberware.read. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. Returns {family,groups}; groups contain part/name hashes and key pairs. The validated adapter supplies matching holstered and drawn alternatives for male or female, not arbitrary replacement assets. Native readiness and equipment readback do not prove rendered geometry.
     *
     * @permission player.appearance.read, player.cyberware.read
     * @since 2.31.13+op77.63
     * @open77Return body profile table | nil, reason on rejection
     */
    captureArms(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Configure the owned ready legs adapter's admission limits.
     *
     * Requires player.cyberware.project and a running resource. request must be a ready owned request. staminaManaged=true selects suppression of the native second-jump stamina debit and requires the server pricing path; it is not a stamina cost argument. maxAirborneMs is an integer 100-10000 and maxFallSpeed a finite 0.1-30 m/s, matching the grade table. These limits only narrow native eligibility: they never change jump height, trajectory, gravity, fall damage or native collision response. Support sets them from the installed grade snapshot.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, invalid_configuration, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return true on acceptance | nil, reason on rejection
     */
    configureLegs(this: void, request: number, staminaManaged: boolean, maxAirborneMs: number, maxFallSpeed: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Configure native charge limits and stamina-override presence.
     *
     * Requires player.cyberware.project. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. Requires the same owned ready request. options accepts nullable normalStaminaCost/chargedStaminaCost (0..300) and maxChargeMs (100..60000, default10000). Native code uses cost presence to suppress supported native attack prices; the server owns the actual costs and debits. It does not grant stamina or suppress unrelated movement costs.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.63
     * @failure cyberware_backend_unavailable, invalid_charge_limit, invalid_configuration, invalid_stamina_cost, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return true | nil, reason on rejection
     */
    configureLocal(this: void, request: number, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hold the server's double-jump activation lease on the local body.
     *
     * Requires player.cyberware.project and a running resource. Trusted projection primitive used by the shipped open77_cyberware client: with a lease held, a second-jump press is spent locally and the jump happens on the frame the player pressed; the server is told afterwards and reconciles at the stamp. lease is the server's lease id, epoch its uint32 epoch, budget the activations it allows (1-64) and ttlMs how much longer it is valid (1-30000) -- a remaining lifetime, never an absolute deadline, so no clock domain is mixed. Returns true when the lease is held; nil, reason otherwise (invalid_lease, cyberware_backend_unavailable). Without a lease the ask-and-wait path still runs.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.73
     * @failure cyberware_backend_unavailable, invalid_lease, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return true | nil, reason on rejection
     */
    grantLegLease(this: void, lease: string, epoch: number, budget: number, ttlMs: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Mark the pending leased jump report as sent.
     *
     * Requires player.cyberware.project. After a leased press the activity reported by legsActivity carries reportSequence; once the resource has sent that report to the server, this returns the activation to idle. The lease keeps whatever budget it has left.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.73
     * @failure cyberware_backend_unavailable, invalid_report, permission_denied:player.cyberware.project
     * @open77Return void
     */
    legReportSent(this: void, reportSequence: number): void;
    /**
     * Read fresh native legs action and airborne state.
     *
     * Requires player.cyberware.read. Returns {request,sequence,phase,grounded,airborneMs,verticalSpeed}. Phases are idle, pending, granted, consumed and rejected; sequence is a positive uint32 while an action is pending and can report zero when idle. This is local native observation, not an authorization and not rendered proof. A resource that does not own the native adapter should use open77_cyberware's read-only legsActivity export instead: the core method inspects only the calling VM's own owner.
     *
     * @permission player.cyberware.read
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, permission_denied:player.cyberware.read
     * @open77Return activity table | nil, reason on rejection
     */
    legsActivity(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read the owned native legs projection phase.
     *
     * Requires player.cyberware.project. request is the positive ID returned by projectLegs. Returns "pending", "ready" or "failed" plus a reason string for a validly shaped query; a malformed request returns nil, reason. "ready" means the native equipment readback matched across three bridge polls, not that a second jump was performed or rendered. Another resource cannot read this owner's private request by guessing its numeric ID.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, invalid_request, permission_denied:player.cyberware.project
     * @open77Return phase string, reason string | nil, reason on a malformed query
     */
    legsState(this: void, request: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read the native equipment projection state for an owned request.
     *
     * Requires player.cyberware.project. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. Returns a phase string and a reason string: pending, ready or failed for the matching native request. Invalid/foreign native requests may return an empty phase plus reason; Lua permission/argument failures return nil, reason. ready describes native equipment readback, not SQL commit or visible confirmation.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.63
     * @failure cyberware_backend_unavailable, invalid_request, permission_denied:player.cyberware.project
     * @open77Return phase string, reason string | nil, reason on Lua validation failure
     */
    localState(this: void, request: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Project or clear an owned Gorilla Arms appearance overlay.
     *
     * Requires player.cyberware.project. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. playerId is the network player ID, including the local player for its self-view. Pass a validated captured {family,groups} profile, or false to clear. Overlay ownership survives identical replays; conflicting owners fail. Native attachment/posture work is asynchronous; true is acceptance, not visible completion.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.63
     * @open77Return boolean accepted | reason on failure
     */
    presentArms(this: void, playerId: number, profile: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queue native local double-jump legs installation or removal.
     *
     * Requires player.cyberware.project and a running resource. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant, grant a jump or authorize damage. enabled=true equips the supported native legs cyberware (Items.BoostedTendonsRare through the native LegsCW area); false releases it. Returns an owned positive integer request ID; poll legsState(request). Readiness requires matching owned item and HasDoubleJump readback and is not rendered proof. Arms and legs have distinct native owners, requests and equipment areas, so a legs request never disturbs an installed Gorilla Arms projection. Resource stop invokes owned cleanup, which unequips only the item this adapter created.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, invalid_enabled, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return positive request id | nil, reason on rejection
     */
    projectLegs(this: void, enabled: boolean): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Queue native local Gorilla equipment installation or removal.
     *
     * Requires player.cyberware.project. Trusted native projection primitive used by open77_cyberware; it does not install a durable implant or authorize damage. enabled=true equips the supported native arms; false restores bare arms. Returns an owned positive integer request ID. Poll localState(request); queued work is neither a committed purchase nor visual proof. Resource stop releases the native owner.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.63
     * @failure cyberware_backend_unavailable, invalid_enabled, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return request ID | nil, reason on rejection
     */
    projectLocal(this: void, enabled: boolean): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Refresh the held double-jump lease with the server's latest budget and lifetime.
     *
     * Requires player.cyberware.project. Applies the 20 Hz refresh the server sends on its snapshot stream: epoch must match the held lease, remaining is the activations still allowed, ttlMs the remaining lifetime. A refresh for another epoch is ignored. Trusted projection primitive; not a public API.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.73
     * @failure cyberware_backend_unavailable, invalid_lease, permission_denied:player.cyberware.project
     * @open77Return void
     */
    refreshLegLease(this: void, epoch: number, remaining: number, ttlMs: number): void;
    /**
     * Drop the held double-jump lease; presses go back to ask-and-wait.
     *
     * Requires player.cyberware.project. Called on a server revoke, on a session change and on resource stop. Idempotent.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.73
     * @failure cyberware_backend_unavailable, permission_denied:player.cyberware.project
     * @open77Return void
     */
    releaseLegLease(this: void): void;
    /**
     * Request owned native legs cleanup.
     *
     * Requires player.cyberware.project and a running resource. Releases only the calling resource's own native legs projection and is harmless when it owns none. true acknowledges the request; completion is asynchronous. Cleanup unequips this adapter's owned item and removes an inventory copy only when this adapter created it, so a pre-existing unowned double-jump capability is left alone. Resource teardown invokes the same owned cleanup even after Lua callbacks have ended.
     *
     * @permission player.cyberware.project
     * @since 2.31.13+op77.67
     * @failure cyberware_backend_unavailable, permission_denied:player.cyberware.project, resource_not_running
     * @open77Return true | nil, reason on rejection
     */
    releaseLegs(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77DashApi {
    /**
     * Runs the resource-owned native Dash projector operation.
     *
     * Client support adapter; requires player.dash.project. Operations configure, state, request, approve, cancel, activity, release and present are bounded and generation-scoped. Server creators use the separate server Open77.dash define/grant/revoke API documented in dash.md. Native permits and correlated phases are not proof of rendered movement. Arbitrary speed, distance, effect IDs and stamina settings are unavailable. Multiplayer acceptance is pending.
     *
     * @permission player.dash.project
     * @since 2.31.13+op77.67
     * @failure dash_backend_unavailable, invalid_approval, invalid_configuration, invalid_direction, invalid_operation, invalid_presentation, invalid_request, invalid_sequence, permission_denied:player.dash.project, resource_not_running
     * @open77Return operation result or nil | reason on failure
     */
    call(this: void, operation: string, arg2?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77DataApi {
    /**
     * Looks up an `Items.*` clothing or item record in the game's live TweakDB.
     *
     * No permission required; this is static game data. **The client ships no catalogue**: it is inside Cyberpunk 2077, so it reads the real database and gets the display name in the player's own language for zero shipped bytes. `source` is `tweakdb` here and `catalogue` on the server, which answers the same call from a reduced shipped table. `recordClass` -- the record's runtime RTTI class -- is always present once the lookup succeeds and is the honest local answer to FiveM's `GetEntityModel`; every other field is best effort, and an **absent field means the engine did not expose it**, not that the record lacks it. A `record` is a TweakDB string, never a Jenkins hash. Fails with `record_unknown`, `record_wrong_kind`, `invalid_record` or `tweakdb_unavailable`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_record, record_unknown, records_unavailable
     * @open77Return { record, kind, recordClass, tweakDbId, source, ... }, or nil | reason
     */
    item(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Resolves a localisation key to the text the player would actually see.
     *
     * No permission required. Accepts `LocKey#12345`, a bare numeric key -- so a `localeKey` read off a server catalogue row can be passed straight in -- or a secondary key string. The FiveM `GetLabelText` equivalent. Fails with `localization_unavailable` when the engine declines the key; the server refuses this call outright, because the locale tables only exist inside the game. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_key, localization_unavailable, records_unavailable
     * @open77Return text, or nil | reason
     */
    localize(this: void, key: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Looks up a `Character.*` NPC record in the game's live TweakDB.
     *
     * No permission required; this is static game data. **The client ships no catalogue**: it is inside Cyberpunk 2077, so it reads the real database and gets the display name in the player's own language for zero shipped bytes. `source` is `tweakdb` here and `catalogue` on the server, which answers the same call from a reduced shipped table. `recordClass` -- the record's runtime RTTI class -- is always present once the lookup succeeds and is the honest local answer to FiveM's `GetEntityModel`; every other field is best effort, and an **absent field means the engine did not expose it**, not that the record lacks it. A `record` is a TweakDB string, never a Jenkins hash. Fails with `record_unknown`, `record_wrong_kind`, `invalid_record` or `tweakdb_unavailable`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_record, record_unknown, records_unavailable
     * @open77Return { record, kind, recordClass, tweakDbId, source, ... }, or nil | reason
     */
    npc(this: void, template: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Looks up a `Vehicle.*` record in the game's live TweakDB.
     *
     * No permission required; this is static game data. **The client ships no catalogue**: it is inside Cyberpunk 2077, so it reads the real database and gets the display name in the player's own language for zero shipped bytes. `source` is `tweakdb` here and `catalogue` on the server, which answers the same call from a reduced shipped table. `recordClass` -- the record's runtime RTTI class -- is always present once the lookup succeeds and is the honest local answer to FiveM's `GetEntityModel`; every other field is best effort, and an **absent field means the engine did not expose it**, not that the record lacks it. A `record` is a TweakDB string, never a Jenkins hash. Fails with `record_unknown`, `record_wrong_kind`, `invalid_record` or `tweakdb_unavailable`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_record, record_unknown, records_unavailable
     * @open77Return { record, kind, recordClass, tweakDbId, source, ... }, or nil | reason
     */
    vehicle(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Looks up an `Items.*` weapon record in the game's live TweakDB.
     *
     * No permission required; this is static game data. **The client ships no catalogue**: it is inside Cyberpunk 2077, so it reads the real database and gets the display name in the player's own language for zero shipped bytes. `source` is `tweakdb` here and `catalogue` on the server, which answers the same call from a reduced shipped table. `recordClass` -- the record's runtime RTTI class -- is always present once the lookup succeeds and is the honest local answer to FiveM's `GetEntityModel`; every other field is best effort, and an **absent field means the engine did not expose it**, not that the record lacks it. A `record` is a TweakDB string, never a Jenkins hash. Fails with `record_unknown`, `record_wrong_kind`, `invalid_record` or `tweakdb_unavailable`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_record, record_unknown, records_unavailable
     * @open77Return { record, kind, recordClass, tweakDbId, source, ... }, or nil | reason
     */
    weapon(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77DebugApi {
    /**
     * Runs one registered native laboratory command directly.
     *
     * Requires `debug.runtime` and the trusted `open77_debug` owner. Input is limited to 4096 bytes and unknown commands are not forwarded to the server.
     *
     * @permission debug.runtime
     * @since 2.31.0+op77.3
     * @open77Return true and command result on success | false and reason
     */
    command(this: void, commandLine: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Compiles and executes a bounded text-only Lua chunk in the privileged debug VM.
     *
     * Requires `debug.runtime` and the trusted `open77_debug` owner. Source is limited to 32 KiB, the optional chunk label to 64 bytes, returned values to 16 and result text to 8 KiB. The ordinary memory, instruction and frame-time quotas remain active.
     *
     * @permission debug.runtime
     * @since 2.31.0+op77.3
     * @open77Return true and bounded result text on success | false and compile/runtime reason
     */
    eval(this: void, source: string, label?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queues one bounded command through the REDscript debug bridge.
     *
     * Requires `debug.runtime` and the trusted `open77_debug` owner. The opaque command is limited to 4096 bytes and executes from a genuine REDscript frame.
     *
     * @permission debug.runtime
     * @since 2.31.0+op77.3
     * @open77Return true and bridge result on success | false and reason
     */
    redscript(this: void, command: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77DebugDrawApi {
    /**
     * Remove one tag's debug geometry, or every batch the calling resource drew.
     *
     * With a tag, removes that batch; with no argument, removes every batch this resource owns. It never touches another resource's drawings, and it cannot fail: clearing a tag that was never set is a no-op. The runtime does the same on stop and reload, so calling it is only needed to take a drawing down early, before its `ttl` would.
     *
     * @since 2.31.13+op77.67
     * @open77Return true
     */
    clear(this: void, tag?: string): boolean;
    /**
     * Draw resource-owned debug lines and triangles in the world under a tag, replacing that tag atomically.
     *
     * The overlay PolyZone's editor and `debug` zones use. `tag` (1..96 characters) names a batch owned by the calling resource; setting it again replaces the whole batch. `geometry` is `{ lines = { { a = {x,y,z}, b = {x,y,z}, color = "#RRGGBB" | "#RRGGBBAA" }, ... }, triangles = { { a, b, c, color }, ... }, ttl?, maxDistance?, thickness? }`. Limits: 512 lines and 256 triangles per batch, 32 tags per resource, 128 batches in total, 8192 input vertices in total; coordinates finite and within +/-1,000,000; `ttl` 0.05..10 s (the batch expires on its own, so a resource that stops drawing leaves nothing behind), `maxDistance` 1..5000 m, `thickness` 0.5..8 px. Requires `world.debug`.
     *
     * Everything a resource drew is released when it stops or reloads. Fails with `invalid_debug_tag`, `invalid_debug_geometry`, `invalid_debug_options`, `invalid_debug_primitives`, `invalid_debug_point`, `invalid_debug_color`, `debug_geometry_quota` or `debug_geometry_unavailable`.
     *
     * @permission world.debug
     * @since 2.31.13+op77.67
     * @failure debug_geometry_quota, debug_geometry_unavailable, invalid_debug_color, invalid_debug_geometry, invalid_debug_options, invalid_debug_point, invalid_debug_primitives, invalid_debug_tag, permission_denied:world.debug
     * @open77Return true, or nil | reason on failure
     */
    set(this: void, tag: string, geometry: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77DoorsApi {
    /**
     * The streamed door currently under the crosshair.
     *
     * Requires `world.doors`. The returned `id` is an opaque 64-bit REDengine identity encoded as a string; never convert it to a Lua number. A successful discovery also makes that door addressable by `state` and the command functions while it remains streamed.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return door snapshot, or nil | reason when the first is nil
     */
    aimed(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads the entity currently under the crosshair even when it is not a controllable Door.
     *
     * Requires `world.doors`. Unlike `aimed`, this controller-agnostic probe accepts static and scenery door meshes. It always provides identity and placement when targeting succeeds; open, locked, and sealed state is populated only when the entity exposes a door controller.
     *
     * @permission world.doors
     * @since 2.31.7+op77.16
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return door-like entity snapshot, or false | reason on failure
     */
    aimedAny(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Whether the client door backend is available.
     *
     * This capability check does not discover or stream a door. Door operations require the `world.doors` permission.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    available(this: void): boolean;
    /**
     * Removes this resource's interaction policy for a door.
     *
     * Requires `world.doors`. Other resources' policies are unaffected.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for refusal
     */
    clearInteractionPolicy(this: void, door: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Closes a door.
     *
     * Alias of `setOpen(door, false, force)`. Requires `world.doors`; application is asynchronous.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    close(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The closest streamed door around the local player.
     *
     * Requires `world.doors`. Uses the same 0.5 to 100 metre player-centered query as `near`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure no_door_in_radius
     * @open77Return door snapshot, or nil | reason when the first is nil
     */
    closest(this: void, radius?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Grants an entity an opening token for a door.
     *
     * Requires `world.doors`. Uses the door controller's native token mechanism rather than a parallel Open77 key list. This grants authorization but does not lock or deny an otherwise usable door; access enforcement belongs to `setInteractionAllowed`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    grantKey(this: void, door: unknown, holder: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether an entity holds an opening token for a door.
     *
     * Requires `world.doors`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return boolean, or nil | reason when the first is nil
     */
    hasKey(this: void, door: unknown, holder: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The entities holding an opening token for a door.
     *
     * Requires `world.doors`. Holder IDs are opaque strings for the same precision reason as door IDs. Tokens are vanilla authorization data, not a global lock rule: an unlocked interactive door remains usable with no token. Combine `hasKey` with `setInteractionAllowed` when implementing an ox_doorlock-style policy.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return array of opaque entity ids, or nil | reason when the first is nil
     */
    holders(this: void, door: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Locks a door.
     *
     * Alias of `setLocked(door, true, force)`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    lock(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * All streamed doors around the local player.
     *
     * Requires `world.doors`. The radius is centered on the player and must be between 0.5 and 100 metres. Results are sorted nearest first and register each door for later ID-based operations.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return array of door snapshots, or nil | reason when the first is nil
     */
    near(this: void, radius?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Opens a door.
     *
     * Alias of `setOpen(door, true, force)`. Requires `world.doors`; application is asynchronous.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    open(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Resets a door to its configured default state.
     *
     * Requires `world.doors`; queues the vanilla `ResetDoorState` event.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    reset(this: void, door: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Revokes an entity's opening token for a door.
     *
     * Requires `world.doors`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    revokeKey(this: void, door: unknown, holder: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Seals a door.
     *
     * Alias of `setSealed(door, true, force)`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    seal(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or disables a door's automatic closing behavior.
     *
     * Requires `world.doors`; queues the vanilla `SetCloseItself` event.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    setAutomaticClose(this: void, door: unknown, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Pre-declares whether vanilla interaction may open a door.
     *
     * Requires `world.doors`. The decision is synchronous when the game interacts with the door. Policies are owned by the resource, all active policies must allow, and they are removed automatically on stop/reload. `open77:doorInteract` is an observational event with `(doorId, activatorId, "true"|"false")`; it is too late to change that interaction.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason for refusal
     */
    setInteractionAllowed(this: void, door: unknown, allowed: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets whether a door is locked.
     *
     * Requires `world.doors`. `force` uses the vanilla quest-authority action; application is asynchronous.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    setLocked(this: void, door: unknown, locked: boolean, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets whether a door is open.
     *
     * Requires `world.doors`. Success means the REDscript action was accepted; application is asynchronous and may take up to 200 ms. `force` uses the vanilla quest-authority action.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    setOpen(this: void, door: unknown, open: boolean, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets whether a door is sealed.
     *
     * Requires `world.doors`. Sealing is distinct from locking. `force` uses the vanilla quest-authority action.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    setSealed(this: void, door: unknown, sealed: boolean, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a door state by name.
     *
     * Accepted states: `open`, `closed`, `locked`, `unlocked`, `sealed`, `unsealed`. Requires `world.doors`; `force` selects the quest-authority action.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    setState(this: void, door: unknown, state: string, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a static or scenery door below the floor.
     *
     * Requires `world.doors`. This is a visual removal fallback for geometry that has no DoorControllerPS and therefore cannot be opened normally. Depth must be greater than zero and no more than 100 metres; the default is 3 metres.
     *
     * @permission world.doors
     * @since 2.31.7+op77.16
     * @open77Return true on success, otherwise false | reason
     */
    sink(this: void, id: string, depth?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * A live snapshot of a streamed door.
     *
     * Requires `world.doors`. Reads the live `DoorControllerPS`, never a fabricated default from the save record. Returns `door_not_streamed` after the entity unloads. Snapshot fields include `id`, `class`, `name`, `position`, `distance`, `open`, `closed`, `locked`, `sealed`, `busy`, `playerAuthorised`, `automaticClose`, toggle capabilities, shutter/lift flags, type/sides and opening speed/time.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @failure door_backend_unavailable, permission_denied:world.doors
     * @open77Return door snapshot, or nil | reason when the first is nil
     */
    state(this: void, door: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Unlocks a door.
     *
     * Alias of `setLocked(door, false, force)`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    unlock(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Unseals a door.
     *
     * Alias of `setSealed(door, false, force)`.
     *
     * @permission world.doors
     * @since 2.31.0+op77.3
     * @open77Return true when accepted, otherwise false | reason for refusal
     */
    unseal(this: void, door: unknown, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ElevatorsApi {
    /**
     * Lists every replicated elevator state visible to the client.
     *
     * Requires `elevators.read`; returns an empty array when the capability or backend is unavailable.
     *
     * @permission elevators.read
     * @since 2.31.0+op77.3
     * @open77Return array of elevator snapshots
     */
    all(this: void): unknown;
    /**
     * Reads one replicated elevator by Open77 ID.
     *
     * Requires `elevators.read`. Elevator IDs are server-assigned and should be kept unchanged.
     *
     * @permission elevators.read
     * @since 2.31.0+op77.3
     * @open77Return table { id, revision, bucket, engineEntity, activeFloor, originFloor, targetFloor, floorCount, travelMs, remainingMs, flags, phase, position, streamed, applied }, or nil
     */
    get(this: void, id: number): Open77Table | undefined;
    /**
     * Discovers streamed native elevators around the local player.
     *
     * Requires `elevators.read`. Radius must be between 1 and 300 metres. Results distinguish unmanaged engine lifts from elevators already adopted by Open77.
     *
     * @permission elevators.read
     * @since 2.31.0+op77.3
     * @open77Return array of { engineEntity, controllerEntity, position, distance, managed, floorCount, activeFloor, id }
     */
    nearby(this: void, radius?: number): Open77Table;
    /**
     * Submits a floor request to the authoritative server.
     *
     * Requires `elevators.request`. `action` is normally `call` or `goto`; the server validates the ID, floor, player bucket, range, state and policy.
     *
     * @permission elevators.request
     * @since 2.31.0+op77.3
     * @open77Return true when submitted, otherwise false | reason
     */
    request(this: void, id: number, floor: number, action: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77EnvironmentApi {
    /**
     * Lit l'horloge REDengine locale.
     *
     * Primitive interne protégée par `world.environment`. Retourne un snapshot atomique de l'heure appliquée et de l'état de pause. Dans une session normale, utilisez l'export `open77_weather.getState` plutôt que cette valeur de projection.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @failure environment_backend_unavailable, permission_denied:world.environment
     * @open77Return table { day, hour, minute, second, totalSeconds, frozen }, ou nil | raison si indisponible
     */
    getTime(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Indique si la météo automatique vanilla est neutralisée.
     *
     * Demande `world.environment`.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @failure environment_backend_unavailable, permission_denied:world.environment
     * @open77Return boolean, ou nil | raison si indisponible
     */
    isWeatherFrozen(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Projette une heure serveur dans REDengine.
     *
     * Demande `world.environment`. `open77_weather` est normalement le seul propriétaire de cette permission. REDengine choisit la prochaine occurrence de l'heure demandée ; le package officiel filtre donc les petits reculs réseau pour éviter un saut d'un jour.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès, sinon false | raison du refus
     */
    setTime(this: void, hour: number, minute: number, second?: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Fige ou libère uniquement l'horloge du jeu.
     *
     * Ne fige pas la simulation. Demande `world.environment`; utilisé par la projection serveur pour neutraliser la vitesse vanilla.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès, sinon false | raison du refus
     */
    setTimeFrozen(this: void, frozen: boolean): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Applique un preset météo REDengine.
     *
     * Primitive interne demandant `world.environment`. Le second retour `applied=false` est aussi possible en cas de succès si le preset était déjà actif.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès, sinon false | applied si succès, sinon raison du refus
     */
    setWeather(this: void, preset: string, transitionSeconds?: number, priority?: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Désactive ou réactive le contrôleur météo automatique vanilla.
     *
     * Demande `world.environment`. Figer conserve le preset courant et laisse le serveur décider du prochain événement.
     *
     * @permission world.environment
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès, sinon false | raison du refus
     */
    setWeatherFrozen(this: void, frozen: boolean): LuaMultiReturn<[boolean, string | undefined]>;
}
interface Open77EquipmentApi {
    /**
     * Applies a table of local equipment slot values.
     *
     * Client-only; requires player.equipment.edit. Returns true on accepted native mutation, or nil, reason; acceptance is not rendered completion. Values are record strings or false to clear. Options: allowRestricted=false and replace=false. With replace=false omitted slots are preserved; replace=true also clears omitted slots. Worn-set mutations run sequentially and may partially apply before an error; this is not an atomic transaction.
     *
     * @permission player.equipment.edit
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_options, invalid_slots, permission_denied:player.equipment.edit
     * @open77Return true, or nil, reason
     */
    apply(this: void, slots: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the item actually attached at a local slot.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns a record string or false when no item is attached. Attachment alone does not prove the expected garment appearance has settled.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_slot, permission_denied:player.equipment.read
     * @open77Return record or false, or nil, reason
     */
    attached(this: void, slot: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Equips a record in the local worn set.
     *
     * Client-only; requires player.equipment.edit. Returns true on accepted native mutation, or nil, reason; acceptance is not rendered completion. Call equip(record[, slot][, options]); omitted slot is inferred by the native record adapter. options.allowRestricted defaults false. Read registry/attached/visualSettled separately when completion matters.
     *
     * @permission player.equipment.edit
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_options, invalid_record, invalid_slot, permission_denied:player.equipment.edit
     * @open77Return true, or nil, reason
     */
    equip(this: void, record: string, slot?: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the local equipment body family.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns the native adapter body-family name, used to filter compatible records.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, permission_denied:player.equipment.read
     * @open77Return family, or nil, reason
     */
    family(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Looks up metadata for one equipment record.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. The record name is 1..160 bytes. Result fields: record, tweakDbId, slot, attachmentSlot, catalogScope, supportsMale, supportsFemale, defaultSelectable and nonvisual. This lookup does not equip the item.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_record, permission_denied:player.equipment.read
     * @open77Return info, or nil, reason
     */
    info(this: void, record: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists equipment records with optional slot and body-family filters.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Options: slot, family="male" or "female", restricted=false and limit=200 (positive integer, capped at 2000). restricted=true includes records not default-selectable; it does not grant mutation permission. Results use the same metadata shape as info().
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_options, permission_denied:player.equipment.read
     * @open77Return records, or nil, reason
     */
    records(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads the local worn equipment slot registry.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns a table keyed by slot: record strings or false for empty slots. Registry state is separate from the attached item and its settled visual appearance.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, permission_denied:player.equipment.read
     * @open77Return slots, or nil, reason
     */
    registry(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the supported clothing slot names and attachment slots.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns nine {name, attachmentSlot} entries: Head, Face, InnerChest, OuterChest, Legs, Feet, Outfit, UnderwearTop and UnderwearBottom.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure permission_denied:player.equipment.read
     * @open77Return slots, or nil, reason
     */
    slots(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads native tags associated with a local equipment slot.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns an array of tag strings for the current wearer and slot.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_slot, permission_denied:player.equipment.read
     * @open77Return tags, or nil, reason
     */
    tags(this: void, slot: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Removes equipment from a local worn slot.
     *
     * Client-only; requires player.equipment.edit. Returns true on accepted native mutation, or nil, reason; acceptance is not rendered completion. Does not delete the inventory item. Read native visual readiness separately.
     *
     * @permission player.equipment.edit
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_slot, permission_denied:player.equipment.edit
     * @open77Return true, or nil, reason
     */
    unequip(this: void, slot: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Checks native visual readiness for an expected clothing slot value.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. expected must be a record string or false. Reads registry/outfit visibility and actual attachment/appearance readiness; false means not yet settled, whereas nil, reason indicates an error. This native readback is not screenshot proof.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, expected_record_or_false, invalid_record, invalid_slot, permission_denied:player.equipment.read
     * @open77Return settled, or nil, reason
     */
    visualSettled(this: void, slot: string, expected: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77EventsApi {
    /**
     * Publishes an event in this resource's VM; the same function as TriggerEvent.
     *
     * Emits an event on the resource-local client bus and invokes matching local handlers. It never sends a packet; use the network event API for server communication.
     *
     * @since 2.31.0+op77.3
     * @failure event_payload_not_serializable, reserved_animation_event, reserved_cyberware_event, reserved_dash_event, reserved_effect_event, reserved_hacking_event, reserved_interaction_event, reserved_loading_screen_event, reserved_player_model_event, resource_preparing
     * @open77Return true, or false, reason
     */
    emit(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a handler registered with `on`.
     *
     * Unregisters a local event handler id previously returned by `on`/`AddEventHandler`. The id is the only argument -- there is no event name parameter. Handler ids are owned by a resource generation and cannot remove another resource's callback.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    off(this: void, handler: number): boolean;
    /**
     * Listens for a local event.
     *
     * Same as the `AddEventHandler` global. Events emitted by the plugin — `open77:pauseKey`, `open77:menuStateChanged`, `open77:inspector:on` — arrive here.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_event_or_handler_limit
     * @open77Return handler id
     */
    on(this: void, event: string, handler: Open77Callback): number;
}
interface Open77ExportsApi {
    /**
     * Calls a function exported by another resource, asynchronously.
     *
     * Schedules another running client resource's exported function and returns a generation-bound Promise. Arguments and results must be serializable; unavailable resources, missing exports, stale generations and scheduler saturation are returned immediately as `nil, reason`.
     *
     * @since 2.31.0+op77.3
     * @failure export_arguments_not_serializable, export_not_found, export_request_limit, export_resource_unavailable, export_target_busy, resource_preparing
     * @open77Return promise, or nil | reason
     */
    call(this: void, resource: string, arg2: string, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Calls a function exported by another resource, inline on this thread.
     *
     * The non-sugar form of exports.resource:name(...). Runs the callee in its own VM before returning and yields its values directly. RAISES on failure instead of returning nil, reason — the one place Open77 departs from its own convention, so that ported FiveM code behaves the same; use pcall to handle failure. The callee must not yield (export_yielded), gets its own instruction budget (export_budget_exhausted fails only that call), and chains are capped at 8 frames (export_recursion_limit). Arguments and results are copied, never shared. A resource may call its own export.
     *
     * @since 2.31.13+op77.67
     * @open77Return whatever the export returns
     */
    callSync(this: void, resource: string, arg2: string, ...args: unknown[]): unknown;
}
interface Open77HackingApi {
    /**
     * Requests cleanup of the calling resource's hacking presentation.
     *
     * Client-only; requires player.hacking.project. Clears only presentation owned by the calling resource and is harmless when it owns none. Resource stop invokes the same owned cleanup automatically. true acknowledges the cleanup request, not native completion; the native script retains its bounded expiry fallback if the bridge cannot accept a clear command. This does not cancel an authoritative upload, purge a status, refund costs or undo committed damage. Use the server hacking APIs for gameplay state changes.
     *
     * @permission player.hacking.project
     * @since 2.31.13+op77.67
     * @failure permission_denied:player.hacking.project
     * @open77Return true, or nil, reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Releases this resource's owned native hacking statuses.
     *
     * Client-only; requires player.hacking.status. An omitted kind clears every status the calling resource holds; passing "blind" or "weapon_jam" clears only that slot, and any other value is refused with invalid_kind. It never clears another resource's slot and is harmless when the caller owns none. true acknowledges the clear request, not native completion; the adapter retains its bounded expiry, death, vehicle, workspot and session guards. This does not cancel an authoritative upload or undo committed damage.
     *
     * @permission player.hacking.status
     * @since 2.31.13+op77.67
     * @failure hacking_status_backend_unavailable, invalid_kind, permission_denied:player.hacking.status
     * @open77Return true, or nil, reason
     */
    clearNativeStatus(this: void, kind?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Applies a bounded native hacking status -- blind or weapon jam -- to the local player.
     *
     * Client-only; requires `player.hacking.status`, a server-driven projection primitive a player resource should not hold by default (distinct from the HUD-only `player.hacking.project`). `kind` is `blind` (Reboot Optics) or `weapon_jam` (Weapon Glitch); `durationMs` is 1..3600000 and the client clamps it to the kind's cap (15 s). One independent slot per kind, owned by the calling resource: a second call on the same kind replaces this resource's own slot and cannot touch another resource's. The adapter releases on the deadline, on death, vehicle entry, workspot, session change and resource stop; the server's deadline stays the authority and this only presents it. Returns the request id, not proof of a rendered effect.
     *
     * @permission player.hacking.status
     * @since 2.31.13+op77.67
     * @failure hacking_status_backend_unavailable, invalid_duration, invalid_kind, permission_denied:player.hacking.status, resource_not_running
     * @open77Return request id, or nil | reason: permission_denied:player.hacking.status, resource_not_running, hacking_status_backend_unavailable, invalid_kind, invalid_duration
     */
    nativeStatus(this: void, kind: string, durationMs: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads the bounded native hacking status slots and their counters.
     *
     * Client-only; requires player.hacking.status. Returns one sub-table per held kind, keyed by kind (blind, weapon_jam), each carrying kind, phase, owner, reason, request, grantedMs, remainingMs, elapsedMs, releaseOverdue and applied, plus the totals applications, refusals, releases and watchdogRemovals. Slots are independent, one per kind, and the client clamps each duration to that kind's cap. applied is adapter state, not proof of a rendered effect; the server's deadline is the authority and the client only presents it.
     *
     * @permission player.hacking.status
     * @since 2.31.13+op77.67
     * @failure hacking_status_backend_unavailable, permission_denied:player.hacking.status
     * @open77Return state table, or nil, reason
     */
    nativeStatusState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads a streamed multiplayer target's position, camera angle and local visibility for real-time selection.
     *
     * Client-only; requires world.query. playerId is a positive integer network player ID. Returns streamed=true, visible, distance in metres, angle in radians and position={x,y,z}; no engine pointer or entity handle is exposed. The target must have an attached, presentation-ready remote body. Native selection checks camera-to-chest distance from 0.8 through 80 metres; peers outside the 0.35-radian selection cone return visible=false without a physics query. Within the cone, a failed native raycast returns nil, reason. This is local selection evidence only: it does not authorize a target, start an upload or prove server visibility. The server separately validates identity, life, range, policy and challenged visibility. It does not enter the vanilla scanner or slow game time. See the Hacking and counterplay guide for the public server workflow.
     *
     * @permission world.query
     * @since 2.31.13+op77.67
     * @failure invalid_target_or_backend, permission_denied:world.query
     * @open77Return observation, or nil, reason
     */
    observe(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Queues this resource's native hacking warning, progress or outcome presentation.
     *
     * Client-only; requires player.hacking.project and a running resource. options contains actionId (integer 1..9007199254740991), phase (targeting, incoming, upload, block, purge, impact or cancel) and finite progress (0..1). actionId correlates presentation; it is not a damage authorization. Ownership comes from the calling resource. A different resource's active 1.5-second presentation lease refuses admission; refresh a continuing presentation periodically. The native adapter uses the vanilla progress HUD and sound cues while preserving other native HUD ownership. true means queued, not rendered or acoustically proven: the native script may refuse or defer a busy HUD. The official hacking resource supplies an incoming-warning fallback. This API does not execute a vanilla quickhack, apply native damage or change movement/camera controls. Resource stop requests owned cleanup; native presentation also has body/session and expiry guards.
     *
     * @permission player.hacking.project
     * @since 2.31.13+op77.67
     * @failure invalid_presentation_or_backend, permission_denied:player.hacking.project, presentation_refused, resource_not_running
     * @open77Return true when queued, or nil, reason
     */
    present(this: void, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77HudApi {
    /**
     * Empties one vanilla notification channel.
     *
     * Client-only; requires `ui.vanilla.hud`. The channel is "ingame" (default) or "menu". There is one vanilla slot per channel, so this clears whatever is in it, whoever put it there.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, invalid_notification_channel, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | failure reason
     */
    clearNotify(this: void, channel?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists the supported stock HUD component names.
     *
     * Requires `ui.vanilla.hud`. Returns the thirteen canonical names suitable for `setVisible`, `isVisible`, or a complete custom-HUD replacement loop. The `all` selector is not listed: it is a selector, not a component.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.8+op77.20
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return array of canonical component names, or nil | reason on failure
     */
    components(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Vanilla on-screen help text. UNSUPPORTED on this build.
     *
     * Client-only; requires `ui.vanilla.hud`. Validates its arguments (duration 100..60000 ms) and then refuses with `unsupported_channel` without entering engine code. The global behind it, MPDisplayOnscreenMessage, belongs to Cyberpunk's dormant multiplayer HUD and closed the process with an access violation when invoked on 2.31. The name stays bound so a resource written against it keeps working the day the channel is real; today, use Open77.hud.notify.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return false | unsupported_channel
     */
    help(this: void, text: string, durationMs?: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Reads the effective visibility of one stock HUD component.
     *
     * Requires `ui.vanilla.hud`. The result already combines hide claims from every resource. Names are case-insensitive and aliases such as `map`, `time`, `hp`, `ammo`, `weaponAmmo`, `speed`, `quest`, `vision`, `toasts`, `reticle` and `hub` are accepted. The selector `all` answers true only when every component is visible.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.8+op77.20
     * @failure hud_unavailable_on_this_host, invalid_hud_component, permission_denied:ui.vanilla.hud
     * @open77Return boolean, or nil | reason on failure
     */
    isVisible(this: void, component: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Adds one line to Cyberpunk's activity log.
     *
     * Client-only; requires `ui.vanilla.hud`. Calls `gameActivityLogSystem.AddLog`. Confirmed working on 2.31.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | failure reason
     */
    log(this: void, text: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queues a vanilla menu notification preset.
     *
     * Client-only; requires `ui.vanilla.hud`. A menu preset carries its own localized title and therefore takes no text. Accepts vendor_not_enough_money, not_enough_money, inventory_action_blocked, crafting_not_enough_materials, upgrade_level_too_low, no_perk_points, perks_locked, perks_max_level, no_attribute_points, in_combat, in_combat_explicit, crafting_quickhack, crafting_ammo_cap, player_level_too_low, inventory_full, face_unequip_blocked, tutorial_unequip_blocked and no_junk. Only visible while the menu layer that owns the queue is mounted.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, invalid_notification_preset, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | failure reason
     */
    menu(this: void, preset: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queues Cyberpunk's own five-second side notification.
     *
     * Client-only; requires `ui.vanilla.hud`. Writes to the real vanilla pipeline (`UIInGameNotificationEvent`), not to a WebUI surface, so it looks native and needs no resource dependency. Options: `replace` (replace what is on screen instead of queueing) and `preset` (one of generic, action_blocked, combat_blocked, cant_save_action, cant_save_combat, cant_save_quest, cant_save_death, save_slots_full, save_space_full, photo_mode_disabled, sandevistan_in_call, expansion_installed). Text is required unless a preset is given, since a preset carries its own localized title. The five-second duration is the engine's and cannot be changed. Hiding the `vanillaNotifications` HUD component hides this stack, including your own toasts.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | failure reason
     */
    notify(this: void, text: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hides gameplay HUD and nonfocused resource interfaces with animated letterbox bars.
     *
     * Client-only; requires `ui.vanilla.hud`. enabled must be a boolean; optional height is a finite fraction of the viewport for EACH black bar, 0.01..0.4 (default 0.12). true holds a resource-instance cinematic claim; false releases only the caller's claim. Multiple resources cooperate and the greatest requested height wins. Masks native HUD including minimap, nonfocused Open77 WebUI pages including watermark/chat history/Freeroam HUD, and native world labels/debug overlays. Focused chat or menus remain accessible when opened, as does the developer console. Rendering is gated without destroying pages or changing their visibility state. Existing HUD hide claims, including the same resource's ordinary claims, survive release. Stop/reload, coroutine failure and host teardown clean up automatically. Does not change camera, pause gameplay, mute audio or affect other players. Distinct from the open77_uikit letterbox-only helper. Errors: `permission_denied:ui.vanilla.hud`, `invalid_cinematic_arguments`, `invalid_cinematic_height`, `cinematic_unavailable_on_this_host`.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.78
     * @failure cinematic_unavailable_on_this_host, invalid_cinematic_arguments, invalid_cinematic_height, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | reason on failure
     */
    setCinematic(this: void, enabled: boolean, height?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hides or restores one stock HUD component for this resource.
     *
     * Requires `ui.vanilla.hud`. Passing `false` adds this resource's hide claim; passing `true` releases only its own claim. Another resource may still keep the component hidden. Claims are released automatically when the resource stops or reloads. Canonical components are `minimap`, `compass`, `clock`, `health`, `stamina`, `weapon`, `speedometer`, `questTracker`, `phone`, `scanner`, `vanillaNotifications`, `crosshair` and `hubMenu`; the selector `all` claims or releases every one of them at once. Names are case-insensitive. `scanner` also refuses scanner activation, because an invisible scanner would still hold aim snap and the movement restriction.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.8+op77.20
     * @failure hud_unavailable_on_this_host, invalid_hud_arguments, invalid_hud_component, permission_denied:ui.vanilla.hud
     * @open77Return true on success, otherwise false | effective visibility, or failure reason
     */
    setVisible(this: void, component: string, visible: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns the complete effective stock-HUD visibility snapshot.
     *
     * Requires `ui.vanilla.hud`. Keys always use canonical component names and values are booleans after all resources' claims have been combined. The `all` selector is not a component and never appears here.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.8+op77.20
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return table keyed by canonical component name, or nil | reason on failure
     */
    state(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Vanilla narration subtitle. UNSUPPORTED on this build.
     *
     * Client-only; requires `ui.vanilla.hud`. Same story as Open77.hud.help: validated, then refused with `unsupported_channel`. MPDisplayNarrationEventEntry comes from the same dormant CPO group and is deliberately never invoked.
     *
     * @permission ui.vanilla.hud
     * @since 2.31.13+op77.67
     * @failure hud_unavailable_on_this_host, permission_denied:ui.vanilla.hud
     * @open77Return false | unsupported_channel
     */
    subtitle(this: void, text: string, durationMs?: number): LuaMultiReturn<[boolean, string | undefined]>;
}
interface Open77InputApi {
    /**
     * Reads one analogue control: a stick, a trigger, the cursor or a cumulative counter.
     *
     * Requires `input.actions`. Sticks (`padLeftStickX/Y`, `padRightStickX/Y`, also spelled `leftStickX` and so on) return -1..1 with XInput's own dead zone removed and the remainder rescaled, so a stick at rest reads exactly 0 and a stick at the rim exactly 1; stick Y is positive UP. Triggers (`padLeftTrigger`, `padRightTrigger`) return 0..1. `mouseX` and `mouseY` are the cursor, identical to `Open77.input.cursor()`. `mouseWheel`, `mouseWheelX`, `mouseDeltaX` and `mouseDeltaY` are CUMULATIVE counters since the client started -- difference two samples to get what happened between them. They are deliberately not consumed on read: a consume-on-read wheel would give each of two resources part of the same scroll. A missing pad answers `nil, "gamepad_not_connected"` rather than a silent zero, because a zero cannot be told from a stick held at centre. A button name answers `nil, "control_is_a_button"`. Gamepad reads are zero while the game window is not in the foreground.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure input_unavailable_on_this_host, permission_denied:input.actions, unsupported_action_key
     * @open77Return number, or nil, reason
     */
    axis(this: void, axis: string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The actions that can really be blocked on this build, with mechanism and confidence.
     *
     * Requires `input.actions`. Returns an array of `{ action, mechanism, confidence, note }`. `mechanism` is one of `stream`, `action`, `restriction`, `condition`, `flow`, `native`. `confidence` is `proven`, `measured` or `inferred` -- reported rather than hidden, so a lever reasoned from the engine's shape is distinguishable from one observed working in a live session. Read this instead of hard-coding action names.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure action_blocking_unavailable_on_this_host, permission_denied:input.actions
     * @open77Return array of { action, mechanism, confidence, note }, otherwise nil | reason: permission_denied:input.actions, action_blocking_unavailable_on_this_host
     */
    blockableActions(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Takes the player's whole gameplay control stream, sparing named exceptions.
     *
     * Requires `input.blockAll`, a separate permission from `input.actions` because it is a different blast radius. Consumes the entire gameplay action stream on the player puppet and asserts every blockable lever, minus `except`. Call with `{ except = { "Movement" } }` or nothing to acquire, `false` to release this resource's claim. Chat and voice keep working -- they run on focused browser input, not on the gameplay action stream -- so a blocked player can still say so. Vanilla menus are NOT closed or prevented: menu shortcuts arrive on a different controller alongside the pause menu, which must stay reachable, so block `Map` and `Hub` explicitly. `except` names vocabulary actions, never raw engine actions, and is validated in full before anything is taken.
     *
     * @permission input.blockAll
     * @since 2.31.13+op77.67
     * @open77Return true, otherwise false | reason: permission_denied:input.blockAll, invalid_action_arguments, unknown_action, action_not_blockable, action_already_enforced, action_blocking_unavailable_on_this_host
     */
    blockAll(this: void, spec: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Who currently holds which input blocks.
     *
     * Requires `input.actions`. Returns `{ actions = { { action, owners } }, blockAll = { { owner, except } } }`. This is how an admin or debug resource proves a claim really came back: the failure this API most has to avoid is a player left unable to act by a resource that stopped without tidying up.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure action_blocking_unavailable_on_this_host, permission_denied:input.actions
     * @open77Return { actions, blockAll }, otherwise nil | reason: permission_denied:input.actions, action_blocking_unavailable_on_this_host
     */
    blocks(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read the OS cursor relative to the foreground game window.
     *
     * Requires input.actions. Returns normalized x/y, pixelX/pixelY, client-area width/height, inBounds and captured. captured is true when any WebUI owns keyboard or cursor input. The coordinates may fall outside [0,1]; check inBounds. Returns nil, game_not_focused on focus loss, or a cursor/viewport availability reason. Does not show, capture or unlock the mouse: use an owned WebUI page with setFocus. WebUI uses its own virtual pointer; for exact WebUI clicks pass event.clientX/innerWidth and event.clientY/innerHeight to screenRaycast instead. See screen-picking.md.
     *
     * @permission input.actions
     * @since 2.31.13+op77.63
     * @open77Return cursor table, or nil, reason
     */
    cursor(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists the mouse and gamepad controls, and whether this machine can answer for each.
     *
     * Requires `input.actions`. Each row is `{ name, device, kind, available, reason }`: `device` is `mouse` or `gamepad`, `kind` is `button` or `axis`, and `name` is the canonical spelling to pass to `isDown` or `axis` (aliases resolve but are not listed twice). A control this machine cannot answer for is present and marked `available = false` with a reason -- an unplugged pad is `gamepad_not_connected` -- rather than omitted, so a resource discovers the gap instead of finding out from an axis that silently reads zero. Keyboard keys are not listed: their vocabulary belongs to `isDown` and `registerKeyMapping`. Same honesty contract as `Open77.input.blockableActions()`.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure input_unavailable_on_this_host, permission_denied:input.actions
     * @open77Return array of control tables, or nil, reason
     */
    devices(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads whether one curated action is blocked right now, for anyone.
     *
     * Requires `input.actions`. Effective state, combining every resource's claims and any standing `blockAll` -- not the caller's own claim, so a resource that released its block still reads true while another resource holds one. Actions Open77 enforces unconditionally read as blocked; `Scanner` and `Quickhack` follow the multiplayer policy, `PhotoMode` is always blocked.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure action_blocking_unavailable_on_this_host, permission_denied:input.actions, unknown_action
     * @open77Return boolean, otherwise nil | reason: permission_denied:input.actions, unknown_action, action_not_blockable, action_blocking_unavailable_on_this_host
     */
    isActionBlocked(this: void, action: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether another WebUI currently owns keyboard input.
     *
     * Contextual actions should become inert while this is true so chat and menu typing cannot activate gameplay.
     *
     * @permission input.actions
     * @since 2.31.0+op77.3
     * @failure permission_denied:input.actions
     * @open77Return boolean | reason when permission is refused
     */
    isCaptured(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a key, mouse button or gamepad button is currently held.
     *
     * Requires `input.actions`. Keys: A-Z, 0-9, F1-F12, SPACE, ENTER/RETURN, TAB, SHIFT, CTRL/CONTROL, ALT, CAPSLOCK, BACKSPACE, INSERT, DELETE, HOME, END, PAGEUP/PAGEDOWN and arrows. Mouse: mouse1/mouseLeft, mouse2/mouseRight, mouse3/mouseMiddle, mouse4, mouse5. Gamepad: padA/B/X/Y, padUp/Down/Left/Right, padStart, padBack, padLeftShoulder (padLB), padRightShoulder (padRB), padLeftThumb, padRightThumb. Names are case-insensitive; `Open77.input.devices()` lists what this machine can actually answer for. These are PHYSICAL device reads -- they do not know the player's bindings and do not know whether the game is currently consuming the control, which makes them the `GetDisabledControlNormal` flavour rather than the enabled one. An unplugged pad answers `false, "gamepad_not_connected"`; an axis name answers `false, "control_is_an_axis"`. Prefer a press edge or a hold timer over firing every frame.
     *
     * @permission input.actions
     * @since 2.31.0+op77.3
     * @failure input_unavailable_on_this_host, permission_denied:input.actions, unsupported_action_key
     * @open77Return boolean | reason when the control, the device or the permission is refused
     */
    isDown(this: void, control: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The effective key of one of this resource's own mappings.
     *
     * Requires `input.actions`. Returns the effective key (the player's rebind if any, otherwise the registered default) for a mapping id owned by the calling resource, or nil when no such mapping exists.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @failure permission_denied:input.actions
     * @open77Return key string, or nil when the id is not registered by this resource
     */
    keyFor(this: void, id: string): unknown | undefined;
    /**
     * Every registered key mapping across all running resources.
     *
     * Requires `input.actions`. Returns an array of `{ resource, id, name, key, defaultKey, hold, rebound }` records for the rebinding UI. Only serialisable metadata is exposed; the callbacks stay in their owning resource.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @failure permission_denied:input.actions
     * @open77Return array of mapping records
     */
    mappings(this: void): unknown;
    /**
     * Where the pointer is, as 0..1 across the rendered image -- the overlay's own pointer when a WebUI holds the cursor.
     *
     * Requires `input.actions`. Returns `x, y, source`. Unlike `Open77.input.cursor`, which samples the OS cursor against the game window and answers with a table, this reads the WebUI's VIRTUAL pointer whenever a surface owns the cursor (`source = "overlay"`) -- Cyberpunk keeps recentring the Win32 cursor while it owns the camera, so the OS position says nothing about where the drawn pointer is -- and falls back to the OS cursor otherwise (`source = "system"`). The origin is the TOP LEFT and the units are fractions of the image -- the same frame `Open77.camera.project` answers in and `Open77.camera.unproject` consumes, so hit-testing a projected world point is a subtraction rather than a conversion. It is a ratio and not pixels on purpose: a client-rect read and the engine's back-buffer size disagree on a display with DPI scaling, so every pixel answer would need a qualifier the caller cannot see. `source` is `overlay` when a WebUI surface owns the pointer -- Open77's own virtual cursor, the one CEF and the drawn pointer share -- or `system` when the OS cursor is the only answer. During ordinary gameplay Cyberpunk recentres the OS cursor every frame, so `system` reads near 0.5, 0.5; that is where the cursor is, not a failed read.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @failure input_unavailable_on_this_host, permission_denied:input.actions
     * @open77Return x, y, source, or nil, reason
     */
    pointer(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Sets and persists a new key for any mapping.
     *
     * Requires `input.actions`. Rebinds the mapping identified by `resource` and `id` to `key` (same key vocabulary as `Open77.input.isDown`), persists it machine-globally, and raises `open77:keybinds:changed`. Used by the pause KEY BINDINGS tab.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @open77Return the applied key | reason for the refusal
     */
    rebind(this: void, resource: string, id: string, key: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Declares a named, rebindable action bound to a key (twin of the RegisterKeyMapping global).
     *
     * Requires `input.actions`. Accepts a spec table `{ id, name, key (or defaultKey), hold, onPressed, onReleased }` or the positional form `(id, name, key, onPressed [, onReleased])`. The engine owns the registry and the per-frame dispatch; the callback receives the mapping id and never fires while a page owns the keyboard. `onPressed` fires on the key-down edge; with `hold` (or a positional release callback) `onReleased` fires on key-up. Re-registering an id replaces the entry but keeps the player's saved rebind. Ids are letters/numbers/`_.:-`, up to 64 chars; names up to 96. Up to 64 mappings per resource.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @open77Return effective key (the saved rebind, else the default) | reason for the refusal
     */
    registerKeyMapping(this: void, spec: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Restores a mapping to its registered default key.
     *
     * Requires `input.actions`. Drops any saved override for the mapping identified by `resource` and `id`, restores the default key, persists the change, and raises `open77:keybinds:changed`.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @open77Return the default key | reason for the refusal
     */
    reset(this: void, resource: string, id: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Blocks or releases one curated input action for the calling resource.
     *
     * Requires `input.actions`. The vocabulary is curated rather than an engine enum dump, because Cyberpunk has no single input-blocking lever: five unrelated mechanisms serve five families of action and a large minority of actions cannot be refused at all. Blockable today: `Movement`, `Map`, `Hub`, `FastTravel`, `Attack` (firing only), `Melee` (every melee swing, fists included), `Jump`, `Sprint` (walk mode alone does not cap sprinting) and `WeaponWheel`; `Open77.input.blockableActions()` reports how sure each one is. An action outside the vocabulary is refused with `unknown_action`; one this engine cannot refuse with `action_not_blockable`; one Open77 already blocks unconditionally (`PhotoMode`, `Scanner`, `Quickhack`, `CallVehicle`, `Journal`) with `action_already_enforced`. Nothing is accepted and silently ignored. Claims are owned by the calling resource: two resources may block the same action, `blocked=false` removes only the caller's claim, and everything a resource holds is released when it stops. See `wiki/input-blocking.md` and `docs/research/input-action-blocking.md`.
     *
     * @permission input.actions
     * @since 2.31.13+op77.67
     * @open77Return true, otherwise false | reason: permission_denied:input.actions, invalid_action_arguments, unknown_action, action_not_blockable, action_already_enforced, action_blocking_unavailable_on_this_host
     */
    setActionBlocked(this: void, action: string, blocked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Blocks or restores one vanilla input action by its engine name.
     *
     * Requires input.actions. Accepts exactly (actionName, blockedBoolean); supports OpenMapMenu and WeaponWheel. Applies or removes the calling resource's claim, returning boolean/reason. A block remains while any resource claims it; stop/reload/disconnect automatically releases that owner's claims. WeaponWheel prevents native radial entry and cancels an already-open weapon wheel without selecting an item. It does not remap ALT, block other radial menus or disable SwitchItem. Acquire before the activation key is pressed. Other action names return unsupported_native_action. This is not a general-purpose arbitrary native input blocker.
     *
     * @permission input.actions
     * @since 2.31.13+op77.45
     * @open77Return true, otherwise false | reason: permission_denied:input.actions, invalid_native_action_arguments, unsupported_native_action, native_action_unavailable
     */
    setNativeActionBlocked(this: void, action: string, blocked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a key mapping this resource declared.
     *
     * Requires `input.actions`. Frees the mapping's callbacks and raises `open77:keybinds:changed`. Only affects mappings owned by the calling resource.
     *
     * @permission input.actions
     * @since 2.31.7+op77.16
     * @open77Return boolean: true when a mapping was removed
     */
    unregisterKeyMapping(this: void, id: string): boolean;
}
interface Open77InspectorApi {
    /**
     * Turns the permanent aim ray on or off.
     *
     * Turning it off also clears the outline: the outline belongs to the session that asked for it and must not outlive it.
     *
     * @since 2.31.0+op77.3
     * @failure game_unavailable_on_this_host
     * @open77Return true | reason, when the first is nil
     */
    enable(this: void, enabled?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Outlines the aimed object, independently of the ray.
     *
     * Lets a caller read the target without painting the world. The outline uses `entRenderHighlightEvent`, the same event focus mode and scanning already use.
     *
     * @since 2.31.0+op77.3
     * @failure game_unavailable_on_this_host
     * @open77Return true | reason, when the first is nil
     */
    outline(this: void, enabled?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * What the aim ray is currently pointing at.
     *
     * Reads a snapshot, never a probe. The ray has to be cast on the game thread, and the plugin refreshes it at 10 Hz, so calling this costs nothing and cannot land a raycast on the wrong thread.
     *
     * Always returns a table when a game is present. `valid` separates "nothing in view" from "no game" — the latter returns `nil, reason`.
     *
     * @since 2.31.0+op77.3
     * @failure game_unavailable_on_this_host
     * @open77Return table { valid, engineId, class, name, kind, position, distance } | reason, when the first is nil
     */
    target(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77JsonApi {
    /**
     * Parses a JSON string.
     *
     * Parses JSON into Open77's bounded Lua value model. Invalid JSON returns `nil, "invalid_json"`; decoded objects and arrays contain only supported scalar/table values.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_json
     * @open77Return value, or nil | reason
     */
    decode(this: void, text: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Serialises a Lua value to JSON.
     *
     * Serializes a supported Lua value to JSON using the same bounded representation used by events, exports and WebUI. Functions, userdata, cycles and unsupported table shapes return `nil, reason`.
     *
     * @since 2.31.0+op77.3
     * @failure value_not_json_serializable
     * @open77Return string, or nil | reason
     */
    encode(this: void, value: unknown): LuaMultiReturn<[string | undefined, string | undefined]>;
}
interface Open77KvpApi {
    /**
     * Clears this resource's keys matching a prefix.
     *
     * Atomically removes every key matching an optional prefix from the calling resource's current-server store and returns the removal count. An empty prefix clears only that resource namespace.
     *
     * @since 2.31.0+op77.3
     * @open77Return removed count, or nil | reason
     */
    clear(this: void, prefix?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Atomically changes a key when its typed value matches.
     *
     * Atomically replaces a key only when its typed value exactly matches the expected value. Nil expected means the key must be absent; nil replacement deletes after a successful comparison.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason on storage failure
     */
    compareAndSet(this: void, key: string, expected: unknown, replacement: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Deletes one persistent key.
     *
     * Atomically deletes one key from the current resource store and returns whether it existed. Deleting a missing key succeeds with false.
     *
     * @since 2.31.0+op77.3
     * @open77Return true when removed, false when absent | reason on storage failure
     */
    delete(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Finds typed entries by sorted key prefix.
     *
     * Performs a sorted prefix search in the current resource store and returns bounded `{key, value, type}` records. The default result limit is 256 and the hard limit is 4096.
     *
     * @since 2.31.0+op77.3
     * @open77Return array of { key, value, type }, or nil | reason
     */
    find(this: void, prefix?: string, limit?: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads one typed persistent value.
     *
     * Reads a typed value from the current connection-address and resource namespace. Missing keys return the optional default (or nil) and are distinct from storage errors, which return `nil, reason`.
     *
     * @since 2.31.0+op77.3
     * @open77Return stored value, default or nil | reason on storage failure
     */
    get(this: void, key: string, arg2?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Checks whether a persistent key exists.
     *
     * Checks whether a key exists in the calling resource's current-server store without exposing its value or any other resource namespace.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason on storage failure
     */
    has(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Atomically increments a numeric key.
     *
     * Atomically creates or increments a numeric key. Integer arithmetic remains 64-bit and rejects overflow; mixed/floating arithmetic rejects non-finite results.
     *
     * @since 2.31.0+op77.3
     * @open77Return new numeric value, or nil | reason
     */
    increment(this: void, key: string, delta?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists sorted keys matching a prefix.
     *
     * Returns only the sorted keys matching an optional prefix in the current resource store. It is a bounded index query and cannot enumerate another package or connection address.
     *
     * @since 2.31.0+op77.3
     * @open77Return string array, or nil | reason
     */
    keys(this: void, prefix?: string, limit?: number): LuaMultiReturn<[string | undefined, string | undefined]>;
    /**
     * Persists one typed value for this server address and resource.
     *
     * Atomically persists a string, signed integer, finite number or boolean under the current connection address and resource. Keys/values and the 1 MiB resource quota are validated before the old file is replaced.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    set(this: void, key: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stores a value only when its key is missing.
     *
     * Redis-style SETNX for the current resource namespace: atomically stores the typed value only when the key is missing and reports whether insertion occurred.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason on storage failure
     */
    setIfAbsent(this: void, key: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns this resource store's usage and quotas.
     *
     * Returns this resource's entry/byte usage and enforced quotas together with the active address/resource scope. It exposes no keys or usage belonging to other resources.
     *
     * @since 2.31.0+op77.3
     * @open77Return table, or nil | reason
     */
    stats(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77LocomotionApi {
    /**
     * Register a custom locomotion package.
     *
     * Requires locomotion.register. Reads a version 1 package metadata file relative to this resource. The shared registration script runs on both runtimes. The client validates the graph and mounted native assets; registration does not assign a style. Stable 147 supports 1,024 registered packages across resources/reload generations; existing standalone packages stay compatible. See [Custom locomotion](custom-locomotion.md#registration).
     *
     * @permission locomotion.register
     * @since 2.31.21+op77.145
     * @open77Return style ID string, or nil | reason on failure
     */
    register(this: void, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77LogApi {
    /**
     * Writes a debug line to this resource's client log.
     *
     * No permission. The line is written with the calling resource's name, so `red4ext/logs/open77-*.log` always says which resource spoke. Unlike its server namesake, the client honours the level. It takes one value, converted to text.
     *
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    debug(this: void, message: unknown): void;
    /**
     * Writes an error line to this resource's client log.
     *
     * No permission. Same resource-prefixed client log as `Open77.log.debug`, at the error level. It only logs: it does not raise, abort the handler or stop the resource.
     *
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    error(this: void, message: unknown): void;
    /**
     * Writes an informational line to this resource's client log.
     *
     * No permission. Same resource-prefixed client log as `Open77.log.debug`, at the informational level.
     *
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    info(this: void, message: unknown): void;
    /**
     * Writes a warning line to this resource's client log.
     *
     * No permission. Same resource-prefixed client log as `Open77.log.debug`, at the warning level.
     *
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    warn(this: void, message: unknown): void;
}
interface Open77LootApi {
    /**
     * Applique localement un pickup déjà accepté par le serveur.
     *
     * API interne appelée uniquement après `open77:loot:pickupResult`. Elle projette l'objet dans l'inventaire REDengine local; l'inventaire persistant reste une responsabilité serveur.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès | raison du refus
     */
    acceptPickup(this: void, id: number, item: string, quantity: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Supprime toutes les projections locales et leurs prompts.
     *
     * Clears the client-side native loot projection when the caller has `world.loot`. This is intended for the authoritative loot replication package during snapshot replacement; ordinary gameplay resources should request server-owned changes instead.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    clear(this: void): void;
    /**
     * Retire une projection locale de loot.
     *
     * Removes one replicated native loot entity from this client's projection and requires `world.loot`. It does not by itself delete the server record, so gameplay code should normally use the authoritative loot package API.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès | raison du refus
     */
    remove(this: void, id: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Demande au serveur de ramasser un drop.
     *
     * Le serveur contrôle l'existence, le routing bucket et la distance calculée depuis son dernier snapshot du joueur.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return true si la requête réseau est partie | raison du refus local
     */
    requestPickup(this: void, id: number): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Active ou désactive la projection de loot autoritaire.
     *
     * Réservé à `open77_loot`. Quand il est actif, les choix, conteneurs et drops vanilla sont neutralisés et les objets physiques deviennent de simples représentations du registre serveur.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès | raison du refus
     */
    setAuthorityEnabled(this: void, enabled: boolean): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Crée ou met à jour la projection locale d'un drop serveur.
     *
     * API interne de réplication. Demande la permission `world.loot`; un script gameplay ne doit pas inventer un drop côté client.
     *
     * @permission world.loot
     * @since 2.31.0+op77.3
     * @open77Return true en cas de succès | raison du refus
     */
    upsert(this: void, drop: Open77Table): LuaMultiReturn<[boolean, string | undefined]>;
}
interface Open77MapApi {
    /**
     * Cancels this resource's outstanding native map request.
     *
     * Requires map.control. Returns true or false, reason. The requester receives open77:map:pointPicked with status='cancelled' when a picker was active. Resource shutdown also releases its UI ownership without delivering events to its replacement instance.
     *
     * @permission map.control
     * @since 2.31.13+op77.57
     * @open77Return boolean, or false, reason
     */
    cancelPick(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Closes a map session opened by this resource.
     *
     * Requires map.control. Returns true on accepted closure, otherwise false, reason. Cannot close a user-opened map or another resource's map. Closure is asynchronous. A pending picker is cancelled.
     *
     * @permission map.control
     * @since 2.31.13+op77.57
     * @open77Return boolean, or false, reason
     */
    close(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the marker highlighted in the vanilla map.
     *
     * Requires map.read. Returns a marker table or nil. kind distinguishes waypoint, quest, poi, resource and unknown. Selection is not the same as the player's waypoint; highlighting a marker does not change navigation.
     *
     * @permission map.read
     * @since 2.31.13+op77.57
     * @open77Return value, or nil, reason
     */
    getSelectedMarker(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads the player's manual vanilla waypoint.
     *
     * Returns nil (without an error) when no player waypoint is tracked. Quest, POI and Open77 resource markers are excluded. Requires map.read. The result has a string id, kind='waypoint', source='player', position={x,y,z} and revision. Errors return nil, reason; map_unavailable means the world snapshot is unavailable or stale.
     *
     * @permission map.read
     * @since 2.31.13+op77.57
     * @open77Return value, or nil, reason
     */
    getWaypoint(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Checks whether the vanilla world map is open.
     *
     * Requires map.read. Returns a boolean, or nil, reason when map state is unavailable. Uses native map controller lifecycle callbacks.
     *
     * @permission map.read
     * @since 2.31.13+op77.57
     * @open77Return value, or nil, reason
     */
    isOpen(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Opens the standalone native map, optionally focused on a world location.
     *
     * Requires map.control. options.position={x,y,z} optionally focuses the map. Returns requestId, or nil, reason. Acceptance is asynchronous; observe open77:map:opened or open77:map:requestFailed. Respects game UI restrictions and exclusive ownership; map_busy means another map session exists.
     *
     * @permission map.control
     * @since 2.31.13+op77.57
     * @open77Return requestId, or nil, reason
     */
    open(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lets the player select a native map point without travel.
     *
     * Requires map.control. Optional position={x,y,z} and timeoutMilliseconds (1000..300000, default 60000). Returns requestId or nil, reason. open77:map:pointPicked is delivered only to the requesting resource, with requestId, status, position and marker. Use the vanilla waypoint gesture to select. Fast travel, taxi confirmation and Open77 admin map teleport are suppressed during the picker.
     *
     * @permission map.control
     * @since 2.31.13+op77.57
     * @open77Return requestId, or nil, reason
     */
    pickPoint(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads a coherent native map snapshot.
     *
     * Requires map.read. Returns open, picking, waypoint, selectedMarker, revision and sampleAgeMs, or nil, reason. Read this on resource startup before subscribing to change events; no historical placement event is synthesized.
     *
     * @permission map.read
     * @since 2.31.13+op77.57
     * @open77Return value, or nil, reason
     */
    state(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77MarkersApi {
    /**
     * Removes every 3D marker owned by the calling resource.
     *
     * Requires `world.markers`; other resources are unaffected.
     *
     * @permission world.markers
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Creates a resource-owned 3D world marker.
     *
     * Requires `world.markers`. Options require `position` and accept `shape`, `style`, `radius`, `height`, `scale = {x,y,z}`, `rotation = {x,y,z}` in degrees, `color = {r,g,b,a}`, `maxDistance`, `minDistance`, and `visible`. Color channels are integers from 0 to 255; omitted alpha defaults to 180. Eight native mesh shapes are listed by `shapes()`. The returned decimal-string handle preserves its full 64-bit identity. Creation is asynchronous: inspect `get(id).failed` and `error` for loading failures. Markers are local, resource-owned and cleaned up when their resource stops; they do not provide collision or gameplay authority.
     *
     * @permission world.markers
     * @since 2.31.0+op77.3
     * @failure markers_backend_unavailable, permission_denied:world.markers
     * @open77Return marker handle string, or nil | reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the calling resource's 3D markers.
     *
     * Requires `world.markers`. Each snapshot includes its requested definition, effective color, and native loading state. `rendered` means attached and enabled, not necessarily on-screen or unoccluded. `failed` and optional `error` expose asynchronous asset or streaming failures.
     *
     * @permission world.markers
     * @since 2.31.0+op77.3
     * @failure markers_backend_unavailable, permission_denied:world.markers
     * @open77Return array of { id, shape, style, radius, height, scale, rotation, color, customColor, maxDistance, minDistance, visible, rendered, failed, error?, position }, or nil | reason
     */
    list(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes one resource-owned 3D marker.
     *
     * Requires `world.markers`.
     *
     * @permission world.markers
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Patches a resource-owned 3D marker.
     *
     * Requires `world.markers`. Only supplied fields are changed, and ownership prevents mutation of another resource's marker. Accepts the create options, including height, scale, rotation and RGBA color. `color = false` restores the named style palette; alpha zero hides the marker. Invalid patches are rejected atomically. Color and shape changes replace the native entity asynchronously while preserving the handle; avoid per-frame color updates.
     *
     * @permission world.markers
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77MotionApi {
    /**
     * Queue an owned native reaction on an exact local body.
     *
     * Requires player.motion.project. entity is a local registry handle (1 for the owner), not a network player ID. Direction is normalized; distance is0..6 m and the local owner must be alive, ready, on foot and grounded. Returns an owned request ID. Owner phase starts pending, then active after two valid consecutive native-down observations within1.5s. Remote projection starts its native action immediately. No damage, teleport or server authority is granted.
     *
     * @permission player.motion.project
     * @since 2.31.13+op77.63
     * @failure invalid_motion, motion_backend_unavailable, permission_denied:player.motion.project, resource_not_running
     * @open77Return request ID | nil, reason on rejection
     */
    knockdown(this: void, entity: number, x: number, y: number, distance: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read the phase of this resource's native reaction.
     *
     * Requires player.motion.project. Phases include pending, active and recovering; an expired/unknown/foreign ID returns nil, reason. active is a native PSM observation for the owner, not proof of physical displacement or the observer rendering. The support resource waits for active before acknowledging server motion.
     *
     * @permission player.motion.project
     * @since 2.31.13+op77.63
     * @failure invalid_request, motion_backend_unavailable, permission_denied:player.motion.project
     * @open77Return phase string | nil, reason on rejection
     */
    state(this: void, request: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Request cleanup of this resource's native reaction.
     *
     * Requires player.motion.project. Pending cancellation is latched so cleanup retries cannot later activate it. Cancellation removes the owned status/action but may leave native momentum and get-up in progress. It does not instantly freeze velocity, revive a player, or cancel another resource's request.
     *
     * @permission player.motion.project
     * @since 2.31.13+op77.63
     * @failure invalid_request, motion_backend_unavailable, permission_denied:player.motion.project
     * @open77Return true | nil, reason on rejection
     */
    stop(this: void, request: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77MovementApi {
    /**
     * Reads the walk-mode lease this resource holds on the local player.
     *
     * Requires `players.controls`. `enabled` is the mode the engine currently applies for this resource, `requested` what the resource last asked for through `setWalkMode`; the two differ while another resource's lease wins or the puppet is not yet attached. `speed` and `requestedSpeed` follow the same split, in metres per second.
     *
     * @permission players.controls
     * @since 2.31.13+op77.75
     * @failure game_unavailable_on_this_host, permission_denied:players.controls, unexpected_arguments
     * @open77Return table with `enabled`, `requested`, `speed`, `requestedSpeed` | nil, reason (`permission_denied:players.controls`, `unexpected_arguments`, `game_unavailable_on_this_host`)
     */
    getWalkMode(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Applies a bounded local movement lock -- freeze, cripple or heavy cripple -- to the local player.
     *
     * Client-only; requires `player.movement.lock`, a server-driven projection primitive a player resource should not hold by default. `kind` is `freeze` (no movement), `cripple` (slow) or `cripple_heavy`; `durationMs` is 1..3600000 and the adapter clamps it to its own cap. One slot, owned by the calling resource; a later call replaces this resource's own lock and never another's. The adapter releases on the deadline, on death, vehicle entry, workspot, session change and resource stop -- `lockState` exposes the watchdog that removes a lock whose owner never released it. Returns the request id; the server's deadline stays the authority. For a server-authoritative freeze use `Open77.players.setFrozen` on the server instead.
     *
     * @permission player.movement.lock
     * @since 2.31.13+op77.67
     * @failure invalid_duration, invalid_kind, movement_backend_unavailable, permission_denied:player.movement.lock, resource_not_running
     * @open77Return request id, or nil | reason: permission_denied:player.movement.lock, resource_not_running, movement_backend_unavailable, invalid_kind, invalid_duration
     */
    lock(this: void, kind: string, durationMs: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads the current client movement-lock slot and its lifecycle counters.
     *
     * Client-only; requires player.movement.lock. Returns phase, kind, owner, reason, request, grantedMs, remainingMs, elapsedMs, locks, refusals, releases, watchdogRemovals, releaseOverdue and locked. phase is the adapter's own state, not proof of a rendered input restriction, and the server's deadline remains the authority. releaseOverdue and watchdogRemovals expose the bounded watchdog that removes a lock whose owner never released it.
     *
     * @permission player.movement.lock
     * @since 2.31.13+op77.67
     * @failure movement_backend_unavailable, permission_denied:player.movement.lock
     * @open77Return state table, or nil, reason
     */
    lockState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Asks the local player to walk at a bounded speed, as a lease this resource owns.
     *
     * Requires `players.controls`. Every resource holds its own request and the slowest live request wins; `false` releases only this resource's request and never touches another's. `speed` is metres per second between 0.5 and 2.5, default 1.5. Read the applied state back with `getWalkMode`. Walk mode slows walking and jogging but lets the player sprint out of it: to hold a player to the pace, also block `Sprint` with `Open77.input.setActionBlocked` (that call needs the `input.actions` permission), which also stops this lease from lifting on sprint intent.
     *
     * @permission players.controls
     * @since 2.31.13+op77.75
     * @open77Return true on success, otherwise false | reason (`permission_denied:players.controls`, `resource_not_running`, `expected_boolean`, `invalid_walk_speed`, `game_unavailable_on_this_host`)
     */
    setWalkMode(this: void, enabled: boolean, speed?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Releases this resource's owned client movement lock.
     *
     * Client-only; requires player.movement.lock. Releases only a lock the calling resource owns and is harmless when it owns none. It cannot lift another resource's lock. true acknowledges the release request; the native adapter also releases on its own deadline and on death, vehicle entry, workspot, session change and resource stop. Releasing does not undo damage, cancel an authoritative hack or refund a status; use the server hacking APIs for gameplay state.
     *
     * @permission player.movement.lock
     * @since 2.31.13+op77.67
     * @failure movement_backend_unavailable, permission_denied:player.movement.lock
     * @open77Return true, or nil, reason
     */
    unlock(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77NameplatesApi {
    /**
     * Removes every nameplate override owned by the calling resource.
     *
     * Requires `ui.nameplates`; other owners are unaffected.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.3
     * @open77Return true on success
     */
    clear(this: void): boolean;
    /**
     * Removes the calling resource's nameplate override for one player.
     *
     * Requires `ui.nameplates`.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    remove(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Draws remote-player nameplates natively, with no WebUI surface at all.
     *
     * Requires `ui.nameplates`. `stream` had already taken Lua off the per-frame path, and plates still trailed the world: what was left is the CEF chain itself -- IPC, a page repaint on the page's own timer, an offscreen raster, a shared-texture handoff, then the composite -- and every stage buffers. `render(true)` draws the plate in the frame that presents it, from a projection taken on that same frame, so there is nothing left to buffer and no page to create.
     *
     * Guard the call rather than invoking it bare: a client older than the native drawer has no `render` at all, and indexing nil takes the whole resource down instead of falling back. `Open77.nameplates.render ~= nil and Open77.nameplates.render(true)` is the shipped form, with `stream(page)` and then a `Wait(33)` poll loop as the two fallbacks.
     *
     * `render(false)` stops it. The drawer is released on stop, reload and world exit anyway, but asking explicitly is what keeps a reload from leaving one frame painted. `Open77.nameplates.set` gains `showDistance` on this path; `label`, `color` and `maxDistance` apply to every path.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.7
     * @open77Return true when the plugin is drawing them, otherwise false | reason
     */
    render(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Creates or updates the calling resource's nameplate override for a remote player.
     *
     * Requires `ui.nameplates`. Options accept `label`, `color`, `maxDistance`, and `visible`. Overrides are owner-scoped and cleaned up with the resource.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    set(this: void, playerId: number | string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Shows or clears the native speaker icon on one remote player's nameplate.
     *
     * Requires `ui.nameplates`. Talking assertions are owner-scoped and automatically released on stop; several voice/HUD resources may assert the same player without racing. The integrated voice package drives this from authenticated native talker state.
     *
     * @permission ui.nameplates
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setTalking(this: void, playerId: number, talking: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns the currently rendered remote-player nameplates.
     *
     * Requires `ui.nameplates`. Screen coordinates and distance describe the most recent presentation snapshot.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.3
     * @failure nameplates_backend_unavailable, permission_denied:ui.nameplates
     * @open77Return array of { id, label, color, x, y, distance }, or nil | reason
     */
    snapshot(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stops the calling resource's native nameplate stream.
     *
     * Requires `ui.nameplates`. Stopping a stream that does not exist succeeds, so teardown is idempotent. The stream is also dropped automatically on stop, reload, world exit, and when its page is destroyed.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.7
     * @open77Return true on success, otherwise false | reason
     */
    stopStream(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Streams the native nameplate projection to a page, once per game frame.
     *
     * Requires `ui.nameplates` and a WebUI page this resource owns. The projection was always native and always correct; relaying it from a Lua timer is what made plates lag and freeze. This publishes the same `nameplates:update` event with the same `{ players = { { id, label, color, x, y, distance } } }` payload, so an existing page needs no change and the resource can delete its `Wait(33)` loop. An identical frame is not re-sent.
     *
     * @permission ui.nameplates
     * @since 2.31.0+op77.7
     * @open77Return true on success, otherwise false | reason
     */
    stream(this: void, page: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77NetApi {
    /**
     * Asks the server a question and returns a promise for the answer.
     *
     * Requires network.events. The name alone targets the handler this same resource registered on the server; the table form { resource = "other", name = "x", timeout = ms } targets another resource or sets a deadline (default 10000 ms, range 100..120000). Resolves with the handler's return values, or rejects with a reason such as callback_not_found, callback_timeout or callback_target_stopped. Up to 29 arguments and 48 KiB per frame; 256 questions open per resource. Open77.net.callAwait(...) is the same call followed by :await(), for use inside a CreateThread. Aliased as Open77.callbacks.call. See the Network callbacks guide.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @open77Return Open77.Promise, or nil, reason
     */
    call(this: void, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks the server a question and waits for the answer.
     *
     * Requires network.events. Open77.net.call followed by :await() on the promise it returns, so it must run inside a CreateThread or another managed task; outside one the await answers nil, await_requires_scheduler_coroutine instead of blocking the frame. Same targeting, timeouts, limits and failure reasons as Open77.net.call. Defined by the client's callback prelude rather than by a native. Aliased as Open77.callbacks.callAwait. See the Network callbacks guide.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @open77Return the handler's return values, or nil, reason
     */
    callAwait(this: void, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Sends an event to the server.
     *
     * Alias of `TriggerServerEvent`: sends a bounded, serializable event payload to the authenticated server session. The current resource must declare `network.events`.
     *
     * @permission network.events
     * @since 2.31.0+op77.3
     * @failure invalid_network_event, network_payload_not_serializable, network_payload_too_large, network_unavailable, permission_denied:network.events, reserved_callback_event, reserved_event, resource_preparing
     * @open77Return boolean
     */
    emitServer(this: void, event: string, ...args: unknown[]): boolean;
    /**
     * Listens for an event coming from the server.
     *
     * Registers an authenticated incoming server event and its callback for the current resource generation. It is the namespaced equivalent of `RegisterNetEvent` and requires `network.events`.
     *
     * @permission network.events
     * @since 2.31.0+op77.3
     * @failure permission_denied:network.events
     * @open77Return handler id
     */
    on(this: void, event: string, handler: Open77Callback): number;
    /**
     * Answers a callback the server sends with Open77.net.callClient.
     *
     * Requires network.events. The handler receives the call's arguments (the caller is always the server, so there is no source) and its return values become the answer; raising rejects the caller's promise with the error text. Callback names are per resource: the server reaches this handler by naming this resource. Up to 256 names and 256 in-flight calls per resource; stopping the resource answers what it was still serving with callback_target_stopped. Aliased as Open77.callbacks.register. See the Network callbacks guide.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_registration_limit, invalid_callback_name, permission_denied:network.events
     * @open77Return true, or nil, reason
     */
    register(this: void, name: string, handler: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops answering a callback name registered with Open77.net.register.
     *
     * Requires network.events. A later request for that name is refused with callback_not_found on the next frame rather than waiting for a timeout. Aliased as Open77.callbacks.unregister.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_not_found, invalid_callback_name
     * @open77Return true, or false, reason
     */
    unregister(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77NetworkApi {
    /**
     * The catalog as of the last refresh.
     *
     * Reads a snapshot: refreshing is asynchronous, so call `refresh`, then `catalog` a beat later.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @failure network_backend_unavailable, permission_denied:network.client
     * @open77Return table { phase, generation, servers… }
     */
    catalog(this: void): Open77Table;
    /**
     * Joins an Open77 server.
     *
     * Starts a connection to the supplied Open77 server endpoint using the current identity and resource pipeline. It requires `network.client`; success means the request was accepted, while connection progress and errors are observed through `status()`.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @open77Return true when the request is accepted | reason for the refusal
     */
    connect(this: void, endpoint: string, name?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Leaves the current server.
     *
     * Requests an orderly disconnect with an optional diagnostic reason. It returns after queuing teardown; the session phase in `status()` is the authoritative view of when cleanup has completed.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    disconnect(this: void): boolean;
    /**
     * Reads the local Master-backed identity profile state.
     *
     * Returns the durable user id, current display name, registration state, and asynchronous update phase. The private key is never exposed. This bridge exists for the trusted local server browser; server-downloaded resources should use the verified player APIs instead.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @failure network_backend_unavailable, permission_denied:network.client
     * @open77Return table { phase, generation, userId, displayName, error, registered }, or nil | reason
     */
    identity(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Requests a signed username update from the Master.
     *
     * Queues the HTTP enrollment on the networking worker and returns immediately. Poll `identity()` until the matching generation becomes `ready` or `failed`. The backend is deliberately available only to the trusted system server-browser resource and refuses updates during a live session.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @open77Return true when queued, otherwise false | reason
     */
    identityUpdate(this: void, catalogUrl: string, displayName: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Asks the directory for the server catalog again.
     *
     * Starts a master-server catalog refresh for the supplied URL and requires `network.client`. The call only accepts the request; use `catalog()` to inspect generation, phase, HTTP status, body and error.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    refresh(this: void, url?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * State of the network session.
     *
     * Returns the current client session snapshot: phase, endpoint, authenticated player identity, routing bucket, rates, server time, ping and downloaded resource-set metadata. Reading it does not initiate a connection or wait for a phase change.
     *
     * @permission network.client
     * @since 2.31.0+op77.3
     * @failure network_backend_unavailable, permission_denied:network.client
     * @open77Return table { phase, endpoint, playerId, routingBucket, ping, error }
     */
    status(this: void): Open77Table;
}
interface Open77NpcsApi {
    /**
     * Lists the NPCs this client can see, Open77-owned and optionally vanilla.
     *
     * With no argument this is the server-owned set in this client's interest set, unchanged: every row has an `id` the server agrees with, and `source` is `"open77"`. Canonical creation, tasks, health and removal are server-only; see [NPCs](npcs.md).
     *
     * `includeForeign = true` additionally lists the **vanilla population peds** standing around the local player. Those rows are deliberately a different shape -- `source = "population"`, `kind = "populationNpc"`, no `id`, no `health`, no `bucket` -- because nothing replicates them. They are here so a targeting resource can see the whole world, not so anything can be commanded. The extra reach costs a world query and its own permission, `npcs.foreign`, and is refused by name without it.
     *
     * @permission npcs.foreign, npcs.read
     * @since 2.31.0+op77.3
     * @failure invalid_radius, permission_denied:npcs.foreign
     * @open77Return array of NPC snapshots (owned) and population rows, or nil | reason on failure
     */
    all(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Returns the canonical active task ID for an NPC.
     *
     * Returns the last Open77 NPC task snapshot currently presented for a network NPC. It requires `npcs.read`; task state is ephemeral and can disappear when the NPC leaves the streaming set.
     *
     * @permission npcs.read
     * @since 2.31.0+op77.3
     * @open77Return task id, or nil
     */
    currentTask(this: void, id: number): number | undefined;
    /**
     * Returns the ephemeral local Open77 entity handle for an NPC projection.
     *
     * Returns nil before readiness and after stream-out. Never cache this handle across lifecycle changes.
     *
     * @since 2.31.0+op77.3
     * @open77Return entity, or nil
     */
    entity(this: void, id: number): unknown | undefined;
    /**
     * Reads one server-owned NPC currently known by this client.
     *
     * Read-only and guarded by npcs.read. The snapshot includes the exact Character record; template is the legacy alias or 'record' for direct spawns. The local entity handle is generation-checked and becomes invalid after stream-out. Observe onNpcReady/onNpcSpawnFailed for asynchronous projection readiness; see wiki/npcs.md.
     *
     * @permission npcs.read
     * @since 2.31.0+op77.3
     * @open77Return NPC snapshot, or nil
     */
    get(this: void, id: number): unknown | undefined;
    /**
     * Whether an NPC projection is attached and ready locally.
     *
     * Reports whether a network NPC currently has a live client proxy in this player's streaming scope. It does not request streaming or prove that the server NPC record no longer exists.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isStreamedIn(this: void, id: number): boolean;
    /**
     * A promise that resolves once this client's projection of an NPC is attached and behaving.
     *
     * Requires `npcs.read`. The NPC twin of `Open77.vehicles.whenStreamed`: resolves with `{ id, entity }` once `Open77.npcs.isStreamedIn(id)` answers true -- the same instant `onNpcReady` fires, which is the projection attached AND its behaviour applied, not merely the create received -- and rejects with `timeout` after `timeoutMs` (default 15000, clamped to 1..120000). Listens for `onNpcReady` and polls every 100 ms; the one-shot handler is removed on resolve, on timeout and with the resource. `nil, reason` only for a bad id, a bad timeout or a missing permission; an unknown id is waited for and times out.
     *
     * @permission npcs.read
     * @since 2.31.13+op77.73
     * @open77Return Promise, or nil | reason: invalid_npc_id, invalid_timeout, permission_denied:npcs.read, promise_unavailable
     */
    whenReady(this: void, id: unknown, timeoutMs?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77PerspectiveApi {
    /**
     * Applies a third-person policy received from the server.
     *
     * `disabled`, `allowed`, `default` or `forced`, with the pinned perspective for `forced` (a pin with nothing pinned is refused rather than quietly becoming first person). Requires the `perspective.policy` permission -- not because it exposes anything, since all of this is client-local presentation, but because it is the one call that can take the choice away from the player. It deliberately cannot express the bridge's fifth value, `lab`, which disengages the arbiter entirely: a server able to reach that could leave a client with nothing governing the camera. The bundled `open77_perspective` resource is the intended caller, on receipt of `open77:perspective:policy`.
     *
     * @permission perspective.policy
     * @since 2.31.4+op77.11
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    applyPolicy(this: void, policy: string, perspective?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Releases this resource's temporary FPP/TPP lock without changing player preference.
     *
     * Client-only; no permission required and no arguments accepted. Idempotent: releases only the calling resource instance's override, never another resource's. Preserves the player's pre-lock preference, camera style and server perspective policy. Native-camera safety and server policy still determine the effective view after release. Stop/reload, coroutine failure and host teardown also release the owner's override automatically. To release a lock AND request a different view, use setThirdPerson(enabled, false) instead. Errors: `invalid_perspective_arguments`, `perspective_unavailable_on_this_host`.
     *
     * @since 2.31.13+op77.78
     * @open77Return true on success, otherwise false | reason on failure
     */
    clearThirdPersonOverride(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns the perspective actually in force.
     *
     * `fpp` or `tps`, read from the committed camera owner rather than from the request -- intention is not evidence, which is the same rule `camera.state` had to learn. An engine-owned view (a vehicle camera, a cutscene) reads `fpp`, because that is what the player sees; `Open77.perspective.state().camera` keeps the distinction.
     *
     * @since 2.31.4+op77.11
     * @open77Return "fpp" or "tps", or nil | reason
     */
    get(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks the perspective arbiter for first or third person.
     *
     * Records the local player's standing request. It is a REQUEST, not a switch: the perspective arbiter coordinates camera, body, input, weapon, effects and audio. Native vehicle/workspot/death/photo-mode safety and server policy take priority; a server-policy refusal is reported as `refused_by_policy` while remembering the request. A temporary resource lock created by setThirdPerson(enabled, true) is different: it refuses an opposing request without changing the pre-lock preference, and does not record a same-view request either. Accepts `fpp`/`first`/`1` and `tps`/`tpp`/`third`/`3`. Use setThirdPerson for a boolean switch or resource-owned lock and configureThirdPerson for camera style. Do not bypass the arbiter with legacy camera.thirdPerson, which changes only the camera owner.
     *
     * @since 2.31.4+op77.11
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    set(this: void, mode: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Requests first/third person, optionally locking that view for this resource.
     *
     * Client-only. enabled and optional force must be strict booleans; force defaults to false. Ordinary true/false requests TPP/FPP without a permission and leaves F7 available, subject to existing locks and server policy. force=true requires `perspective.policy`: (true,true) locks TPP; (false,true) locks FPP. This exclusive resource-instance lock preserves the player's remembered pre-lock preference, including when F7 is pressed. A rival forced request returns `perspective_owned`. force=false first releases the caller's own previous lock, then requests the selected view; it cannot clear another resource's lock. Native vehicle/cutscene/safety states and server disabled/forced policy win. Conflicting server policy rejects a new lock with `refused_by_policy`; existing locks resume after policy permits them again. Stop/reload, coroutine failure and host teardown release the lock automatically. No per-frame loop is needed. Does not configure camera style or broadcast a network view: use server setPolicy for global policy. Other errors: `invalid_perspective_arguments`, `permission_denied:perspective.policy` (forced calls only), `perspective_unavailable_on_this_host`. Inspect state for the effective view rather than assuming acceptance means the TPP camera currently owns the screen.
     *
     * @permission perspective.policy
     * @since 2.31.13+op77.78
     * @open77Return true when accepted, otherwise false | reason on failure
     */
    setThirdPerson(this: void, enabled: boolean, force?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reports the whole perspective decision.
     *
     * Client-only read; no permission required. Returns mode, requested, requestExpressed, policy, forced, resourceForced (boolean), resourcePerspective (tps/fpp/none), allowed, engaged, aiming, available, settled, transition, reason, rule, tier, the six owners (camera, body, input, weapon, effects, audio), violations, unsupportedChecks, slideFrames, slideLifted, unsupportedFires and unsupportedSource. resourceForced/resourcePerspective describe a requested local resource lock, not guaranteed ownership of a native vehicle or cutscene camera: inspect mode, camera, reason and settled for the effective view. allowed is false under a disabled/forced server policy or while a resource lock exists; an active resource lock reports reason/rule `resource_forced`. violations counts ticks where the arbiter detected conflicting body/weapon ownership; unsupported fields are diagnostic gate counters. Reads work during a live session and may return nil with `perspective_unavailable_on_this_host` if unsupported.
     *
     * @since 2.31.4+op77.11
     * @open77Return table, or nil | reason
     */
    state(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Flips the standing request and returns the new mode.
     *
     * Flips the REQUEST, not the effective view. Native vehicle cameras keep their own rules regardless of the standing on-foot preference. For a player who has never expressed a preference, the effective view is inverted so the first press does not appear to do nothing. A temporary resource lock from setThirdPerson(enabled, true) blocks an opposing toggle and preserves the pre-lock preference; server policy and native-camera safety still take priority. Returns the new fpp/tps request on acceptance, or nil and a refusal reason.
     *
     * @since 2.31.4+op77.11
     * @failure perspective_unavailable_on_this_host
     * @open77Return the new "fpp" or "tps", or nil | reason
     */
    toggle(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77PhotoModeApi {
    /**
     * Closes Cyberpunk's native photo mode.
     *
     * Requests the native menu's confirmed exit and UI cleanup. Idempotent when inactive or already closing; a request during the intro is queued until the menu is ready. Success means accepted, not that the transition has finished: isActive() still reports native state and may briefly remain true. Reopening during an accepted close returns photo_mode_transition_pending. A missing active menu returns photo_mode_menu_unavailable; deploy the matching client REDscripts with the DLL.
     *
     * @since 2.31.13+op77.38
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    close(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reports whether REDengine photo mode is active.
     *
     * Reads `gamePhotoModeSystem::IsPhotoModeActive`; it reports engine state rather than remembering the last Lua request.
     *
     * @since 2.31.13+op77.38
     * @open77Return boolean, or nil | reason when unavailable
     */
    isActive(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Opens Cyberpunk's native photo mode.
     *
     * This is the sole supported activation path while Open77 is loaded. The native plugin refuses the stock keyboard/controller activation entry, then this call invokes the retained original REDengine implementation directly. It is idempotent when already active; REDengine can still refuse contexts in which photo mode is unavailable.
     *
     * @since 2.31.13+op77.38
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    open(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Opens or closes the native photo mode.
     *
     * Equivalent to `open()` for true and `close()` for false. This controls one client-local engine state and is not a resource-owned lease.
     *
     * @since 2.31.13+op77.38
     * @open77Return true on success, otherwise false | reason for the refusal
     */
    setEnabled(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77PlayerInteractionsApi {
    /**
     * Queue acceptance of the local player's offered invitation.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Resolving a request ID means queued, not accepted by the server. Observe onPlayerInteractionResult or result(requestId), then lifecycle state events.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to request ID; nil, reason on rejection
     */
    accept(this: void, interactionId: string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Queue cancellation of an action the local player participates in; defaults to their current action.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Resolving a request ID means queued, not accepted by the server. Observe onPlayerInteractionResult or result(requestId), then lifecycle state events.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to request ID; nil, reason on rejection
     */
    cancel(this: void, interactionId?: string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read a player's active reservation; defaults to the local player.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Client observations are not authority for inventory, healing or rewards.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to state or nil; nil, reason on rejection
     */
    current(this: void, playerId?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Queue refusal of the local player's offered invitation.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Resolving a request ID means queued, not accepted by the server. Observe onPlayerInteractionResult or result(requestId), then lifecycle state events.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to request ID; nil, reason on rejection
     */
    decline(this: void, interactionId: string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read one visible active interaction; missing is not an error.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Client observations are not authority for inventory, healing or rewards.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to state or nil; nil, reason on rejection
     */
    get(this: void, interactionId: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Check the visible reservation cache; defaults to the local player.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Client observations are not authority for inventory, healing or rewards.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to boolean; nil, reason on rejection
     */
    isReserved(this: void, playerId?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read copied active states visible in this routing bucket.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Client observations are not authority for inventory, healing or rewards.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to state[]; nil, reason on rejection
     */
    list(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Queue acceptance or refusal of the local player's offered invitation. Only the target may respond.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Resolving a request ID means queued, not accepted by the server. Observe onPlayerInteractionResult or result(requestId), then lifecycle state events.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to request ID; nil, reason on rejection
     */
    respond(this: void, interactionId: string, accepted: boolean): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read a cached server acknowledgement for a queued request; acknowledgements expire after30seconds.
     *
     * Declare dependency 'open77_player_interactions >=1.0.0'. This is an asynchronous resource-export facade: call from a managed coroutine and await the Promise; nil plus reason indicates dispatch/rejection. No presentation capability is required for consumers. Client observations are not authority for inventory, healing or rewards.
     *
     * @since 2.31.13+op77.63
     * @failure open77_player_interactions
     * @open77Return Open77.Promise resolving to result table or nil; nil, reason on rejection
     */
    result(this: void, requestId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77PlayersApi {
    /**
     * Lists every player this client currently knows about, ascending by player id.
     *
     * No permission. STREAMING-SCOPED, not the server roster: it holds the players this client has been told about and can draw, so a player the server counts as connected can legitimately be absent. Anything that must be true of the whole session asks the server. The local player is included, matching FiveM's GetActivePlayers. A player who is connected but has no body is still listed; pass `{ streamed = true }` to keep only the ones with a body, which is the NetworkIsPlayerActive filter.
     *
     * @since 2.31.13+op77.67
     * @open77Return array of player ids
     */
    all(this: void, options?: Open77Table): number;
    /**
     * Lists all replicated player health snapshots known to the client.
     *
     * Requires `players.life.read`; returns an empty array when unavailable.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return array of health snapshots
     */
    allHealthStates(this: void): unknown;
    /**
     * Lists all replicated canonical player life states known to the client.
     *
     * Requires `players.life.read`; returns an empty array when unavailable.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return array of life snapshots
     */
    allLifeStates(this: void): unknown;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowAim(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowCrouch(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowDodge(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowInteraction(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowJump(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowRunning(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowShoot(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Allow or block a local-player action.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    allowWeapons(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The nearest player with a body.
     *
     * No permission. `Open77.players.nearby` reduced to its first entry, with the same options plus an optional `radius` (unbounded without one). Returns `nil, "no_player_in_range"` when nobody qualifies, which is deliberately distinct from `nearby`'s empty table.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_radius
     * @open77Return { playerId, entity, distance, position, name, isLocal } | or nil, reason
     */
    closest(this: void, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The entity id of one player's body.
     *
     * No permission. Feed the result to any Open77 entity API, `Open77.character.state(entity)` first among them. The local player's body is the reserved entity id `0` that every entity API reads as "me", which is a value, not a failure. Reasons: `player_not_streamed` (known, no body right now), `unknown_player`, `invalid_player`. Cache the player id, never the entity id: a proxy body is destroyed and recreated on death, re-dress and world transition.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_player, player_not_streamed, unknown_player
     * @open77Return entity id | or nil, reason
     */
    entity(this: void, playerId: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Request or release a native local-player freeze.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    freezePosition(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Request or release a native local-player freeze.
     *
     * Requires players.controls and a strict boolean. Freeze true acquires a block; Allow false acquires a block. The inverse releases only this resource VM's block, never another owner or vanilla restriction. Automatically released on resource stop, death and session teardown. Does not freeze vehicles, moving platforms or server teleports. See player-utilities.md for each native restriction and limitations.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    freezeRotation(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Which player wears a given body.
     *
     * No permission. The inverse of `Open77.players.entity`, for turning a raycast or a proximity hit back into a player id. Accepts the entity as an integer or as the decimal string form. Entity `0` resolves to the local player. Returns `nil, "unknown_entity"` for an id that is not a live player body right now, which is what a cached id becomes after its body is retired.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_entity, unknown_entity
     * @open77Return player id | or nil, reason
     */
    fromEntity(this: void, entityId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read the union of Open77 player-control block bits.
     *
     * Requires players.controls. Does not remove other resources' blocks or expose vanilla restriction state. See player-utilities.md.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, permission_denied:players.controls
     * @open77Return integer mask, or nil, reason
     */
    getControlMask(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads one replicated player health snapshot.
     *
     * Requires `players.life.read`. Omit `playerId` for the local player.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return table { playerId, revision, health, maxHealth, armor, godMode, lastAttacker, lastDamage, lastAttackKind, lastBodyPart, lastHitDirection }, or nil
     */
    getHealthState(this: void, playerId?: number): Open77Table | undefined;
    /**
     * Read the server-replicated blue eye-glow intent in the current routing bucket.
     *
     * Requires players.holocall.read. Omit playerId for the local network player. Returns nil, state_unavailable before the initial server snapshot. False means absent from this client's active bucket snapshot; it is not a cross-bucket global query or proof that native pixels are rendered. There is intentionally no client setter. See holocall-eyes.md.
     *
     * @permission players.holocall.read
     * @since 2.31.13+op77.63
     * @open77Return boolean enabled, or nil, reason
     */
    getHoloCallEyes(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the canonical replicated life state of one player.
     *
     * Requires `players.life.read`. Omit `playerId` for the local session player.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return life snapshot, or nil
     */
    getLifeState(this: void, playerId?: number): unknown | undefined;
    /**
     * Reads the local player's replicated death context.
     *
     * Requires `players.life.read`. The snapshot includes phase, cause, killer, weapon, position, yaw, impulse, revision and grace duration.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return life snapshot, or nil
     */
    getLocalDeathContext(this: void): unknown | undefined;
    /**
     * Reads a replicated player's canonical vehicle-seat assignment.
     *
     * Alias of `Open77.vehicles.getPlayerSeat`, exposed under the player namespace. Requires `vehicles.read`; omitting `playerId` selects the local player.
     *
     * @permission vehicles.read
     * @since 2.31.7+op77.16
     * @open77Return table { playerId, vehicleId, seat (the canonical name only: seat_front_left, seat_front_right, seat_back_left or seat_back_right -- never driver or passenger, which are accepted aliases, not reported ones), flags (integer bitfield), entering, exiting, forcedEntry, exitLocked, forcedExit (booleans); the client copy adds animatedEntry and occupants }, or nil when the player is not assigned to a vehicle
     */
    getVehicleSeat(this: void, playerId?: number | string): number | undefined;
    /**
     * Graph-produced aiming state, including toggle aim.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isAiming(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Crouched locomotion state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isCrouching(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a player is canonically dead or awaiting revive/respawn.
     *
     * Requires `players.life.read`. Omit `playerId` for the local player. Unknown or unavailable states return false.
     *
     * @permission players.life.read
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isDead(this: void, playerId?: number): boolean;
    /**
     * Native underwater swimming state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isDiving(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Mounted in the driver seat.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isDriver(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Falling phase.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isFalling(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Locomotion ground contact.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isGrounded(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Native vehicle mounting state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isInVehicle(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Jump or double-jump phase.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isJumping(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Mounted in a non-driver seat.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isPassenger(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reloading state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isReloading(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Graph trigger state, not confirmation of a projectile or damage.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isShooting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sliding locomotion state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isSliding(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sprint state rather than a velocity threshold.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isSprinting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Native surface-swimming or diving state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isSwimming(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Vault traversal state.
     *
     * Requires players.read. Omit playerId to query the local network player. Remote players must be streamed and presentation-ready; swimming/diving are local-only and return nil, state_not_replicated remotely. Unavailable is not false. Read-only, without advancing replication counters. See player-utilities.md.
     *
     * @permission players.read
     * @since 2.31.13+op77.63
     * @failure game_unavailable_on_this_host, invalid_player, permission_denied:players.read
     * @open77Return boolean, or nil, reason
     */
    isVaulting(this: void, playerId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The local player's id; keyword-named alias of `localId`.
     *
     * No permission. Identical function value to `Open77.players.localId`. `local` is reserved in Lua, so this name only parses through the bracket form `Open77.players["local"]()`; prefer `localId`.
     *
     * @since 2.31.13+op77.67
     * @failure no_session
     * @open77Return player id | or nil, reason
     */
    local(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The local player's id.
     *
     * No permission. Returns `nil, "no_session"` while not connected. Registered under `local` as well, for the FiveM-parity spelling, but `local` is a Lua keyword: `Open77.players.local()` is a syntax error and the name is only reachable as `Open77.players["local"]()`. Same function value.
     *
     * @since 2.31.13+op77.67
     * @failure no_session
     * @open77Return player id | or nil, reason
     */
    localId(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Players with a body within `radius`, nearest first.
     *
     * No permission. Centred on the local player unless `origin` is given; ties broken by player id so the order does not flicker. Each entry is `{ playerId, entity, distance, position, name, isLocal }`, where `position` is a plain x/y/z table and therefore already a vector3. Players without a body are skipped, having no position; use `all()` to see that they exist. Empty table when nobody qualifies. Reasons: `invalid_radius`, `invalid_origin`, `invalid_limit`, `no_session`, `no_local_position` (connected with no body, so no centre - pass `origin` to ask anyway).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_radius
     * @open77Return array of { playerId, entity, distance, position, name, isLocal } | or nil, reason
     */
    nearby(this: void, radius: number, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Release every player-control block owned by the calling resource VM.
     *
     * Requires players.controls. Does not remove other resources' blocks or expose vanilla restriction state. See player-utilities.md.
     *
     * @permission players.controls
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    resetControls(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77PreventionApi {
    /**
     * Turns NCPD dispatch on or off for this client.
     *
     * `TogglePreventionSystem`, the nearest equivalent of `SetDispatchServiceActive`. This is the session's own switch and is **not** the three block flags `VehicleSpawnPolicy` owns and drives from world population suppression; this call deliberately never touches those, so the two cannot fight. Reaches the engine through the REDscript command queue, never a native call: all 276 methods on `PreventionSystem` are scripted, and invoking one from C++ without a script frame terminates the process. A `true` return therefore means *queued*, not applied; `Open77.prevention.state()` reports whether the script loop later acknowledged it. Requires `world.prevention`. A server that sets policy through `Open77.players.setWanted` reaches this same surface through the `open77_prevention` resource; a client resource calling it directly is overriding that.
     *
     * @permission world.prevention
     * @since 2.31.13+op77.67
     * @open77Return true when queued, otherwise false | reason: permission_denied:world.prevention, invalid_prevention_argument, script_bridge_unavailable, script_queue_full
     */
    setEnabled(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the ceiling the wanted level resets to, 0 to 5.
     *
     * `SetMinMaxResetHeatLevels(0, level, false)`. The floor stays at 0 deliberately: a nonzero minimum would strand a session at a heat it could never clear. Reaches the engine through the REDscript command queue, never a native call: all 276 methods on `PreventionSystem` are scripted, and invoking one from C++ without a script frame terminates the process. A `true` return therefore means *queued*, not applied; `Open77.prevention.state()` reports whether the script loop later acknowledged it. Requires `world.prevention`. A server that sets policy through `Open77.players.setWanted` reaches this same surface through the `open77_prevention` resource; a client resource calling it directly is overriding that.
     *
     * @permission world.prevention
     * @since 2.31.13+op77.67
     * @open77Return true when queued, otherwise false | reason: permission_denied:world.prevention, invalid_wanted_level, script_bridge_unavailable, script_queue_full
     */
    setMaxWanted(this: void, level: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets this client's NCPD wanted level, 0 to 5.
     *
     * The wanted level is **world state on this client**, not player state: nothing in the engine's wanted surface takes a target, the heat stage is a scalar on a singleton `PreventionSystem`, and every consumer reads one global `UI_WantedBar`. The NCPD units it summons are this client's own - not Open77 entities, not replicated, invisible to every other player. `0` clears it. Raising it above 0 while world population suppression is active is refused with `population_suppressed` rather than silently doing nothing: the spawn policy is holding `SetSystemLock`/`SetBlockOnFootSpawn`/`SetBlockVehicleSpawn` on in that state, so the stage would change and no unit would ever arrive. Clearing to 0 is always allowed. Reaches the engine through the REDscript command queue, never a native call: all 276 methods on `PreventionSystem` are scripted, and invoking one from C++ without a script frame terminates the process. A `true` return therefore means *queued*, not applied; `Open77.prevention.state()` reports whether the script loop later acknowledged it. Requires `world.prevention`. A server that sets policy through `Open77.players.setWanted` reaches this same surface through the `open77_prevention` resource; a client resource calling it directly is overriding that.
     *
     * @permission world.prevention
     * @since 2.31.13+op77.67
     * @open77Return true when queued, otherwise false | reason: permission_denied:world.prevention, invalid_wanted_level, population_suppressed, script_bridge_unavailable, script_queue_full
     */
    setWanted(this: void, level: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * What was last requested of the prevention system, and whether the script loop acknowledged it.
     *
     * **Never an engine reading.** There is no value channel back from REDscript, only a per-command acknowledgement, so this reports a request record and the field names say so: `requestedLevel`, `requestedMaxLevel`, `requestedEnabled`, plus `levelAcknowledged`, `maxLevelAcknowledged` and `enabledAcknowledged`. An acknowledgement means the script loop found `PreventionSystem` and ran the call; it does not mean the engine honoured it. `scriptAttached` is false until the REDscript loop has polled at least once - anything queued before that is waiting, not lost. `populationSuppressed` says whether the spawn policy is currently holding police off, which is why a `setWanted` raise would be refused. Requires `world.prevention`.
     *
     * @permission world.prevention
     * @since 2.31.13+op77.67
     * @failure permission_denied:world.prevention, prevention_unavailable_on_this_host
     * @open77Return table { scriptAttached, populationSuppressed, requestedLevel, requestedMaxLevel, requestedEnabled, levelAcknowledged, maxLevelAcknowledged, enabledAcknowledged }, or nil | reason: permission_denied:world.prevention, prevention_unavailable_on_this_host
     */
    state(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77PropsApi {
    /**
     * Attach a resource-owned local prop to a rendered bone or vehicle.
     *
     * Binding fields: parentType ('player' or 'vehicle'), parentId (canonical network ID, not an engine handle), bone (named slot, empty for root), offset {x,y,z} in metres (each ±20), rotation {x,y,z} in degrees (each ±360, local Z-Y-X composition). Unknown fields and non-finite numbers reject. Missing streamed parents are hidden, then rebound when available. See attachments.md. Requires world.props. This changes only this client's prop, not server authority. Physics uses a visual-only attachment host; arbitrary mesh paths without that host are refused.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @open77Return boolean success, reason on failure
     */
    attach(this: void, propId: number, binding: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * List available named attachment slots on a streamed parent.
     *
     * Requires world.props. Returns sorted names from the current native slot components, not all skeleton bones. Parent IDs are canonical player/vehicle IDs. Empty array means unavailable or no slots; it does not establish that a different body/model supports a requested slot.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_attachment_parent, permission_denied:world.props, props_backend_unavailable
     * @open77Return string[] or nil, reason
     */
    bones(this: void, parentType: string, parentId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Removes every local prop this resource created.
     *
     * Called automatically when the resource stops or reloads, so a reloading gamemode never leaves orphaned decorations behind. It never touches another resource's props, nor server-owned ones.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean
     */
    clear(this: void): boolean;
    /**
     * Creates a local, decorative prop owned by this resource.
     *
     * Requires `world.props`. This is the **client** meaning of the name: the prop is never replicated and never visible to anyone else -- a placement ghost, a build cursor, a preview being dragged. It is charged against this resource's quota and released when the resource stops. The identically-named *server* function mints an authoritative, replicated prop instead; the two `Open77` tables are different objects on different machines.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @failure permission_denied:world.props, props_backend_unavailable
     * @open77Return decimal-string prop id, or nil | reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Detach a resource-owned local prop.
     *
     * Requires world.props. Restores an independent host at the last locally rendered pose. Does not detach a server-owned network prop. Calling the server API is required for a replicated release.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @open77Return boolean success, reason on failure
     */
    detach(this: void, propId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Local props this resource owns, with what the renderer did with each.
     *
     * Each entry carries the model, kind, physics, transform, scale, the back-end that drew it, and whether it rendered or failed. Scoped to the caller: it deliberately excludes server-owned props, which belong to the session rather than to any resource, so asking a resource-scoped question about them would return an empty table and read as "no props" rather than "wrong question". Use the `open77_props` resource's `all` export for those.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @failure permission_denied:world.props, props_backend_unavailable
     * @open77Return array of prop snapshots
     */
    list(this: void): unknown;
    /**
     * Finds the nearest local prop owned by this resource.
     *
     * Requires `world.props`. Searches only the calling resource's local prop set, using a 10 metre default radius. A non-positive or non-finite radius is rejected; use `list` when an unbounded set is intended.
     *
     * @permission world.props
     * @since 2.31.2+op77.10
     * @failure invalid_position, invalid_radius, permission_denied:world.props, props_backend_unavailable
     * @open77Return prop snapshot and distance, or nil | reason on validation failure
     */
    nearest(this: void, position: Open77Table, radius?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Upserts a server-owned prop into the world, keyed by the server id.
     *
     * What the bundled `open77_props` projection resource drives; not the way a gamemode places objects. Because the native layer is keyed by the server's own id, a prop that only moved is transformed in place rather than destroyed and rebuilt, which is what stops it visibly popping. Projected props are owned by the session, survive a resource reload, and are not charged against any resource's quota.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean | reason
     */
    project(this: void, serverId: string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a local prop this resource owns.
     *
     * Removing a prop that is already gone succeeds: the caller asked for it not to be there, and it is not there. Another resource's prop answers `owned_by_another_resource`.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a local prop to a position and yaw.
     *
     * The one mutation the engine accepts on a live entity, so it never respawns and never pops. Scale is deliberately not part of it: scale is read when the render proxy is built, so it goes through `update` and costs a respawn.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean | reason
     */
    setTransform(this: void, id: string, transform: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops projecting one server-owned prop.
     *
     * Succeeds when the prop is already absent: the server is saying stop showing something, and it is not being shown.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean | reason
     */
    unproject(this: void, serverId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops projecting every server-owned prop.
     *
     * Used on disconnect and when the projection resource restarts, so a stale world never survives into a new session.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean
     */
    unprojectAll(this: void): boolean;
    /**
     * Patches a local prop this resource owns.
     *
     * Only the fields present in the patch are taken. Changing anything the render proxy reads when it is built -- model, scale, kind, physics, collision, visibility or the light parameters -- respawns the underlying entity rather than mutating it, because the engine offers no in-place path for those. Use `setTransform` to move a prop without that cost.
     *
     * @permission world.props
     * @since 2.31.1+op77.9
     * @open77Return boolean | reason
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77PuppetsApi {
    /**
     * Create a local character-selection mannequin.
     *
     * Requires puppets.present and a loaded world. options contains body={family,groups}, position={x,y,z}, optional equipment and yaw in degrees (default 0). Keep face morphs in the captured body. The encoded options must fit in 8 KiB. Creation returns a resource-owned preview handle immediately; poll getLocal for readiness. Limits: 32 per resource, 128 per client, 30-second preparation timeout. Previews are local, idle and removed on resource stop/reload or world teardown. See [Character previews](character-previews.md).
     *
     * @permission puppets.present
     * @since 2.31.21+op77.147
     * @open77Return integer preview handle, or nil | reason on failure
     */
    createLocal(this: void, options: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Read a local mannequin preparation state.
     *
     * Requires puppets.present. Accepts a preview handle owned by this resource generation, not a player ID or server NPC ID. Returns id, entity, ready, status and reason. status is spawning, preparing, ready or failed. Use entity for camera/scene integration only after ready is true. See [Character previews](character-previews.md).
     *
     * @permission puppets.present
     * @since 2.31.21+op77.147
     * @open77Return table, or nil | reason on failure
     */
    getLocal(this: void, handle: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Remove a local mannequin or cancel its pending spawn.
     *
     * Requires puppets.present and a handle owned by this resource generation. Remove the old preview before changing a selection, outfit or placement. Resource stop/reload and world teardown also clean up previews. Unknown and foreign handles are refused. See [Character previews](character-previews.md).
     *
     * @permission puppets.present
     * @since 2.31.21+op77.147
     * @open77Return boolean removed | reason on failure
     */
    removeLocal(this: void, handle: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Project a captured body onto a network player proxy.
     *
     * Requires puppets.present. playerId is a network player ID; body={family,groups}, or false to clear the remote body. Uses asynchronous native dressing; true means acceptance, not a fully rendered proxy. Use the appearance service to distribute authoritative records and preserve wardrobe ownership.
     *
     * @permission puppets.present
     * @since 2.31.13+op77.45
     * @open77Return boolean accepted | reason on failure
     */
    setBody(this: void, playerId: number, body: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Project one remote equipment-slot override.
     *
     * Requires puppets.present. playerId is a network player ID. record is a TweakDB record string (up to160 bytes), false for explicitly empty, or nil for the native default. Do not confuse nil and false when restoring a clothing snapshot. Native dressing is asynchronous; this is not durable inventory ownership.
     *
     * @permission puppets.present
     * @since 2.31.13+op77.45
     * @open77Return boolean accepted | reason on failure
     */
    setSlot(this: void, playerId: number, slot: string, record?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Project a remote wardrobe snapshot.
     *
     * Requires puppets.present. snapshot={active=integer,outfits={[outfitId]={[slot]=recordOrFalse}}}. false means an explicitly empty slot. Network player IDs and native wardrobe IDs are different namespaces. This is asynchronous presentation; the server wardrobe service remains the durable source of truth.
     *
     * @permission puppets.present
     * @since 2.31.13+op77.45
     * @open77Return boolean accepted | reason on failure
     */
    setWardrobe(this: void, playerId: number, snapshot: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ReflexApi {
    /**
     * Releases the reflex overdrive this resource holds on the local player.
     *
     * Client support primitive; requires player.reflex.overdrive. Idempotent; the boost also ends on its own deadline, on death, a vehicle, a workspot, a session change and the owning resource stopping.
     *
     * @permission player.reflex.overdrive
     * @since 2.31.13+op77.73
     * @failure permission_denied:player.reflex.overdrive, reflex_backend_unavailable
     * @open77Return true, or nil, reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Applies the local reflex overdrive: a bounded real-time speed/handling buff.
     *
     * Client support primitive; requires player.reflex.overdrive. Kind is reflex or reflex_heavy; duration is clamped to 15 s. It applies stat modifiers through gameStatsSystem and touches no clock: the shared world stays real time, other players are never slowed and bullets are never slowed. Server creators use the separate server Open77.reflex define/grant/revoke API documented in reflex-overdrive.md. A returned request number is admission, not rendered speed. Arbitrary stat plans are unavailable. Multiplayer acceptance is pending.
     *
     * @permission player.reflex.overdrive
     * @since 2.31.13+op77.73
     * @failure invalid_duration, invalid_kind, permission_denied:player.reflex.overdrive, reflex_backend_unavailable, resource_not_running
     * @open77Return request number, or nil | reason on failure
     */
    overdrive(this: void, kind: string, durationMs: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads the local reflex-overdrive machine.
     *
     * Client support primitive; requires player.reflex.overdrive. Returns phase, kind, owner, reason, request, grantedMs, remainingMs, elapsedMs, activations, refusals, releases, watchdogRemovals, releaseOverdue and active. It is admission and lifecycle state, not proof that the engine honoured a modifier.
     *
     * @permission player.reflex.overdrive
     * @since 2.31.13+op77.73
     * @failure permission_denied:player.reflex.overdrive, reflex_backend_unavailable
     * @open77Return table, or nil, reason
     */
    state(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77ResourceApi {
    /**
     * Generation number, incremented on every reload.
     *
     * With no argument, returns the current resource generation. Pass a resource name to inspect that resource, or receive nil when it is missing.
     *
     * @since 2.31.0+op77.3
     * @open77Return integer, or nil
     */
    generation(this: void, resource?: string): number | undefined;
    /**
     * Whether the resource holds this permission.
     *
     * Checks whether the current resource manifest grants an exact Open77 capability. It is a read-only convenience check; native APIs still enforce their own permission and must handle refusal results.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    hasPermission(this: void, permission: string): boolean;
    /**
     * Name of the current resource.
     *
     * Returns the current resource's immutable manifest name. This is equivalent to `GetCurrentResourceName()` and remains stable for the lifetime of the resource definition.
     *
     * @since 2.31.0+op77.3
     * @open77Return string
     */
    name(this: void): string;
    /**
     * Reads a file from the resource, within its declared allowlist.
     *
     * Reads a file declared by the current resource manifest through a safe relative path. Undeclared files, traversal, oversized content and host filesystem paths are rejected.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_resource_path
     * @open77Return contents, or nil | reason
     */
    readFile(this: void, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads a file another resource declared, as base64.
     *
     * Requires `resources.files.read`, reserved for the bundled audio service. Reads only files declared in the target resource's `files` list; scripts, manifests and undeclared disk files are inaccessible. Other resources use `Open77.resource.readFile` for their own files. Returns Base64 for binary-safe transport, up to 3 MiB raw data. Base64 expansion can exceed the separate 2 MiB WebUI JSON message cap; see [runtime quotas](/docs/resource-runtime#sandbox-and-quotas). Errors: `permission_denied:resources.files.read`, `invalid_resource_path`, `resource_not_found`, `file_not_declared`, `file_too_large`.
     *
     * @permission resources.files.read
     * @since 2.31.13+op77.67
     * @failure file_not_declared, invalid_resource_path, permission_denied:resources.files.read, resource_not_found
     * @open77Return base64 string | or nil, reason
     */
    readPackedFile(this: void, resource: string, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * State of a resource on this client: `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name this host does not know. There is no `started`: a resource that is up reads `running`, so `== "started"` is never true.
     *
     * Returns the lifecycle state known for a resource name (the argument is required; `GetResourceState` is the same function): `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name this host does not know. There is no `started`: a resource that is up reads `running`, so `== "started"` is never true. An immediate snapshot; it does not wait for dependencies or mutate lifecycle state.
     *
     * @since 2.31.0+op77.3
     * @failure missing
     * @open77Return one of the eight state names
     */
    state(this: void, resource: string): unknown;
    /**
     * Version declared in `open77.lua`.
     *
     * Returns the version string declared by the current resource manifest. It is package metadata and is unrelated to the Open77 runtime or Lua interpreter version.
     *
     * @since 2.31.0+op77.3
     * @open77Return string
     */
    version(this: void): string;
}
interface Open77RuntimeApi {
    /**
     * Every client command registered across every running resource.
     *
     * Client-only. Returns an array of `{ name, resource, restricted, help?, parameters? }`. Only serialisable metadata crosses; handlers stay in their owner's state, exactly as `Open77.input.mappings` does for key binds. This is what the chat composer reads to merge client commands into its completion list -- it skips the restricted ones, which cannot run. `GetRegisteredCommands` is the same function under the FiveM name.
     *
     * @since 2.31.13+op77.67
     * @open77Return array of tables
     */
    commands(this: void): Open77Table;
    /**
     * Runs a command line against the CLIENT command registry only.
     *
     * Client-only. Accepts a raw line with or without a leading `/`, tokenised exactly as the chat composer tokenises it: `\` escapes, `"` and `'` quote, 32 arguments, 4096 bytes. The handler is scheduled, never called inline, so one resource's command cannot run inside another's C frame. `false, unknown_command` is the signal to forward the line to the server and is not an error; `command_restricted`, `empty_command`, `unterminated_quote`, `trailing_escape`, `too_many_arguments`, `command_line_too_long` and `command_task_limit` are. First match wins in resource-name order. Unlike FiveM's `ExecuteCommand` this never forwards to the server by itself -- the caller decides.
     *
     * @since 2.31.13+op77.67
     * @open77Return true when a client command claimed the line, otherwise false | reason
     */
    executeCommand(this: void, line: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Embedded Lua version.
     *
     * Returns the embedded Lua interpreter version used by this resource VM. Use it for diagnostics or compatibility checks, not to infer the Open77 build version.
     *
     * @since 2.31.0+op77.3
     * @open77Return string
     */
    luaVersion(this: void): string;
    /**
     * Registers a client-side slash command in this resource's VM.
     *
     * Client-only; no permission. The handler is `(source, args, raw)` with `source` always 0, because on the client there is no other party to attribute a command to. The optional third argument `restricted` is honoured by REFUSING: such a command is registered and listed but declines to run with `command_restricted`, because the client has no ACL and cannot answer an authority question -- an admin-only action belongs on the server. The optional fourth argument `{ help, parameters }` is merged into the chat composer's completions (8 parameters, 240 bytes each). Names accept `[A-Za-z0-9_.:-]` up to 64 bytes, the same set the server's `RegisterCommand` accepts; a leading `/` is stripped. Re-registering a name inside one VM replaces the handler. 128 commands per resource. `RegisterCommand` is the same function under the FiveM name.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    registerCommand(this: void, name: string, handler: Open77Callback, restricted?: boolean, suggestion?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Withdraws a client command this resource registered.
     *
     * Client-only. The registry is per VM: a resource can only withdraw its own command, and asking for another's answers `false, command_not_found`. Stopping a resource withdraws all of its commands.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    unregisterCommand(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Open77 version.
     *
     * Returns the Open77 scripting runtime version exposed to resources. This describes the host API and is distinct from both the resource manifest version and game build.
     *
     * @since 2.31.0+op77.3
     * @open77Return string
     */
    version(this: void): string;
}
interface Open77ScreenApi {
    /**
     * Cancels an owned native transition and restores the image immediately.
     *
     * Client-only; requires screen.effects. Ownership includes resource generation and host instance. Never clears a native game fade that has taken over. Emits open77:screen:cancelled with reason=requested on success.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return true, or false, reason
     */
    cancel(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Takes an in-process screenshot of the game's own rendered frame and resolves a promise with the encoded bytes.
     *
     * Client-only; requires screen.capture. At the next Present the swap chain's back buffer is copied on the game's own direct queue into a readback buffer, fenced, converted and encoded off the game thread, and the promise resolves with { bytes (a binary string), sizeBytes, width, height, regionWidth, regionHeight, format, screenWidth, screenHeight, sourceFormat, includeOverlay, copyMicros, encodeMicros, totalMicros }. Options: format ('jpeg' default, or 'png'), quality (1..100, default 85, JPEG only), region = { x, y, w, h } in pixels (omitted = the whole frame; a region past an edge is region_invalid, never clamped), includeOverlay (default false = the game alone, before Open77's own overlay pass; true = after it, so nameplates, WebUI pages and the console are in the picture), settleFrames (0..30 Presents to skip first), maxBytes (encoded ceiling, default 8 MiB, at most 16 MiB), scale (0.05..1, default 1: the output shrunk to that fraction of the region through the encoder's own Fant scaler; width/height are then the scaled size and regionWidth/regionHeight what was copied). One capture in flight per resource: a second call before the first settles is capture_in_flight. The picture is the swap chain the game presents -- never the desktop, never another window. Reasons: permission_denied:screen.capture, screenshot_unavailable_on_this_host, device_unavailable (no swap chain hooked -- the overlay is not up), format_unsupported (a request for anything but jpeg/png, or a surface this build cannot convert), region_invalid, invalid_quality, invalid_settle_frames, invalid_max_bytes, invalid_scale, invalid_capture_option:<key>, capture_in_flight, capture_limit; the promise rejects with capture_too_large, encode_failed:<stage>, gpu_timeout, cancelled, resource_stopped. See the Screenshots guide.
     *
     * @permission screen.capture
     * @since 2.31.13+op77.73
     * @open77Return promise, or nil, reason
     */
    capture(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists supported native screen transition presets and backend availability.
     *
     * Client-only; requires screen.effects. Current preset is fade, with backend=native_quest_fade, available, color, maxDurationMs, maxHoldMs and maxTimeoutMs. Availability verifies this executable's guarded native entry, not whether a world is ready or another fade is busy. Glitch remains unsupported.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return presets, or nil, reason
     */
    catalog(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Returns the image for this resource's active native fade.
     *
     * Client-only; requires screen.effects. options.durationMs is 0..10000 (default 500). Returns true and, as a second value, an Open77.Promise that resolves when the image is back. Can reverse an outgoing fade; does not extend the safety deadline. Rejects another owner, stale generation or an already-running return. open77:screen:finished marks the same boundary.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return true, promise, or false, reason
     */
    fadeIn(this: void, id: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Applies a native black or color-tinted quest fade (colored rendering is engine-controlled).
     *
     * Client-only; requires screen.effects. Returns an owned string ID and, as a SECOND value, an Open77.Promise that resolves with the state table when the screen is actually covered and rejects with the transition's reason if it ends first. Options: durationMs (0..10000, default 500), color={r,g,b,a=255}, timeoutMs (1000..60000, default at least 15000). Resource cleanup and a bounded real-time deadline restore the image, and both fail the promise rather than leave a caller waiting. See the Native screen transitions guide.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return id, promise, or nil, reason
     */
    fadeOut(this: void, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Is the screen covered right now, whoever covered it.
     *
     * Client-only; requires screen.effects. UNOWNED: true when the engine's own fade manager reports a completed outgoing fade, whether this resource, another resource, the server relay or a vanilla quest/loading fade caused it. Read it before fading out so a spawn or teleport does not stack a second fade on a screen that is already black. Answers nil, reason rather than a confident false when the guarded backend is unavailable or the call is off the game thread.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.67
     * @open77Return faded, or nil, reason
     */
    isFaded(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * A head-and-shoulders picture of a body: a scripted camera cut in front of the face, one frame captured through it, the view handed straight back.
     *
     * Client-only; requires screen.capture, camera.script and world.transform. target is an Open77 entity id (0 or nil = the local player) or a { engineEntity = ... } table -- exactly what Open77.character.frame accepts. Composed in Lua from the public calls: the head is the body's own head slot (Open77.character.bonePosition) or headHeight up its up axis; a scripted camera is created distance metres ahead of the face looking at it with fov, activated with blendMs = 0, a frame is captured through it after settleFrames Presents, then the camera is deactivated and destroyed whatever happened. Options: format, quality, region, includeOverlay, settleFrames (default 3), maxBytes, scale (as capture -- scale = 0.25 makes a ~4 KiB thumbnail the server's own route can take), crop (0..1, default 0.5: the side of the centred square crop as a fraction of the shorter screen edge, used when no region is given), fov (default 35), distance (default 0.7 m), headHeight (default 1.62 m). Resolves with the capture table plus camera = { position, lookAt, fov }. Refuses with camera_busy while anybody holds the view or a blend is running (it never steals), target_not_streamed for a body this client cannot see, not_incarnated before the player has a body, and everything capture and Open77.camera.create refuse. What the picture shows depends on the body the engine renders through that camera: another player's puppet and an NPC are full bodies; the local player's own head is whatever body the perspective arbiter leaves in place while a scripted camera holds the view. See the Screenshots guide.
     *
     * @permission screen.capture
     * @since 2.31.13+op77.73
     * @failure invalid_options
     * @open77Return promise, or nil, reason
     */
    mugshot(this: void, target?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The engine's own fade state, unowned.
     *
     * Client-only; requires screen.effects. Returns faded, fading, out, busy, ready and remainingMs read straight from the native fade manager with no owner filter -- the detailed form of isFaded(). fading separates 'on its way to black' from 'already black'. Engine truth, not an estimate, and not a GPU presentation fence.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.67
     * @open77Return state, or nil, reason
     */
    nativeState(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads this resource generation's active or recent native transition.
     *
     * Client-only; requires screen.effects. OWNER-SCOPED: it answers for this resource generation's own transition and nothing else -- isFaded() and nativeState() read a fade someone else owns. Returns id, generation, phase, reason, backend, timing, automatic, elapsedMs, remainingMs, timeoutMs, black and color. remainingMs is the native fade timer, not hold time; native-state completion is not a GPU fence or streaming-complete signal. History is bounded to 64 global entries and removed on resource release.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    state(this: void, id: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * What the last Present said about the back buffer: size, DXGI format and whether captures are possible.
     *
     * Client-only; requires screen.capture. Returns { ready, width, height, format, pixel, supported }. ready is false before any swap chain has been hooked (the overlay is not up, or it was just torn down for a resize) -- an honest 'not yet', not a failure. format is the DXGI name the swap chain actually presents (R8G8B8A8_UNORM, B8G8R8A8_UNORM, R10G10B10A2_UNORM, R16G16B16A16_FLOAT ...), read from the buffer and never assumed; pixel is the conversion family (rgba8, bgra8, rgb10a2, rgba16f, unsupported); supported false means every capture will refuse with format_unsupported. Use it to size a region before capturing. Reasons: permission_denied:screen.capture, screenshot_unavailable_on_this_host.
     *
     * @permission screen.capture
     * @since 2.31.13+op77.73
     * @failure permission_denied:screen.capture, screenshot_unavailable_on_this_host
     * @open77Return surface, or nil, reason
     */
    surface(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Runs a native fade, bounded hold and return sequence.
     *
     * Client-only; requires screen.effects. Supported preset: fade. Returns an owned string ID and, as a second value, an Open77.Promise that resolves when the whole sequence has finished. Options: durationMs=500, holdMs=250, fadeInMs=500, timeoutMs and opaque RGB color. Durations are integer milliseconds; hold is 0..30000, fades 0..10000. Only one active owner; vanilla requests retain priority. No teleport or network mutation. Glitch is not yet a supported preset.
     *
     * @permission screen.effects
     * @since 2.31.13+op77.57
     * @open77Return id, promise, or nil, reason
     */
    transition(this: void, preset: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * POSTs a capture (or raw image bytes) to a URL and resolves a promise with the HTTP receipt.
     *
     * Client-only; requires screen.upload. The first argument is the table a capture resolved with (its bytes, format, width and height travel along) or a bare string of image bytes. url must be an absolute http:// or https:// URL with no credentials in it; redirects are never followed, so the host named is the only host reached. Options: encoding ('multipart' default -- one file part plus any fields, the shape screenshot-basic targets expect; or 'json' -- an application/json envelope { format, width, height, sizeBytes, ...fields, data = base64 }, for a target that cannot take a binary body such as the server's own Open77.http.listen route), field (multipart file field, default 'files[]'), filename, headers (up to 16, no CR/LF; Content-Type, Content-Length and Host are the client's), fields (up to 16 extra text fields), timeoutMs (1000..60000, default 15000). The promise resolves with { status, body (the first 64 KiB of the answer), bodyTruncated, sentBytes, elapsedMs } and rejects with request_failed:<stage>:<winhttp code>, timeout or cancelled. Two uploads in flight per resource (upload_in_flight), eight per client (upload_limit); at most 16 MiB per upload (bytes_too_large). Reasons: permission_denied:screen.upload, screenshot_unavailable_on_this_host, bytes_empty, bytes_too_large, invalid_url, invalid_upload_option:<key>, invalid_header, invalid_field, too_many_headers, too_many_fields, upload_in_flight, upload_limit. See the Screenshots guide.
     *
     * @permission screen.upload
     * @since 2.31.13+op77.73
     * @open77Return promise, or nil, reason
     */
    upload(this: void, capture: string | Open77Table, url: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77SessionApi {
    /**
     * Reads the current character-bootstrap state.
     *
     * Returns the current client-local character bootstrap projection as phase, body family, error and generation. The table is a snapshot; polling it does not advance the transaction.
     *
     * @since 2.31.0+op77.3
     * @failure game_unavailable_on_this_host
     * @open77Return value | reason (when the first is nil)
     */
    characterBootstrap(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Marks character bootstrap as failed.
     *
     * Marks the active client-local character bootstrap as failed with an optional bounded diagnostic reason. It requires player.appearance.edit and does not disconnect the network session.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    failCharacterBootstrap(this: void, reason?: string): void;
    /**
     * Whether any modal layer -- Open77's or the game's -- owns the screen.
     *
     * Requires `session.menus`. True when a gameplay loop should stop reading input: an Open77 WebUI surface holding the keyboard, any vanilla menu scenario, photo mode, the appearance mirror, the pre-game character creator, or the Open77 developer console. It is the same disjunction the window procedure already uses to route the escape key, extended by photo mode and the console, so the read cannot disagree with the behaviour the player sees. **What it cannot see**: the vanilla half is fed by the gameplay idle scenario's wrappers, so a screen that does not pass through that scenario -- radial and hub wheels, pre-game menus other than the creator -- never reports itself. A resource that needs certainty about its own modal should still track its own and compare `menuState().overlayResource`. Pairs with the `open77:menuStateChanged` event, which is raised from the same snapshot.
     *
     * @permission session.menus
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil, reason
     */
    isMenuOpen(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether the VANILLA pause menu is on screen.
     *
     * Requires `session.menus`. The FiveM `IsPauseMenuActive` equivalent, and it means the pause menu specifically -- not the inventory, the map, the journal or the death screen, which `isMenuOpen()` covers. Read from the scenario name the script bridge already carries (`MenuScenario_PauseMenu`). On a server whose own pause resource has taken over, the vanilla menu never opens and this stays false while the Open77 overlay is up; `isMenuOpen()` is the question that covers both, and `menuState().overlayResource` names which resource has the screen.
     *
     * @permission session.menus
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil, reason
     */
    isPauseMenuOpen(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * What the launcher told this game process at boot.
     *
     * Returns a table { connectEndpoint, master, serverId, modsDigest, launched } read once from the environment the OPEN//77 launcher sets when it starts the game (OP77_CONNECT, OP77_CONNECT_MASTER, OP77_WORLD_SERVER, OP77_WORLD_MODS_DIGEST), every value validated against a strict alphabet. All strings are empty and `launched` is false when the game was started without the launcher (Steam, GOG, a shortcut): that is a state, not an error. `modsDigest` is the SHA-256 of the required-mod set the launcher installed for the world it booted into, the same digest the master relays as `requiredModsDigest` in the catalogue, so the shell can decide whether this boot can join a world without a relaunch. Returns nil plus a reason only when no game backend is attached.
     *
     * @since 2.31.10+op77.26
     * @open77Return table, or nil | reason on failure
     */
    launcherContext(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Loads the local development world from Open77's bundled pristine save.
     *
     * No network session is armed by this operation.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    loadPristine(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Describes the connected server's declared loading screen.
     *
     * Returns availability and the server name so the trusted shell can choose the verified server page or its built-in fallback. This function does not create the WebUI surface; the shell uses `WebUI.create({ loadScreen = true })` for that.
     *
     * @since 2.31.4+op77.11
     * @open77Return table { available, server? }
     */
    loadScreen(this: void): Open77Table;
    /**
     * The language the game runs in, as the engine's own settings store it.
     *
     * Requires `session.locale`. Returns `{ code, gameLanguage, voiceLanguage, subtitles, chromium, revision }`. `code` is a BCP-47 tag derived from the engine's `/language OnScreen` value (`en-US`, `fr-FR`, `pt-BR`, `zh-CN`); `gameLanguage`, `voiceLanguage` and `subtitles` are the three raw engine codes exactly as the settings store them (`en-us`, `jp-jp`, `kr-kr`) -- the same values the vanilla settings screen compares against -- so a resource that needs the audio language, or meets a code the mapping has not seen, always has the source. `chromium` is the operating system's UI language, what a WebUI page's `navigator.language` (the JS `Open77.getLocale()`) has always answered: it is not the game's language and is kept for contrast only. `nil, locale_not_reported` until the script bridge has answered once -- it is asked at every world-ready and again, rate-limited, on every call here, so a language changed at the main menu between two sessions re-reports without a restart (the engine only allows changing it pre-game). The same value is pushed to the server once per world-ready for `Open77.players.locale`.
     *
     * @permission session.locale
     * @since 2.31.13+op77.73
     * @failure game_unavailable_on_this_host, permission_denied:session.locale
     * @open77Return table, or nil | reason: permission_denied:session.locale, locale_not_reported, game_unavailable_on_this_host
     */
    locale(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Every modal layer at once, sampled in one instant.
     *
     * Requires `session.menus`. Returns `open`, `pauseMenu`, `vanillaMenu`, `scenario`, `overlay`, `overlayResource`, `photoMode`, `appearanceEditor`, `characterCreator`, `console` and `source`. One call rather than several because the answer a script wants is the disjunction, and a caller assembling it from separate reads would sample them at different instants and could see it half-true. `source` names the highest-priority layer in the same order the escape key is routed: `overlay`, `creator`, `vanilla`, `photoMode`, `appearance`, `console`, `none`. `scenario` is the vanilla scenario name, empty during gameplay. This is also the payload of `open77:menuStateChanged(open, pauseMenu, source, scenario)`, deliberately: the event and the read describe the same snapshot. The event is an EDGE and is not synthesised at startup -- read this once when your resource starts.
     *
     * @permission session.menus
     * @since 2.31.13+op77.67
     * @open77Return table, or nil, reason
     */
    menuState(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Opens the game's own settings screen without exposing the pause menu.
     *
     * Requests the client-side Open77 settings interface. It only changes local presentation and does not modify server configuration or another player's settings.
     *
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    openSettings(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Exits Cyberpunk 2077 to the desktop.
     *
     * The vanilla exit path, reached through the script bridge rather than by terminating the process: the request is ENQUEUED and runs inside the script frame the bridge loop already owns, because a native call into script without a frame kills the process outright. Fails with `script_bridge_not_attached` before the bridge is up, `queue_full` if the bridge queue is saturated, and `game_unavailable_on_this_host` on a host with no game backend. Intended for the trusted pause surface -- `open77_pause` is the only caller -- and not for gameplay code: quitting a session is `Open77.network.disconnect`, which walks the engine back to the main menu instead of closing the game.
     *
     * @since 2.31.0+op77.6
     * @open77Return true on success, otherwise false | reason
     */
    quitGame(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hands the player to the launcher for a world this boot cannot serve.
     *
     * Opens `open77://connect?server=<serverId>&endpoint=<host:port>&relaunch=<pid>` through the OS protocol handler the OPEN//77 launcher registers. The launcher waits for this process to exit, installs the world's required mods into its profile and starts the game again with an auto-connect to the endpoint. Nothing here terminates the game: the caller quits (Open77.session.quitGame) once this returned true, so a missing launcher is reported instead of leaving the player at the desktop. Both arguments are validated (a GUID-shaped server id, a host:port endpoint) and only that one scheme and query shape can ever be launched, so a resource cannot turn this into a generic open-URL or run-program primitive. Returns true, or false plus a reason: invalid_server_id, invalid_endpoint, launcher_not_registered (no handler for the open77 scheme on this machine), launcher_launch_failed:<code>.
     *
     * @since 2.31.10+op77.26
     * @open77Return true, otherwise false | reason on failure
     */
    relaunchViaLauncher(this: void, serverId: string, endpoint: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Requests the native character creator.
     *
     * Requests the native character creator for the active bootstrap transaction. It requires player.appearance.edit and returns a stable failure when the game backend cannot accept the request.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    requestCharacterCreator(this: void): void;
    /**
     * Resets the local character-bootstrap transaction.
     *
     * Clears the client-local character bootstrap transaction so a fresh bootstrap can begin. It does not delete a server character or change another player's state.
     *
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    resetCharacterBootstrap(this: void): void;
    /**
     * Completes bootstrap with a selected body family.
     *
     * Completes the active bootstrap with the validated female or male body family. It requires player.appearance.edit and only updates the local bootstrap backend.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @open77Return void
     */
    resolveCharacterBootstrap(this: void, family: string): void;
    /**
     * Declares that this resource is able to serve the pause menu.
     *
     * The escape key is only intercepted while this is true. A resource that fails to start therefore leaves the game's own menu reachable, rather than stranding the player with none.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    setMenuReady(this: void, ready: boolean): boolean;
    /**
     * Consumes the pending character-creator result.
     *
     * Consumes the pending native character-creator result once and returns its serialized payload, or nil when no result is ready. It requires player.appearance.edit.
     *
     * @permission player.appearance.edit
     * @since 2.31.0+op77.3
     * @failure game_unavailable_on_this_host, permission_denied:player.appearance.edit
     * @open77Return value | reason (when the first is nil)
     */
    takeCharacterCreatorResult(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77SettingsApi {
    /**
     * Asks the script bridge to list the variables of a group.
     *
     * Asynchronous: request, then read with `values` a beat later.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    request(this: void, group: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Writes a settings variable.
     *
     * Submits one local Open77 setting change through the settings backend. The key, value type and published bounds are validated; use `values()` to read the resulting projection.
     *
     * @since 2.31.0+op77.3
     * @open77Return boolean | reason
     */
    set(this: void, group: string, name: string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The variables as the script last reported them.
     *
     * Returns a snapshot of the settings currently published by the client backend. The returned table is a copy and modifying it does not apply changes.
     *
     * @since 2.31.0+op77.3
     * @open77Return table of { name, value, minimum, maximum, step }
     */
    values(this: void): Open77Table;
}
interface Open77SfxApi {
    /**
     * Stops every SFX owned by the calling resource.
     *
     * Requires `world.effects`; VFX and other resource owners are unaffected.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists active SFX owned by the calling resource.
     *
     * Requires `world.effects`.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable, permission_denied:world.effects
     * @open77Return array of { id, kind, name, entity, remaining }, or nil | reason
     */
    list(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Starts resource-owned spatial audio on an entity.
     *
     * Requires `world.effects`. Options accept `entity`, `emitter`, `tag`, `seekTime`, `duration`, and `unique`; omitting `entity` uses the local player.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable, options_must_be_a_table, permission_denied:world.effects
     * @open77Return effect handle string, or nil | reason
     */
    play(this: void, event: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Plays a non-spatialised (2D) Wwise event -- the frontend door.
     *
     * Client-only; requires `world.effects`. `Open77.sfx.play` posts the sound at an entity, so it always comes from somewhere in the world; a user-interface click comes from nowhere. This posts through `gameGameAudioSystem::Play` with no entity and no emitter, the same call vanilla scripts make for menu sounds. Returns `true` rather than a handle: a frontend one-shot has no emitter to address a stop to, so it is untracked, unstoppable and consumes no effect quota. There is no `volume` and no `pitch` option here or on `play` -- REDengine's audio events carry neither field; the only float in the surface is a bank-authored Wwise RTPC, not a gain. Use `open77_sound` when you need to control loudness or pitch.
     *
     * @permission world.effects
     * @since 2.31.13+op77.67
     * @failure effects_backend_unavailable, invalid_sfx_event, permission_denied:world.effects
     * @open77Return true on success, otherwise nil | failure reason
     */
    play2d(this: void, event: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Plays one voice-over line from an entity's own voiceset -- a bark, not a sound-bank event.
     *
     * Client-only; requires `world.effects`. `voice` is a `voContext` name, the word vanilla passes to `GameObject.PlayVoiceOver` (`greeting`, `fear_beg`, `start_combat`), resolved by the engine against the entity's voiceset; this queues the engine's own `SoundPlayVo` (`entGameplayVOEvent`) on the body. It is the executor behind the server's `Open77.npcs.speak`: the bundled `open77_effects` resource calls it when the one-shot arrives, on every client that has the body streamed, because a voice-over is audible only from a puppet instance. Used directly it is a purely local line. `ignoreFrustum` (default true) speaks off-screen; `ignoreDistance` (default false) skips the engine's distance cull. Returns `true` rather than a handle -- a line cannot be stopped by handle and consumes no quota. Refusals: `invalid_voice`, `options_must_be_a_table`, `invalid_entity`, `entity_unavailable`, `voice_disabled` (the NPC's replicated behaviour policy has its voice off), plus the facade's `world_unavailable`, `native_unavailable`, `invocation_failed`. A name the voiceset does not carry is dropped by the engine without a word.
     *
     * @permission world.effects
     * @since 2.31.13+op77.73
     * @failure effects_backend_unavailable, invalid_entity, invalid_voice, options_must_be_a_table, permission_denied:world.effects
     * @open77Return true on success, otherwise nil | failure reason
     */
    playVoice(this: void, voice: string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops one SFX handle owned by the calling resource.
     *
     * Requires `world.effects`. REDengine stops audio by event name, so identical simultaneous events on one entity may share stop behavior.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    stop(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77StateApi {
    /**
     * The replicated state bag of one vehicle, NPC or prop, read-only.
     *
     * No permission. Accepts `(kind, id)` or `{ kind = , id = }`, where kind is `vehicle`, `npc` or `prop`. The mirror only holds entities this client is streaming.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_state_selector
     * @open77Return bag handle, or nil | reason: invalid_state_selector
     */
    entity(this: void, kind: string | Open77Table, id?: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The local player's own replicated state bag.
     *
     * No permission. Resolved from the live session on every call, so it answers `no_session` before a session exists and `network_unavailable` on a host that does not replicate. `LocalPlayer.state` is the FiveM spelling of the same thing.
     *
     * @since 2.31.13+op77.67
     * @failure network_unavailable, no_session
     * @open77Return bag handle, or nil | reason: no_session, network_unavailable
     */
    localPlayer(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops a state-bag change subscription.
     *
     * No permission. Takes the id returned by `Open77.state.onChange` or by `AddStateBagChangeHandler`.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, otherwise false
     */
    offChange(this: void, subscription: number): boolean;
    /**
     * Watches state-bag changes matching a selector and a key.
     *
     * No permission. The selector is a bag handle, a `{ kind = , id = }` table, a bare kind string, or nil for every bag; the key is a key name or nil for every key. The handler runs at a tick boundary as `fn(selector, key, value, previous)`. Subscriptions die with the resource instance.
     *
     * @since 2.31.13+op77.67
     * @open77Return subscription id, or nil | reason: invalid_state_selector, invalid_state_key, invalid_handler_or_watcher_limit
     */
    onChange(this: void, selector: string | Open77Table, key: string, handler: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The replicated state bag of one player, read-only.
     *
     * No permission. Accepts a player id as a number or its decimal string. A bag this client is not entitled to reads as empty rather than erroring, so a read is always safe.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_state_selector
     * @open77Return bag handle, or nil | reason: invalid_state_selector
     */
    player(this: void, id: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks the server to resend every state bag this client may see.
     *
     * Requires `network.events`. Rarely needed: the host asks for a resync itself whenever the server session changes, and the mirror survives a resource restart because it lives in the host rather than in a VM. Use it after a deliberate local reset.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure permission_denied:network.events
     * @open77Return true when the request was sent, otherwise false | reason: permission_denied:network.events
     */
    ready(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Asks the server to change one state-bag key.
     *
     * Requires `network.events`. An acknowledgement of the SEND, never of the outcome: the server runs the owning resource's validator and republishes, so the mirror only moves when the delta comes back. Refused with `not_requestable` unless a server resource opted the key in. Requests are coalesced per key and leave as one net event at most four times a second -- that is what keeps a naive per-keystroke caller from tripping the transport's 32-inbound-events-per-second disconnect.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_state_key, invalid_state_selector, permission_denied:network.events, state_request_rate_limit, state_value_not_serializable, state_value_too_large
     * @open77Return true when queued for sending, otherwise false | reason: permission_denied:network.events, invalid_state_selector, invalid_state_key, state_value_not_serializable, state_value_too_large, state_request_rate_limit
     */
    request(this: void, selector: string | Open77Table, key: string, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77StatsApi {
    /**
     * Reads the canonical health and stamina state for one player.
     *
     * Requires `players.stats.read` (or the legacy `players.life.read`). Omit `playerId` for the local player. Returns the same combined shape as the server API, including both point pools, maximums, fractions, regeneration flags/rates, armor, god mode, damage attribution and revisions. Client resources cannot mutate these server-owned values.
     *
     * @permission players.stats.read
     * @since 2.31.7+op77.16
     * @open77Return combined stats table, or nil
     */
    get(this: void, playerId?: number): Open77Table | undefined;
    /**
     * Reads one player's canonical health pool.
     *
     * Requires `players.stats.read` (or `players.life.read`). Omit `playerId` for the local player. The table contains `value/current`, `maximum/max`, `fraction`, `percentage`, `regenEnabled`, `regenPerSecond` and `regenerating`.
     *
     * @permission players.stats.read
     * @since 2.31.7+op77.16
     * @open77Return health pool table, or nil
     */
    getHealth(this: void, playerId?: number): Open77Table | undefined;
    /**
     * Reads one player's canonical stamina pool.
     *
     * Requires `players.stats.read` (or `players.life.read`). Omit `playerId` for the local player. The table contains `value/current`, `maximum/max`, `fraction`, `percentage`, `regenEnabled`, `regenPerSecond` and `regenerating`.
     *
     * @permission players.stats.read
     * @since 2.31.7+op77.16
     * @open77Return stamina pool table, or nil
     */
    getStamina(this: void, playerId?: number): Open77Table | undefined;
    /**
     * Alias of `Open77.stats.getHealth`.
     *
     * Reads the replicated server-owned health pool. This alias has exactly the same permission, optional player id and return shape as `getHealth`.
     *
     * @since 2.31.7+op77.16
     * @open77Return health pool table, or nil
     */
    health(this: void, playerId?: number): Open77Table | undefined;
    /**
     * Alias of `Open77.stats.getStamina`.
     *
     * Reads the replicated server-owned stamina pool. This alias has exactly the same permission, optional player id and return shape as `getStamina`.
     *
     * @since 2.31.7+op77.16
     * @open77Return stamina pool table, or nil
     */
    stamina(this: void, playerId?: number): Open77Table | undefined;
}
interface Open77TimeApi {
    /**
     * Monotonic clock, in seconds.
     *
     * Never goes backwards, unlike wall-clock time: this is the one to measure a duration with. Multiply by 1000 only when an API explicitly expects milliseconds.
     *
     * @since 2.31.0+op77.3
     * @open77Return number
     */
    monotonic(this: void): number;
}
interface Open77TravelApi {
    /**
     * Raw half of teleportAndSettle: issues the teleport and returns a settle ticket.
     *
     * Requires `player.travel`. Prefer `Open77.travel.teleportAndSettle`, which wraps this and `settleStatus` in a promise. `timeoutMs` is clamped to 1000..30000, default 12000.
     *
     * @permission player.travel
     * @since 2.31.13+op77.67
     * @open77Return ticket, or nil | reason
     */
    beginSettle(this: void, x: number, y: number, z: number, heading?: number, timeoutMs?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops the live settle session.
     *
     * Requires `player.travel`. The body stays wherever it is; only the watch stops, and its promise rejects with `settle_cancelled`.
     *
     * @permission player.travel
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    cancelSettle(this: void, ticket: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns the current native noclip speed for the local player.
     *
     * Requires `player.travel`. Reads the speed the noclip controller uses right now, whether or not noclip is active; pair it with `isNoclip` to tell the two apart.
     *
     * @permission player.travel
     * @since 2.31.13+op77.73
     * @open77Return number, the noclip speed in metres per second | false, reason (`permission_denied:player.travel`, `travel_unavailable_on_this_host`)
     */
    getNoclipSpeed(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Whether the world-map double-click travel gesture is armed.
     *
     * Returns whether this client has the world-map double-click travel gesture armed. It requires `player.travel` and reports false when the permission or native bridge is unavailable. This is only local input state: it neither teleports the player nor bypasses the ACL check performed by the server command that consumes a picked point.
     *
     * @permission player.travel
     * @since 2.31.7+op77.16
     * @open77Return boolean
     */
    isMapPick(this: void): boolean;
    /**
     * Whether local-player noclip is currently active.
     *
     * Returns false without `player.travel` or when the backend is unavailable.
     *
     * @permission player.travel
     * @since 2.31.0+op77.3
     * @open77Return boolean
     */
    isNoclip(this: void): boolean;
    /**
     * Arms or disarms the world-map double-click travel gesture.
     *
     * Requires `player.travel`. This only lets the local map publish a picked world point; it moves nobody and does not bypass the ACL-checked server command that consumes the point.
     *
     * @permission player.travel
     * @since 2.31.7+op77.16
     * @open77Return true on success, otherwise false | reason
     */
    setMapPick(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or disables native noclip for the local player.
     *
     * Requires `player.travel`. Multiplayer deployments should expose this only behind an ACL-checked server command.
     *
     * @permission player.travel
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    setNoclip(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the local noclip movement speed.
     *
     * Requires `player.travel`; the value must be finite and is validated by the native backend.
     *
     * @permission player.travel
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    setNoclipSpeed(this: void, speed: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the state of a settle ticket.
     *
     * Requires `player.travel`. Returns `{ state, reason, x, y, z, attempts, pins, elapsedMs }` where `state` is `pending`, `settled`, `near`, `failed` or `idle`; `nil, unknown_settle_ticket` for a ticket that is neither the live session nor the last one to finish.
     *
     * @permission player.travel
     * @since 2.31.13+op77.67
     * @failure permission_denied:player.travel, travel_unavailable_on_this_host
     * @open77Return table, or nil | reason
     */
    settleStatus(this: void, ticket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Teleports the local player directly to a world transform.
     *
     * Requires `player.travel`. One queued engine request: it returns before the body has moved and knows nothing about streaming, so a destination whose floor is not resident yet drops the player through it and the engine's fall-under-world failsafe silently returns them to the save's spawn. Use `Open77.travel.teleportAndSettle` for a move that has to be believed, or `Open77.players.teleport` when the server decides. The server respawn transaction is NOT a general move: it refuses unless the player is already dead.
     *
     * @permission player.travel
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    teleport(this: void, x: number, y: number, z: number, heading?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Teleports the local player and resolves when the body is really standing there.
     *
     * Requires `player.travel`. Returns a Promise, or `nil, reason` when the teleport itself was refused. Resolves with `{ state, x, y, z, attempts, pins, elapsedMs }`, where `state` is `settled` (grounded on the point for three consecutive frames) or `near` (on the point but never reported grounded inside the 1.5 s window -- a mark on a prop, or a very slow stream-in). Rejects with `settle_timeout`, `settle_superseded`, `settle_cancelled`, or the reason the teleport refused. There is no streaming query anywhere in the engine surface, so this is the empirical answer: while the body sinks through a floor that has not streamed in, the teleport is re-issued every 250 ms, which resets the fall before the engine's own fall-under-world failsafe can drag the player to the save's spawn. One local player means one session, so a second call supersedes the first.
     *
     * @permission player.travel
     * @since 2.31.13+op77.67
     * @failure invalid_position
     * @open77Return Promise, or nil | reason
     */
    teleportAndSettle(this: void, position: Open77Table, heading?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77VehiclesApi {
    /**
     * Every engine-spawned vehicle near the player that the server does not own.
     *
     * Requires `vehicles.read`. This is the only read on either side that can see a car REDengine spawned: `Open77.vehicles.get`, `nearby`, `closest` and `aimed` all answer from the replicated registry, which is why `aimed()` reports `unknown_entity` when the player is plainly looking at a traffic car. Options are `radius` (default 25, at most 200) and `limit` (default 8, at most 32); a bare number is read as the radius. Nearest first. Each entry carries `engineEntity` (a fixed `0x` string, because a REDengine entity hash does not survive a Lua number), `record`, `recordId`, `adoptable`, `position`, `orientation`, `distance`, `speed`, `speedKph`, `health`, `engineOn`, `locked`, `destroyed`, `doors`, `windows`, `tires`, `brokenGlass`, `brokenLights` and `detachedParts` -- everything the server's `Open77.vehicles.adopt` reads, spelled the same, so an entry can be handed over untouched. `adoptable` is false, and `record` empty, when the car's TweakDBID is not in the shipped reverse table: a shipping build keeps no id-to-name table and `gamedataVehicle_Record` has no `Name` accessor, so the 1376 known 2.31 records are carried and anything else reports its raw id and nothing more. `world_query_layout_unknown` means the targeting part layout has not been proven yet this session -- a precondition shared with the interaction prompts, and reported rather than answered with an empty list, because "the query cannot run" and "there is no car here" need opposite fixes.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_argument, permission_denied:vehicles.read, vehicle_adoption_unavailable_on_this_host
     * @open77Return array of descriptions, or nil | reason
     */
    adoptable(this: void, options?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The replicated vehicle the local player is looking at.
     *
     * Requires `vehicles.read`. One `gametargetingTargetingSystem.GetLookAtObject` probe, right now, mapped through the replica table -- not the permanent inspector ray, which answers nothing unless some resource turned it on. Returns the full vehicle snapshot. `unknown_entity` is the interesting failure and it is COMMON: the player really is looking at a car, and that car is vanilla traffic no server resource created. It does not mean 'nothing is there'.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure aim_probe_unavailable_on_this_host, permission_denied:vehicles.read, unknown_entity, vehicle_snapshot_unavailable_on_this_host
     * @open77Return vehicle snapshot, or nil | reason: permission_denied:vehicles.read, no_target, unknown_entity, aim_probe_unavailable_on_this_host
     */
    aimed(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists every vehicle currently streamed to this client.
     *
     * Requires `vehicles.read`. Returns an empty array when permission or the projection backend is unavailable. Every entry has the exact shape returned by `Open77.vehicles.get`; server vehicles outside the client's streaming interest set are intentionally absent.
     *
     * @permission vehicles.read
     * @since 2.31.0+op77.3
     * @open77Return array of vehicle snapshots
     */
    all(this: void): unknown;
    /**
     * Drops every performance ceiling, instance and record class alike.
     *
     * Requires `vehicles.performance`. Intended for a gamemode teardown so a stopped resource cannot leave cars governed.
     *
     * @permission vehicles.performance
     * @since 2.31.1+op77.9
     * @open77Return true | empty reason
     */
    clearAllPerformance(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes one vehicle's performance ceiling.
     *
     * Requires `vehicles.performance`. The vehicle falls back to its record class profile, then the default, then to untouched native behaviour.
     *
     * @permission vehicles.performance
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    clearPerformance(this: void, vehicleId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a TweakDB record's performance ceiling.
     *
     * Requires `vehicles.performance`. Vehicles of that record fall back to the default profile, then to untouched native behaviour.
     *
     * @permission vehicles.performance
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    clearPerformanceClass(this: void, record: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The nearest replicated vehicle.
     *
     * Requires `vehicles.read`. A bare number is the radius, which is the spelling almost every caller wants; the table form takes the same options as `nearby` plus `radius`, and without one the search is unbounded. `no_vehicle_in_range` is a real answer, not an error. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet. This is the call an RP resource reaches for first, so read that paragraph twice: `closest()` answering a car forty metres away while the player leans on a taxi is the expected behaviour, not a bug.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_radius
     * @open77Return entry, or nil | reason: permission_denied:vehicles.read, invalid_radius, no_vehicle_in_range, no_session, no_local_position
     */
    closest(this: void, radiusOrOptions?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The same description for one named engine-spawned chassis.
     *
     * Requires `vehicles.read`. Takes the `engineEntity` string an `adoptable()` entry carries (a plain integer id also works). `already_managed` means the server already owns that car and it is not a candidate; `vehicle_not_found` means it is not within eighty metres of the player, which is as far as this read looks.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_engine_entity, permission_denied:vehicles.read, vehicle_adoption_unavailable_on_this_host
     * @open77Return description, or nil | reason
     */
    describeAdoptable(this: void, engineEntity: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The replicated vehicle wearing an entity id.
     *
     * Requires `vehicles.read`. Accepts either id a vehicle carries: the Open77 `entity` (what `Open77.players.entity` and a raycast hand back) or the REDengine `engineEntity`. Returns the full snapshot, so `fromEntity(entity).id` is the round trip from a world query to a canonical vehicle id.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_entity, permission_denied:vehicles.read, unknown_entity, vehicle_snapshot_unavailable_on_this_host
     * @open77Return vehicle snapshot, or nil | reason: permission_denied:vehicles.read, invalid_entity, unknown_entity
     */
    fromEntity(this: void, entityId: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one streamed server-owned vehicle.
     *
     * Client read-only API requiring `vehicles.read`. The snapshot contains durable state (`health`, flags, the derived `locked`, `undriveable`/`drivable` and `frozen` booleans -- the last two are server-authored bits no owner report can clear, see `wiki/vehicles.md` -- six door bits, four open-window bits, tyre/glass/light masks, detached panels and the 30-cell body grid), authority and occupants including durable seat-policy flags, an ephemeral generation-checked local entity handle, plus the replicated transform and the latest drivetrain and wheel telemetry. The transform is `position` (a plain `{ x, y, z }`, which is what an Open77 vector3 is), `orientation` as `{ x, y, z, w }`, and `heading`/`yaw` -- one value under both names, in degrees, extracted from the full quaternion so a car on a slope reports the heading it is actually facing, and matching the server vehicle read exactly. Both come from the latest replicated motion when one exists and from the canonical create otherwise, so a proximity query answers for a car whose REDengine projection has not attached yet. `speed` is metres per second, the unit every Open77 read uses, and `speedKph` is the same number converted once because performance ceilings and speed limits are authored in km/h. Open windows and broken glass are separate states. Creation, repair, authoritative seat assignment and arbitrary mutation are server-only; the complete server surface is documented in `wiki/vehicles.md`.
     *
     * @permission vehicles.read
     * @since 2.31.0+op77.3
     * @open77Return table { id, record, entity, engineEntity, revision, physicsOwner, authorityEpoch, flags, locked, health, position, orientation, heading, yaw, doors, windows, tires, bodyDamage, brokenGlass, brokenLights, detachedParts, damage, speed, speedKph, rpm, rpmMax, throttle, brake, steering, wheelRotation, suspensionLongitudinal, suspensionTransversal, burnout, gear, onGround, reversing, streamed, locallyOwned, occupants }, or nil
     */
    get(this: void, id: number): Open77Table | undefined;
    /**
     * Lists the attached weapons selected by the driver.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Uses captured selection for the local driver and replicated selection for observers. Unknown selection returns nil, weapon_state_unavailable; a known empty selection returns an empty table.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Array of weapon tables, or nil, reason
     */
    getActiveWeapons(this: void, vehicleId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads replicated authoritative paint for one streamed vehicle.
     *
     * Requires `vehicles.read`. Returns the separate `applied` flag plus primary and secondary keyed RGB tables. It returns `nil` while the vehicle is unknown or not streamed; the value is read-only on the client.
     *
     * @permission vehicles.read
     * @since 2.31.8+op77.20
     * @open77Return table { applied, primary, secondary }, or nil
     */
    getPaint(this: void, id: number | string): Open77Table | undefined;
    /**
     * Reads a replicated player's canonical vehicle-seat assignment.
     *
     * Client read-only API requiring `vehicles.read`. Omitting `playerId` selects the local player. The result includes `playerId`, `vehicleId`, canonical `seat`, numeric `flags`, `entering`, `exiting`, `forcedEntry`, `exitLocked`, `forcedExit`, plus the current local projection's `streamed` state and ephemeral `entity` handle. It returns nil when no assignment is currently replicated.
     *
     * @permission vehicles.read
     * @since 2.31.7+op77.16
     * @open77Return table { playerId, vehicleId, seat (the canonical name only: seat_front_left, seat_front_right, seat_back_left or seat_back_right -- never driver or passenger, which are accepted aliases, not reported ones), flags (integer bitfield), entering, exiting, forcedEntry, exitLocked, forcedExit (booleans); the client copy adds animatedEntry and occupants }, or nil when the player is not assigned to a vehicle
     */
    getPlayerSeat(this: void, playerId?: number | string): number | undefined;
    /**
     * Reads one weapon mount by its stable one-based index.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. The index comes from weapon.index, not weaponId or slotId. An unattached declared mount is returned with attached=false; invalid indices are rejected.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Weapon table, or nil, reason
     */
    getWeapon(this: void, vehicleId: number, mountIndex: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads the Basilisk's captured or replicated turret inputs.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Returns yaw, pitch and source. These are graph angles in degrees relative to the chassis, not a world aim ray. Other models or unavailable state return nil, weapon_aim_unavailable.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Aim table, or nil, reason
     */
    getWeaponAim(this: void, vehicleId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads available native ammunition counters for a mounted weapon.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Returns available, source, optional magazine/capacity/total/reserve. Ammunition is native-local-driver only; observer counters are not replicated and are omitted, never invented as zero. Counters do not establish whether a mounted weapon has infinite ammo or can fire.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Ammo table, or nil, reason
     */
    getWeaponAmmo(this: void, vehicleId: number, mountIndex: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Counts weapon objects attached to a streamed vehicle.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Returns actual attached count, not declaredCount or activeCount. Zero means a known streamed vehicle with no resolved weapon objects.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return integer, or nil, reason
     */
    getWeaponCount(this: void, vehicleId: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads the weapon mounts declared by a vehicle model.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. This is a TweakDB declaration, not proof that all weapons are attached in an appearance. Returns record, hasWeaponMounts, declaredCount and mounts.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Model table, or nil, reason
     */
    getWeaponModel(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists the weapon objects actually attached to a streamed vehicle.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. The returned array is dense but each weapon.index preserves its one-based position in the model mount list. Do not use the array position as the mount index.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Array of weapon tables, or nil, reason
     */
    getWeapons(this: void, vehicleId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads one coherent mounted-weapon snapshot.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Uses a canonical network vehicle ID. Includes declared mounts, attached/active counts, selection mask, local-driver flag and available native ammo/heat. Local reads are cached for at most 100 ms.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Snapshot table, or nil, reason
     */
    getWeaponState(this: void, vehicleId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads a mounted weapon's stable category.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Categories: machine_gun, cannon, missile, countermeasure, unknown. Native itemType, when available, is a separate field in getWeapon.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return Category string, or nil, reason
     */
    getWeaponType(this: void, vehicleId: number, mountIndex: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of `Open77.vehicles.triggerHorn`.
     *
     * Requires `vehicles.control` and local physics ownership. Duration is bounded to 100..2000 ms and defaults to 250 ms.
     *
     * @permission vehicles.control
     * @since 2.31.9+op77.22
     * @open77Return true on success, otherwise false | reason
     */
    honk(this: void, id: number | string, durationMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Checks whether a streamed vehicle actually has attached weapons.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Counts resolved weapon objects, not the model's inherited mount declarations. An unstreamed vehicle returns nil, vehicle_not_streamed.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return boolean, or nil, reason
     */
    isArmed(this: void, vehicleId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads a canonical vehicle door, trunk, or hood state.
     *
     * Client read-only API requiring `vehicles.read`. Accepts index 0..5, a standard camelCase/snake_case name, or a `Open77.vehicles.doors` constant. This reads the replicated reversible opening mask.
     *
     * @permission vehicles.read
     * @since 2.31.0+op77.3
     * @open77Return boolean, or nil when denied, unavailable, or unknown
     */
    isDoorOpen(this: void, id: number, door: number | string): boolean | undefined;
    /**
     * Reads a vehicle's replicated entry-lock state.
     *
     * Requires `vehicles.read`. Returns the durable server-authoritative lock for a streamed vehicle. This is the vehicle entry lock, not the per-occupant exit lock and not the client-side grid control lock.
     *
     * @permission vehicles.read
     * @since 2.31.9+op77.22
     * @open77Return boolean, or nil when the vehicle is unknown
     */
    isLocked(this: void, id: number | string): boolean | undefined;
    /**
     * Reports the replicated exit-lock policy for a player.
     *
     * Client read-only API requiring `vehicles.read`. Omitting `playerId` selects the local player. Returns nil when the player has no replicated seat assignment; otherwise returns the canonical `exitLocked` boolean.
     *
     * @since 2.31.7+op77.16
     * @open77Return boolean, or nil
     */
    isPlayerExitLocked(this: void, playerId?: number | string): boolean | undefined;
    /**
     * Checks whether the driver selected a particular attached mount.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. Selection is not a firing event or a guarantee of native mesh deployment. Unknown selection is an explicit error.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return boolean, or nil, reason
     */
    isWeaponActive(this: void, vehicleId: number, mountIndex: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads a canonical openable side-window state.
     *
     * Client read-only API requiring `vehicles.read`. Windows use indexes 0..3 and names `frontLeft`, `frontRight`, `backLeft`, and `backRight`. This does not report shattered glass; inspect `brokenGlass` or `damage.glass` in the vehicle snapshot for that.
     *
     * @permission vehicles.read
     * @since 2.31.0+op77.3
     * @open77Return boolean, or nil when denied, unavailable, or unknown
     */
    isWindowOpen(this: void, id: number, window: number | string): boolean | undefined;
    /**
     * Checks whether a vehicle model declares any weapon mounts.
     *
     * Requires `vehicles.read`. Client-side, synchronous and read-only. A valid unarmed model returns false; an unknown model returns nil. Inherited mounts do not guarantee a usable armed vehicle.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.57
     * @open77Return boolean, or nil, reason
     */
    modelHasWeaponMounts(this: void, record: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Every replicated vehicle within a radius, nearest first.
     *
     * Requires `vehicles.read`. Centred on the local player unless `origin` is given. `streamed = true` keeps only the ones with a REDengine projection, `occupied` filters on whether anyone is aboard, `limit` caps the list. Ties are broken by vehicle id so the order does not flicker between frames. Each entry is `{ id, entity, engineEntity, record, distance, streamed, locked, occupants, position }`, and `position` is a plain `{ x, y, z }` -- which is what an Open77 vector3 is, so `#(a.position - b.position)` works on it without a conversion. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_radius
     * @open77Return array of entries, or nil | reason: permission_denied:vehicles.read, invalid_radius, invalid_origin, invalid_limit, no_session, no_local_position
     */
    nearby(this: void, radius: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Which player is in one seat of a replicated vehicle.
     *
     * Requires `vehicles.read`. The `GetPedInVehicleSeat` of FiveM, answering an Open77 player id. A plain `nil` means the seat is free; a `nil` with a reason means the question could not be answered.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @failure invalid_seat, invalid_vehicle_id, permission_denied:vehicles.read, vehicle_not_found, vehicle_snapshot_unavailable_on_this_host
     * @open77Return playerId, or nil | reason: permission_denied:vehicles.read, invalid_vehicle_id, invalid_seat, vehicle_not_found
     */
    occupantInSeat(this: void, id: unknown, seat: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Gearing rating of a vehicle's TweakDB record, in km/h.
     *
     * Requires `vehicles.read`. Returns the speed at which the record's top gear reaches its rated maximum engine RPM, reached through `vehEngineData`. Use it to rank a roster and to pick a ceiling no car has to be slowed much to meet. It is **not** the measured terminal velocity, which torque and aerodynamic drag carry higher. Returns `nil` when the record cannot be resolved.
     *
     * @permission vehicles.read
     * @since 2.31.1+op77.9
     * @open77Return number or nil
     */
    ratedTopSpeed(this: void, vehicleId: number | string): number | undefined;
    /**
     * Hands one engine-spawned chassis back to the population system.
     *
     * Requires `vehicles.adopt`, which is its own permission because this deletes something from the local world rather than reading it. It is the second half of adoption and must run ONLY after the server has accepted the proposal: the canonical vehicle replaces this car, and removing it first deletes a traffic car for nothing. Removal goes through `gameIPopulationSystem::RemoveEntity`, the asynchronous teardown path the world sanitizer already runs every second in production -- never `entEntity.Dispose` or any of the lifecycle functions the debug bridge blocks, which tear an object down while save and AI systems still hold references. `not_offered` means this chassis was not returned by an `adoptable()` or `describeAdoptable()` call in the last minute: an engine entity id is just a number, so being offered is the capability, and without that rule a resource could name an NPC or a door. `managed_vehicle` refuses a car the server owns, `player_mounted` refuses the one the player is sitting in, and a chassis the engine already removed answers true, because the caller wanted it gone and it is.
     *
     * @permission vehicles.adopt
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    releaseAdopted(this: void, engineEntity: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether one seat of a replicated vehicle is free.
     *
     * Requires `vehicles.read`. Read from the replicated occupancy ledger, so it agrees with the server's own answer rather than with the local projection. An occupant whose entry animation is still running counts as present: the seat is reserved and a second entry into it is refused.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: permission_denied:vehicles.read, invalid_vehicle_id, invalid_seat, vehicle_not_found
     */
    seatFree(this: void, id: unknown, seat: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Locks or releases a stopped vehicle's driving inputs.
     *
     * Requires `vehicles.performance`. While locked, the native drive update consumes zero acceleration, zero brake/reverse and no burnout. Releasing restores REDengine's current input snapshot on the next frame; the API never teleports or clamps velocity. Use it for authoritative starting grids after the vehicle is stationary. Like the performance governor, this is client-side gamemode enforcement, not an anti-cheat boundary.
     *
     * @permission vehicles.performance
     * @since 2.31.7+op77.16
     * @open77Return true on success, otherwise false | reason
     */
    setControlLock(this: void, vehicleId: number | string, locked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Freezes or wakes a vehicle's native chassis physics.
     *
     * Requires `vehicles.performance`. Disables the verified REDengine vehicle physics group without changing the authority lease, player-controlled state or mounted workspot. Unlike `setControlLock`, this stops inertia, gravity and external impulses without teleporting the vehicle. Releasing restores the mask and calls the native physics wake-up path. Pair both calls for a starting grid: lock inputs then freeze; on GO thaw then unlock inputs. Unknown or not-yet-streamed vehicles fail so the resource can retry.
     *
     * @permission vehicles.performance
     * @since 2.31.7+op77.16
     * @open77Return true on success, otherwise false | reason
     */
    setFrozen(this: void, vehicleId: number | string, frozen: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Caps one vehicle's top speed and pickup on this client.
     *
     * Requires `vehicles.performance`. Cyberpunk 2077 2.31 has no speed setter, so the ceiling is applied by withdrawing driver throttle where the drive update reads it, tapered across a band so the top of the acceleration curve flattens instead of hitting a wall. The profile table takes `topSpeedKph` (0 leaves the top end alone), `taperKph` (default 12, values under 3 are refused because a narrower band makes the limiter hunt) and `accelerationScale` in (0, 1]. Precedence is instance, then record class, then default. **This is balance, not anti-cheat**: the client that simulates the vehicle applies it, and a modified client can decline to. Cleared automatically on despawn. This is the client-local form and it still works unchanged; the server-authoritative form is `Open77.vehicles.setPerformance` on the server, which takes the same three numbers, replicates them to every viewer and does not need the client to cooperate in deciding them. The two are separate policies over the same native governor, which resolves instance, then record class, then default -- so a client-local instance profile on the same vehicle takes precedence over the replicated one.
     *
     * @permission vehicles.performance
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setPerformance(this: void, vehicleId: number | string, profile: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Caps every present and future vehicle spawned from one TweakDB record.
     *
     * Requires `vehicles.performance`. This is the shape a roster wants: name the cars offered and the ceiling they share once, rather than tracking instances. Same profile table as `setPerformance`. A record class is overridden by an explicit per-instance profile.
     *
     * @permission vehicles.performance
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setPerformanceClass(this: void, record: string, profile: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Presents an authorized replicated occupant with the staged entry path.
     *
     * Requires `vehicles.presentation` and an already-authorized occupancy tuple. Uses the guarded door/workspot presentation for a live remote entry and retains a bounded instant-warp fallback. This is presentation only and never grants a seat or changes physics authority.
     *
     * @permission vehicles.presentation
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    taskPlayerEnterVehicle(this: void, playerId: number | string, vehicleId: number | string, seat: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sounds the horn of a locally simulated vehicle.
     *
     * Requires `vehicles.control`. The vehicle must be streamed and this client must be its current physics owner. Duration is bounded to 100..2000 ms. For an arbitrary vehicle, call the authoritative server API so it can route the request to the current owner.
     *
     * @permission vehicles.control
     * @since 2.31.9+op77.22
     * @open77Return true on success, otherwise false | reason
     */
    triggerHorn(this: void, id: number | string, durationMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Presents a replicated player instantly in an authoritative vehicle seat.
     *
     * Requires `vehicles.presentation`. This is the client meaning of the name: a guarded visual operation for an existing server-owned vehicle and occupancy assignment. It does not claim the seat or physics authority. The exact `(player, vehicle, seat)` tuple must already exist in the replicated ledger or the call fails with `occupancy_mismatch`. The server runtime exposes an identically named authoritative assignment API; the two Lua states are distinct.
     *
     * @permission vehicles.presentation
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    warpPlayerIntoVehicle(this: void, playerId: number | string, vehicleId: number | string, seat: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * A promise that resolves once this client's projection of a vehicle is attached.
     *
     * Requires `vehicles.read`. The replacement for FiveM's `RequestModel` / `HasModelLoaded` loops: streaming is implicit here, so the only honest wait is "does this client have the body yet". Resolves with the `Open77.vehicles.get(id)` snapshot the moment it reports `streamed == true` -- before the call returns when it already does -- and rejects with `timeout` after `timeoutMs` (default 15000, clamped to 1..120000). Listens for `open77:vehicleCreated` (the create arriving; the engine spawn follows, measured up to 3.7 s later) and polls the snapshot every 100 ms until it is attached. The one-shot handler is removed on resolve, on timeout and when the resource stops. `nil, reason` only for a bad id, a bad timeout or a missing permission; an id this client has never seen is waited for and times out, because "not here yet" and "not anywhere" look the same from a client.
     *
     * @permission vehicles.read
     * @since 2.31.13+op77.73
     * @open77Return Promise, or nil | reason: invalid_vehicle_id, invalid_timeout, permission_denied:vehicles.read, promise_unavailable
     */
    whenStreamed(this: void, id: unknown, timeoutMs?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77VfxApi {
    /**
     * Attach an owned world effect to a local native body slot.
     *
     * Requires world.effects. effectId and entity are local handles; slot is a nonempty native slot name up to128 bytes. anchor defaults to body; weaponRight uses the supported equipped weapon anchor. Missing body/slot/weapon is a refusal, not permission to bind an unrelated target. True is native attachment acceptance, not visual proof.
     *
     * @permission world.effects
     * @since 2.31.13+op77.63
     * @open77Return boolean accepted | reason on failure
     */
    attach(this: void, effectId: number | string, entity: number | string, slot: string, anchor?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns the curated stable world-VFX aliases and cooked paths.
     *
     * Catalog access does not start an effect. Raw cooked paths remain build-dependent even when present.
     *
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable
     * @open77Return table mapping alias to effect path, or nil | reason
     */
    catalog(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stops every VFX owned by the calling resource.
     *
     * Requires `world.effects`; SFX and other resource owners are unaffected.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists active VFX owned by the calling resource.
     *
     * Requires `world.effects`.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable, permission_denied:world.effects
     * @open77Return array of { id, kind, name, entity, remaining }, or nil | reason
     */
    list(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Starts a resource-owned world VFX at a fixed transform.
     *
     * Requires `world.effects`. `options` requires `position` and accepts `orientation`, `duration`, and `ignoreTimeDilation`. The effect is released automatically with its owner.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable, invalid_orientation, invalid_position, options_must_be_a_table, permission_denied:world.effects
     * @open77Return effect handle string, or nil | reason
     */
    play(this: void, effect: string, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Starts a resource-owned authored VFX on an entity.
     *
     * Requires `world.effects`. Options accept `entity`, `instance`, `persistOnDetach`, `breakAllLoops`, `breakAllOnDestroy`, and `duration`; omitting `entity` targets the local player.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @failure effects_backend_unavailable, invalid_anchor, options_must_be_a_table, permission_denied:world.effects
     * @open77Return effect handle string, or nil | reason
     */
    playEntity(this: void, effect: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Resolve a typed network target to its currently streamed local handle.
     *
     * Requires world.effects. Accepts {kind="player"|"npc"|"vehicle"|"prop",id=decimalStringOrInteger}. Returns a decimal string local registry handle (local player resolves to1), or nil, reason such as target_not_streamed. Re-resolve after stream/body changes; never send this local handle over the network.
     *
     * @permission world.effects
     * @since 2.31.13+op77.63
     * @failure effects_backend_unavailable, invalid_target, invalid_target_id, invalid_target_kind, permission_denied:world.effects
     * @open77Return decimal string local handle | nil, reason on rejection
     */
    resolveTarget(this: void, target: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Plays one of Cyberpunk's full-screen post-process effects on the local view.
     *
     * Client-only; requires `vfx.screen`, which is deliberately NOT `world.effects` -- covering somebody's eyes is a different power from putting smoke in a street. `name` must be an alias from `Open77.vfx.screenCatalog()`; anything else, including the engine's own effect name, is refused with `unsupported_screen_effect` and never forwarded, because an unknown authored effect name is a SILENT no-op in the engine. `options.strength` (0..1, default 1.0) picks among the tiers the game authored for the `drunk`, `drugged` and `health` families and is ignored by single-tier aliases: 2.31 has no continuous amount channel. `options.duration` is seconds, 0..600; 0 holds until stopped. The handle is an ordinary effect handle -- `Open77.vfx.stop`, `list` and `clear` all work on it. See the Effects guide.
     *
     * @permission vfx.screen
     * @since 2.31.13+op77.67
     * @failure effects_backend_unavailable, invalid_screen_effect, invalid_strength, options_must_be_a_table, permission_denied:vfx.screen
     * @open77Return effect handle string, or nil | reason
     */
    screen(this: void, name: string, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The curated screen-effect aliases and the engine effect name behind each.
     *
     * Client-only and ungated, like `Open77.vfx.catalog`: knowing the vocabulary is not the power, playing it is. Returns `{ [alias] = engineEffectName }`. Tiered families appear as their tiers (`drunk.light`, `drunk.medium`, `drunk.heavy`), never as the bare family name -- the family is an input convenience for `strength`, the tiers are what exists. See the Effects guide.
     *
     * @since 2.31.13+op77.67
     * @failure effects_backend_unavailable
     * @open77Return table of alias to engine effect name
     */
    screenCatalog(this: void): Open77Table;
    /**
     * Set a scalar parameter on an owned native world effect.
     *
     * Requires world.effects. Parameter name is nonempty, at most128 bytes and contains no NUL; value must be finite. The native graph must actually expose the requested parameter. Acceptance does not guarantee visible change and does not modify authoritative gameplay.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @open77Return boolean accepted | reason on failure
     */
    setParameter(this: void, effectId: number | string, name: string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops one VFX handle owned by the calling resource.
     *
     * Requires `world.effects`.
     *
     * @permission world.effects
     * @since 2.31.0+op77.3
     * @open77Return true on success, otherwise false | reason
     */
    stop(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Move an owned native world effect.
     *
     * Requires world.effects. options.position is a finite{x,y,z}; optional orientation{x,y,z,w} must be a nonzero quaternion and is normalized. Updates an existing owned world effect, not the registry target or TTL; use server attached effects for replicated lifetime.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @open77Return boolean accepted | reason on failure
     */
    update(this: void, effectId: number | string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77VoiceApi {
    /**
     * Enumerates active native voice endpoints.
     *
     * Requires `voice.client`. `flow` is `input`, `output`, or `all`; the empty endpoint id represents the current Windows communications default.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @failure invalid_device_flow, permission_denied:voice.client, voice_backend_unavailable
     * @open77Return array of { id, name, flow, default, selected, available }, or nil | reason
     */
    devices(this: void, flow?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads native mouth-presentation policy and tracked-player counts.
     *
     * Requires voice.client. Fields: enabled, sessionActive, mode=audio_envelope, trackedPlayers, availablePlayers, activePlayers. Not phoneme recognition.
     *
     * @permission voice.client
     * @since 2.31.13+op77.63
     * @failure permission_denied:voice.client, voice_backend_unavailable
     * @open77Return status table, or nil, reason
     */
    getLipSyncStatus(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads a player's current facial binding and smoothed voice envelope.
     *
     * Requires voice.client. Fields: playerId, entity, isLocal, enabled, available, active, level (0..1), reason. Unstreamed/custom unsupported heads report unavailable without changing the body animation.
     *
     * @permission voice.client
     * @since 2.31.13+op77.63
     * @failure invalid_player_id, permission_denied:voice.client, voice_backend_unavailable
     * @open77Return state table, or nil, reason
     */
    getPlayerLipSyncState(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Selects a microphone or voice output endpoint.
     *
     * Requires `voice.client`. `flow` is `input` or `output`; an empty id follows the Windows communications default.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    selectDevice(this: void, flow: string, endpointId?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or disables native microphone capture.
     *
     * Requires `voice.client`. Capture alone does not select recipients or bypass PTT/server policy.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setCaptureEnabled(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets local gain for a voice route/channel.
     *
     * Requires `voice.client`. The native engine retains it for current and future streams using that route id.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setChannelVolume(this: void, channelId: number | string, gain: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets microphone gain.
     *
     * Requires `voice.client`. Gain is clamped before the native capture frame is metered and encoded; the pause package persists it per server.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setInputVolume(this: void, gain: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or suppresses local voice-driven mouth presentation.
     *
     * Requires voice.client. False adds this resource's global suppression; true removes only its own suppression. Resource stop/reload/failure releases it. Does not mute audio. See the Voice lipsync guide for setup and client-build requirements.
     *
     * @permission voice.client
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    setLipSyncEnabled(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables local microphone loopback.
     *
     * Requires `voice.client`. This is a bounded local monitor and does not transmit by itself.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setMicrophoneTest(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the global remote-voice gain.
     *
     * Requires `voice.client`. This is local rendering policy and does not affect what any other listener hears.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setOutputVolume(this: void, gain: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Locally blocks or unblocks one remote talker.
     *
     * This affects only local playback. Use the server mute/deaf APIs for authoritative policy.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setPlayerBlocked(this: void, playerId: number, blocked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or suppresses voice-driven lipsync for one network player.
     *
     * Requires voice.client. Positive network player ID, not entity ID. True cannot override another resource's suppression or a global suppression. Per-player policies reset across sessions.
     *
     * @permission voice.client
     * @since 2.31.13+op77.63
     * @open77Return true, or false, reason
     */
    setPlayerLipSyncEnabled(this: void, playerId: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one remote player's local playback gain.
     *
     * Requires `voice.client`. The preference is applied to the native jitter/render path only; it cannot change server reachability.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setPlayerVolume(this: void, playerId: number, gain: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Requests a personal proximity-voice reach.
     *
     * Requires `voice.client`. Queues a reliable request only; the authenticated server clamps it to the advertised minimum/maximum and republishes the canonical value in `status().proximityDistance`. Proximity remains permanently enabled unless server policy disables it; this method cannot change enabled, mute, deaf, buckets, memberships, or recipients.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true when queued or already canonical, otherwise false | reason
     */
    setProximityDistance(this: void, distance: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets PTT state and requested route intent.
     *
     * Requires `voice.client`. Intent may be `proximity`, `channels`, `channel:<id>`, or `all`. `channels` selects up to four authorized speakable memberships and `all` adds proximity. The server still validates every recipient and membership.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setTransmitting(this: void, enabled: boolean, intent?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables VAD and sets its normalized threshold.
     *
     * Requires `voice.client`. Threshold `0` is most sensitive and `1` least sensitive. The native gate uses a short hangover, emits an explicit talkspurt end, and sends no silent talkspurt frames; held PTT may still use bounded Opus DTX.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @open77Return true on success, otherwise false | reason
     */
    setVoiceActivation(this: void, enabled: boolean, threshold?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns one native voice capture/render snapshot.
     *
     * Requires `voice.client`. Includes device ids, gains, input/output levels, PTT/VAD state, packet counters, active talker count, backend states, and the local canonical proximity reach. `proximityDistance` is server-confirmed; `requestedProximityDistance` and `proximityRequestPending` describe an in-flight request. The server-advertised default/minimum/maximum bounds are read-only. It never includes audio payloads.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @failure permission_denied:voice.client, voice_backend_unavailable
     * @open77Return table, or nil | reason
     */
    status(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists native remote-talker playback state.
     *
     * Requires `voice.client`. Each entry contains player id, speaking/level state, local volume/block preference, and authorized active routes.
     *
     * @permission voice.client
     * @since 2.31.1+op77.9
     * @failure permission_denied:voice.client, voice_backend_unavailable
     * @open77Return array of talker snapshots, or nil | reason
     */
    talkers(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77WardrobeApi {
    /**
     * Activates a native outfit or returns to the worn set.
     *
     * Client-only; requires player.equipment.edit. Returns true on accepted native mutation, or nil, reason; acceptance is not rendered completion. Pass an outfit index; false, nil or omitted disables the active outfit. Activation does not itself prove all garment visuals have settled.
     *
     * @permission player.equipment.edit
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, invalid_outfit, permission_denied:player.equipment.edit
     * @open77Return true, or nil, reason
     */
    activate(this: void, index?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads the active native outfit index.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Returns the outfit index or false when no outfit is active; false is not an error.
     *
     * @permission player.equipment.read
     * @since 2.31.13+op77.45
     * @failure equipment_unavailable_on_this_host, permission_denied:player.equipment.read
     * @open77Return index or false, or nil, reason
     */
    active(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Returns slot operations bound to a native outfit index.
     *
     * Client-only; requires player.equipment.read. Failures return nil, reason. Index must be an integer from 0 through 6. The result contains index and bound registry(), equip(record[, slot][, options]), unequip(slot), hide(slot) and apply(slots[, options]) functions; call them with dot syntax. registry requires read permission; mutations separately require player.equipment.edit. hide marks an outfit slot hidden, while unequip removes its override. apply false marks a hidden slot, and replace controls preservation of omitted overrides. Editing does not automatically activate the outfit.
     *
     * @permission player.equipment.edit, player.equipment.read
     * @since 2.31.13+op77.45
     * @failure invalid_outfit, permission_denied:player.equipment.read
     * @open77Return outfit, or nil, reason
     */
    outfit(this: void, index: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77WeaponsApi {
    /**
     * Alias of `Open77.weapons.setActive`.
     *
     * Requires `player.weapons.edit`; see `setActive` for template placement and asynchronous completion semantics. Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, invalid_weapon_slot, invalid_weapon_target, invalid_weapon_template, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    activate(this: void, target: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Alias of `Open77.weapons.snapshot`.
     *
     * Requires `player.weapons.read`; results arrive asynchronously as slot-state events followed by completion. Client state rows append reloading after capacity. The booleans are strings; collect rows by request ID and publish only after successful completion. See [Dual wielding](dual-wielding.md#ammunition-and-hud).
     *
     * @permission player.weapons.read
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, permission_denied:player.weapons.read
     * @open77Return request id, or nil | reason
     */
    all(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Assigns an exact TweakDB weapon template to a standard loadout slot.
     *
     * Requires `player.weapons.edit`. `slot` is 1..6. Options are `active` (default false) and `addToInventory` (default true). The return value only confirms that the validated request was queued; listen for `open77:weapons:completed` for the state verified by REDscript. Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, invalid_weapon_slot, invalid_weapon_template, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    assign(this: void, record: string, slot: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Lists every attachment slot of the weapon in a loadout slot, taken or empty.
     *
     * Requires `player.weapons.read`. Native-parity E3. Read off the live item -- `GetUsedSlotsOnItem` / `GetEmptySlotsOnItem` -- so the answer is the blueprint of the weapon actually there, not a table. One `open77:weapons:part` row per slot arrives before the completion: `(requestId, slot, attachmentSlot, attachmentSlotId, taken, base, record, tweakDbId)`, where `base == "true"` marks the weapon's own receiver, barrel or magazine and `record` names the installed part when `taken`. `attachmentSlot` is spelled from the 2.31 weapon-part vocabulary when the shipping build's reverse name table cannot; `attachmentSlotId` always travels. Refused by name: `invalid_weapon_slot` now, `weapon_slot_empty` from the bridge. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission player.weapons.read
     * @since 2.31.13+op77.73
     * @failure invalid_weapon_options, invalid_weapon_slot, permission_denied:player.weapons.read
     * @open77Return requestId, or nil | reason
     */
    components(this: void, slot: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the quick slots: which gadget is in each, how many, and which one is on the throw hotkey.
     *
     * Requires `player.weapons.read`. Native-parity E4. One `open77:weapons:gadget` row per quick slot arrives before the completion: `(requestId, quickSlot, record, tweakDbId, quantity, active, difference)`; an empty slot has an empty record and quantity `-1`. The same event also carries the consume half without being asked: a row with `requestId == "0"` is the bridge's inventory listener reporting that the engine changed a gadget stack -- `difference` negative for a throw, `quantity` the count left. The bundled `open77_weapons` resource turns those into `open77:weapons:gadgetConsumed(record, tweakDbId, remaining)` locally and into the server's `onGadgetConsumed`. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission player.weapons.read
     * @since 2.31.13+op77.73
     * @failure invalid_weapon_options, permission_denied:player.weapons.read
     * @open77Return requestId, or nil | reason
     */
    gadgets(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Grants a counted stack of grenades (or any quick-slot gadget) and puts it on the throw hotkey.
     *
     * Requires `player.weapons.edit`. The record must be a `Gadget_Record` -- every 2.31 grenade is one (`Items.GrenadeFragRegular`, `Items.GrenadeEMPRegular`, `Items.Preset_Grenade_Smoke_Default`, ...; the `category = grenade` rows of `docs/generated/weapons-2.31.csv`); a weapon answers `template_is_not_gadget`. `count` is 1..999 units added to the stack. Unless `options.equip` is false, the stack is placed in quick slot 1 (`GameplayEquipRequest`) and assigned to `EHotkey.RB` (`HotkeyAssignmentRequest`) and the completion is accepted only when both took. The completion carries `result.gadget = { slot, record, tweakDbId, quantity, active }` after one `open77:weapons:gadget` row. Refused by name: `invalid_gadget_template`, `template_is_not_gadget`, `invalid_gadget_count` now; `unsupported_gadget_area`, `item_creation_failed`, `equip_rejected`, `hotkey_rejected` from the bridge. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission player.weapons.edit
     * @since 2.31.13+op77.73
     * @failure invalid_gadget_count, invalid_gadget_template, invalid_weapon_options, permission_denied:player.weapons.edit
     * @open77Return requestId, or nil | reason
     */
    giveGadget(this: void, record: string, count?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Holsters the currently drawn right-hand weapon.
     *
     * Requires `player.weapons.edit`. Loadout assignments and the selected equipment-area item are unchanged; completion reports whether the right-hand slot became empty.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    holster(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Removes the weapon assigned to one standard slot.
     *
     * Requires `player.weapons.edit`. This unequips the item but does not delete it from inventory. The empty slot is verified asynchronously.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_slot, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    remove(this: void, slot: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Empties one attachment slot of the weapon in a loadout slot; the part goes back to the inventory.
     *
     * Requires `player.weapons.edit`. Native-parity E3. Queues the vanilla `RemoveItemPart` request for the named `AttachmentSlots.*` record and reports once the slot is visibly empty. A slot that is already empty is accepted rather than refused. The weapon's own base parts -- receiver, barrel, magazine, the rows `open77:weapons:part` flags with `base == "true"` -- are refused as `base_part_slot`: removing one breaks the weapon. Immediate refusals: `invalid_weapon_slot`, `invalid_attachment_slot`; from the bridge: `weapon_slot_empty`, `slot_not_on_weapon`, `remove_rejected`. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission player.weapons.edit
     * @since 2.31.13+op77.73
     * @failure invalid_attachment_slot, invalid_weapon_options, invalid_weapon_slot, permission_denied:player.weapons.edit
     * @open77Return requestId, or nil | reason
     */
    removeComponent(this: void, slot: number, attachmentSlot: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Selects and draws a standard weapon by slot or TweakDB template.
     *
     * Requires `player.weapons.edit`. A numeric target must already contain a weapon. A template target reuses an assigned instance or equips it first; options accept fallback `slot` 1..6 and `addToInventory` (default true). Completion is asynchronous through `open77:weapons:completed`. Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, invalid_weapon_slot, invalid_weapon_target, invalid_weapon_template, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    setActive(this: void, target: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sets exact spare and/or loaded ammunition for a weapon slot.
     *
     * Requires `player.weapons.edit`. `amounts` accepts integer `reserve` and `magazine` counts plus optional `activate`. At least one count is required; omitted counts are preserved. The operation verifies the shared ammo total, spare reserve, magazine, and live capacity asynchronously through `open77:weapons:completed`. When both hands share an ammo record, reserve is shared and the total includes both loaded magazines. Editing one magazine preserves the other; await completion before a dependent change. Native dual reloads with too little shared reserve can still allocate rounds inconsistently.
     *
     * @permission player.weapons.edit
     * @since 2.31.2+op77.10
     * @failure invalid_weapon_ammo, invalid_weapon_slot, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    setAmmo(this: void, slot: number, amounts: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Installs a part (scope, muzzle, generic mod) into an attachment slot of the weapon in a loadout slot.
     *
     * Requires `player.weapons.edit`. Native-parity E3. A part is an `Items.*` record tagged `itemPart` (`Items.w_att_scope_short_01`, `Items.w_silencer_01`, `Items.w_muzzle_brake_01`, ...; 928 on 2.31, see `docs/generated/weapon-parts-2.31.csv`) and the slot an `AttachmentSlots.*` record (`Scope`, `PowerModule` for muzzles, `Power_Handgun_WeaponMod1`/`2` for generic mods). The bridge script installs it through the vanilla `ItemModificationSystem` -- the same request the inventory screen queues -- so the part is real: visible on the weapon, kept across holstering, listed by the vanilla screen. Without `options.attachmentSlot` the first of the part's own placement slots this weapon declares is used, empty ones first. A part the player does not own is created for the install; a part already in the slot is swapped out and deleted, as the vanilla screen does. The returned request id proves validation and queuing only; the outcome arrives on `open77:weapons:completed` with `result.part`, preceded by one `open77:weapons:part` row for the slot. Refused by name: `invalid_weapon_slot`, `invalid_part_template`, `template_is_not_part`, `invalid_attachment_slot` now; `weapon_slot_empty`, `slot_not_on_weapon`, `part_does_not_fit_weapon`, `part_does_not_fit_slot`, `base_part_slot`, `install_rejected` from the bridge. Other players do not see the part on the owner's proxy: the proxy weapon is rebuilt from the snapshot's `ItemID`, which does not encode parts. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission player.weapons.edit
     * @since 2.31.13+op77.73
     * @failure invalid_attachment_slot, invalid_part_template, invalid_weapon_options, invalid_weapon_slot, permission_denied:player.weapons.edit
     * @open77Return requestId, or nil | reason
     */
    setComponent(this: void, slot: number, part: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the six supported standard weapon slots.
     *
     * Requires `player.weapons.read`. Slot numbers are one-based and deliberately exclude QuickSlot grenades, WeaponHeavy items, and ArmsCW cyberware. Since Stable 152 on game 2.5, slots 1–3 are primary and 4–6 are their respective secondary partners. See [Dual wielding](dual-wielding.md).
     *
     * @permission player.weapons.read
     * @since 2.31.1+op77.9
     * @failure permission_denied:player.weapons.read
     * @open77Return { 1, 2, 3, 4, 5, 6 }, or nil | reason
     */
    slots(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Requests the verified state of every standard weapon slot.
     *
     * Requires `player.weapons.read`. Emits one `open77:weapons:state` event per available slot and then `open77:weapons:completed`. TweakDB IDs remain opaque hexadecimal strings and are the presence authority; `record` may be empty for items equipped outside this API because shipping builds do not retain every reverse TweakDB name. Client state rows append reloading after capacity. The booleans are strings; collect rows by request ID and publish only after successful completion. See [Dual wielding](dual-wielding.md#ammunition-and-hud).
     *
     * @permission player.weapons.read
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_options, permission_denied:player.weapons.read
     * @open77Return request id, or nil | reason
     */
    snapshot(this: void): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Takes grenades back: some units of a record, or every unit of the gadget on the throw hotkey.
     *
     * Requires `player.weapons.edit`. Native-parity E4. With no record the active gadget (`GetActiveGadget`) is taken; with no count every unit is. A quick slot left with nothing in it is unequipped so the next `gadgets()` does not name a stack of zero. The completion carries `result.gadget` with the remaining `quantity`. Refused by name: `invalid_gadget_template`, `template_is_not_gadget`, `invalid_gadget_count` now; `gadget_not_owned`, `no_active_gadget`, `inventory_update_rejected` from the bridge. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission player.weapons.edit
     * @since 2.31.13+op77.73
     * @failure invalid_gadget_count, invalid_gadget_template, invalid_weapon_options, permission_denied:player.weapons.edit
     * @open77Return requestId, or nil | reason
     */
    takeGadget(this: void, record?: string, count?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of `Open77.weapons.remove`.
     *
     * Requires `player.weapons.edit`; the inventory instance is retained.
     *
     * @permission player.weapons.edit
     * @since 2.31.1+op77.9
     * @failure invalid_weapon_slot, permission_denied:player.weapons.edit
     * @open77Return request id, or nil | reason
     */
    unequip(this: void, slot: number): LuaMultiReturn<[number | undefined, string | undefined]>;
}
interface Open77WebuiApi {
    /**
     * Creates a web surface.
     *
     * Creates a WebUI asynchronously. The handle returns at once and the page is built later, so `page:send` before the page's ready event is dropped; send the first state from `page:on("ui:ready", ...)`. For an initially visible surface, pass `visible = true` and let the page show or hide its own content: showing a surface again after hiding it may not repaint reliably.
     *
     * Options, all optional: `entry` (default: the manifest's `web_ui_page`), `layer`, `zIndex`, `transparent`, `visible`, `width`/`height` (a logical reference size, fitted to the viewport), `fps` (clamped to 60), `policy` and `drawBounds`. Layers: `hud`, `menu`, `modal` (`webui.modal`), `system` (`webui.system`), `debug` (`webui.debug`); a layer sets composition order and takes no focus. `policy` is `strict` (default: only declared files) or `remote` (the page may fetch, embed and open sockets to any HTTP(S) host). An HTTP(S) `entry` does not require `web_files` and is always served as `remote`; bundled entries must be declared. External scripts, media, requests and embeds follow browser CORS and TLS rules. Only the top-level document of the entry origin receives the Lua bridge. An unknown `layer` or `policy` raises a Lua error. See [remote WebUI](/docs/resource-runtime#remote-pages-external-content-and-hot-reload) for runtime requirements.
     *
     * @since 2.31.0+op77.3
     * @failure invalid_webui_draw_bounds, invalid_webui_options
     * @open77Return surface, or nil | reason
     */
    create(this: void, options: Open77Table): LuaMultiReturn<[WebUIPageApi | undefined, string | undefined]>;
    /**
     * The surface declared by `web_ui_page` in the manifest.
     *
     * Returns the auto-created page declared by `ui_page` (alias `web_ui_page`) in the current manifest, or `nil, reason` if none is live. The entry can be a declared local file or an HTTP(S) URL. Handles belong to the resource generation and become stale after destroy or reload. See [remote WebUI](/docs/resource-runtime#remote-pages-external-content-and-hot-reload).
     *
     * @since 2.31.0+op77.3
     * @open77Return surface, or nil
     */
    default(this: void): LuaMultiReturn<[WebUIPageApi | undefined, string | undefined]>;
}
interface Open77WorldApi {
    /**
     * Drops this resource's device-interaction policy for one target.
     *
     * Removes the calling resource's policy for that engine entity or class name, which is not the same as setDeviceInteractionEnabled(target, true): an explicit allow is still a policy this resource holds, while a cleared key is one it no longer has an opinion about. Another resource's refusal on the same target is untouched either way -- every active policy must allow for an interaction to happen. Clearing a key that was never set is not an error, so a resource that tidies up on every path can do so unconditionally. Requires the world.devices permission.
     *
     * @permission world.devices
     * @since 2.31.13+op77.67
     * @open77Return true, otherwise false | reason on failure
     */
    clearDeviceInteraction(this: void, target: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a vanilla device prompt is currently allowed, across every resource.
     *
     * The EFFECTIVE verdict, combining every running resource's policies -- not the calling resource's own claim. A resource that released its policy still reads false while another resource holds one, exactly as Open77.input.isActionBlocked answers for every holder. The same target spelling as setDeviceInteractionEnabled; a decimal id and its 0x form resolve to the same device. Requires the world.devices permission, deliberately the same string as the write: a resource that may not change a policy has no business enumerating what other resources set.
     *
     * @permission world.devices
     * @since 2.31.13+op77.67
     * @failure device_backend_unavailable, invalid_device_target, permission_denied:world.devices
     * @open77Return boolean, or nil | reason on failure
     */
    deviceInteractionEnabled(this: void, target: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Every standing device-interaction policy and who holds it.
     *
     * One row per policy: owner (the resource that set it), enabled, and exactly one of engineEntity or className. Ordered by owner then by key. This is how an admin resource proves a claim really came back, the same role Open77.input.blocks() plays for input claims. Requires the world.devices permission.
     *
     * @permission world.devices
     * @since 2.31.13+op77.67
     * @failure device_backend_unavailable, permission_denied:world.devices
     * @open77Return array of { owner, engineEntity | className, enabled }, or nil | reason on failure
     */
    deviceInteractionPolicies(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The district the local player is standing in.
     *
     * Reads the engine's own district for the player: `Watson`, `Dogtown`, `Arroyo`, and a finer `subDistrict` such as `ClairesGarage` where one is authored. The names are the `gamedataDistrict` enum's, so they are stable identifiers rather than display text; `localized` carries the record's own display name. `position` is optional and is accepted only when it is the local player's own position (within 25 m); any other position is refused with `position_not_local`. That is not a limitation of Open77: Cyberpunk resolves a district by trigger volume, the volume fires when the PLAYER crosses it, and the geometry is baked sector data with no getter, so nothing in the engine maps an arbitrary coordinate to a district and a guessed answer would be worse than a refusal. There is deliberately no `Open77.world.street`: the engine has no street layer, only street names painted onto sign meshes as UI text, so no coordinate has a street. To learn another player's district, listen for `open77:districtChanged` on their client and send it to the server. Requires `world.query`.
     *
     * @permission world.query
     * @since 2.31.13+op77.67
     * @failure invalid_position, permission_denied:world.query, position_not_local, world_unavailable_on_this_host
     * @open77Return table { district, subDistrict?, localized? } -- subDistrict is absent, not empty, when there is none, or nil | reason: permission_denied:world.query, invalid_position, position_not_local, district_unavailable, world_unavailable_on_this_host
     */
    district(this: void, position?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Position, facing, orientation and loaded mesh bounds of one entity, for geometry built on top of it.
     *
     * The engine-side read PolyZone's entity zones are built on. Takes an engine entity id (a number, the `engineEntity` a `nearby` or raycast row carries) or a typed reference `{ kind = "player" | "vehicle" | "npc" | "entity", id = <Open77 id> }`, and answers `{ attached, entity, position, forward, orientation = {x, y, z, w}, bounds?, head?, damage? }`. `bounds` is `{ min, max, source = "loaded_mesh_bounds" }` in world space and is only present while the mesh is streamed in; `head` (puppets) and `damage` (`{ health, revision, attacker?, weapon?, isMelee }`) are likewise omitted rather than fabricated when the engine has nothing to say. Requires `world.query`.
     *
     * Fails with `invalid_entity_kind`, `invalid_entity_id`, `entity_geometry_unavailable`, or the entity resolver's own reason when the id names nothing attached.
     *
     * @permission world.query
     * @since 2.31.13+op77.67
     * @failure entity_geometry_unavailable, invalid_entity_id, invalid_entity_kind, loaded_mesh_bounds, permission_denied:world.query
     * @open77Return table { attached, entity, position, forward, orientation, bounds?, head?, damage? }, or nil | reason on failure
     */
    entityGeometry(this: void, entity: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The engine's effective time scale, its simulation clock, and every live claim.
     *
     * `scale` is the engine's own effective dilation (`GetActiveTimeDilation`), which is what the player is experiencing; it can differ from every claim while a vanilla producer (a deflect, a menu) holds one of its own or while a claim is easing. `simTime` is the engine's game clock in game seconds (`GetGameTimeStamp`): it runs at the day-length multiplier (8x real on the vanilla day, measured 7.97) and dilates with `scale`, so a slow-motion is measured rather than trusted as the ratio of two rates -- its rate against `GetGameTimer()` (the steady clock, which never slows) during the hold over its rate at real time. The rate against the wall clock alone is the day length, not the dilation. `claims` lists every live claim as `{ owner, scale, applied, remainingMs?, phase }`, `phase` being `easingIn`, `holding` or `easingOut` and `remainingMs` absent for an open-ended hold; a server-replicated beat appears under the reserved owner `open77:server`. Ungated.
     *
     * @since 2.31.13+op77.73
     * @failure timescale_unavailable_on_this_host
     * @open77Return table { scale, engineActive, simTime, claims } | nil, reason when no game backend is attached
     */
    getTimeScale(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Height of the static ground below a point, by a downward ray.
     *
     * Casts a `Static`-only ray straight down from `(x, y, fromZ)` over one kilometre and returns the Z of the first surface. Static only on purpose: a parked car or a body is not the ground. The default start height clears every rooftop in Night City. Returns nil when nothing was hit (open water, outside the world). Requires `world.query`.
     *
     * @permission world.query
     * @since 2.31.9+op77.22
     * @failure invalid_position, permission_denied:world.query, world_unavailable_on_this_host
     * @open77Return z (number), or nil when nothing is below | reason on failure
     */
    groundZ(this: void, x: number, y: number, fromZ?: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Every object within a radius of the local player, nearest first.
     *
     * Exposes `Api::WorldQuery::Around`, the engine's own targeting search. It is centred on the local player because the search takes a source object, not a point: to look around somewhere else, stand there. `filter` narrows the object classes: a name, a list of names or a raw mask. Names: `player`, `puppet`, `sensor`, `device`, `other` (classes), `friendly`, `hostile`, `neutral`, `alive`, `dead`, `turnedOn`, `turnedOff`, `quickHackable` (attitude and state bits, which widen a search rather than narrow it). Requires `world.query`.
     *
     * Every row answers two separate questions. **What is it** -- `kind`, from the same classifier the raycast row uses, refined by ownership: an Open77-owned body is `npc`, a vanilla crowd body is `populationNpc`, an Open77 car is `vehicle` and a traffic car is `trafficVehicle`. `family` is the unrefined answer (`npc`, `vehicle`, `device`, `door`, `player`, `weapon`, `item`, `object`, `unknown`) for a caller that means "is this a ped at all".
     *
     * **Whose is it** -- exactly one of `playerId`, `vehicleId` or `npcId` when Open77 owns the entity, and none of the three when it does not. A row with no identity is local scenery: nothing replicates it, every client sees a different one, and it can be gone next frame. `Open77.character.state({ engineEntity = row.engineEntity })` reads such a body, read-only.
     *
     * @permission world.query
     * @since 2.31.9+op77.22
     * @failure permission_denied:world.query
     * @open77Return array of table { engineEntity, entity identity (playerId | vehicleId | npcId), kind, family, className, position { x, y, z }, distance } | reason on failure
     */
    nearby(this: void, radius: number, filter?: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The closest object within a radius of the local player, or nil.
     *
     * Same search, same filter vocabulary and the same row shape as `Open77.world.nearby` -- including `kind`, `family` and the single owner identity -- returning only the first hit. Requires `world.query`.
     *
     * @permission world.query
     * @since 2.31.9+op77.22
     * @failure permission_denied:world.query
     * @open77Return table { engineEntity, entity identity (playerId | vehicleId | npcId), kind, family, className, position { x, y, z }, distance }, or nil | reason on failure
     */
    nearest(this: void, radius: number, filter?: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The ambient population policy the server set for this client's routing bucket.
     *
     * Read-only, and there is no client setter on purpose: density is a server-load decision that has to be the same for every client in a bucket, so there is nothing here to race the server with. `Open77.world.setPopulation` on the server is the write side.
     *
     * `crowd` is a genuine fraction of the vanilla pedestrian density and is applied as one. `traffic` is reported as sent but the engine offers no vehicle density modifier on 2.31, so any value above zero means vanilla traffic -- `trafficGranularity` says `binary` and `crowdGranularity` says `continuous` rather than letting a caller assume otherwise. `applied` is what the engine did with the policy (`Ok`, or a refusal name): a policy can arrive and be refused, and a caller comparing its own numbers against the street needs to see that. Requires `world.query`.
     *
     * `sanitizer` is what this client's own clean-up did with the policy, cumulative since plugin load: `kept` is the unowned bodies the identity sanitizer classified and left alone because the policy allows their kind, `removedNpcs` / `removedVehicles` the ones it took out, `sweeps` how many passes ran. A resource that turned traffic on and sees `removedVehicles` climb between two reads is watching its cars vanish (release 65's defect); `kept` climbing is the street being left alone. Compare two reads rather than trusting one.
     *
     * Fails with `no_population_policy` until a server has sent one. That is a different answer from empty streets and must not be read as one.
     *
     * @permission world.query
     * @since 2.31.13+op77.67
     * @failure no_population_policy, permission_denied:world.query, world_unavailable_on_this_host
     * @open77Return table { bucket, crowd, traffic, police, revision, applied, crowdGranularity, trafficGranularity, sanitizer = { kept, removedNpcs, removedVehicles, sweeps } }, or nil | reason on failure
     */
    population(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Traces a physics ray between two world points and returns the nearest blocking surface.
     *
     * Runs `gameSpatialQueriesSystem::SyncRaycastByCollisionGroup`, the same native the combat and camera code use, against the `Static` and `Dynamic` collision groups and keeps the nearer hit. `options` may disable either group (`{ static = true, dynamic = false }`). The result is what the engine's trace publishes: position, surface normal, material name and distance. With `options.entities = true` it also carries `entity` when the ray stopped on an object rather than on world geometry: `engineEntity`, `className`, `kind`, `position`, `distance`, and one of `playerId`, `vehicleId`, `npcId` or canonical decimal-string `propId` when Open77 owns the thing. Without that option the returned table is unchanged, so existing resources are unaffected. The entity is not read out of the trace, which carries none: the object standing at the hit point is found with the same object search `Open77.world.nearest` uses, so the search is centred on the local player and a hit more than 250 m away cannot be attributed. A hit on a wall, a road or a railing has no entity at all, which is the ordinary answer and not an error. Synchronous, on the game thread; requires the `world.query` permission.
     *
     * @permission world.query
     * @since 2.31.9+op77.22
     * @failure invalid_from, invalid_to, permission_denied:world.query
     * @open77Return table { hit, position { x, y, z }, normal { x, y, z }, material, distance, entity? } (position, normal, material and distance only when hit is true; entity only when options.entities is set AND the ray stopped on an object), or nil | reason: permission_denied:world.query, invalid_from, invalid_to, ray_entities_unavailable_on_this_host, world_unavailable_on_this_host, or the engine status
     */
    raycast(this: void, arg1: Open77Table, to: Open77Table, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Whether the vanilla safe-area marking is currently in effect.
     *
     * Reads the effective safe-area state across every resource that claimed it through `Open77.world.setSafeAreas`: true when the staged interiors behave as vanilla (walk-only, weapons holstered), false while at least one running resource holds the marking off. Requires the `world.safeareas` permission. Returns nil plus a reason when the permission is missing or no game backend is attached.
     *
     * @permission world.safeareas
     * @since 2.31.9+op77.22
     * @failure permission_denied:world.safeareas, safe_area_backend_unavailable
     * @open77Return boolean, or nil | reason on failure
     */
    safeAreasEnabled(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns a vanilla device prompt off, so a resource can put its own there.
     *
     * I3. Cyberpunk has no per-device interactive flag a mod can write, so this wraps the one scripted choke point every device controller passes through: ScriptableDeviceComponentPS::DetermineInteractionState, which is declared on gameDeviceComponentPS, overridden exactly once on the scriptable device PS, and otherwise only on ScriptedPuppetPS, which is not a device. GetActions is overridden by some sixty controller subclasses and is therefore useless as a single gate. When a policy refuses, the wrapper publishes an EMPTY choice set through the class's own PushChoicesToInteractionComponent -- the same call vanilla makes for a device with no valid actions -- so the engine clears the prompt on the layer it chose itself. A second wrapper on InteractiveDevice::OnInteractionUsed refuses the use as well, so a policy that says off means off even if a scene or a subclass reaches the action another way. target is either an engine entity id -- exactly what Open77.world.nearby reports as engineEntity, decimal or 0x -- or a device class name, matched case-insensitively against BOTH names the engine has for a device: the object class (VendingMachine) and the controller persistent state (VendingMachineControllerPS), because the caller reads the first and the hook runs on the second. A class name accepts letters, digits and underscore only: a typo must not become a wildcard that disables half the city. The claim is per resource and additive in the refusing direction -- every active policy must allow an interaction for it to happen -- and everything a resource holds is released when it stops, reloads or crashes. Deliberately NOT under world.query, which is the read gate on nearby: this is a write that changes what the player can do with the world. It does not touch quickhacks, does not power a device down, and is presentation policy on one client rather than authority. Refusals: permission_denied:world.devices, device_backend_unavailable, invalid_device_target, invalid_device_state (a missing or non-boolean second argument is refused rather than read as 'disable'), device_policy_limit.
     *
     * @permission world.devices
     * @since 2.31.13+op77.67
     * @open77Return true, otherwise false | reason on failure
     */
    setDeviceInteractionEnabled(this: void, target: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns the vanilla safe-area marking of staged interiors on or off for this session.
     *
     * Vanilla marks a handful of interiors (the Afterlife, Lizzie's, Clouds) as staged, walk-only, weapons-holstered space. `setSafeAreas(false)` takes that marking off for the duration of the session, which is what makes a lobby staged in the Afterlife playable rather than a walking simulator. The claim is cooperative and owner-scoped: safe areas return once every claiming resource has released (or stopped), never because one resource asked. Requires the `world.safeareas` permission. Returns true plus the effective state across every owner, so a caller can see that another resource still holds safe areas off; false plus a reason on failure (permission_denied:world.safeareas, safe_area_backend_unavailable, invalid_safe_area_argument).
     *
     * @permission world.safeareas
     * @since 2.31.9+op77.22
     * @open77Return true, otherwise false | effective state across owners, or reason on failure
     */
    setSafeAreas(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Slows the local clock for a scripted beat: one claim per resource, eased, timed, released on stop.
     *
     * The FiveM `SetTimeScale` shape, bound onto the engine's own `gameTimeSystem::SetTimeDilation` under a reason named after this resource (`open77:<resource>`), on the global layer only -- so the local body slows with the world, which is what a time scale means. `scale` is 0.05..1; 1 releases this resource's claim. Zero is refused: it freezes input along with the world. `options.durationMs` holds up to an hour (0, the default, holds until released or the resource stops); `options.easeMs` ramps linearly, up to ten seconds, from wherever the clock stands to `scale` and back to 1 at the end, in your milliseconds rather than an engine curve's fixed length.
     *
     * **A claim, not a raw native.** A multiplayer client runs a guard that removes every dilation it can name and, after three seconds of one it cannot, exempts the player from it. A claim registered here tells that guard to stand down for exactly as long as the beat is live. Two resources holding claims are two entries the engine composes by its own rule (the slower wins); nothing here arbitrates between them. Every exit -- deadline, `setTimeScale(1)`, stop, reload, session end, plugin unload -- unsets the entry.
     *
     * **Not a combat mechanic.** The server and every client outside the beat run at real time; a shot at a slowed client is adjudicated in real time. The server half, `Open77.world.setTimeScale(bucket, ...)`, replicates one beat to a whole bucket; the reflex overdrive deliberately touches no clock. Requires `world.timescale`. Reasons: `permission_denied:world.timescale`, `invalid_scale`, `invalid_options`, `invalid_timescale_option:<name>`, `timescale_unavailable_on_this_host`, `native_unavailable`, `player_unavailable` (the world has no local player yet -- a resource's first tick on a fresh client; the dilation layer does not exist before the player does, and writing it then took a client down).
     *
     * @permission world.timescale
     * @since 2.31.13+op77.73
     * @open77Return true | false, reason
     */
    setTimeScale(this: void, scale: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ZonesApi {
    /**
     * The zone's bounding volume: a planar centre and radius plus an optional height band.
     *
     * Available in both runtimes, from the shared prelude scripting/lua/open77_zones.lua. Exactly the shape of the one squared comparison a poll loop wants per zone per tick, and of the radius a server roster scan wants. `minZ` and `maxZ` are nil when the zone is unbounded on that side, which only a polygon with no declared height range can be. This is what makes a polygon affordable: a zone the player is not standing in is rejected by its bounds for about the cost of a sphere (1.25 us against 1.2 us, measured in the client host), so cost tracks the zones that actually overlap the player rather than the number registered.
     *
     * @since 2.31.13+op77.67
     * @open77Return table { x, y, z, radius, minZ, maxZ } (minZ and maxZ may be nil), or nil, reason | reason: the same tokens as Open77.zones.contains
     */
    bounds(this: void, zone: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Is a point inside a zone? The one containment implementation both runtimes share.
     *
     * Available in both runtimes, from the shared prelude scripting/lua/open77_zones.lua. The client poller and the server's Open77.zones.playersIn both call this, which is the point: a client and a server that disagreed at a boundary would leave a place a player can stand where the prompt appears but the grant is refused, or worse the other way round. Shapes: omit `shape` for the cylinder that shipped (planar `radius` around `position` plus a `maxHeight` band, default 6 m); `sphere` is a true 3-D ball and refuses `maxHeight`; `box` takes `position`, `size` (FULL extents) and `rotation` in degrees about the vertical axis; `poly` (alias `polygon`) takes `points` (3..512 planar vertices, concave allowed) with optional `minZ`/`maxZ` -- absent means unbounded on that side; `combo` takes `zones`, nested up to 4 deep. Every shape is CLOSED: a point on an edge, a face or a vertex is inside. `point` is a vector3 or any { x =, y =, z = } table. `options` may carry `grace` (metres to expand the zone outward, with rounded corners -- the server's tolerance for a replicated position, and the client's hysteresis band), `origin` ({ x, y, z } where the zone's anchor actually is right now, which is how an entity-attached zone is tested) and `rotation` (degrees, the zone's heading right now). A definition carrying `attach` REQUIRES `origin`, because resolving an entity is not something pure geometry may do. `false` always means outside and never 'could not tell'. Pure: it reads no world and holds no state. See the Proximity zones guide.
     *
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil, reason | reason: invalid_definition, unknown_shape, invalid_position, invalid_radius, invalid_max_height, max_height_unsupported, invalid_size, invalid_rotation, invalid_points, too_many_points, degenerate_polygon, invalid_height_range, invalid_zones, too_many_zones, zone_nesting_too_deep, invalid_attach, invalid_point, invalid_options, invalid_grace, invalid_origin, origin_required
     */
    contains(this: void, zone: Open77Table, point: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Validates a zone definition once and precomputes everything a containment test needs.
     *
     * Available in both runtimes, from the shared prelude scripting/lua/open77_zones.lua. Returns a prepared zone -- a plain table, so it still survives json.encode and pairs -- carrying the validated shape, its bounding volume and the derived values a test would otherwise recompute. Open77.zones.contains accepts either form, but on a raw definition it has to redo this work on every single call: measured in the client host, a 32-vertex polygon costs about 9.5 us prepared and roughly eight times that unprepared, because the vertex list is rebuilt and the shoelace area re-run before the test can start. Normalize once, keep the result, test many. Shapes: omit `shape` for the cylinder that shipped (planar `radius` around `position` plus a `maxHeight` band, default 6 m); `sphere` is a true 3-D ball and refuses `maxHeight`; `box` takes `position`, `size` (FULL extents) and `rotation` in degrees about the vertical axis; `poly` (alias `polygon`) takes `points` (3..512 planar vertices, concave allowed) with optional `minZ`/`maxZ` -- absent means unbounded on that side; `combo` takes `zones`, nested up to 4 deep. Every shape is CLOSED: a point on an edge, a face or a vertex is inside.
     *
     * @since 2.31.13+op77.67
     * @open77Return table (prepared zone), or nil, reason | reason: the same tokens as Open77.zones.contains
     */
    normalize(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77Api {
    Promise: Open77PromiseApi;
    abilities: Open77AbilitiesApi;
    anchors: Open77AnchorsApi;
    animations: Open77AnimationsApi;
    appearance: Open77AppearanceApi;
    assets: Open77AssetsApi;
    audio: Open77AudioApi;
    blips: Open77BlipsApi;
    callbacks: Open77CallbacksApi;
    camera: Open77CameraApi;
    character: Open77CharacterApi;
    chute: Open77ChuteApi;
    clipboard: Open77ClipboardApi;
    cyberware: Open77CyberwareApi;
    dash: Open77DashApi;
    data: Open77DataApi;
    debug: Open77DebugApi;
    debugDraw: Open77DebugDrawApi;
    doors: Open77DoorsApi;
    elevators: Open77ElevatorsApi;
    environment: Open77EnvironmentApi;
    equipment: Open77EquipmentApi;
    events: Open77EventsApi;
    exports: Open77ExportsApi;
    hacking: Open77HackingApi;
    hud: Open77HudApi;
    input: Open77InputApi;
    inspector: Open77InspectorApi;
    json: Open77JsonApi;
    kvp: Open77KvpApi;
    locomotion: Open77LocomotionApi;
    log: Open77LogApi;
    loot: Open77LootApi;
    map: Open77MapApi;
    markers: Open77MarkersApi;
    motion: Open77MotionApi;
    movement: Open77MovementApi;
    nameplates: Open77NameplatesApi;
    net: Open77NetApi;
    network: Open77NetworkApi;
    npcs: Open77NpcsApi;
    perspective: Open77PerspectiveApi;
    photoMode: Open77PhotoModeApi;
    playerInteractions: Open77PlayerInteractionsApi;
    players: Open77PlayersApi;
    prevention: Open77PreventionApi;
    props: Open77PropsApi;
    puppets: Open77PuppetsApi;
    reflex: Open77ReflexApi;
    resource: Open77ResourceApi;
    runtime: Open77RuntimeApi;
    screen: Open77ScreenApi;
    session: Open77SessionApi;
    settings: Open77SettingsApi;
    sfx: Open77SfxApi;
    state: Open77StateApi;
    stats: Open77StatsApi;
    time: Open77TimeApi;
    travel: Open77TravelApi;
    vehicles: Open77VehiclesApi;
    vfx: Open77VfxApi;
    voice: Open77VoiceApi;
    wardrobe: Open77WardrobeApi;
    weapons: Open77WeaponsApi;
    webui: Open77WebuiApi;
    world: Open77WorldApi;
    zones: Open77ZonesApi;
}

declare const Open77: Open77Api;

interface PromiseApi {
    /**
     * Creates a promise this resource settles itself.
     *
     * The same Open77.Promise object Open77.exports.call and Open77.net.call return, so the runtime has one promise type rather than two: resolve, reject, next, await and status all work on it. On the client a pending promise has a single consumer -- the first await or next woken by a settle takes the value and the promise then reports cancelled -- while on the server it keeps its value and can be awaited repeatedly. Code that awaits once is portable across both. See the FiveM compatibility guide.
     *
     * @since 2.31.13+op77.67
     * @failure export_request_limit
     * @open77Return Open77.Promise
     */
    new: (this: void) => unknown;
}

declare const promise: PromiseApi;

