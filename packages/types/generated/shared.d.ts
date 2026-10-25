/**
 * OPEN//77 shared declarations (identical client and server cards) for catalogue build 2.50.0+op77.148.
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
 * Cancels a tick created by `SetTick`.
 *
 * Takes effect on the next pass: the tick body never runs again after this returns. Tick ids and timer ids come from one per-resource counter and never collide, so this is the cancellation `ClearTimeout` performs; both names exist because FiveM has both.
 *
 * @since 2.31.13+op77.67
 * @open77Return boolean
 */
declare function ClearTick(this: void, id: number): boolean;

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
 * The server-wide state bag, read-only on the client.
 *
 * The FiveM spelling of `Open77.state.global`, mirroring what the server replicated. Reading a key the server never set, or that this client has not received yet, answers nil — check `Open77.state.ready()` before treating a nil as an absence. Writing is refused: the client never writes a bag, because a bag is shared state and a client that could write one could write another player's job or another vehicle's keys. Ask with `Open77.state.request`, which the server arbitrates and republishes.
 *
 * @since 2.31.13+op77.67
 * @open77Return the global bag, indexable by key
 */
declare function GlobalState(this: void): unknown;

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
 * FiveM-style alias for `Open77.kvp.set`.
 *
 * FiveM-familiar alias for `Open77.kvp.set`. It stores one typed value in the calling resource's persistent namespace for the active connection address; it cannot select another server or resource.
 *
 * @since 2.31.0+op77.3
 * @open77Return boolean | reason
 */
declare function SetResourceKvp(this: void, key: string, value: unknown): LuaMultiReturn<[boolean | undefined, string | undefined]>;

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
}
interface Open77CallbacksApi {
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
interface Open77EventsApi {
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
interface Open77NetApi {
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
    callbacks: Open77CallbacksApi;
    events: Open77EventsApi;
    kvp: Open77KvpApi;
    locomotion: Open77LocomotionApi;
    net: Open77NetApi;
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

