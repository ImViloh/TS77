/**
 * OPEN//77 server declarations for catalogue build 2.50.0+op77.148.
 * Generated from the official Devkit index. Do not edit by hand.
 * Regenerate with `npm run generate` inside the TS77 repo.
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
 * Authenticated player id while a server network handler runs.
 * The resource runtime assigns it from the connection. It is not a client-supplied argument.
 * Outside a network handler it is unset.
 */
declare const source: number | undefined;

/**
 * Listens for an event in this resource; the same function as Open77.events.on.
 *
 * No permission. One handler list serves three sources: this VM's TriggerLocalEvent, the host-wide bus, and the platform's own lifecycle events (onResourceStart, onPlayerReady, playerDropped), so a resource listens for its own and the platform's events the same way. Every argument of a platform lifecycle event arrives as a **string** -- a player id, a vehicle id, a revision -- so convert with `tonumber` before handing one to a native that wants a number (`Open77.chat.send`) and compare with `tostring(id)` against ids read from natives. Handlers run as managed tasks and may Wait. The limit is 2,048 handlers per resource; beyond it registration raises `handler quota exceeded`. Returns the id RemoveEventHandler takes.
 *
 * @since 2.31.13+op77.45
 * @open77Return handler id
 */
declare function AddEventHandler(this: void, event: string, handler: Open77Callback): number;

/**
 * Subscribes to bag changes, FiveM style.
 *
 * Wraps `Open77.state.onChange` in the FiveM signature. `key` may be a key name, or nil or `"*"` for every key. `bagName` may be nil for every bag, `"global"`, `"player:<id>"`, `"<kind>:<id>"`, or `"entity:<id>"`, which matches any entity kind carrying that id. The handler receives `(bagName, key, value, reserved, replicated)`; `reserved` is always nil and `replicated` always true, so a ported signature lines up. It runs at a tick boundary rather than inside the write, so it may Wait. Only subscribed resources are touched: the filter is on the host side, so one resource's interest in a key does not marshal that key into every other resource.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag
 * @open77Return subscription id | or nil, reason
 */
declare function AddStateBagChangeHandler(this: void, key?: string, bagName?: string, handler?: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Takes a native lift under server authority so every player sees the same cab.
 *
 * The all-positional form of `Open77.elevators.adopt`. `engineEntity` is the lift's engine entity id, which only a client can find (`Open77.elevators.nearby` on the client side); the position is the cab's. `flags` is a bitmask of `1` powered, `2` locked, `4` interaction allowed, `8` doors closed. Answers the elevator id, or `nil, reason`. Requires `world.elevators`. Note the tail order: `flags` is the seventh argument and `floorCount` the eighth, which is why the named form is the safer one to write.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @failure elevators_unavailable, permission_denied:world.elevators
 * @open77Return void
 */
declare function AdoptElevator(this: void, engineEntity: unknown, x: number, y: number, z: number, bucket: number, initialFloor: number, flags: number, floorCount: number);

/**
 * `world.effects`;
 *
 * `world.effects`; decimal effect ID or nil/reason. Prefer `Open77.effects.attach`.
 *
 * @permission world.effects
 * @since 2.31.13+op77.63
 * @failure invalid_argument, permission_denied:world.effects, resource_stopping, world_unavailable
 * @open77Return void
 */
declare function AttachEffect(this: void, targetId: unknown, kind: unknown, effect: unknown, slot: unknown, localAnchor: unknown, localSlot: unknown, ttlMs_: unknown, radius: unknown, hysteresis: unknown, localEvent_: unknown, soundEvent_: unknown, soundOnOwner_: unknown);

/**
 * Low-level alias of `Open77.players.ban`.
 *
 * The low-level form of `Open77.players.ban` (bound to the same native). The two are the same function under two names; `Open77.players.ban` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.ban
 * @since 2.31.13+op77.45
 * @failure ban_failed, invalid_duration, invalid_player_id, invalid_reason, permission_denied:players.ban, server_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function BanPlayer(this: void, playerId: number, reason: string, seconds: number);

/**
 * Server only. Vetoes the cancellable event this handler is running under.
 *
 * Meaningful only inside a handler reached by TriggerCancellableEvent; anywhere else it answers false, not_in_cancellable_event rather than raising. The flag is shared by every resource in the dispatch, so the first cancel wins and the remaining handlers still run and can read it.
 *
 * @since 2.31.13+op77.67
 * @failure not_in_cancellable_event
 * @open77Return true, or false, reason
 */
declare function CancelEvent(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.npcs.tasks.cancel`.
 *
 * The low-level form of `Open77.npcs.tasks.cancel` (bound to the same native). The two are the same function under two names; `Open77.npcs.tasks.cancel` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function CancelNpcTask(this: void, npcId: number, taskId: number, reason: string);

/**
 * Low-level alias of `Open77.npcs.tasks.clear`.
 *
 * The low-level form of `Open77.npcs.tasks.clear` (bound to the same native). The two are the same function under two names; `Open77.npcs.tasks.clear` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function ClearNpcTasks(this: void, npcId: number, channel: number, reason: string);

/**
 * Low-level alias of `Open77.props.clear`.
 *
 * The low-level form of `Open77.props.clear` (bound to the same native). The two are the same function under two names; `Open77.props.clear` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure permission_denied:world.props, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function ClearProps(this: void);

/**
 * Cancels a tick created by SetTick.
 *
 * Answers false for an id that is not a live tick. Cancellation goes through a flag rather than ClearTimeout because a tick pass pulls every due task out of the queue before resuming any of them, and a task cancelled by id while it is already in that batch would be put back. The flag is read at the top of the loop, so the body never runs again after this returns.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean
 */
declare function ClearTick(this: void, id: number): boolean;

/**
 * Cancels a timer created by SetTimeout.
 *
 * Drops the task before it runs. An id that has already fired, or was never issued, is ignored rather than raising.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function ClearTimeout(this: void, id: number);

/**
 * Registers a looping particle effect at a world point and answers its id as a decimal string.
 *
 * The all-positional form of `Open77.effects.create`. The orientation is a quaternion (`qx, qy, qz, qw`), not a yaw, and `visible` is the tenth argument. A registry entry is a **running** system that keeps playing until `Open77.effects.remove` or its `ttl` expires -- `PlayEffect` is the one-shot. Answers `nil, reason` on `invalid_position` or an unknown effect name. Requires `world.effects`.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_position, permission_denied:world.effects, world_unavailable
 * @open77Return void
 */
declare function CreateEffect(this: void, name: string, x: number, y: number, z: number, qx: number, qy: number, qz: number, qw: number, bucket: number, visible?: boolean, radius?: number, hysteresis?: number, ttl?: number);

/**
 * Low-level alias of `Open77.loot.create`.
 *
 * The low-level form of `Open77.loot.create` (wrapped by). The two are the same function under two names; `Open77.loot.create` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.loot
 * @since 2.31.13+op77.45
 * @failure loot_unavailable, permission_denied:world.loot
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function CreateLootDrop(this: void, item: string, quantity: number, x: number, y: number, z: number, bucket: number, pickupRadius: number, label: string, model: string, ttlMs: number);

/**
 * Spawns a server-owned NPC from a 2.31 `Character.*` record and answers its id.
 *
 * The all-positional form of `Open77.npcs.create`. Seventeen arguments in a fixed order, where `aiMode` is `0` tasks / `1` frozen / `2` native / `3` observer and `damagePolicy` is `0` mortal / `1` immortal / `2` invulnerable; `loadoutJson` and `behaviorJson` are JSON **strings**, not tables. Answers the new id, or `nil, reason` when the record, the position or an argument is refused. Requires `world.npcs`. `Open77.npcs.create` takes the same values as a named table and fills in every default -- prefer it, and keep this one for ported code.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @failure npcs_unavailable, permission_denied:world.npcs
 * @open77Return void
 */
declare function CreateNpc(this: void, template: string, x: number, y: number, z: number, yaw: number, bucket: number, appearance: string, loadoutJson: string, aiMode: number, damagePolicy: number, health: number, maxHealth: number, streamingRadius: number, streamingHysteresis: number, despawnWhenUnobserved?: boolean, persistent?: boolean, behaviorJson?: string, authorityPolicy?: string);

/**
 * Places a replicated prop from a catalogue model and answers its id as a decimal string.
 *
 * The all-positional form of `Open77.props.create`. `model` is a catalogue alias (`Open77.props.catalog()` lists them), not a `.mesh` path; `kind` defaults to `"prop"` and `physics` to `"static"`. The id comes back as a **string**, because a prop id does not fit a Lua number. Answers `nil, reason` on `invalid_model`, `invalid_position` or a registry refusal. Requires `world.props`. Prefer `Open77.props.create`, which takes the same values as a table and needs only the four you care about.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_model, invalid_position, permission_denied:world.props, world_unavailable
 * @open77Return void
 */
declare function CreateProp(this: void, model: string, x: number, y: number, z: number, yaw: number, bucket: number, kind?: string, physics?: string, appearance?: string, collision?: boolean, visible?: boolean, scaleX?: number, scaleY?: number, scaleZ?: number, radius?: number, hysteresis?: number, light?: string, ttl?: number);

/**
 * Starts a coroutine this resource's scheduler manages.
 *
 * Its body may Wait, which an ordinary function cannot. Returns the task id. A resource may hold 1,024 scheduled tasks at once and raises `task quota exceeded` beyond that; stopping the resource drops every task it owns. Command, event and callback handlers already run as managed tasks, so they may Wait without a CreateThread of their own.
 *
 * @since 2.31.13+op77.45
 * @open77Return task id
 */
declare function CreateThread(this: void, body: Open77Callback): number;

/**
 * Low-level alias of `Open77.vehicles.create`.
 *
 * The low-level form of `Open77.vehicles.create` (wrapped by). The two are the same function under two names; `Open77.vehicles.create` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure permission_denied:world.vehicles, vehicles_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function CreateVehicle(this: void, record: string, x: number, y: number, z: number, yaw: number, bucket: number, appearance: string, health: number, flags: number, primary1: number, primary2: number, primary3: number, secondary1: number, secondary2: number, secondary3: number);

/**
 * Applies damage to an owned NPC and answers whether it landed.
 *
 * The all-positional form of `Open77.npcs.applyDamage`. `source` defaults to `"script"` and `cause` to `"generic"`; both are free labels carried to the death event, not an enumeration. Answers a plain `true`/`false` with no reason -- `false` covers a missing NPC, one this resource does not own, and a `world.npcs` permission the resource was not granted. An invulnerable NPC takes no damage, so read the health back if you need to know.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function DamageNpc(this: void, id: number, amount: number, source: string, cause: string);

/**
 * Low-level alias of `Open77.players.damage`.
 *
 * The low-level form of `Open77.players.damage` (wrapped by). The two are the same function under two names; `Open77.players.damage` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function DamagePlayer(this: void, playerId: number, amount: number, attacker: number, kindName: string, weaponTdbId: number);

/**
 * FiveM-style alias for `Open77.kvp.delete`.
 *
 * See `SetResourceKvp`.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_operation
 * @open77Return boolean | reason
 */
declare function DeleteResourceKvp(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * DestroySound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function DestroySound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Whether an id is live in the registry that owns that kind.
 *
 * FiveM has one opaque handle space; Open77 has one registry per kind, so the kind has to be named: vehicle, npc, prop, loot, effect, elevator or player. The one-argument FiveM form cannot be answered and is refused with false, kind_required rather than guessed at. Each kind is answered by the registry that already owns it, under that registry's permissions, so a resource that may not read vehicles gets false -- the same answer an absent id gets. Call the namespace function directly when you need to tell denied from absent. Other reasons: id_required, invalid_entity_id, unknown_entity_kind.
 *
 * @since 2.31.13+op77.67
 * @failure id_required, invalid_entity_id, kind_required, unknown_entity_kind
 * @open77Return boolean, or false, reason
 */
declare function DoesEntityExist(this: void, kind: string, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.disconnect`.
 *
 * The low-level form of `Open77.players.disconnect` (bound to the same native). The two are the same function under two names; `Open77.players.disconnect` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.disconnect
 * @since 2.31.13+op77.45
 * @failure invalid_player_id, invalid_reason, permission_denied:players.disconnect, player_not_found, server_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function DropPlayer(this: void, playerId: number, reason: string);

/**
 * Queues one task on an owned NPC's task channel and answers the task id.
 *
 * The all-positional form of `Open77.npcs.tasks.enqueue`, and the single native behind every `Open77.npcs.tasks.*` helper. `parametersJson` is a JSON **string**, not a table -- encode it yourself. `channel` is `0` movement / `1` look / `2` action / `3` full body, and a queued task replaces whatever else that channel is doing at the same or lower `priority`. `timeoutMs` of `0` means no timeout. Answers the task id, or `nil, reason` (`npc_not_found`, a rejected task type). Requires `world.npcs`.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @failure permission_denied:world.npcs
 * @open77Return void
 */
declare function EnqueueNpcTask(this: void, npcId: number, arg2: string, parametersJson: string, channel: number, priority: number, timeoutMilliseconds: number);

/**
 * Addresses one entity's state bag, FiveM style.
 *
 * `Entity(id).state` is `Open77.state.entity(kind, id)` with the kind resolved by looking the id up in the vehicle, NPC and prop registries in turn. FiveM has one entity namespace and Open77 has three, so an id that exists in more than one registry is ambiguous: prefer `Open77.state.entity(kind, id)` in new code and keep this for ported scripts. The bag's audience is the entity's own viewer set, so it is visible exactly when the entity is, and it dies with it.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag
 * @open77Return a table with `state`
 */
declare function Entity(this: void, entityId: number): Open77Table;

/**
 * FiveM-style alias for `Open77.runtime.executeCommand`.
 *
 * Requires `runtime.commands`, and reaches the resource lifecycle only with `resources.control`. That is the one deliberate difference from FiveM, where this call carries console authority undeclared.
 *
 * @permission runtime.commands
 * @since 2.31.13+op77.67
 * @failure invalid_command_line, invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return true when queued, otherwise false | reason
 */
declare function ExecuteCommand(this: void, line: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Publish a server export, or index another resource's exports for a synchronous call.
 *
 * Called, `exports(name, fn)` registers `fn` under `name` for this resource: `true` on success, or `nil, reason` with `invalid_export_name` (empty, longer than 64 characters or containing NUL), `export_function_required`, `export_registration_limit` (256 names per resource) or `resource_stopping`. Registering a name again replaces the previous function, which is what `server_export` entries in the manifest do at start-up through this same call. Indexed, `exports.other:name(...)` or `exports['other-resource']:name(...)` is the synchronous proxy: it runs that resource's export inline in its own VM and returns its values, and **raises** (`export other:name <reason>`) instead of returning `nil, reason`, because FiveM's does and ported resources rely on it. Neither `exports` nor a proxy accepts assignment; `exports.x = f` raises `Open77: exports is not assignable`. No permission on either side. The asynchronous, non-raising spelling is `Open77.exports.call`, which returns an `Open77.Promise`; see [Cross-resource server exports](server-exports.md).
 *
 * @since 2.31.13+op77.45
 * @failure export_function_required, export_registration_limit, invalid_export_name, resource_stopping
 * @open77Return true | nil, reason when the registration is refused
 */
declare function exports(this: void, name: string, fn: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Cover (`out` true) or uncover one player's screen with the native quest fade.
 *
 * Cover (`out` true) or uncover one player's screen with the native quest fade. The client consumes the relay itself, so the target needs no client resource; `options.timeoutMs` (1000-60000, default 15000) is a ceiling the **client** enforces on real time, so a forgotten fade-in costs a pause, not a black screen. See [screen transitions](screen-transitions.md).
 *
 * @permission players.screen
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function FadePlayerScreen(this: void, playerId: unknown, out: unknown, durationMs_: unknown, options_: unknown);

/**
 * Low-level alias of `Open77.vehicles.forcePlayerOutOfVehicle`.
 *
 * The low-level form of `Open77.vehicles.forcePlayerOutOfVehicle` (bound to the same native). The two are the same function under two names; `Open77.vehicles.forcePlayerOutOfVehicle` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function ForcePlayerOutOfVehicle(this: void, playerId: number, vehicleId: number);

/**
 * Reads a convar as a string, or the caller's default.
 *
 * A COMPATIBILITY SHIM for ported code, not the mechanism to reach for when writing something new -- see `Open77.tunables`, which is typed, range-checked, validated on every write, retunable from the Warden panel while the server runs, persisted across a restart, and scoped to the declaring resource. Resolution order: an in-memory `SetConvar` override, then the `convars` block of `server.jsonc`, then **this resource's own declared tunables by exact key**, then the default. That third step is how a port migrates to the better mechanism one key at a time. Never raises: an unset convar answers the default. Names are case-insensitive.
 *
 * @since 2.31.13+op77.67
 * @open77Return string, or the default
 */
declare function GetConvar(this: void, name: string, arg2?: unknown): string;

/**
 * Reads a convar as a boolean, or the caller's default.
 *
 * `true`, `1`, `yes` and `on` are true; `false`, `0`, `no` and `off` are false; anything else is not a boolean and the default stands. The same vocabulary the console's tunable parser accepts, so an operator does not have to remember two.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean, or the default
 */
declare function GetConvarBool(this: void, name: string, arg2?: boolean): boolean;

/**
 * Reads a convar as an integer, or the caller's default.
 *
 * Never raises. A value that is not a whole number answers the default rather than failing -- a ported script reads a convar that may simply not be set, and a strict parse would turn a missing setting into a crash on the first frame.
 *
 * @since 2.31.13+op77.67
 * @open77Return integer, or the default
 */
declare function GetConvarInt(this: void, name: string, arg2?: number): number;

/**
 * Opaque generation identity of this server VM, changed on restart/reload.
 *
 * Opaque generation identity of this server VM, changed on restart/reload.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetCurrentResourceGeneration(this: void);

/**
 * Return this manifest's resource name.
 *
 * The `resource "..."` line of this resource's own `open77.lua`, as the host loaded it. A local read with no permission and no failure; `Open77.resource.name()` is the same function. Compare it with the argument of `onResourceStart` / `onResourceStop` to react to this resource's own lifecycle only.
 *
 * @since 2.31.13+op77.45
 * @open77Return resource name
 */
declare function GetCurrentResourceName(this: void): string;

/**
 * Low-level alias of `Open77.effects.get`.
 *
 * The low-level form of `Open77.effects.get` (bound to the same native). The two are the same function under two names; `Open77.effects.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetEffect(this: void, id: number);

/**
 * Low-level alias of `Open77.effects.all`.
 *
 * The low-level form of `Open77.effects.all` (bound to the same native). The two are the same function under two names; `Open77.effects.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetEffects(this: void, bucket: number);

/**
 * Low-level alias of `Open77.elevators.get`.
 *
 * The low-level form of `Open77.elevators.get` (bound to the same native). The two are the same function under two names; `Open77.elevators.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetElevator(this: void, id: number);

/**
 * Low-level alias of `Open77.elevators.all`.
 *
 * The low-level form of `Open77.elevators.all` (bound to the same native). The two are the same function under two names; `Open77.elevators.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetElevators(this: void, bucket: number);

/**
 * Low-level alias of `Open77.routingBuckets.getEntity`.
 *
 * The low-level form of `Open77.routingBuckets.getEntity` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.getEntity` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetEntityRoutingBucket(this: void, entityId: number);

/**
 * Process-monotonic milliseconds, the clock the server scheduler runs on.
 *
 * The same unit and meaning as Open77.time.monotonic, and not wall clock: it stays correct for durations, epochs and latency even when the host clock is adjusted. Open77.time.unix and Open77.time.utc answer wall clock when that is what you need.
 *
 * @since 2.31.13+op77.45
 * @open77Return integer milliseconds since the process started
 */
declare function GetGameTimer(this: void): number;

/**
 * TweakDBID of a record name -- not a Jenkins hash.
 *
 * CRC-32/ISO-HDLC of the name in the low 32 bits with the name length in byte 4, which is what REDengine computes and the only hash that resolves to anything in this game. It is deliberately NOT the Jenkins one-at-a-time hash FiveM's GetHashKey returns, so a hash constant copied out of a FiveM resource names a GTA model and matches nothing here: port the string, not the number. Non-string input answers nil, invalid_argument. The client computes the identical value, and results are memoised up to 1,024 names per resource.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_argument
 * @open77Return integer TweakDBID, or nil, invalid_argument
 */
declare function GetHashKey(this: void, text: string): number | undefined;

/**
 * Immediate caller resource name inside an exported coroutine;
 *
 * Immediate caller resource name inside an exported coroutine; nil outside it.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetInvokingResource(this: void);

/**
 * Immediate caller's VM generation inside an exported coroutine;
 *
 * Immediate caller's VM generation inside an exported coroutine; nil outside it.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetInvokingResourceGeneration(this: void);

/**
 * Low-level alias of `Open77.loot.get`.
 *
 * The low-level form of `Open77.loot.get` (bound to the same native). The two are the same function under two names; `Open77.loot.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.loot
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetLootDrop(this: void, id: number);

/**
 * Low-level alias of `Open77.loot.all`.
 *
 * The low-level form of `Open77.loot.all` (bound to the same native). The two are the same function under two names; `Open77.loot.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.loot
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetLootDrops(this: void, bucket: number);

/**
 * Low-level alias of `Open77.npcs.get`.
 *
 * The low-level form of `Open77.npcs.get` (bound to the same native). The two are the same function under two names; `Open77.npcs.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpc(this: void, id: number);

/**
 * Low-level alias of `Open77.npcs.getAttitude`.
 *
 * The low-level form of `Open77.npcs.getAttitude` (bound to the same native). The two are the same function under two names; `Open77.npcs.getAttitude` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcAttitude(this: void, id: number);

/**
 * Low-level alias of `Open77.npcs.getRelationship`.
 *
 * The low-level form of `Open77.npcs.getRelationship` (bound to the same native). The two are the same function under two names; `Open77.npcs.getRelationship` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcRelationship(this: void, first: string, second: string);

/**
 * Lists the NPCs in one routing bucket, this resource's own unless asked otherwise.
 *
 * The all-positional form of `Open77.npcs.all`. `bucket` may be `nil` for every bucket. By default the list holds only NPCs this resource created; pass `includeForeign` true to see every resource's, which needs the `npcs.foreign` permission and answers `nil, "permission_denied:npcs.foreign"` without it. Every row carries `owned`, so a shared list can still be filtered. Without `world.npcs` the answer is an empty table, not an error.
 *
 * @permission npcs.foreign, world.npcs
 * @since 2.31.13+op77.45
 * @failure permission_denied:npcs.foreign
 * @open77Return void
 */
declare function GetNpcs(this: void, bucket: number, includeForeign?: boolean);

/**
 * Low-level alias of `Open77.npcs.target`.
 *
 * The low-level form of `Open77.npcs.target` (bound to the same native). The two are the same function under two names; `Open77.npcs.target` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcTarget(this: void, id: number);

/**
 * Low-level alias of `Open77.npcs.tasks.get`.
 *
 * The low-level form of `Open77.npcs.tasks.get` (bound to the same native). The two are the same function under two names; `Open77.npcs.tasks.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcTask(this: void, id: number, taskId: number);

/**
 * Low-level alias of `Open77.npcs.tasks.all`.
 *
 * The low-level form of `Open77.npcs.tasks.all` (bound to the same native). The two are the same function under two names; `Open77.npcs.tasks.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcTasks(this: void, npcId: number);

/**
 * Low-level alias of `Open77.npcs.templates`.
 *
 * The low-level form of `Open77.npcs.templates` (bound to the same native). The two are the same function under two names; `Open77.npcs.templates` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetNpcTemplates(this: void);

/**
 * How many resources this server has discovered.
 *
 * Counts `Open77.resource.list()`, so it counts every discovered resource, running or not.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return integer
 */
declare function GetNumResources(this: void): number;

/**
 * Low-level alias of `Open77.players.distance`.
 *
 * The low-level form of `Open77.players.distance` (bound to the same native). The two are the same function under two names; `Open77.players.distance` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_argument, invalid_position, player_not_found, position_unknown, sessions_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerDistance(this: void, reason: unknown, reason_2: unknown);

/**
 * FiveM-style alias for `Open77.players.endpoint`.
 *
 * Requires `players.identity.sensitive`, like the namespaced spelling. FiveM gates nothing here; Open77 does, and a port that silently logged addresses will start reporting `permission_denied:players.identity.sensitive` until its manifest says what it is doing.
 *
 * @permission players.identity.sensitive
 * @since 2.31.13+op77.67
 * @failure endpoint_unavailable, invalid_player_id, permission_denied:players.identity.sensitive, player_not_found
 * @open77Return "ip:port", or nil | reason
 */
declare function GetPlayerEndpoint(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.getHealth`.
 *
 * The low-level form of `Open77.players.getHealth` (bound to the same native). The two are the same function under two names; `Open77.players.getHealth` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.damage.read, players.life.read, players.stats.read
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerHealth(this: void, playerId: number);

/**
 * Low-level alias of `Open77.players.getHoloCallEyes`.
 *
 * The low-level form of `Open77.players.getHoloCallEyes` (wrapped by). The two are the same function under two names; `Open77.players.getHoloCallEyes` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.holocall.read
 * @since 2.31.13+op77.63
 * @failure holocall_unavailable, invalid_player, permission_denied:players.holocall.read, player_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerHoloCallEyes(this: void);

/**
 * Low-level alias of `Open77.players.identifier`.
 *
 * The low-level form of `Open77.players.identifier` (bound to the same native). The two are the same function under two names; `Open77.players.identifier` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerIdentifier(this: void, playerId: number);

/**
 * One identifier of a connected player, as a bare value.
 *
 * Returns a bare string without a type prefix. Type names are case-insensitive: `open77` and `userId` return the installation identity GUID, `name` the display name, and `fingerprint` the SHA-256 of the identity public key. Since `2.31.13+op77.101`, `license` returns the permanent Open77 account GUID without dashes, `steam` the linked SteamID in lowercase hexadecimal, and `gog` the linked GOG ID in decimal. These ownership fields come from the verified Master ticket; when unavailable, the typed read returns `nil, "identifier_not_linked"`. Unsupported types return `nil, "unknown_identifier_type"`; non-string types return `nil, "invalid_identifier_type"`. Keep identifiers as strings and use `license` for account-level persistence across linked devices. See [account and store identifiers](/docs/connection-control#steam-gog-and-permanent-account-identifiers).
 *
 * @since 2.31.13+op77.67
 * @failure identifier_not_linked, invalid_identifier_type, unknown_identifier_type
 * @open77Return identifier, or nil, reason
 */
declare function GetPlayerIdentifierByType(this: void, playerId: number | string, identifierType: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Every identifier of a connected player, in FiveM's array-of-strings shape.
 *
 * Returns an array of `type:value` strings: `open77:<identity GUID>`, `name:<display name>` and `fingerprint:sha256:<hash>`. Since `2.31.13+op77.101`, the verified Master ticket also supplies `license:<account GUID without dashes>`, `steam:<lowercase hexadecimal SteamID>` and `gog:<decimal GOG ID>` when available. Missing identifiers are omitted; an unknown session returns `nil, "player_not_found"`. Iterate with `for _, id in ipairs(GetPlayerIdentifiers(playerId) or {}) do ... end`. One qualifying Steam or GOG account is sufficient for admission, so do not require both store IDs. No Discord identifier is exposed. For persistence, use the permanent Open77 `license` string. See [account and store identifiers](/docs/connection-control#steam-gog-and-permanent-account-identifiers).
 *
 * @since 2.31.13+op77.67
 * @failure player_not_found
 * @open77Return array of strings, or nil, player_not_found
 */
declare function GetPlayerIdentifiers(this: void, playerId: number | string): unknown | undefined;

/**
 * `{ userId, name, publicKey, fingerprint, joinedAt }` for an admitted player, or `nil`.
 *
 * Alias of `Open77.players.identity`, with no permission required. Returns `{ userId, name, publicKey, fingerprint, joinedAt }` for an admitted player, or `nil`. Since `2.31.13+op77.101`, also includes `license`, `steam` and `gog` when supplied by the verified Master ticket. `license` is the permanent Open77 account GUID without dashes; `steam` is a lowercase hexadecimal SteamID; `gog` is a decimal GOG ID. Values are strings without type prefixes and unavailable fields are omitted. `userId` remains the installation identity GUID; use `license` for account-level persistence across linked devices. `joinedAt` is ISO 8601 UTC. See [account and store identifiers](/docs/connection-control#steam-gog-and-permanent-account-identifiers).
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetPlayerIdentity(this: void, playerId: unknown);

/**
 * FiveM spelling of the age of the newest packet the server holds for a player, in milliseconds.
 *
 * The `ageMs` the rich player read carries -- the same measurement FiveM's native makes -- so a ported AFK or lag check keeps its thresholds. `nil, no_packet_yet` before the first snapshot, `nil, reason` for an unknown player.
 *
 * @since 2.31.13+op77.73
 * @open77Return milliseconds since the last packet, or nil | reason on failure
 */
declare function GetPlayerLastMsg(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.getLifeState`.
 *
 * The low-level form of `Open77.players.getLifeState` (bound to the same native). The two are the same function under two names; `Open77.players.getLifeState` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerLifeState(this: void, playerId: number);

/**
 * FiveM-style alias for `Open77.players.locale`.
 *
 * Same table, same four refusals. FiveM's own `GetPlayerLocale` is not a real native (it reads a client-set convar); here the value is the engine's own language setting, reported by the client host.
 *
 * @permission players.locale.read
 * @since 2.31.13+op77.73
 * @failure invalid_player_id, locale_unavailable, not_reported, permission_denied:players.locale.read, player_not_found
 * @open77Return { code, gameLanguage, voiceLanguage, subtitles, chromium, ageMs, revision }, or nil | reason
 */
declare function GetPlayerLocale(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.name`.
 *
 * The low-level form of `Open77.players.name` (bound to the same native). The two are the same function under two names; `Open77.players.name` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerName(this: void, playerId: number);

/**
 * FiveM-style alias for `Open77.players.ping`.
 *
 * Same value, same three refusals.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_player_id, ping_unavailable, player_not_found
 * @open77Return milliseconds, or nil | reason
 */
declare function GetPlayerPing(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.position`.
 *
 * The low-level form of `Open77.players.position` (bound to the same native). The two are the same function under two names; `Open77.players.position` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerPosition(this: void, playerId: number);

/**
 * Low-level alias of `Open77.players.get`.
 *
 * The low-level form of `Open77.players.get` (bound to the same native). The two are the same function under two names; `Open77.players.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.67
 * @failure invalid_player_id, player_not_found, sessions_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerRead(this: void, playerId: number);

/**
 * Low-level alias of `Open77.routingBuckets.getPlayer`.
 *
 * The low-level form of `Open77.routingBuckets.getPlayer` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.getPlayer` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerRoutingBucket(this: void, playerId: number);

/**
 * Array of every authenticated player id, ascending.
 *
 * Array of every authenticated player id, ascending. The host's roster, so a gamemode no longer needs its own copy built from join/leave events.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetPlayers(this: void);

/**
 * Ids of the authenticated players whose routing bucket is `bucket`, ascending.
 *
 * Ids of the authenticated players whose routing bucket is `bucket`, ascending. `false, invalid_bucket` for a negative or oversized bucket.
 *
 * @since 2.31.13+op77.45
 * @failure invalid_bucket
 * @open77Return void
 */
declare function GetPlayersInBucket(this: void, bucket: unknown);

/**
 * Low-level alias of `Open77.players.nearby`.
 *
 * The low-level form of `Open77.players.nearby` (bound to the same native). The two are the same function under two names; `Open77.players.nearby` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, player_not_found, position_unknown, sessions_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayersNearby(this: void, reason: unknown, radius: number, options: unknown);

/**
 * Who this player is watching, or `0`.
 *
 * Who this player is watching, or `0`.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function GetPlayerSpectateTarget(this: void, playerId: unknown);

/**
 * Everyone watching this player, ascending.
 *
 * Everyone watching this player, ascending.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function GetPlayerSpectators(this: void, playerId: unknown);

/**
 * `{ [playerId] = { x, y, z, bucket } }` for every player with a snapshot younger than two seconds.
 *
 * `{ [playerId] = { x, y, z, bucket } }` for every player with a snapshot younger than two seconds. Players without one are absent, not `nil` entries. One call replaces a loop of `position` over the roster.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetPlayersPositions(this: void);

/**
 * Combined canonical health/stamina snapshot or `nil`.
 *
 * Combined canonical health/stamina snapshot or `nil`.
 *
 * @permission players.damage.read, players.life.read, players.stats.read
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetPlayerStats(this: void, playerId: unknown);

/**
 * FiveM spelling of the live session length, in milliseconds.
 *
 * `Open77.players.sessionStats(playerId).sessionSeconds * 1000` -- milliseconds because that is the unit FiveM documents, so a ported playtime counter divides the way it always did. Ungated. `nil, reason` for an unknown player.
 *
 * @since 2.31.13+op77.73
 * @open77Return milliseconds online, or nil | reason on failure
 */
declare function GetPlayerTimeOnline(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.vehicles.getPlayerSeat`.
 *
 * The low-level form of `Open77.vehicles.getPlayerSeat` (bound to the same native). The two are the same function under two names; `Open77.vehicles.getPlayerSeat` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerVehicleSeat(this: void, playerId: number);

/**
 * Low-level alias of `Open77.weapons.get`.
 *
 * The low-level form of `Open77.weapons.get` (bound to the same native). The two are the same function under two names; `Open77.weapons.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission player.weapons.read
 * @since 2.31.13+op77.67
 * @failure invalid_player_id, permission_denied, weapons_unavailable, weapons_unreported
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetPlayerWeapons(this: void, playerId: number);

/**
 * Low-level alias of `Open77.props.get`.
 *
 * The low-level form of `Open77.props.get` (bound to the same native). The two are the same function under two names; `Open77.props.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetProp(this: void, id: number);

/**
 * Low-level alias of `Open77.props.all`.
 *
 * The low-level form of `Open77.props.all` (bound to the same native). The two are the same function under two names; `Open77.props.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetProps(this: void, bucket: number);

/**
 * Reads one row of the shipped 2.31 record catalogue: a vehicle, weapon, item or NPC.
 *
 * The single native behind `Open77.data.vehicle`, `.weapon`, `.item` and `.npc`, called as `GetRecordData(kind, record)` where `kind` is one of those four names. `record` is a TweakDB **string**, never a Jenkins hash, and is refused over 256 characters. The answer is a table of the catalogue's columns plus `kind`, `source = "catalogue"` and `build = "2.31"`; an empty cell is absent rather than an empty string, so `row.displayName or row.record` works. Answers `nil, reason` -- `invalid_kind`, `invalid_record`, `record_unknown`. Display names are not localised here: send `localeKey` to a client and localise it there.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_kind, invalid_record, record_unknown
 * @open77Return void
 */
declare function GetRecordData(this: void);

/**
 * FiveM-style alias for `Open77.runtime.commands`.
 *
 * Entries carry `source` in addition to FiveM's `name` and `resource`, because this list has two origins.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return array of tables, or nil | reason
 */
declare function GetRegisteredCommands(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * The name of one discovered resource, by ZERO-based index.
 *
 * The one zero-based function in this API, because it exists only so that a `for i = 0, GetNumResources() - 1` loop copied out of a FiveM resource runs unchanged. Prefer `Open77.resource.list()`, which is an ordinary 1-based Lua array carrying state and version as well.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return string, or nil
 */
declare function GetResourceByFindIndex(this: void, index: number): string | undefined;

/**
 * FiveM-style alias for `Open77.kvp.get`.
 *
 * See `SetResourceKvp`.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_operation
 * @open77Return value, default or nil | reason
 */
declare function GetResourceKvp(this: void, key: string, arg2?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * FiveM-style alias for `Open77.resource.metadata`.
 *
 * FiveM's third `index` argument is not accepted: an Open77 manifest directive is a list, returned whole, rather than a repeated key addressed by position.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return table or field value, or nil | reason
 */
declare function GetResourceMetadata(this: void, name: string, key?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * Return the current server resource state: `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name the server does not know.
 *
 * Return the current server resource state: `discovered`, `starting`, `running`, `stopping`, `stopped`, `failed`, `blocked`, or `missing` for a name the server does not know. There is no `started`: the running state is `running`.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetResourceState(this: void, resourceName: unknown);

/**
 * The screen-effect aliases this server accepts, ascending.
 *
 * The screen-effect aliases this server accepts, ascending.
 *
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function GetScreenEffectCatalog(this: void);

/**
 * GetSoundState: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return table, or nil, reason
 */
declare function GetSoundState(this: void, id: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;

/**
 * wall-clock seconds since 1970 UTC, fractional
 *
 * wall-clock seconds since 1970 UTC, fractional
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetUnixTime(this: void);

/**
 * the same instant as an ISO 8601 string
 *
 * the same instant as an ISO 8601 string
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function GetUtcTimestamp(this: void);

/**
 * Low-level alias of `Open77.vehicles.get`.
 *
 * The low-level form of `Open77.vehicles.get` (bound to the same native). The two are the same function under two names; `Open77.vehicles.get` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetVehicle(this: void, id: number);

/**
 * Low-level alias of `Open77.vehicles.all`.
 *
 * The low-level form of `Open77.vehicles.all` (bound to the same native). The two are the same function under two names; `Open77.vehicles.all` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GetVehicles(this: void, bucket: number);

/**
 * The server-wide state bag, as a table.
 *
 * The FiveM spelling of `Open77.state.global`, and the same bag: `GlobalState.hour = 21` is `Open77.state.global:set("hour", 21)`. Reading a key that was never set answers nil. Writing needs the `state.write` permission and raises on refusal, because an assignment has no second return value to carry a reason; use `Open77.state.global:set` when you want to handle `false, reason` yourself. Every player in every routing bucket receives a global bag, so it is the one selector with no audience filter.
 *
 * @since 2.31.13+op77.67
 * @open77Return the global bag, indexable by key
 */
declare function GlobalState(this: void): unknown;

/**
 * Low-level alias of `Open77.elevators.goTo`.
 *
 * The low-level form of `Open77.elevators.goTo` (wrapped by). The two are the same function under two names; `Open77.elevators.goTo` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function GoToElevator(this: void, id: number, floor: number, travelMilliseconds: number, force?: boolean);

/**
 * Low-level alias of `Open77.players.heal`.
 *
 * The low-level form of `Open77.players.heal` (bound to the same native). The two are the same function under two names; `Open77.players.heal` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function HealPlayer(this: void, playerId: number, amount: number);

/**
 * True in this VM; the client's answer is false.
 *
 * The one call that lets a single shared_script branch between the two runtimes, and the only reason a shared file needs to know which side it is on. It takes no arguments and cannot be spoofed: the two runtimes install two different functions.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_tick_function, task_limit_or_stopping
 * @open77Return true
 */
declare function IsDuplicityVersion(this: void): boolean;

/**
 * Whether a connected player holds a permission; the same function as Open77.acl.isAllowed.
 *
 * Requires acl.read. The FiveM spelling, addressed by session player id, with the same answer and the same permission as the namespaced call. Use IsPrincipalAceAllowed to ask by account id instead.
 *
 * @permission acl.read
 * @since 2.31.13+op77.67
 * @open77Return boolean, or false, reason
 */
declare function IsPlayerAceAllowed(this: void, playerId: number | string, permission: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.players.isDead`.
 *
 * The low-level form of `Open77.players.isDead` (bound to the same native). The two are the same function under two names; `Open77.players.isDead` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function IsPlayerDead(this: void, playerId: number);

/**
 * Whether the canonical life state is currently frozen, by any resource.
 *
 * Whether the canonical life state is currently frozen, by any resource.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function IsPlayerFrozen(this: void, playerId: unknown);

/**
 * Whether the canonical life state is currently ghosted.
 *
 * Whether the canonical life state is currently ghosted.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function IsPlayerGhosted(this: void, playerId: unknown);

/**
 * Whether the canonical life state says this player is rendered.
 *
 * Whether the canonical life state says this player is rendered. Answered from the server bit, never probed from a client.
 *
 * @permission players.life.read
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function IsPlayerVisible(this: void, playerId: unknown);

/**
 * The same ACL check, addressed by account id instead of session id.
 *
 * Requires acl.read. FiveM principals are durable; Open77 resolves permissions through the connected session, so a user who is not connected cannot be answered at all -- that is false, principal_not_connected rather than a bare false, which would read as "denied". The account id is matched against the connected players' identifiers case-insensitively.
 *
 * @permission acl.read
 * @since 2.31.13+op77.67
 * @failure invalid_permission, invalid_player_id, invalid_user_id, permission_denied:acl.read, principal_not_connected
 * @open77Return boolean, or false, reason
 */
declare function IsPrincipalAceAllowed(this: void, userId: string, permission: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Alias of GetHashKey; returns a TweakDBID.
 *
 * The same function value under the name ported code uses. Kept so that code reads naturally, but it is not the Jenkins hash the name promises -- see GetHashKey before copying any hash constant across.
 *
 * @since 2.31.13+op77.67
 * @open77Return integer TweakDBID, or nil, invalid_argument
 */
declare function joaat(this: void, text: string): number | undefined;

/**
 * Low-level alias of `Open77.npcs.kill`.
 *
 * The low-level form of `Open77.npcs.kill` (bound to the same native). The two are the same function under two names; `Open77.npcs.kill` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function KillNpc(this: void, id: number, reason: string);

/**
 * Kills a player where they stand and answers whether the life ledger accepted it.
 *
 * The all-positional form of `Open77.players.kill`. `cause` must be one of `firearm`, `melee`, `explosion`, `fall`, `vehicle`, `environment`, `script`, `unknown` -- anything else is `invalid_argument`, so a label like `"admin"` does not work here. `killer` may be `nil` or `0` for no killer, `weapon` defaults to `resource:<your resource>`, and the optional impulse is capped at 1000 per axis. Answers `false, reason` (`player_not_found`, `invalid_argument`, `permission_denied:players.life.kill`). Requires `players.life.kill`.
 *
 * @permission players.life.kill
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function KillPlayer(this: void, playerId: number, killer: number, causeName: string, weapon: string, impulseX?: number, impulseY?: number, impulseZ?: number);

/**
 * Reads a file belonging to the calling resource.
 *
 * The FiveM spelling of Open77.io.read, and no more powerful: on the server the path resolves under this resource's own data/ directory and requires the filesystem.read permission. Naming another resource answers nil, cross_resource_read_denied rather than quietly reading your own file -- cross-resource file access does not exist here, and pretending otherwise would make ported code look like it works. The client has the same global rooted at the resource directory instead, with no permission and a 1 MiB cap.
 *
 * @permission filesystem.read
 * @since 2.31.13+op77.67
 * @failure cross_resource_read_denied, invalid_argument, permission_denied:filesystem.read
 * @open77Return file contents, or nil, reason
 */
declare function LoadResourceFile(this: void, resourceName: string, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.elevators.pause`.
 *
 * The low-level form of `Open77.elevators.pause` (bound to the same native). The two are the same function under two names; `Open77.elevators.pause` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function PauseElevator(this: void, id: number);

/**
 * PauseSound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function PauseSound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Performs an outbound HTTP request, off the tick thread.
 *
 * Requires http.request, and the server must have enabled the bridge with a host allow-list. The request leaves the tick thread at once and the callback runs on this resource's own scheduler with (status, body, headers, err); status is 0 when the exchange did not complete and err then names the reason. method defaults to GET; body may be a string or a table, which is JSON-encoded for you, up to 256 KiB. A request refused before it leaves answers false, reason and still calls the callback with status 0. Namespaced as Open77.http.request.
 *
 * @permission http.request
 * @since 2.31.13+op77.45
 * @failure http_unavailable, invalid_body, invalid_headers, invalid_method, invalid_request_id, invalid_url, permission_denied:http.request, too_many_headers
 * @open77Return true, or false, reason
 */
declare function PerformHttpRequest(this: void, url: string, callback?: Open77Callback, method?: string, body?: string | Open77Table, headers?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Play2DSound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return integer handle, or nil, reason
 */
declare function Play2DSound(this: void, asset: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;

/**
 * Play3DSound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return integer handle, or nil, reason
 */
declare function Play3DSound(this: void, asset: string, position: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;

/**
 * Plays a one-shot particle effect at a world point for everyone in range.
 *
 * The all-positional form of `Open77.effects.play`. Unlike `CreateEffect` nothing is registered: the burst plays once on every client within `range` metres of the point and is gone, so there is no id to remove. The orientation is a quaternion. An optional `sound` event plays with it. Answers `true`, or `nil, reason` on `invalid_position` or an unknown effect. Requires `world.effects`.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_position, permission_denied:world.effects, world_unavailable
 * @open77Return void
 */
declare function PlayEffect(this: void, name: string, x: number, y: number, z: number, qx: number, qy: number, qz: number, qw: number, bucket: number, range: number, sound?: string);

/**
 * Low-level alias of `Open77.effects.playOn`.
 *
 * The low-level form of `Open77.effects.playOn` (wrapped by). The two are the same function under two names; `Open77.effects.playOn` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, permission_denied:world.effects, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function PlayEntityEffect(this: void, target: number, name: string, duration: number, loop?: boolean, slot?: string, targetKind?: string);

/**
 * Plays a sound event on an entity, so it follows that entity instead of a fixed point.
 *
 * The all-positional form of `Open77.effects.sound`. `targetKind` says what the id names and defaults to `"player"`; `unique` (third argument) stops the same `actionId` playing twice over itself; `duration` defaults to 5 seconds. The seventh argument is a table of player ids who will not hear it. Answers `true`, or `nil, reason` -- `invalid_sound_exclusions` when that table is malformed. Requires `world.effects`.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_sound_exclusions, permission_denied:world.effects, world_unavailable
 * @open77Return void
 */
declare function PlayEntitySound(this: void, target: number, soundEvent: string, unique?: boolean, targetKind?: string, duration?: number, actionId?: string, excluded?: unknown);

/**
 * Addresses one player's state bag, FiveM style.
 *
 * `Player(id).state` is `Open77.state.player(id)`, and `Player(id).source` answers the id back, so a ported script that passes a player object around keeps working. An unknown id still returns a handle: the bag is created on first write and dies when the player disconnects. The bag reaches every player who can see that player, which is the roster of their routing bucket, so it is not a private channel.
 *
 * @since 2.31.13+op77.67
 * @open77Return a table with `state` and `source`
 */
declare function Player(this: void, playerId: number): Open77Table;

/**
 * `boolean, reason?` — a full-screen post-process on ONE player.
 *
 * `boolean, reason?` — a full-screen post-process on ONE player. Not replicated; permission `players.screenfx`. `name` false clears. See [Screen effects](effects.md#screen-effects).
 *
 * @permission players.screenfx
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function PlayerScreenEffect(this: void, playerId: unknown, name: unknown, opts_: unknown);

/**
 * PlaySound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function PlaySound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Write a resource-prefixed line to the server log.
 *
 * The FiveM spelling of `Open77.log.info`: every argument is converted with the usual `tostring` rules, joined with a tab, and written to the host logger at `INF` under this resource's name -- there is no console of its own to write to. Control sequences (ANSI colours, cursor moves) are stripped before the line reaches the log, so a ported script's coloured output cannot corrupt the terminal or the log file. Returns nothing and never fails; no permission. `Open77.log.debug`, `warn` and `error` are the same call at the other levels.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function print(this: void, ...args: unknown[]);

/**
 * Builds a quaternion: a plain { x, y, z, w } table with three rotation methods.
 *
 * Available in both runtimes. Deliberately minimal -- normalize (a zero quaternion becomes the identity, never NaN), mul (Hamilton product, this rotation then the other) and rotate (returns a vector3), plus unpack and table. No arithmetic operators and no #. It exists so the { x =, y =, z =, w = } orientation that Open77.effects and Open77.props already accept becomes computable; the result stays exactly that table. Identical on both runtimes by construction: one file, scripting/lua/open77_vector.lua, is embedded by the client build and by the server assembly, so the semantics cannot drift.
 *
 * @since 2.31.13+op77.67
 * @open77Return quat, or nil, reason
 */
declare function quat(this: void, x: number, y: number, z: number, w: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Registers a command usable from the server console and from chat.
 *
 * No permission to register. The handler receives `(source, args, raw)`: `source` is a number -- the player id, or `0` for the server console and Warden; `args` is `table.pack` of the arguments after the command name, so `args.n` is their count and every one is a **string** (`"42"`, not `42`); `raw` is the command name followed by those arguments joined with single spaces, without the leading `/`. From chat the client splits the line shell-style (quotes group words, backslash escapes, at most 32 arguments) before sending it; from the console the line is split on spaces only, so quotes arrive literally. A chat `/name` and a console `name` reach the same handler, which runs on the next scheduler tick, not inline. Names are 1 to 64 characters of letters, digits, `_`, `.`, `:` or `-`, matched case-insensitively; registering one twice raises `duplicate command`. With `restricted = true` a player must hold the ACL entry `command.<name>` (lower-case) -- the console always may -- see Identity and ACL.
 *
 * @since 2.31.13+op77.45
 * @open77Return true
 */
declare function RegisterCommand(this: void, name: string, handler: Open77Callback, restricted?: boolean): boolean;

/**
 * Registers a handler for an authenticated client event; the same function as Open77.net.on.
 *
 * Requires network.events. During the handler the global `source` is set from the authenticated connection and never from the client's payload -- that is the whole difference from AddEventHandler. Called with the name alone it only marks the name as reachable from a client and registers nothing. Such a handler also receives host-wide bus events, so one that acts on authority must validate `source` rather than assume it. Events carry at most 32 arguments in a 48 KiB envelope.
 *
 * @permission network.events
 * @since 2.31.13+op77.45
 * @open77Return handler id, or true when only the name is declared
 */
declare function RegisterNetEvent(this: void, event: string, handler?: Open77Callback): number;

/**
 * Low-level alias of `Open77.effects.remove`.
 *
 * The low-level form of `Open77.effects.remove` (bound to the same native). The two are the same function under two names; `Open77.effects.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, not_found, permission_denied:world.effects, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveEffect(this: void, id: number, reason?: string);

/**
 * Low-level alias of `Open77.elevators.remove`.
 *
 * The low-level form of `Open77.elevators.remove` (bound to the same native). The two are the same function under two names; `Open77.elevators.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveElevator(this: void, id: number);

/**
 * Removes a handler by id; the same function as Open77.events.off.
 *
 * No permission. Takes the id AddEventHandler, RegisterNetEvent or Open77.net.on returned. An unknown id is ignored rather than raising. Stopping the resource removes its handlers for you.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function RemoveEventHandler(this: void, handlerId: number);

/**
 * Low-level alias of `Open77.loot.remove`.
 *
 * The low-level form of `Open77.loot.remove` (bound to the same native). The two are the same function under two names; `Open77.loot.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.loot
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveLootDrop(this: void, id: number);

/**
 * Low-level alias of `Open77.npcs.remove`.
 *
 * The low-level form of `Open77.npcs.remove` (bound to the same native). The two are the same function under two names; `Open77.npcs.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveNpc(this: void, id: number);

/**
 * Low-level alias of `Open77.props.remove`.
 *
 * The low-level form of `Open77.props.remove` (bound to the same native). The two are the same function under two names; `Open77.props.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveProp(this: void, id: number, reason?: string);

/**
 * Cancels a subscription made by AddStateBagChangeHandler.
 *
 * Takes the id that call returned; the same function as `Open77.state.offChange`. An id that was already cancelled, or never issued, is ignored rather than raising. Stopping the resource cancels its subscriptions for you, so this is for a resource that wants to stop listening while it keeps running.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag
 * @open77Return true | or false, reason
 */
declare function RemoveStateBagChangeHandler(this: void, subscriptionId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.vehicles.remove`.
 *
 * The low-level form of `Open77.vehicles.remove` (bound to the same native). The two are the same function under two names; `Open77.vehicles.remove` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RemoveVehicle(this: void, id: number);

/**
 * Low-level alias of `Open77.players.requestLifeResync`.
 *
 * The low-level form of `Open77.players.requestLifeResync` (bound to the same native). The two are the same function under two names; `Open77.players.requestLifeResync` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.life.resync
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RequestPlayerLifeResync(this: void, playerId: number);

/**
 * Drops a custom paint job and returns the vehicle to its record's own colours.
 *
 * The all-positional form of `Open77.vehicles.resetPaint`, and the undo of `SetVehiclePaint`. Answers a plain `true`/`false` with no reason: `false` covers an unknown vehicle and a missing `world.vehicles` permission alike. A vehicle that was never repainted answers `true` and changes nothing.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function ResetVehiclePaint(this: void, id: number);

/**
 * Brings a dead player back at a chosen pose, bucket and health.
 *
 * The all-positional form of `Open77.players.respawn`. All eight arguments are required: position, `yaw`, `bucket`, `health` and a spawn-protection `graceMs` which must be between 0 and 60000. A successful respawn also moves the player's routing bucket, so this is the one call to make rather than respawning and then re-bucketing. Answers `false, reason` (`invalid_argument`, `player_not_found`, a life-ledger reason). Requires `players.life.respawn`.
 *
 * @permission players.life.respawn
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function RespawnPlayer(this: void, playerId: number, x: number, y: number, z: number, yaw: number, bucket: number, health: number, grace: number);

/**
 * Fill health.
 *
 * Fill health.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function RestorePlayerHealth(this: void, playerId: unknown);

/**
 * Fill stamina.
 *
 * Fill stamina.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function RestorePlayerStamina(this: void, playerId: unknown);

/**
 * Low-level alias of `Open77.elevators.resume`.
 *
 * The low-level form of `Open77.elevators.resume` (bound to the same native). The two are the same function under two names; `Open77.elevators.resume` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function ResumeElevator(this: void, id: number);

/**
 * Low-level alias of `Open77.npcs.revive`.
 *
 * The low-level form of `Open77.npcs.revive` (wrapped by). The two are the same function under two names; `Open77.npcs.revive` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function ReviveNpc(this: void, id: number, health: number);

/**
 * Low-level alias of `Open77.players.revive`.
 *
 * The low-level form of `Open77.players.revive` (wrapped by). The two are the same function under two names; `Open77.players.revive` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.life.revive
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function RevivePlayer(this: void, playerId: number, health: number, grace: number);

/**
 * Writes a file belonging to the calling resource. Server only.
 *
 * Open77.io.write under the FiveM name, rooted at this resource's data/ directory and gated by filesystem.write. Naming another resource answers false, cross_resource_write_denied. There is no client counterpart: a client resource's directory is the signed download and is not writable.
 *
 * @since 2.31.13+op77.67
 * @failure cross_resource_write_denied, invalid_argument, permission_denied:filesystem.write
 * @open77Return true, or false, reason
 */
declare function SaveResourceFile(this: void, resourceName: string, path: string, data: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * SeekSound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function SeekSound(this: void, id: number, seconds: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.combat.setDamageMultiplier`.
 *
 * The low-level form of `Open77.combat.setDamageMultiplier` (bound to the same native). The two are the same function under two names; `Open77.combat.setDamageMultiplier` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatDamageMultiplier(this: void, multiplier: number);

/**
 * Low-level alias of `Open77.combat.setFriendlyFire`.
 *
 * The low-level form of `Open77.combat.setFriendlyFire` (bound to the same native). The two are the same function under two names; `Open77.combat.setFriendlyFire` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatFriendlyFire(this: void, enabled?: boolean);

/**
 * Low-level alias of `Open77.combat.setHeadshotMultiplier`.
 *
 * The low-level form of `Open77.combat.setHeadshotMultiplier` (bound to the same native). The two are the same function under two names; `Open77.combat.setHeadshotMultiplier` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatHeadshotMultiplier(this: void, multiplier: number);

/**
 * Low-level alias of `Open77.combat.setKindDamageMultiplier`.
 *
 * The low-level form of `Open77.combat.setKindDamageMultiplier` (bound to the same native). The two are the same function under two names; `Open77.combat.setKindDamageMultiplier` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatKindMultiplier(this: void, kindName: string, multiplier: number);

/**
 * Low-level alias of `Open77.combat.setTeam`.
 *
 * The low-level form of `Open77.combat.setTeam` (bound to the same native). The two are the same function under two names; `Open77.combat.setTeam` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatTeam(this: void, playerId: number, team: number);

/**
 * Low-level alias of `Open77.combat.setWeaponDamageMultiplier`.
 *
 * The low-level form of `Open77.combat.setWeaponDamageMultiplier` (bound to the same native). The two are the same function under two names; `Open77.combat.setWeaponDamageMultiplier` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission combat.config
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetCombatWeaponMultiplier(this: void, weaponTdbId: number, multiplier: number);

/**
 * Records a server-wide, in-memory convar override.
 *
 * Server-wide, not per resource -- `SetConvar` here is visible to `GetConvar` in another resource, which is what the FiveM code being ported assumes and is exactly why a convar is a poor place for anything two resources might both want to own. **In memory only**: the value is gone on the next restart and the `convars` block of `server.jsonc` comes back. Making it durable would mean writing to the operator's tracked configuration file from Lua. Booleans and numbers are coerced to their string form. 512 overrides, 4096-byte values, names `[A-Za-z0-9_.:-]` up to 128 bytes.
 *
 * @since 2.31.13+op77.67
 * @failure convars_unavailable, invalid_convar_name, invalid_convar_value
 * @open77Return true, or false | reason
 */
declare function SetConvar(this: void, name: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.elevators.setFlags`.
 *
 * The low-level form of `Open77.elevators.setFlags` (bound to the same native). The two are the same function under two names; `Open77.elevators.setFlags` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetElevatorFlags(this: void, id: number, flags: number);

/**
 * FiveM's invincibility toggle under its own name: `Open77.players.setGodMode` for a player, refused by name for every other kind.
 *
 * Requires `players.stats.apply` (or the legacy `players.damage.apply`), exactly as `setGodMode` does -- it is that function under the FiveM name, and a permission refusal comes back before any id is looked at. FiveM's native takes one opaque entity handle; here the kind is named, as `DoesEntityExist` does, and only `"player"` has a canonical damage immunity to switch: the combat ledger's god mode, read back as `Open77.players.get(id).godMode` or `getStats(id).godMode`. `"vehicle"`, `"npc"`, `"prop"`, `"loot"`, `"effect"` and `"elevator"` answer `false, unsupported_entity_kind` rather than accepting and ignoring the call: a vehicle's damage is its own scopes (`setEngineHealth`, the body zones) and an NPC's its `damagePolicy`, and a ported script that expects an indestructible car should learn that here rather than on the first hit. The one-argument FiveM form is `false, kind_required`; a name that is no kind at all is `unknown_entity_kind`; a missing id is `id_required`; a non-boolean `enabled` is `invalid_argument`, and so is a player the ledger does not hold yet (not spawned). This is not the fall-damage toggle (`setFallDamage`) and not the grav-chute's blanket shield.
 *
 * @permission players.stats.apply
 * @since 2.31.13+op77.74
 * @failure id_required, invalid_argument, kind_required, unknown_entity_kind, unsupported_entity_kind
 * @open77Return boolean, or false, reason
 */
declare function SetEntityInvincible(this: void, kind: string, id: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.routingBuckets.setEntity`.
 *
 * The low-level form of `Open77.routingBuckets.setEntity` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.setEntity` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetEntityRoutingBucket(this: void, entityId: number, bucket: number);

/**
 * FiveM spelling of a whole-resource inbound HTTP handler.
 *
 * `Open77.http.listen('/', handler)`: everything under `/<resource>/` reaches the handler with the same `(req, res)` shapes; `SetHttpHandler(nil)` is `unlisten('/')`. Requires `http.serve` and the server's `httpHandlers` listener; see `Open77.http.listen` for the request table, the response helpers, the 16 KiB body cap and the failure reasons.
 *
 * @permission http.serve
 * @since 2.31.13+op77.73
 * @open77Return public route string (or true when removing), or nil | reason on failure
 */
declare function SetHttpHandler(this: void, handler: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Sets how one owned NPC feels about everyone, one player, one NPC, or a group.
 *
 * The all-positional form of `Open77.npcs.setAttitude`. `scope` picks which of the two trailing arguments is read: `0` everyone (neither), `1` a player id and `2` an NPC id (`targetId`), `3` a group name (`group`). `attitude` is a token (`"friendly"`, `"neutral"`, `"hostile"`) and `nil` clears the row back to the default. Answers `false, reason` -- `npc_attitude_invalid`, `npc_attitude_target_invalid`, `npc_not_found`. Requires `world.npcs`.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @failure npc_attitude_invalid, npc_attitude_target_invalid, npc_not_found, npcs_unavailable, permission_denied:world.npcs
 * @open77Return void
 */
declare function SetNpcAttitude(this: void, npcId: number, attitude?: string, scope?: number, targetId?: number, group?: string);

/**
 * Low-level alias of `Open77.npcs.setBucket`.
 *
 * The low-level form of `Open77.npcs.setBucket` (bound to the same native). The two are the same function under two names; `Open77.npcs.setBucket` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetNpcBucket(this: void, id: number, bucket: number);

/**
 * Low-level alias of `Open77.npcs.setGroup`.
 *
 * The low-level form of `Open77.npcs.setGroup` (bound to the same native). The two are the same function under two names; `Open77.npcs.setGroup` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @failure npc_not_found, npcs_unavailable, permission_denied:world.npcs
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetNpcGroup(this: void, id: number, group: string);

/**
 * Low-level alias of `Open77.npcs.setRelationship`.
 *
 * The low-level form of `Open77.npcs.setRelationship` (bound to the same native). The two are the same function under two names; `Open77.npcs.setRelationship` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.67
 * @failure npc_attitude_invalid, npc_relationship_not_found, npcs_unavailable, permission_denied:world.npcs
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetNpcRelationship(this: void, first: string, second: string, attitude: string);

/**
 * Low-level alias of `Open77.npcs.setTransform`.
 *
 * The low-level form of `Open77.npcs.setTransform` (wrapped by). The two are the same function under two names; `Open77.npcs.setTransform` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetNpcTransform(this: void, id: number, x: number, y: number, z: number, yaw: number);

/**
 * Low-level alias of `Open77.players.setArmor`.
 *
 * The low-level form of `Open77.players.setArmor` (bound to the same native). The two are the same function under two names; `Open77.players.setArmor` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetPlayerArmor(this: void, playerId: number, armor: number);

/**
 * `players.stats.apply`;
 *
 * `players.stats.apply`; boolean/reason. Also exposed as `Open77.stats.setDownedDamageable`.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerDownedDamageable(this: void, playerId: unknown, enabled: unknown);

/**
 * Hold the player's body where it stands, or release this resource's hold.
 *
 * Hold the player's body where it stands, or release this resource's hold. `boolean, reason?`
 *
 * @permission players.life.freeze
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function SetPlayerFrozen(this: void, playerId: unknown, frozen: unknown);

/**
 * Toggle the server-owned non-solid spawn state and its optional automatic clear policy.
 *
 * Toggle the server-owned non-solid spawn state and its optional automatic clear policy.
 *
 * @permission players.life.ghost
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerGhosted(this: void, playerId: unknown, ghosted: unknown, options_: unknown);

/**
 * Low-level alias of `Open77.players.setGodMode`.
 *
 * The low-level form of `Open77.players.setGodMode` (bound to the same native). The two are the same function under two names; `Open77.players.setGodMode` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetPlayerGodMode(this: void, playerId: number, enabled?: boolean);

/**
 * Explicit health setter;
 *
 * Explicit health setter; zero routes through life authority.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerHealth(this: void, playerId: unknown, value: unknown);

/**
 * Teleports a player straight into a seat, moving their bucket to the vehicle's.
 *
 * The all-positional form of `Open77.vehicles.setPlayerIntoVehicle`. Seats use FiveM's numbering: `-1` driver, `0` front passenger, `1` and `2` the rear. `moveBucket` defaults to true -- pass false and a player in another bucket is refused `wrong_bucket` instead of being moved. `animated` false is the instant snap. A dead or respawning player is refused `player_unavailable`. Other refusals are `vehicle_not_found`, `invalid_seat` and a seat already taken. Requires `world.vehicles`.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_player_id, invalid_seat, invalid_vehicle_id, permission_denied:world.vehicles, player_not_found, player_unavailable, vehicle_not_found, vehicles_unavailable, wrong_bucket
 * @open77Return void
 */
declare function SetPlayerIntoVehicle(this: void, playerId: number, vehicleId: number, seat: unknown, moveBucketValue?: boolean, exitLockedValue?: boolean, animatedValue?: boolean);

/**
 * Explicit health maximum setter.
 *
 * Explicit health maximum setter.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerMaxHealth(this: void, playerId: unknown, maximum: unknown);

/**
 * Explicit stamina maximum setter.
 *
 * Explicit stamina maximum setter.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerMaxStamina(this: void, playerId: unknown, maximum: unknown);

/**
 * Set health regeneration rate.
 *
 * Set health regeneration rate.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerRegen(this: void, playerId: unknown, rate: unknown);

/**
 * Toggle health regeneration.
 *
 * Toggle health regeneration.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerRegenEnabled(this: void, playerId: unknown, enabled: unknown);

/**
 * Low-level alias of `Open77.routingBuckets.setPlayer`.
 *
 * The low-level form of `Open77.routingBuckets.setPlayer` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.setPlayer` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetPlayerRoutingBucket(this: void, playerId: number, bucket: number);

/**
 * Explicit stamina setter.
 *
 * Explicit stamina setter.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerStamina(this: void, playerId: unknown, value: unknown);

/**
 * Set stamina regeneration rate.
 *
 * Set stamina regeneration rate.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerStaminaRegen(this: void, playerId: unknown, rate: unknown);

/**
 * Toggle stamina regeneration.
 *
 * Toggle stamina regeneration.
 *
 * @permission players.damage.apply, players.stats.apply
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetPlayerStaminaRegenEnabled(this: void, playerId: unknown, enabled: unknown);

/**
 * Low-level alias of `Open77.vehicles.setPlayerExitLocked`.
 *
 * The low-level form of `Open77.vehicles.setPlayerExitLocked` (bound to the same native). The two are the same function under two names; `Open77.vehicles.setPlayerExitLocked` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetPlayerVehicleExitLocked(this: void, playerId: number, locked?: boolean, vehicleId?: number);

/**
 * Hide a player's body from every other client, or show it again.
 *
 * Hide a player's body from every other client, or show it again. Presentation only; see [Player visibility](#player-visibility) below.
 *
 * @permission players.life.visibility
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function SetPlayerVisible(this: void, playerId: unknown, visible: unknown);

/**
 * Low-level alias of `Open77.props.setBucket`.
 *
 * The low-level form of `Open77.props.setBucket` (bound to the same native). The two are the same function under two names; `Open77.props.setBucket` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetPropBucket(this: void, id: number, bucket: number);

/**
 * Moves and rotates a prop, optionally rescaling it, and answers whether it took.
 *
 * The all-positional form of `Open77.props.setTransform`. The three scale arguments are optional and keep their current value when `nil`. An **attached** prop is refused `prop_attached` rather than moved, because the follow tick would overwrite the move within 100 ms -- detach it first. Other refusals are `not_found`, `invalid_position` and `permission_denied:world.props`. Requires `world.props`.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_position, not_found, permission_denied:world.props, prop_attached, world_unavailable
 * @open77Return void
 */
declare function SetPropTransform(this: void, id: number, x: number, y: number, z: number, yaw: number, scaleX?: number, scaleY?: number, scaleZ?: number);

/**
 * FiveM-style alias for `Open77.kvp.set`.
 *
 * The same three bare globals the client publishes, over the server's own store. FiveM's typed variants (`SetResourceKvpInt`, `GetResourceKvpFloat`, ...) are deliberately absent: they are one line of Lua each, and spelling the two Open77 runtimes identically is worth more than matching FiveM on a side that never had the API at all.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_operation
 * @open77Return boolean | reason
 */
declare function SetResourceKvp(this: void, key: string, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.routingBuckets.setLockdownMode`.
 *
 * The low-level form of `Open77.routingBuckets.setLockdownMode` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.setLockdownMode` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetRoutingBucketEntityLockdownMode(this: void, bucket: number, mode: string);

/**
 * Low-level alias of `Open77.routingBuckets.setPopulationEnabled`.
 *
 * The low-level form of `Open77.routingBuckets.setPopulationEnabled` (bound to the same native). The two are the same function under two names; `Open77.routingBuckets.setPopulationEnabled` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetRoutingBucketPopulationEnabled(this: void, bucket: number, enabled?: boolean);

/**
 * SetSoundPosition: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function SetSoundPosition(this: void, id: number, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * SetSoundVolume: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function SetSoundVolume(this: void, id: number, volume: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Runs a function once per server tick.
 *
 * A scheduler task looping with an implicit Wait(0), so it is bounded by the same budget and counted against the same 1,024-task quota as a CreateThread loop. The difference is the pcall: an error inside the function is logged and the tick survives it, up to five *consecutive* failures, after which the tick cancels itself rather than filling the log for the rest of the session. One successful pass resets the count. Answers nil, invalid_tick_function for a non-function and nil, task_limit_or_stopping when no task slot is available.
 *
 * @since 2.31.13+op77.67
 * @failure invalid_tick_function, task_limit_or_stopping
 * @open77Return tick id, or nil, reason
 */
declare function SetTick(this: void, body: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Runs a function once, later.
 *
 * Schedules a managed task due after the delay, so the body may Wait. Counts against the same 1,024-task budget as CreateThread. Returns the timer id ClearTimeout takes.
 *
 * @since 2.31.13+op77.45
 * @open77Return timer id
 */
declare function SetTimeout(this: void, milliseconds: number, body: Open77Callback): number;

/**
 * Low-level alias of `Open77.vehicles.setLocked`.
 *
 * The low-level form of `Open77.vehicles.setLocked` (bound to the same native). The two are the same function under two names; `Open77.vehicles.setLocked` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure invalid_argument, permission_denied:world.vehicles, vehicle_not_found, vehicles_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function SetVehicleLocked(this: void, id: number, locked?: boolean);

/**
 * Repaints a vehicle: primary and secondary colour as six 0-255 channels.
 *
 * The all-positional form of `Open77.vehicles.setPaint`. The six trailing arguments are the primary R, G, B then the secondary R, G, B, each clamped to 0-255. Answers a plain `true`/`false` with no reason: `false` covers an unknown vehicle and a missing `world.vehicles` permission alike. `Open77.vehicles.setPaint(id, { primary = ..., secondary = ... })` takes colours as tables and can change only one of the two.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetVehiclePaint(this: void, id: number, primaryR: number, primaryG: number, primaryB: number, secondaryR: number, secondaryG: number, secondaryB: number);

/**
 * Teleports a vehicle to a position and heading.
 *
 * The all-positional form of `Open77.vehicles.setTransform`. Five arguments, no options: the vehicle keeps its occupants, its damage and its paint. Answers a plain `true`/`false` with no reason -- `false` covers an unknown vehicle and a missing `world.vehicles` permission alike. This moves the vehicle, not the players' buckets: use `Open77.routingBuckets.setEntity` if it should also change bucket.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function SetVehicleTransform(this: void, id: number, x: number, y: number, z: number, yaw: number);

/**
 * Put one player behind another player's shoulder: ghost, hide, and a follow camera on the target, as one transaction that fails closed.
 *
 * Put one player behind another player's shoulder: ghost, hide, and a follow camera on the target, as one transaction that fails closed. `targetId` false ends it and gives the body back, as do death, disconnect, reconnect, a bucket change and this resource stopping. `options`: `blendMs`, `distance`, `height`. See [Spectating](cameras.md#spectating).
 *
 * @permission players.spectate
 * @since 2.31.13+op77.67
 * @open77Return void
 */
declare function SpectatePlayer(this: void, playerId: unknown, targetId_false: unknown, options_: unknown);

/**
 * FiveM-style alias for `Open77.resource.start`.
 *
 * Requires `resources.control`. Queued, not immediate.
 *
 * @permission resources.control
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return true when queued, otherwise false | reason
 */
declare function StartResource(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * FiveM-style alias for `Open77.resource.stop`.
 *
 * Requires `resources.control`. Queued, not immediate.
 *
 * @permission resources.control
 * @since 2.31.13+op77.67
 * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
 * @open77Return true when queued, otherwise false | reason
 */
declare function StopResource(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * StopSound: server-authoritative network package audio.
 *
 * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
 *
 * @permission audio.network
 * @since 2.31.13+op77.63
 * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
 * @open77Return true, or failure, reason
 */
declare function StopSound(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Low-level alias of `Open77.elevators.teleport`.
 *
 * The low-level form of `Open77.elevators.teleport` (bound to the same native). The two are the same function under two names; `Open77.elevators.teleport` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.elevators
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function TeleportElevator(this: void, id: number, floor: number);

/**
 * Server only. Publishes a host-wide event handlers may veto, and returns a verdict handle.
 *
 * Only events published this way can be cancelled; an ordinary TriggerEvent ignores CancelEvent(). Handlers run inline during the host drain, in resource-name order then registration order, so Wait() is not available inside one. Every handler still runs after a veto (FiveM semantics) and a later one reads the flag with WasEventCanceled(). The handle settles one tick later: verdict:await() answers true when a handler cancelled, verdict:canceled() answers nil plus status while pending, verdict:status() answers pending, settled or unknown. An unread verdict is forgotten 30 s after it settles. Same caps and reserved list as TriggerEvent.
 *
 * @since 2.31.13+op77.67
 * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_event_name, resource_preparing, resource_stopping
 * @open77Return verdict handle, or nil, reason
 */
declare function TriggerCancellableEvent(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Sends an event to one player's client, or to every connected client with `-1`.
 *
 * Requires `network.events`. `playerId` is an authenticated player id (an integer of 1 or more) or `-1` to broadcast; the arguments after it are JSON-marshalled and handed to the client's `RegisterNetEvent` handler of that name. Answers `true`, or `false, reason` for `permission_denied:network.events`, `network_unavailable` and a reserved name (`reserved_*_event`: the `open77:dash:`, `open77:abilities:`, `open77:reflex:`, `open77:cyberware:`, latent, screen and travel prefixes). Three shapes are not refusals but host exceptions that stop the resource with `runtime_error`: a target of `0` (the `source` of a command typed at the dedicated console) or below `-1`, a name empty or over 128 characters or more than 32 arguments (`Invalid client event envelope.`), and a payload over 48 KiB (`Network event payload exceeds 48 KiB.`). Guard `source` before replying to it. `Open77.net.emitClient` is the namespaced spelling.
 *
 * @permission network.events
 * @since 2.31.13+op77.45
 * @failure invalid_target, network_unavailable, permission_denied:network.events
 * @open77Return true, or false | reason
 */
declare function TriggerClientEvent(this: void, event: string, playerId: number, ...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Publishes an event host-wide: every running resource that handles the name receives it.
 *
 * No permission, to publish or to receive. Delivery is queued and never re-entrant: publishing appends to the host's queue, the host drains it at the next tick boundary and pushes the event into each VM in resource-name order, so one resource's error cannot abort the fan-out. Arguments cross by value through the export marshaller -- 32 values, 4,096 nodes, depth 16, 48 KiB -- and functions, userdata, cyclic tables and non-finite numbers are refused. `source` is not propagated, so a publisher that wants receivers to know which player caused the event passes the id as an argument. Platform event names are refused with reserved_event. The client function of this name is local to its own VM; this one is the bus. Failure tokens: invalid_event_name, reserved_event, resource_stopping, resource_preparing, event_argument_limit, event_payload_not_serializable, event_queue_limit.
 *
 * @since 2.31.13+op77.45
 * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
 * @open77Return true, or false, reason
 */
declare function TriggerEvent(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;

/**
 * Sends a client event too large for one net event, paced at a byte rate (FiveM spelling).
 *
 * The same call as `TriggerClientEvent` with FiveM's bytes-per-second argument in third place, for a payload the 48 KiB event envelope cannot carry: up to 4 MiB, cut into 40 KiB frames on a reserved name, paced at the requested rate (clamped to 1 KiB/s .. 2.5 MiB/s, and never more than 64 frames per second for all of a resource's streams together), reassembled by the client host and delivered to `RegisterNetEvent` handlers under the ORIGINAL name -- the receiving resource cannot tell it was latent. `target` is one player id or `-1` for everybody connected. Requires `network.events`. Answers the stream id, or `nil, reason`: `permission_denied:network.events`, `invalid_event_name`, `reserved_*_event`, `invalid_player_id`, `player_not_found`, `invalid_rate`, `event_argument_limit`, `latent_stream_limit` (16 in flight), `latent_payload_not_serializable`, `latent_payload_too_large` (over 4 MiB, nothing sent). Read progress with `Open77.net.latentStatus(id)`; stop it with `cancelLatent(id)`.
 *
 * @permission network.events
 * @since 2.31.13+op77.73
 * @failure event_argument_limit, invalid_event_name, invalid_player_id, invalid_rate, latent_payload_not_serializable, latent_payload_too_large, latent_stream_limit, network_unavailable, permission_denied:network.events, player_not_found, resource_stopping
 * @open77Return stream id string, or nil | reason on failure
 */
declare function TriggerLatentClientEvent(this: void, name: string, target: number, bytesPerSecond: number, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Server only. Fires an event in this resource's VM and nowhere else.
 *
 * The behaviour server TriggerEvent had before the host-wide bus: no marshalling, no reserved-name filter, no host round trip. Use it for a resource's own internal signalling, and wherever a fixture must simulate a host lifecycle event inside its own VM.
 *
 * @since 2.31.13+op77.67
 * @failure reserved_hacking_event
 * @open77Return true
 */
declare function TriggerLocalEvent(this: void, event: string, ...args: unknown[]): boolean;

/**
 * Low-level alias of `Open77.vehicles.triggerHorn`.
 *
 * The low-level form of `Open77.vehicles.triggerHorn` (wrapped by). The two are the same function under two names; `Open77.vehicles.triggerHorn` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @failure invalid_duration, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function TriggerVehicleHorn(this: void, id: number, duration: number);

/**
 * Low-level alias of `Open77.effects.update`.
 *
 * The low-level form of `Open77.effects.update` (wrapped by). The two are the same function under two names; `Open77.effects.update` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.effects
 * @since 2.31.13+op77.45
 * @failure invalid_argument, invalid_position, not_found, permission_denied:world.effects, world_unavailable
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function UpdateEffect(this: void, id: number, x?: number, y?: number, z?: number, qx?: number, qy?: number, qz?: number, qw?: number, bucket?: number, visible?: boolean, radius?: number, hysteresis?: number, ttl?: number);

/**
 * Low-level alias of `Open77.loot.update`.
 *
 * The low-level form of `Open77.loot.update` (wrapped by). The two are the same function under two names; `Open77.loot.update` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.loot
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function UpdateLootDrop(this: void, id: number, quantity: number, x: number, y: number, z: number, bucket: number, pickupRadius: number, label: string, model: string);

/**
 * Low-level alias of `Open77.npcs.update`.
 *
 * The low-level form of `Open77.npcs.update` (wrapped by). The two are the same function under two names; `Open77.npcs.update` is the spelling resources are told to prefer, and its card carries the arguments, the return values and the failure reasons.
 *
 * @permission world.npcs
 * @since 2.31.13+op77.45
 * @open77Return void
 * @inferred Catalogue signature was inferred from the implementation.
 */
declare function UpdateNpc(this: void, id: number, appearance: string, loadoutJson: string, aiMode: number, damagePolicy: number, health: number, maxHealth: number, ragdoll: number, behaviorJson: string);

/**
 * Patches a prop in place: appearance, physics, visibility, bucket, light or lifetime.
 *
 * The all-positional form of `Open77.props.update`. Every argument after the id is optional and `nil` means leave it alone, so this is a patch and not a replacement. Answers `false, reason` -- `not_found` for an id this resource does not own, `invalid_argument` for a malformed value. Requires `world.props`. The transform is not here: that is `SetPropTransform`.
 *
 * @permission world.props
 * @since 2.31.13+op77.45
 * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
 * @open77Return void
 */
declare function UpdateProp(this: void, id: number, appearance?: string, physics?: string, collision?: boolean, visible?: boolean, bucket?: number, light?: string, radius?: number, hysteresis?: number, ttl?: number);

/**
 * Writes a vehicle's whole replicated state at once: health, flags, paint, damage.
 *
 * The all-positional form of `Open77.vehicles.update`, and unlike that one it is a **replacement, not a patch**: all sixteen arguments are written, so read the vehicle first and pass back whatever you are not changing. `bodyDamage` must be a table of exactly 30 numbers between 0 and 1 -- anything else raises a Lua error instead of answering `false`, which is the one refusal here that is not a return value. `doors`, `windows` and `tires` are bitmasks. Answers a plain `true`/`false`. Requires `world.vehicles`.
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function UpdateVehicleState(this: void, id: number, health: number, flags: number, primaryR: number, primaryG: number, primaryB: number, secondaryR: number, secondaryG: number, secondaryB: number, doors: number, windows: number, tires: number, bodyDamage: Open77Table, brokenGlass: number, brokenLights: number, detachedParts: number);

/**
 * Builds a vector of the size the arguments imply.
 *
 * Available in both runtimes. With two, three or four numbers it builds a vector2, vector3 or vector4. With a single table it picks the size from the axes actually present: w means vector4, else z means vector3, else y means vector2 -- which makes vec(position) the short way to wrap a position returned by any existing API. A quaternion is refused, because vec makes vectors. Identical on both runtimes by construction: one file, scripting/lua/open77_vector.lua, is embedded by the client build and by the server assembly, so the semantics cannot drift.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector2, vector3 or vector4, or nil, reason
 */
declare function vec(this: void, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 2D vector: a plain { x, y } table with vector behaviour.
 *
 * Available in both runtimes. Same operators, swizzles and methods as vector3, minus cross, which answers nil, "cross_requires_vector3". Takes two finite numbers, or one vector or { x =, y = } table to copy. Identical on both runtimes by construction: one file, scripting/lua/open77_vector.lua, is embedded by the client build and by the server assembly, so the semantics cannot drift.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector2, or nil, reason
 */
declare function vector2(this: void, x: number, y: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 3D vector: a plain { x, y, z } table with vector behaviour.
 *
 * Available in both runtimes, from the shared prelude scripting/lua/open77_vector.lua. Takes three finite numbers, or one vector or { x =, y =, z = } table to copy. The result IS a table with real x, y and z fields, so every API that accepts a position table accepts it unchanged and json.encode emits {"x":..,"y":..,"z":..}. Supports + - * / (by a vector, a position table or a number), unary minus, # for magnitude, == (exact, same kind only), tostring/.. as vector3(1.0, 2.0, 3.0), the swizzles .xy/.xz/.yz/.xyz/.zyx, and the methods length, lengthSquared, distance, distanceSquared, normalize (zero stays zero), dot, cross, lerp (unclamped), unpack and table. Fields are read-only except the components themselves, which Lua 5.4 cannot intercept. Operators raise; this constructor returns nil, reason. See the Vectors and quaternions guide. Identical on both runtimes by construction: one file, scripting/lua/open77_vector.lua, is embedded by the client build and by the server assembly, so the semantics cannot drift.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector3, or nil, reason
 */
declare function vector3(this: void, x: number, y: number, z: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * Builds a 4D vector: a plain { x, y, z, w } table with vector behaviour.
 *
 * Available in both runtimes. Same operators and methods as vector3, minus cross. Its swizzles reach w, so v.xyz narrows a vector4 to a vector3. Takes four finite numbers, or one vector or { x =, y =, z =, w = } table to copy. Identical on both runtimes by construction: one file, scripting/lua/open77_vector.lua, is embedded by the client build and by the server assembly, so the semantics cannot drift.
 *
 * @since 2.31.13+op77.67
 * @open77Return vector4, or nil, reason
 */
declare function vector4(this: void, x: number, y: number, z: number, w: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;

/**
 * `world.vehicles`;
 *
 * `world.vehicles`; driving-state table or nil/reason (state may be nil when absent). Prefer [vehicle AI methods](vehicle-ai.md).
 *
 * @permission world.vehicles
 * @since 2.31.13+op77.57
 * @open77Return void
 */
declare function VehicleDrivingCommand(this: void, operation: unknown, vehicleId: unknown, options_: unknown);

/**
 * Suspends the current managed coroutine.
 *
 * Usable inside a CreateThread, a command handler, an event handler, a callback handler or an export body -- anywhere the scheduler owns the coroutine. Accepts 0 to 86,400,000 ms and raises `invalid wait` outside that range. Cancellable event handlers are the one exception: they run inline during the host drain, where a yield would outlive the verdict, so Wait is not available there.
 *
 * @since 2.31.13+op77.45
 * @open77Return void
 */
declare function Wait(this: void, milliseconds: number);

/**
 * Server only. Whether the cancellable event being dispatched has already been vetoed.
 *
 * True only inside a cancellable dispatch some handler has cancelled, in this resource or an earlier one. False everywhere else, including inside an ordinary event handler and at top level.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean
 */
declare function WasEventCanceled(this: void): boolean;

interface CitizenApi {
    /**
     * Waits for a promise; exactly promise:await().
     *
     * Provided because ported code writes it this way. Anything that is not a promise answers nil, invalid_promise instead of raising, and the await itself needs a managed task: outside one it answers nil, await_requires_scheduler_coroutine rather than parking the tick.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_promise
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
     * @open77Return void
     */
    ClearTimeout(this: void, id: number): void;
    /**
     * Alias of CreateThread.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. Citizen.CreateThreadNow is deliberately absent: this scheduler starts a task on the next pass, and resuming one inline from inside a running task would reset that task's instruction counter and deadline mid-flight.
     *
     * @since 2.31.13+op77.67
     * @open77Return task id
     */
    CreateThread(this: void, body: Open77Callback): number;
    /**
     * Alias of SetTick.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. See SetTick for the task budget and the five-consecutive-failure cancellation.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_tick_function, task_limit_or_stopping
     * @open77Return tick id, or nil, reason
     */
    SetTick(this: void, body: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of SetTimeout.
     *
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function.
     *
     * @since 2.31.13+op77.67
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
     * Citizen holds the very same function values the bare globals do, not copies, so a ported resource may use either spelling and a stack trace names the same function. Only usable inside a managed task, and never inside a cancellable event handler, which runs inline during the host drain.
     *
     * @since 2.31.13+op77.67
     * @open77Return void
     */
    Wait(this: void, milliseconds: number): void;
}

declare const Citizen: CitizenApi;

interface JsonApi {
    /**
     * Decodes JSON into safe Lua values.
     *
     * Produces only strings, numbers, booleans and tables of those, within the same depth and node bounds as the encoder. Malformed input answers nil rather than raising, so a caller can tell a bad payload from an empty one.
     *
     * @since 2.31.13+op77.45
     * @failure invalid_json, json_too_large
     * @open77Return value, or nil
     */
    decode(this: void, text: string): unknown | undefined;
    /**
     * Serialises a bounded Lua value to JSON.
     *
     * The same encoder the event and export marshallers use, so a value this accepts is a value that crosses a resource boundary. Functions, userdata, cyclic tables and non-finite numbers are refused rather than guessed at. `json` is a plain global on the server; the client spells it Open77.json.
     *
     * @since 2.31.13+op77.45
     * @open77Return string, or nil
     */
    encode(this: void, value: unknown): string | undefined;
}

declare const json: JsonApi;

interface Open77EventVerdictApi {
    /**
     * The verdict itself, once it has settled.
     *
     * Answers nil plus the status while the event is still in flight, so a caller that must not yield can poll instead of awaiting. True means some handler, in this resource or another, called CancelEvent.
     *
     * @since 2.31.13+op77.67
     * @failure pending, settled, unknown
     * @open77Return boolean, or nil, status
     */
    canceled(): boolean | undefined;
    /**
     * Whether the verdict has settled, without waiting.
     *
     * `pending` while the host is still offering the event to the other resources, `settled` once every running resource has been given it, `unknown` when the handle has been released or has expired. A verdict nobody reads is forgotten 30 seconds after it settles.
     *
     * @since 2.31.13+op77.67
     * @failure pending, settled, unknown
     * @open77Return "pending", "settled" or "unknown"
     */
    status(): unknown;
}
interface Open77PromiseApi {
    /**
     * Schedules a continuation for when the promise settles.
     *
     * Not chainable: it returns the id of the task it schedules, not a new promise, so p:next(a):next(b) does not work and sequences belong in a CreateThread with :await(). A rejection is recognised by shape -- the nil, <string reason> pair :await() returns for one -- which is this codebase's failure convention everywhere, so a promise deliberately resolved with a leading nil followed by a string reads as rejected. Answers nil, invalid_promise_handler for a non-function and nil, task_limit_or_stopping when no task slot is available.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_promise_handler
     * @open77Return task id, or nil, reason
     */
    next(onResolved?: Open77Callback, onRejected?: Open77Callback): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Settles a promise you created with promise.new as failed.
     *
     * Same shape and same refusals as resolve. A non-string reason becomes promise_rejected, because the reason has to survive as text for the awaiter's nil, reason pair to mean anything.
     *
     * @since 2.31.13+op77.67
     * @failure promise_not_local
     * @open77Return true, or false, reason
     */
    reject(reason?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Settles a promise you created with promise.new, with the values the awaiter receives.
     *
     * Only a promise this resource created can be settled by hand: one returned by Open77.exports.call or Open77.net.callClient answers false, promise_not_local, and settling twice answers false, promise_already_settled. Values are passed through untouched on the server, where the client copies them across a serialization boundary.
     *
     * @since 2.31.13+op77.67
     * @failure promise_not_local
     * @open77Return true, or false, reason
     */
    resolve(...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * State of the promise, without waiting.
     *
     * The one handle type covers both an export call and a question asked of a client, so the same four states describe either.
     *
     * @since 2.31.13+op77.45
     * @open77Return "pending", "resolved", "rejected" or "cancelled"
     */
    status(): unknown;
}
interface Open77AbilitiesApi {
    /**
     * Cancels this resource's in-flight ability action, keeping the entitlement.
     *
     * Requires `players.abilities.manage`. Use it to interrupt a slam in progress without taking the ability away; `revoke` does both.
     *
     * @permission players.abilities.manage
     * @since 2.31.13+op77.67
     * @failure abilities_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.abilities.define, permission_denied:players.abilities.manage, permission_denied:players.abilities.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    cancel(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The player's current ability projection snapshot.
     *
     * Requires `players.abilities.read`. Reports what the server believes the client is projecting, which is admission state rather than proof of a rendered animation.
     *
     * @permission players.abilities.read
     * @since 2.31.13+op77.67
     * @failure abilities_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.abilities.define, permission_denied:players.abilities.manage, permission_denied:players.abilities.read, request_too_large, resource_stopping
     * @open77Return projection snapshot, or nil | reason
     */
    current(this: void, playerId: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Registers a server-owned ability definition for this resource.
     *
     * Requires `players.abilities.define`. The definition names the ability and its native parameters; grants later refer to it by id. Definitions belong to the declaring resource, so a reload republishes them. See the [ground slam guide](ground-slam.md) for the definition fields and the projection contract.
     *
     * @permission players.abilities.define
     * @since 2.31.13+op77.67
     * @failure abilities_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.abilities.define, permission_denied:players.abilities.manage, permission_denied:players.abilities.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    define(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Grants a defined ability to one player.
     *
     * Requires `players.abilities.manage`. Acceptance is entitlement, not rendering: native projection on the target client can still be pending when this returns. Only the granting resource may revoke or cancel it.
     *
     * @permission players.abilities.manage
     * @since 2.31.13+op77.67
     * @failure abilities_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.abilities.define, permission_denied:players.abilities.manage, permission_denied:players.abilities.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    grant(this: void, playerId: number | string, definition: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes this resource's ability grant from a player and cancels its action.
     *
     * Requires `players.abilities.manage`. Scoped to the calling resource: another resource's grant on the same player is untouched. Resource stop revokes automatically.
     *
     * @permission players.abilities.manage
     * @since 2.31.13+op77.67
     * @failure abilities_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.abilities.define, permission_denied:players.abilities.manage, permission_denied:players.abilities.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    revoke(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77AccessApi {
    /**
     * Adds an identity to the built-in whitelist.
     *
     * Requires `players.access`. The optional label is operator-facing text shown beside the entry in the console and the admin panel; it is not an identity.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return true, or false | reason
     */
    allow(this: void, userId: string, label?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Bans an identity on the built-in list and disconnects them if they are online.
     *
     * Requires `players.access`. `seconds` nil or 0 makes the ban permanent. `name` is the display name recorded with the entry, so a later reader knows who was banned without resolving the identity again. Unlike `Open77.players.ban`, this writes the *server's own* list rather than submitting a device ban to the master.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return true, or false | reason
     */
    ban(this: void, userId: string, reason?: string, seconds?: number, name?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Takes an identity off the built-in whitelist.
     *
     * Requires `players.access`. It does not disconnect a player who is already in: combine it with `Open77.players.kick` when that is the intent.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return true, or false | reason
     */
    disallow(this: void, userId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether an identity is on the built-in whitelist.
     *
     * Requires `players.access`. Reads the built-in list only; it does not consider a resource's own gate logic in `onPlayerConnecting`.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return boolean, or false | reason
     */
    isAllowed(this: void, userId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether an identity is on the built-in ban list.
     *
     * Requires `players.access`. An expired temporary ban reads as not banned.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return boolean, or false | reason
     */
    isBanned(this: void, userId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns the built-in whitelist on or off.
     *
     * Requires `players.access`. While it is on, only identities returned by `status().whitelist` are admitted. The switch is persisted by the host, so it survives a resource reload and a restart.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return true, or false | reason
     */
    setWhitelist(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The server's built-in whitelist and ban list.
     *
     * Requires `players.access`. Returns `{ whitelistEnabled, whitelist = { { userId, label, addedAt, addedBy } }, bans = { { userId, name, reason, bannedAt, expiresAt?, bannedBy } } }` -- the same door list the console and Warden read and write, so a gamemode and an operator never disagree about who is allowed in.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_json, invalid_user_id, json_too_large, permission_denied:players.access, unknown_operation
     * @open77Return table, or false | reason
     */
    status(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lifts a ban on the built-in list.
     *
     * Requires `players.access`. Lifting a ban does not re-add the identity to the whitelist, which is a separate list.
     *
     * @permission players.access
     * @since 2.31.13+op77.45
     * @failure access_persistence_failed, access_unavailable, ban_persistence_failed, invalid_user_id, permission_denied:players.access, unknown_operation
     * @open77Return true, or false | reason
     */
    unban(this: void, userId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77AclApi {
    /**
     * Puts a user in an ACL role at runtime.
     *
     * FiveM's `add_principal`. Requires `acl.grant:<pattern>`, and the check is on the role's **entire reach**, not on its name: every permission behind it must be inside the scope or the call is refused `role_exceeds_scope`. Without that rule a resource scoped to `job.police.*` would collect `command.*` by adding the operator's `moderator` role, which is the same escalation arriving one indirection later. The role may be one this resource defined with `definePermission` or one the operator defined in `acl.jsonc`. Idempotent. Shows up in `Open77.acl.roles`. Publishes `onAclChanged`.
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return true, or nil | reason: role_exceeds_scope, role_not_defined, role_reserved, operator_principal, permission_denied:acl.grant, scope_not_delegable, invalid_user_id, invalid_role, runtime_acl_limit, acl_persistence_failed
     */
    addRole(this: void, userId: string, role: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Defines, retunes or deletes what a runtime ACL role may do.
     *
     * FiveM's `add_ace` against a group. Requires the **second** capability, `acl.define:<pattern>`, because retuning a role changes the rights of everyone holding it at once and retroactively -- a resource that may promote people should not also decide what the promotion is worth. Every permission, and every permission the role *currently* holds, must be inside that scope. Passing nil or an empty list deletes the role and takes it off every subject holding it, rather than leaving a name that resolves to nothing. A role the operator defined in `acl.jsonc` is theirs: `role_defined_by_operator`. `owner` and `admin` are reserved. Publishes `onAclChanged`.
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return true, or nil | reason: permission_denied:acl.define, scope_not_delegable, permission_not_delegable, role_defined_by_operator, role_reserved, not_defined, invalid_role, invalid_permission, runtime_acl_limit, acl_persistence_failed
     */
    definePermission(this: void, role: string, permissions: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Grants one permission to a user id at runtime, persisted.
     *
     * Native-parity A12, FiveM's `add_ace`. Requires a scoped `acl.grant:<pattern>` in the manifest; there is no bare `acl.grant`, and `acl.grant:*` is not a wildcard scope but is dropped, leaving `scope_not_delegable`. The permission must fall inside one of the declared patterns or the call is refused `permission_not_delegable` -- that scope is the whole answer to whether a resource may grant a right it does not itself hold. The subject is a **master-issued userId**, the string `Open77.players.identity(playerId).userId` answers, never a playerId: a grant outlives the session that earned it. Writes to `acl.runtime.jsonc`, the machine-owned sibling of `acl.jsonc`, atomically through a temporary; the operator's own document is never touched and can never be reduced by this call. Takes effect on the very next `isAllowed`, with no reload. Idempotent. Publishes `onAclChanged`. See the [ACL guide](server-acl.md).
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return true, or nil | reason: permission_denied:acl.grant, scope_not_delegable, permission_not_delegable, operator_principal, invalid_user_id, invalid_permission, runtime_acl_limit, acl_persistence_failed, acl_unavailable
     */
    grant(this: void, userId: string, permission: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * What the runtime overlay holds for one user id.
     *
     * Requires the existing `acl.read`. Answers `{ permissions = {}, roles = {} }`, with empty tables for a subject that has no runtime grant. It reports **only** what the resource layer granted at runtime and never a principal from the operator's `acl.jsonc`, so it widens nothing a per-permission `isAllowed` could not already answer. For the effective answer, which unions both layers, call `Open77.acl.isAllowed`.
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return table { permissions, roles }, or nil | reason: permission_denied:acl.read, invalid_user_id, acl_unavailable
     */
    grants(this: void, userId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Whether a connected player holds an ACL right on this server.
     *
     * The same access-control list the console and restricted commands consult, exposed so a resource can make its own authorization decision with the operator's configuration rather than a hard-coded admin list. `RegisterCommand(name, handler, true)` already checks `command.<name>` through it. The first argument is the session player id (`source` in a command handler), not a user id or a role name: the ACL is resolved for the identity behind that session, and the console (source 0) is not a player here.
     *
     * @permission acl.read
     * @since 2.31.13+op77.45
     * @failure invalid_permission, invalid_player_id, permission_denied:acl.read
     * @open77Return boolean: allowed, or false with a reason (`permission_denied:acl.read`, `invalid_player_id`)
     */
    isAllowed(this: void, playerId: number, right: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Takes a user out of a role the runtime put them in.
     *
     * The same scope and the same `role_exceeds_scope` check as `addRole`. Removes only from the runtime overlay: a role assigned by the operator's own principal answers `operator_grant`, and one nobody assigned answers `not_granted`. Publishes `onAclChanged`.
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return true, or nil | reason: operator_grant, not_granted, role_exceeds_scope, role_not_defined, permission_denied:acl.grant, scope_not_delegable, operator_principal, invalid_user_id, invalid_role, acl_persistence_failed
     */
    removeRole(this: void, userId: string, role: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Takes back a runtime permission grant.
     *
     * FiveM's `remove_ace`. Same `acl.grant:<pattern>` scope and the same refusals as `grant`, so a resource cannot strip a right it could not have handed out -- which is what stops one resource tampering with another's job model. It removes only from the runtime overlay: a permission the operator wrote into `acl.jsonc` answers `operator_grant` rather than appearing to work, and one nobody granted answers `not_granted`. Publishes `onAclChanged`.
     *
     * @since 2.31.13+op77.67
     * @failure acl_unavailable, invalid_permission, invalid_role, invalid_user_id, permission_denied:acl.read, runtime_acl_limit, scope_not_delegable, unknown_operation
     * @open77Return true, or nil | reason: operator_grant, not_granted, permission_denied:acl.grant, scope_not_delegable, permission_not_delegable, operator_principal, invalid_user_id, invalid_permission, acl_persistence_failed
     */
    revoke(this: void, userId: string, permission: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The ACL roles a connected player holds.
     *
     * Reads the server's configured role assignments. Roles are operator configuration, not player state: a resource should treat them as a policy input and still validate the gameplay preconditions of whatever it is about to do.
     *
     * @permission acl.read
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, permission_denied:acl.read
     * @open77Return array of role names
     */
    roles(this: void, playerId: number): unknown;
}
interface Open77AnimationsApi {
    /**
     * Look up which RP profile owns a clip name.
     *
     * Clip-first discovery, the counterpart of get(). Returns the owning profile table, or nil when no shipped device's authored tree carries that clip. Requires no capability, like list() and get(). Clip names are case-sensitive. An absent result is the answer, not an error: a name can appear in the game's discovery inventory and still be unaddressable here. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @since 2.31.13+op77.67
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Profile table, or nil when no shipped device carries the clip
     */
    clip(this: void, clip: string): Open77Table | undefined;
    /**
     * List every addressable clip with the profile that owns it.
     *
     * The nearest equivalent this engine offers to enumerating an animation dictionary, and the discovery step before playClip(). Returns one row per clip, { clip = string, profile = string }, ordered by clip name. The optional query is a case-insensitive substring matched against both the clip name and the profile ID, at most 128 characters. Requires no capability. This is the complete addressable set, not a catalogue of what the game contains. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @since 2.31.13+op77.67
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Array of { clip, profile } rows | nil, invalid_query when the query exceeds 128 characters
     */
    clips(this: void, query?: string): LuaMultiReturn<[Open77Table, string | undefined]>;
    /**
     * Read a player's authoritative active RP playback state.
     *
     * Requires players.animations.read, enforced at call time: without it the answer is nil, permission_denied:players.animations.read. (This card's generated permissions list is empty because the handler chooses the permission name at run time; the requirement is real.) Returns the active state synchronously, or nil without an error when inactive. Fields: epoch, revision, playerId, playbackId, active (always true here), reason (empty here), bucket, steps, loop, startedAtMs, serverTimeMs, cycle, step, elapsedMs, remainingMs, clientRequestId, and anchor ({ x, y, z, yaw }) only for an action started with playAt. steps is an array of { profile, clip, durationMs }; there is no top-level profileId -- read steps[1].profile. remainingMs is -1 for a step with no finite duration. Timestamps are monotonic server time and step/cycle indices are zero-based. clientRequestId is internal correlation, not a cancellation token. State proves scheduling, not that a native clip rendered. Unlike client current(entity), this does not return a raw clip name. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @permission players.animations.read
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Active playback state, or nil when inactive | nil, permission_denied:players.animations.read | invalid_player | animations_unavailable on failure
     */
    current(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read the definition and allowed clips of one RP profile.
     *
     * No capability is required. Looks up an exact, case-sensitive profile ID such as smoke or phone. Returns nil without an error for an unknown profile. Use the returned clip and clips fields to construct a valid playback request instead of passing arbitrary game animation names. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Profile table, or nil when absent | nil, error on failure
     */
    get(this: void, profileId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Search the authoritative RP profile catalogue.
     *
     * Returns all supported profiles when the query is empty, or a case-insensitive substring match across ID, label and category (up to 128 characters). Definitions include kind, clip variants and rig metadata. Choose a kind=layer profile such as drink_walk to preserve locomotion; catalogue membership does not prove native rendering. No capability is required; returns definitions synchronously. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Profile array on success | nil, error on failure
     */
    list(this: void, query?: string): LuaMultiReturn<[unknown, string | undefined]>;
    /**
     * Start a server-owned, synchronized RP action on a player.
     *
     * Requires players.animations.control. The calling resource generation owns the action; another resource cannot replace it. The player must be ready, alive, on foot and have a known position. Returns authoritative acceptance and playbackId, not proof of native presentation. Options are clip, durationMs, loop, item and itemContact. The clip must belong to the selected profile. loop defaults to true. Looping profiles may use omitted/zero duration for indefinite playback; once profiles and loop=false use the measured clip duration when available, otherwise 5000 ms. Explicit nonzero durations must be integers from 1000 to 600000 ms. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Provided directly by the server runtime; no animation resource export dependency is needed for this server call. Experimental itemContact is server-only. Supplying this option needs the world.props capability, including false. Omit it for automatic geometry-based mouth contact, use false to disable fitting, or {x,y,z} in item-local metres (missing axes are zero; each supplied coordinate finite and within ±2). Accepted on a layer only; invalid points return invalid_item_contact before replacing the action. It adjusts the arm target, preserves the authored grip and reuses the animation-owned item ID when its record is unchanged. Fitting applies to drink_walk, bottle_walk, smoke_walk and cigar_walk; hold_item_walk only holds. Matching runtime/assets are required and visual validation is incomplete. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact). Automatic container contact uses the main mesh end along the authored item-local up direction (the can rim), keeping that end while tilting; smoking uses the end nearest the mouth. In first person, held items stay visible at the lower right between sips and contact follows the camera. Disabling mouth fitting keeps the first-person holding pose.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Accepted playback state including playbackId | nil, error on rejection
     */
    play(this: void, playerId: number, profileId: string, options?: Open77Table): LuaMultiReturn<[unknown, string | undefined]>;
    /**
     * Play a profile at a world pose: the placed form of play (TaskStartScenarioAtPosition).
     *
     * Requires `players.animations.control`. Moves a player to an anchor, waits for placement, then starts a profile such as `chair`, `lean` or `lie`. Any catalogue profile accepts a pose. `position` is `{x, y, z}` or a three-element array; `yaw` is degrees about Z and defaults to 0. Options match `play`: `clip`, `durationMs`, `loop`. Anchors must be within 5 m; use `Open77.players.teleport` for longer moves. Returns accepted playback state with `anchor`; use `playbackId` with `stopAt`. The caller receives acceptance before clients receive the posture; playback timing starts on arrival. A 5-second anchor watchdog ends an unsuccessful placement with `anchor_unreached`. Observe `onPlayerAnimationChanged`; admission is not proof of rendered animation. Additional errors: `invalid_anchor`, `anchor_too_far`, `anchor_move_refused` (unready, dead or in a vehicle). Provided by the server runtime, without a resource-export dependency.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.73
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Accepted playback state including playbackId and anchor { x, y, z, yaw } | nil, error on rejection
     */
    playAt(this: void, playerId: number, profileId: string, position: Open77Table, yaw?: number, options?: Open77Table): LuaMultiReturn<[Open77Table, string | undefined]>;
    /**
     * Start a synchronized RP action on a player, addressed by clip name.
     *
     * Requires players.animations.control. Resolves an exact clip through the shipped profile catalogue; a missing clip returns unknown_clip. Discovery inventories are not allowlists. A clip shared with a workspot resolves to the stationary profile: use play/request with a layer profile ID to select walking behavior. Options are durationMs, loop, item and itemContact; the clip is the argument. Unsupported upperBody, blendIn, blendOut, blendMs, holdLastFrame, flags, dict and playbackRate options return unsupported_option:<key>; upperBody does not convert arbitrary clips. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Provided directly by the server runtime; no animation resource export dependency is needed for this server call. Experimental itemContact is server-only. Supplying this option needs the world.props capability, including false. Omit it for automatic geometry-based mouth contact, use false to disable fitting, or {x,y,z} in item-local metres (missing axes are zero; each supplied coordinate finite and within ±2). Accepted on a layer only; invalid points return invalid_item_contact before replacing the action. It adjusts the arm target, preserves the authored grip and reuses the animation-owned item ID when its record is unchanged. Fitting applies to drink_walk, bottle_walk, smoke_walk and cigar_walk; hold_item_walk only holds. Matching runtime/assets are required and visual validation is incomplete. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact). Automatic container contact uses the main mesh end along the authored item-local up direction (the can rim), keeping that end while tilting; smoking uses the end nearest the mouth. In first person, held items stay visible at the lower right between sips and contact follows the camera. Disabling mouth fitting keeps the first-person holding pose.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.67
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Accepted playback state including playbackId | nil, unknown_clip | unsupported_option:<key> | invalid_duration | any play() rejection
     */
    playClip(this: void, playerId: number, clip: string, options?: Open77Table): LuaMultiReturn<[unknown, string | undefined]>;
    /**
     * Schedule a server-owned sequence of RP profiles for a player.
     *
     * Requires players.animations.control and the same ownership/readiness checks as play(). Accepts 1–16 steps with profile, optional clip, durationMs, item and itemContact. Each omitted duration uses the measured clip cycle when available, otherwise 5000 ms; steps must last 1000–600000 ms and the total cannot exceed 600000 ms. The sequence option loop defaults to false. A hold_item_walk → drink_walk → hold_item_walk chain preserves the prop ID while the item record stays the same. Each new play call gets a new playbackId; a sequence coordinates one player. Workspot transitions may require asynchronous exit/re-entry. For a layer, item omitted uses its default native item; item=false suppresses the animation-owned item. A server may select an Items.* record with world.props. Custom records requested by clients return item_requires_server; workspots reject the item option with item_requires_layer. The native attachment supplies the grip; item does not accept offset or rotation. The runtime owns temporary-item cleanup; inventory, needs and job rewards remain resource-owned. Upper-body layers preserve walking and running; workspots cancel on movement. Requires matching client, server and animation archives. The item option requires native animation-item support; the native function's since field does not establish the first build supporting every option. First-person support is experimental and profile-dependent. See [RP animations](/docs/rp-animations#upper-body-actions-for-jobs-and-inventory). Provided directly by the server runtime; no animation resource export dependency is needed for this server call. Experimental itemContact is server-only. Supplying this option needs the world.props capability, including false. Omit it for automatic geometry-based mouth contact, use false to disable fitting, or {x,y,z} in item-local metres (missing axes are zero; each supplied coordinate finite and within ±2). Accepted on a layer only; invalid points return invalid_item_contact before replacing the action. It adjusts the arm target, preserves the authored grip and reuses the animation-owned item ID when its record is unchanged. Fitting applies to drink_walk, bottle_walk, smoke_walk and cigar_walk; hold_item_walk only holds. Matching runtime/assets are required and visual validation is incomplete. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact). Automatic container contact uses the main mesh end along the authored item-local up direction (the can rim), keeping that end while tilting; smoking uses the end nearest the mouth. In first person, held items stay visible at the lower right between sips and contact follows the camera. Disabling mouth fitting keeps the first-person holding pose.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return Accepted playback state including playbackId | nil, error on rejection
     */
    sequence(this: void, playerId: number, steps: Open77Table, options?: Open77Table): LuaMultiReturn<[unknown, string | undefined]>;
    /**
     * Stop an RP action owned by the calling server resource.
     *
     * Requires players.animations.control. Omitting playbackId stops the current action owned by this VM generation; an action owned by another resource is refused. Pass the recorded ID in delayed callbacks so an old timer cannot stop a newer action: stale IDs return stale_playback. Stopping an already inactive player succeeds. The authoritative onPlayerAnimationChanged event carries the player ID string and JSON state string; native detachment may finish asynchronously on clients. This is not the client-local stop(entity) method. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.48
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return true on success, including already inactive | nil, error on rejection
     */
    stop(this: void, playerId: number, playbackId?: string): LuaMultiReturn<[boolean, string | undefined]>;
    /**
     * Stop a placed action by its handle alone.
     *
     * Requires players.animations.control. Takes the playbackId that playAt (or play) returned and ends that action, tearing down its workspot device on every client; nothing else needs remembering, in particular not which player it belonged to. Refuses with animation_owned when another resource VM started it and invalid_playback for an empty or oversized handle. A handle whose action already ended succeeds, exactly as stop does on an idle player: once the entry is gone, 'already finished' and 'never existed' are the same answer, and the caller's intent -- nothing running under this handle -- holds either way. Resource stop, restart and disposal tear placed actions down without this call, as they do every other action the VM owns. Provided directly by the server runtime; no animation resource export dependency is needed for this server call.
     *
     * @permission players.animations.control
     * @since 2.31.13+op77.73
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return true, including when the handle no longer names a running action | nil, error on rejection
     */
    stopAt(this: void, playbackId: string): LuaMultiReturn<[boolean, string | undefined]>;
}
interface Open77AppearanceApi {
    /**
     * Restores a saved appearance snapshot on a player, without the client asking.
     *
     * Asynchronous, and relayed exactly like `Open77.clothing`: the addressed client owns the REDengine player object, so the server asks and the client answers. Requires `players.appearance.relay` in the manifest AND `network.events`; the request is relayed to the official `open77_appearance` client package. Returns a request id prefixed with the resource name and an `appearance` segment, so an appearance answer can never complete a clothing or weapon request and only this resource's VM can match the completion. Listen for the resource-local `open77:appearance:relayCompleted` event with `playerId, requestId, operation, accepted, reason, result`; an unanswered request completes with `request_timeout` after ten seconds rather than leaving the caller waiting. The client refuses while its appearance is busy (`appearance_busy` -- an editor, the character creator or a fitting-room preview is open), before the player is in the world (`player_not_ready`) or after a failed restore (`appearance_restore_failed`). `players.appearance.relay` is a permission of its own, not a corner of `player.appearance.edit` (which is a client-side grant over the local player) or of clothing (garments a player can see and take off): a snapshot is the output of the character creator and the closest thing the platform holds to a likeness of the person playing. Nothing here writes a snapshot to a log. The snapshot must be the table `capture` returned. It does not reach the native layer behind `open77_appearance`'s back: it becomes that player's new appearance **record** -- the server's word about what they wear -- and the resource's ordinary reconciliation puts it on the body. That is the same road a stored appearance takes at world entry, so a relayed face survives death, a bucket change and a reload instead of being quietly undone by the next reconcile. It does **not** change the body family: a different family is a player *reload*, not an appearance change, and a snapshot whose gender disagrees with the body on the player is refused with `body_family_mismatch`. The platform's stored appearance row is not written -- a resource that wants the change to outlive the session owns that persistence itself. Completion is the client's acceptance, reported once the player is observed wearing the snapshot; `apply_timeout` means the record was set but the body had not settled in eight seconds, and `appearance_superseded` means a newer apply replaced it.
     *
     * @permission network.events, players.appearance.relay
     * @since 2.31.13+op77.67
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: permission_denied:players.appearance.relay, invalid_player, invalid_snapshot, dispatch_failed
     */
    apply(this: void, playerId: number | string, snapshot: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Asks a player's client for its current appearance snapshot.
     *
     * Asynchronous, and relayed exactly like `Open77.clothing`: the addressed client owns the REDengine player object, so the server asks and the client answers. Requires `players.appearance.relay` in the manifest AND `network.events`; the request is relayed to the official `open77_appearance` client package. Returns a request id prefixed with the resource name and an `appearance` segment, so an appearance answer can never complete a clothing or weapon request and only this resource's VM can match the completion. Listen for the resource-local `open77:appearance:relayCompleted` event with `playerId, requestId, operation, accepted, reason, result`; an unanswered request completes with `request_timeout` after ten seconds rather than leaving the caller waiting. The client refuses while its appearance is busy (`appearance_busy` -- an editor, the character creator or a fitting-room preview is open), before the player is in the world (`player_not_ready`) or after a failed restore (`appearance_restore_failed`). `players.appearance.relay` is a permission of its own, not a corner of `player.appearance.edit` (which is a client-side grant over the local player) or of clothing (garments a player can see and take off): a snapshot is the output of the character creator and the closest thing the platform holds to a likeness of the person playing. Nothing here writes a snapshot to a log. The result is `{ snapshot, family, revision, characterKey }`, where `snapshot` is the network form -- schema version, game build, catalogue digest, gender and the option identities and values -- with the editor's local metadata (editable/active/censored) stripped. It is the same shape `apply` takes, so a capture can be stored and handed straight back later.
     *
     * @permission network.events, players.appearance.relay
     * @since 2.31.13+op77.67
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: permission_denied:players.appearance.relay, invalid_player, dispatch_failed
     */
    capture(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
}
interface Open77AudioApi {
    /**
     * DestroySound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    destroy(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * GetSoundState: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return table, or nil, reason
     */
    getState(this: void, id: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * PauseSound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
     * @open77Return true, or failure, reason
     */
    pause(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * PlaySound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
     * @open77Return true, or failure, reason
     */
    play(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Play2DSound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
     * @open77Return integer handle, or nil, reason
     */
    play2D(this: void, asset: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Play3DSound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @failure audio_asset_not_declared_or_unsafe, audio_unavailable, invalid_audio_options, invalid_audio_request, invalid_json, json_too_large, loop_requires_duration, permission_denied:audio.network, resource_stopping, server_audio_must_be_networked, sound_not_found
     * @open77Return integer handle, or nil, reason
     */
    play3D(this: void, asset: string, position: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * SeekSound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    seek(this: void, id: number, seconds: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * SetSoundPosition: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    setPosition(this: void, id: number, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * SetSoundVolume: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    setVolume(this: void, id: number, volume: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * StopSound: server-authoritative network package audio.
     *
     * Requires audio.network; network=false is rejected. Server owns the timeline, handles and bucket/optional-target audience. Clients cannot request broadcasts directly. getState reports intended playback, not decoder acknowledgement. Assets must be declared in the resource manifest files; absolute paths, URLs and traversal are rejected. Handles are scoped to the creating resource VM; stop rewinds, pause preserves position, seek uses seconds, destroy releases permanently. Volume 0..1, range <=1000m. Network loops require actual duration. See package-audio.md for options, lifecycle, quotas and errors.
     *
     * @permission audio.network
     * @since 2.31.13+op77.63
     * @open77Return true, or failure, reason
     */
    stop(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77CallbacksApi {
    /**
     * Alias of Open77.net.callClient.
     *
     * Asks one client a question and returns an Open77.Promise, or nil, reason when the request is refused before it leaves.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_arguments_not_serializable, callback_payload_too_large, callback_request_limit, callback_too_many_arguments, invalid_callback_name, invalid_callback_timeout, network_unavailable, permission_denied:network.events, resource_stopping
     * @open77Return Open77.Promise, or nil, reason
     */
    callClient(this: void, playerId: number, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.callClientAwait.
     *
     * Awaits the promise, so it needs a CreateThread or another managed task.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_arguments_not_serializable, callback_payload_too_large, callback_request_limit, callback_too_many_arguments, invalid_callback_name, invalid_callback_timeout, network_unavailable, permission_denied:network.events, resource_stopping
     * @open77Return the client handler's return values, or nil, reason
     */
    callClientAwait(this: void, playerId: number, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.register.
     *
     * Open77.callbacks is the same four callback functions under a second name, for resources that prefer to read the callback surface as its own namespace. Pick one spelling per resource; these are the same functions, not copies.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_function_required, callback_registration_limit, invalid_callback_name, permission_denied:network.events, resource_stopping
     * @open77Return true, or nil, reason
     */
    register(this: void, name: string, handler: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias of Open77.net.unregister.
     *
     * Stops answering that name; a later request is refused with callback_not_found on the next frame.
     *
     * @since 2.31.13+op77.67
     * @failure callback_not_found, invalid_callback_name
     * @open77Return true, or false, reason
     */
    unregister(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ChatApi {
    /**
     * Publishes one slash-command suggestion to a player's chat.
     *
     * Facade over `chat:addSuggestion`. `target` is a playerId or -1 for everyone; `command` is the command text (for example "/tow"), `help` a one-line description, `parameters` a list of { name, help } tables. The suggestion list is also what the admin menu harvests. Publishes on the host bus, so it answers `resource_preparing` at the top level of a script: call it from `AddEventHandler("onResourceStart", ...)`, a command or an event handler.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_command, invalid_chat_suggestion, invalid_chat_target, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    addSuggestion(this: void, target: number, command: string, help?: string, parameters?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Publishes a list of slash-command suggestions at once.
     *
     * Facade over `chat:addSuggestions`. `target` is a player id (a number) or `-1` for everyone; the list is an array of { command, help, parameters } tables, `parameters` being a list of { name, help } tables (FiveM's shape). Usually sent from a `chat:ready` handler (raised by each player's chat UI once it is up; `source` is that player) and once from `onResourceStart` with `-1`, for the players already connected. Publishes on the host bus, so it answers `resource_preparing` at the top level of a script.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_suggestion, invalid_chat_target, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    addSuggestions(this: void, target: number, list: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sends a chat message to every player.
     *
     * Exactly `Open77.chat.send(-1, message)`: the same reasons, the same asynchrony and the same ordering caveat, and the same `resource_preparing` answer at the top level of a script.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_message, invalid_chat_target, invalid_event_name, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    broadcast(this: void, message: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Clears a player's local chat history.
     *
     * Facade over `chat:clear`. Presentation only -- it empties what that client is showing and deletes nothing on the server.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_target, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    clear(this: void, target: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Observes every chat message the authority accepted.
     *
     * Subscribes to `chat:message`, so the handler receives (playerId, playerName, text) AFTER the cancellable `chatMessage` veto has settled. It is therefore the wrong place to refuse a message: to do that, AddEventHandler('chatMessage', ...) and call CancelEvent(). Returns the handler id for RemoveEventHandler.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_chat_handler
     * @open77Return handler id, or nil | reason
     */
    onMessage(this: void, handler: Open77Callback): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Withdraws one slash-command suggestion.
     *
     * Facade over `chat:removeSuggestion`. Use it when a command stops being available to that player rather than leaving a suggestion that will be refused.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_command, invalid_chat_target, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    removeSuggestion(this: void, target: number, command: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sends a chat message to one player, or to everyone with -1.
     *
     * A thin facade over `chat:addMessage` on the host-wide event bus; `open77_chat` remains the only chat authority and does the actual push to clients. `playerId` must be a **number**: an integer id, `-1` or `nil` for everyone. A player id delivered by a host event (`onPlayerReady`, `onPlayerDisconnected`, `onPlayerEnteredVehicle`...) is a string and is refused with `invalid_chat_target` -- pass `tonumber(playerId)`; `source` inside a net-event or command handler is already a number. `message` is a plain string (1 to 4,096 bytes) or the full table the chat UI renders ({ type, author, text, playerId, color = { r, g, b } as a positional array of three 0-255 numbers, e.g. `{ 0, 229, 255 }` -- a keyed `{ r = ..., g = ..., b = ... }` table is silently ignored by the chat UI }). Grants nothing: the facade never reaches a client itself, so it needs no `network.events`. Because it publishes on the host bus it answers `resource_preparing` at the top level of a script, before the chunk has loaded: send from `onResourceStart`, a command or an event handler. Delivery is asynchronous -- it lands on the next tick boundary -- and two sends in the same tick arrive in the opposite order, because the resource scheduler collects ready tasks back to front. Put a `Wait(0)` between lines that must read in order. With no chat authority running the call still returns true, since the bus cannot tell a publisher that nobody listened.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_chat_message, invalid_chat_target, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true on success, otherwise false | failure reason
     */
    send(this: void, playerId: number, message: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ClothingApi {
    /**
     * Asks a player's client to empty every clothing slot.
     *
     * Asynchronous, same relay and completion contract as the other clothing calls.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    clear(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Asks a player's client to equip one clothing record.
     *
     * Asynchronous. The calling resource must declare `network.events`; the request is relayed to the official `open77_equipment` client package. Returns a request id prefixed with the resource name -- only this resource's VM can match the completion. Listen for the resource-local `open77:clothing:completed` event with `playerId, requestId, operation, accepted, reason, result`; an unanswered request completes with `request_timeout` after ten seconds. Completion is acceptance by the client relay, not proof that other observers see the change.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_record, invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    equip(this: void, playerId: number | string, record: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Asks a player's client for its current clothing state.
     *
     * Asynchronous. The completion event's `result` carries rows with `slot`, `attachmentSlot`, `equipped` and an optional `record`/`tweakDbId`. This is a read of the client's live registry, so it is the honest answer to "what is actually on them" after a write has settled.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    requestSnapshot(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Applies a whole slot-to-record wardrobe to a player in one request.
     *
     * Asynchronous, same relay and completion contract. `wardrobe` maps slot to record, for example `{ outer_chest = "Items.Jacket_01_basic_01" }`; `false` empties a slot and an omitted slot is left unchanged. An active wardrobe outfit on the client can hide what this equips.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_wardrobe, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    set(this: void, playerId: number | string, wardrobe: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Asks a player's client to empty one clothing slot.
     *
     * Asynchronous, same relay, same completion event and ten-second timeout as `equip`. Slot names follow the relay's equipment registry.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_slot, invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    unequip(this: void, playerId: number | string, slot: string): LuaMultiReturn<[number | undefined, string | undefined]>;
}
interface Open77CombatApi {
    /**
     * Enable scoped PvP for an explicit ready roster.
     *
     * Requires combat.scope.control. definition={bucket,players={...}} accepts2..32 unique positive player IDs currently combat-capable in that bucket; a player belongs to at most one scope. Limits64 scopes globally/8 per resource. Scope can permit PvP while global PvP is off but keeps team, life, invulnerability and Lua veto rules. Stop/disconnect/bucket changes remove ownership/participants. Creator must enforce opt-in; no automatic team or bucket change occurs.
     *
     * @permission combat.scope.control
     * @since 2.31.13+op77.63
     * @failure combat_unavailable, invalid_operation, invalid_scope, permission_denied:combat.scope.control, resource_stopping
     * @open77Return scope ID string | nil, reason on rejection
     */
    createScope(this: void, definition: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Removes a previously installed damage arbiter.
     *
     * Requires `combat.config`. Pass the value `onDamage` returned. Removing a handler that is not installed is a no-op.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return void
     */
    offDamage(this: void, handler: Open77Callback): void;
    /**
     * Installs a synchronous damage arbiter and returns it.
     *
     * Requires `combat.config`. The handler receives one event table `{ victim, attacker, amount, attackKind, bodyPart, weaponTdbId, distance }` for every candidate damage application. A car impact on a player also carries `source = "vehicle"`, `vehicle` and `driver` (the vehicle and seated driver the server found, `0` when none), `speed` (server-observed relative m/s) and `vehicleReason` (`driver`, `npc_driver`, `unowned_vehicle`, `no_vehicle_found`, `unverified_position`); `attacker` is the victim itself unless the server option `combat.vehicleHitCreditsDriver` credits the driver. Returning `false` cancels the damage and the first refusal wins; returning a number rewrites the amount for the arbiters that follow; anything else leaves it alone. Handlers run inside a `pcall`, so one that raises is skipped rather than dropping the hit. Keep the body short: this runs on the server tick, in the damage path.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return the handler, so it can be stored for offDamage
     */
    onDamage(this: void, handler: Open77Callback): unknown;
    /**
     * Remove this resource's scoped PvP permission.
     *
     * Requires combat.scope.control. Accepts the32-character scope ID returned by createScope. Does not alter global PvP or revive/teleport participants. Missing or foreign scopes fail; ordinary combat policy applies after removal.
     *
     * @permission combat.scope.control
     * @since 2.31.13+op77.63
     * @failure combat_unavailable, invalid_operation, invalid_scope, permission_denied:combat.scope.control, resource_stopping
     * @open77Return true | nil, reason on rejection
     */
    removeScope(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Scales every damage application on the server.
     *
     * Requires `combat.config`. Range 0 to 100; `0` makes the server effectively damage-free without touching god mode. Applied before the headshot, weapon and kind multipliers.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setDamageMultiplier(this: void, multiplier: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables or disables global player-versus-player damage.
     *
     * Requires `combat.config`. Players carrying the same nonzero team remain protected even when friendly fire is on, so a team mode does not have to arbitrate every hit itself. For a duel between two named players while global PvP stays off, use `createScope` instead.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setFriendlyFire(this: void, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Scales damage from hits on the head.
     *
     * Requires `combat.config`. Range 0 to 100. Combines with the global multiplier rather than replacing it.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHeadshotMultiplier(this: void, multiplier: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Overrides the damage of one attack kind.
     *
     * Requires `combat.config`. Kinds are `ranged`, `melee` and `explosion`, range 0 to 100. Useful for a melee-only round without removing weapons from anyone.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setKindDamageMultiplier(this: void, kind: string, multiplier: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Assigns a player to a combat team.
     *
     * Requires `combat.config`. Team ids are non-negative; `0` means no team. Two players on the same nonzero team never damage each other, whatever the friendly-fire setting.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setTeam(this: void, playerId: number | string, teamId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Overrides the damage of one weapon record.
     *
     * Requires `combat.config`. Range 0 to 100, keyed by the weapon's TweakDB id, so a single gun can be tuned without rebalancing everything.
     *
     * @permission combat.config
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setWeaponDamageMultiplier(this: void, weaponTdbId: string, multiplier: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ConvarsApi {
    /**
     * Namespaced spelling of `GetConvar`.
     *
     * The same function value.
     *
     * @since 2.31.13+op77.67
     * @open77Return string, or the default
     */
    get(this: void, name: string, arg2?: unknown): string;
    /**
     * Namespaced spelling of `GetConvarBool`.
     *
     * The same function value.
     *
     * @since 2.31.13+op77.67
     * @open77Return boolean, or the default
     */
    getBool(this: void, name: string, arg2?: boolean): boolean;
    /**
     * Namespaced spelling of `GetConvarInt`.
     *
     * The same function value.
     *
     * @since 2.31.13+op77.67
     * @open77Return integer, or the default
     */
    getInt(this: void, name: string, arg2?: number): number;
    /**
     * Namespaced spelling of `SetConvar`.
     *
     * The same function value.
     *
     * @since 2.31.13+op77.67
     * @failure convars_unavailable, invalid_convar_name, invalid_convar_value
     * @open77Return true, or false | reason
     */
    set(this: void, name: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77CyberwareApi {
    /**
     * Read fresh authoritative Gorilla charge activity.
     *
     * Requires players.cyberware.read. Returns {player,incarnation,sequence,armed,holding,charged,chargeExpired,holdAt,elapsedMs,remainingMs,maxChargeMs,definition,grade}. Null for unavailable/stale (over1500ms) body/implant activity. Values drive presentation, not an extra permission to commit damage. Hold expiry latches until release/new swing.
     *
     * @permission players.cyberware.read
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return activity table, or nil | nil, reason on failure
     */
    activity(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Bind the authenticated player to a server-selected durable character.
     *
     * Requires players.cyberware.identity. The user UUID comes from the connection; only the character key is supplied. Identity ownership is exclusive to a resource. Starts asynchronous database/native restoration; success is not readiness. Prefer the shipped appearance identity adapter and never accept an unvalidated client-selected character key.
     *
     * @permission players.cyberware.identity
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,...} | nil, reason on rejection
     */
    bind(this: void, playerId: number, character: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Cancel an owned installation/removal before durable commit.
     *
     * Requires players.cyberware.manage. Supply the ticket from the same resource's operation. Native staging is rolled back; an already submitted storage transaction returns operation_committing and completes normally. Never refund irrevocably until the correlated operation outcome is known.
     *
     * @permission players.cyberware.manage
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,...} | nil, reason on rejection
     */
    cancel(this: void, playerId: number, ticket: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read the ready durable implant record.
     *
     * Requires players.cyberware.read. Returned synchronously, not a Promise. Record fields are revision, arms and operationId; arms includes instanceId, definition, definitionVersion, profile, slot and the committed grade snapshot. Returns nil while loading/projecting/failed. An empty arms value means no installed implant. Temporary arena overlays do not overwrite this record. A ready record does not imply its definition provider is running.
     *
     * @permission players.cyberware.read
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return record table, or nil when not ready | nil, reason on failure
     */
    current(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Register resource-owned Gorilla Arms grades.
     *
     * Requires players.cyberware.define. definition={id,version,slot="arms",profile="gorilla_arms",grades={...}}. IDs use1..96 ASCII alphanumeric/_.:- characters; version positive;1..32 unique grades. Required grade fields: id,normalDamage/chargedDamage(0..300),knockbackMeters(0..6),cooldownMs(100..600000),chargeMs(100..10000). Optional normalKnockbackMeters defaults to35% of charged, maxChargeMs defaults10000 and must be>=chargeMs and<=60000; nullable normalStaminaCost/chargedStaminaCost0..300 retain native price when omitted. nonlethal/cosmetic defaultfalse; blockDamageMultiplier0..1 default0 and blockAngleDegrees0..180 default45. Stop unregisters the provider and disables its grants without deleting paid records.
     *
     * @permission players.cyberware.define
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,error=nil,ticket=nil,lease=nil} | nil, reason on rejection
     */
    define(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read the ready implant including an active temporary loadout.
     *
     * Requires players.cyberware.read. Returned synchronously, not a Promise. Record fields are revision, arms and operationId; arms includes instanceId, definition, definitionVersion, profile, slot and the committed grade snapshot. An active lease overlays arms; durable revision/operationId retain their base meaning. Pending/restoring projections return nil. Use current() for paid storage identity and effective() for ready presentation/gameplay loadout.
     *
     * @permission players.cyberware.read
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return effective record table, or nil | nil, reason on failure
     */
    effective(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stage a durable Gorilla Arms installation.
     *
     * Requires players.cyberware.manage. options requires expectedRevision and operationId. Compare-and-swap and receipt storage are atomic; reuse the same ID/contents on retries. Native projection occurs before commit. Completion is asynchronous via onCyberwareOperationCompleted(playerId,ticket,encodedResult), correlated by ticket; retain the pending operation until final outcome. Rejected/failed work restores the prior paid record. Server makers own consent, costs and progression.
     *
     * @permission players.cyberware.manage
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,ticket=string,...}; ticket may be absent on a completed idempotent replay | nil, reason on rejection
     */
    install(this: void, playerId: number, definition: string, grade: string, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stage a temporary implant without overwriting paid state.
     *
     * Requires players.cyberware.temporary. options.durationMs is1000..300000, default300000. Requires a ready bound character and registered definition/grade. pending→active only after native acknowledgement. Wait for the matching onCyberwareLeaseChanged state before admitting PvP. Owner stop, body/bucket change, expiry or disconnect releases the overlay; native restoration remains asynchronous.
     *
     * @permission players.cyberware.temporary
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,lease=string,ticket=string,...} | nil, reason on rejection
     */
    lease(this: void, playerId: number, definition: string, grade: string, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read a temporary loadout lease and restoration phase.
     *
     * Requires players.cyberware.read. Returns {id,player,phase,definition,grade,expiresAt,ticket,reason}, or nil when none exists. Phases pending/active/restoring/failed; ended is an event state, then the read becomes nil. expiresAt is server-monotonic milliseconds. Wait for nil AND current() ready before another lease.
     *
     * @permission players.cyberware.read
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return lease-state table, or nil | nil, reason on failure
     */
    leaseState(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Create an operation ID to retain across durable retries.
     *
     * Requires players.cyberware.manage. Returns a32-character GUID string. Store it with the pending operation and reuse the same ID, expectedRevision and contents when retrying; generating a new ID per retry loses receipt idempotency. This does not start a transaction.
     *
     * @permission players.cyberware.manage
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return operation ID string | nil, reason on rejection
     */
    newOperationId(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Release this resource's temporary loadout and restore paid arms.
     *
     * Requires players.cyberware.temporary. Works during pending/active; repeated restoration requests return the same ticket. Lease id and resource owner must match. An ended event due to body loss alone is not proof of native paid restoration: wait for no lease and a ready current record.
     *
     * @permission players.cyberware.temporary
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,ticket=string,...} | nil, reason on rejection
     */
    releaseLease(this: void, playerId: number, lease: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stage a durable Gorilla Arms removal.
     *
     * Requires players.cyberware.manage. options requires expectedRevision and operationId. Compare-and-swap and receipt storage are atomic; reuse the same ID/contents on retries. Native projection occurs before commit. Completion is asynchronous via onCyberwareOperationCompleted(playerId,ticket,encodedResult), correlated by ticket; retain the pending operation until final outcome. Rejected/failed work restores the prior paid record. Server makers own consent, costs and progression.
     *
     * @permission players.cyberware.manage
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,ticket=string,...}; ticket may be absent on a completed idempotent replay | nil, reason on rejection
     */
    remove(this: void, playerId: number, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Release this resource's character binding and runtime grants.
     *
     * Requires players.cyberware.identity. Does not delete durable implants. Stops current projection/temporary ownership and prevents stale acknowledgements from restoring the old grant. Another owner cannot unbind the character.
     *
     * @permission players.cyberware.identity
     * @since 2.31.13+op77.63
     * @failure cyberware_storage_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.cyberware.define, permission_denied:players.cyberware.identity, permission_denied:players.cyberware.manage, permission_denied:players.cyberware.read, permission_denied:players.cyberware.temporary, player_unavailable, request_too_large, resource_stopping
     * @open77Return {ok=true,...} | nil, reason on rejection
     */
    unbind(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77DashApi {
    /**
     * Cancels a player's active Dash by its activation id.
     *
     * Requires `players.dash.manage`. Cancellation keeps bounded server movement ownership during native recovery, until the correlated native-exit acknowledgement or a 1500 ms deadline; `current().phase` reports `recovering` in that window. The charge and stamina spent on acceptance are not refunded.
     *
     * @permission players.dash.manage
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    cancel(this: void, playerId: number, activationId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reports the supported Dash profile and implementation limits.
     *
     * Requires `players.dash.read`. The one `profile` (`dash`), the configuration bounds `define` enforces, the presentation presets and the movement model. Read it to build a definition editor rather than hard-coding the table in [Dash / Air Dash](dash.md).
     *
     * @permission players.dash.read
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return capabilities table | nil, reason on failure
     */
    capabilities(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads a player's Dash activity and projection state.
     *
     * Requires `players.dash.read`. Answers `{ projection, charges, cooldownUntil, nextChargeAt, airUsed, activation, phase, ownedByCaller }` -- times in server monotonic milliseconds -- or `nil` when the player holds no Dash. `ownedByCaller` is server-derived and stays accurate across projection restarts; a definition id or revision alone is not proof of ownership.
     *
     * @permission players.dash.read
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return activity table, or nil when absent | reason on failure
     */
    current(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers an immutable, versioned Dash definition owned by this resource.
     *
     * Requires `players.dash.define`. `definition` is `{ id, version, profile = "dash", config }`; `config` takes `inputKey`, `allowGround`, `allowAir`, `requireDoubleJump`, `movementProfile = "native"`, `presentation` (`native` | `silent` | `none`), `staminaCost` (0..300), `cooldownMs` (300..600000), `maxCharges` (1..3), `chargeRegenMs`, `landingRearmMs` (150..1000), `maxAirborneMs` (100..10000) and `maxFallSpeed` (0.1..30). Speed, distance and immunity are not configurable. Ownership comes from the resource, never from a supplied owner name. See [Dash / Air Dash](dash.md).
     *
     * @permission players.dash.define
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    define(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Grants a player this resource's Dash capability and starts its native projection.
     *
     * Requires `players.dash.manage`. A success means pending native work, not a usable Dash: read `current(player).projection.status == "ready"` before presenting it. Grants require the authenticated cyberware character binding and an alive, ready, unmounted body. They are session capabilities -- no implant is purchased or replaced -- and cooldown or charge debt survives revoke and regrant within the session.
     *
     * @permission players.dash.manage
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    grant(this: void, playerId: number, definitionId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes this resource's Dash grant from a player.
     *
     * Requires `players.dash.manage`. Only the calling resource's capability is removed; another resource's grant and every installed implant stay. Charge and cooldown debt are retained for the session.
     *
     * @permission players.dash.manage
     * @since 2.31.13+op77.67
     * @failure dash_unavailable, invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.dash.define, permission_denied:players.dash.manage, permission_denied:players.dash.read, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    revoke(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77DataApi {
    /**
     * Looks up an `Items.*` clothing or item record in the shipped 2.31 catalogue.
     *
     * No permission required; this is static game data. A `record` is a **TweakDB string**, never a Jenkins hash -- the same choice the `Citizen` alias layer's `GetHashKey` already made, and a resource ported from FiveM must expect it. The server answers from a reduced catalogue embedded in the host and parsed lazily on first use; a **client** answers the same call from the live TweakDB, in the player's own language. Read `source` to tell them apart: `catalogue` here, `tweakdb` there. A field that could only be derived says so -- `seatsSource` of `class` on a vehicle means the seat count came from the chassis class in the record name, because no repository source holds a real one. An unknown record fails with `record_unknown`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_kind, invalid_record, record_unknown
     * @open77Return { record, kind, source, build, ... }, or nil | reason
     */
    item(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Refused on the server: localisation only exists inside the game.
     *
     * Always answers `nil, "localization_client_only"`. The locale tables live in the game's own resources, which a dedicated server does not have, and handing back the key would let it pass for a translation. Send the row's `localeKey` to a client and call `Open77.data.localize` there. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_key, localization_client_only
     * @open77Return nil | reason
     */
    localize(this: void, key: number | string): LuaMultiReturn<[undefined | undefined, string | undefined]>;
    /**
     * Looks up an NPC entity template path in the shipped 2.31 catalogue.
     *
     * No permission required; this is static game data. A `record` is a **TweakDB string**, never a Jenkins hash -- the same choice the `Citizen` alias layer's `GetHashKey` already made, and a resource ported from FiveM must expect it. The server answers from a reduced catalogue embedded in the host and parsed lazily on first use; a **client** answers the same call from the live TweakDB, in the player's own language. Read `source` to tell them apart: `catalogue` here, `tweakdb` there. A field that could only be derived says so -- `seatsSource` of `class` on a vehicle means the seat count came from the chassis class in the record name, because no repository source holds a real one. An unknown record fails with `record_unknown`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_kind, invalid_record, record_unknown
     * @open77Return { record, kind, source, build, ... }, or nil | reason
     */
    npc(this: void, template: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Looks up a `Vehicle.*` record in the shipped 2.31 catalogue.
     *
     * No permission required; this is static game data. A `record` is a **TweakDB string**, never a Jenkins hash -- the same choice the `Citizen` alias layer's `GetHashKey` already made, and a resource ported from FiveM must expect it. The server answers from a reduced catalogue embedded in the host and parsed lazily on first use; a **client** answers the same call from the live TweakDB, in the player's own language. Read `source` to tell them apart: `catalogue` here, `tweakdb` there. A field that could only be derived says so -- `seatsSource` of `class` on a vehicle means the seat count came from the chassis class in the record name, because no repository source holds a real one. An unknown record fails with `record_unknown`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_kind, invalid_record, record_unknown
     * @open77Return { record, kind, source, build, ... }, or nil | reason
     */
    vehicle(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Looks up a weapon record or hexadecimal TweakDBID in the shipped 2.31 catalogue.
     *
     * No permission required; this is static game data. On the server, `record` accepts either an `Items.*` TweakDB record name or a hexadecimal TweakDBID **string**, such as `"0x0000001e1601aa89"` (hex digits and the `0x` prefix are case-insensitive); it is not a Jenkins hash or a Lua numeric ID. The embedded weapons catalogue resolves either form to the same record and class metadata. The result has `kind = "weapon"`, `source = "catalogue"` and `build = "2.31"`. This is authoritative catalogue classification, not proof of weapon ownership or a hit, native RPG damage, or a damage price. Unknown records or IDs and malformed hex return `nil, "record_unknown"`; non-string, empty or over-256-character input returns `nil, "invalid_record"`. The client API is unchanged: it looks up a record name in live TweakDB, in the player's language, with `source = "tweakdb"`. See [Game data catalogues](data-catalogues.md).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_kind, invalid_record, record_unknown
     * @open77Return { record, displayName, class, category, itemType, equipArea, quality, localeKey, tweakDbId, canonical, kind, source, build }, or nil | reason
     */
    weapon(this: void, record: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77DatabaseApi {
    /**
     * Runs an INSERT and returns the inserted id.
     *
     * Requires `database.access`. Same callback and `.await` forms as `query`. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return inserted id or result
     */
    insert(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown;
    /**
     * Whether the database has answered yet.
     *
     * Requires `database.access`. `true` once the host's probe has opened a connection and got an answer out of it; otherwise `false` and the reason -- `database_connecting` while the first connection is still being attempted, `database_unreachable` for a database that is configured but not answering (still retried), `database_unavailable` for a server that has no database bridge at all, and `permission_denied:database.access` for a resource that may not query one. Readiness is one-way: a later outage surfaces as a failing request, not as un-readiness, because every request already reports its own failure.
     *
     * @permission database.access
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    isReady(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias of `Open77.database.query`.
     *
     * Requires `database.access`. Present for oxmysql compatibility: `prepare` and `query` are the same function, so an ported resource that calls one behaves exactly as one that calls the other. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return rows
     */
    prepare(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown;
    /**
     * Runs a SQL query and returns every row.
     *
     * Requires `database.access`. `Open77.database` and the global `MySQL` are the same oxmysql-compatible table. Two forms: pass a callback, or use `Open77.database.query.await(sql, params?)` from a managed coroutine. Either way the continuation resumes on the owning resource's scheduler, never on the database worker, so the rest of the resource's state is safe to touch. `prepare` is an alias. Rows past `database.maxRows` (default 10 000) are dropped and the server logs a `WRN`; page with `LIMIT ?` bound to an integer. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return rows (await form), or nothing (callback form)
     */
    query(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown;
    /**
     * Alias of `Open77.database.update`.
     *
     * Requires `database.access`. Present for oxmysql compatibility; it is the same function as `update`, not a way around parameter binding. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return affected-row result
     */
    rawExecute(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown;
    /**
     * Runs a handler once the database is reachable, or refuses when it never will be.
     *
     * Requires `database.access`. oxmysql's boot gate: register schema creation or a migration here rather than racing it against the first connection. `ready` distinguishes three states a boolean would hide. A server with **no database configured** answers `false, "database_unavailable"` and the handler never runs -- the connection it would promise will never come. A database still connecting, or configured but **not answering**, queues the handler and keeps polling, so one that comes up late still fires. And a handler registered **after** readiness runs anyway, on the next tick, so a resource never has to ask whether it missed the moment. Handlers always run on this resource's own scheduler, never on the database worker. Refusals: `invalid_argument`, `database_unavailable`, `permission_denied:database.access`.
     *
     * @permission database.access
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true when the handler was run or queued, or false | reason
     */
    ready(this: void, handler: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Runs a SQL query and returns one value.
     *
     * Requires `database.access`. The first column of the first row -- a count, a sum, an id. Same callback and `.await` forms as `query`. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return one value or nil
     */
    scalar(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown | undefined;
    /**
     * Runs a SQL query and returns its first row.
     *
     * Requires `database.access`. Same callback and `.await` forms as `query`; answers `nil` when nothing matched, which is the difference from `query` returning an empty table. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return one row or nil
     */
    single(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown | undefined;
    /**
     * Runs several statements as one transaction.
     *
     * Requires `database.access`. `statements` is an array of `{ query, values }` entries; all of them commit or none do. Same callback and `.await` forms as `query`. Limits: 1 to 64 statements (`invalid_transaction`), and each statement carries the per-statement caps of `query` (64 KiB of SQL, 64 parameters, no `nil` holes, matching `?` count). A refusal before the request leaves returns `false, reason` and schedules the callback with `(nil, reason)`; `.await` raises for a refusal and returns `false, reason` for a rollback. The callback receives `(true, nil)` on commit. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    transaction(this: void, statements: Open77Table, callback?: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Runs a statement and returns the affected-row result.
     *
     * Requires `database.access`. Use it for UPDATE and DELETE. `rawExecute` is an alias for the same method. Same callback and `.await` forms as `query`. Limits, checked before the request leaves and refused whole rather than trimmed: 64 KiB of SQL, 64 parameters per statement (positional and named together -- a multi-row `INSERT ... VALUES (?,...),(?,...)` binds every `?`, so 50 rows of 6 columns is 300 and refused with `too_many_parameters`), a parameter table with no `nil` holes (`invalid_parameters`; write `NULL` in the SQL text instead), and as many positional values as `?` placeholders (`parameter_count_mismatch`). A refusal returns `false, reason`, schedules the callback with `(nil, reason)` and makes `.await` raise `reason`; it is not logged, so read the second callback argument. See [Limits of one request](server-api.md#limits-of-one-request).
     *
     * @permission database.access
     * @since 2.31.13+op77.45
     * @open77Return affected-row result
     */
    update(this: void, sql: string, params?: Open77Table, callback?: Open77Callback): unknown;
}
interface Open77EffectsApi {
    /**
     * Every looping effect, optionally filtered to one routing bucket.
     *
     * Requires `world.effects`. Returns the whole registry, not just this resource's effects; the snapshot's `resource` field is provenance and cleanup scope, not an authorization boundary.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @open77Return array of effect snapshots
     */
    all(this: void, bucket?: number): unknown;
    /**
     * Create a replicated effect bound to a typed target and native slot.
     *
     * Requires world.effects. target={kind="player"|"npc"|"vehicle"|"prop",id=decimalStringOrInteger}; effect is an installed preset. options requires slot; optional localAnchor=body|weaponRight, localSlot, ttlMs, streamingRadius=90, streamingHysteresis=20, localEvent, soundEvent, soundOnOwner=true. Uses exact target incarnation, streaming reattachment and resource-owned cleanup. localEvent selects an owner entity graph (not a sound); soundEvent is separate. Target disappearance/body/bucket change invalidates the effect. The ID proves registry admission, not visible/audible playback. Attachment TTL defaults60000 ms and is bounded to1..600000 ms; slot/localSlot are at most64 bytes. Limits are2048 effects globally and512 per resource. weaponRight/localEvent are player-only.
     *
     * @permission world.effects
     * @since 2.31.13+op77.63
     * @failure invalid_argument, invalid_slot, invalid_target_kind, permission_denied:world.effects, resource_stopping, world_unavailable
     * @open77Return decimal string effect ID | nil, reason on rejection
     */
    attach(this: void, target: Open77Table, effect: string, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Always an empty table on the server.
     *
     * The dedicated server keeps no curated effect catalogue: the aliases live on the client, next to the records they resolve. It answers an empty list rather than `nil` so the shipped console command stays honest instead of failing on a nil call. Use the client `Open77.vfx` catalogue for alias names.
     *
     * @since 2.31.13+op77.45
     * @open77Return empty table
     */
    catalog(this: void): Open77Table;
    /**
     * Clears every server-driven screen effect on one player.
     *
     * Requires `players.screenfx`. The same thing as `Open77.effects.screen(playerId, false)`, spelled out. Only the effects this relay owns are cleared: a client resource's own screen effects belong to that resource. See the Effects guide.
     *
     * @permission players.screenfx
     * @since 2.31.13+op77.67
     * @open77Return true, or false and a reason
     */
    clearScreen(this: void, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Creates a looping world effect owned by this resource.
     *
     * Requires `world.effects`. The field is `effect`, not `name`, and the lifetime is `ttlMs`: a looping VFX has no duration because the registry retires it, not the engine. Definitions accept `effect`, `position`, `orientation`, `bucket`, `visible`, `streamingRadius` (10 to 2000, default 90), `streamingHysteresis` (default 20) and `ttlMs`. The registry holds 2,048 looping effects, of which one resource may own 512.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_position, permission_denied:world.effects, world_unavailable
     * @open77Return effect id (decimal string), or nil | reason
     */
    create(this: void, def: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Detonates a blast at a point: VFX, area damage, and optionally the cars in it.
     *
     * Native-parity E6, FiveM's `AddExplosion`. It composes three authorities that already exist and adds none: the picture is the same one-shot as `Open77.effects.play`, the player damage goes through the stats authority exactly as `Open77.players.damage` does (so god mode, the life-phase interlocks, the `explosion` damage multiplier and kill attribution all apply), and vehicles go through `Open77.vehicles.explode` unchanged -- occupants stay occupants, and a wreck already blown up is quietly skipped. **Three grants, because the halves differ in reach.** `world.effects` is always required and on its own buys a blast that is only a picture. `world.explosions` is required the moment `damage` is positive: unlike `players.stats.apply`, which hurts a player the resource has already named, this one hurts everyone in a circle, including players it never enumerated. `vehicles = true` requires `world.vehicles`, and without that opt-in no car is touched. Damage falls off linearly to zero at the rim. `force` scales the ragdoll impulse on a **lethal** hit only -- there is no server-side push for a survivor. A player whose last snapshot is stale is skipped rather than damaged at a position the server is unsure of, and everything is scoped to one routing bucket. Publishes `onExplosion` host-wide, with counts rather than names. See the [effects guide](effects.md).
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @failure damage_unavailable, invalid_argument, invalid_bucket, invalid_damage, invalid_effect, invalid_force, invalid_player_id, invalid_position, invalid_radius, invalid_sound, permission_denied:world.effects, permission_denied:world.explosions, permission_denied:world.vehicles, vehicles_unavailable, world_unavailable
     * @open77Return table { players = { ids }, vehicles = { ids } }, or nil | reason: permission_denied:world.effects, permission_denied:world.explosions, permission_denied:world.vehicles, invalid_position, invalid_radius, invalid_damage, invalid_force, invalid_bucket, invalid_effect, invalid_sound, invalid_player_id, damage_unavailable, vehicles_unavailable, world_unavailable
     */
    explosion(this: void, position: Open77Table, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lights a script fire at a point: looping VFX plus a damage tick for whoever stands in it.
     *
     * Native-parity E7, FiveM's `StartScriptFire`. **The fire is one looping effect, and the `fireId` it answers IS that effect's id** -- same registry, same ownership, revisioning and streaming, so a player who walks away and comes back still finds it burning, `Open77.effects.get(fireId)` describes the flames and `onEffectCreated` announces them. Two ids for one object would have been two things that could disagree about whether it is still there. The registry is therefore the authority on EXISTENCE and the owning resource only on damage: `Open77.effects.remove(fireId)` puts the fire out with the reason `effect_removed` instead of leaving an invisible one burning, while expiry works the other way round -- the resource's own deadline retires the entry, which is why the effect carries no TTL of its own. **Damage is flat inside the radius, deliberately unlike an explosion's linear falloff**: a fire is a volume you are inside or outside of, and a falloff would make the rim nearly free. One damage interval is one second, so `damagePerSecond` is the literal unit; a billed interval is capped at five seconds so a server hitch cannot settle a minute of burning at once; and a player whose last snapshot is stale is skipped rather than burned at a position the server is unsure of. Damage goes through the same scripted-damage funnel as `Open77.players.damage` with the attack kind `environment` (2.31 has no fire kind), so god mode, the life-phase interlocks, the damage multiplier and kill attribution all apply. **The same three grants as an explosion and no new manifest string**: `world.effects` buys flames that are only a picture, `world.explosions` is required the moment `damagePerSecond` is positive, and `vehicles = true` requires `world.vehicles`. The capability describes the reach -- area damage to players the resource never enumerated -- and a fire reaches exactly as far as a blast repeated once a second. With `vehicles = true` a car burns at the same rate against its 0-1 pool scaled through one stated rule (a fire that kills a healthy player in ten seconds wrecks a healthy car in ten seconds) and one that reaches zero is exploded through `Open77.vehicles.explode`, C12's call and not a second way to blow up a car. At most 64 fires per resource, much lower than the effect registry's 512 because each one costs a per-second proximity sweep. Publishes `onFire` host-wide (and `fireEvent` under the FiveM name), with a count rather than names. See the [effects guide](effects.md).
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.73
     * @failure damage_unavailable, fire_limit, invalid_argument, invalid_bucket, invalid_damage, invalid_duration, invalid_effect, invalid_player_id, invalid_position, invalid_radius, permission_denied:world.effects, permission_denied:world.explosions, permission_denied:world.vehicles, resource_stopping, vehicles_unavailable, world_unavailable
     * @open77Return fire id (decimal string), which is also the looping effect's id, or nil | reason: permission_denied:world.effects, permission_denied:world.explosions, permission_denied:world.vehicles, invalid_position, invalid_radius, invalid_damage, invalid_duration, invalid_bucket, invalid_effect, invalid_player_id, fire_limit, quota_exceeded, damage_unavailable, vehicles_unavailable, world_unavailable, resource_stopping
     */
    fire(this: void, position: Open77Table, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists the fires this resource still has burning, ascending by id.
     *
     * Native-parity E7. Requires `world.effects`. Answers **this resource's** fires and nobody else's: they are its own to put out, and the host-wide `onFire` is how the rest of the server learns about somebody else's. Each row carries `id` (which is also the looping effect's id), `effect`, `position`, `radius`, `damagePerSecond`, `bucket`, `vehicles`, `attacker`, `hurt` and `remainingMs`. `hurt` is a COUNT of distinct players the fire has burned, never a roster -- the same rule the event follows, because who was standing in a fire is a proximity read the caller can do for itself if it is entitled to. `remainingMs` is absent for a fire lit with `durationMs = 0`, so an eternal fire is distinguishable from one about to go out rather than both reading as zero. An optional bucket narrows the list.
     *
     * @permission world.effects
     * @since 2.31.13+op77.73
     * @open77Return array of { id, effect, position, radius, damagePerSecond, bucket, vehicles, attacker, hurt, remainingMs? }
     */
    fires(this: void, bucket?: number): Open77Table;
    /**
     * Reads one looping effect's canonical snapshot.
     *
     * Requires `world.effects`. Reads are not restricted to the owning resource, so a spectator or admin tool can inspect an effect it did not create. Answers `nil` for an unknown id.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @open77Return effect snapshot, or nil
     */
    get(this: void, id: string): unknown | undefined;
    /**
     * Plays a one-shot world effect at a point.
     *
     * Requires `world.effects`. Broadcast to the players in range and never stored, so there is no handle and nothing to remove. Options are `position` (required, or the options table itself), `orientation` (quaternion, default identity), `bucket`, `range` (1 to 500, default 150) and `sound`.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_position, permission_denied:world.effects, world_unavailable
     * @open77Return true, or nil | reason
     */
    play(this: void, name: string, opts: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Play an ephemeral native effect on a typed target.
     *
     * Requires world.effects. A bare target ID explicitly means player; typed targets avoid collisions between registries. name is a native entity effect event. options supports duration(default0),loop(defaultfalse),slot. Snapshot lifetime guards reject replaced targets; this one-shot is not replayed after streaming. Use attach for a durable owned effect.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_target_kind, permission_denied:world.effects, world_unavailable
     * @open77Return true | nil, reason on rejection
     */
    playOn(this: void, target: number | string, name: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a looping effect this resource owns.
     *
     * Requires `world.effects`. Another resource's effect answers `owned_by_another_resource`; a resource may read every effect but mutate only its own.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, not_found, permission_denied:world.effects, world_unavailable
     * @open77Return true, or false | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Puts one of this resource's fires out: the flames and the burning stop together.
     *
     * Native-parity E7, FiveM's `RemoveScriptFire`. Requires `world.effects`. Removes the looping effect the fire is made of and stops the damage tick in the same statement, then publishes `onFire` with the state `stopped` and the reason `removed`. A fire that has already expired or been removed answers `not_found`, exactly as removing a looping effect twice does, and an id that belongs to another resource answers `owned_by_another_resource` -- the same distinction the effect registry draws, because "you put it out already" and "that is not yours" are different bugs in the caller. `Open77.effects.remove(fireId)` reaches the same end by a different door: the next tick finds the entry gone and stops the burn with the reason `effect_removed`.
     *
     * @permission world.effects
     * @since 2.31.13+op77.73
     * @failure not_found, permission_denied:world.effects, world_unavailable
     * @open77Return true, or nil | reason: permission_denied:world.effects, not_found, owned_by_another_resource, world_unavailable
     */
    removeFire(this: void, fireId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Plays a full-screen post-process effect on one player's own view.
     *
     * Requires `players.screenfx`. Deliberately NOT replicated -- a drunk screen belongs to the person who drank -- which is why it takes a playerId rather than a position, and why it reaches that client whether or not it runs any resource. `name` false or nil clears every effect this relay owns on that client. `options.strength` (0..1) picks among the authored tiers of the `drunk`, `drugged` and `health` families; `options.duration` is seconds, 0..600, 0 holding until cleared. The alias is checked against a mirror of the client table and refused as `unsupported_screen_effect`; the client's table stays the authority. See the Effects guide.
     *
     * @permission players.screenfx
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_screen_effect
     * @open77Return true, or false and a reason
     */
    screen(this: void, playerId: number, name: string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The screen-effect aliases this server will accept, ascending.
     *
     * A mirror of the client's curated table, so a typo is refused by the call that made it rather than by a log line on one player's machine. Includes the tiered family names (`drunk`, `drugged`, `health`) as well as their tiers. See the Effects guide.
     *
     * @since 2.31.13+op77.67
     * @open77Return array of alias strings
     */
    screenCatalog(this: void): unknown;
    /**
     * Play spatial sound on a typed target with optional action deduplication.
     *
     * Requires world.effects. A bare target means player. options={unique=false,duration=5,actionId?,excludePlayers?}; duration is seconds and bounded by the backend. actionId is an opaque resource-scoped identity: repeated delivery of one contact does not replay sound. excludePlayers omits selected listeners, useful when native contact already supplies their audio. Sound targets carry current lifetime identity; no stale-body playback or durable late-stream replay is implied. duration is0.05..60 seconds; actionId is at most192 bytes and deduplication retains it for60 seconds without TTL renewal. excludePlayers accepts at most32 positive IDs; action identities are limited to8192 globally/4096 per resource.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_sound_exclusions, invalid_target_kind, permission_denied:world.effects, world_unavailable
     * @open77Return true | nil, reason on rejection
     */
    sound(this: void, target: number | string, event: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Patches a looping effect this resource owns.
     *
     * Requires `world.effects`. Sparse: only the fields present are taken. The effect name is deliberately not patchable -- changing it is a remove and a create, because the running VFX instance is built from it.
     *
     * @permission world.effects
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_position, not_found, permission_denied:world.effects, world_unavailable
     * @open77Return true, or false | reason
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ElevatorsApi {
    /**
     * Takes a native lift under authoritative control.
     *
     * Requires `world.elevators`. The definition accepts `engineEntity`, `position`, `bucket`, `initialFloor`, `flags` (default powered plus interaction allowed) and a required `floorCount`. Adoption is what turns a scenery lift into a replicated object every client agrees about; before it, each client's lift is its own.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @failure elevators_unavailable, permission_denied:world.elevators
     * @open77Return elevator id, or nil | reason
     */
    adopt(this: void, def: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Every managed elevator, optionally filtered to one routing bucket.
     *
     * Requires `world.elevators`. Returns the whole registry, adopted by whichever resource.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return array of elevator snapshots
     */
    all(this: void, bucket?: number): unknown;
    /**
     * Alias of `Open77.elevators.goTo`.
     *
     * Requires `world.elevators`. The same function under the name a call button would use; there is no separate queuing behaviour behind it.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    call(this: void, id: unknown, floor: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one elevator's canonical snapshot.
     *
     * Requires `world.elevators`. Answers `nil` for an id the registry does not know.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return elevator snapshot, or nil
     */
    get(this: void, id: unknown): unknown | undefined;
    /**
     * Starts authoritative travel to a floor.
     *
     * Requires `world.elevators`. Options are `travelMs` (default 8000) and `force`, which starts travel even when the lift is not idle. The travel time is the server's contract with every viewer, so all clients animate the same journey.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    goTo(this: void, id: unknown, floor: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Pauses authoritative movement.
     *
     * Requires `world.elevators`. The lift holds where it is and keeps its destination; `resume` continues the same journey.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    pause(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Releases a managed elevator.
     *
     * Requires `world.elevators`. The native lift stays in the world; only Open77's authority over it ends, so it reverts to ordinary client-local scenery.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    remove(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Continues a paused journey.
     *
     * Requires `world.elevators`. Resuming a lift that is not paused is accepted and changes nothing.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    resume(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the power, lock, interaction and door policy bits.
     *
     * Requires `world.elevators`. The constants are in `Open77.elevators.flags`: `powered` (1), `locked` (2), `interactionAllowed` (4) and `doorsClosed` (8). This replaces the mask rather than merging it, so read the snapshot first when only one bit should change.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setFlags(this: void, id: unknown, flags: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a lift to a floor with no travel.
     *
     * Requires `world.elevators`. Administrative recovery: it skips the journey entirely, so it is the way out of a lift stuck mid-shaft, not a normal call.
     *
     * @permission world.elevators
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    teleport(this: void, id: unknown, floor: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77EnvironmentApi {
    /**
     * Retires one routing bucket's environment override.
     *
     * Requires `world.environment`. The players still standing in that bucket are re-synced onto the default environment with a revision newer than the one they last applied, so nobody is left on the sky of a world that no longer exists. Once the last override is gone the authority returns to a single broadcast per mutation instead of one send per connected player.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, invalid_bucket, unknown_bucket
     */
    clearBucket(this: void, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The canonical clock and weather state, right now.
     *
     * Requires `world.environment`. Carries `scope` and `bucket`, the clock as both `secondsOfDay` and `hour`/`minute`/`second`, `rate`, `frozen`/`timeFrozen`, `weather`/`weatherPreset`/`weatherPriority`, `transitionSeconds` and `weatherTransitionRemainingMs`, `weatherFrozen`/`randomWeather`/`nextWeatherInMs`, the `revision`/`weatherRevision`/`authorityEpoch` triple clients use to reject a stale snapshot, and `buckets` — every routing bucket currently holding an override. It is the same table every setter returns and the same payload `onEnvironmentChanged` carries.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, invalid_bucket, unknown_bucket
     */
    getState(this: void, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Publishes the reserved `onEnvironmentChanged` event host-wide.
     *
     * Requires `world.environment`. The authority's own door: `onEnvironmentChanged` is a platform name reserved on the event bus, so `TriggerEvent` refuses it with `reserved_event` and this is the only way it can be published. Same queue, same by-value marshalling and same tick boundary as `TriggerEvent`. No resource other than the one holding the environment state needs to call it.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, permission_denied:world.environment, resource_preparing, resource_stopping
     * @open77Return true, or false | reason: permission_denied:world.environment, resource_stopping, resource_preparing, event_payload_not_serializable, event_queue_limit
     */
    publishChange(this: void, state: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the authoritative time of day every player projects.
     *
     * Requires `world.environment`. The host installs this facade in every VM; the authority itself is the bundled `open77_weather` resource, reached through a synchronous export call, because the only code able to move a sky is that resource's CLIENT projection. `bucket` is optional: omitted it moves the default environment, given it creates or updates that routing bucket's override, seeded from the default as it reads at that moment. Answers `environment_unavailable` when the authority is not running — which `resources.load` can cause silently. See [the guide](weather.md).
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, invalid_time, invalid_bucket, too_many_environment_overrides
     */
    setTime(this: void, hour: number, minute: number, second: number, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Stops or resumes the authoritative clock where it stands.
     *
     * Requires `world.environment`. Freezing rebases first, so the clock stops at the reading it had rather than at its last anchor, and resuming continues from there. This is the server-side clock only: the client projection never holds REDengine's `SetPausedState`, which two-client runtime testing showed also slows gameplay and vehicle physics. `bucket` scopes the change to one routing bucket.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, invalid_argument, invalid_bucket
     */
    setTimeFrozen(this: void, frozen: boolean, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Sets how many game seconds pass per real second.
     *
     * Requires `world.environment`. Accepts `0` to `120`; the shipped default is `8.0`, which MUST match the engine's own rate or the projection has to correct the clock continuously — and every correction is a `SetGameTimeByHMS` world time jump that makes the streamer re-resolve nodes and resurrect destroyed props (measured 25 Aug). Changing day length properly needs a native rate control, not this.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, rate_must_be_between_0_and_120, invalid_bucket
     */
    setTimeRate(this: void, rate: number, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Applies a synchronized weather preset over a transition.
     *
     * Requires `world.environment`. `preset` is an Open77 name (`sunny`, `lightclouds`, `cloudy`, `rain`, `heavyclouds`, `fog`, `pollution`, `sandstorm`), one of the configured aliases, or the REDengine `24h_weather_*` value. `transitionSeconds` defaults to the preset's own and must be `0` to `300`. A player who joins mid-transition picks it up at its current point rather than restarting it. `bucket` scopes the change to one routing bucket.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, unknown_weather, invalid_transition, transition_must_be_between_0_and_300, invalid_bucket
     */
    setWeather(this: void, preset: string, transitionSeconds: number, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Pins the current preset by stopping the random scheduler.
     *
     * Requires `world.environment`. The name means something different on each runtime, deliberately: on the CLIENT it is an unconditional lock against a vanilla controller submitting its own preset, and is not an operator choice; on the SERVER it means pin the preset — the weighted random draw stops, so the sky stays where it was put. It is the same switch `weather.random off` throws, and it is the half a competitive gamemode wants, because lighting is a fairness variable.
     *
     * @permission world.environment
     * @since 2.31.13+op77.67
     * @open77Return state table, or nil | reason: permission_denied:world.environment, environment_unavailable, invalid_argument, invalid_bucket
     */
    setWeatherFrozen(this: void, frozen: boolean, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77EventsApi {
    /**
     * Server only. Vetoes the cancellable event this handler is running under.
     *
     * Alias of CancelEvent.
     *
     * @since 2.31.13+op77.67
     * @failure not_in_cancellable_event
     * @open77Return true, or false, reason
     */
    cancel(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Publishes an event host-wide; the same function as TriggerEvent.
     *
     * No permission. Since the host-wide bus exists, this reaches every running resource that handles the name, not only this VM: the fan-out is queued and drained at the next tick boundary, in resource-name order. Open77.events.emitLocal is the one that stays inside this VM. Host events (onPlayerReady, onPlayerDisconnected, the resource lifecycle events) arrive through the same handler list a resource uses for its own, so it listens for both the same way.
     *
     * @since 2.31.13+op77.45
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_event_name, reserved_hacking_event, resource_preparing, resource_stopping
     * @open77Return true, or false, reason
     */
    emit(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Server only. Publishes a host-wide cancellable event and returns its verdict handle.
     *
     * Alias of TriggerCancellableEvent.
     *
     * @since 2.31.13+op77.67
     * @failure event_argument_limit, event_payload_not_serializable, event_queue_limit, invalid_event_name, resource_preparing, resource_stopping
     * @open77Return verdict handle, or nil, reason
     */
    emitCancellable(this: void, event: string, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Server only. Fires an event in this resource's VM only.
     *
     * Alias of TriggerLocalEvent.
     *
     * @since 2.31.13+op77.67
     * @failure reserved_hacking_event
     * @open77Return true
     */
    emitLocal(this: void, event: string, ...args: unknown[]): boolean;
    /**
     * Removes a local or network handler; the same function as `RemoveEventHandler`.
     *
     * No permission. Takes the id `Open77.events.on` or `Open77.net.on` returned.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    off(this: void, handlerId: number): boolean;
    /**
     * Registers an event handler; the same function as AddEventHandler.
     *
     * No permission. One handler list receives three sources: this VM's Open77.events.emitLocal, the host-wide bus every resource publishes on, and the platform's own lifecycle events. Cross-resource *calls* with a return value are still Open77.exports; the bus carries announcements, not answers. Returns a handler id for Open77.events.off. The limit is 2,048 handlers per resource.
     *
     * @since 2.31.13+op77.45
     * @open77Return handler id
     */
    on(this: void, event: string, handler: Open77Callback): number;
    /**
     * Server only. Whether the cancellable event being dispatched has already been vetoed.
     *
     * Alias of WasEventCanceled.
     *
     * @since 2.31.13+op77.67
     * @open77Return boolean
     */
    wasCanceled(this: void): boolean;
}
interface Open77ExportsApi {
    /**
     * Calls another server resource's export and returns a promise.
     *
     * Asynchronous and cross-resource, unlike `TriggerEvent`, which never leaves this VM. Returns an `Open77.Promise`: `promise:await()` yields the copied return values, `promise:status()` reports pending, resolved, rejected or cancelled. Awaiting a pending call requires a managed coroutine. Call it from a running resource, not during preparation. The provider keeps its own permissions and identity: arguments never supply caller identity, and the exported coroutine does not inherit the player `source`. See [Cross-resource server exports](server-exports.md).
     *
     * @since 2.31.13+op77.45
     * @failure export_arguments_not_serializable, invalid_export_name, resource_preparing, resource_stopping
     * @open77Return promise, or nil | reason when dispatch is refused
     */
    call(this: void, target: string, name: string, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Calls another server resource's export inline on this thread.
     *
     * The non-sugar form of exports.resource:name(...). Runs the callee in its own VM before returning and yields its values directly. It RAISES on failure instead of returning nil, reason -- the one place Open77 departs from its own convention, so that ported FiveM code behaves the same; use pcall to handle failure. The callee must not yield (export_yielded), gets its own instruction budget (export_budget_exhausted fails only that call), and chains are capped at 8 frames (export_recursion_limit). Arguments and results are copied, never shared, so no Lua value is held across the boundary. Prefer Open77.exports.call when the callee can be slow, because a synchronous call holds the tick.
     *
     * @since 2.31.13+op77.67
     * @failure export_arguments_not_serializable, export_host_error, export_not_found, export_recursion_limit, export_resource_unavailable, export_stack_limit, export_target_stopped, invalid_export_name, resource_preparing, resource_stopping
     * @open77Return whatever the export returns
     */
    callSync(this: void, target: string, name: string, ...args: unknown[]): unknown;
}
interface Open77HackingApi {
    /**
     * Reads one hacking action by id: the current upload or its bounded terminal receipt.
     *
     * Requires `players.hacking.read`. A completed, blocked or cancelled action is kept for a bounded time so a resource that only holds the id can still learn how it ended; after that the answer is `nil`.
     *
     * @permission players.hacking.read
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return action table, or nil when unknown or expired | reason on failure
     */
    action(this: void, actionId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Cancels this provider's active upload.
     *
     * Requires `players.hacking.cancel`. Only an upload this resource started can be cancelled; the victim is released and the actor keeps whatever the acceptance already cost.
     *
     * @permission players.hacking.cancel
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    cancel(this: void, actionId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reports the hacking schema, profiles, authority model and hard limits.
     *
     * Requires `players.hacking.read`. The grade schema each `define*` accepts, the six hack kinds, the evidence model (clients submit intent and visibility only; the server decides) and the bounds -- read it instead of copying the tables out of [Hacking and counterplay](hacking.md).
     *
     * @permission players.hacking.read
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return capabilities table | nil, reason on failure
     */
    capabilities(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Clears only this provider's protection scope on a player.
     *
     * Requires `players.hacking.policy`. Another provider's safe-area or resistance scope on the same player is untouched.
     *
     * @permission players.hacking.policy
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    clearProtection(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Owns a safe-area or electrical-resistance scope on a player's current body.
     *
     * Requires `players.hacking.policy`. `options.safeArea = true` refuses every upload against the player; `options.resistance` (0..1) scales electrical damage. The scope belongs to this provider and to the current body: a new body needs a new call.
     *
     * @permission players.hacking.policy
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    configureProtection(this: void, playerId: number, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers this resource's hack definition and its grades.
     *
     * Requires `players.hacking.define`. `definition` is `{ id, version, grades = { { id, range, uploadMs, staminaCost, cooldownMs, damage, statusMs, recoveryMs, lockHacking, nonlethal, kind? } } }`; `kind` selects Short Circuit, Overheat, Cyberware Malfunction, Cripple Movement, Reboot Optics or Weapon Glitch, six kinds of one warned, interruptible upload. Register the matching implant through `Open77.cyberware.define` with the same provider, id, version and grade ids, in the `operating_system` slot. See [Hacking and counterplay](hacking.md).
     *
     * @permission players.hacking.define
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    define(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers this resource's Self-ICE definition and its grades.
     *
     * Requires `players.hacking.define`. Grades carry `charges` and `rechargeMs`; a victim whose Self-ICE has a charge blocks an incoming upload and spends it. The matching implant lives in the `self_ice` slot, profile `self_ice`.
     *
     * @permission players.hacking.define
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    defineIce(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers this resource's active-purge definition and its grades.
     *
     * Requires `players.hacking.define`. Grades carry `staminaCost`, `cooldownMs`, `allowSelf`, `allowAlly`, `range`, `cancelUploads` and `removeStatuses`. The matching implant lives in the `purge` slot, profile `active_purge`.
     *
     * @permission players.hacking.define
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    definePurge(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Purges uploads and statuses on a target through the actor's active-purge implant.
     *
     * Requires `players.hacking.activate`. Goes through the same defence authority as a player's own purge input: the actor must own the grade, the target must be self or an ally the grade allows, and stamina and cooldown are spent. `options.operationId` is required, as for `start`.
     *
     * @permission players.hacking.activate
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true, actionId }, or nil | reason on failure
     */
    purge(this: void, playerId: number, targetId: number, definitionId: string, gradeId: string, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Starts an entitled hack upload from one player against a target.
     *
     * Requires `players.hacking.activate`. The actor must own the matching installed implant grade; the server checks range, visibility evidence, stamina, cooldown, Self-ICE and protection scopes, then runs the warned upload. `options.operationId` is REQUIRED and must be stable across retries of the same operation -- the same id with different arguments is rejected. Progress arrives on `onHackingTransition`.
     *
     * @permission players.hacking.activate
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true, actionId }, or nil | reason on failure
     */
    start(this: void, playerId: number, targetId: number, definitionId: string, gradeId: string, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads a player's authoritative hacking state.
     *
     * Requires `players.hacking.read`. Includes the active upload if any and the remaining status windows: `cyberwareSuspendedMs`, `frozenMs`, `malfunctionMs`, `malfunctionBlocks`, `crippledMs`, `crippleHeavy`, `blindedMs` and `weaponGlitchedMs`. This is the server's ledger, not the victim's rendering.
     *
     * @permission players.hacking.read
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return state table | nil, reason on failure
     */
    state(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists the owned statuses currently affecting a player.
     *
     * Requires `players.hacking.read`. Same answer as `Open77.statuses.list`: every status any provider applied to this player, with its kind, provider, action id and deadline.
     *
     * @permission players.hacking.read
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return array of status tables | nil, reason on failure
     */
    statuses(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77HeldItemsApi {
    /**
     * Hold a native item on the presented player body, replicated to nearby clients.
     *
     * WeaponRight (default) uses resource-owned replicated native item props and the authored AttachmentSlots.WeaponRight transform. Requires world.props, players.life.read and network.events. Returns a request ID; observe open77:helditem:completed. Native results include propId, record, slot, rendered and attachmentStatus. hidden_first_person is accepted presentation intent with rendered=false, not visual success. Initial failures/timeouts remove only that requested item. Another resource's occupied hand is refused. Hold before starting a walking RP animation to supply an inventory item instead of the animation default; release on your action completion. No job dependency or inventory grant/consumption. Records must have a usable native item factory and a grip compatible with the animation. Other nine equipment slots retain their legacy relay. See attachments.md.
     *
     * @permission network.events, world.props
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_attachment_target, invalid_item_contact, invalid_item_record, invalid_model, invalid_operation, invalid_position, invalid_prop_id, invalid_revision, invalid_slot, invalid_target, network_unavailable, not_found, permission_denied:network.events, permission_denied:world.props, reserved_hacking_event, resource_stopping, world_unavailable
     * @open77Return request id, or nil | reason
     */
    hold(this: void, playerId: number | string, record: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Empties one of a player's equipment slots of the item this API put there.
     *
     * WeaponRight removes only this server resource's held native item from the replicated registry; other resources' items are untouched. Completion is asynchronous. Native item props are also removed on death, disconnect, bucket change and resource stop. Other equipment slots keep their existing relay. See attachments.md.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_attachment_target, invalid_item_contact, invalid_model, invalid_operation, invalid_position, invalid_prop_id, invalid_revision, invalid_slot, invalid_target, network_unavailable, not_found, permission_denied:network.events, permission_denied:world.props, reserved_hacking_event, resource_stopping, world_unavailable
     * @open77Return request id, or nil | reason
     */
    release(this: void, playerId: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Asks a player's client what its ten equipment slots currently hold.
     *
     * Asynchronous completion carries the ten slot states. The current native hand item is read from its projected snapshot, including attachmentStatus and whether it renders; clothing uses the local equipment registry. Neither a queued item nor a hidden first-person item is reported as a visibly occupied hand.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_target, network_unavailable, not_found, permission_denied:network.events, permission_denied:world.props, reserved_hacking_event, world_unavailable
     * @open77Return request id, or nil | reason
     */
    requestSnapshot(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The ten equipment slot names Open77.heldItems accepts.
     *
     * Sorted. These are the `AttachmentSlots.*` TweakDB records, the only closed and validated slot vocabulary in the tree -- `entSlotComponent` slot names are authored per entity and cannot be enumerated ahead of time, which is why the effects surface (`Open77.effects.attach`) takes a free string and validates it against the target instead.
     *
     * @since 2.31.13+op77.67
     * @open77Return array of strings
     */
    slots(this: void): unknown;
}
interface Open77HttpApi {
    /**
     * Serves inbound HTTP under `/<resource>/<prefix>` on the server's opt-in listener.
     *
     * Requires `http.serve` -- a different power from `http.request` (the network calling a resource, not the resource calling out), so an operator reading a manifest sees which one a resource wants. The listener is a server-wide opt-in (`httpHandlers.enabled`, `listenUrl` default loopback `127.0.0.1:11781`, `timeoutSeconds`); while it is off every call answers `http_handlers_unavailable`. Routes are namespaced by resource: `listen("/hook", fn)` serves `http://host/<resource>/hook` and everything below it, the longest registered prefix wins, and a resource can never claim another's segment. The handler runs on the resource's own tick (one tick of latency, never cross-thread) with `(req, res)`: `req = { method, path, query, body, route, remoteAddress?, headers }` (header lookup is case-insensitive; the body is capped at 16 KiB and `body_too_large` is answered before Lua sees it) and `res.send(status, body, headers?)` -- a table body is JSON-encoded with a JSON content type -- plus `res.json(status?, value)` and `res.text(status?, text)`; the answer is sent once (`already_sent` after). A handler that throws answers 500 `handler_error`; one that never answers is timed out by the host. Sixteen requests in flight per resource, the rest answered 503. Routes are dropped when the resource stops or reloads. Returns the public route, or `nil, reason`: `invalid_handler`, `invalid_prefix`, `http_handlers_unavailable`, `permission_denied:http.serve`.
     *
     * @permission http.serve
     * @since 2.31.13+op77.73
     * @failure http_handlers_unavailable, invalid_handler, invalid_prefix, permission_denied:http.serve
     * @open77Return public route string, or nil | reason on failure
     */
    listen(this: void, prefix: string, handler: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Makes an outbound HTTP request; the same function as `PerformHttpRequest`.
     *
     * Requires `http.request` **and** a server that enabled the bridge with an allow-list -- an empty list reaches nothing and redirects are never followed, so the list is the whole reachable surface. The request leaves the tick thread at once, the exchange runs on the thread pool, and the callback runs on the owning resource's own tick. The callback is `(status, body, headers, err)`, with `status = 0` when the exchange did not complete. A refused request still invokes the callback, so a script never waits on one.
     *
     * @permission http.request
     * @since 2.31.13+op77.45
     * @failure http_unavailable, invalid_body, invalid_headers, invalid_method, invalid_request_id, invalid_url, permission_denied:http.request, too_many_headers
     * @open77Return true, or false | reason: permission_denied:http.request, http_unavailable, invalid_url, host_not_allowed, invalid_method, body_too_large, too_many_headers, invalid_header, too_many_requests
     */
    request(this: void, url: string, callback?: Open77Callback, method?: string, body?: string | Open77Table, headers?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists the public routes this resource is serving.
     *
     * Ungated read of what `listen` registered for the calling resource, as the public paths a client would request (`/<resource>/<prefix>`), longest first -- the order the host matches them in. Another resource's routes are not listed. Empty while the listener is disabled.
     *
     * @since 2.31.13+op77.73
     * @open77Return array of route strings
     */
    routes(this: void): unknown;
    /**
     * Removes one of this resource's inbound HTTP routes.
     *
     * Requires `http.serve`. Takes the same prefix `listen` was given (normalised the same way: `/hook/` and `/hook` are one route) and answers `true`, or `false, reason`: `route_not_found` when this resource never registered it (another resource's route is never visible here), `invalid_prefix`, `permission_denied:http.serve`. Not needed on stop or reload: the host drops every route the resource owns.
     *
     * @permission http.serve
     * @since 2.31.13+op77.73
     * @failure http_handlers_unavailable, invalid_prefix, permission_denied:http.serve, route_not_found
     * @open77Return true, or false | reason on failure
     */
    unlisten(this: void, prefix: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77IoApi {
    /**
     * Appends text to a file in this resource's data directory.
     *
     * Requires `filesystem.write`. Creates the file when it does not exist. The 4 MiB ceiling applies to the resulting file, so an append-only log needs its own rotation.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    append(this: void, path: string, contents: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Copies a file inside this resource's data directory.
     *
     * Requires `filesystem.read` for the source **and** `filesystem.write` for the destination -- both, because the operation reads and writes. Without `overwrite`, an existing destination answers `already_exists`.
     *
     * @permission filesystem.read, filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.read, permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    copy(this: void, source: string, destination: string, overwrite?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a path exists inside this resource's data directory.
     *
     * Requires `filesystem.read`. Returns `nil, reason` rather than `false` when the path itself is refused, so a rejected path is never mistaken for an absent file.
     *
     * @permission filesystem.read
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.read
     * @open77Return boolean, or nil | reason
     */
    exists(this: void, path: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Lists one directory inside this resource's data directory.
     *
     * Requires `filesystem.read`. Non-recursive and sorted, at most 2,048 entries. Each entry is `{ name, type, size? }`. Omitting the argument lists the data directory itself.
     *
     * @permission filesystem.read
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.read
     * @open77Return array of { name, type, size? }, or nil | reason: not_a_directory, too_many_entries, ...
     */
    list(this: void, directory?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Creates a directory and any missing parents.
     *
     * Requires `filesystem.write`. Creating a directory that already exists succeeds: the caller asked for it to be there, and it is.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    makeDirectory(this: void, path: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves or renames a file inside this resource's data directory.
     *
     * Requires `filesystem.write`. Both ends are checked against the same path rules. Without `overwrite`, an existing destination answers `already_exists` rather than being replaced.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    move(this: void, source: string, destination: string, overwrite?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads a UTF-8 text file from this resource's data directory.
     *
     * Requires `filesystem.read`. Paths are relative to the calling resource's `data/` directory; absolute paths, `..` escapes and reparse-point traversal are rejected. A file is limited to 4 MiB and a relative path to 512 UTF-8 bytes. This cannot read another resource, the server configuration, or the resource's own manifest and scripts.
     *
     * @permission filesystem.read
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.read
     * @open77Return contents, or nil | reason: invalid_path, path_outside_resource, reparse_point_denied, not_found, not_a_file, file_too_large, io_error
     */
    read(this: void, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads a file and decodes it with the bounded Open77 JSON codec.
     *
     * Requires `filesystem.read`. Inherits the codec's 48 KiB and depth limits on top of the file limits, so it is for configuration and small records, not a database. A decode failure is reported as a reason rather than raising.
     *
     * @permission filesystem.read
     * @since 2.31.13+op77.45
     * @failure invalid_json, json_too_large, permission_denied:filesystem.read
     * @open77Return value, or nil | reason: invalid_json among the read reasons
     */
    readJson(this: void, path: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Removes one file.
     *
     * Requires `filesystem.write`. Never removes a directory tree -- that is deliberate, so a path bug cannot take a resource's whole data directory with it.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.write
     * @open77Return true, or false | reason: not_a_file among others
     */
    remove(this: void, path: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one entry's metadata.
     *
     * Requires `filesystem.read`. Returns `{ name, type, size?, modifiedUtc }`. `modifiedUtc` is the honest way to tell whether a file changed since the resource last read it.
     *
     * @permission filesystem.read
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.read
     * @open77Return table { name, type, size?, modifiedUtc }, or nil | reason
     */
    stat(this: void, path: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Atomically replaces a UTF-8 text file in this resource's data directory.
     *
     * Requires `filesystem.write`. The replacement is atomic, so a crash mid-write leaves the previous contents rather than a truncated file. Same path rules and 4 MiB limit as `read`.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    write(this: void, path: string, contents: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Encodes a value and writes it atomically.
     *
     * Requires `filesystem.write`. Encodes with the bounded Open77 JSON codec, then writes through `Open77.io.write`, so the replacement is atomic. A value the codec refuses answers a reason instead of writing a partial file.
     *
     * @permission filesystem.write
     * @since 2.31.13+op77.45
     * @failure json_encode_failed, permission_denied:filesystem.write
     * @open77Return true, or false | reason
     */
    writeJson(this: void, path: string, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77KvpApi {
    /**
     * Clears this resource's keys matching a prefix.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. An empty or omitted prefix clears the whole store.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return removed count, or nil | reason
     */
    clear(this: void, prefix?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Atomically changes a key when its typed value matches.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. `expected = nil` means "must be absent"; `replacement = nil` deletes. The comparison is TYPED: an integer 1 does not satisfy an expectation written as 1.0, because the store keeps the two apart and a later read would answer differently.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return boolean | reason on storage failure
     */
    compareAndSet(this: void, key: string, expected: unknown, replacement: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Deletes one persistent key.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. Deleting an absent key is `false`, not an error.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return true when removed, false when absent | reason on storage failure
     */
    delete(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Finds typed entries by sorted key prefix.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. Keys are ordinal-sorted. `limit` must be 1..4096; anything else is `invalid_limit` rather than a silent clamp.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return array of { key, value, type }, or nil | reason
     */
    find(this: void, prefix?: string, limit?: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads one typed persistent value.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. A missing key answers with the caller's default, or nil, and NO reason -- a reason there would be indistinguishable from a storage failure at the call site.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return stored value, default or nil | reason on storage failure
     */
    get(this: void, key: string, arg2?: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Checks whether a persistent key exists.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return boolean | reason on storage failure
     */
    has(this: void, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Atomically increments a numeric key.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. Atomic in the sense that matters: the server Lua runtime is one thread, so a read-modify-write cannot interleave with another resource's. An absent key starts at zero. Integer plus integer stays an integer, so a counter never drifts into float territory. `integer_overflow`, `number_overflow`, `value_not_numeric` and `delta_not_numeric` are named rather than wrapped.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return new numeric value, or nil | reason
     */
    increment(this: void, key: string, delta?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists sorted keys matching a prefix.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return string array, or nil | reason
     */
    keys(this: void, prefix?: string, limit?: number): LuaMultiReturn<[string | undefined, string | undefined]>;
    /**
     * Persists one typed value for this resource.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. Quotas are the client store's numbers exactly: 256-byte keys, 64 KiB values, 4096 entries, 1 MiB of payload, same reason tokens. Values are string, integer, number or boolean; integer and number stay apart, so a counter read back from disk is still an integer. A refused write leaves the store exactly as it was. Writes are coalesced onto the tick and flushed again when the resource stops, so an orderly stop, reload or restart loses nothing and a hard kill loses at most one tick. A store that cannot be parsed reports `storage_corrupt` and is never overwritten with a fresh one.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return true on success, otherwise false | reason
     */
    set(this: void, key: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stores a value only when its key is missing.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`. The cheap way to claim a lock without a database.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return boolean | reason on storage failure
     */
    setIfAbsent(this: void, key: string, value: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Returns this resource store's usage and quotas.
     *
     * Server-side; no capability. The store is one JSON file under this resource's own `data/` directory, and no caller-supplied path reaches it, so a resource cannot address another's store -- isolation is structural, which is why this needs no permission where `Open77.io` needs `filesystem.*`.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_operation
     * @open77Return table { entries, bytes, maximumEntries, maximumBytes, maximumKeyBytes, maximumValueBytes, resource }, or nil | reason
     */
    stats(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77LocomotionApi {
    /**
     * Read a player locomotion assignment.
     *
     * Returns player, style, packageRevision, revision, resetOnDeath and optional remainingMs. nil without a reason means no custom style is assigned. This reports canonical assignment, not rendered animation readiness. See [Custom locomotion](custom-locomotion.md).
     *
     * @permission locomotion.read
     * @since 2.31.21+op77.145
     * @open77Return assignment table, or nil | reason on failure
     */
    get(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Play a declared clip from the selected locomotion package.
     *
     * The calling resource must own the selected style. The player must be ready, alive and outside a vehicle. clipId is a declared package clip, not a depot path. options accepts speed (0.25..4, default 1), blendInMs (0..2000, default 80), blendOutMs (0..2000, default 120). Playback is one-shot, without native root motion or game animation events. Late joiners receive elapsed time; finished actions do not restart. See [Custom locomotion](custom-locomotion.md).
     *
     * @permission locomotion.control
     * @since 2.31.21+op77.145
     * @open77Return true, handle on success | false, reason on failure
     */
    playClip(this: void, playerId: number, clipId: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
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
    /**
     * Release this resource's locomotion assignment.
     *
     * The resource that selected the style owns its reset. Returns true even when there is no assignment. Resource stop, disconnect and package removal also release the selection. See [Custom locomotion](custom-locomotion.md).
     *
     * @permission locomotion.control
     * @since 2.31.21+op77.145
     * @open77Return true on success | false, reason on failure
     */
    reset(this: void, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Assign a registered movement style to a player.
     *
     * Requires an authenticated, ready, living player. options accepts durationMs (0..86400000, default 0 for no expiry) and resetOnDeath (default false). The assigning resource generation owns the selection. Repeating the same style/package/death policy renews its duration without respawning the body. Another resource cannot replace it. See [Custom locomotion](custom-locomotion.md).
     *
     * @permission locomotion.control
     * @since 2.31.21+op77.145
     * @open77Return true, assignment revision on success | false, reason on failure
     */
    set(this: void, playerId: number, styleId: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stop a locomotion clip owned by this resource.
     *
     * Omit handle to stop the current clip, or pass the returned handle so an old timer cannot cancel a newer action. blendOutMs is 0..2000, default 120. A stale handle returns stale_clip_handle. Returns true, revision (0 for a no-op). See [Custom locomotion](custom-locomotion.md).
     *
     * @permission locomotion.control
     * @since 2.31.21+op77.145
     * @open77Return true, revision on success | false, reason on failure
     */
    stopClip(this: void, playerId: number, handle?: number, blendOutMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77LogApi {
    /**
     * Writes a resource-prefixed debug line to the server log.
     *
     * No permission. Writes to the resource-prefixed server logger at the `DBG` level, which a production log filter usually drops -- the place for per-tick chatter. `Citizen.Trace` is this function. Values are joined with a tab like `print`; control sequences (ANSI colour codes, cursor moves) are stripped from the line before it reaches the log, so a ported script's coloured output cannot corrupt the terminal or the log file.
     *
     * @since 2.31.13+op77.45
     * @open77Return void
     */
    debug(this: void, ...args: unknown[]): void;
    /**
     * Writes a resource-prefixed error line to the server log.
     *
     * No permission. Writes to the resource-prefixed server logger at the `ERR` level. It does not raise, abort the handler or mark the resource unhealthy: it is a log line, not an exception. Values are joined with a tab like `print`; control sequences (ANSI colour codes, cursor moves) are stripped from the line before it reaches the log, so a ported script's coloured output cannot corrupt the terminal or the log file.
     *
     * @since 2.31.13+op77.45
     * @open77Return void
     */
    error(this: void, ...args: unknown[]): void;
    /**
     * Writes a resource-prefixed informational line to the server log.
     *
     * No permission. Writes to the resource-prefixed server logger at the `INF` level, the same one `print` writes at. Values are joined with a tab like `print`; control sequences (ANSI colour codes, cursor moves) are stripped from the line before it reaches the log, so a ported script's coloured output cannot corrupt the terminal or the log file.
     *
     * @since 2.31.13+op77.45
     * @open77Return void
     */
    info(this: void, ...args: unknown[]): void;
    /**
     * Writes a resource-prefixed warning line to the server log.
     *
     * No permission. Writes to the resource-prefixed server logger at the `WRN` level, so an operator filtering a resource's warnings from its chatter sees only these. Values are joined with a tab like `print`; control sequences (ANSI colour codes, cursor moves) are stripped from the line before it reaches the log, so a ported script's coloured output cannot corrupt the terminal or the log file.
     *
     * @since 2.31.13+op77.45
     * @open77Return void
     */
    warn(this: void, ...args: unknown[]): void;
}
interface Open77LootApi {
    /**
     * Every loot drop, optionally filtered to one routing bucket.
     *
     * Requires `world.loot`. Returns the whole registry, whichever resource created each drop.
     *
     * @permission world.loot
     * @since 2.31.13+op77.45
     * @open77Return array of drop snapshots
     */
    all(this: void, bucket?: number): unknown;
    /**
     * Creates an authoritative ground loot drop.
     *
     * Requires `world.loot`. The definition accepts `item`, `quantity` (default 1), `position`, `bucket`, `radius` (default 2), `label`, `visualItem`/`model` and `ttlMs`. Drops are replicated and owned by the creating resource, so they survive a player walking away and are cleaned up when the resource stops. See [loot](loot.md) for pickup validation and client projection.
     *
     * @permission world.loot
     * @since 2.31.13+op77.45
     * @failure loot_unavailable, permission_denied:world.loot
     * @open77Return loot id, or nil | reason
     */
    create(this: void, def: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one loot drop's snapshot.
     *
     * Requires `world.loot`. Answers `nil` for an unknown or already collected id.
     *
     * @permission world.loot
     * @since 2.31.13+op77.45
     * @open77Return drop snapshot, or nil
     */
    get(this: void, id: unknown): unknown | undefined;
    /**
     * Removes a loot drop.
     *
     * Requires `world.loot`. Use it when a mode ends a round rather than waiting for `ttlMs`.
     *
     * @permission world.loot
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    remove(this: void, id: unknown): boolean;
    /**
     * Patches an existing loot drop.
     *
     * Requires `world.loot`. Reads the current drop first and keeps every field the patch omits, so moving a drop does not silently reset its quantity or label. An unknown id answers `false`.
     *
     * @permission world.loot
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    update(this: void, id: unknown, def: Open77Table): boolean;
}
interface Open77MotionApi {
    /**
     * Cancel this resource's authoritative motion lease.
     *
     * Requires players.motion.control. Requires the exact player and motion ID owned by the calling resource. Ends network ownership and requests native cleanup; collision/braking and get-up remain native, so cancellation need not instantly stop velocity or animation.
     *
     * @permission players.motion.control
     * @since 2.31.13+op77.63
     * @failure invalid_duration, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, motion_unavailable, permission_denied:players.motion.control, permission_denied:players.motion.read, resource_stopping
     * @open77Return {ok=true,id=string} | nil, reason on rejection
     */
    cancel(this: void, playerId: number, id: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Read an authoritative living-motion lease.
     *
     * Requires players.motion.read. Returns the authoritative lease {id,player,incarnation,bucket,directionX,directionY,distance,createdAt,expiresAt,phase,reason,kind,push,lift}, or nil. Launch leases have kind="launch" and bounded push/lift values; ordinary knockdown retains its existing distance contract. The optional lifeRevision identifies the authoritative life generation when the server uses a generic body incarnation. Times are server-monotonic milliseconds. pending lasts until the controlling client acknowledges; active is an acknowledged motion lease, not proof of observer rendering. Use the exact id with cancel to end this resource's lease. No generic teleport or map collision solution is provided.
     *
     * @permission players.motion.read
     * @since 2.31.13+op77.63
     * @failure invalid_duration, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, motion_unavailable, permission_denied:players.motion.control, permission_denied:players.motion.read, resource_stopping
     * @open77Return motion table, or nil | nil, reason on rejection
     */
    current(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Request bounded native living-player motion.
     *
     * Requires players.motion.control. options={x,y,distance}; direction nonzero and normalized, distance0..6 m. Requires ready/alive/unmounted exact body and no existing lease; native owner additionally refuses unsuitable states. Returns admission, not damage or physical completion. onPlayerMotionChanged reports pending/active/ended; server pending expires after2s. Active snapshot checks are ACK-rooted, not exact native launch-origin enforcement.
     *
     * @permission players.motion.control
     * @since 2.31.13+op77.63
     * @failure invalid_duration, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, motion_unavailable, permission_denied:players.motion.control, permission_denied:players.motion.read, resource_stopping
     * @open77Return {ok=true,id=string} | nil, reason on rejection
     */
    knockdown(this: void, playerId: number, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77NetApi {
    /**
     * Asks one client a question and returns a promise for the answer.
     *
     * Requires network.events. Targets the handler that resource registered on that client; the table form { resource = "other", name = "x", timeout = ms } names another resource or sets a deadline (default 10,000 ms, range 100..120,000). There is no broadcast: callClient(-1, ...) answers callback_broadcast_unsupported, because one question cannot have many answers. Up to 29 arguments and 48 KiB per frame, 256 questions open per resource. Rejects with callback_not_found, callback_timeout, callback_target_stopped and the rest of the callback reason list. Aliased as Open77.callbacks.callClient.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_arguments_not_serializable, callback_payload_too_large, callback_request_limit, callback_too_many_arguments, invalid_callback_name, invalid_callback_timeout, network_unavailable, permission_denied:network.events, resource_stopping
     * @open77Return Open77.Promise, or nil, reason
     */
    callClient(this: void, playerId: number, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks one client a question and waits for the answer.
     *
     * Requires network.events. Open77.net.callClient followed by :await(), so it must run inside a CreateThread, a command handler or another managed task. A client that refuses, times out or disconnects yields nil, reason -- never a partial answer. Aliased as Open77.callbacks.callClientAwait.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_arguments_not_serializable, callback_payload_too_large, callback_request_limit, callback_too_many_arguments, invalid_callback_name, invalid_callback_timeout, network_unavailable, permission_denied:network.events, resource_stopping
     * @open77Return the client handler's return values, or nil, reason
     */
    callClientAwait(this: void, playerId: number, name: string | Open77Table, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops a latent stream that is still sending.
     *
     * `true` when the stream was still sending; `false, reason` otherwise: `not_found` (never this resource's, or forgotten a minute after it finished), `already_finished`. Nothing is sent to the client: it drops its partial copy on its own after a minute without a frame, so a cancelled stream never delivers a truncated event.
     *
     * @since 2.31.13+op77.73
     * @failure already_finished, not_found
     * @open77Return true, or false | reason on failure
     */
    cancelLatent(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sends an event to one client or every client; the same function as `TriggerClientEvent`.
     *
     * Requires `network.events`. A `playerId` of `-1` broadcasts. Same 32-argument, 48 KiB envelope as the inbound direction.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events
     * @open77Return boolean
     */
    emitClient(this: void, event: string, playerId: number | string, ...args: unknown[]): boolean;
    /**
     * Sends a client event too large for one net event, paced at a byte rate; the same function as `TriggerLatentClientEvent`.
     *
     * The same call as `TriggerClientEvent` with FiveM's bytes-per-second argument in third place, for a payload the 48 KiB event envelope cannot carry: up to 4 MiB, cut into 40 KiB frames on a reserved name, paced at the requested rate (clamped to 1 KiB/s .. 2.5 MiB/s, and never more than 64 frames per second for all of a resource's streams together), reassembled by the client host and delivered to `RegisterNetEvent` handlers under the ORIGINAL name -- the receiving resource cannot tell it was latent. `target` is one player id or `-1` for everybody connected. Requires `network.events`. Answers the stream id, or `nil, reason`: `permission_denied:network.events`, `invalid_event_name`, `reserved_*_event`, `invalid_player_id`, `player_not_found`, `invalid_rate`, `event_argument_limit`, `latent_stream_limit` (16 in flight), `latent_payload_not_serializable`, `latent_payload_too_large` (over 4 MiB, nothing sent). Read progress with `Open77.net.latentStatus(id)`; stop it with `cancelLatent(id)`.
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure event_argument_limit, invalid_event_name, invalid_player_id, invalid_rate, latent_payload_not_serializable, latent_payload_too_large, latent_stream_limit, network_unavailable, permission_denied:network.events, player_not_found, resource_stopping
     * @open77Return stream id string, or nil | reason on failure
     */
    emitLatent(this: void, name: string, target: number, bytesPerSecond: number, ...args: unknown[]): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Progress of one latent stream this resource started.
     *
     * `{ id, name, target, state, sentBytes, totalBytes, sentFrames, totalFrames, progress (0..1), bytesPerSecond, elapsedMs, reason? }` with `state` one of `sending`, `done`, `failed` (reason `player_left`) or `cancelled`. A finished stream keeps answering for a minute, then `nil, not_found`; another resource's stream is never visible. Ungated read.
     *
     * @since 2.31.13+op77.73
     * @failure not_found
     * @open77Return table, or nil | reason on failure
     */
    latentStatus(this: void, id: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers an authenticated client event; the same function as `RegisterNetEvent`.
     *
     * Requires `network.events`. During a network handler the global `source` is set from the authenticated connection, never from the client's payload -- that is the whole point of the distinction from `Open77.events.on`. Events accept at most 32 arguments in a 48 KiB JSON envelope.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @open77Return handler id
     */
    on(this: void, event: string, handler?: Open77Callback): number;
    /**
     * Answers a callback a client sends with Open77.net.call.
     *
     * Requires network.events. The handler is called as handler(source, ...): `source` is the authenticated player id, taken from the transport and never from the payload, exactly as a RegisterNetEvent handler sets it -- and that is the only thing the caller cannot choose, so re-validate every argument. Use the source argument rather than the global in a handler that yields, because another task can overwrite the global across a Wait. Return values become the answer; raising rejects the caller's promise with the error text. Names are per resource: a client reaches this handler by naming this resource. Up to 256 names and 256 questions being served at once per resource; stopping the resource answers what it was still serving with callback_target_stopped. Aliased as Open77.callbacks.register. See the Network callbacks guide.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_function_required, callback_registration_limit, invalid_callback_name, permission_denied:network.events, resource_stopping
     * @open77Return true, or nil, reason
     */
    register(this: void, name: string, handler: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops answering a callback name registered with Open77.net.register.
     *
     * Requires network.events. A later request for that name is refused with callback_not_found on the next frame rather than waiting out the asker's deadline. Aliased as Open77.callbacks.unregister.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure callback_not_found, invalid_callback_name
     * @open77Return true, or false, reason
     */
    unregister(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77NotificationsApi {
    /**
     * Sends one notification to every player.
     *
     * `send` with a player id of `-1`. The returned id addresses the whole broadcast, so one `update` or `dismiss` reaches everyone who received it. Delivered through `TriggerClientEvent`, so it needs `network.events` and works from the top level of a script as well as from handlers (unlike the `Open77.chat` facades, which publish on the host bus and answer `resource_preparing` until the chunk has loaded). Declare `dependency "open77_notifications"` in the manifest: a server whose load list lacks the package then refuses to start the resource instead of dropping every toast.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events
     * @open77Return owner-local broadcast id, or nil | reason
     */
    broadcast(this: void, definition: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Clears this resource's notifications for one player or for everyone.
     *
     * Omitting the player clears this owner's notifications everywhere. It never touches another resource's notifications, so a gamemode clearing its own HUD does not wipe a chat or admin toast.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events
     * @open77Return boolean | reason
     */
    clear(this: void, playerId?: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Dismisses one notification this resource sent.
     *
     * Only the owning resource may dismiss it. Dismissing one that has already expired succeeds.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, notification_not_found, permission_denied:network.events
     * @open77Return boolean | reason
     */
    dismiss(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sends a notification to one player.
     *
     * Routes to the official `open77_notifications` client package. Ids and mutation rights are isolated per calling server resource, so one resource cannot dismiss another's notification. See [notifications](notifications.md) for every definition field and the queue limits. Delivered through `TriggerClientEvent`, so it needs `network.events` and works from the top level of a script as well as from handlers (unlike the `Open77.chat` facades, which publish on the host bus and answer `resource_preparing` until the chunk has loaded). No dependency is checked at the call: this is a prelude function whose only gate is `network.events`, and the toast is drawn by the `open77_notifications` client script that every shipped load list auto-starts, so a resource without `dependency "open77_notifications"` still delivers. The line is a guard: with it, the package starts first and a server whose load list lacks it refuses to start your resource instead of dropping every toast on clients that never received the package.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure duplicate_notification_id, invalid_target, network_unavailable, permission_denied:network.events
     * @open77Return owner-local notification id, or nil | reason
     */
    send(this: void, playerId: number | string, definition: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Patches a notification this resource sent.
     *
     * Sparse patch. Use it for a live counter or a progress line rather than dismissing and resending, which would restart the entry's animation and its place in the queue.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, notification_not_found, permission_denied:network.events
     * @open77Return boolean | reason
     */
    update(this: void, id: unknown, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77NpcsTasksApi {
    /**
     * Every task currently queued or running on an NPC.
     *
     * Requires `world.npcs`. Ordered by channel and priority, which is the order the scheduler will take them in.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return array of task snapshots
     */
    all(this: void, id: unknown): unknown;
    /**
     * Orders an NPC to engage a target.
     *
     * Requires `world.npcs`. **Action channel**, so it composes with a standing movement task instead of replacing one: the engine suspends `ignoreInCombat` movement for the fight and resumes it afterwards. The target is a player id or `{ npcId = n }`, and an NPC target must belong to this resource. The task forces the pair hostile and seeds the target into the puppet's own target tracker, re-seeding every `reacquireMs` (default 4,000; 500-60,000); the engine's combat AI drives the body from there, so Open77 never issues a shoot command and never cancels the behaviour tree. It reports `success` when the target dies, streams out or is removed, and `failure` with `attack_target_unavailable` when the target cannot be resolved at all, or with `invocation_failed` when the engine refused the attitude or threat native the seed is made of (`SetAttitudeTowards` / `AddThreat` returned false). A player **seated in a vehicle** can answer `invocation_failed`: treat a mounted target as unsupported and order the attack once `Open77.vehicles.getPlayerSeat(target)` is nil. Cancelling drops the seeded threat; the attitude is left to whatever `setAttitude` states.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_task_invalid_target, permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    attack(this: void, id: unknown, target: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Cancels one queued or running task.
     *
     * Requires `world.npcs`. Leaves the rest of the queue in place; `clear` is the way to empty a channel.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    cancel(this: void, id: unknown, taskId: unknown): boolean;
    /**
     * Drives an NPC's vehicle after a target.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the vanilla `AIVehicleDriveToPointAutonomousCommand` pipeline -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * The target is a player id, or a table naming `playerId`, `vehicleId` or `npcId`. The destination is refreshed twice a second from the target's position for as long as it stays in the same bucket.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_npc_id, npc_not_driving, npc_not_owned, npc_task_invalid_target, permission_denied:world.npcs, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return driving state, or nil | reason
     */
    chase(this: void, id: unknown, target: Open77Table, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Clears queued and current tasks, optionally on one channel.
     *
     * Requires `world.npcs`. Omitting the channel clears them all. Clearing the movement channel stops the NPC where it is rather than returning it anywhere.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    clear(this: void, id: unknown, channel?: number): boolean;
    /**
     * Drives an NPC's vehicle to a position.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the vanilla `AIVehicleDriveToPointAutonomousCommand` pipeline -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * `options.style` is the driving behaviour (`normal`, `cautious`, `aggressive`) and is the same field `Open77.vehicles.ai.setBehavior` writes.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_npc_id, npc_not_driving, npc_not_owned, npc_task_invalid_point, permission_denied:world.npcs, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return driving state, or nil | reason
     */
    driveTo(this: void, id: unknown, position: Vector3, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Drives an NPC's vehicle along the road network indefinitely.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the driving commands -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * This is `joinTraffic`, the engine's own traffic enrollment: REDengine chooses the lane, the path and the speed. It is **not** a random-destination wander, because Cyberpunk traffic AI drives authored lanes and there is no free-roam equivalent to GTA's `TaskVehicleDriveWander`. Because the engine owns the motion, this verb reads no `speed` and no `style`/`behavior`; only `{ timeoutMs }` applies, and a request naming either of the other two is refused with `traffic_speed_unsupported` / `traffic_behavior_unsupported`. One task is submitted per vehicle and the engine advances its own path, so a car can hold still in traffic legitimately. The native move pattern is the one option the enrollment does take: `{ pattern = "default" | "stop" | "panic" }` rides the join exactly as it does on `Open77.vehicles.ai.joinTraffic`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_npc_id, npc_not_driving, npc_not_owned, permission_denied:world.npcs, permission_denied:world.vehicles, traffic_behavior_unsupported, traffic_speed_unsupported, vehicles_unavailable
     * @open77Return driving state, or nil | reason
     */
    driveWander(this: void, id: unknown, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The driving job an NPC is the attached driver of.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the vanilla `AIVehicleDriveToPointAutonomousCommand` pipeline -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_npc_id, npc_not_driving, npc_not_owned, permission_denied:world.npcs, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return driving state, or nil | reason
     */
    driving(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Enqueues any supported task on an NPC.
     *
     * Requires `world.npcs`. The escape hatch under the typed helpers: `taskType` names the task, `parameters` is JSON-encoded for the host, and `options` carries `channel` (default 0), `priority` (default 0) and `timeoutMs` (default 0, meaning no timeout). Channels are in `Open77.npcs.channels`: `movement` (0), `look` (1), `action` (2) and `fullBody` (3) -- tasks on different channels run at the same time.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    enqueue(this: void, id: unknown, taskType: string, parameters?: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sends an NPC to a vehicle seat.
     *
     * Requires `world.npcs`. Movement channel -- walking to a car is locomotion, so it replaces a standing `moveTo` rather than composing with it.
     *
     * Seats use `Open77.vehicles.seats` numbering (`-1` driver, `0` front passenger, `1` rear left, `2` rear right) and also accept the names `driver`, `frontPassenger`, `rearLeft`, `rearRight`. The body walks to the car and mounts when it is within `approachDistance`; `warp = true` skips the walk and mounts on the spot.
     *
     * The task reports `Executing` while walking and succeeds only once the mounting relation is readable back off the body, because that is the only honest proof it is seated. It fails with `vehicle_not_streamed` when no client has the car streamed in, and `vehicle_mount_refused` when the engine refuses the seat.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_task_invalid_seat, npc_task_invalid_target, permission_denied:world.npcs
     * @open77Return task id, or nil | reason (`npc_task_invalid_target`, `npc_task_invalid_seat`)
     */
    enterVehicle(this: void, id: unknown, vehicleId: unknown, seat?: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Takes an NPC out of whatever seat it is in.
     *
     * Requires `world.npcs`. Movement channel. Idempotent on purpose: a body already out of the car has done what was asked, and the task succeeds with reason `not_in_vehicle` rather than failing. `options.vehicleId` narrows the task to one vehicle, in which case a body sitting in a different one fails with `vehicle_mismatch` instead of being pulled out of it.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    exitVehicle(this: void, id: unknown, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Rotates an NPC's body toward a world point.
     *
     * Requires `world.npcs`. Look channel, so it runs alongside movement. Options are `tolerance` (default 3 degrees), `speed` (rotation, default 180 degrees per second), `priority` and `timeoutMs` (default 5,000).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    face(this: void, id: unknown, target: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sends an NPC running away from something.
     *
     * Requires `world.npcs`. Movement channel. `from` is a player id, `{ npcId = n }` or a fixed `{ x, y, z }`; a live body is re-measured every cycle, so the NPC keeps breaking contact as the thing it flees moves. It reports `success` once `distance` metres separate them (5-200, default 50) or the target is gone, and each leg is capped so the body asks for a destination it can path to. The tracked threat on the fled body is dropped once at task start; this is best-effort, because the attitude is untouched and a still-hostile body may re-acquire the same target by perception -- `setAttitude(id, "neutral", { towards = ... })` is the composable answer. Options are `speed` (default `sprint`), `distance`, `priority` and `timeoutMs` (default 30,000).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_task_invalid_target, permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    flee(this: void, id: unknown, arg2: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Makes an NPC follow a player, another NPC, or a point.
     *
     * Requires `world.npcs`. Movement channel. `target` is a player id (a number), `{ type = "npc", id = ... }`, or a position table. Options are `distance` (default 2 metres), `speed` (default `walk`) and `onTargetLost` (default `wait`), plus `priority` and `timeoutMs`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    follow(this: void, id: unknown, target: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads one task's state.
     *
     * Requires `world.npcs`. The task state machine is described in [NPCs](npcs.md); a task that has finished stops being readable.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return task snapshot, or nil
     */
    get(this: void, id: unknown, taskId: unknown): unknown | undefined;
    /**
     * Anchors an NPC to a position and lets it fight from there.
     *
     * Requires `world.npcs`. Movement channel. A standing order with no natural end: it runs until cancelled or timed out. Whenever the body is further than `radius` metres (2-100, default 10) from the anchor **and is not already in a fight**, it walks back; while it holds a hostile threat it is left entirely alone, so the engine can take cover and manoeuvre. Guarding does not by itself make anything hostile -- pair it with `setAttitude` or a relationship group. Options are `speed` (default `run`), `priority` and `timeoutMs`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_task_invalid_point, permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    guard(this: void, id: unknown, position: Open77Table, radius?: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Holds an NPC's movement until cancelled or timed out.
     *
     * Requires `world.npcs`. Movement channel, no default timeout: it holds indefinitely until `cancel`, `clear`, or an explicit `timeoutMs`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    hold(this: void, id: unknown, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Drives an NPC's look channel toward a player, NPC or point.
     *
     * Requires `world.npcs`. Look channel. `target` is a player id (a number), `{ type = "player"|"npc", id = ... }`, or a position table. Unlike `face`, this turns the head rather than the body.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    lookAt(this: void, id: unknown, target: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Walks or runs an NPC to a world point.
     *
     * Requires `world.npcs`. Movement channel. Options are `speed` (default `walk`), `acceptanceRadius` (default 1 metre), `priority` and `timeoutMs` (default 30,000 -- unlike most tasks, this one gives up rather than pathing forever). The walk never arrives by teleport: a destination the AI navigation cannot reach (a locked door, a wall, a point off the walkable mesh) is walked to its closest reachable point, where the NPC asks a managed door in front of it to open (see NPC passage in the doors guide) and re-checks once a second; if the way stays shut for about five seconds the task fails with reason `path_blocked`. Within `acceptanceRadius` + 0.5 m of an unreachable point it succeeds with reason `nearest_reachable`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    moveTo(this: void, id: unknown, position: Open77Table, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sends an NPC round a list of points.
     *
     * Requires `world.npcs`. Movement channel. `loop` defaults to true and `backAndForth` to false, so the default is a closed circuit. Options also take `speed`, `priority` and `timeoutMs`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    patrol(this: void, id: unknown, points: unknown, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Runs a full-body animation on an NPC.
     *
     * Requires `world.npcs`. Full-body channel, so it takes over movement and look for its duration. `options.loop` defaults to false.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    playAnimation(this: void, id: unknown, animation: string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Maps a 0..1 driver ability onto the two levers the engine exposes.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the vanilla `AIVehicleDriveToPointAutonomousCommand` pipeline -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * FiveM's `SetDriverAbility` is an engine skill parameter and 2.31 has none. This is an explicit **mapping**, documented so nobody has to guess it: below 0.34 is `cautious`, above 0.67 is `aggressive`, and in between is `normal`; the speed cap is `8 + ability * 24` metres per second. It returns the resulting driving state so a caller can read exactly what was applied instead of assuming.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_ability, invalid_npc_id, npc_not_driving, npc_not_owned, permission_denied:world.npcs, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return driving state, or nil | reason (`invalid_ability`, `npc_not_driving`)
     */
    setDriverAbility(this: void, id: unknown, ability: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops whatever an NPC's vehicle was doing.
     *
     * Requires `world.npcs` and `world.vehicles`. This is a ped-addressed view of `Open77.vehicles.ai`, which owns the vanilla `AIVehicleDriveToPointAutonomousCommand` pipeline -- there is no second driving stack and no second set of limits. The NPC must already be the attached driver of a vehicle (`Open77.vehicles.ai.attachDriver(vehicleId, { npcId = id })`), otherwise every one of these returns `nil, "npc_not_driving"`. The return value is the driving state the vehicle API returns.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_npc_id, npc_not_driving, npc_not_owned, permission_denied:world.npcs, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return driving state, or nil | reason
     */
    stopDriving(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Makes an NPC wait for a fixed time.
     *
     * Requires `world.npcs`. Action channel by default. `timeoutMs` defaults to the duration plus one second, so a wait cannot outlive itself.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    wait(this: void, id: unknown, durationMs: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Lets an NPC wander with the supplied movement parameters.
     *
     * Requires `world.npcs`. Movement channel. The whole options table is passed to the host as the task parameters, so it carries the wander radius and speed as well as `priority` and `timeoutMs`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.npcs
     * @open77Return task id, or nil | reason
     */
    wander(this: void, id: unknown, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Puts an NPC into an authored workspot scenario.
     *
     * Requires `world.npcs`. FullBody channel, the same one `playAnimation` uses, so a workspot and an animation cannot run on one body at once.
     *
     * `reference` is either a **catalogue profile id** (`smoke`, `sit`, `phone`, `dance`, `meditate`, ... -- see `Open77.npcs.tasks.workspots`), which brings its own shipped device entity and its own validated clip set, or a **raw clip name** played through the generic device. The catalogue profile is the supported form; a raw clip is an escape hatch whose animset the generic device may not carry. Ambient profiles do not appear in `Open77.animations.list()` or `tasks.workspots()` but resolve directly by id.
     *
     * `options.anchor = { x, y, z, yaw? }` positions a catalogue profile's workspot at world coordinates. Coordinates must be finite; yaw is degrees about Z, defaults to 0, and must be within -360..360. Anchored workspots play on every client, remain `Executing` without an authority and work on Frozen NPCs. An anchor with a raw clip returns `npc_task_invalid_workspot`; invalid anchor values return `npc_task_invalid_anchor`.
     *
     * `durationMs` ends the scenario by **succeeding**, not by timing out: a scenario that ran its course is not a failure, and `timeoutMs` stays free to mean "no client ever picked the command up". `loop = true` has no end and runs until cancelled.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, npc_task_invalid_anchor, npc_task_invalid_duration, npc_task_invalid_workspot, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.npcs, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return task id, or nil | reason (`npc_task_invalid_workspot`, `npc_task_invalid_anchor`, `npc_task_invalid_duration`)
     */
    workspot(this: void, id: unknown, reference: unknown, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The vanilla scenario catalogue a workspot task can name.
     *
     * Ungated. The same twelve shipped RP workspot profiles `Open77.animations.list()` offers for players -- one catalogue, two callers, never two lists that could disagree. Each entry gives `id`, `label`, `category`, the default `clip`, the vanilla `workspot` resource it plays, and the full clip set. `query` filters on id, label or category.
     *
     * @since 2.31.13+op77.67
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return array of profiles
     */
    workspots(this: void, query?: string): unknown;
}
interface Open77NpcsApi {
    /**
     * Every authoritative NPC, optionally filtered to one routing bucket.
     *
     * Requires `world.npcs`. Returns the whole registry, whichever resource created each NPC.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure permission_denied:npcs.foreign
     * @open77Return array of NPC snapshots
     */
    all(this: void, bucket?: number): unknown;
    /**
     * Applies authoritative damage to an NPC.
     *
     * Requires `world.npcs`. `source` and `cause` are recorded with the hit so a kill can be attributed. The damage still passes the NPC's damage policy, so an `invulnerable` NPC takes nothing.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    applyDamage(this: void, id: unknown, amount: number, source?: number | string, cause?: string): boolean;
    /**
     * Creates an authoritative NPC.
     *
     * Requires `world.npcs`. Build one from `record = "Character.*"` directly -- no catalogue entry is needed -- or from the legacy `template` alias. Definition fields are `record`, `template`, `position`, `yaw`, `bucket`, `appearance`, `loadout`, `behavior`, `aiMode`, `damagePolicy`, `health`, `maxHealth`, `streamingRadius`, `streamingHysteresis`, `despawnWhenUnobserved`, `persistent` and `authorityPolicy`. `aiMode` and `damagePolicy` are **integers** from the constant tables `Open77.npcs.ai` (`tasks = 0`, `frozen = 1`, `native = 2`) and `Open77.npcs.damage` (`mortal = 0`, `immortal = 1`, `invulnerable = 2`; default `immortal`); a string such as `"invulnerable"` raises a Lua argument error (`number expected, got string`) in `CreateNpc`. `authorityPolicy` is `"nearest"` (default) or `"balanced"` (the client simulating the fewest NPCs, with a tenure-gated rebalance); anything else returns `nil, "npc_authority_policy_invalid"`. `behavior.observerReplay = true` makes clients that do not simulate the NPC replay the simulator's motion on the shared server clock. The id comes back at once, but engine readiness is asynchronous: a freshly created NPC is not yet a body in the world. See [NPCs](npcs.md). Stable 147 also accepts body and equipment from a saved player look; body.family selects the matching Open77 player template. Do not combine it with a legacy template or an unrelated record. See [Character previews](character-previews.md).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @failure npc_authority_policy_invalid, npc_record_invalid, npc_template_invalid, npcs_unavailable, permission_denied:world.npcs
     * @open77Return NPC id, or nil | reason
     */
    create(this: void, def: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one NPC's canonical snapshot.
     *
     * Requires `world.npcs`. Answers `nil` for an unknown id. The snapshot is the server's record, so it is available before the body has streamed to anyone.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return NPC snapshot, or nil
     */
    get(this: void, id: unknown): unknown | undefined;
    /**
     * Reads back every attitude row an NPC states.
     *
     * Requires `world.npcs`, and only for an NPC this resource created. Returns a table with `default`, `players`, `npcs`, `groups` and `relations`; `relations` is the row projected by `setRelationship` and is written by the platform, not by `setAttitude`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @open77Return table, or nil
     */
    getAttitude(this: void, id: unknown): Open77Table | undefined;
    /**
     * Reads the canonical behavior policy of an owned NPC.
     *
     * Requires `world.npcs`. Returns a detached table with `aiEnabled`, `combatEnabled`, `perceptionEnabled`, `voiceEnabled`, `vehicleContactEnabled` and `hitPricing`. Client inspection uses `Open77.npcs.get(id).behavior` with `npcs.read`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @open77Return table behavior, or nil
     */
    getBehavior(this: void, id: number): Open77Table | undefined;
    /**
     * Read the stored player body of an NPC.
     *
     * Requires world.npcs. Returns the stored body snapshot or nil when the NPC is unknown, owned by another resource, or has no player body. This describes canonical data, not native rendering readiness. See [Character previews](character-previews.md#networked-npc).
     *
     * @permission world.npcs
     * @since 2.31.21+op77.147
     * @open77Return table body, or nil
     */
    getBody(this: void, id: number): Open77Table | undefined;
    /**
     * The clothing set an owned NPC is dressed in, slot to record.
     *
     * Requires `world.npcs`. Reads `loadout.equipment` back as a table; empty when the NPC wears nothing of ours, `nil` for an id this resource does not own. The same object is `json.decode(Open77.npcs.get(id).loadout).equipment`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.73
     * @open77Return slot-to-record table, or nil
     */
    getEquipment(this: void, id: unknown): Open77Table | undefined;
    /**
     * The relationship group an NPC belongs to.
     *
     * Requires `world.npcs`. Returns the `combat.group` string, or nil when the NPC has none.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure invalid_json, json_too_large
     * @open77Return string, or nil
     */
    getGroup(this: void, id: unknown): string | undefined;
    /**
     * Reads back a declared group relationship.
     *
     * Requires `world.npcs`. Returns the attitude token, or nil when this resource has declared nothing for the pair.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @open77Return string, or nil
     */
    getRelationship(this: void, groupA: string, groupB: string): string | undefined;
    /**
     * Kills an NPC authoritatively.
     *
     * Requires `world.npcs`. Goes through the NPC life authority rather than setting health to zero, so the death is replicated once and consistently.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    kill(this: void, id: unknown): boolean;
    /**
     * Who is simulating an NPC, and since when.
     *
     * Requires `world.npcs`. The same shape as `Open77.vehicles.owner`, so a script reads both alike: `authorityPlayerId` and `physicsOwner` carry the same value and are `0` when nobody simulates the NPC; `epoch` is the authority epoch; `since` is when the authority last changed on the `GetGameTimer()` clock and `ageMs` how long ago; `reason` is why (`projectionready`, `bettercandidate`, `leaseexpired`, `playerdisconnected`, `streamedout`, `npcremoved`, `validationfailed`, `serverrevoke`, or `none`); `leaseMs` is how long the current lease still has, when there is one; `readyClients` is how many clients have reported a ready projection -- the election's candidates. There is no request counterpart on purpose: an NPC's authority is elected from the ready clients, and a script has no better information than the election about which of them should simulate a body; a grant to a client that never reported ready would be a lease nobody renews.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.73
     * @failure invalid_npc_id, npc_not_found, npcs_unavailable, permission_denied:world.npcs
     * @open77Return { authorityPlayerId, physicsOwner, epoch, readyClients, since, ageMs, reason, leaseMs? }, or nil | reason: invalid_npc_id, npc_not_found
     */
    owner(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes an authoritative NPC.
     *
     * Requires `world.npcs`. Despawns the body for every viewer and drops the registry entry, including its queued tasks.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    remove(this: void, id: unknown): boolean;
    /**
     * Revives an NPC, at full health by default.
     *
     * Requires `world.npcs`. `health` defaults to 100. Reviving an NPC that is alive is accepted and simply sets its health.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    revive(this: void, id: unknown, health?: number): boolean;
    /**
     * Pauses or resumes a server-owned NPC's native AI and Open77 tasks.
     *
     * Requires world.npcs and ownership. Does not change aiMode or the other behavior options. Disabling revokes the simulation lease; enabling resumes according to the selected mode.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @failure npc_behavior_invalid
     * @open77Return boolean success, optional string reason
     */
    setAIEnabled(this: void, id: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Chooses who drives an NPC.
     *
     * Requires `world.npcs`. Modes are in `Open77.npcs.ai`: `tasks` (0, the Open77 task queue), `frozen` (1) and `native` (2, vanilla AI). This is a different axis from `setAIEnabled`, which pauses whichever driver is selected without changing the mode.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setAiMode(this: void, id: unknown, mode: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Convenience patch for an NPC's appearance.
     *
     * Requires `world.npcs`. Exactly `update(id, { appearance = appearance })`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setAppearance(this: void, id: unknown, appearance: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Makes an NPC hostile, neutral or friendly toward a target.
     *
     * Requires `world.npcs`. Attitude is **per NPC and per target**, because that is the only shape the engine expresses per incarnation: `gameAttitudeAgent.SetAttitudeTowards(agent, attitude)` is a pair override. `options.towards` selects the row -- a player id, `{ npcId = n }` (which must belong to this resource) or `{ group = "name" }` -- and omitting it sets the default that covers everyone without a row. Resolution order is the per-entity row, then the per-group row, then the resource relationship row, then the default. Passing `nil` for `attitude` removes the row. An NPC that states nothing behaves exactly as it did before this call existed. Eligibility is a hard cap on players: a dead player, or one in another routing bucket, is never made a target by a directive. See the [NPC guide](npcs.md#attitude-and-relationship-groups).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_attitude_invalid, npc_attitude_target_invalid, npc_not_found, npcs_unavailable, permission_denied:world.npcs
     * @open77Return boolean | reason
     */
    setAttitude(this: void, id: unknown, attitude: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes a server-owned NPC's native AI, combat, perception and voice policy.
     *
     * Requires `world.npcs` and ownership. Partial options: the booleans `aiEnabled`, `combatEnabled`, `perceptionEnabled` and `voiceEnabled` (default `true`) and `vehicleContactEnabled` (default `false`), and `hitPricing` (`"resource"`, the default, or `"platform"`). The same object is accepted as `behavior` by `create` and `update`. Replicated to observers and late joiners. Malformed values return `npc_behavior_invalid`; unknown option names return `npc_behavior_unknown_option`. See [NPC AI, combat and voice control](/docs/npc-behavior) for engine semantics and boundaries.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @failure npc_behavior_invalid
     * @open77Return boolean success, optional string reason
     */
    setBehavior(this: void, id: number, behavior: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Replace a player-shaped NPC body.
     *
     * Requires world.npcs and a body snapshot from appearance.captureBody. Replaces the complete body while preserving other loadout fields. The body family must match the NPC template; recreate the NPC to change family. Unrelated Character records cannot project player body groups. NPC ownership and the complete loadout 8 KiB limit apply. See [Character previews](character-previews.md#networked-npc).
     *
     * @permission world.npcs
     * @since 2.31.21+op77.147
     * @failure npc_body_invalid, npc_body_record_mismatch
     * @open77Return boolean accepted | reason on failure
     */
    setBody(this: void, id: number, body: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves an NPC to another routing bucket.
     *
     * Requires `world.npcs`. Changes who can see it: only players in the same bucket stream the NPC.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    setBucket(this: void, id: unknown, bucket: number): boolean;
    /**
     * Allows or suppresses a server-owned NPC's combat behavior.
     *
     * Requires world.npcs and ownership. False clears threats, disables hostile acquisition/reactions and blocks outgoing hit processing without disabling scripted locomotion.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @failure npc_behavior_invalid
     * @open77Return boolean success, optional string reason
     */
    setCombatEnabled(this: void, id: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets whether an NPC can be hurt or killed.
     *
     * Requires `world.npcs`. Policies are in `Open77.npcs.damage`: `mortal` (0), `immortal` (1, can be hurt but not killed) and `invulnerable` (2, takes nothing).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setDamagePolicy(this: void, id: unknown, policy: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the canonical clothing set of an owned NPC, slot to `Items.*` record. Whether a rig renders it is the client's answer, not this call's.
     *
     * Requires `world.npcs` and ownership. FiveM's `SetPedComponentVariation` on a ped, through the same puppet equipment path the loadout's `weapon` key already uses. The table is the WHOLE desired set: keys are the nine clothing slots (`Head`, `Face`, `InnerChest`, `OuterChest`, `Legs`, `Feet`, `Outfit`, `UnderwearTop`, `UnderwearBottom` -- the held weapon stays on `setLoadout`), values are `Items.*` record names, and a slot left out is a slot you want empty; `{}` undresses. Only a slot Open77 itself filled is ever emptied, so a character's own look (its appearance) is never stripped. Published as one revision on `loadout.equipment`, reaches late joiners, and survives a later `setLoadout` that does not mention `equipment`. Existence of the record and whether the garment binds to that character's rig are decided on each client against the live game -- the client never runs `InitializeSlots` for clothing, and refuses a slot the `Character.*` record does not declare with a log line (`slot_unavailable`). Refusals: `npc_equipment_invalid`, `npc_equipment_slot_invalid`, `npc_equipment_record_invalid`, `npc_not_found`, `npc_not_owned`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.73
     * @failure invalid_npc_id, npc_equipment_invalid, npcs_unavailable, permission_denied:world.npcs
     * @open77Return true on success, otherwise nil | reason
     */
    setEquipment(this: void, id: unknown, set: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Puts an NPC in a relationship group.
     *
     * Requires `world.npcs`. Writes the pre-existing `combat.group` loadout field, so it keeps its existing meaning -- two NPCs sharing a non-empty group are allies -- and additionally picks up whatever `setRelationship` has declared for that group. Group names are at most 64 characters of `A-Z a-z 0-9 _ - .`; `nil` removes the group. Unlike the attitude rows, a group does **not** survive a wholesale `setLoadout`, because it is an ordinary loadout field.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_not_found, npcs_unavailable, permission_denied:world.npcs
     * @open77Return boolean | reason
     */
    setGroup(this: void, id: unknown, group: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Convenience patch for an NPC's health and maximum.
     *
     * Requires `world.npcs`. Passing `maxHealth` raises or lowers the canonical maximum at the same time; omitting it leaves the maximum alone.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setHealth(this: void, id: unknown, health: number, maxHealth?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Convenience patch for an NPC's loadout.
     *
     * Requires `world.npcs`. Exactly `update(id, { loadout = loadout })`. Stable 147 supports player body snapshots in the NPC loadout. update(id, {body=...}) replaces the body while retaining other loadout data. Weapon-only loadout changes preserve the body and equipment. The complete loadout remains limited to 8 KiB. See [Character previews](character-previews.md#networked-npc).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setLoadout(this: void, id: unknown, loadout: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Controls autonomous sensory acquisition for a server-owned NPC.
     *
     * Requires world.npcs and ownership. False disables senses, reactions and automatic threat seeding; does not cancel an existing explicit target. Combat or AI disabled takes precedence.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @failure npc_behavior_invalid
     * @open77Return boolean success, optional string reason
     */
    setPerceptionEnabled(this: void, id: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets an NPC's canonical ragdoll state.
     *
     * Requires `world.npcs`. Exactly `update(id, { ragdoll = enabled == true })`; the state is replicated, so every viewer agrees.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setRagdoll(this: void, id: unknown, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Declares how two of this resource's groups regard each other.
     *
     * Requires `world.npcs`. The matrix is **per resource** -- one resource's groups never reach another's bodies, exactly as its NPC reads and writes never do -- and it is symmetric: declaring `a` against `b` also declares `b` against `a`. The resulting row is projected onto every owned NPC in either group and replicated, so observers resolve it without asking the server; an NPC that joins the group later picks up the standing row. `nil` for `attitude` removes the declaration. The matrix dies with the resource that declared it. This is NOT the engine's global attitude matrix: `gameCAttitudeManager.SetAttitudeRelation` is process-wide and shared with vanilla content, and is deliberately not used -- see `docs/research/npc-behavior-control.md`.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @failure npc_attitude_invalid, npc_relationship_not_found, npcs_unavailable, permission_denied:world.npcs
     * @open77Return boolean | reason
     */
    setRelationship(this: void, groupA: string, groupB: string, attitude: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets an NPC's canonical position and yaw.
     *
     * Requires `world.npcs`. A teleport, not a walk: for movement that the AI performs, enqueue a `moveTo` task instead.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    setTransform(this: void, id: unknown, def: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Controls voice lines and barks of a server-owned NPC.
     *
     * Requires world.npcs and ownership. Controls native voiceset lines/grunts (including combat/search barks), suppresses scripted voiceovers and filters native dialogue routed through subtitles. Replicated per NPC, not a global sound/SFX mute or a guarantee to stop audio already playing.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.57
     * @failure npc_behavior_invalid
     * @open77Return boolean success, optional string reason
     */
    setVoiceEnabled(this: void, id: number, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queues one voice-over line from an NPC's own voiceset on every client streaming it. `voice` is a `voContext` name (`greeting`, `fear_beg`), never a sentence: the NPC cannot say arbitrary text. `true` is the line queued, not the line heard.
     *
     * Requires `world.npcs` and ownership. FiveM's `PlayPedAmbientSpeechNative`: `voice` is a `voContext` name -- the same word vanilla passes to `GameObject.PlayVoiceOver` (`greeting`, `fear_beg`, `rep_ask_to_leave`) -- resolved by the engine against the puppet's voiceset (`Character.*.voiceTag`), not a Wwise event. `Open77.npcs.voices()` lists the generic barks that can be pointed at in the game's 2.31 sources; any identifier (letters, digits, underscore, at most 64) is accepted, because a record may carry lines no vanilla script calls. **A name the voiceset does not have is silent and nothing can report it** -- `true` means queued on every viewer, not heard. Audibility was not measured in the test loop (no audio capture; the plumbing is proven as far as the `SoundPlayVo` event reaching each viewer's puppet): test the lines you ship by ear, on the records you ship. Rides the existing effect one-shot to the NPC's routing bucket; the bundled `open77_effects` resource queues the engine's own `SoundPlayVo` event on each viewer's puppet through `Open77.sfx.playVoice`. `options.ignoreFrustum` (default true) speaks off-screen; `options.ignoreDistance` (default false) skips the engine's distance cull. Refusals: `invalid_voice`, `invalid_npc_id`, `npc_not_found`, `npc_not_owned`, `npc_dead`, `voice_disabled` (`setVoiceEnabled(id, false)` is in force), `npc_not_streamed` (no client has reported the body ready, so nobody could hear it), `npc_voice_busy` (a line was accepted on this NPC less than 400 ms ago).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.73
     * @failure effects_unavailable, invalid_argument, invalid_npc_id, invalid_voice, npc_dead, npc_not_found, npc_not_owned, npc_not_streamed, npc_voice_busy, npcs_unavailable, permission_denied:world.npcs, voice_disabled
     * @open77Return true on success, otherwise nil | reason
     */
    speak(this: void, id: unknown, voice: string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Who an NPC is currently fighting.
     *
     * Requires `world.npcs`, and only for an NPC this resource created. Returns `{ kind = "none"|"player"|"npc", id = n }`, mirroring the last reading its lease holder reported. It is the engine's own target tracker, not a record of what a script asked for, so an NPC that acquires a target by perception shows up here too. `onNpcTargetChanged` fires on every change to this value.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.67
     * @open77Return table { kind, id }, or nil
     */
    target(this: void, id: unknown): Open77Table | undefined;
    /**
     * The legacy alias catalogue of NPC templates.
     *
     * Requires `world.npcs`. It is a convenience list, **not** a limit: `create` accepts any `Character.*` record whether or not it appears here.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return array of template names
     */
    templates(this: void): unknown;
    /**
     * Patches an NPC's canonical state.
     *
     * Requires `world.npcs`. Sparse: appearance, loadout, behavior, AI mode, damage policy, health and ragdoll can all be patched in one call, and everything omitted is left alone. The convenience setters below are thin wrappers over this. Stable 147 supports player body snapshots in the NPC loadout. update(id, {body=...}) replaces the body while retaining other loadout data. Weapon-only loadout changes preserve the body and equipment. The complete loadout remains limited to 8 KiB. See [Character previews](character-previews.md#networked-npc).
     *
     * @permission world.npcs
     * @since 2.31.13+op77.45
     * @open77Return boolean | reason
     */
    update(this: void, id: unknown, def: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The documented bark vocabulary for `speak`, each name with the 2.31 source that plays it.
     *
     * Requires nothing. Rows of `{ name, context, source }` where `source` is a file and line in the game's own shipped REDscript (`tools/redmod/scripts`) or `.tweak` sources (`tools/redmod/tweaks`) -- names that can be re-read rather than believed. It is documentation, not an allowlist: `speak` accepts any identifier, and whether a given NPC's voiceset carries a line is up to its record's `voiceTag`.
     *
     * @since 2.31.13+op77.73
     * @open77Return array of { name, context, source }
     */
    voices(this: void): Open77Table;
    /**
     * A promise that resolves once at least one client has a ready body for an NPC.
     *
     * Requires `world.npcs`. The server half of the preloading helpers: FiveM code waits on the streamer with `RequestModel` / `HasModelLoaded` loops; here the server's only honest question is "does some client have a body for this NPC yet", and the answer is already on the wire -- every client reports its projection ready, `Open77.npcs.owner(id).readyClients` counts them and the election publishes `onNpcAuthorityChanged(id, player, epoch, "projectionready")`. Resolves with the `Open77.npcs.owner(id)` table as soon as `readyClients > 0` (before the call returns when one already has) and rejects with `timeout` after `timeoutMs` (default 15000, clamped to 1..120000); listens for the election event and polls the owner read every 250 ms as the safety net. The one-shot handler is removed on resolve, on timeout and with the resource. `nil, reason` only for a bad id, a bad timeout or a missing permission; an NPC the server does not know is waited for and times out, exactly like the client's `vehicles.whenStreamed` on an id it has never seen. There is deliberately no vehicle counterpart on the server: a vehicle's steward is elected by a driver's claim, never by a streamed report, so the server holds no signal that means "somebody has this car" -- `Open77.vehicles.create` already returns after the canonical create, and the client's `Open77.vehicles.whenStreamed` answers for its own projection.
     *
     * @permission world.npcs
     * @since 2.31.13+op77.73
     * @failure invalid_npc_id, invalid_timeout, npc_not_found, npcs_unavailable, permission_denied:world.npcs
     * @open77Return Promise, or nil | reason: invalid_npc_id, invalid_timeout, permission_denied:world.npcs, task_limit_or_stopping
     */
    whenReady(this: void, id: unknown, timeoutMs?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    tasks: Open77NpcsTasksApi;
}
interface Open77PerspectiveApi {
    /**
     * The perspective policy **this** resource set.
     *
     * Requires `network.events`. Returns `policy, perspective, declared` for the calling VM only -- it is not a read of the server's effective policy, which is whatever was written last by any resource.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @open77Return policy | perspective | declared (boolean)
     */
    policy(this: void): LuaMultiReturn<[unknown, string | undefined]>;
    /**
     * Sets whether players on this server may use third person.
     *
     * Requires `network.events`. `policy` is `disabled`, `allowed`, `default` or `forced`; `perspective` is `fpp` or `tps` and is required for `forced`, because a pin with nothing pinned would quietly become first person. The policy is broadcast to every client and answered again to anyone who joins later. Call it from the resource's **start path**: a reload replaces the VM, and the policy lives in it. If two resources declare a policy the last write wins, so one owner -- normally the gamemode -- is the remedy.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure forced_policy_needs_a_perspective, invalid_perspective, invalid_perspective_policy, invalid_target, network_unavailable, permission_denied:network.events
     * @open77Return true, or false | reason
     */
    setPolicy(this: void, policy: string, perspective?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77PlayerInteractionsApi {
    /**
     * Cancel an interaction owned by this resource.
     *
     * Requires `players.interactions.control` -- the handler chooses the name per operation, and `players.interactions.read` covers only the inspection calls (`get`, `current`, `list`, `isReserved`); without it the answer is `nil, permission_denied:players.interactions.control`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Custom reason accepts 1–64 ASCII alphanumeric/underscore characters; invalid reasons normalize to cancelled. Delayed callbacks should retain the interaction ID, never cancel whatever action happens to occupy the player later.
     *
     * @permission players.interactions.control
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return terminal state or nil, reason
     */
    cancel(this: void, interactionId: string, reason?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read the interaction reserving a player, including an unanswered invitation.
     *
     * Requires `players.interactions.read` -- the handler chooses the name per operation, and `players.interactions.control` is what `request` and `cancel` need instead; without it the answer is `nil, permission_denied:players.interactions.read`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Terminal states are removed from the active registry. Read access never grants cancellation of another resource's action.
     *
     * @permission players.interactions.read
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return active state or nil; nil, reason on rejection
     */
    current(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Read a copied active state by opaque interaction ID.
     *
     * Requires `players.interactions.read` -- the handler chooses the name per operation, and `players.interactions.control` is what `request` and `cancel` need instead; without it the answer is `nil, permission_denied:players.interactions.read`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Terminal states are removed from the active registry. Read access never grants cancellation of another resource's action.
     *
     * @permission players.interactions.read
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return active state or nil; nil, reason on rejection
     */
    get(this: void, interactionId: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Check whether a player is exclusively reserved by this service.
     *
     * Requires `players.interactions.read` -- the handler chooses the name per operation, and `players.interactions.control` is what `request` and `cancel` need instead; without it the answer is `nil, permission_denied:players.interactions.read`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Terminal states are removed from the active registry. Read access never grants cancellation of another resource's action.
     *
     * @permission players.interactions.read
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return boolean; nil, reason on rejection
     */
    isReserved(this: void, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * List active interactions owned by this resource only.
     *
     * Requires `players.interactions.read` -- the handler chooses the name per operation, and `players.interactions.control` is what `request` and `cancel` need instead; without it the answer is `nil, permission_denied:players.interactions.read`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Terminal states are removed from the active registry. Read access never grants cancellation of another resource's action.
     *
     * @permission players.interactions.read
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return state[]; nil, reason on rejection
     */
    list(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reserve and coordinate a two-player interaction.
     *
     * Requires `players.interactions.control` -- the handler chooses the name per operation, and `players.interactions.read` covers only the inspection calls (`get`, `current`, `list`, `isReserved`); without it the answer is `nil, permission_denied:players.interactions.control`. Uses canonical player IDs. The coordinator reserves both players and cancels on death, disconnect, vehicle entry, bucket change, resource stop, timeout or presentation failure. Gameplay effects remain the resource's responsibility. See player-interactions.md. Kinds: give, heal, carry, escort, custom. Options: durationMs (500–600000, default4000), startDistance (.25–10, default3), breakDistance (startDistance–20, default5), inviteTimeoutMs (1000–60000, default15000), consent (defaulttrue), optional actorAnimation/targetAnimation RP profiles for stationary kinds. Carry/escort reject profile overrides. Both players must be alive, on foot, near and in the same bucket. Acceptance is not proof of native playback; observe lifecycle events.
     *
     * @permission players.interactions.control
     * @since 2.31.13+op77.63
     * @failure interactions_unavailable, invalid_json, invalid_operation, invalid_options, invalid_request, json_too_large, permission_denied:players.interactions.control, permission_denied:players.interactions.read, resource_stopping
     * @open77Return state table or nil, reason
     */
    request(this: void, actorId: number, targetId: number, kind: string, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77PlayersApi {
    /**
     * Every authenticated player id, ascending.
     *
     * No permission. `GetPlayers` is the same function. This is the host's roster, so a gamemode no longer needs its own copy assembled from join and leave events.
     *
     * @since 2.31.13+op77.45
     * @open77Return array of player ids
     */
    all(this: void): number;
    /**
     * Bans a player's device identity through the master and disconnects them now.
     *
     * Requires `players.ban`. `BanPlayer` is the same function. Resolves the authenticated device identity and submits a **server-scoped** ban to the master -- different from `Open77.access.ban`, which writes the server's own local list. `durationSeconds` must be strictly positive; omitting it bans permanently. Reasons accept up to 512 UTF-8 bytes. Central publication is best-effort and asynchronous while the local kick is queued immediately.
     *
     * @permission players.ban
     * @since 2.31.13+op77.45
     * @failure ban_failed, invalid_duration, invalid_player_id, invalid_reason, permission_denied:players.ban, server_unavailable
     * @open77Return true, or false | reason: permission_denied:players.ban, invalid_player_id, invalid_reason, invalid_duration, server_unavailable, ban_failed
     */
    ban(this: void, playerId: number | string, reason?: string, durationSeconds?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Ends this resource's motion lease, animation playback and freeze claim on one player.
     *
     * Requires any of `players.motion.control`, `players.animations.control`, `players.life.freeze`; each half runs only under its own string. FiveM's `ClearPedTasksImmediately`, composed on the three services that already keep per-owner claims and already refuse to release another owner's. Answers `{ motion, animation, freeze, clear }`: `cancelled` / `stopped` / `released` when something of yours ended, `none` when you held nothing, `not_owned` when another resource holds it (left alone), or the owning service's reason (`transition_in_progress` on a freeze during a revive); `clear` is `true` when nothing of yours is left on the body. The animation half covers every playback shape for that player -- emote, placed posture, raw clip, sequence. `nil, reason` only for a bad id or a resource holding none of the three capabilities.
     *
     * @since 2.31.13+op77.73
     * @failure invalid_player_id, resource_stopping
     * @open77Return { motion, animation, freeze, clear }, or nil | reason
     */
    clearTasks(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The nearest player to a point or to another player.
     *
     * No permission. The first entry `Open77.players.nearby` would return, with the same anchor rules and the same options plus `radius`, which it takes in the options table because it has no positional radius. It answers a **bare nil** -- no second value -- when the search worked and nobody matched, and `nil, reason` when it failed: that is what separates an empty street from a bad argument.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, player_not_found, position_unknown, sessions_unavailable
     * @open77Return nearest entry, or nil when nobody matched | reason, only on failure
     */
    closest(this: void, anchor: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Applies authoritative damage to a player.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). Options are `attacker`, `cause` (or its alias `kind`) and `weapon`. The damage still passes the combat multipliers, team and scope rules, and every installed `Open77.combat.onDamage` arbiter.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    damage(this: void, playerId: number | string, amount: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Disconnects a player with a reason they see.
     *
     * Requires `players.disconnect`. `DropPlayer` is the same function. The reason is trimmed, must contain no control characters and is limited to 127 UTF-8 bytes so the transport can deliver it without truncation; omitting it uses `Disconnected by server.`. The closure is deferred until the current Lua callback returns, and repeated calls for the same player in one tick are idempotent -- the first reason wins.
     *
     * @permission players.disconnect
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, invalid_reason, permission_denied:players.disconnect, player_not_found, server_unavailable
     * @open77Return true, or false | reason: permission_denied:players.disconnect, invalid_player_id, invalid_reason, player_not_found, server_unavailable
     */
    disconnect(this: void, playerId: number | string, reason?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The distance in metres between two players, two points, or one of each.
     *
     * No permission. Each argument is a player id (an integer) or a point (a table with numeric `x`, `y`, `z`); an Open77 `vector3` is a point, because the shared vector type is a plain table with real `x`/`y`/`z` fields. Three-dimensional. A player's position comes from their last accepted snapshot whatever its age -- call `Open77.players.get` first if the age matters to the decision you are about to make. `position_unknown` means the player exists but has never reported a transform.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_position, player_not_found, position_unknown, sessions_unavailable
     * @open77Return number (metres), or nil | reason: invalid_argument, invalid_position, player_not_found, position_unknown, sessions_unavailable
     */
    distance(this: void, a: number, b: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The address a player is connecting from, as `ip:port`.
     *
     * Requires `players.identity.sensitive` -- the only function in this API behind that capability, and the reason it exists. An endpoint is an IP address: it identifies a person outside the game, it is the one field here that can follow someone home, and in most of the world it is regulated personal data. A resource that wants it says so in its manifest, where the operator installing that resource sees it before running it. Folding it into the ungated `Open77.players.identity` would have handed every resource on the server an address list it never asked for. IPv4 renders `203.0.113.9:31337`, IPv6 `[2001:db8::1]:31337`. `endpoint_unavailable` when the transport cannot name an address it is sure of -- it never guesses one.
     *
     * @permission players.identity.sensitive
     * @since 2.31.13+op77.67
     * @failure endpoint_unavailable, invalid_player_id, permission_denied:players.identity.sensitive, player_not_found
     * @open77Return "ip:port", or nil | reason
     */
    endpoint(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Cover or uncover one player's screen from the server.
     *
     * Requires `players.screen`. `out` true fades that player to black and HOLDS; `out` false gives the image back. The client consumes the relay frame itself and drives the same guarded native quest fade `Open77.screen` uses, so the target needs no client resource of its own, and a fade a client resource already owns is never stolen -- the request is refused instead. `durationMs` is 0..10000 (default 500); `options.timeoutMs` is 1000..60000 (default 15000) and is a ceiling the CLIENT enforces on real time, so forgetting the second call costs a pause, never a player stuck looking at black. Bracket a teleport with it: fade, move, fade back.
     *
     * @permission players.screen
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    fade(this: void, playerId: number | string, out: boolean, durationMs?: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Give one player's image back.
     *
     * Requires `players.screen`. `Open77.players.fade(playerId, false, durationMs)`.
     *
     * @permission players.screen
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    fadeIn(this: void, playerId: number | string, durationMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Fade one player's screen to black and hold it.
     *
     * Requires `players.screen`. `Open77.players.fade(playerId, true, durationMs, options)` under the name a spawn or teleport reads better with.
     *
     * @permission players.screen
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    fadeOut(this: void, playerId: number | string, durationMs?: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Forces a player out of a vehicle, overriding the exit lock.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.forcePlayerOutOfVehicle`. Omitting the vehicle ejects them from whatever they are in. The forced exit overrides `setVehicleExitLocked` and keeps the seat reserved until native confirmation or the bounded transition timeout.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true, or false | reason
     */
    forceOutOfVehicle(this: void, playerId: number | string, vehicleId?: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Everything the host can answer about one player synchronously, with a dated transform.
     *
     * No permission. The one read a job script makes before it acts. Unlike `Open77.players.position` it never goes quiet on a stale snapshot: it reports `ageMs` and `fresh` and lets the caller pick its own threshold -- `fresh` is true precisely when `position` would have answered, so the old semantics are still reachable from one reading. Always present: `playerId`, `bucket`, `fresh`, `ready`. Present once the player has reported: `ageMs`, `position` `{ x, y, z }`, `heading` (alias `yaw`), `velocity` `{ x, y, z }`, `speed`, `stateFlags`, `flags`, and `supportKind`/`supportId` on a moving support. Present when the host can resolve them: `name`, `identifier`, `userId`. A player who has never sent an accepted snapshot has no `position` and no `ageMs` at all, which is distinguishable from a reading that is merely old. Health (`players.stats.read`), life (`players.life.read`) and vehicle seat (`world.vehicles`) fields are **absent rather than false** without the permission that already guards `getHealth`, `getLifeState` and `getVehicleSeat`. See [the rich read](server-api.md#the-rich-read-and-the-freshness-decision).
     *
     * @permission players.life.read
     * @since 2.31.13+op77.67
     * @failure invalid_player_id, player_not_found, sessions_unavailable
     * @open77Return table, or nil | reason: invalid_player_id, player_not_found, sessions_unavailable
     */
    get(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * A player's health, armor and god-mode snapshot.
     *
     * Requires `players.stats.read` (the older spelling `players.damage.read` is still accepted by the runtime but is not the catalogued name). `GetPlayerHealth` is the same function. New resources should prefer `Open77.stats.getHealth`, which returns the richer nested pool the client also exposes.
     *
     * @permission players.damage.read, players.life.read, players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return health snapshot, or nil
     */
    getHealth(this: void, playerId: number | string): unknown | undefined;
    /**
     * Read whether any server resource holds a player's holocall eye-glow lease.
     *
     * Requires players.holocall.read and an explicit connected network player ID. This reads authoritative cosmetic intent, not a native render acknowledgement. False means no lease; nil, reason means the query failed. See holocall-eyes.md.
     *
     * @permission players.holocall.read
     * @since 2.31.13+op77.63
     * @failure holocall_unavailable, invalid_player, permission_denied:players.holocall.read, player_unavailable
     * @open77Return boolean enabled, or nil, reason
     */
    getHoloCallEyes(this: void, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * A player's canonical life snapshot.
     *
     * Requires `players.life.read`. `GetPlayerLifeState` is the same function. Answers a bare `nil` (no reason) without the permission, for a player with no life record yet (the continue screen) or while the life service is down. `phase` is `alive`, `dead`, `revivepending`, `respawnpending` or `recovering` -- **no underscore**, unlike the client spelling. Prefer `isDead` over comparing the string. The table carries, in the order the runtime sets them: `playerId`, `revision`, `phase`, `bucket`, `changedAtServerTick`, `killerPlayerId` and its alias `killer` (an integer, **`0` when nobody killed the player -- never `nil`**), `cause` (`unknown`, `firearm`, `melee`, `explosion`, `fall`, `vehicle`, `environment` or `script`), `weapon` (the death's weapon record string: what `kill` was given, default `resource:<name>`; `tweak:<hex>` or `""` for the damage arbiter's own verdict), `health`, `yaw`, `position { x, y, z }`, `impulse { x, y, z }`, `graceMilliseconds` and its alias `graceMs`, `flags`, and the booleans `ghosted`, `frozen`, `visible`. No `fallDamage` here -- that bit is on `Open77.players.get`. **Not every `dead` is a player going down.** The gamemode's join spawn (`weapon = "freeroam:join_spawn"`), `open77_playerstate` (`playerstate:restore`) and `open77_admin`'s `tp`/`goto`/`bring` (`open77_admin:<verb>`) all move a player through a scripted kill (`cause = "script"`) followed by a respawn; a fresh connection therefore reports `dead` once, milliseconds after the readiness gate opens. A death-driven resource reads `cause` and `weapon` and skips `script` deaths it did not cause itself. `Open77.players.teleport` moves a living player with no transition at all.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.45
     * @open77Return life snapshot table { playerId, revision, phase, bucket, changedAtServerTick, killerPlayerId, killer, cause, weapon, health, yaw, position, impulse, graceMilliseconds, graceMs, flags, ghosted, frozen, visible }, or nil
     */
    getLifeState(this: void, playerId: number | string): Open77Table | undefined;
    /**
     * A player's combined health and stamina snapshot.
     *
     * Requires `players.stats.read`. `GetPlayerStats` is the same function, and `Open77.stats.get` is the preferred spelling for new resources.
     *
     * @permission players.damage.read, players.life.read, players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return stats snapshot, or nil
     */
    getStats(this: void, playerId: number | string): unknown | undefined;
    /**
     * A player's canonical vehicle seat assignment.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.getPlayerSeat`. Canonical means the server's reservation, which exists before the client has mounted and survives a stream-out.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return seat assignment, or nil
     */
    getVehicleSeat(this: void, playerId: number | string): unknown | undefined;
    /**
     * The wanted policy this server has decided for a player.
     *
     * Returns `{ level, maxLevel, enabled }`, where `enabled` is the dispatch switch of the bucket the player is in. It is what the SERVER decided and pushed, never a reading of the game: the server has no way to learn the engine's real heat stage. A player the server has never set answers the defaults - level 0, ceiling 5, and their bucket's dispatch setting. Requires `players.wanted.read`, which is separate from `players.wanted` because what a server has decided about a player is state a resource has no business enumerating just because it can call a function.
     *
     * @permission players.wanted.read
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.wanted, permission_denied:players.wanted.read, permission_denied:world.prevention, prevention_unavailable, request_too_large, resource_stopping
     * @open77Return table { level, maxLevel, enabled }, or nil | reason: permission_denied:players.wanted.read, invalid_player
     */
    getWanted(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Heals a player by an amount.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `HealPlayer` is the same function. Clamped at the canonical maximum; it does not revive a dead player.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    heal(this: void, playerId: number | string, amount: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * A player's durable authenticated identifier.
     *
     * No permission. `GetPlayerIdentifier` is the same function. Durable across sessions, unlike the player id, which is only valid for this connection -- key persistent data on this. **The id must be an integer of 1 or more, checked before the call.** `0` or a negative id is not answered `nil`: the native throws `id must be positive`, which no `pcall` catches -- the resource is stopped with `runtime_error` and its dependants with `dependency_stopped`. A command run at the dedicated console has `source == 0`, so guard every id that may come from the console (see [A player id is an integer from 1 up](server-api.md#a-player-id-is-an-integer-from-1-up----validate-it-before-every-lookup)).
     *
     * @since 2.31.13+op77.45
     * @open77Return identifier, or nil
     */
    identifier(this: void, playerId: number): unknown | undefined;
    /**
     * Every identifier Open77 holds for a player, as a table.
     *
     * The table form of `GetPlayerIdentifiers`. Carries `open77` and `userId` (the same installation identity GUID), `name`, `fingerprint` and `joinedAt`. Since `2.31.13+op77.101`, also carries `license`, `steam` and `gog` from the verified Master ticket when available. `license` is the permanent Open77 account GUID without dashes, `steam` a lowercase hexadecimal SteamID and `gog` a decimal GOG ID. All values are strings without type prefixes; unavailable fields are omitted and read as `nil`. Account/store IDs need no permission; only `endpoint` requires `players.identity.sensitive`. Call in `onPlayerConnected` or later. Invalid IDs return `nil, "invalid_player_id"`; unknown sessions return `nil, "player_not_found"`. One qualifying store is sufficient, and a linked store ID alone is not a fresh ownership check. Use `license` for account-level persistence. No Discord identifier is exposed. See [account and store identifiers](/docs/connection-control#steam-gog-and-permanent-account-identifiers).
     *
     * @since 2.31.13+op77.67
     * @failure invalid_player_id, player_not_found
     * @open77Return table, or nil | reason
     */
    identifiers(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * An admitted player's authenticated identity.
     *
     * No permission required. `GetPlayerIdentity` is the same function. Returns `{ userId, name, publicKey, fingerprint, joinedAt }` for an admitted player, or `nil`; the fingerprint matches the client identity dump. Since `2.31.13+op77.101`, also includes `license`, `steam` and `gog` when supplied by the verified Master ticket. `license` is the permanent Open77 account GUID without dashes, `steam` a lowercase hexadecimal SteamID and `gog` a decimal GOG ID. Keep these bare values as strings; unavailable fields are omitted. `userId` remains the installation identity GUID, while `license` is the account key across linked devices. See [account and store identifiers](/docs/connection-control#steam-gog-and-permanent-account-identifiers).
     *
     * @since 2.31.13+op77.45
     * @open77Return table, or nil
     */
    identity(this: void, playerId: number | string): Open77Table | undefined;
    /**
     * The authenticated players in one routing bucket, ascending.
     *
     * No permission. `GetPlayersInBucket` is the same function. Answers `false, invalid_bucket` for a negative or oversized bucket.
     *
     * @since 2.31.13+op77.45
     * @failure invalid_bucket
     * @open77Return array of player ids, or false | invalid_bucket
     */
    inBucket(this: void, bucket: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Whether a player is dead, revive-pending or respawn-pending.
     *
     * Requires `players.life.read`. `IsPlayerDead` is the same function. Resolved from the enum rather than the string, so it is immune to the client/server spelling split -- this is the safe way to ask.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.45
     * @open77Return boolean, or nil
     */
    isDead(this: void, playerId: number | string): boolean | undefined;
    /**
     * Whether landings still hurt this player.
     *
     * Requires `players.life.read`. Answered from the server-owned life bit; unknown players, and a resource without the read permission, answer `true` because vanilla fall damage is the safe default. `Open77.players.get(id).fallDamage` carries the same bit on the rich read.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.73
     * @open77Return boolean
     */
    isFallDamageEnabled(this: void, playerId: number | string): boolean;
    /**
     * Whether a player is currently held still.
     *
     * Requires `players.life.read`. `IsPlayerFrozen` is the same function. Reads the canonical life state rather than a resource's own bookkeeping, so it answers true while ANY resource holds the player -- not only this one. `Open77.players.getLifeState(id).frozen` carries the same bit.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil
     */
    isFrozen(this: void, playerId: number | string): boolean | undefined;
    /**
     * Whether a player is currently non-solid.
     *
     * Requires `players.life.read`. `IsPlayerGhosted` is the same function. Reads the canonical life state rather than a resource's own bookkeeping.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.45
     * @open77Return boolean, or nil
     */
    isGhosted(this: void, playerId: number | string): boolean | undefined;
    /**
     * Whether a player's body is rendered by other clients.
     *
     * Requires `players.life.read`. `IsPlayerVisible` is the same function. **Answered from the server-owned life bit and never probed from a client**: Cyberpunk 2.31 exposes no readable hidden flag on `entIVisualComponent`, so there is nothing in the engine to ask. Unknown players answer `true` -- absence of a life state is not invisibility. The same bit is on the life snapshot as `getLifeState(id).visible`.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil
     */
    isVisible(this: void, playerId: number | string): boolean | undefined;
    /**
     * Alias of `Open77.players.disconnect`.
     *
     * Requires `players.disconnect`. The same function under the name an admin command would use; it is not a separate, harsher action.
     *
     * @permission players.disconnect
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, invalid_reason, permission_denied:players.disconnect, player_not_found, server_unavailable
     * @open77Return true, or false | reason
     */
    kick(this: void, playerId: number | string, reason?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Kills a player authoritatively.
     *
     * Requires `players.life.kill`. Options are `killer`, `cause` (default `script`), `weapon` and `impulse = { x, y, z }`. Do not call it on a player whose readiness gate has not opened -- see `Open77.ready`.
     *
     * @permission players.life.kill
     * @since 2.31.13+op77.45
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    kill(this: void, playerId: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * When an identity was last on this server, online or not.
     *
     * Requires `players.identity.history`. Takes the durable identifier `identifiers()` reports (the user id, not the session's player id) and answers `{ userId, name, online, lastSeenUtc, firstSeenUtc, previousSeenUtc?, joinCount, totalPlaySeconds }` -- with `playerId`, `connectedAtUtc` and `sessionSeconds` added while the identity is connected, in which case `lastSeenUtc` is now. Reads the identity directory the server persists for every admitted player; a server without one answers `history_unavailable`. Fails with `invalid_identifier`, `identity_unknown` (never admitted here), `permission_denied:players.identity.history`.
     *
     * @permission players.identity.history
     * @since 2.31.13+op77.73
     * @failure history_unavailable, identity_unknown, invalid_identifier, permission_denied:players.identity.history
     * @open77Return table, or nil | reason on failure
     */
    lastSeen(this: void, identifier: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The language a player's own game runs in, as their client reported it at world-ready.
     *
     * Requires `players.locale.read` -- a language says where a person is from more often than not, and every read of that kind here is declared in the manifest where the operator sees it. Returns `{ code, gameLanguage, voiceLanguage, subtitles, chromium, ageMs, revision }`: `code` is a BCP-47 tag derived from the engine's text language (`en-US`, `fr-FR`, `pt-BR`, `zh-CN`); `gameLanguage`, `voiceLanguage` and `subtitles` are the three raw engine codes (`en-us`, `jp-jp`, `kr-kr`) for a script that wants the audio language or meets a code the mapping has not seen; `chromium` is the client's OS UI language (what its WebUI pages see as `navigator.language`), kept for contrast and never used for `code`; `ageMs` dates the report and `revision` counts them -- a player who re-enters a world after changing language at the main menu re-reports, and the revision moves. Pushed by the client HOST on the reserved `open77:session:locale` net event, consumed before any resource route and refused to resources on both sides, so it is what the player's own game said and nothing else -- a report, not a ledger: a modified client can lie about it. Four refusals, distinct on purpose: `invalid_player_id`, `player_not_found` for a player who is not connected, `not_reported` for one whose client has not pushed yet (a client that never reached world-ready, or an older build), and `locale_unavailable` in an embedding with no transport.
     *
     * @permission players.locale.read
     * @since 2.31.13+op77.73
     * @failure invalid_player_id, locale_unavailable, not_reported, permission_denied:players.locale.read, player_not_found
     * @open77Return { code, gameLanguage, voiceLanguage, subtitles, chromium, ageMs, revision }, or nil | reason
     */
    locale(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * A player's display name.
     *
     * No permission. `GetPlayerName` is the same function. Answers `nil` for an unknown or departed session. **The id must be an integer of 1 or more, checked before the call.** `0` or a negative id is not answered `nil`: the native throws `id must be positive`, which no `pcall` catches -- the resource is stopped with `runtime_error` and its dependants with `dependency_stopped`. A command run at the dedicated console has `source == 0`, so guard every id that may come from the console (see [A player id is an integer from 1 up](server-api.md#a-player-id-is-an-integer-from-1-up----validate-it-before-every-lookup)).
     *
     * @since 2.31.13+op77.45
     * @open77Return name, or nil
     */
    name(this: void, playerId: number): unknown | undefined;
    /**
     * The players within a radius of a point or of another player, nearest first.
     *
     * No permission. `anchor` is a player id (an integer) or a point (a table with numeric `x`, `y`, `z`) -- never ambiguous, and a `vector3` is a point. An omitted or nil `radius` means no radius limit. Options: `bucket` (an integer narrows to it; `false` means every bucket; the default is the anchor player's own bucket, or every bucket for a point anchor), `includeSelf` (default false, ignored for a point anchor), `limit`, and `maxAgeMs`. The default keeps stale readings, because a player whose snapshots stalled is still somewhere; `maxAgeMs` is how you ask for a threshold. Entries carry `playerId`, `distance`, `bucket`, `fresh`, and `ageMs`/`name`/`position`/`heading`/`speed` where available -- deliberately not the whole of `get`, which would ask three services once per player per call. Sorted nearest first, ties broken by player id so two identical calls answer in the same order.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, player_not_found, position_unknown, sessions_unavailable
     * @open77Return array of entries sorted by distance, or nil | reason: invalid_argument, invalid_position, invalid_radius, invalid_options, invalid_bucket, invalid_limit, invalid_max_age, player_not_found, position_unknown, sessions_unavailable
     */
    nearby(this: void, anchor: number, radius?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The transport's measured round-trip time for one player, in milliseconds.
     *
     * No capability: this is latency, not identity. Every scoreboard in the genre shows it, the player already sees their own, and a resource that could not read it would measure it with a round trip of its own. GameNetworkingSockets' smoothed estimate, refreshed roughly twice a second. Three failures, deliberately distinct: `player_not_found` for a player who is not connected, `ping_unavailable` when the transport cannot measure at all (the phantom transport that drives bots never can) or has not sampled yet, and `invalid_player_id`. A bare nil would collapse all three into "no".
     *
     * @since 2.31.13+op77.67
     * @failure invalid_player_id, ping_unavailable, player_not_found
     * @open77Return milliseconds, or nil | reason
     */
    ping(this: void, playerId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * A player's last known position and routing bucket.
     *
     * No permission. `GetPlayerPosition` is the same function. Returns `{ x, y, z, bucket }` from the server's snapshot, so it can lag a fast-moving player by a tick. **The id must be an integer of 1 or more, checked before the call.** `0` or a negative id is not answered `nil`: the native throws `id must be positive`, which no `pcall` catches -- the resource is stopped with `runtime_error` and its dependants with `dependency_stopped`. A command run at the dedicated console has `source == 0`, so guard every id that may come from the console (see [A player id is an integer from 1 up](server-api.md#a-player-id-is-an-integer-from-1-up----validate-it-before-every-lookup)).
     *
     * @since 2.31.13+op77.45
     * @open77Return table { x, y, z, bucket }, or nil
     */
    position(this: void, playerId: number): Open77Table | undefined;
    /**
     * Every player's position in one call.
     *
     * No permission. `GetPlayersPositions` is the same function. Returns `{ [playerId] = { x, y, z, bucket } }` for every player with a snapshot younger than two seconds; a player without one is **absent** rather than a `nil` entry. One call replaces a loop of `position` over the roster.
     *
     * @since 2.31.13+op77.45
     * @open77Return table keyed by player id
     */
    positions(this: void): number;
    /**
     * Puts a player's body on the ground for a bounded time; it gets up on its own.
     *
     * Requires `players.motion.control`. FiveM's `SetPedToRagdoll`, composed on `Open77.motion.knockdown`: the engine's own knockdown status, a physical fall the observers replicate as a hit reaction. `options.direction` defaults to the body's own facing (from the last accepted transform; a player who never reported one falls north) and accepts a heading in degrees (0 = north) or `{ x, y }`; `options.distance` (0..6 m, default 0) turns the fall into a shove; `options.durationMs` counts from the moment the owning client reports the body down and is **clamped to the native 3000 ms** -- the effective number comes back as `durationMs`. `Open77.motion.cancel(id, result.id)` stands the body up early; `onPlayerMotionChanged` reports `ended` with `reason = "duration_elapsed"` when the clock fires. Refusals are the knockdown's: `motion_busy` (a motion is on the body, or the 1.5 s recovery after one), `body_unavailable` (not alive, on foot and ready -- a player mid-revive or respawn can never be knocked down, which is what keeps this away from the respawn ragdoll release), `invalid_direction`, `invalid_duration`; and `motion_unavailable` if the motion backend is unavailable. Motion leases do not require an implant database; canonical body readiness and matching life, incarnation and bucket remain required. The true physics ragdoll stays deliberately unbound; see the freeze page.
     *
     * @permission players.motion.control
     * @since 2.31.13+op77.73
     * @failure invalid_argument, invalid_direction, invalid_duration, invalid_json, invalid_operation, invalid_player, invalid_player_id, invalid_request, json_too_large, motion_unavailable, permission_denied:players.motion.control, permission_denied:players.motion.read, player_not_found, resource_stopping, sessions_unavailable
     * @open77Return { ok = true, id = ..., durationMs = ... }, or nil | reason
     */
    ragdoll(this: void, playerId: number | string, options: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Asks a client to re-apply the canonical life state.
     *
     * Requires `players.life.resync`. `RequestPlayerLifeResync` is the same function. The repair path for a client whose local view has drifted from the server's record; it does not change the record itself.
     *
     * @permission players.life.resync
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    requestLifeResync(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Asks one client for a screenshot of its game view, delivered by that client to a URL the server names; resolves with the upload's receipt.
     *
     * Requires `players.screenshot`. The question goes to the player's client HOST over the callback frames (the reserved name `open77:screen:capture`, answered without any client resource or client permission, like `Open77.world.groundZ`); the client captures its own swap chain, POSTs the bytes to `options.url` itself and answers with the receipt. **The picture never travels over the game transport** -- a net event carries 48 KiB and there is no client-to-server latent path -- so where it goes is the server owner's decision: an image host, a Discord webhook, or this server's own `Open77.http.listen` route (which decodes text and caps bodies at 16 KiB, so a thumbnail goes there as `encoding = "json"`). Returns an `Open77.Promise` (`:await()`, `:status()`) that resolves with `{ status, body, bodyTruncated, sentBytes, elapsedMs, width, height, sizeBytes, format }` -- `status` is the target's HTTP answer -- or `nil, reason`. Options are the client's `Open77.screen.capture` plus `Open77.screen.upload` vocabulary: `url` (required, absolute http/https, no credentials), `format` (`jpeg` | `png`), `quality` (1..100), `region = { x, y, w, h }`, `includeOverlay` (default false: the game alone, without Open77's own UI), `settleFrames`, `maxBytes`, `scale` (0.05..1, the output shrunk to that fraction of the region -- `0.25` makes a thumbnail this server's own 16 KiB route can take), `encoding` (`multipart` default | `json`), `field` (default `files[]`), `filename`, `headers`, `fields`, `timeoutMs` (the client's HTTP timeout, 1000..60000), and `timeout` (this promise's own deadline in ms, default 20000; the client is handed the same budget as `deadlineMs`). `await` must run from a scheduler coroutine; elsewhere it answers `await_requires_scheduler_coroutine`. What is captured is the client's own rendered frame -- never the desktop, never another window. Reasons before the wire: `permission_denied:players.screenshot`, `invalid_player_id`, `player_not_found`, `invalid_options`, `invalid_url`, `invalid_capture_option:<key>`, `invalid_quality`, `region_invalid`, `format_unsupported`, `invalid_settle_frames`, `invalid_max_bytes`, `invalid_scale`, `invalid_upload_option:<key>`, `invalid_header`, `invalid_field`, `invalid_callback_timeout`, `network_unavailable`, `resource_stopping`, `callback_request_limit`, `callback_payload_too_large`. Rejections carry the client's own names: `capture_in_flight`, `device_unavailable`, `capture_too_large`, `encode_failed:<stage>`, `request_failed:<stage>:<code>`, `timeout`, `capture_timeout`, `callback_timeout`, `callback_resource_unavailable`.
     *
     * @permission players.screenshot
     * @since 2.31.13+op77.73
     * @failure callback_payload_too_large, callback_request_limit, format_unsupported, invalid_callback_timeout, invalid_field, invalid_header, invalid_max_bytes, invalid_options, invalid_player_id, invalid_quality, invalid_scale, invalid_settle_frames, invalid_upload_option:encoding, invalid_upload_option:field, invalid_upload_option:filename, invalid_url, network_unavailable, permission_denied:players.screenshot, player_not_found, region_invalid, resource_stopping
     * @open77Return promise, or nil | reason
     */
    requestScreenshot(this: void, playerId: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Brings a DEAD player back to life at a chosen point.
     *
     * Requires `players.life.respawn`. **Not a general move**: it refuses with `invalid_state` unless the player's phase is already `Dead`, so it cannot relocate a living player at all -- use `Open77.players.teleport` for that. `options.position` is required; `heading` (default 0), `bucket` (default 0), `health` (a fraction, default 1.0) and `graceMs` (default 5000) are optional. Wait for the readiness gate before calling it on a joining player.
     *
     * @permission players.life.respawn
     * @since 2.31.13+op77.45
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    respawn(this: void, playerId: number | string, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Fills a player's health pool.
     *
     * Requires `players.stats.apply`. `RestorePlayerHealth` is the same function, and `Open77.stats.restore(playerId, "health")` is the pool-generic spelling. Fills to the canonical maximum without reviving a dead player.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    restoreHealth(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Fills a player's stamina pool.
     *
     * Requires `players.stats.apply`. `RestorePlayerStamina` is the same function. Useful at a round start, where waiting for regeneration would be visible.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    restoreStamina(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Revives a player where they fell.
     *
     * Requires `players.life.revive`. Options are `health` (a fraction, default 0.20) and `graceMs` (default 3000), the window during which the revived player cannot be damaged again.
     *
     * @permission players.life.revive
     * @since 2.31.13+op77.45
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    revive(this: void, playerId: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The live session of a connected player, and its history when the resource holds `players.identity.history`.
     *
     * The live half is ungated: `{ playerId, userId, connectedAtUtc, sessionSeconds, lastSeenUtc }` for a connected player, with `connectedAtUtc` the same `JoinedAtUtc` the session manager stamped at admission (so it can never disagree with `identifiers().joinedAt`). With `players.identity.history` the read also carries `firstSeenUtc`, `previousSeenUtc?`, `joinCount` and `totalPlaySeconds` (past sessions plus the live one) from the identity directory the server already persists -- no master round trip. Without the capability those fields are absent, never nil-filled. Fails with `invalid_player_id` or `player_not_found`.
     *
     * @since 2.31.13+op77.73
     * @failure invalid_player_id, player_not_found
     * @open77Return table, or nil | reason on failure
     */
    sessionStats(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Sets a player's canonical armor.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerArmor` is the same function. Armor is a separate pool from health and is consumed first by incoming damage.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setArmor(this: void, playerId: number | string, armor: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a downed player can still be damaged.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerDownedDamageable` is the same function. Turn it on for a mode with finishing blows, off for one where a downed player is safe until revived.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setDownedDamageable(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Switches one player's fall damage off or back on. Fall damage only -- not god mode.
     *
     * Requires `players.life.falldamage`. `false` makes landings harmless for this player; `true` restores the vanilla behaviour. **Fall damage only:** a shielded player is still shot, stabbed, burned, blown up and run over exactly as before -- this is FiveM's fall-damage toggle and not `setGodMode`, nor the grav-chute's blanket `Invulnerable` shield. On 2.31 a hard landing is a self-targeted attack the player's own locomotion machine fires through the damage pipeline (`Attacks.HardLanding` / `VeryHardLanding` / `DeathLanding`), so the bit rides the life state and the player's own client drops exactly those three records before they are priced; the stumble, camera hit and grunt still play. Survives a proxy re-stream and a bucket change; dropped by death and by a reconnect; switched back on when the calling resource stops or reloads. Refused with `transition_in_progress` during a revive or respawn, allowed while dead so a gamemode can pre-arm it before the respawn it issues (the respawn keeps it).
     *
     * @permission players.life.falldamage
     * @since 2.31.13+op77.73
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    setFallDamage(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Holds a player's body still, server-authoritative.
     *
     * Requires `players.life.freeze`. `SetPlayerFrozen` is the lower-level spelling. The body is held where it stands with the engine's own `GameplayRestriction.NoMovement` -- the same record vanilla death applies -- so nothing fights the hold and nothing slides on an observer's screen.\n\n**What it stops:** walking, running, sprinting, crouch-moving, jumping, dodging, sliding and vaulting. Every locomotion input, pressed or held.\n\n**What it does NOT stop, deliberately:** looking around, chat, voice, menus and the inventory, interaction prompts, and damage -- a frozen player can still be shot and still dies. It does not holster a weapon, block firing, or eject anyone from a vehicle. A freeze is a primitive, not a policy: combine it with the control-blocking surface if you want more.\n\nThe claim is keyed by the calling resource. Two resources may hold the same player, and `setFrozen(id, false)` drops only your own claim -- he stays frozen while anybody else still holds him. A resource's claims are dropped for it when it stops, reloads or crashes, and a freeze is also lifted by death, respawn, a bucket change and disconnect, so a script that went away can never strand a player. Re-apply after a respawn if the gamemode still wants him held. Refused with `transition_in_progress` while a revive or respawn is in flight, exactly like `setGhosted`.
     *
     * @permission players.life.freeze
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    setFrozen(this: void, playerId: number | string, frozen: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Makes a player non-solid, with an optional automatic clear.
     *
     * Requires `players.life.ghost`. `SetPlayerGhosted` is the lower-level spelling. `options.autoClear` defaults to **true**, with `clearDistance` and `clearMs` deciding when the ghost lifts -- that is what stops a spawn-protected player staying non-solid indefinitely. The server owns the state, so every observer agrees about it.
     *
     * @permission players.life.ghost
     * @since 2.31.13+op77.45
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    setGhosted(this: void, playerId: number | string, ghosted: boolean, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Toggles a player's canonical damage immunity.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerGodMode` is the same function. God mode is checked by the server, not the client, so it also refuses damage a Lua arbiter would have allowed.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setGodMode(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns a living player to face a yaw.
     *
     * Requires `players.teleport`. The cheap half of the placement pair: a heading streams nothing and cannot fall through a floor, so this dispatches and returns instead of confirming. `Open77.players.teleport` is the one that confirms. Refuses with `player_not_ready`, `player_not_alive` or `invalid_heading`.
     *
     * @permission players.teleport
     * @since 2.31.13+op77.67
     * @failure invalid_heading, invalid_player
     * @open77Return true, or false | reason
     */
    setHeading(this: void, playerId: number | string, yaw: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a player's health.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerHealth` is the same function. Setting zero passes through life authority rather than leaving a player alive at no health, so it is a real death with the usual replication.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHealth(this: void, playerId: number | string, health: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Synchronize a player's native blue holocall eye glow.
     *
     * Requires players.holocall.control. Uses a network player ID, not an entity handle. Enabled must be a boolean; options may only contain durationMs (integer 0..600000, default 0). True acquires/renews this resource VM's lease; false releases only its lease. The glow remains enabled while any resource holds a lease. It clears on death, disconnect, resource stop/reload/failure or expiry. Reliable bucket snapshots cover late joins and re-stream; clients project onto native and F7 bodies. Does not open the phone UI or start a call. See holocall-eyes.md.
     *
     * @permission players.holocall.control
     * @since 2.31.13+op77.63
     * @failure holocall_unavailable, invalid_argument, invalid_options, permission_denied:players.holocall.control, resource_stopping
     * @open77Return true, or false, reason
     */
    setHoloCallEyes(this: void, playerId: number, enabled: boolean, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a player's canonical maximum health.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerMaxHealth` is the same function. Lowering the maximum clamps the current value.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setMaxHealth(this: void, playerId: number | string, maxHealth: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a player's canonical maximum stamina.
     *
     * Requires `players.stats.apply`. `SetPlayerMaxStamina` is the same function. Lowering the maximum clamps the current value.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setMaxStamina(this: void, playerId: number | string, maximum: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the ceiling one player's wanted level may reach, 0 to 5.
     *
     * **The engine has no per-player wanted level.** `PreventionSystem` holds ONE heat stage, for the one player its client is running: `ChangeHeatStage(stage, reason)`, `GetHeatStage()` and `SetMinMaxResetHeatLevels(min, max, isDefault)` take no target, the state is scalar on a singleton, and every consumer reads one global `UI_WantedBar`. A per-player number works only because every Open77 player has their own game and the server tells each client its own value. The police that follow are LOCAL to that client - not Open77 entities, not replicated - so two wanted players standing together are two private pursuits, each invisible to the other. Do not build a shared chase on this. The value is pushed to the client immediately and re-pushed on a bucket change and on world entry; the server never learns the engine's real heat, because there is no value channel back from REDscript. Requires `players.wanted`. The engine call behind it is `SetMinMaxResetHeatLevels(0, level, false)`; the floor stays 0 because a nonzero minimum would strand a session at a heat it could never clear. Lowering the ceiling below a standing level lowers the level with it and reports that through `onPlayerWantedChanged` - leaving a player above their own ceiling is a state the engine's reset rules would undo at the next opportunity anyway.
     *
     * @permission players.wanted
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.wanted, permission_denied:players.wanted.read, permission_denied:world.prevention, prevention_unavailable, request_too_large, resource_stopping
     * @open77Return table { level, maxLevel }, or nil | reason: permission_denied:players.wanted, invalid_player, invalid_wanted_level, player_unavailable
     */
    setMaxWanted(this: void, playerId: number, level: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Sets a player's health regeneration rate.
     *
     * Requires `players.stats.apply` (the older spelling `players.damage.apply` is still accepted by the runtime but is not the catalogued name). `SetPlayerRegen` is the same function, and `Open77.stats.setRegenRate(playerId, "health", rate)` is the pool-generic spelling. Zero disables regeneration.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setRegen(this: void, playerId: number | string, pointsPerSecond: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns a player's health regeneration on or off.
     *
     * Requires `players.stats.apply`. `SetPlayerRegenEnabled` is the same function. Distinct from setting the rate to zero: the configured rate is remembered and comes back when regeneration is re-enabled.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setRegenEnabled(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a player's stamina.
     *
     * Requires `players.stats.apply`. `SetPlayerStamina` is the same function, and `Open77.stats.set(playerId, "stamina", value)` is the pool-generic spelling. Stamina is authoritative on the server: the client reads it and never sets it.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStamina(this: void, playerId: number | string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a player's stamina regeneration rate.
     *
     * Requires `players.stats.apply`. `SetPlayerStaminaRegen` is the same function. Zero disables regeneration; use `setStaminaRegenEnabled` to pause it while keeping the configured rate.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStaminaRegen(this: void, playerId: number | string, pointsPerSecond: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns a player's stamina regeneration on or off.
     *
     * Requires `players.stats.apply`. `SetPlayerStaminaRegenEnabled` is the same function. Turning it off is how a mode makes a sprint budget matter without rewriting the rate.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStaminaRegenEnabled(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets or clears a player's durable no-exit policy.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.setPlayerExitLocked`. Blocks ordinary unmount and manual seat switching; a server-forced exit still overrides it. Distinct from the vehicle's own `locked` entry flag, which governs getting *in*.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true, or false | reason
     */
    setVehicleExitLocked(this: void, playerId: number | string, locked: boolean, vehicleId?: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hides a player's body from every other client, or shows it again.
     *
     * Requires `players.life.visibility`. `SetPlayerVisible` is the lower-level spelling. **Presentation only, and deliberately orthogonal to `setGhosted`**: an invisible player is still solid, still shootable, still heard in proximity voice and still listed in `Open77.players.all()` -- which is what makes "invisible but still simulated" the default rather than a special mode. His nameplate is withheld with his body, because a plate over empty air would leak the exact position the hide exists to conceal, and a resource cannot opt out of that. The state is server-owned and rides the reliable life state, so it survives a proxy re-stream; clients re-assert the hide on a 1 Hz beat because 2.31 exposes no readable hidden flag to detect a render-proxy rebuild dropping it. On a remote body that is simultaneously being dressed, the body stays hidden while either owner holds it and appears only when both release, in either order. Released automatically on death, respawn, bucket change, disconnect, reconnect, and when the calling resource stops or reloads -- invisibility has no proximity auto-clear the way a ghost does, so nothing else would ever recover a stranded body.
     *
     * @permission players.life.visibility
     * @since 2.31.13+op77.67
     * @failure invalid_argument
     * @open77Return true, or false | reason
     */
    setVisible(this: void, playerId: number | string, visible: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one player's NCPD wanted level, 0 to 5.
     *
     * **The engine has no per-player wanted level.** `PreventionSystem` holds ONE heat stage, for the one player its client is running: `ChangeHeatStage(stage, reason)`, `GetHeatStage()` and `SetMinMaxResetHeatLevels(min, max, isDefault)` take no target, the state is scalar on a singleton, and every consumer reads one global `UI_WantedBar`. A per-player number works only because every Open77 player has their own game and the server tells each client its own value. The police that follow are LOCAL to that client - not Open77 entities, not replicated - so two wanted players standing together are two private pursuits, each invisible to the other. Do not build a shared chase on this. The value is pushed to the client immediately and re-pushed on a bucket change and on world entry; the server never learns the engine's real heat, because there is no value channel back from REDscript. Requires `players.wanted`. `setWanted(id, 0)` is `ClearPlayerWantedLevel`. The player's ceiling is applied here, not on the client: asking for 5 under a ceiling of 2 succeeds and reports `level = 2` beside the `requested` value, so a caller is told about the clamp instead of discovering it. Fires the host event `onPlayerWantedChanged(playerId, level, previous)` when the value actually changes - a decision this server made, never an observation of the game.
     *
     * @permission players.wanted
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.wanted, permission_denied:players.wanted.read, permission_denied:world.prevention, prevention_unavailable, request_too_large, resource_stopping
     * @open77Return table { level, requested, maxLevel }, or nil | reason: permission_denied:players.wanted, invalid_player, invalid_wanted_level, player_unavailable
     */
    setWanted(this: void, playerId: number, level: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Puts one player behind another player's shoulder, body and all.
     *
     * Requires `players.spectate`. Ghosts the spectator, hides his body and puts a follow camera on the target, as one transaction: if the body cannot be taken away nothing is applied and nothing is sent. `targetId` false or nil ends the session. `options`: `blendMs` (0..10000, default 400), `distance` (0..100, default 4.0), `height` (-50..50, default 1.5). Both halves come back on every way it can end -- either side dying, disconnecting, reconnecting or changing bucket, and this resource stopping -- and the body is restored to what it was, so a ghost another script owns survives. Refusals: `cannot_spectate_self`, `target_not_found`, `spectator_not_alive`, `target_not_alive`, `different_bucket`, `target_is_spectating`, `not_spectating`. The world streams around the SPECTATOR's body, so teleport him to the target for anything further than a couple of hundred metres. See the Scripted cameras guide.
     *
     * @permission players.spectate
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_target
     * @open77Return true, or false and a reason
     */
    spectate(this: void, playerId: number, targetId: number, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Who this player is watching, or 0.
     *
     * Requires `players.life.read`. Answered from the server-owned session roster, never probed from a client. See the Scripted cameras guide.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.67
     * @open77Return target player id, or 0
     */
    spectating(this: void, playerId: number): number;
    /**
     * Everyone watching this player, ascending.
     *
     * Requires `players.life.read`. Returns an array of player ids. See the Scripted cameras guide.
     *
     * @permission players.life.read
     * @since 2.31.13+op77.67
     * @open77Return array of player ids
     */
    spectators(this: void, playerId: number): number;
    /**
     * Seats a player through the vanilla entry animation.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.taskPlayerEnter`, with the same `options` as `warpIntoVehicle`: `moveBucket` (default true) and `exitLocked`/`lockExit` (default false). The reservation, the bucket move and every refusal reason are the warp's; only the way the affected client reaches the seat changes, and it falls back to the warp when the animation does not land within three seconds.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskEnterVehicle(this: void, playerId: number | string, vehicleId: number, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Ejects a player from their current vehicle.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.taskPlayerLeave`, which is the same durable forced exit as `forceOutOfVehicle`. The leaving player's own exit is instant on this build -- the local authored exit workspot crashed the engine's release dispatch when it was measured, so the client does not attempt it -- while every observer still sees the exit animated on this player's proxy.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskLeaveVehicle(this: void, playerId: number | string, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a living player, with no life transition.
     *
     * Requires `players.teleport`. Returns a **Promise** that resolves when the client reports the body settled at the destination, or `nil, reason` when the request was refused outright. Health, inventory, weapons and vehicle occupancy are untouched -- this is not `respawn`, which refuses unless the player is already dead and costs a death to work around. `options`: `heading`, `bucket` (changed before the move, so no observer left in the origin bucket ever sees the destination; restored if the move fails), `fade` (default true, with `fadeOutMs`/`fadeInMs` default 400), `dismount` (default false) and `timeoutMs` (1000..30000, default 12000). Resolves with `{ x, y, z, state }` where `state` is `settled` or `near`. Rejects with `player_not_ready` (no life record -- the continue screen, where acting on a client crashes it), `player_not_alive`, `player_in_vehicle`, `invalid_position` or `settle_timeout`. A player in a vehicle is refused rather than ejected: pass `dismount = true` to accept losing the vehicle, which unmounts behind the fade and refuses with `dismount_failed` if the body is still seated after 750 ms.
     *
     * @permission players.teleport
     * @since 2.31.13+op77.67
     * @failure bucket_change_failed, invalid_argument, invalid_bucket, invalid_heading, invalid_player, invalid_position
     * @open77Return Promise, or nil | reason
     */
    teleport(this: void, playerId: number | string, position: Open77Table, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Puts a player in a vehicle seat authoritatively.
     *
     * Requires `world.vehicles`. Alias of `Open77.vehicles.warpPlayerIntoVehicle`, with the same options: `moveBucket` (default true; false makes a bucket mismatch answer `wrong_bucket`) and `exitLocked`/`lockExit` (default false). Seats accept `-1..2`, the `Open77.vehicles.seats` constants, aliases like `driver`, and canonical `seat_*` names.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_player_id, invalid_seat, invalid_vehicle_id, permission_denied:world.vehicles, player_not_found, player_unavailable, vehicle_not_found, vehicles_unavailable, wrong_bucket
     * @open77Return true, or false | reason
     */
    warpIntoVehicle(this: void, playerId: number | string, vehicleId: unknown, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77PropsApi {
    /**
     * Every authoritative prop, optionally filtered to one routing bucket.
     *
     * Requires `world.props`. Returns the whole registry, whichever resource owns each prop.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @open77Return array of prop snapshots
     */
    all(this: void, bucket?: number): unknown;
    /**
     * Set a synchronized prop binding.
     *
     * Binding fields: parentType ('player' or 'vehicle'), parentId (canonical network ID, not an engine handle), bone (named slot, empty for root), offset {x,y,z} in metres (each ±20), rotation {x,y,z} in degrees (each ±360, local Z-Y-X composition). Unknown fields and non-finite numbers reject. Missing streamed parents are hidden, then rebound when available. See attachments.md. Requires world.props and ownership of the prop. Parent must be alive/valid in the same bucket. Up to 32 bindings per parent. Optional expectedRevision enables compare-and-swap; stale updates reject. Idempotent identical attachment does not create a new revision. Experimental contact applies only to native item:Items.* props: omitted selects automatic mouth contact, false disables it, or {x,y,z} specifies item-local metres (finite, each within ±2; missing axes zero). Invalid values return invalid_item_contact; contact on an ordinary mesh returns contact_requires_item. Native items require a player parent, WeaponRight, zero offset/rotation and unit scale. Contact affects the arm during supported consumption profiles, not the grip offset. Requires matching runtime/assets; visual validation is incomplete. See [item size and mouth contact](/docs/rp-animations#item-size-and-mouth-contact). Automatic container contact uses the main mesh end along the authored item-local up direction (the can rim), keeping that end while tilting; smoking uses the end nearest the mouth. In first person, held items stay visible at the lower right between sips and contact follows the camera. Disabling mouth fitting keeps the first-person holding pose.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_argument, invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_attachment_target, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return true on success; nil, reason on rejection
     */
    attach(this: void, propId: number, binding: Open77Table, expectedRevision?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * List replicated props attached to one parent.
     *
     * Requires world.props. Uses a canonical player/vehicle ID and returns copied prop records, including bindings and revisions. Inspection can include other resources' props, but mutation still checks ownership.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return prop[] or nil, reason
     */
    attachedTo(this: void, parentType: string, parentId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Always an empty table on the server.
     *
     * The dedicated server keeps no curated model catalogue -- the aliases live on the client, next to the records they resolve. It answers an empty list rather than `nil` so the shipped `prop.catalog` console command stays honest instead of failing on a nil call.
     *
     * @since 2.31.13+op77.45
     * @open77Return empty table
     */
    catalog(this: void): Open77Table;
    /**
     * Removes every prop this resource owns and returns how many.
     *
     * Requires `world.props`. Called for you when the resource stops, so a reloading gamemode never leaves orphaned scenery behind. It never touches another resource's props.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure permission_denied:world.props, world_unavailable
     * @open77Return number removed
     */
    clear(this: void): number;
    /**
     * Creates an authoritative, replicated world prop.
     *
     * Requires `world.props`. This is the **server** meaning of the name: the prop is owned by the creating resource, streamed per player rather than broadcast to a bucket, and visible to everyone in range. The identically named *client* function makes a local, unreplicated decoration instead. Definitions accept `model`, `position`, `yaw`, `scale` (a number or `{ x, y, z }`), `appearance`, `bucket`, `physics` (`static`, `kinematic`, `dynamic`, `none`), `collision`, `visible`, `kind` (`prop`, `light`, `effect`), `light`, `streamingRadius` (10 to 2000, default 120), `streamingHysteresis` (default 30) and `ttlMs` (0 for no expiry, seven days maximum). The registry holds 8,192 props, of which one resource may own 2,048. Ids are decimal strings; do not pass them through `tonumber`.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_model, invalid_position, permission_denied:world.props, world_unavailable
     * @open77Return prop id (decimal string), or nil | reason: permission_denied:world.props, quota_exceeded, invalid_position, invalid_model, unknown_alias, record_provisioning_failed, entity_spawn_failed, world_unavailable
     */
    create(this: void, def: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Release a synchronized prop binding.
     *
     * Requires world.props and prop ownership. Optional expectedRevision prevents detaching a newer binding. Leaves the prop at the server's last coarse parent anchor, which is not an exact client-side animated bone transform. Already detached is idempotent. Death, disconnect, parent removal and bucket changes also detach automatically.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return true on success; nil, reason on rejection
     */
    detach(this: void, propId: number, expectedRevision?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one prop's canonical snapshot.
     *
     * Requires `world.props`. Reads are not restricted to the owner; the snapshot's `resource` field is provenance and cleanup scope, not an authorization boundary.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @open77Return prop snapshot, or nil
     */
    get(this: void, id: string): unknown | undefined;
    /**
     * Read a prop's current replicated binding.
     *
     * Binding fields: parentType ('player' or 'vehicle'), parentId (canonical network ID, not an engine handle), bone (named slot, empty for root), offset {x,y,z} in metres (each ±20), rotation {x,y,z} in degrees (each ±360, local Z-Y-X composition). Unknown fields and non-finite numbers reject. Missing streamed parents are hidden, then rebound when available. See attachments.md. Requires world.props. Returns a copy, not a mutable reference. Nil can mean detached or absent; inspect the second result for a capability/validation failure.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return binding table or nil; nil, reason on rejection
     */
    getAttachment(this: void, propId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Check whether a prop has a binding.
     *
     * Requires world.props. Returns false when no binding exists, and nil plus reason for a rejected query. This tests authoritative state, not whether a particular client has streamed or rendered its parent.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return boolean or nil, reason
     */
    isAttached(this: void, propId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a prop this resource owns.
     *
     * Requires `world.props`. Another resource's prop answers `owned_by_another_resource`.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
     * @open77Return true, or false | reason
     */
    remove(this: void, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Change a binding's local offset and rotation.
     *
     * Binding fields: parentType ('player' or 'vehicle'), parentId (canonical network ID, not an engine handle), bone (named slot, empty for root), offset {x,y,z} in metres (each ±20), rotation {x,y,z} in degrees (each ±360, local Z-Y-X composition). Unknown fields and non-finite numbers reject. Missing streamed parents are hidden, then rebound when available. See attachments.md. Requires world.props and prop ownership. Omitted vectors retain their previous values. The current revision is used if expectedRevision is omitted; stale explicit revisions reject. A detached prop rejects with not_attached.
     *
     * @permission world.props
     * @since 2.31.13+op77.63
     * @failure invalid_argument, invalid_attachment, invalid_attachment_bone, invalid_attachment_first_person, invalid_attachment_parent, invalid_attachment_target, invalid_item_contact, invalid_operation, invalid_prop_id, invalid_revision, not_attached, not_found, permission_denied:world.props, resource_stopping, world_unavailable
     * @open77Return true on success; nil, reason
     */
    setAttachmentTransform(this: void, propId: number, offset?: Open77Table, rotation?: Open77Table, expectedRevision?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves a prop to another routing bucket.
     *
     * Requires `world.props`. Changes which players stream it.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
     * @open77Return true, or false | reason
     */
    setBucket(this: void, id: string, bucket: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Moves and optionally rescales a prop this resource owns.
     *
     * Requires `world.props`. Takes `position`, `yaw` and `scale` (a number or `{ x, y, z }`). Unlike the client prop API, scale belongs here rather than in `update`.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_position, not_found, permission_denied:world.props, prop_attached, world_unavailable
     * @open77Return true, or false | reason
     */
    setTransform(this: void, id: string, def: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Patches a prop this resource owns.
     *
     * Requires `world.props`. Sparse, and it deliberately does **not** accept `model` or `kind`: changing either is a remove and a create, because the render proxy is built from them. A resource may read every prop but mutate only its own.
     *
     * @permission world.props
     * @since 2.31.13+op77.45
     * @failure invalid_argument, not_found, permission_denied:world.props, world_unavailable
     * @open77Return true, or false | reason: not_found, owned_by_another_resource, ...
     */
    update(this: void, id: string, patch: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77ReadyApi {
    /**
     * Takes or refreshes this resource's hold on a player.
     *
     * No permission. Returns the player's `session`, which later identifies the hold being released. Refreshing an existing hold restarts its deadline.
     *
     * @since 2.31.13+op77.45
     * @open77Return session, or nil | reason
     */
    hold(this: void, playerId: number | string, reason?: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Whether anything is still holding a player.
     *
     * No permission. A player the host does not know is reported ready, so an unknown id never blocks a mode forever. The rule the gate exists for: do not teleport, spawn, kill or force a respawn on a player until this is true. Reading state, rosters and HUD payloads is unaffected.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    isReady(this: void, playerId: number | string): boolean;
    /**
     * Declares that this resource holds joining players until it is finished with them.
     *
     * No permission. Call it **once, at load**: every player who connects from then on arrives with one hold in this resource's name, which is what stops another resource teleporting or spawning them mid-setup. Options are `timeoutMs` and `reason`. Every hold carries a deadline, so a resource that never releases costs one degraded join and one `WRN` naming it, never a stuck server.
     *
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    participate(this: void, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Clears this resource's hold on a player.
     *
     * No permission. A `session` that no longer matches is dropped rather than releasing a newer hold -- that is what keeps a late release from opening the gate for the player who reconnected in the meantime. `onPlayerReady(playerId, detail)` is emitted into **every** running resource when the last hold clears.
     *
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    release(this: void, playerId: number | string, session?: unknown, note?: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Who is holding a player, and for how long.
     *
     * No permission. Returns `{ known, ready, session, ageMs, holds = { { resource, reason, ageMs, remainingMs } } }`. The `ready` console command prints the same thing, which is the quickest way to find the resource that is not releasing.
     *
     * @since 2.31.13+op77.45
     * @failure invalid_json, json_too_large
     * @open77Return table
     */
    status(this: void, playerId: number | string): Open77Table;
}
interface Open77ReflexApi {
    /**
     * Ends a player's running overdrive now; the grant and its cooldown are unchanged.
     *
     * Requires `players.reflex.manage`. The client stops the boost on the next frame and every attached layer and the nameplate marker clear. No activation running answers `no_activation`.
     *
     * @permission players.reflex.manage
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    cancel(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The supported profile, the two tiers and the advertised boundary.
     *
     * Requires `players.reflex.read`. Reports `profile = "reflex_overdrive"`, `sharedRealTimeWorld = true`, `slowsBullets = false`, `slowsOtherPlayers = false`, `touchesTimeDilation = false` and `maximumDurationMs = 15000` -- the boundary a server maker can quote to players.
     *
     * @permission players.reflex.read
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return capabilities table
     */
    capabilities(this: void): Open77Table;
    /**
     * The player's overdrive activity and projection, or nil without a grant.
     *
     * Requires `players.reflex.read`. Returns `projection` (`status` is `pending`, `ready` or `removed`, plus the `definition`), `phase`, `charges`, `remainingMs`, `cooldownUntil`, `activation` and `ownedByCaller`, a server-derived boolean for the calling resource that is accurate across projection restarts.
     *
     * @permission players.reflex.read
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return activity table, or nil
     */
    current(this: void, playerId: number | string): Open77Table | undefined;
    /**
     * Registers a reflex-overdrive definition: a tier plus its economy.
     *
     * Requires `players.reflex.define`. `profile` is exactly `reflex_overdrive`; `config` picks `tier` (`reflex` or `reflex_heavy`), `inputKey` (the default the client registers as the rebindable `reflex_overdrive` action), `presentation` (`native`, `silent`, `none`), `durationMs` 500-15000 (never longer than `cooldownMs`), `cooldownMs` 1000-600000, `maxCharges` 1-3, `chargeRegenMs`, `staminaCost` 0-300 and `heatCost` 0-100. A definition cannot name a stat: the client owns the two tier plans and their ceilings. Out-of-range values are refused, not clamped. Versions are immutable. No clock is touched anywhere in this feature.
     *
     * @permission players.reflex.define
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    define(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Grants a defined overdrive to one player for the session.
     *
     * Requires `players.reflex.manage`. Acceptance is entitlement, not readiness: check `current(player).projection.status == "ready"` before presenting it as usable. Needs the bound cyberware character and an alive, ready, unmounted body -- a grant sent before the player is incarnated is refused `body_unavailable`. Only the granting resource may revoke or cancel it. A session capability, not purchased equipment.
     *
     * @permission players.reflex.manage
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    grant(this: void, playerId: number | string, definition: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes this resource's overdrive grant from a player.
     *
     * Requires `players.reflex.manage`. Paid implants are untouched; a running boost ends on the release path. Another resource's grant answers `grant_owned_by_another_resource`.
     *
     * @permission players.reflex.manage
     * @since 2.31.13+op77.73
     * @failure invalid_definition, invalid_json, invalid_operation, invalid_player, invalid_request, json_too_large, permission_denied:players.reflex.define, permission_denied:players.reflex.manage, permission_denied:players.reflex.read, reflex_unavailable, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason
     */
    revoke(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77ResourceApi {
    /**
     * A running server resource's opaque VM generation.
     *
     * No permission. Omitting the name answers this VM's own generation; naming another running server resource answers its generation, or `0` when it is unavailable. The value changes on every restart and reload, which is how a cached handle or a deferred callback can tell it is talking to the same VM it started with.
     *
     * @since 2.31.13+op77.45
     * @open77Return generation, or 0
     */
    generation(this: void, resourceName?: string): unknown;
    /**
     * Every discovered resource and its runtime state.
     *
     * No capability. Entries are `{ name, version, state, generation, memoryBytes }` plus `error` when the resource failed. `state` is the lowercased runtime state: discovered, starting, running, stopping, stopped, failed or blocked.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return array of tables, or nil | reason
     */
    list(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * One resource's parsed manifest, or one field of it.
     *
     * No capability. With no `key`, returns the whole manifest as `{ name, version, open77Version, autoStart, reloadPolicy, dependencies, permissions, sharedScripts, serverScripts, clientScripts, preloadMods, clientFiles }`. With a key, returns just that field; both the camelCase and the manifest's own snake_case spelling are accepted. `author` and `description` answer `unknown_metadata_key` rather than an empty string: the manifest parser does not read them, so claiming a value would be a claim this server cannot make.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return table or field value, or nil | reason
     */
    metadata(this: void, name: string, key?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * This resource's name, as its manifest declares it.
     *
     * No permission. `GetCurrentResourceName` is the same function.
     *
     * @since 2.31.13+op77.45
     * @open77Return resource name
     */
    name(this: void): string;
    /**
     * Queues a resource restart for the next tick boundary.
     *
     * Requires `resources.control`. See `Open77.resource.start` for why it is queued.
     *
     * @permission resources.control
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return true when queued, otherwise false | reason
     */
    restart(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Queues a resource start for the next tick boundary.
     *
     * Requires `resources.control`. Queued, never inline: a resource stopping or restarting another while a Lua state is on the stack would free memory that is still executing, so the verb is applied where a console line is applied -- on the game-loop thread, outside every VM. Reports acceptance, not completion; read `Open77.resource.list()` on a later tick for the outcome. An unknown name answers `unknown_resource` immediately rather than as a line in a log nobody is reading.
     *
     * @permission resources.control
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return true when queued, otherwise false | reason
     */
    start(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The current server-side state of a resource.
     *
     * No permission. `GetResourceState` is the same function. Worth asking after a lifecycle event: a queued `open77:resource:started` describes a transition that happened, and a stop or start can have followed before the next tick.
     *
     * @since 2.31.13+op77.45
     * @open77Return state string
     */
    state(this: void, resourceName: string): unknown;
    /**
     * Queues a resource stop for the next tick boundary.
     *
     * Requires `resources.control`. See `Open77.resource.start` for why it is queued.
     *
     * @permission resources.control
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, invalid_resource_name, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return true when queued, otherwise false | reason
     */
    stop(this: void, name: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77RoutingBucketsApi {
    /**
     * An entity's routing bucket.
     *
     * No permission. `GetEntityRoutingBucket` is the same function. The default is `0`.
     *
     * @since 2.31.13+op77.45
     * @open77Return bucket (integer)
     */
    getEntity(this: void, entityId: unknown): number;
    /**
     * A player's routing bucket.
     *
     * No permission. `GetPlayerRoutingBucket` is the same function. The default is `0`. A bucket is a visibility scope: players and entities only see others in the same one.
     *
     * @since 2.31.13+op77.45
     * @open77Return bucket (integer)
     */
    getPlayer(this: void, playerId: number | string): number;
    /**
     * Moves an entity to another routing bucket.
     *
     * No permission. `SetEntityRoutingBucket` is the same function. The per-kind helpers (`Open77.vehicles.update`, `Open77.npcs.setBucket`, `Open77.props.setBucket`) do the same thing with validation.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    setEntity(this: void, entityId: unknown, bucket: number): boolean;
    /**
     * Sets a bucket's entity lockdown mode.
     *
     * No permission. `SetRoutingBucketEntityLockdownMode` is the same function. Modes are `inactive`, `relaxed`, `strict` and `full`, tightening what clients in that bucket may create.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    setLockdownMode(this: void, bucket: number, mode: string): boolean;
    /**
     * Moves a player to another routing bucket.
     *
     * No permission. `SetPlayerRoutingBucket` is the same function. This moves their authoritative visibility scope, so it is how a lobby, an instanced arena or a private apartment is built.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    setPlayer(this: void, playerId: number | string, bucket: number): boolean;
    /**
     * Turns ambient population on or off for one bucket.
     *
     * No permission. `SetRoutingBucketPopulationEnabled` is the same function. Switching it off empties a bucket of vanilla pedestrians and traffic, which is what an arena or a staged scene usually wants.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    setPopulationEnabled(this: void, bucket: number, enabled: boolean): boolean;
}
interface Open77RuntimeApi {
    /**
     * Disarms a pending server restart.
     *
     * Requires `runtime.restart`. The reason `open77:admin:scheduledRestart` is a plain notification rather than a cancellable event: stopping a shutdown is an authority, not a veto every listener gets for free. Broadcasts the cancellation to players and raises `open77:admin:restartCancelled` when a restart was actually armed; a no-op otherwise. Refusals: `permission_denied:runtime.restart`, `restart_control_unavailable`.
     *
     * @permission runtime.restart
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return { scheduled = false, secondsRemaining = 0 }, or nil | reason
     */
    cancelRestart(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Every command registered across every running resource, plus the built-in verbs.
     *
     * No capability; it is a read of the operator's own installation. Entries are `{ name, resource, restricted, source }`, `source` being `resource` for a Lua registration and `console` for a built-in verb. The built-ins listed are the resource-lifecycle set the coordinator owns; the ACL, ban, routing-bucket and phantom verbs are **not** listed, because they live in a hand-written dispatcher with no registry to read. The `source` field is what tells a reader this list has two origins.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return array of tables, or nil | reason
     */
    commands(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Queues one console line to run at the next tick boundary.
     *
     * Requires `runtime.commands`, which grants a PLAIN resource's authority: it may invoke another resource's ordinary command and nothing else. A command declared `restricted` and every resource-lifecycle verb are refused. A resource that also declares `resources.control` runs the line with the authority the in-game operator escalation uses. FiveM's `ExecuteCommand` runs as the console with no declaration anywhere that a resource holds rcon; here the manifest says it. **Queued, never inline**: Lua runs inside the host's tick, so dispatching a line synchronously would re-enter a VM and reset an instruction budget mid-flight. The call reports acceptance, not completion, and the reply goes to the server log naming the resource that asked. Refusals: `permission_denied:runtime.commands`, `empty_command`, `command_line_too_long`, `command_too_many_tokens` (more than 64 tokens; every token is a Lua stack push at drain time), `command_queue_full`, `invalid_command_line`.
     *
     * @permission runtime.commands
     * @since 2.31.13+op77.67
     * @failure invalid_command_line, invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return true when queued, otherwise false | reason
     */
    executeCommand(this: void, line: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The Lua version this server VM runs.
     *
     * No permission. Returns the interpreter's `_VERSION` string, for a resource that wants to record what it ran on.
     *
     * @since 2.31.13+op77.45
     * @open77Return version string
     */
    luaVersion(this: void): unknown;
    /**
     * Whether a restart is armed, and how long is left.
     *
     * Requires `runtime.restart`. The read `open77:admin:scheduledRestart` cannot replace: an event announces a CHANGE, and a resource that started after the restart was scheduled never saw one. Ask this once at start, then subscribe. `secondsRemaining` is measured at the moment of the read and is 0 when nothing is armed. Refusals: `permission_denied:runtime.restart`, `restart_control_unavailable`.
     *
     * @permission runtime.restart
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return { scheduled, secondsRemaining, reason? }, or nil | reason
     */
    restartStatus(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Schedules a server restart, with the same warnings an operator's would raise.
     *
     * Requires `runtime.restart` -- its own capability, not `resources.control`: stopping one resource and stopping the whole server are different powers. Takes exactly the path a Warden-scheduled restart takes, so players get the same broadcast now and the same warning ladder (30m, 15m, 10m, 5m, 2m, 60s, 30s, 10s) as the deadline approaches, and every running resource gets `open77:admin:scheduledRestart(secondsRemaining, reason)` on each rung. Calling it again re-arms the schedule rather than adding a second one. `seconds` must be an integer in [1, 604800] and is clamped by the scheduler to at least 5 s; `reason` is broadcast to every player, so it is capped at 200 bytes and must hold no control characters. Refusals: `permission_denied:runtime.restart`, `invalid_delay`, `invalid_reason`, `restart_control_unavailable` (a host with no game loop).
     *
     * @permission runtime.restart
     * @since 2.31.13+op77.67
     * @failure invalid_delay, invalid_operation, invalid_reason, permission_denied:resources.control, permission_denied:runtime.commands, permission_denied:runtime.restart, restart_control_unavailable, runtime_control_unavailable, unknown_metadata_key, unknown_resource
     * @open77Return { scheduled, secondsRemaining, reason? }, or nil | reason
     */
    scheduleRestart(this: void, seconds: number, reason?: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77SoundApi {
    /**
     * Plays a file for every player on the server.
     *
     * `play` with a target of `-1`, which leaves as ONE event rather than one per player. Use the `{ near = ..., radius = ... }` target instead for anything positional: a district's shop jingle broadcast to the whole server is on every player's wire in every bucket.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_sound_action, invalid_sound_payload, invalid_sound_target, network_unavailable, no_audience, permission_denied:network.events, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return the sound id, or false | reason
     */
    broadcast(this: void, file: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Plays an audio file this resource ships, for one player, for everyone, or for everyone in range.
     *
     * The server never touches audio: it names a file and an audience, and the bundled `open77_sound` client resource decodes and mixes it. `target` takes three shapes: a player id; `-1` for everyone; or a table `{ near = playerId | {x,y,z}, radius = n, bucket = n | false, limit = n }`, which is resolved HERE through `Open77.players.nearby` and sent to each player found. `radius` is required in that form -- a `near` without one would silently reach the whole bucket. The bucket rule is the one every proximity read uses: the anchor player's own bucket by default, so two players in different routing buckets never hear each other. The file must be declared in THIS resource's `files` manifest entry and must reach the client, so the resource needs a client script too -- a server-only resource is never downloaded and its audio is unreachable, which the client reports on the local `open77:soundFailed` event. `options` is the client option table (`volume`, `loop`, `pitch`, `position`, `entity`, `maxDistance`, `refDistance`, `offset`) plus an optional `id`, which defaults to the file path. See [sound](sound.md) for the spatial model and for the honest list of what this is not.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, invalid_sound_action, invalid_sound_file, invalid_sound_id, invalid_sound_payload, invalid_sound_target, network_unavailable, no_audience, permission_denied:network.events, player_not_found, position_unknown, sessions_unavailable, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return the sound id, or false | reason: invalid_sound_target, invalid_sound_radius, invalid_sound_file, invalid_sound_id, invalid_options, no_audience, permission_denied:network.events, network_unavailable, sound_payload_too_large
     */
    play(this: void, target: number, file: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Moves one of this resource's spatial sounds to a new world point.
     *
     * Refused client-side with `sound_not_spatial` on a sound started without `position` or `entity`. Sending a position at, say, 5 Hz is how a siren follows a car the server owns; for a body the client can see, start the sound with `entity` instead and let the client track it.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_position, invalid_sound_action, invalid_sound_payload, invalid_sound_target, network_unavailable, no_audience, permission_denied:network.events, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return true, or false | reason
     */
    setPosition(this: void, target: number, id: string, position: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes a live sound's volume on an audience.
     *
     * 0..1, ramped client-side so it does not click. On a spatial sound it multiplies the distance falloff. It is NOT the player's in-game audio slider, which this system cannot read.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_sound_action, invalid_sound_payload, invalid_sound_target, invalid_volume, network_unavailable, no_audience, permission_denied:network.events, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return true, or false | reason: invalid_volume, ...
     */
    setVolume(this: void, target: number, id: string, volume: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops one of this resource's sounds on an audience.
     *
     * Same target shapes as `play`. A client only stops a sound this resource started there: the owner is stamped by the host from the calling resource's name and `open77:sound:` is a reserved client-event prefix, so one resource can never stop another's audio.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_sound_action, invalid_sound_payload, invalid_sound_target, network_unavailable, no_audience, permission_denied:network.events, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return true, or false | reason
     */
    stop(this: void, target: number, id: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops every sound this resource started, for an audience or for everyone.
     *
     * The target defaults to `-1`. It is also sent automatically when this resource stops, so a looping siren cannot outlive the resource that started it.
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, invalid_sound_action, invalid_sound_payload, invalid_sound_target, network_unavailable, no_audience, permission_denied:network.events, player_not_found, position_unknown, sessions_unavailable, sound_audience_too_large, sound_payload_not_serializable, sound_payload_too_large
     * @open77Return true, or false | reason
     */
    stopAll(this: void, target?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77StateApi {
    /**
     * Opts one bag key in to client write requests, behind a validator.
     *
     * Requires `state.write`. The client never writes a bag: it submits through `Open77.state.request` and this validator decides. `validator(source, value)` answers `accepted [, normalisedValue]`, and the value the bag stores is the one the validator returned -- clamp or rewrite here. Anything but true refuses. The selector may be a kind string to cover every bag of that kind, or one bag. The validator is retired when the resource stops.
     *
     * @permission state.write
     * @since 2.31.13+op77.67
     * @failure invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag, validator_required
     * @open77Return true, otherwise false | reason: invalid_state_key, invalid_state_selector, validator_required, permission_denied:state.write
     */
    allowRequest(this: void, selector: string | Open77Table, key: string, validator: Open77Callback): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Drops the stored state.
     *
     * No permission. `save(nil)` under a clearer name: the next VM to start sees nothing and initialises from scratch.
     *
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    clear(this: void): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Withdraws a client-writable bag key.
     *
     * Requires `state.write`. Later client requests for that key are refused with `not_requestable`.
     *
     * @permission state.write
     * @since 2.31.13+op77.67
     * @failure invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag
     * @open77Return true, otherwise false | reason: invalid_state_key, invalid_state_selector
     */
    denyRequest(this: void, selector: string | Open77Table, key: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The replicated state bag of one vehicle, NPC or prop.
     *
     * Requires `state.write` to write, nothing to read. Accepts `(kind, id)` or `{ kind = , id = }`, where kind is `vehicle`, `npc` or `prop`. The audience is the owning registry's own viewer set, so the bag follows the entity through stream-in, stream-out and bucket changes, and it dies with the entity.
     *
     * @permission state.write
     * @since 2.31.13+op77.67
     * @failure invalid_state_selector
     * @open77Return bag handle | reason: invalid_state_selector
     */
    entity(this: void, kind: string | Open77Table, id?: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads back the value the previous VM stored.
     *
     * No permission. Answers `nil` on a fresh start -- which is the signal to initialise rather than resume -- and `nil, reason` when the stored value cannot be decoded.
     *
     * @since 2.31.13+op77.45
     * @failure invalid_json, json_too_large
     * @open77Return value, or nil | reason
     */
    load(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stops a state-bag change subscription.
     *
     * No permission. Takes the id `Open77.state.onChange` returned.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_state_key, invalid_state_op, invalid_state_selector, invalid_subscription, permission_denied:state.write, state_unavailable, unknown_bag
     * @open77Return true, otherwise false | reason: invalid_subscription
     */
    offChange(this: void, subscription: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Watches state-bag changes matching a selector and a key.
     *
     * No permission. The selector is a bag handle, a `{ kind = , id = }` table, a bare kind string for every bag of that kind, or nil for every bag; the key is a key name or nil for every key. The handler runs at a tick boundary as `fn(selector, key, value, previous)` and may Wait. Only subscribed resources are touched, and subscriptions are retired when the resource stops.
     *
     * @since 2.31.13+op77.67
     * @failure handler_required, invalid_state_key, invalid_state_op, invalid_state_selector, permission_denied:state.write, state_unavailable, unknown_bag
     * @open77Return subscription id, or nil | reason: invalid_state_selector, invalid_state_key
     */
    onChange(this: void, selector: string | Open77Table, key: string, handler: Open77Callback): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The replicated state bag of one player.
     *
     * Requires `state.write` to write, nothing to read. Replicated to every player in that player's routing bucket, including the subject; a player in another bucket never receives it. The bag dies with the player's session.
     *
     * @permission state.write
     * @since 2.31.13+op77.67
     * @failure invalid_state_selector
     * @open77Return bag handle | reason: invalid_state_selector
     */
    player(this: void, id: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Stores this resource's state so it survives a reload.
     *
     * No permission. **Not a key-value store**: it holds one value per resource, round-tripped through JSON by the host, so store plain data -- functions, coroutines and metatables do not survive, and cycles are rejected. Passing `nil` clears it. Call it **when the state changes, not on stop**: a reload prepares the successor VM *before* stopping this one, so a write from a stopping resource is refused and returns false. It deliberately does not survive the resource going down: `stop`, `restart` and `refresh` drop it, which keeps an operator's way of saying "come up as you would at boot".
     *
     * @since 2.31.13+op77.45
     * @failure unserialisable_state
     * @open77Return true, or false | reason: unserialisable_state among others
     */
    save(this: void, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
}
interface Open77StatsApi {
    /**
     * A player's combined health and stamina snapshot.
     *
     * Requires `players.stats.read`. `GetPlayerStats` is the same function. The client exposes the same read names and the same nested pool shape, but no setters -- the server owns both pools. See [Player health and stamina](player-stats.md).
     *
     * @permission players.damage.read, players.life.read, players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return stats snapshot, or nil
     */
    get(this: void, playerId: number | string): unknown | undefined;
    /**
     * A player's health pool.
     *
     * Requires `players.stats.read`. Returns `{ value, current, maximum, max, fraction, percentage, regenEnabled, regenPerSecond, regenerating }`, or `nil` for an unknown player. The duplicate spellings are deliberate: they let resources written against either convention read the same table.
     *
     * @permission players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return health pool, or nil
     */
    getHealth(this: void, playerId: number | string): unknown | undefined;
    /**
     * A player's stamina pool.
     *
     * Requires `players.stats.read`. Same shape as the health pool.
     *
     * @permission players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return stamina pool, or nil
     */
    getStamina(this: void, playerId: number | string): unknown | undefined;
    /**
     * Alias of `Open77.stats.getHealth`.
     *
     * Requires `players.stats.read`. The shorter spelling of the same read, matching the client's.
     *
     * @permission players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return health pool, or nil
     */
    health(this: void, playerId: number | string): unknown | undefined;
    /**
     * Fills one pool.
     *
     * Requires `players.stats.apply`. `pool` is `health` or `stamina`. Filling health does not revive a dead player.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_stat_pool
     * @open77Return true, or false | reason
     */
    restore(this: void, playerId: number | string, pool: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Fills the health pool.
     *
     * Requires `players.stats.apply`. `RestorePlayerHealth` is the same function; `restore(playerId, "health")` is the pool-generic spelling.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    restoreHealth(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Fills the stamina pool.
     *
     * Requires `players.stats.apply`. `RestorePlayerStamina` is the same function; `restore(playerId, "stamina")` is the pool-generic spelling.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    restoreStamina(this: void, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one pool's current value, in points.
     *
     * Requires `players.stats.apply`. `pool` is `health` or `stamina`; anything else answers `false, invalid_stat_pool`. Setting health to zero routes through life authority, so it is a real death.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_stat_pool
     * @open77Return true, or false | reason: invalid_stat_pool among others
     */
    set(this: void, playerId: number | string, pool: string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Explicit health setter.
     *
     * Requires `players.stats.apply`. `SetPlayerHealth` is the same function; `set(playerId, "health", value)` is the pool-generic spelling. Zero routes through life authority.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHealth(this: void, playerId: number | string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Explicit health maximum setter.
     *
     * Requires `players.stats.apply`. `SetPlayerMaxHealth` is the same function; `setMax(playerId, "health", maximum)` is the pool-generic spelling.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHealthMax(this: void, playerId: number | string, maximum: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns health regeneration on or off.
     *
     * Requires `players.stats.apply`. `SetPlayerRegenEnabled` is the same function.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHealthRegenEnabled(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the health regeneration rate.
     *
     * Requires `players.stats.apply`. `SetPlayerRegen` is the same function. Zero disables it.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setHealthRegenRate(this: void, playerId: number | string, pointsPerSecond: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one pool's canonical maximum and clamps its current value.
     *
     * Requires `players.stats.apply`. `pool` is `health` or `stamina`. Lowering the maximum below the current value clamps it rather than leaving an impossible reading.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_stat_pool
     * @open77Return true, or false | reason
     */
    setMax(this: void, playerId: number | string, pool: string, maximum: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns one pool's regeneration on or off.
     *
     * Requires `players.stats.apply`. `enabled` must be a boolean; anything else answers `false, invalid_argument`. Distinct from a rate of zero: the configured rate is remembered.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_stat_pool
     * @open77Return true, or false | reason
     */
    setRegenEnabled(this: void, playerId: number | string, pool: string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one pool's regeneration rate, in points per second.
     *
     * Requires `players.stats.apply`. Zero disables regeneration for that pool.
     *
     * @permission players.stats.apply
     * @since 2.31.13+op77.45
     * @failure invalid_stat_pool
     * @open77Return true, or false | reason
     */
    setRegenRate(this: void, playerId: number | string, pool: string, pointsPerSecond: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Explicit stamina setter.
     *
     * Requires `players.stats.apply`. `SetPlayerStamina` is the same function; `set(playerId, "stamina", value)` is the pool-generic spelling.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStamina(this: void, playerId: number | string, value: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Explicit stamina maximum setter.
     *
     * Requires `players.stats.apply`. `SetPlayerMaxStamina` is the same function; `setMax(playerId, "stamina", maximum)` is the pool-generic spelling.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStaminaMax(this: void, playerId: number | string, maximum: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns stamina regeneration on or off.
     *
     * Requires `players.stats.apply`. `SetPlayerStaminaRegenEnabled` is the same function.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStaminaRegenEnabled(this: void, playerId: number | string, enabled: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the stamina regeneration rate.
     *
     * Requires `players.stats.apply`. `SetPlayerStaminaRegen` is the same function. Zero disables it.
     *
     * @permission players.damage.apply, players.stats.apply
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setStaminaRegenRate(this: void, playerId: number | string, pointsPerSecond: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias of `Open77.stats.getStamina`.
     *
     * Requires `players.stats.read`. The shorter spelling of the same read, matching the client's.
     *
     * @permission players.stats.read
     * @since 2.31.13+op77.45
     * @open77Return stamina pool, or nil
     */
    stamina(this: void, playerId: number | string): unknown | undefined;
}
interface Open77StatusesApi {
    /**
     * Applies a configured, bounded status to a target using a registered grade.
     *
     * Requires `players.statuses.apply`. The grade's `kind`, duration and effect come from the definition; canonical eligibility (alive, ready, not protected) is checked the same way an upload's impact is. No upload runs and no damage is dealt: this is the status half of a hack on its own, for a scripted consequence such as a story beat or a penalty.
     *
     * @permission players.statuses.apply
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true, actionId }, or nil | reason on failure
     */
    apply(this: void, playerId: number, targetId: number, definitionId: string, gradeId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Lists the owned statuses currently affecting a player.
     *
     * Requires `players.hacking.read`. Every status any provider applied -- kind, provider, action id, deadline -- the same answer as `Open77.hacking.statuses`.
     *
     * @permission players.hacking.read
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return array of status tables | nil, reason on failure
     */
    list(this: void, playerId: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Removes this provider's status without reversing the damage it did.
     *
     * Requires `players.statuses.purge`. Only a status this resource applied can be removed; the victim's client is told to end its native presentation.
     *
     * @permission players.statuses.purge
     * @since 2.31.13+op77.67
     * @failure action_owned, definition_owned, hacking_unavailable, invalid_action, invalid_definition, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, invalid_target, json_too_large, operation_id_required, permission_denied:players.hacking.activate, permission_denied:players.hacking.cancel, permission_denied:players.hacking.define, permission_denied:players.hacking.policy, permission_denied:players.hacking.read, permission_denied:players.statuses.apply, permission_denied:players.statuses.purge, request_too_large, resource_stopping
     * @open77Return { ok = true }, or nil | reason on failure
     */
    remove(this: void, actionId: string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77TimeApi {
    /**
     * Server-monotonic seconds since the process started.
     *
     * No permission. The same unit and meaning as the client `Open77.time.monotonic`. Use it for durations: it never jumps backwards, unlike wall-clock time.
     *
     * @since 2.31.13+op77.45
     * @open77Return seconds (number)
     */
    monotonic(this: void): number;
    /**
     * Wall-clock seconds since 1970 UTC, fractional.
     *
     * No permission. `GetUnixTime` is the same function. The sandbox has no `os` library, so this is how an expiring ban or a scheduled event gets the real date.
     *
     * @since 2.31.13+op77.45
     * @open77Return seconds (number)
     */
    unix(this: void): number;
    /**
     * The current instant as an ISO 8601 string.
     *
     * No permission. `GetUtcTimestamp` is the same function. The same instant as `unix`, formatted for a log line or a stored record.
     *
     * @since 2.31.13+op77.45
     * @open77Return ISO 8601 string
     */
    utc(this: void): unknown;
}
interface Open77TunablesApi {
    /**
     * A frozen plain table of every current value.
     *
     * No permission. Unlike the `declare` proxy, this does not read through: it is a snapshot to pin onto one match, which is the only correct form for a mode running several rounds at once.
     *
     * @since 2.31.13+op77.45
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return table of key to value
     */
    capture(this: void): Open77Table;
    /**
     * Declares this resource's operator-tunable settings and returns a live proxy.
     *
     * No permission. Declaration fields are `value` (the required default), `type` (`number`, `integer`, `boolean`, `string`, `enum`), `min`, `max`, `step`, `choices`, `unit`, `apply` (`live`, `next_round`, `next_match`), `label`, `description`, `group` and `order`. `min`, `max`, `type` and `choices` are enforced on every write; `step` and `unit` are presentation only. Limits: 128 tunables per resource, 64 KiB of declaration, 32 choices, 256-character strings. **The proxy reads through to the host on every access** -- read it at the point of use, because a value hoisted into a file-scope local is captured at load time and never updates while the admin panel goes on reporting the new number. A malformed declaration raises; an undeclared key read through the proxy raises rather than answering nil.
     *
     * @since 2.31.13+op77.45
     * @failure unknown_tunable
     * @open77Return live proxy table
     */
    declare(this: void, declaration: Open77Table): Open77Table;
    /**
     * The current value of one tunable.
     *
     * No permission. Answers `nil, reason` for an undeclared key. A key declared `next_round` or `next_match` does not reach this until the resource calls `promote()`.
     *
     * @since 2.31.13+op77.45
     * @failure unknown_tunable
     * @open77Return value, or nil | reason
     */
    get(this: void, key: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The changes waiting on a round or match boundary.
     *
     * No permission. Key to value for everything an operator has written that `promote()` has not yet adopted.
     *
     * @since 2.31.13+op77.45
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return table of key to value
     */
    pending(this: void): Open77Table;
    /**
     * Adopts every pending change and returns the keys that moved.
     *
     * No permission. Call it at the boundary the resource declared -- the start of a round or a match -- so a mid-match write cannot change the rules under the players.
     *
     * @since 2.31.13+op77.45
     * @failure animations_unavailable, invalid_json, invalid_options, invalid_player, invalid_query, invalid_request, json_too_large, permission_denied:players.animations.control, permission_denied:players.animations.read, permission_denied:world.props, request_too_large, resource_stopping
     * @open77Return array of promoted keys
     */
    promote(this: void): unknown;
    /**
     * Writes one tunable, with the same validation as the admin panel.
     *
     * No permission. Returns `ok, message, pending`; `pending` is true when the key's `apply` policy holds the value at a boundary. Values are owned by the host, so they survive a reload **and** a stop and come back after a restart from `tunables.json`. The owning resource -- and no other -- receives `onTunableChanged(key, value, pending)` after every accepted write.
     *
     * @since 2.31.13+op77.45
     * @open77Return ok (boolean) | message | pending (boolean)
     */
    set(this: void, key: string, value: number | string): LuaMultiReturn<[unknown, string | undefined]>;
}
interface Open77VehiclesAiApi {
    /**
     * Attaches a server-owned vehicle AI controller.
     *
     * options.npcId optionally mounts an existing NPC owned by this resource; omission means driverless operation. Reserves the driver seat. Requires world.vehicles. Refuses occupied driver seats, destroyed vehicles, unsupported AV/Basilisk records and conflicting controllers. The NPC must be alive, in the same bucket and without active tasks. No NPC is created automatically. options.admissionPlayerId optionally books one of that player's simulator slots before any client simulates the car (see capacity); it is refused with ai_simulator_limit when that player's booked count already equals perSimulatorLimit, and it does not force ownership: election still chooses the simulator and moves the booking to it. A driver whose canonical health reaches zero ends the task as failed with reason driver_dead and detaches the controller with the same reason, releasing the driver seat without removing the body; a driver that was removed or left the car's bucket gives driver_unavailable instead.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    attachDriver(this: void, vehicleId: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Pursues a canonical entity using native autonomous pathing.
     *
     * Same targetKind, targetId, speed, distance, behavior and timeout options as follow. Requires world.vehicles and controller ownership. It does not enable weapon use, teleport catch-up, scripted ramming or police pursuit logic. Targets and simulator must remain in the same routing bucket.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    chase(this: void, vehicleId: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Starts native autonomous driving to a world position.
     *
     * Requires world.vehicles and this resource's attached controller. options.position={x,y,z} is required. Optional speed (0.5..55 m/s), arrivalRadius (1..20 m), timeoutMilliseconds (1000..3600000) and behavior. Returns a task state, or nil, reason. The native driver plans on the traffic lane graph: the simulating client snaps the point to the nearest lane contact within 21 m and to the road surface before sending the command, and a task that has not moved 3 m after 20 s fails with reason no_route. Acceptance is not arrival: subscribe to arrived, blocked or failed.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    driveTo(this: void, vehicleId: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Continuously follows a canonical player, vehicle or NPC.
     *
     * Requires world.vehicles and controller ownership. options.targetKind is player, vehicle or npc and targetId is the canonical ID. Optional distance (3..80 m), speed, behavior and timeoutMilliseconds. Uses the native autonomous path follower with server-updated target coordinates, at most twice per second. Stops with target_unavailable if the target leaves the bucket or disappears.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    follow(this: void, vehicleId: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Drives an ordered route of world points.
     *
     * Requires world.vehicles and controller ownership. options.points is an array of 1..64 {x,y,z} positions. Supports loop, speed, behavior, arrivalRadius and timeoutMilliseconds. Emits waypointReached at each point and arrived once at a non-looping route's end. This is a destination sequence, not an exact authored racing spline. As with driveTo, the simulating client snaps each point to the nearest traffic lane contact within 21 m and to the road surface before sending it, and a task that has not moved 3 m after 20 s fails with reason no_route.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    followRoute(this: void, vehicleId: number, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Enrolls a controlled vehicle in REDengine's own traffic simulation: it joins the nearest traffic lane and follows traffic indefinitely.
     *
     * Requires world.vehicles and controller ownership. Dispatches AIVehicleJoinTrafficCommand, the engine's own traffic enrollment (the command the Delamain cab receives when released to free roam): the engine chooses the lane, the path and the speed, so this task takes no speed, no behavior and no waypoints, and a request naming speed or behavior is refused with traffic_speed_unsupported or traffic_behavior_unsupported instead of accepting a value nothing can apply. Only timeoutMilliseconds (1000..3600000, default 300000) and pattern (default or stop; see setTrafficPattern) apply, and one task is submitted per vehicle: the engine crosses its own path boundaries without a new task, so a car can hold still in traffic legitimately. A traffic task is therefore never failed with no_route: it may stand still in a queue, at a light, behind a wreck or under the stop pattern for as long as the traffic does. It does not spawn ambient traffic or use the solo Delamain taxi system. No arrival event is expected; stop explicitly or handle failure/timeout. A timed native panic reaction on this task is the separate panic call.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    joinTraffic(this: void, vehicleId: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Subscribes to this resource's vehicle AI lifecycle events.
     *
     * Requires a function callback. Events: waypointReached, arrived, cancelled, failed, blocked, resumed and panic. panic fires for every outcome of a panic request after the call itself (active, ended, blocked, refused, cancelled -- including cancelled/replaced for the request a newer one supersedes); correlate it by state.panicRequest. The handler receives a decoded state table, not JSON text. Events are routed only to the controller's resource. blocked with reason=no_progress is a stall detector, not proof of an obstacle collision. No events are replayed; query state first.
     *
     * @since 2.31.13+op77.57
     * @failure invalid_json, json_too_large
     * @open77Return Event handler registration
     */
    on(this: void, event: string, handler: Open77Callback): unknown;
    /**
     * Stops AI control and releases its driver seat.
     *
     * Requires world.vehicles and ownership of this AI controller. Cancels an active task and unmounts (but does not delete) the optional NPC, restoring its previous AI mode. Returns the detached state, or nil, reason.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    removeDriver(this: void, vehicleId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Selects normal, cautious or aggressive AI behavior.
     *
     * Requires world.vehicles and controller ownership. normal keeps native avoidance; cautious uses a 75% speed ceiling; aggressive enables native clearTrafficOnPath. These are bounded presets, not a promise of police AI or traffic-law compliance.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    setBehavior(this: void, vehicleId: number, behavior: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Updates the native driving speed limit.
     *
     * Requires world.vehicles and controller ownership. speed is finite, 0.5..55 m/s; default 12. Changes the active command without restarting it each frame. Actual speed remains subject to road geometry, obstacles and the vehicle. Cautious behavior applies 75% of the configured ceiling.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    setSpeed(this: void, vehicleId: number, speed: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads authoritative vehicle AI state.
     *
     * Requires world.vehicles. Returns the controller state or nil when no driver is attached. Contains vehicleId, npcId, taskId, patternRequest, panicRequest and panicThreatId (strings), revision, mode, status, reason, execution, phase, speed, behavior, destination x/y/z, routeIndex/count, targetKind/id, distance, owner, epoch, pattern, patternStatus, patternReason, panicStatus (inactive until the first panic request), panicReason, panicThreatKind, panicThreatX/Y/Z, panicDurationMs and panicRemainingMs. execution is the current lease holder's own report for a running task (enrolling, executing, or recovering while the join is released for a collision or panic). phase is the server's operational summary: enrolling (no simulator, no executing command or no fresh accepted motion), moving, healthy_waiting (executing with fresh accepted motion at 0.5 m/s or less), recovering, or failed_retiring (a failed, cancelled -- stop() included -- or detached task); neither is evidence of lane-legal driving. A waiting_for_simulator status carries reason simulator_capacity when a nearby client was skipped at its capacity limit, otherwise simulator_unavailable. Six consecutive unsuccessful simulator grants produce terminal failed with reason simulator_recovery_failed: explicit refusals and silent lease expiry without accepted motion both count, and accepted motion from the current owner and epoch resets the streak. This server grant streak is separate from local native collision-recovery attempts. Motion is still subject to the ordinary vehicle authority lease.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    state(this: void, vehicleId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Cancels the active task and stops the vehicle.
     *
     * Requires world.vehicles and controller ownership. Idempotent. Keeps the AI controller and driver seat reserved for the next task. Emits cancelled once for an active task. Use removeDriver to release the seat.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.57
     * @open77Return state, or nil, reason
     */
    stop(this: void, vehicleId: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77VehiclesApi {
/**
 * Door indexes for the door natives.
 *
 * A public constant table: `frontLeft = 0`, `frontRight = 1`, `backLeft = 2`, `backRight = 3`, `trunk = 4`, `hood = 5`.
 *
 * @since 2.31.13+op77.45
 * @open77Return table { frontLeft = 0, frontRight = 1, backLeft = 2, backRight = 3, trunk = 4, hood = 5 }
 * Read-only constant table. Not a function.
 */
    readonly doors: unknown;
/**
 * Bit values of a vehicle's `flags` field.
 *
 * A public constant table for the `flags` integer a vehicle snapshot carries: `engineOn = 1`, `locked = 2`, `destroyed = 4`, `exploded = 8`, `invulnerable = 16`, `immortal = 32`, `lightsOn = 64`, `highBeams = 128`, `sirenOn = 256`, `paintApplied = 512` (set by the runtime once a paint job has been applied; not a `create` option). Test a bit with `flags & Open77.vehicles.flags.locked ~= 0`; `create` accepts the other nine names as booleans in its definition.
 *
 * @since 2.31.13+op77.45
 * @open77Return table { engineOn = 1, locked = 2, destroyed = 4, exploded = 8, invulnerable = 16, immortal = 32, lightsOn = 64, highBeams = 128, sirenOn = 256, paintApplied = 512 }
 * Read-only constant table. Not a function.
 */
    readonly flags: unknown;
/**
 * Bit values of a seat assignment's `flags` field.
 *
 * A public constant table for the `flags` integer of a seat assignment (`getPlayerSeat`, occupants): `entering = 1`, `exiting = 2`, `forcedEntry = 4`, `exitLocked = 8`, `forcedExit = 16`. The same assignment table also carries each of them as a boolean field, which is the easier read.
 *
 * @since 2.31.13+op77.45
 * @open77Return table { entering = 1, exiting = 2, forcedEntry = 4, exitLocked = 8, forcedExit = 16 }
 * Read-only constant table. Not a function.
 */
    readonly occupantFlags: unknown;
/**
 * The four seat numbers; every seat native also takes the canonical names and their aliases.
 *
 * A public constant table, not a function: `driver = -1`, `frontPassenger = 0`, `rearLeft = 1`, `rearRight = 2` -- the FiveM numbering. The **canonical** seat names, the only spelling the runtime ever reports (`getPlayerSeat(...).seat`, `occupants[]`, `freeSeats`, `occupantInSeat`, `onPlayerEnteredVehicle`), are `seat_front_left`, `seat_front_right`, `seat_back_left` and `seat_back_right`. Wherever a seat is *accepted* (`warpPlayerIntoVehicle`, `taskPlayerEnter`, `occupantInSeat`, `seatFree`, `seatName`) the server takes any of: these numbers; the canonical names; or the aliases `driver`/`frontLeft`/`front_left`, `frontPassenger`/`frontRight`/`front_right`, `rearLeft`/`backLeft`/`back_left`, `rearRight`/`backRight`/`back_right`, matched case-insensitively. `passenger`, `rear_left` and index 3 are `invalid_seat`. `Open77.vehicles.seatName(seat)` normalises any accepted form to the canonical one. The client host accepts the same aliases case-sensitively and without the snake_case forms.
 *
 * @since 2.31.13+op77.45
 * @open77Return table { driver = -1, frontPassenger = 0, rearLeft = 1, rearRight = 2 }
 * Read-only constant table. Not a function.
 */
    readonly seats: unknown;
/**
 * Window indexes for the glass natives.
 *
 * A public constant table: `frontLeft = 0`, `frontRight = 1`, `backLeft = 2`, `backRight = 3`.
 *
 * @since 2.31.13+op77.45
 * @open77Return table { frontLeft = 0, frontRight = 1, backLeft = 2, backRight = 3 }
 * Read-only constant table. Not a function.
 */
    readonly windows: unknown;
    /**
     * Turns a client's description of a vanilla car into a canonical vehicle.
     *
     * Requires `world.vehicles` **and** `world.vehicles.adopt`, which is its own string because this is the one vehicle call that creates world state from something a client wrote. `playerId` must be the player the server believes sent the description — inside a net event handler that is `source`, and it must never be read out of the payload, because the placement checks are the entire defence. The description is what the client's `Open77.vehicles.adoptable()` hands back: `engineEntity`, `record`, `position`, and optionally `orientation`, `health`, `flags`, `primaryColor`, `secondaryColor`, `doors`, `windows`, `tires`, `brokenGlass`, `brokenLights` and `detachedParts`.
     *
     * **Adoption takes the car's identity, not the engine's entity.** A traffic car is spawned, owned and despawned by REDengine population on one client, and the plugin has no notification it can rely on for a despawn it did not start — a canonical vehicle bound to such an entity would quietly become a ghost. So nothing is bound: the server creates an ordinary canonical vehicle from the description, with the same lifetime, the same reaper and the same projection path as one a garage spawned, and the client then hands its vanilla chassis back with `Open77.vehicles.releaseAdopted`.
     *
     * Refusals are `adopt_policy_closed` (the player's bucket is not open), `too_far`, `player_unavailable` (no position for them), `duplicate_adoption` (a car of the same record is already adopted within three metres of that spot, because traffic is spawned per client and two players on one corner each describe their own), `vehicle_limit`, and the `invalid_*` family. `already_adopted` is not a failure: it answers with the id of the vehicle the first proposal created, because a retry after a dropped acknowledgement is the ordinary way a client proposes the same chassis twice.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return vehicle id, or nil | reason
     */
    adopt(this: void, playerId: number, description: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Lists authoritative server vehicles.
     *
     * Returns snapshots ordered by Open77 ID. An optional routing bucket filters the result; omitting it returns every vehicle visible to the resource.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return array of vehicle tables
     */
    all(this: void, bucket?: number): Open77Table;
    /**
     * Alias for `setProperties`.
     *
     * Identical contract. Useful to a codebase that reserves `set` for single-field writes.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    applyProperties(this: void, id: unknown, props: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a vehicle's headlights are lit at all.
     *
     * Requires `world.vehicles`. True for both `"on"` and `"high"`; `getLights` tells them apart.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: vehicle_not_found
     */
    areLightsOn(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Breaks a range of vehicle glass elements.
     *
     * Requires `world.vehicles`. Breaks the first `count` destructible-glass bits. The optional count defaults to all 32 and must be in 0..32.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    breakAllGlass(this: void, id: number, count?: number): boolean;
    /**
     * Breaks one vehicle glass element.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setGlassBroken(id, glass, true)`; the canonical bit is replicated and retained for late joiners.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    breakGlass(this: void, id: number, glass: number | string): boolean;
    /**
     * Breaks one vehicle light.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setLightBroken(id, index, true)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    breakLight(this: void, id: number, index: number): boolean;
    /**
     * Breaks one vehicle tire.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setTireBroken(id, index, true)`. Tire indexes are 0..3.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    breakTire(this: void, id: number, index: number): boolean;
    /**
     * Hands the lights back the record's own colour.
     *
     * Requires `world.vehicles`. Exactly `setLightsHue(id, nil)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    clearLightsHue(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Drops one player's lock exception.
     *
     * Requires `world.vehicles`. Identical to `Open77.vehicles.setLockedForPlayer(id, playerId, nil)`: the player goes back to whatever the canonical bit says, and is re-sent that answer immediately.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_player_id, vehicle_not_found
     */
    clearLockedForPlayer(this: void, id: unknown, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Hands a vehicle back its record's rated performance.
     *
     * Requires `world.vehicles`. Identical to `Open77.vehicles.setPerformance(id, nil)`. The withdrawal is replicated like the ceiling was, so every projection stops clamping rather than keeping the last value until it streams out.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: vehicle_not_found
     */
    clearPerformance(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Closes a door, trunk, or hood.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setDoorOpen(id, door, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    closeDoor(this: void, id: number, door: number): boolean;
    /**
     * The nearest registered vehicle to a point or a player.
     *
     * Requires `world.vehicles`. `Open77.vehicles.nearby` with a limit of one, and the same options. Nobody in range is a plain `nil` with NO reason, which is how a caller tells 'the search worked and the street is empty' from 'the search failed'. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return entry, or nil | reason (only on failure)
     */
    closest(this: void, anchor: Vector3, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Closes one side window.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setWindowOpen(id, window, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    closeWindow(this: void, id: number, window: number): boolean;
    /**
     * Creates a server-authoritative network vehicle.
     *
     * Requires `world.vehicles`. The definition selects the record, transform, routing bucket, appearance, optional authoritative paint, flags, health, and initial damage. The server allocates the Open77 ID and replicates the canonical vehicle to interested clients. The creator name is retained as provenance and cleanup scope, never as an exclusive mutation lock. The definition also takes the three lifetime keys `ttlMs`, `persistent` and `despawnWhenUnobserved`, so a garage does not need a second call; a definition without them behaves exactly as it did before, and a lifetime that cannot be applied undoes the creation rather than half-honouring it -- the same rule the initial-damage path already follows.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure initial_damage_failed, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return vehicle ID, or `nil, reason`
     */
    create(this: void, definition: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Adds damage to one body cell.
     *
     * Requires `world.vehicles`. Adds the amount to the current normalized cell and clamps the result to 0..1.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    damageBodyCell(this: void, id: number, cell: number, amount: number): boolean;
    /**
     * Adds damage across a body zone.
     *
     * Requires `world.vehicles`. Adds the amount to each selected body cell and clamps every result to 0..1.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    damageBodyZone(this: void, id: number, zone: string | Open77Table, amount: number): boolean;
    /**
     * Maps stable detached-part names to network bit indexes.
     *
     * Read-only constants for trunk, hood variants, door variants and front/back bumpers. Indexes are append-only protocol values in the range 0..15.
     *
     * @since 2.31.13+op77.45
     * @open77Return constant table
     */
    detachedParts(this: void): Open77Table;
    /**
     * Detaches one vehicle panel authoritatively.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setPartDetached(id, part, true)`. The state is replicated and retained for late join.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    detachPart(this: void, id: number, part: number | string): boolean;
    /**
     * Detonates a vehicle through every viewer's own engine.
     *
     * Requires `world.vehicles`. Writes the canonical ledger -- health to zero, `destroyed` and `exploded` raised, one revision -- and every client that has the vehicle streamed then reconciles its projection through the damage path that already replays a wreck to a late joiner, which ends in REDengine's own explosion on that machine. **Occupants stay occupants**: nobody is ejected, no seat is freed, no life state changes, and the server sends no damage to any player, inside the car or standing next to it. What the blast does to a body is the engine's own damage model running on each client, reaching the server the ordinary way through the player damage report -- a resource that wants the occupants dead has to say so itself. **Terminal and not repeatable**: a second call is refused with `already_exploded` rather than re-detonating a wreck, while a vehicle that is merely `destroyed` -- written off by collisions, never blown up -- is still a legitimate target. An owner report taken before the explosion and claiming a pristine car cannot undo it: health merges by minimum and the destruction bits by OR, both monotone. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: already_exploded, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    explode(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Forces a player out of a network vehicle.
     *
     * Requires `world.vehicles`. Publishes a durable forced-exit order and keeps the canonical seat reserved until the client confirms native unmount or the bounded transition timeout expires. This operation overrides an active exit lock. Supplying `vehicleId` protects against ejecting the player from a newer assignment by mistake.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    forcePlayerOutOfVehicle(this: void, playerId: number, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Every free seat of a vehicle, in seat order.
     *
     * Requires `world.vehicles`. Canonical `seat_*` names in `driver, frontPassenger, rearLeft, rearRight` order, so picking `[1]` gives a deterministic 'put them anywhere' seat. Every seat of the four-seat model is considered; a two-seat record still reports its rear seats free, because the registry does not know the model's seat count.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return array of seat names, or nil | reason: vehicle_not_found
     */
    freeSeats(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Returns one authoritative server vehicle snapshot.
     *
     * Reads canonical identity, transform, motion, flags, colors, all damage channels including detached parts, openings, occupants, lifetime, any performance ceiling, and authority state. Returns `nil` for an unknown ID. The transform half is `position` (a vector3), `heading` and `yaw` (one value, both names), `orientation` as `{ x, y, z, w }`, and the unchanged `x`/`y`/`z`. The motion half is `velocity`, `angularVelocity`, `speed` (m/s), `speedKph`, `onGround`, `reversing`, `moving` and `driverPlayerId` -- all of it the last thing the physics owner reported, and all of it zeroed when the vehicle has no owner, because nobody is simulating it then. `exploded` and `destroyed` are derived booleans over the same flags; `persistent`, `despawnWhenUnobserved` and `ttlMs` report the lifetime policy, `ttlMs` counted from now and absent when there is no deadline.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return vehicle table, or `nil`
     */
    get(this: void, id: number): Open77Table | undefined;
    /**
     * One routing bucket's adoption policy.
     *
     * Requires `world.vehicles`. Deliberately **not** gated by `world.vehicles.adopt`: a resource may see that a bucket is closed without being allowed to open it. Answers `"none"`, `"driver"` or `"any"`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return policy name
     */
    getAdoptPolicy(this: void, bucket?: number): unknown;
    /**
     * The entity appearance variant this car wears.
     *
     * Requires `world.vehicles`. Answers the variant name, or `""` for the record's own default. The appearance variant is Cyberpunk's equivalent of a livery: a name defined by the vehicle's entity template, which is how the game ships one model in several trims.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return string, or nil | reason: vehicle_not_found, permission_denied:world.vehicles
     */
    getAppearance(this: void, id: unknown): LuaMultiReturn<[string | undefined, string | undefined]>;
    /**
     * Returns the canonical damage snapshot.
     *
     * Reads the server-owned body grid plus broken glass, light, tire, and detached-part masks. It returns `nil` when the vehicle ID is unknown.
     *
     * @since 2.31.13+op77.45
     * @open77Return damage table, or `nil`
     */
    getDamage(this: void, id: number): Open77Table | undefined;
    /**
     * Returns a resource-local vehicle damage profile.
     *
     * Reads the profile registered by the current server resource for the specified vehicle record. Profiles are not shared implicitly between resources.
     *
     * @since 2.31.13+op77.45
     * @open77Return profile table, or `nil`
     */
    getDamageProfile(this: void, record: string): Open77Table | undefined;
    /**
     * The player driving this vehicle, or nil when nobody is.
     *
     * Requires `world.vehicles`. The front-left occupant from the canonical seat ledger. Absent rather than zero when the seat is empty, and absent while an entry animation is still running, because a reserved seat is not yet a driver. Also on the read as `Open77.vehicles.get(id).driverPlayerId`, which is the field the occupants list is scanned for nine times out of ten.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return player id, or nil | reason: vehicle_not_found
     */
    getDriver(this: void, id: unknown): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Vehicle health under its FiveM name.
     *
     * Requires `world.vehicles`. `Open77.vehicles.getHealth`; there is no separate engine pool on this build.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return number, or nil | reason
     */
    getEngineHealth(this: void, id: unknown): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * The vehicle's heading in degrees.
     *
     * Requires `world.vehicles`. Extracted from the full orientation quaternion rather than from `qz`/`qw` alone, because a replicated vehicle carries roll and pitch too and a car on a slope would otherwise report a heading it is not facing. Identical to the client snapshot's `heading`, and in the same degrees as `Open77.players.get(...).heading` and the `yaw` that `create` and `setTransform` take. `Open77.vehicles.getYaw` is the same function under the other name.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return heading in degrees, or nil | reason: vehicle_not_found
     */
    getHeading(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias for `getLightsHue`.
     *
     * Identical contract, under the name a creator looking for headlights will try first.
     *
     * @since 2.31.13+op77.67
     * @open77Return number 0..1 or nil, or nil | reason
     */
    getHeadlightHue(this: void, id: unknown): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * A vehicle's health, 0 to 1.
     *
     * Requires `world.vehicles`. Canonical, and merged by MIN from the physics owner's report: an observer cannot heal a car by claiming it is fine.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return number, or nil | reason: vehicle_not_found
     */
    getHealth(this: void, id: unknown): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * A vehicle's headlight mode as a word.
     *
     * Requires `world.vehicles`. Answers `"off"`, `"on"` or `"high"` -- the same three words `setLights` accepts, so a read feeds straight back into a write.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return string, or nil | reason: vehicle_not_found
     */
    getLights(this: void, id: unknown): LuaMultiReturn<[string | undefined, string | undefined]>;
    /**
     * The CrystalCoat headlight hue in force, or nil.
     *
     * Requires `world.vehicles`. Answers a number in `0..1`, or `nil` when the car uses its record's own light colour. `nil` rather than zero, because zero is a real hue -- red -- and the engine struct this mirrors carries its own `lightsColorDefined` boolean for exactly that reason. `getHeadlightHue` is the same function.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return number 0..1 or nil, or nil | reason: vehicle_not_found, permission_denied:world.vehicles
     */
    getLightsHue(this: void, id: unknown): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Reads authoritative vehicle paint.
     *
     * Returns `applied` plus keyed primary and secondary RGB tables. Pure black remains distinguishable from reset because `applied` is a separate canonical flag. Returns `nil` for an unknown vehicle ID.
     *
     * @since 2.31.13+op77.45
     * @open77Return paint table, or `nil`
     */
    getPaint(this: void, id: number): Open77Table | undefined;
    /**
     * The performance ceiling in force, or nil.
     *
     * Requires `world.vehicles`. `{ topSpeedKph, accelerationScale, taperKph }`, or `nil` when the vehicle runs at its record's rated performance. Also on the read as `Open77.vehicles.get(id).performance`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return profile table, or nil | reason: vehicle_not_found
     */
    getPerformance(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads one player's canonical vehicle-seat assignment.
     *
     * Requires `world.vehicles`. Returns the server ledger entry for the player: a table `{ playerId, vehicleId (integer), seat (the canonical name only: `seat_front_left`, `seat_front_right`, `seat_back_left` or `seat_back_right` -- never `driver`, which is an *accepted* alias, not a reported one), flags (integer, bits of `Open77.vehicles.occupantFlags`), entering, exiting, forcedEntry, exitLocked, forcedExit (booleans) }`. A single `nil`, with no reason, when the player is not seated, is unknown, or the permission is missing. The same table shape describes each entry of a vehicle snapshot's `occupants` list and the second value of `occupantInSeat`. `vehicleId` is a plain integer; a vehicle id delivered by a host event (`onPlayerLeftVehicle`) is the same number as a string, so `tostring(seat.vehicleId)` compares equal to it.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return seat assignment table { playerId, vehicleId, seat, flags, entering, exiting, forcedEntry, exitLocked, forcedExit }, or a single nil
     */
    getPlayerSeat(this: void, playerId: number | string): Open77Table | undefined;
    /**
     * The vehicle's canonical position as a vector3.
     *
     * Requires `world.vehicles`. A plain `{ x, y, z }` table, which is what an Open77 vector3 is, so `#(a - b)` works on it without a conversion. The same point `Open77.vehicles.get(id).position` carries, and the same one `x`/`y`/`z` have always carried. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return position table, or nil | reason: vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    getPosition(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Everything a garage has to store to put this exact car back.
     *
     * Requires `world.vehicles`. Answers one plain table -- strings, numbers, booleans and tables, so it survives `json.encode` and a database column unchanged -- or `nil, "vehicle_not_found"`. This is the Cyberpunk counterpart of the `GetVehicleProperties` helper every FiveM framework ships, and `setProperties` is its other half: **`setProperties(id, getProperties(id))` leaves the vehicle observably unchanged**, and the same table applied to a fresh vehicle of the same record reproduces it.
     *
     * The shape is `{ version = 1, record, appearance, paint = { applied, primary = {r,g,b}, secondary = {r,g,b}, lightsHue? }, health, engineOn, lights = "off"|"on"|"high", siren, locked, drivable, invulnerable, immortal, doors, windows, damage = { body = {30 cells}, glass, lights, tires, detachedParts, destroyed, exploded }, performance? }`.
     *
     * **Deliberately not where the car was standing.** Position, heading, velocity, occupants, routing bucket and revision are not properties of the car, and a table that carried them would tempt a caller into teleporting by accident; `setTransform` and `setBucket` still own those.
     *
     * **What Cyberpunk does not have is the real story here.** Vehicle visual customisation on build 2.31 is one struct, `GenericTemplatePersistentData` -- primary RGB, secondary RGB and a lights hue -- plus the entity appearance variant. There are no mod slots, no wheel types, no neon, no window tint and no numbered extras: not unimplemented, absent, with no RTTI type for any of them. `Open77.vehicles.unsupportedProperties` names every FiveM property that therefore has no counterpart, and `setProperties` refuses such a key by name rather than dropping it. Stable 147 includes engineHold in the property table; setProperties applies it through the canonical engine-hold setter.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return table, or nil | reason: vehicle_not_found, permission_denied:world.vehicles
     */
    getProperties(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Scalar speed in metres per second.
     *
     * Requires `world.vehicles`. The physics owner's own drivetrain reading, in the unit every other Open77 read uses. **Motion is the last thing the owner reported**: a vehicle with no physics owner is not being simulated by anyone, so losing the lease -- a driver stepping out, disconnecting, or the lease expiring -- zeroes this rather than leaving a parked car claiming the speed it had when its driver got out. A server `setTransform` clears it for the same reason.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return speed in m/s, or nil | reason: vehicle_not_found
     */
    getSpeed(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Scalar speed in kilometres per hour.
     *
     * Requires `world.vehicles`. The same reading as `Open77.vehicles.getSpeed` converted once, because speed limits and performance ceilings are authored in km/h and every caller converting it themselves is a rounding bug waiting to happen.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return speed in km/h, or nil | reason: vehicle_not_found
     */
    getSpeedKph(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The FiveM-shaped name for `getProperties`.
     *
     * Identical contract. The name exists so a resource ported from a FiveM framework, where the helper is spelled `GetVehicleProperties`, does not have to be renamed to be read.
     *
     * @since 2.31.13+op77.67
     * @open77Return table, or nil | reason
     */
    getVehicleProperties(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The vehicle's linear velocity as a vector3, in metres per second.
     *
     * Requires `world.vehicles`. A plain `{ x, y, z }` table. Like `getSpeed`, it is the last accepted owner report and is zeroed when the physics lease is lost or the server teleports the vehicle. `Open77.vehicles.get(id).angularVelocity` carries the rotational half.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return velocity table, or nil | reason: vehicle_not_found
     */
    getVelocity(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Alias of `Open77.vehicles.getHeading`.
     *
     * Requires `world.vehicles`. `heading` is the name the player read and `respawn` use; `yaw` is the name `create` and `setTransform` use. One value, both names, so nobody has to remember which surface they are on.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return heading in degrees, or nil | reason: vehicle_not_found
     */
    getYaw(this: void, id: unknown): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of `Open77.vehicles.triggerHorn`.
     *
     * Requires `world.vehicles` and uses the same current-owner routing, duration bounds, and transient synchronization contract as `triggerHorn`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_duration, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    honk(this: void, id: number, durationMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one canonical door opening state.
     *
     * Server-side authoritative query covering four doors, trunk, and hood. Returns `nil` for an unknown vehicle ID.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean, or `nil`
     */
    isDoorOpen(this: void, id: number, door: number): boolean | undefined;
    /**
     * Whether a vehicle is in service.
     *
     * Requires `world.vehicles`. False once `setDrivable(id, false)` has been applied. Independent of health: a wreck with a live engine is still 'drivable' by this flag.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: vehicle_not_found
     */
    isDrivable(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Read the canonical engine-hold flag.
     *
     * Returns the server-owned hold, default false, rather than native ignition readiness. Requires world.vehicles and Stable 147 or later. An unknown vehicle returns nil, vehicle_not_found.
     *
     * @permission world.vehicles
     * @since 2.31.21+op77.147
     * @open77Return boolean, or nil | reason on failure
     */
    isEngineHeld(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a vehicle's engine is running.
     *
     * Requires `world.vehicles`. Reads the canonical `engineOn` flag, which is what every client applies -- not a local guess. A read answers `nil` plus a reason where a write answers `false`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: vehicle_not_found
     */
    isEngineOn(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Whether a vehicle is pinned by the server.
     *
     * Requires `world.vehicles`. True once `setFrozen(id, true)` has been applied; the same bit as `get(id).flags & Open77.vehicles.flags.frozen`, and the `frozen` field of the client snapshot. Independent of `isDrivable`: the two bits compose.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.73
     * @open77Return boolean, or nil | reason: vehicle_not_found
     */
    isFrozen(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads a vehicle's canonical entry-lock state.
     *
     * Returns the derived durable lock boolean without requiring callers to decode the complete flags mask. Unknown vehicles return `nil`.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean, or `nil`
     */
    isLocked(this: void, id: number): boolean | undefined;
    /**
     * Is this vehicle locked as far as this one player is concerned?
     *
     * Requires `world.vehicles`. The player's exception if they hold one, otherwise the canonical bit -- the single function that decides what a client is told, so a caller can never disagree with the fan-out. `Open77.vehicles.isLocked` still answers the canonical question, which is what a late joiner with no exception will be told.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: invalid_player_id, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    isLockedForPlayer(this: void, id: unknown, playerId: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one canonical detached-part bit.
     *
     * Returns whether a named/indexed panel is detached, or `nil` when the vehicle ID is unknown.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean, or `nil`
     */
    isPartDetached(this: void, id: number, part: number | string): boolean | undefined;
    /**
     * Reports whether a player's canonical seat has exit lock enabled.
     *
     * Returns true only when the player currently has a seat assignment carrying the durable `exitLocked` policy. An unseated or unknown player returns false.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean
     */
    isPlayerExitLocked(this: void, playerId: number): boolean;
    /**
     * Whether a vehicle's siren is on.
     *
     * Requires `world.vehicles`. Canonical: no client can report this bit, so the server's value is the only value.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return boolean, or nil | reason: vehicle_not_found
     */
    isSirenOn(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Reads one canonical side-window opening state.
     *
     * Server-side authoritative query for indexes 0..3. It does not report broken glass and returns `nil` for an unknown vehicle.
     *
     * @since 2.31.13+op77.45
     * @open77Return boolean, or `nil`
     */
    isWindowOpen(this: void, id: number, window: number): boolean | undefined;
    /**
     * Locks a vehicle against ordinary entry.
     *
     * Convenience alias for `setLocked(id, true)`. Requires `world.vehicles` and updates durable canonical state.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, permission_denied:world.vehicles, vehicle_not_found, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    lock(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Locks a vehicle for everyone, revoking every exception.
     *
     * Requires `world.vehicles`. `Open77.vehicles.setLockedForAll(id, true)` under a name that reads as an action.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: vehicle_not_found
     */
    lockForAll(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Every registered vehicle within a radius of a point or a player, nearest first.
     *
     * Requires `world.vehicles`. Deliberately the same anchor, bucket and limit conventions as `Open77.players.nearby`: the anchor is a position table (a vector3 is one) or a player id, a player anchor defaults to that player's own routing bucket, `bucket = false` opts back out to every bucket, and ties are broken by vehicle id so the order does not reshuffle between calls. `occupied = true` keeps only cars with someone in them and `occupied = false` only empty ones. Each entry is `{ id, record, resource, bucket, distance, occupants, locked, position }` -- the placement, not the whole snapshot; call `Open77.vehicles.get` on the one you picked. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return array of entries, or nil | reason: invalid_argument, invalid_position, invalid_radius, invalid_bucket, invalid_limit, invalid_options, player_not_found, position_unknown
     */
    nearby(this: void, anchor: Vector3, radius?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Who is in one seat of a vehicle.
     *
     * Requires `world.vehicles`. The `GetPedInVehicleSeat` of FiveM. Three answers, told apart by the second value: `playerId, record` when someone holds the seat (the record is the seat-assignment table `getPlayerSeat` returns: `playerId`, `vehicleId`, `seat`, `flags`, `entering`, `exiting`, `forcedEntry`, `exitLocked`, `forcedExit`); a single `nil` when the seat is free; `nil, reason` (a string: `invalid_seat`, `vehicle_not_found`) when the call itself failed. So `local who, extra = ...; if who then ... elseif type(extra) == "string" then error ... else free`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return playerId (integer) and the occupant's seat-assignment table; a single nil for a free seat | reason (string) only when the call failed: invalid_seat, vehicle_not_found
     */
    occupantInSeat(this: void, id: unknown, seat: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Opens a door, trunk, or hood.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setDoorOpen(id, door, true)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    openDoor(this: void, id: number, door: number): boolean;
    /**
     * Opens one side window.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setWindowOpen(id, window, true)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    openWindow(this: void, id: number, window: number): boolean;
    /**
     * Who is simulating a vehicle, in what capacity, and since when.
     *
     * Requires `world.vehicles`. FiveM's `NetworkGetEntityOwner` with more than a number, because the lease has more than one shape. `physicsOwner` and `authorityPlayerId` carry the same value (the vehicle read has always said the first, the NPC read says the second; a script reading both should not learn two words) and are `0` when the car is parked. `driver` is the seated controller -- the front-left occupant, or any occupant of an AV -- whether or not they own the lease, and is absent when nobody is. `steward` is true when the owner holds the lease without being the driver: the parked-car simulation the platform hands to the nearest occupant, or a script's own grant. `aiDriven` says an NPC drive task holds the lease. `epoch` is the authority epoch; `since` is when the owner last changed on the `GetGameTimer()` clock and `ageMs` how long ago that was; `reason` is why (`driverclaim`, `driverrelease`, `leaseexpired`, `playerdisconnected`, `validationfailed`, `serverrevoke`, or `none` for a platform steward grant and a car nobody has owned yet); `leaseMs` is how long the current lease still has, when there is one. There is no `Open77.vehicles.entity(id)`: the client read's `entity` FIELD and `Open77.vehicles.fromEntity` already cover `NetworkGetNetworkIdFromEntity`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.73
     * @open77Return { physicsOwner, authorityPlayerId, driver?, steward, aiDriven, epoch, since, ageMs, reason, leaseMs? }, or nil | reason: invalid_vehicle_id, vehicle_not_found
     */
    owner(this: void, id: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Registers resource-local named damage zones and glass parts.
     *
     * Requires `world.vehicles`. Profiles are scoped to the calling server resource VM and can extend or override the default body-zone mapping for one vehicle record.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return `true`
     */
    registerDamageProfile(this: void, record: string, profile: Open77Table): unknown;
    /**
     * Removes a server-authoritative network vehicle.
     *
     * Requires `world.vehicles`. Any authorized resource may remove any canonical vehicle, regardless of which resource created it. Removal clears occupancy and authority before notifying streamed clients.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    remove(this: void, id: number): boolean;
    /**
     * Alias for forced authoritative vehicle exit.
     *
     * Same contract as `forcePlayerOutOfVehicle`, including the optional expected vehicle ID, exit-lock override, client confirmation, and timeout cleanup.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    removePlayerFromVehicle(this: void, playerId: number, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Repairs a selected vehicle damage scope.
     *
     * Requires `world.vehicles`. Supported scopes are `glass`, `body`, `lights`, `tires`, `visual`, `mechanical`, and `full`. The default is `full`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repair(this: void, id: number, scope?: string): boolean;
    /**
     * Repairs all vehicle glass.
     *
     * Requires `world.vehicles`. Clears the complete canonical broken-glass mask.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairAllGlass(this: void, id: number): boolean;
    /**
     * Repairs every vehicle light.
     *
     * Requires `world.vehicles`. Clears the complete canonical broken-light mask.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairAllLights(this: void, id: number): boolean;
    /**
     * Repairs all four vehicle tires.
     *
     * Requires `world.vehicles`. Clears the complete canonical broken-tire mask.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairAllTires(this: void, id: number): boolean;
    /**
     * Repairs one body cell.
     *
     * Requires `world.vehicles`. Sets the selected 1-based body cell to zero damage and replicates the repaired state.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairBodyCell(this: void, id: number, cell: number): boolean;
    /**
     * Repairs every body cell in a zone.
     *
     * Requires `world.vehicles`. Clears all cells selected by a registered zone name or explicit index array.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairBodyZone(this: void, id: number, zone: string | Open77Table): boolean;
    /**
     * Repairs one vehicle glass element.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setGlassBroken(id, glass, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairGlass(this: void, id: number, glass: number | string): boolean;
    /**
     * Repairs one vehicle light.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setLightBroken(id, index, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairLight(this: void, id: number, index: number): boolean;
    /**
     * Repairs one vehicle tire.
     *
     * Requires `world.vehicles`. Convenience wrapper over `setTireBroken(id, index, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    repairTire(this: void, id: number, index: number): boolean;
    /**
     * Asks that one client simulate a vehicle. A request, never an order.
     *
     * Requires `world.vehicles`. FiveM's `NetworkRequestControlOfEntity`, with the difference that Open77 leases authority from the server and the lease already moves on its own, so a script's request goes through the election's own eligibility and is refused BY NAME when it fails rather than forced: `driven` when somebody else is the seated controller (a driven car is never taken from its driver -- the rule that makes this a request), `ai_driven` when an NPC drive task holds the lease, `not_streamed` when the player has no body for the car yet, `too_far` beyond the 350 m stream-in radius, `wrong_bucket`, `player_unavailable` when the player has no fresh position (the same two-second rule every claim applies). The requested player being the driver already is the one case that is not a steal, and it is granted; asking for a car the player already owns answers the read with `already_owner` and re-grants nothing. On success the owner table (see `owner`) after the grant. A grant is a lease like any other: the client keeps it by reporting, which its parked-pose loop does twice a second once the car has been attached for five seconds, so a grant to a client that has only just streamed the car in can lapse two seconds later, and `owner` then says so.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.73
     * @open77Return the owner table after the grant, or nil | reason: driven, ai_driven, not_streamed, too_far, wrong_bucket, player_unavailable, invalid_player_id, vehicle_not_found
     */
    requestAuthority(this: void, id: unknown, playerId: unknown): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Restores a vehicle's authored paint.
     *
     * Requires `world.vehicles`. Clears the canonical custom-paint flag without treating stored RGB bytes as a sentinel, then reliably publishes the reset to all current and future viewers.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    resetPaint(this: void, id: number): boolean;
    /**
     * Whether one seat of a vehicle is free.
     *
     * Requires `world.vehicles`. A seat held by an occupant whose entry animation is still running counts as TAKEN: the seat is reserved and a second warp into it is refused, so reporting it free would be a lie the caller then trips over. Seats accept `-1..2`, the `Open77.vehicles.seats` constants, aliases like `driver`, and canonical `seat_*` names.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true or false for a known vehicle and seat; nil when the call failed | reason: invalid_seat, vehicle_not_found (only with nil)
     */
    seatFree(this: void, id: unknown, seat: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The canonical spelling of a seat name or index.
     *
     * No permission. Turns `-1`, `"driver"`, `"frontLeft"` or `"seat_front_left"` into `"seat_front_left"`, which is the spelling every occupant record and every seat event uses. `nil` for anything that names no seat.
     *
     * @since 2.31.13+op77.67
     * @open77Return string, or nil
     */
    seatName(this: void, seat: number | string): string | undefined;
    /**
     * Opens or closes one routing bucket to vehicle adoption.
     *
     * Requires `world.vehicles` and `world.vehicles.adopt`. `"none"` is the default and every bucket starts there: nothing is adoptable until a resource says so. `"driver"` accepts only a car the proposing player is standing at, within six metres — the car-theft shape, where you make canonical the car you are about to take and nothing else. `"any"` widens that to sixty metres; it does not remove the check. `options.bucket` selects the routing bucket (default `0`). The policy is server-side only: a client never learns it, and a proposal into a closed bucket is simply refused.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    setAdoptPolicy(this: void, policy: string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Swaps the appearance variant on a live car, on every viewer.
     *
     * Requires `world.vehicles` **and** `world.vehicles.appearance`. The second string exists because this is the one vehicle write that changes what the world LOOKS like rather than what a car does: it reaches a native entity-appearance reschedule on every viewer at once, for every car a resource can name, and a resource that wants to repaint the city should have to say so -- the same argument that gave adoption its own string. **It gates a CHANGE, never a restatement**: writing the variant a car already wears is accepted without it, which is what makes `setProperties(id, getProperties(id))` work for a resource that never changes a look.
     *
     * `nil` or `""` restores the record's default variant. The name is not validated here, because only the client holds the entity template: a variant the model does not define is a no-op on each projection and the canonical value stays as written. `Open77.data.vehicle(record)` looks a record up but does not enumerate variants -- the shipped 2.31 catalogue does not carry them.
     *
     * **No intent window, and that is structural rather than lucky.** The physics owner's durable report has no appearance field and no colour field of any kind, so the twice-a-second merge that used to undo server writes cannot reach this one. On the client the variant is applied through `entEntity::ScheduleAppearanceChange` and held on the replica until the projection attaches -- measured at up to about 3.7 s after the create -- then re-applied if the entity is torn down and streamed back.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_appearance, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles, permission_denied:world.vehicles.appearance
     */
    setAppearance(this: void, id: unknown, appearance: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one body-damage cell.
     *
     * Requires `world.vehicles`. Lua body-cell indexes are 1..30 and the value is clamped or validated in the normalized 0..1 range.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setBodyCell(this: void, id: number, cell: number, value: number): boolean;
    /**
     * Replaces the complete body-damage grid.
     *
     * Requires `world.vehicles`. The table must contain exactly 30 normalized finite values in the range 0..1.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setBodyDamage(this: void, id: number, values: Open77Table): boolean;
    /**
     * Sets all body cells in a zone.
     *
     * Requires `world.vehicles`. The zone may be a registered zone name or an explicit array of cell indexes. Every selected cell receives the normalized value.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setBodyZone(this: void, id: number, zone: string | Open77Table, value: number): boolean;
    /**
     * Replaces multiple canonical damage components at once.
     *
     * Requires `world.vehicles`. Accepts a combined damage table and validates body cells and bit masks before publishing one authoritative update.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setDamage(this: void, id: number, damage: Open77Table): boolean;
    /**
     * Removes a vehicle once nobody has had it streamed for thirty seconds.
     *
     * Requires `world.vehicles`. The window is not zero because interest is recomputed against the last received player snapshot, and a loading screen or a bucket change briefly empties a viewer set that is about to refill; thirty seconds rides that out. The clock runs for a vehicle nobody has **ever** seen too, which is what a garage wants -- a car spawned for a player who never turns up still goes. A viewer coming back resets the clock rather than pausing it, and turning the flag off forgets it entirely so that turning it back on later does not inherit a deadline from a window nobody was counting. A persistent vehicle is exempt. Read back as `Open77.vehicles.get(id).despawnWhenUnobserved`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setDespawnWhenUnobserved(this: void, id: unknown, despawn: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Adds a canonical detached-part mask.
     *
     * Requires `world.vehicles`. The 16-bit mask is monotonic on a live projection. Removing a previously detached bit is rejected because REDengine 2.31 has no validated safe reattachment primitive.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setDetachedPartMask(this: void, id: number, mask: number): boolean;
    /**
     * Replaces the vehicle opening mask.
     *
     * Requires `world.vehicles`. The six-bit mask covers four doors, trunk, and hood. Valid values are 0..63.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setDoorMask(this: void, id: number, mask: number): boolean;
    /**
     * Sets one door, trunk, or hood opening state.
     *
     * Requires `world.vehicles`. `door` is an index 0..5 or one of the constants in `Open77.vehicles.doors`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setDoorOpen(this: void, id: number, door: number, opened: boolean): boolean;
    /**
     * Puts a vehicle in or out of service.
     *
     * Requires `world.vehicles`. Out of service cuts the engine in the SAME canonical revision and locks the simulated driver's throttle and brake on every projection, so the car cannot be pushed along by its own inputs; a car whose throttle is dead while its engine idles is a bug report waiting to happen. Putting it back in service does NOT restart the engine -- that is `setEngine`. This is the `SetVehicleUndriveable` of FiveM, and like the entry lock it is server-authored: no owner report can clear it.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found
     */
    setDrivable(this: void, id: unknown, drivable: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Starts or stops a vehicle's engine.
     *
     * Requires `world.vehicles`. Updates ignition while preserving unrelated flags. Stopping ignition also cancels engineHold. The server retains a ten-second hold against conflicting owner reports, releasing each held bit when the owner reports the requested value. Separately, VehicleState carries an explicit electrical intent revision, mask and value: even a same-value setter is a new command, while ordinary owner-report echoes are observations, not commands. Owners initialize canonical control once per native/authority incarnation; subsequent explicit intents accumulate by mask and failed native calls retry. Local engine/light readbacks update the owner baseline only outside buffered or unapplied intent. Revoke/park authors explicit electrical OFF unless engineHold is enabled; a driver exit can retain coast/contact authority and is not itself always a revoke.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setEngine(this: void, id: unknown, on: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets vehicle health under its FiveM name.
     *
     * Requires `world.vehicles`. **Cyberpunk models one vehicle health pool.** There is no separate engine pool to damage, so this is `Open77.vehicles.setHealth` under the name a FiveM port reaches for, and at 0 the car is a wreck rather than a running car with a dead engine. If you want the car to stay whole but refuse to move, that is `setDrivable(id, false)`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    setEngineHealth(this: void, id: unknown, health: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Keep an empty vehicle engine running on every client.
     *
     * Requires matching Stable 147 client/server (protocol 1.48). Enabling starts ignition. The hold survives driver exit, parking, owner changes and stream-in. Clearing it keeps current ignition; setEngine(id, false), zero health, destruction or undriveable state cancel it. No restart timer is needed. getProperties/setProperties include engineHold. See [Vehicles](vehicles.md#keep-an-empty-vehicle-running).
     *
     * @permission world.vehicles
     * @since 2.31.21+op77.147
     * @open77Return true on success, otherwise false | reason on failure
     */
    setEngineHold(this: void, id: number, hold: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Pins a vehicle where it stands, or lets it go.
     *
     * Requires `world.vehicles`. The server half of FiveM's `FreezeEntityPosition` for a vehicle, and only that half: the control lock is `setUndriveable`, and the two compose (an impound wants both, a starting grid wants the freeze alone with the engine running). Three things happen in ONE canonical revision: the `frozen` bit goes up (`Open77.vehicles.flags.frozen`, bit 11), the motion facts are pinned (`speed`, `velocity`, `angularVelocity`, `onGround`, `reversing` read as a car at rest), and the physics owner's transform reports are discarded while the bit is up -- discarded, not punished: the lease is renewed and the tick consumed as an accepted report would be, so nothing flaps and nothing is logged. Every projection maps the bit to the native physics mask, so inertia, gravity and impulses stop too; a driver pressing the throttle revs an engine that goes nowhere. Nothing electrical changes. Like `undriveable` the bit is server-authored, absent from every owner report and preserved across them. The pinned transform is wherever the last ACCEPTED report put the car: frozen at speed, the owner's screen stops one latency past the pin and the two agree again after the release. Widening the accepted flag mask is a wire change -- server and client must be built together.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.73
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found
     */
    setFrozen(this: void, id: unknown, frozen: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets or clears one broken-glass bit.
     *
     * Requires `world.vehicles`. `glass` may be a numeric 0..31 index or a name supplied by the resource's registered damage profile.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setGlassBroken(this: void, id: number, glass: number | string, broken: boolean): boolean;
    /**
     * Replaces the broken-glass bit mask.
     *
     * Requires `world.vehicles`. The 32-bit mask describes destructible glass records, not the four reversible side-window opening states.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setGlassMask(this: void, id: number, mask: number): boolean;
    /**
     * The same tint, from an RGB colour.
     *
     * Requires `world.vehicles`. Accepts the same colour forms as `setPaint` -- `"#RRGGBB"`, `{ r, g, b }` or a positional table -- converts it to a hue and applies that. `nil` clears the tint.
     *
     * **Only the hue survives.** The engine stores one float, so `#800000` and `#FF0000` light the car identically, and a grey has no hue at all and reads as red. The function exists because a porting creator has a colour in hand and not a hue; `setLightsHue` is the honest form. `setHeadlightColour` is the same function.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, invalid_lights_hue, vehicle_not_found, permission_denied:world.vehicles
     */
    setHeadlightColor(this: void, id: unknown, color: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias for `setHeadlightColor`.
     *
     * Identical contract, in the other spelling.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    setHeadlightColour(this: void, id: unknown, color: string | Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a vehicle's health, 0 to 1.
     *
     * Requires `world.vehicles`. The same normalized pool `get(id).health` reads and `setDamage{ health = }` writes, under a name that does one thing. Out-of-range values are refused rather than clamped, so a caller passing FiveM's 0..1000 scale finds out.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, invalid_health, vehicle_not_found
     */
    setHealth(this: void, id: unknown, health: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Raises or drops the high beams without going dark.
     *
     * Requires `world.vehicles`. Turning them off leaves the side lights on if they were on, rather than switching the car dark -- which is what a naive `setLights("on"/"off")` pair gets wrong. Turning them on implies side lights, because the native mode cannot express one without the other.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found
     */
    setHighBeams(this: void, id: unknown, on: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets or clears one broken-light bit.
     *
     * Requires `world.vehicles`. The light index must be in 0..31.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setLightBroken(this: void, id: number, index: number, broken: boolean): boolean;
    /**
     * Replaces the broken-light bit mask.
     *
     * Requires `world.vehicles`. Replaces the complete 32-bit canonical broken-light mask.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setLightMask(this: void, id: number, mask: number): boolean;
    /**
     * Sets a vehicle's headlight mode.
     *
     * Requires `world.vehicles`. One call for the whole mode, because `lightsOn` and `highBeams` are NOT independent on this build: the client maps the pair to a single native LightMode and 'high beams with no side lights' is not a state REDengine can express. Accepts `"off"`, `"on"`, `"high"` (aliases `highBeams`, `high_beams`, `full`) or a boolean. Carries the same explicit revision/mask/value command and separate server ten-second hold as `setEngine`, including same-value commands and native-call retries. The Stable 147 client fixes application to the driver and late-joining observers. The setter acknowledges canonical state; native application is asynchronous. It does not start ignition.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_light_mode, vehicle_not_found
     */
    setLights(this: void, id: unknown, mode: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Tints the car's own lights.
     *
     * Requires `world.vehicles`. `hue` is `0..1` -- the H of the HSB triple the engine's visual template carries -- and `nil` hands the lights back the record's colour.
     *
     * **This is the closest build 2.31 has to `SetVehicleNeonLights` or `SetVehicleHeadlightsColour`, and it is not the same thing.** There is no underglow and no xenon palette in this game; what exists is the vehicle's own emissive colour, continuous rather than indexed, in the same `GenericTemplatePersistentData` struct as the two paint colours. Because it is the same struct, the hue and the paint reach the engine in one event -- which is why the hue is carried inside `paint` in a property table, and why it is unaffected by `paintApplied`: a car can wear a tinted headlight over its stock body paint.
     *
     * Replicated to every viewer and replayed on stream-in. It is not in the physics owner's durable report, so it needs no intent window.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_lights_hue, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setLightsHue(this: void, id: unknown, hue: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets or clears a vehicle's durable entry lock.
     *
     * Requires `world.vehicles`. Atomically changes only `VehicleStateFlags.Locked`, publishes the canonical result to current viewers and late joiners, and does not overwrite unrelated flags. This blocks ordinary entry, not exit by an existing occupant; forced server seat assignment may deliberately bypass it.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, permission_denied:world.vehicles, vehicle_not_found, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    setLocked(this: void, id: number, locked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the canonical entry lock and revokes every per-player exception.
     *
     * Requires `world.vehicles`. Wiping the exceptions is the point, not a side effect: "lock this for everyone" has to mean everyone, including the key holders excepted a minute ago. `Open77.vehicles.setLocked` is unchanged and moves only the canonical bit, leaving exceptions standing -- use that one when the exceptions should survive. When the canonical bit was already at the requested value but exceptions were dropped, the whole audience is re-stated explicitly, because nothing else would tell the excepted players their exception is gone.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setLockedForAll(this: void, id: unknown, locked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Decides one player's view of a vehicle's entry lock.
     *
     * Requires `world.vehicles`. `true` or `false` pins that player's view regardless of the canonical bit; `nil` drops the exception and puts them back on it. This is the shape a keys resource needs: `setLockedForAll(id, true)` for the street, then `setLockedForPlayer(id, holder, false)` for each key holder. The canonical bit stays `locked`, so a late joiner is told the right thing with no bookkeeping, and a key holder who disconnects takes their exception with them. The substitution happens at the single point where state reaches a socket, so no fan-out path can disagree with `isLockedForPlayer`. Per-player state is never written to the canonical flags, which is also why no owner report can disturb it -- `Locked` is outside the set an owner report is allowed to carry.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, invalid_player_id, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setLockedForPlayer(this: void, id: unknown, playerId: number, locked: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets authoritative paint on a canonical vehicle.
     *
     * Requires `world.vehicles`. Accepts primary and optional secondary RGB colors as `#RRGGBB`, keyed `{ r, g, b }`, or positional tables. Omitting secondary mirrors primary. Paint is cross-resource and replicated to current viewers, stream-in projections, reconnects, and late joiners.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setPaint(this: void, id: number, paint: Open77Table): boolean;
    /**
     * Detaches one standard vehicle part.
     *
     * Requires `world.vehicles`. The part may be an index 0..15 or a name from `Open77.vehicles.detachedParts`. Only `true` is accepted; respawn the vehicle to restore panels.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setPartDetached(this: void, id: number, part: number | string, detached: boolean): boolean;
    /**
     * Caps one vehicle's top speed and pickup, from the server.
     *
     * Requires `world.vehicles`. The profile is `{ topSpeedKph, accelerationScale, taperKph }`: a speed ceiling in km/h in `0..1000` (zero means none), throttle authority at every speed in `(0, 1]`, and how many km/h below the ceiling the throttle starts easing off, `3..200` with a default of `12`. **The taper is never zero**: below about 3 km/h the roll-off is short enough that the limiter hunts around the ceiling and it reads as stutter, which is why the client-local governor has refused that band since it shipped -- the server form enforces the identical envelope on the Lua boundary, in the registry and on both sides of the wire, so a server cap cannot be a way around a rule somebody measured. `nil` clears the ceiling, and so does a profile that asks for nothing -- no ceiling and full throttle authority. The taper is not part of that test: a roll-off width around a ceiling that does not exist changes nothing, which is how the native profile decides it too. This is the server-authoritative form of the client-local governor -- the same three numbers, decided by the server instead, which is what a tuning shop or a speed limit inside an instance needs. The ceiling is replicated to **every viewer**, not only to the client that currently owns the physics: ownership changes on every driver entry and exit, and a ceiling chased across those transitions would be missing for exactly the first second of every drive. It survives the physics owner's twice-a-second durable report by construction -- that report carries no performance field, so the merge has nothing to overwrite -- and it survives a projection that has not attached yet, because the client holds the intent on the replica and applies it when the entity appears. **Only server-spawned vehicles are in the registry.** A player standing next to a vanilla traffic car is standing next to something REDengine population spawned on their own client: it has no canonical id and this call cannot see it. Adopting vanilla traffic is a separate capability that does not exist yet.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, invalid_top_speed, invalid_acceleration, invalid_taper, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setPerformance(this: void, id: unknown, profile: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Exempts a vehicle from every automatic removal.
     *
     * Requires `world.vehicles`. One meaning, deliberately: no time-to-live takes it, the unobserved sweep does not take it, and it survives the stop of the resource that created it. An explicit `Open77.vehicles.remove` still takes it -- persistence is protection from the reapers, not from the owner. Taking persistence away hands the vehicle back to any deadline it still carries. Read back as `Open77.vehicles.get(id).persistent`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setPersistent(this: void, id: unknown, persistent: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Prevents or permits a player-controlled vehicle exit.
     *
     * Requires `world.vehicles`. While locked, native unmount and manual seat-switch attempts are rejected and reconciliation remounts any divergent local state. Seat policy is cross-resource, so an authorized gamemode or utility resource may coordinate vehicles created elsewhere. A server forced exit still overrides the lock. The optional vehicle ID is an optimistic guard against stale assignments.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_player_id, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    setPlayerExitLocked(this: void, playerId: number, locked: boolean, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias for authoritative player seat assignment.
     *
     * Same contract as `warpPlayerIntoVehicle`. This name is useful to codebases that reserve `warp` for client presentation, while both server names create the same canonical seat assignment.
     *
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_player_id, invalid_seat, invalid_vehicle_id, permission_denied:world.vehicles, player_not_found, player_unavailable, vehicle_not_found, vehicles_unavailable, wrong_bucket
     * @open77Return true on success, otherwise false | reason
     */
    setPlayerIntoVehicle(this: void, playerId: number, vehicleId: number, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Applies a stored property table to a vehicle.
     *
     * Requires `world.vehicles`, plus `world.vehicles.appearance` if -- and only if -- the table CHANGES the appearance variant. Restating the variant a car already wears is free, which is what keeps the round trip working for a resource that never changes a look.
     *
     * **`version` decides how absence is read, and it is the only thing that does.** A table carrying `version = 1` -- which is every table `getProperties` hands back -- is a COMPLETE description, so an absent optional field means "this car has none": no lights hue, no performance ceiling. A table without `version` is a PATCH, so an absent field is left exactly as it was, and `setProperties(id, { paint = { primary = "#FF0000" } })` is a repaint and nothing else.
     *
     * **A property with no Cyberpunk counterpart is refused by name**, as `unsupported_property:modEngine` or `unsupported_property:paint.neonColor` -- the offending key alphabetically first, so the refusal is reproducible whatever `pairs` decides that run. Pass `{ ignoreUnsupported = true }` to skip them instead, in which case the third return value lists what was skipped. Refusing is deliberate: a garage that silently loses two thirds of its table is worse than one that fails loudly on day one. `Open77.vehicles.unsupportedProperties` maps every such name to the reason.
     *
     * `record` is checked, never applied: REDengine cannot change a spawned entity's record, so a Quadra table handed to a Thorton answers `record_mismatch` rather than half-restoring. Detached parts are one-way on a live projection, so a table asking for fewer than the car has already lost answers `detached_parts_not_reattachable`; respawn and apply the table to the new car.
     *
     * **The order of application is deliberate.** Health, paint, doors, windows and the durable damage go in ONE `update`, so no viewer ever sees a half-restored car. The electrical bits then go through `setEngine`, `setLights`, `setSiren` and `setDrivable`, because those are what record the server intent that stops the physics owner's next durable report from undoing them -- writing them as raw flags would look like it worked and quietly revert about half a second later. The visual template and the performance ceiling follow on their own durable channels. Stable 147 includes engineHold in the property table; setProperties applies it through the canonical engine-hold setter.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: unsupported_property:<name>, unsupported_version, record_mismatch, detached_parts_not_reattachable, invalid_argument, invalid_paint, invalid_damage, invalid_health, invalid_appearance, invalid_lights_hue, vehicle_not_found, permission_denied:world.vehicles, permission_denied:world.vehicles.appearance | skipped: the list of unsupported names, only with ignoreUnsupported
     */
    setProperties(this: void, id: unknown, props: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns a vehicle's siren on or off.
     *
     * Requires `world.vehicles`. **The light bar and the sound are one bit and cannot be separated.** The only native this build exposes is `vehicleBaseObject.ToggleSiren(Bool)`, which takes no channel argument, so there is no `setSirenLights` that would not also make noise. The siren is also the one electrical bit no owner snapshot can read back, which is why the client echoes the canonical value instead of reporting it -- without that echo a cop car's bar went dark about five seconds after it was set.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_argument, vehicle_not_found
     */
    setSiren(this: void, id: unknown, on: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Gives a vehicle a deadline, in milliseconds from now.
     *
     * Requires `world.vehicles`. `0` or `nil` cancels a deadline the vehicle already had, so a caller does not have to recreate it. Capped at seven days, mirroring the prop registry. The reaper runs once per tick, before interest is reconciled, so a vehicle whose lifetime ends leaves as a real removal the client tears down rather than quietly dropping out of the next interest pass. Read back as `Open77.vehicles.get(id).ttlMs`, counted from now and absent rather than zero once cancelled. A vehicle marked persistent ignores its deadline while it stays persistent. A deadline takes an **occupied** vehicle too, deliberately: a time-to-live silently declined because someone happened to be sitting in the car is a worse surprise than the removal, and the seat ledger is closed out properly either way. Clear the deadline on `onPlayerEnteredVehicle`, or mark the vehicle persistent, if that matters.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_ttl, vehicle_not_found, vehicles_unavailable, permission_denied:world.vehicles
     */
    setTimeToLive(this: void, id: unknown, ttlMs: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets or clears one broken tire.
     *
     * Requires `world.vehicles`. Mutates one tire index in 0..3 and replicates the canonical state to streamed observers.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setTireBroken(this: void, id: number, index: number, broken: boolean): boolean;
    /**
     * Replaces the broken-tire bit mask.
     *
     * Requires `world.vehicles`. Only the lower four bits are valid and correspond to tire indexes 0..3.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setTireMask(this: void, id: number, mask: number): boolean;
    /**
     * Moves a vehicle authoritatively.
     *
     * Requires `world.vehicles`. Updates position and yaw, revokes any active physics lease, and publishes the new canonical transform to current viewers. Two table shapes are accepted and read identically: `{ x, y, z, yaw }` at the top level, or `{ position = { x, y, z }, yaw }` (the wrapper reads `def.position or def`, then `def.yaw`). A missing coordinate keeps the vehicle's current value; a missing `yaw` becomes **0**, not the current heading, so always pass it. `yaw` is degrees about Z, as `create` takes it. `SetVehicleTransform(id, x, y, z, yaw)` is the positional twin. There is no native that attaches a vehicle to another vehicle or to a player -- `Open77.props.attach` only parents a *prop* -- so a tow or a trailer is a resource calling this per update, not a lease.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setTransform(this: void, id: number, transform: Open77Table): boolean;
    /**
     * Alias of `Open77.vehicles.setTimeToLive`.
     *
     * Requires `world.vehicles`. The short spelling, matching the `ttlMs` key on `Open77.vehicles.create`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: invalid_ttl, vehicle_not_found
     */
    setTtl(this: void, id: unknown, ttlMs: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Takes a vehicle out of service, or puts it back.
     *
     * Requires `world.vehicles`. The inverted spelling of `Open77.vehicles.setDrivable`, for callers porting `SetVehicleUndriveable`.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    setUndriveable(this: void, id: unknown, undriveable: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The FiveM-shaped name for `setProperties`.
     *
     * Identical contract, for a resource ported from a framework that spells it `SetVehicleProperties`. `applyProperties` is a third name for the same function.
     *
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    setVehicleProperties(this: void, id: unknown, props: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets one reversible side-window opening state.
     *
     * Requires `world.vehicles`. This controls the four openable side windows and is separate from destructible broken-glass state.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    setWindowOpen(this: void, id: number, window: number, opened: boolean): boolean;
    /**
     * Starts a vehicle's engine.
     *
     * Requires `world.vehicles`. `Open77.vehicles.setEngine(id, true)` under a name that reads as an action.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    startEngine(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops a vehicle's engine.
     *
     * Requires `world.vehicles`. `Open77.vehicles.setEngine(id, false)` under a name that reads as an action.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason
     */
    stopEngine(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Seats a player through the vanilla entry animation.
     *
     * Requires `world.vehicles`. The same authoritative reservation as `warpPlayerIntoVehicle`, taking the same `options` and answering with the same refusal reasons; the only difference is that the affected client is asked to reach the seat by mounting through the mounting facility and playing the authored entry, instead of being placed in the seat in one frame. It does **not** walk the player to the door: the approach is an NPC behaviour, and driving a network puppet through it crashed the observing client when it was measured, so the player is mounted where they stand and slides in. The animation is bounded — a client whose mounting relation does not become readable within three seconds warps instead — so the seat is always reached and `warpPlayerIntoVehicle` remains the path that never depends on an animation.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskPlayerEnter(this: void, playerId: number, vehicleId: number, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias for the animated authoritative seat assignment.
     *
     * Same contract as `Open77.vehicles.taskPlayerEnter`. The longer spelling mirrors the client-side `Open77.vehicles.taskPlayerEnterVehicle`, which presents an already-authorised **remote** occupant; this server name creates the canonical assignment that such a presentation would be showing.
     *
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskPlayerEnterVehicle(this: void, playerId: number, vehicleId: number, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Ejects a player from a network vehicle.
     *
     * Requires `world.vehicles`. The FiveM-shaped name for the same durable forced exit as `forcePlayerOutOfVehicle`, and it is honest about not being the mirror image of `taskPlayerEnter`: **the leaving player's own exit is instant on this build.** That is a measurement, not an omission — driving the local player's authored exit workspot inside the mount release window faulted on the engine's release-dispatch thread and the workspot never started once, so the client does not attempt it. Every other player still sees this occupant's exit animated, because a remote proxy's exit has always been; only the ejected player's own screen skips it.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskPlayerLeave(this: void, playerId: number, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Alias for the authoritative vehicle exit.
     *
     * Same contract as `Open77.vehicles.taskPlayerLeave`, spelled to match `taskPlayerEnterVehicle`.
     *
     * @since 2.31.13+op77.67
     * @open77Return true on success, otherwise false | reason
     */
    taskPlayerLeaveVehicle(this: void, playerId: number, vehicleId?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sounds a synchronized vehicle horn.
     *
     * Requires `world.vehicles`. Sends a reliable, authority-epoch-bound one-shot command to the client currently simulating the vehicle. An unoccupied parked vehicle intentionally has no physics owner, so the server addresses all current viewers directly without granting a lease. Duration is 100..2000 ms and defaults to 250 ms. The event is transient and is not late-join state.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_duration, invalid_vehicle_id, permission_denied:world.vehicles, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    triggerHorn(this: void, id: number, durationMs?: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Unlocks a vehicle for ordinary entry.
     *
     * Convenience alias for `setLocked(id, false)`. Requires `world.vehicles` and updates durable canonical state.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, permission_denied:world.vehicles, vehicle_not_found, vehicles_unavailable
     * @open77Return true on success, otherwise false | reason
     */
    unlock(this: void, id: number): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Unlocks a vehicle for everyone, revoking every exception.
     *
     * Requires `world.vehicles`. `Open77.vehicles.setLockedForAll(id, false)` under a name that reads as an action.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.67
     * @open77Return true, or false | reason: vehicle_not_found
     */
    unlockForAll(this: void, id: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * The FiveM vehicle-property names with no Cyberpunk counterpart, and why.
     *
     * A table, not a function: each key is a FiveM `GetVehicleProperties` field this engine cannot express, and each value says what is missing. `setProperties` refuses every one of them by name. Read it to decide, before writing, what a ported script has to drop -- and read it instead of guessing, because several of the absences are surprising: there are no colour INDICES (Cyberpunk paint is RGB), no livery index (the appearance variant is a name, not a number), and no plate at all.
     *
     * The list covers `modKit`, `mods`, `modEngine`, `modBrakes`, `modTransmission`, `modSuspension`, `modArmour`, `modTurbo`, `wheels`, `wheelType`, `wheelColor`, `windowTint`, `neonEnabled`, `neonColor`, `xenonColor`, `livery`, `roofLivery`, `extras`, `color1`, `color2`, `pearlescentColor`, `interiorColor`, `dashboardColor`, `dirtLevel`, `tyreSmokeColor`, `plateText`, `plateIndex` and `fuelLevel`.
     *
     * @since 2.31.13+op77.67
     * @open77Return table mapping property name to the reason it has no counterpart
     */
    unsupportedProperties(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Updates canonical durable vehicle fields.
     *
     * Requires `world.vehicles`. Applies only supplied fields, such as health, flags, colors, openings, tires, body damage, broken glass/lights, or detached parts. Any authorized resource may update any canonical vehicle; the authoritative result is replicated to current viewers and late joiners.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @open77Return boolean success
     */
    update(this: void, id: number, patch: Open77Table): boolean;
    /**
     * Assigns a player to an authoritative vehicle seat.
     *
     * Requires `world.vehicles`. The server reserves the seat immediately, optionally moves the player into the vehicle routing bucket, and keeps a durable forced-entry order until the target streams and the client confirms the native mount. Seat coordination is intentionally cross-resource: any resource with the permission may target any canonical vehicle. Proximity and the vehicle locked flag are bypassed; destroyed/exploded vehicles and occupied seats are rejected.
     *
     * @permission world.vehicles
     * @since 2.31.13+op77.45
     * @failure invalid_argument, invalid_player_id, invalid_seat, invalid_vehicle_id, permission_denied:world.vehicles, player_not_found, player_unavailable, vehicle_not_found, vehicles_unavailable, wrong_bucket
     * @open77Return true on success, otherwise false | reason
     */
    warpPlayerIntoVehicle(this: void, playerId: number, vehicleId: number, seat: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    ai: Open77VehiclesAiApi;
}
interface Open77VoiceApi {
    /**
     * Adds a player to a voice channel.
     *
     * Requires `voice.manage`. `options.canSpeak` and `options.canListen` both default to **true**; pass `false` explicitly for a listen-only or speak-only membership. This is the function name -- `addChannelPlayer` does not exist, and calling it inside a `pcall` is how a squad channel silently ends up with no members.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    addPlayer(this: void, channelId: string, playerId: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Every canonical voice channel.
     *
     * Requires `voice.manage`. Covers radio, phone, party, admin and spatial channels alike -- they differ by configuration, not by kind.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, permission_denied:voice.manage, voice_unavailable
     * @open77Return array of channels, or nil | reason
     */
    channels(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Creates a resource-owned voice channel.
     *
     * Requires `voice.manage`. `options` is required and must be a table. Effects include `gain`, `lowPassHz`, `highPassHz`, `distortion`, `radioNoise`, `spatialBlend` and the reverb controls `reverbWet`, `reverbRoomSize`, `reverbDecay`, `reverbDamping` and `reverbPreDelayMs`. A non-persistent channel is released automatically with its owning resource. See [Integrated voice chat](voice.md).
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, options_required, permission_denied:voice.manage, voice_unavailable
     * @open77Return channel, or nil | reason: options_required among others
     */
    createChannel(this: void, options: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one voice channel.
     *
     * Requires `voice.manage`. Answers `nil` for an unknown channel id.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, permission_denied:voice.manage, voice_unavailable
     * @open77Return channel, or nil | reason
     */
    getChannel(this: void, channelId: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Reads one player's voice participation.
     *
     * Requires `voice.manage`. Carries proximity settings, server mute and deaf policy, and the channels they belong to.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, permission_denied:voice.manage, voice_unavailable
     * @open77Return participant, or nil | reason
     */
    getParticipant(this: void, playerId: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Every voice participant, with proximity, mute/deaf and memberships.
     *
     * Requires `voice.manage`. The server's own view, so it answers for a player whose client has not reported anything.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, permission_denied:voice.manage, voice_unavailable
     * @open77Return array of participants, or nil | reason
     */
    participants(this: void): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Removes a voice channel.
     *
     * Requires `voice.manage`. Members are dropped with it; they are not moved to another channel.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    removeChannel(this: void, channelId: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Removes a player from a voice channel.
     *
     * Requires `voice.manage`. Their other channel memberships and their proximity setting are untouched.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    removePlayer(this: void, channelId: string, playerId: number | string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Mutes one player in one channel.
     *
     * Requires `voice.manage`. `muted` defaults to true when omitted. Scoped to that channel: the player still speaks everywhere else, unlike `setPlayerMuted`.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setChannelPlayerMuted(this: void, channelId: string, playerId: number | string, muted?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets a member's speak and listen rights independently.
     *
     * Requires `voice.manage`. Both `canSpeak` and `canListen` default to true when omitted, so passing an empty table restores full membership rights.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setChannelPlayerPermissions(this: void, channelId: string, playerId: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Changes the default proximity reach.
     *
     * Requires `voice.manage`. `applyToExisting` defaults to **false**, so by default this only affects participants who join afterwards; pass true to retune everyone who is already connected.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setDefaultProximityDistance(this: void, distance: number, applyToExisting?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns voice on or off for the whole server.
     *
     * Requires `voice.manage`. `enabled` defaults to true when omitted. Disabling stops relaying without removing channels or memberships, so re-enabling restores the topology.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setEnabled(this: void, enabled?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops a player hearing anyone on the server.
     *
     * Requires `voice.manage`. `deaf` defaults to true. The receive-side counterpart of `setPlayerMuted`, enforced at the relay.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setPlayerDeaf(this: void, playerId: number | string, deaf?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Stops a player being heard anywhere on the server.
     *
     * Requires `voice.manage`. `muted` defaults to true. Server-wide send policy, enforced at the relay -- the client cannot talk its way past it.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setPlayerMuted(this: void, playerId: number | string, muted?: boolean): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Enables, disables or tunes one player's proximity reach.
     *
     * Requires `voice.manage`. `options.enabled` defaults to true; `options.distance` overrides the server default for that player alone. Turning proximity off leaves their channel memberships working.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setProximity(this: void, playerId: number | string, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Sets the global codec quality profile.
     *
     * Requires `voice.manage`. A server-wide policy, not a per-player one: it trades bandwidth against fidelity for everybody.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @open77Return true, or false | reason
     */
    setQuality(this: void, quality: string): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Global voice quality, default proximity and relay counters.
     *
     * Requires `voice.manage`. The dedicated server owns reachability: a client's requested scope never bypasses routing buckets, proximity, membership, mute/deaf, rate or quality checks, and the rejection counters here are where that shows.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, permission_denied:voice.manage, voice_unavailable
     * @open77Return status table, or nil | reason
     */
    status(this: void): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Patches a voice channel.
     *
     * Requires `voice.manage`. Sparse: the patch is merged with the channel id and only the fields present are applied, so one effect can be retuned without restating the rest.
     *
     * @permission voice.manage
     * @since 2.31.13+op77.45
     * @failure invalid_json, invalid_voice_request, json_too_large, patch_must_be_table, permission_denied:voice.manage, voice_unavailable
     * @open77Return channel, or nil | reason: patch_must_be_table among others
     */
    updateChannel(this: void, channelId: string, patch?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
}
interface Open77WeaponsApi {
    /**
     * Alias of `Open77.weapons.setActive`.
     *
     * Asynchronous. The same function under a second name; it accepts both the slot and the record form. Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_options, invalid_weapon_slot, invalid_weapon_target, invalid_weapon_template, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    activate(this: void, playerId: number | string, target: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Assigns a weapon record to one of a player's six slots.
     *
     * Asynchronous. The calling resource declares `network.events` and depends on `open77_weapons >=0.1.0`; the request is relayed to the official `open77_weapons` client package. `slot` is an integer 1 to 6 and `record` is at most 160 characters. Listen for `open77:weapons:completed` with `playerId, requestId, operation, accepted, reason, result`; replies are matched to the authenticated target and the calling resource, and an unanswered request completes with `request_timeout` after ten seconds. See [Weapon Lua API](weapons-api.md). Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_options, invalid_weapon_slot, invalid_weapon_template, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: invalid_weapon_template, invalid_weapon_slot, invalid_weapon_options
     */
    assign(this: void, playerId: number | string, record: string, slot: number, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Empties all three of a player's weapon slots in one request.
     *
     * Asynchronous. Removes all six weapon slots through one owner relay request, secondary slots before primary slots to avoid native promotion leaving a weapon equipped. Already-empty slots are successful. The completion result carries cleared and a slots array of {slot, accepted, reason}; inspect each result for a partial failure. Requires network.events and the open77_weapons resource bundled with Stable 152 or later. See [Dual wielding](dual-wielding.md).
     *
     * @permission network.events
     * @since 2.31.13+op77.67
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    clear(this: void, playerId: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * The parts installed on the weapon in a player's loadout slot, from the cache, synchronously.
     *
     * Requires `player.weapons.read`. Native-parity E3. The installed, non-base parts of that slot as the owner last reported them -- the same rows `Open77.weapons.get(playerId).slots[slot].parts` carries -- with `loadoutAgeMs` beside them, because they refresh with the loadout report and not with the 20 Hz snapshot. **A cache, not authority**: as true as the owner's last report. `nil, "weapons_unreported"` until the owner has described its slots at all. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission player.weapons.read
     * @since 2.31.13+op77.73
     * @failure invalid_player_id, invalid_weapon_slot, permission_denied, weapons_unavailable, weapons_unreported
     * @open77Return { slot, record, tweakDbId, equipped, parts, loadoutAgeMs, source }, or nil | reason
     */
    components(this: void, playerId: number | string, slot: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * A player's quick slots from the cache, synchronously: the count after the last throw, with its own age.
     *
     * Requires `player.weapons.read`. Native-parity E4. The quick slots as the owner last reported them -- at start, after every give or take, and the moment a throw is observed -- so `slots[n].quantity` is the count after the grenade left the hand and `active` names the record on the throw hotkey. `reportedAgeMs` is this report's own age: the gadget report runs on its own schedule and does not borrow the loadout's clock. **A cache, not authority.** `nil, "weapons_unreported"` when nothing at all has been heard from that player and `nil, "gadgets_unreported"` when the loadout has been but the quick slots have not. Pair it with `onGadgetConsumed(playerId, record, remaining[, tweakDbId])`, the host-wide, forgery-proof event the same report raises. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission player.weapons.read
     * @since 2.31.13+op77.73
     * @failure gadgets_unreported, invalid_player_id, permission_denied, weapons_unavailable, weapons_unreported
     * @open77Return { slots, active, reportedAgeMs }, or nil | reason
     */
    gadgets(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The server's cached view of a player's weapons, answered synchronously.
     *
     * Requires `player.weapons.read`. **This is a cache, not authority.** Weapons live in the client's REDengine equipment system; the server has no copy of that state and no way to verify one, so every field is as true as the owner's last report -- read it to decide (anticheat, inventory sync, a shop refusing a sale), never to assert. The answer carries **two** ages because its halves refresh at different rates. `reportedAgeMs` dates `active`, `drawn` and `magazine`, which ride the ordinary 20 Hz player snapshot, and `fresh` applies the same two-second rule as `Open77.players.get`. `loadoutAgeMs` dates `slots`, which is pushed only when the loadout changes, so minutes there is normal and means nothing is wrong. `source` is `report` once the owner has described its slots and `snapshot` when only the packet's weapon block has arrived; the call fails with `weapons_unreported` when nothing at all has been heard, which is different from a player carrying nothing. The `onPlayerWeaponChanged` event fires once per change. See [Weapon Lua API](weapons-api.md).
     *
     * @permission player.weapons.read
     * @since 2.31.13+op77.67
     * @failure invalid_player_id, permission_denied, weapons_unavailable, weapons_unreported
     * @open77Return { playerId, slots, active, activeRecord, activeTweakDbId, drawn, magazine, reportedAgeMs, loadoutAgeMs, fresh, source }, or nil | reason
     */
    get(this: void, playerId: number | string): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Grants a player a counted stack of grenades (or any quick-slot gadget), equipped and on the throw hotkey.
     *
     * Uses the weapon relay. `record` must be a `Gadget_Record` -- every 2.31 grenade (`Items.GrenadeFragRegular`, `Items.GrenadeEMPRegular`, `Items.Preset_Grenade_Smoke_Default`, ...; the `category = grenade` rows of `docs/generated/weapons-2.31.csv`). `count` is 1..999 units. Unless `options.equip` is false the owner places the stack in quick slot 1 and on the RB hotkey, and accepts only when both took. The completion carries `result.gadget = { slot, record, tweakDbId, quantity, active }`; the owner's gadget report follows, so `Open77.weapons.gadgets(playerId)` then answers from the cache. Refusals by name: `invalid_player`, `invalid_gadget_template`, `invalid_gadget_count`, `invalid_weapon_options` now; `template_is_not_gadget`, `unsupported_gadget_area`, `item_creation_failed`, `equip_rejected`, `hotkey_rejected`, `request_timeout` on the completion. Like `assign`, this is a presentation grant: commit ownership in your own ledger first. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_gadget_count, invalid_gadget_template, invalid_target, invalid_weapon_options, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    giveGadget(this: void, playerId: number | string, record: string, count?: number, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Puts away whatever a player is holding.
     *
     * Asynchronous, same relay and completion contract as `assign`. It holsters rather than removing: the slots keep their weapons.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    holster(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Empties one of a player's three weapon slots.
     *
     * Asynchronous, same relay and completion contract as `assign`. `slot` is an integer 1 to 6.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: invalid_weapon_slot
     */
    remove(this: void, playerId: number | string, slot: number): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Empties one attachment slot of the weapon in a player's loadout slot.
     *
     * Native-parity E3. The relay asks the owner to queue the vanilla `RemoveItemPart` for the named `AttachmentSlots.*` record; the part returns to that player's inventory and the completion reports once the slot is visibly empty. An already-empty slot is accepted. The weapon's base parts are refused as `base_part_slot`. Refusals by name: `invalid_player`, `invalid_weapon_slot`, `invalid_attachment_slot` now; `weapon_slot_empty`, `slot_not_on_weapon`, `remove_rejected`, `request_timeout` on the completion. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_attachment_slot, invalid_target, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    removeComponent(this: void, playerId: number | string, slot: number, attachmentSlot: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks the owner for every attachment slot of the weapon in a loadout slot, taken or empty.
     *
     * Native-parity E3, the round trip. The owner reads the live item and answers on `open77:weapons:completed` with `result.parts`, one row per attachment slot: `{ slot, attachmentSlot, attachmentSlotId, taken, base, record, tweakDbId }`, `base` marking the weapon's own receiver, barrel or magazine. Use `Open77.weapons.components` for the cached, synchronous answer. Refusals: `invalid_player`, `invalid_weapon_slot` now; `weapon_slot_empty`, `request_timeout` on the completion. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_target, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    requestComponents(this: void, playerId: number | string, slot: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks the owner for its quick slots: one row per slot with the gadget, its count and the hotkey flag.
     *
     * Native-parity E4, the round trip. The owner answers on `open77:weapons:completed` with `result` as an array of `{ slot, record, tweakDbId, quantity, active, difference }` rows and refreshes the server cache in the same breath. Use `Open77.weapons.gadgets` for the cached, synchronous answer. Refusals: `invalid_player` now, `request_timeout` on the completion. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    requestGadgets(this: void, playerId: number | string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Asks a player's client for its current weapon state.
     *
     * Asynchronous. The completion event's `result` carries the slot contents and ammunition the client actually holds, which is the honest answer after a write has settled.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    requestSnapshot(this: void, playerId: number | string): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Draws a weapon, by slot or by record.
     *
     * Asynchronous, same relay and completion contract as `assign`. Two forms: a slot number 1 to 6, which takes no options, or a record string with optional options. Passing options with a slot is refused, because the two forms mean different things. Secondary slots 4–6 require a compatible enabled dual-wield pair on Stable 152 or later; await completion between policy, assignments and activation.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_options, invalid_weapon_slot, invalid_weapon_target, invalid_weapon_template, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: invalid_weapon_target, invalid_weapon_slot, invalid_weapon_template, invalid_weapon_options
     */
    setActive(this: void, playerId: number | string, target: number | string, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sets a slot's magazine and reserve ammunition.
     *
     * Asynchronous, same relay and completion contract as `assign`. `amounts` takes `reserve` and `magazine` -- at least one is required, each a non-negative integer up to 1,000,000 -- plus an optional boolean `activate`. When both hands share an ammo record, reserve is shared and the total includes both loaded magazines. Editing one magazine preserves the other; await completion before a dependent change. Native dual reloads with too little shared reserve can still allocate rounds inconsistently.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_ammo, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason: invalid_weapon_slot, invalid_weapon_ammo
     */
    setAmmo(this: void, playerId: number | string, slot: number, amounts: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Installs a part (scope, muzzle, generic mod) on the weapon in a player's loadout slot.
     *
     * Native-parity E3, over the same relay as every weapon mutation: a request id now, the verified outcome later on `open77:weapons:completed` with `result.part = { attachmentSlot, attachmentSlotId, record, tweakDbId }`. The part is an `Items.*` record tagged `itemPart` (`Items.w_att_scope_short_01`, `Items.w_silencer_01`, `Items.w_muzzle_brake_01`; 928 on 2.31, `docs/generated/weapon-parts-2.31.csv`) and the optional `options.attachmentSlot` an `AttachmentSlots.*` record (`Scope`, `PowerModule` for muzzles, `Power_Handgun_WeaponMod1`/`2` for generic mods). The owning client installs it through the vanilla `ItemModificationSystem`, so it is a real part on a real weapon; a missing part is created, a part already in the slot is swapped out and deleted as the vanilla screen does. Without a slot the client picks the first of the part's placement slots the weapon declares, empty ones first. The owner's next loadout report carries the part, so `Open77.weapons.components(playerId, slot)` then answers without a round trip. Refusals by name: `invalid_player`, `invalid_weapon_slot`, `invalid_part_template`, `invalid_attachment_slot` now; `weapon_slot_empty`, `slot_not_on_weapon`, `part_does_not_fit_weapon`, `part_does_not_fit_slot`, `base_part_slot`, `install_rejected`, `request_timeout` on the completion. **Other players do not see the part**: the proxy weapon is rebuilt from the snapshot's `ItemID`, which does not encode parts. See [Weapon Lua API](weapons-api.md#weapon-components-scopes-muzzles-and-mods).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_attachment_slot, invalid_part_template, invalid_target, invalid_weapon_options, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    setComponent(this: void, playerId: number | string, slot: number, record: string, options?: Open77Table): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Takes grenades back from a player: some units of a record, or every unit of the active gadget.
     *
     * Native-parity E4, over the weapon relay. Without a record the owner takes the gadget on its throw hotkey; without a count, every unit. A quick slot left empty is unequipped. The completion carries `result.gadget` with the remaining `quantity`. Refusals by name: `invalid_player`, `invalid_gadget_template`, `invalid_gadget_count` now; `gadget_not_owned`, `no_active_gadget`, `inventory_update_rejected`, `request_timeout` on the completion. See [Weapon Lua API](weapons-api.md#gadgets-grenades-in-the-quick-slots).
     *
     * @permission network.events
     * @since 2.31.13+op77.73
     * @failure invalid_gadget_count, invalid_gadget_template, invalid_target, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return requestId, or nil | reason
     */
    takeGadget(this: void, playerId: number | string, record?: string, count?: number): LuaMultiReturn<[unknown | undefined, string | undefined]>;
    /**
     * Alias of `Open77.weapons.remove`.
     *
     * Asynchronous. The same function under the name the clothing API uses for the same idea.
     *
     * @permission network.events
     * @since 2.31.13+op77.45
     * @failure invalid_target, invalid_weapon_slot, network_unavailable, permission_denied:network.events, reserved_hacking_event
     * @open77Return request id, or nil | reason
     */
    unequip(this: void, playerId: number | string, slot: number): LuaMultiReturn<[number | undefined, string | undefined]>;
}
interface Open77WorldApi {
    /**
     * Removes the server-owned entities inside a radius and can suppress vanilla population there.
     *
     * The server half of `Open77.world`, and the only function in it: the client's `world` table (raycast, groundZ, nearby, nearest, district) needs a physics world and a streamed player, and a dedicated server has neither. **Ownership is the contract.** It removes what the CALLING resource owns and nothing else; entities inside the radius belonging to another resource are counted in `refused` and left standing. Without that rule a gamemode clearing a street would delete the parked cars a roleplay resource spawned and still holds ids for, and that resource would discover it only when its own ids began answering `not_found`. `foreign = true` lifts the rule, and only for VEHICLES, and only for a resource whose manifest carries `world.clearArea.foreign`; without the permission the WHOLE call is refused rather than quietly downgraded, because a silent downgrade would report success on a street that still has somebody else's cars in it. The restriction to vehicles is structural, not a policy choice: NPC and prop removal is owner-checked inside the authority services themselves, and the server's NPC read is owner-scoped, so a foreign NPC is never even a candidate. Options: `npcs`, `vehicles`, `props` (booleans, all default true), `population` (default false), `bucket`, `foreign` (default false), `grace` (metres of outward slack). A `nil` bucket means every bucket, the same reading `Open77.zones.playersIn` takes, since a place is not a player and has no bucket of its own to borrow. `population = true` REQUIRES a bucket and drives `Open77.routingBuckets.setPopulationEnabled`; the suppression that follows is **bucket-wide, not confined to the radius**, because that is the only shape the switch has. There is no radius-scoped vanilla-population control on 2.31. The containment test is `Open77.zones.contains` from the shared zone module, so the radius cap and the geometry rules are the ones every other Open77 zone obeys. A missing `world.npcs`, `world.vehicles` or `world.props` skips that kind and still succeeds: a teardown that failed outright over one of three permissions would leave the other two kinds behind.
     *
     * @since 2.31.13+op77.67
     * @failure bucket_required_for_population, invalid_bucket, invalid_options, invalid_radius, permission_denied:npcs.foreign
     * @open77Return table { npcs, vehicles, props, refused, foreignVehicles, population } where population is "unchanged", "suppressed" or "unavailable", or nil | reason: permission_denied:world.clearArea.foreign, invalid_radius, invalid_position, invalid_options, invalid_bucket, bucket_required_for_population, or a shared zone-module token (invalid_grace)
     */
    clearArea(this: void, position: Open77Table, radius: number, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads the ambient population policy of one routing bucket.
     *
     * Ungated. `enabled` is derived (`crowd > 0 or traffic > 0 or police`), so it can never say "on" while every density is zero. `crowdGranularity` is `continuous` and `trafficGranularity` is `binary`, which is the honest statement of what 2.31 can apply.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, routing_unavailable
     * @open77Return table { bucket, crowd, traffic, police, enabled, crowdGranularity, trafficGranularity }, or nil | reason
     */
    getPopulation(this: void, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Reads the time scale one routing bucket is held at.
     *
     * `scale` is 1 and nothing else for a bucket at real time (a timed beat past its deadline included). Otherwise `remainingMs` is what is left of a timed hold (absent for an open-ended one), `easeMs` the ramp clients run, `owner` the resource that set it and `revision` the monotonic counter clients order replays by. Ungated: a resource in the bucket can feel it anyway.
     *
     * @since 2.31.13+op77.73
     * @failure invalid_bucket, timescale_unavailable_on_this_host
     * @open77Return table { bucket, scale, remainingMs?, easeMs?, owner?, revision? }, or nil | reason (`invalid_bucket`, `timescale_unavailable_on_this_host`)
     */
    getTimeScale(this: void, bucket: number): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * The height of the static ground under a point, observed by the nearest connected client.
     *
     * A dedicated server has no physics world, so this is an OBSERVATION: the nearest connected client standing within `options.radius` of the point (150 m by default, 300 m at most) is asked over the callback frames, and its own `Open77.world.groundZ` ray -- static geometry, a 400 m start, one kilometre down -- answers. The client host answers the reserved name itself, so no client resource has to exist or hold a permission. It WAITS for the answer, so call it from a scheduler coroutine (a command, an event handler, `CreateThread`); at file scope it refuses with `await_requires_scheduler_coroutine` rather than blocking the server.
     *
     * **Never a default height.** Nobody near the point is `nil, "no_observer"`, because a spawn placed on an invented height kills; the radius is conservative under every measured streaming window (entities stream in at 225 m, cameras refuse past 250 m; the static-collision radius on 2.31 is unmeasured) and a caller who has measured better may widen it. `no_ground` means the observer's ray found nothing -- open water, a void, or a sector that client had not streamed yet -- and is never cached; ask again from closer. The ground is the same in every routing bucket, so observers are searched across buckets unless `options.bucket` restricts them; `options.playerId` names the observer outright (any distance, no cache). A measured metre cell answers from cache for a minute with `ageMs` reported; `cache = false` forces a fresh ray. `options.maxAgeMs` (30 s) bounds how old the observer's own position reading may be; `options.timeout` (3 s) how long to wait; `options.fromZ` (400) the ray's start height.
     *
     * An observation, not a fact: the number comes from a client, so it is fit for placing a spawn, a prop or a marker and not for adjudicating anti-cheat -- the detail names the observer so a server that cares can weigh it. Requires `world.query`. Reasons: `permission_denied:world.query`, `invalid_position`, `invalid_options`, `invalid_radius`, `invalid_player_id`, `invalid_bucket`, `invalid_callback_timeout`, `no_observer`, `player_not_found`, `no_ground`, `callback_timeout`, `network_unavailable`, `resource_stopping`, `callback_request_limit`, `await_requires_scheduler_coroutine`.
     *
     * @permission world.query
     * @since 2.31.13+op77.73
     * @failure await_requires_scheduler_coroutine, callback_request_limit, cancelled, invalid_bucket, invalid_callback_timeout, invalid_options, invalid_player_id, invalid_position, invalid_radius, network_unavailable, no_ground, no_observer, pending, permission_denied:world.query, player_not_found, promise_cancelled, rejected, resolved, resource_stopping
     * @open77Return z (number), detail { playerId, distance, observerAgeMs, ageMs, cached } | nil, reason, detail (when an observer answered)
     */
    groundZ(this: void, position: Vector3, options?: Open77Table): LuaMultiReturn<[number | undefined, string | undefined]>;
    /**
     * Sets the ambient population density of one routing bucket.
     *
     * Requires `world.population`. Server-owned and replicated to every client in the bucket; the client half (`Open77.world.population`) is read-only, so there is nothing to race.
     *
     * `crowd` is a fraction of the vanilla pedestrian density, 0..1, and is applied as one through the engine's community density modifier. `traffic` is accepted as 0..1 but 2.31 exposes no vehicle density modifier, so it is a **switch**: any value above zero means vanilla traffic. `getPopulation` reports that as `trafficGranularity = "binary"` rather than letting a caller assume the fraction was honoured. `police` allows or forbids vanilla prevention spawns outright.
     *
     * A bucket nobody has configured is the vanilla world (`1, 1, true`), not an empty one. `Open77.routingBuckets.setPopulationEnabled` is the same state expressed as a switch: off sets all three off, on restores the vanilla figures.
     *
     * @permission world.population
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, invalid_crowd, invalid_density, invalid_options, invalid_traffic, permission_denied:world.population, routing_unavailable
     * @open77Return true, or nil | reason (`permission_denied:world.population`, `invalid_bucket`, `invalid_crowd`, `invalid_traffic`, `invalid_options`)
     */
    setPopulation(this: void, bucket: number, options: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Turns NCPD dispatch on or off for a whole routing bucket.
     *
     * `TogglePreventionSystem` on every client currently in that bucket, and on any client that enters it afterwards. Per bucket rather than per player because it is a property of the world a set of players share, and because that is the only shape the engine's switch has - it takes no target. A bucket nobody has set runs dispatch, which is vanilla. Turning it off does not change anybody's wanted level: the two are separate, and a player left at level 3 in a bucket with dispatch off keeps the level and stops getting the police. Requires `world.prevention`, which is separate from `players.wanted` on purpose - a resource that should be able to make somebody a fugitive is not automatically one that should be able to abolish the police for everyone. Note that this is NOT the same switch as the police block `Open77.world.clearArea`'s population suppression drives on the client; while that suppression is active the client refuses a wanted-level raise with `population_suppressed`.
     *
     * @permission world.prevention
     * @since 2.31.13+op77.67
     * @failure invalid_bucket, invalid_json, invalid_operation, invalid_options, invalid_player, invalid_request, json_too_large, permission_denied:players.wanted, permission_denied:players.wanted.read, permission_denied:world.prevention, prevention_unavailable, request_too_large, resource_stopping
     * @open77Return table { bucket, enabled }, or nil | reason: permission_denied:world.prevention, invalid_bucket, invalid_options
     */
    setPreventionEnabled(this: void, bucket: number, enabled: boolean): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Slows the clock of every client in one routing bucket for a shared beat.
     *
     * The replicated half of the client `Open77.world.setTimeScale`: every client in `bucket` runs its world at `scale` (0.05..1; 1 releases the bucket) for `options.durationMs` (0 = until released or until this resource stops), easing in and back out over `options.easeMs` on its own clock. A client that enters the bucket mid-beat is told only what remains; one that leaves a slowed bucket is told to release. On each client the beat is a claim under the reserved owner `open77:server`, composing with any claim a client resource holds rather than fighting it.
     *
     * **The server does not slow down.** It keeps simulating at real time; this changes the rate at which each client in the bucket presents the world. It is a presentation lever for a beat every player in an instance should share -- a countdown, a cinematic, a round end -- and not a combat mechanic: a shot at a slowed client is adjudicated in real time. Requires `world.timescale`. Reasons: `permission_denied:world.timescale`, `invalid_bucket`, `invalid_scale`, `invalid_duration`, `invalid_ease`, `invalid_options`, `timescale_unavailable_on_this_host`.
     *
     * @permission world.timescale
     * @since 2.31.13+op77.73
     * @failure invalid_bucket, invalid_duration, invalid_ease, invalid_options, invalid_scale, permission_denied:world.timescale, timescale_unavailable_on_this_host
     * @open77Return true, or nil | reason
     */
    setTimeScale(this: void, bucket: number, scale: number, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
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
     * Server only. The single-player containment gate a grant should run before it acts.
     *
     * Three answers, and they are genuinely different: true, false, and nil with a reason when the answer is not knowable. Refusing on nil is a policy decision the caller has to make, not one this call may make silently. A player in another routing bucket is `false` -- a different bucket is a different world, so they are not standing in this zone by any reading. A player who has never reported a position is nil/position_unknown, which is not 'outside'. Pass `maxAgeMs` when a stale reading must not grant: without it the last known position is used however old it is, matching Open77.players.get and Open77.players.nearby. `grace`, `origin` and `rotation` behave as they do on Open77.zones.playersIn. Use this for one player and playersIn for a sweep. See the Proximity zones guide.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_max_age, invalid_options, invalid_player_id, player_not_found, position_stale, position_unknown, sessions_unavailable
     * @open77Return boolean, or nil, reason | reason: player_not_found, position_unknown, position_stale, invalid_options, invalid_max_age, or any Open77.zones.contains token including origin_required
     */
    containsPlayer(this: void, playerId: number, definition: Open77Table, options?: Open77Table): LuaMultiReturn<[boolean | undefined, string | undefined]>;
    /**
     * Validates a zone definition once and precomputes everything a containment test needs.
     *
     * Available in both runtimes, from the shared prelude scripting/lua/open77_zones.lua. Returns a prepared zone -- a plain table, so it still survives json.encode and pairs -- carrying the validated shape, its bounding volume and the derived values a test would otherwise recompute. Open77.zones.contains accepts either form, but on a raw definition it has to redo this work on every single call: measured in the client host, a 32-vertex polygon costs about 9.5 us prepared and roughly eight times that unprepared, because the vertex list is rebuilt and the shoelace area re-run before the test can start. Normalize once, keep the result, test many. Shapes: omit `shape` for the cylinder that shipped (planar `radius` around `position` plus a `maxHeight` band, default 6 m); `sphere` is a true 3-D ball and refuses `maxHeight`; `box` takes `position`, `size` (FULL extents) and `rotation` in degrees about the vertical axis; `poly` (alias `polygon`) takes `points` (3..512 planar vertices, concave allowed) with optional `minZ`/`maxZ` -- absent means unbounded on that side; `combo` takes `zones`, nested up to 4 deep. Every shape is CLOSED: a point on an edge, a face or a vertex is inside.
     *
     * @since 2.31.13+op77.67
     * @open77Return table (prepared zone), or nil, reason | reason: the same tokens as Open77.zones.contains
     */
    normalize(this: void, definition: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
    /**
     * Server only. Every player inside a zone, nearest to its anchor first, honouring routing buckets.
     *
     * The authoritative half of zones. The client zone service (open77_zones) is PRESENTATION: it decides whether a prompt draws, it runs on a machine the player owns, and it can say anything. Anything that grants -- a shop selling, a job paying, a door opening, a safe zone suppressing damage -- must re-derive containment here first. The geometry is Open77.zones.contains, the same shared file the client embeds, so a definition means the same thing on both sides. Built on Open77.players.nearby and inheriting its conventions exactly: entries are { playerId, bucket, distance, fresh, ageMs, name, position, heading, speed }, ties break by player id so two calls with the same input answer in the same order, and `distance` is to the zone's ANCHOR, not to its boundary. `bucket` defaults to every bucket -- a zone is a place, not a player, and has no bucket of its own to borrow; pass a number to narrow, or false for every bucket explicitly. `limit` applies after containment, never to the bounding-sphere scan. `grace` is metres of slack, and a validation wants a few: Open77.players.position is a replicated snapshot and an honest player's latest position may not have landed yet, so the check exists to stop a client claiming to be somewhere else entirely, not to arbitrate centimetres. `origin` and `rotation` re-site the whole zone, which is how an entity-attached definition is validated server-side. See the Proximity zones guide.
     *
     * @since 2.31.13+op77.67
     * @failure invalid_argument, invalid_bucket, invalid_limit, invalid_max_age, invalid_options, invalid_position, invalid_radius, player_not_found, position_unknown, sessions_unavailable
     * @open77Return table (array of nearby-style entries, possibly empty), or nil, reason | reason: invalid_options, invalid_limit, any Open77.zones.contains token including origin_required, or a reason from Open77.players.nearby
     */
    playersIn(this: void, definition: Open77Table, options?: Open77Table): LuaMultiReturn<[Open77Table | undefined, string | undefined]>;
}
interface Open77Api {
    EventVerdict: Open77EventVerdictApi;
    Promise: Open77PromiseApi;
    abilities: Open77AbilitiesApi;
    access: Open77AccessApi;
    acl: Open77AclApi;
    animations: Open77AnimationsApi;
    appearance: Open77AppearanceApi;
    audio: Open77AudioApi;
    callbacks: Open77CallbacksApi;
    chat: Open77ChatApi;
    clothing: Open77ClothingApi;
    combat: Open77CombatApi;
    convars: Open77ConvarsApi;
    cyberware: Open77CyberwareApi;
    dash: Open77DashApi;
    data: Open77DataApi;
    database: Open77DatabaseApi;
    effects: Open77EffectsApi;
    elevators: Open77ElevatorsApi;
    environment: Open77EnvironmentApi;
    events: Open77EventsApi;
    exports: Open77ExportsApi;
    hacking: Open77HackingApi;
    heldItems: Open77HeldItemsApi;
    http: Open77HttpApi;
    io: Open77IoApi;
    kvp: Open77KvpApi;
    locomotion: Open77LocomotionApi;
    log: Open77LogApi;
    loot: Open77LootApi;
    motion: Open77MotionApi;
    net: Open77NetApi;
    notifications: Open77NotificationsApi;
    npcs: Open77NpcsApi;
    perspective: Open77PerspectiveApi;
    playerInteractions: Open77PlayerInteractionsApi;
    players: Open77PlayersApi;
    props: Open77PropsApi;
    ready: Open77ReadyApi;
    reflex: Open77ReflexApi;
    resource: Open77ResourceApi;
    routingBuckets: Open77RoutingBucketsApi;
    runtime: Open77RuntimeApi;
    sound: Open77SoundApi;
    state: Open77StateApi;
    stats: Open77StatsApi;
    statuses: Open77StatusesApi;
    time: Open77TimeApi;
    tunables: Open77TunablesApi;
    vehicles: Open77VehiclesApi;
    voice: Open77VoiceApi;
    weapons: Open77WeaponsApi;
    world: Open77WorldApi;
    zones: Open77ZonesApi;
}

declare const Open77: Open77Api;

interface PromiseApi {
    /**
     * Creates a promise this resource settles itself.
     *
     * The same Open77.Promise object Open77.exports.call and Open77.net.callClient return, so the runtime has one promise type rather than two. A promise created here keeps its value and can be awaited repeatedly, where the client's single-consumer export promise cannot; code that awaits once is portable across both. See the FiveM compatibility guide.
     *
     * @since 2.31.13+op77.67
     * @open77Return Open77.Promise
     */
    new: (this: void) => unknown;
}

declare const promise: PromiseApi;

