(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./library/reactions/src/reaction-core/reaction-core.service.ts":
/*!**********************************************************************!*\
  !*** ./library/reactions/src/reaction-core/reaction-core.service.ts ***!
  \**********************************************************************/
/*! exports provided: ReactionCoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionCoreService", function() { return ReactionCoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _reaction_event_reaction_event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reaction-event/reaction-event */ "./library/reactions/src/reaction-event/reaction-event.ts");
/* harmony import */ var _reaction_keyboard_reaction_keyboard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reaction-keyboard/reaction-keyboard.service */ "./library/reactions/src/reaction-keyboard/reaction-keyboard.service.ts");
/* harmony import */ var _reaction_utils_observables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reaction-utils/observables */ "./library/reactions/src/reaction-utils/observables.ts");








/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 *
 * @dynamic
 */
var ReactionCoreService = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionCoreService(_doc, _keyboard) {
        this._doc = _doc;
        this._keyboard = _keyboard;
        /**
         * Destruction event
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        /**
         * Disabled when above zero. Increments and decrements to support nested disabling.
         */
        this._disabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        /**
         * Emits if reactions are disabled.
         */
        this.disabled$ = this._disabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return value > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
        /**
         * The internal ID for emitted events.
         */
        this._nextId = 1;
        this._events$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.events$ = this._events$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$));
        this.events$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$)).subscribe(function (event) {
            var hook = event.reaction.__REACTION__.find(function (hook) { return hook.type === event.type; });
            if (hook) {
                hook.method(event);
            }
        });
    }
    Object.defineProperty(ReactionCoreService.prototype, "esc$", {
        /**
         * Only emits the escape key when reactions are enabled. This prevents a popup dialog which listens for ESC to close
         * from triggering behaviors elsewhere in the application on ESC.
         *
         * For example; you could select multiple items and then open a dialog to multi-edit those items. You would want the
         * ESC key to close the dialog instead of deselecting the items.
         *
         * @todo Maybe a priority setting for binding to hotkeys would be better.
         */
        get: function () {
            return this._keyboard.esc$.pipe(Object(_reaction_utils_observables__WEBPACK_IMPORTED_MODULE_7__["disabledWhen"])(this._disabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(Boolean))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mapTo"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactionCoreService.prototype, "nextId", {
        /**
         * The next ID for emitted events.
         */
        get: function () {
            return this._nextId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bootstraps a reaction when it's being created.
     *
     * @deprecated use hydrate instead.
     */
    ReactionCoreService.prototype.bootstrap = function (reaction) {
        // const reactionDisabled$ = toReactionValue<boolean>(reaction['disabled'], false);
        // const disabled$ = combineLatest([reactionDisabled$, this.disabled$]).pipe(
        //     map(([disabledA, disabledB]) => disabledA || disabledB)
        // );
        //
        // const hooks = reaction.hocks.filter(hook => isReactionShortcutOptions(hook)) as ReactionShortcutOptions[];
        // const events$ = hooks.map(hook => {
        //     return fromEvent<KeyboardEvent>(this._doc, 'keydown').pipe(
        //         // only key presses for this hook
        //         filter(event => event.key.toLowerCase() === hook.code.key
        //             && event.ctrlKey === hook.code.ctrlKey
        //             && event.altKey === hook.code.altKey
        //             && event.shiftKey === hook.code.shiftKey
        //             && !event.repeat)
        //     );
        // });
        //
        // merge<KeyboardEvent>(...events$).pipe(
        //     // disable default even if the hook is disabled (i.e. CTRL+S shouldn't save the web page)
        //     tap(event => event.preventDefault()),
        //     disabledWhen(disabled$),
        //     map<KeyboardEvent, ReactionEvent>(payload => ({id: 0, payload, reaction})),
        //     // @todo this won't work
        //     takeUntil(merge(this._destroyed$, reaction.destroyed$))
        // ).subscribe(event => this._events$.next(event));
    };
    /**
     * Disables emitting shortcut events until the observable emits.
     */
    ReactionCoreService.prototype.disableUntil = function (until$) {
        var _this = this;
        this._disabled$.next(this._disabled$.value + 1);
        until$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(undefined); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$)).subscribe(function () { return _this._disabled$.next(_this._disabled$.value - 1); });
    };
    /**
     * Destructor
     */
    ReactionCoreService.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    /**
     * Broadcasts the event to the application.
     */
    ReactionCoreService.prototype.broadcast = function (reaction, type, payload, el, view) {
        this._events$.next(new _reaction_event_reaction_event__WEBPACK_IMPORTED_MODULE_5__["ReactionEvent"](this._nextId++, type, reaction, payload, el, view));
    };
    ReactionCoreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Document,
            _reaction_keyboard_reaction_keyboard_service__WEBPACK_IMPORTED_MODULE_6__["ReactionKeyboardService"]])
    ], ReactionCoreService);
    return ReactionCoreService;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-event/reaction-event.ts":
/*!****************************************************************!*\
  !*** ./library/reactions/src/reaction-event/reaction-event.ts ***!
  \****************************************************************/
/*! exports provided: ReactionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionEvent", function() { return ReactionEvent; });
/* harmony import */ var _reaction_utils_hydrate_reaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reaction-utils/hydrate-reaction */ "./library/reactions/src/reaction-utils/hydrate-reaction.ts");

/**
 * Base interface for all reaction events.
 */
var ReactionEvent = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionEvent(id, type, reaction, payload, el, view) {
        this.id = id;
        this.type = type;
        this.reaction = Object(_reaction_utils_hydrate_reaction__WEBPACK_IMPORTED_MODULE_0__["hydrateReaction"])(reaction);
        this._payload = payload;
        this.el = el;
        this.view = view;
    }
    /**
     * The original event that triggered this event.
     */
    ReactionEvent.prototype.payload = function () {
        return this._payload;
    };
    return ReactionEvent;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-keyboard/reaction-keyboard.service.ts":
/*!******************************************************************************!*\
  !*** ./library/reactions/src/reaction-keyboard/reaction-keyboard.service.ts ***!
  \******************************************************************************/
/*! exports provided: ReactionKeyboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionKeyboardService", function() { return ReactionKeyboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





/**
 * A service for consuming events from the keyboard.
 */
var ReactionKeyboardService = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionKeyboardService(_doc) {
        var _this = this;
        this._doc = _doc;
        /**
         * Emitter for alt
         */
        this._alt$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        /**
         * Emitter for ctrl
         */
        this._ctrl$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        /**
         * Destructor event
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emitter for esc
         */
        this._esc$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emitter for shift
         */
        this._shift$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_doc, 'keydown'), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_doc, 'keyup'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$))
            .subscribe(function (event) {
            _this._ctrl$.next(Boolean(event.ctrlKey));
            _this._alt$.next(Boolean(event.altKey));
            _this._shift$.next(Boolean(event.shiftKey));
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'blur')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$))
            .subscribe(function () {
            _this._ctrl$.next(false);
            _this._alt$.next(false);
            _this._shift$.next(false);
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_doc, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (event) { return typeof event.key === 'string' && (event.key.toUpperCase() === 'ESCAPE' || event.key.toUpperCase() === 'ESC'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed$)).subscribe(function () { return _this._esc$.next(); });
        this.ctrl$ = this._ctrl$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
        this.alt$ = this._alt$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
        this.shift$ = this._shift$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])());
        this.esc$ = this._esc$.asObservable();
    }
    /**
     * Destructor
     */
    ReactionKeyboardService.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    ReactionKeyboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Document])
    ], ReactionKeyboardService);
    return ReactionKeyboardService;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-model/reaction-model.directive.ts":
/*!**************************************************************************!*\
  !*** ./library/reactions/src/reaction-model/reaction-model.directive.ts ***!
  \**************************************************************************/
/*! exports provided: ReactionModelDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionModelDirective", function() { return ReactionModelDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _reaction_core_reaction_core_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reaction-core/reaction-core.service */ "./library/reactions/src/reaction-core/reaction-core.service.ts");
/* harmony import */ var _reaction_snapshots_reaction_snapshot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reaction-snapshots/reaction-snapshot */ "./library/reactions/src/reaction-snapshots/reaction-snapshot.ts");
/* harmony import */ var _reaction_state_reaction_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reaction-state/reaction-state */ "./library/reactions/src/reaction-state/reaction-state.ts");
/* harmony import */ var _reaction_utils_observables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reaction-utils/observables */ "./library/reactions/src/reaction-utils/observables.ts");
/* harmony import */ var _reaction_utils_combine_events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../reaction-utils/combine-events */ "./library/reactions/src/reaction-utils/combine-events.ts");
/* harmony import */ var _reaction_utils_hydrate_reaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../reaction-utils/hydrate-reaction */ "./library/reactions/src/reaction-utils/hydrate-reaction.ts");










/**
 * Dependency provider for other components to gain access to the reaction object.
 */
var ReactionModelDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionModelDirective(_reactionCore, el, view, _renderer) {
        this._reactionCore = _reactionCore;
        this.el = el;
        this.view = view;
        this._renderer = _renderer;
        /**
         * Destructor event
         */
        this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emits the reaction object.
         */
        this._reaction$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    Object.defineProperty(ReactionModelDirective.prototype, "reaction", {
        /**
         * Sets the reaction object.
         */
        set: function (reaction) {
            console.log('rgReaction setter', reaction);
            this._reaction$.next(reaction);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destructor
     */
    ReactionModelDirective.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    /**
     * Initialize
     */
    ReactionModelDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.reaction$ = this._reaction$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (val) { return console.log('reaction$', val); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        this.state$ = this.reaction$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (reaction) { return Object(_reaction_state_reaction_state__WEBPACK_IMPORTED_MODULE_6__["toReactionState"])(reaction); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        this.snapshot$ = this.reaction$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (reaction) { return Object(_reaction_snapshots_reaction_snapshot__WEBPACK_IMPORTED_MODULE_5__["toReactionSnapshot"])(reaction); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        this._renderer.addClass(this.el.nativeElement, 'rg-reaction');
        var toArray = function (cond, value) { return cond ? [value] : []; };
        var snapshot$ = this.snapshot$;
        var styles$ = [
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return s.css; })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.icon, 'rg-reaction-icon'); })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.secondary, 'rg-reaction-secondary'); })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.title, 'rg-reaction-title'); })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.tooltip, 'rg-reaction-tooltip'); })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.animate, 'rg-reaction-animate'); })),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return toArray(s.disabled, 'rg-reaction-disabled'); }))
        ];
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(styles$).pipe(
        // merge all the CSS arrays into a single array
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (values) { return values.reduce(function (acc, next) { return (acc.concat(next)); }, []); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])([]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var prev = _a[0], next = _a[1];
            return {
                add: next.filter(function (x) { return !prev.includes(x); }),
                remove: prev.filter(function (x) { return !next.includes(x); })
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed$)).subscribe(function (change) {
            change.add.forEach(function (css) { return _this._renderer.addClass(_this.el.nativeElement, css); });
            change.remove.forEach(function (css) { return _this._renderer.removeClass(_this.el.nativeElement, css); });
        });
        this.reaction$.pipe(Object(_reaction_utils_observables__WEBPACK_IMPORTED_MODULE_7__["withSwitchMap"])(function (reaction) { return Object(_reaction_utils_combine_events__WEBPACK_IMPORTED_MODULE_8__["combineEvents"])(_this.el, Object(_reaction_utils_hydrate_reaction__WEBPACK_IMPORTED_MODULE_9__["hydrateReaction"])(reaction).__REACTION__); }), Object(_reaction_utils_observables__WEBPACK_IMPORTED_MODULE_7__["withMergeMap"])(function (_a) {
            var reaction = _a[0], event = _a[1];
            return Object(_reaction_state_reaction_state__WEBPACK_IMPORTED_MODULE_6__["toReactionState"])(reaction).disabled;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (_a) {
            var value = _a[0], disabled = _a[1];
            return !disabled;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var value = _a[0], disabled = _a[1];
            return value;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed$)).subscribe(function (_a) {
            var reaction = _a[0], event = _a[1];
            return _this._reactionCore.broadcast(reaction, event.type, event, _this.el, _this.view);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('rgReaction'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], ReactionModelDirective.prototype, "reaction", null);
    ReactionModelDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[rgReaction]',
            exportAs: 'rgReaction'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_reaction_core_reaction_core_service__WEBPACK_IMPORTED_MODULE_4__["ReactionCoreService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ReactionModelDirective);
    return ReactionModelDirective;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-snapshots/reaction-snapshot.pipe.ts":
/*!****************************************************************************!*\
  !*** ./library/reactions/src/reaction-snapshots/reaction-snapshot.pipe.ts ***!
  \****************************************************************************/
/*! exports provided: ReactionSnapshotPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionSnapshotPipe", function() { return ReactionSnapshotPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _reaction_snapshot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reaction-snapshot */ "./library/reactions/src/reaction-snapshots/reaction-snapshot.ts");



var ReactionSnapshotPipe = /** @class */ (function () {
    function ReactionSnapshotPipe() {
    }
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    ReactionSnapshotPipe.prototype.transform = function (value) {
        return typeof value === 'object' ? Object(_reaction_snapshot__WEBPACK_IMPORTED_MODULE_2__["toReactionSnapshot"])(value) : undefined;
    };
    ReactionSnapshotPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'reactionSnapshot', pure: true })
    ], ReactionSnapshotPipe);
    return ReactionSnapshotPipe;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-snapshots/reaction-snapshot.ts":
/*!***********************************************************************!*\
  !*** ./library/reactions/src/reaction-snapshots/reaction-snapshot.ts ***!
  \***********************************************************************/
/*! exports provided: toReactionSnapshot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toReactionSnapshot", function() { return toReactionSnapshot; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _reaction_state_reaction_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reaction-state/reaction-state */ "./library/reactions/src/reaction-state/reaction-state.ts");



/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 */
function toReactionSnapshot(reaction) {
    var state$ = Object(_reaction_state_reaction_state__WEBPACK_IMPORTED_MODULE_2__["toReactionState"])(reaction);
    var combine$ = Object
        .keys(state$)
        .map(function (key) { return state$[key].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (value) { return ({ key: key, value: value }); })); });
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(combine$)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (values) { return values.reduce(function (acc, next) { return (acc[next.key] = next.value, acc); }, {}); }));
}


/***/ }),

/***/ "./library/reactions/src/reaction-state/reaction-state.ts":
/*!****************************************************************!*\
  !*** ./library/reactions/src/reaction-state/reaction-state.ts ***!
  \****************************************************************/
/*! exports provided: reactionReducer, reactionSharable, toReactionState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionReducer", function() { return reactionReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionSharable", function() { return reactionSharable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toReactionState", function() { return toReactionState; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _reaction_reaction_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction/reaction-description */ "./library/reactions/src/reaction/reaction-description.ts");
/* harmony import */ var _reaction_reaction_disabled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reaction/reaction-disabled */ "./library/reactions/src/reaction/reaction-disabled.ts");
/* harmony import */ var _reaction_reaction_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reaction/reaction-icon */ "./library/reactions/src/reaction/reaction-icon.ts");
/* harmony import */ var _reaction_reaction_order__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reaction/reaction-order */ "./library/reactions/src/reaction/reaction-order.ts");
/* harmony import */ var _reaction_reaction_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reaction/reaction-style */ "./library/reactions/src/reaction/reaction-style.ts");
/* harmony import */ var _reaction_reaction_title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reaction/reaction-title */ "./library/reactions/src/reaction/reaction-title.ts");
/* harmony import */ var _reaction_reaction_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reaction/reaction-tooltip */ "./library/reactions/src/reaction/reaction-tooltip.ts");
/* harmony import */ var _reaction_reaction_visible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../reaction/reaction-visible */ "./library/reactions/src/reaction/reaction-visible.ts");









/**
 * Applies all the reducers to create a state object.
 */
function reactionReducer(acc, reaction) {
    acc = Object(_reaction_reaction_description__WEBPACK_IMPORTED_MODULE_1__["reactionDescriptionReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_disabled__WEBPACK_IMPORTED_MODULE_2__["reactionDisabledReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_icon__WEBPACK_IMPORTED_MODULE_3__["reactionIconReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_order__WEBPACK_IMPORTED_MODULE_4__["reactionOrderReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_style__WEBPACK_IMPORTED_MODULE_5__["reactionStyleReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_title__WEBPACK_IMPORTED_MODULE_6__["reactionTitleReducer"])(acc, reaction);
    acc = Object(_reaction_reaction_tooltip__WEBPACK_IMPORTED_MODULE_7__["reactionTooltipReducer"])(acc, reaction);
    return Object(_reaction_reaction_visible__WEBPACK_IMPORTED_MODULE_8__["reactionVisibleReducer"])(acc, reaction);
}
/**
 * Applies operators to all of the object properties.
 */
function reactionSharable(state) {
    var lift = function (source) { return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["defaultIfEmpty"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])(1)); };
    return Object.keys(state).reduce(function (acc, key) { return (acc[key] = lift(state[key]), acc); }, {});
}
/**
 * Converts a reaction object into a ReactionStates object.
 */
function toReactionState(reaction) {
    return reactionSharable(reactionReducer({}, reaction));
}


/***/ }),

/***/ "./library/reactions/src/reaction-text/reaction-text.component.scss":
/*!**************************************************************************!*\
  !*** ./library/reactions/src/reaction-text/reaction-text.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaWJyYXJ5L3JlYWN0aW9ucy9zcmMvcmVhY3Rpb24tdGV4dC9yZWFjdGlvbi10ZXh0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./library/reactions/src/reaction-text/reaction-text.component.ts":
/*!************************************************************************!*\
  !*** ./library/reactions/src/reaction-text/reaction-text.component.ts ***!
  \************************************************************************/
/*! exports provided: ReactionTextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionTextComponent", function() { return ReactionTextComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
var ReactionTextComponent = /** @class */ (function () {
    function ReactionTextComponent() {
        /***
         * Show the icon
         */
        this.icon = true;
        /**
         * Show the secondary icon
         */
        this.secondary = true;
        /**
         * Show the title
         */
        this.title = true;
    }
    ReactionTextComponent.prototype.ngOnChanges = function (changes) {
        console.log({ changes: changes });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ReactionTextComponent.prototype, "icon", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ReactionTextComponent.prototype, "secondary", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ReactionTextComponent.prototype, "snapshot", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ReactionTextComponent.prototype, "title", void 0);
    ReactionTextComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rg-reaction-text',
            template: __webpack_require__(/*! raw-loader!./reaction-text.component.html */ "./node_modules/raw-loader/index.js!./library/reactions/src/reaction-text/reaction-text.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./reaction-text.component.scss */ "./library/reactions/src/reaction-text/reaction-text.component.scss")]
        })
    ], ReactionTextComponent);
    return ReactionTextComponent;
}());



/***/ }),

/***/ "./library/reactions/src/reaction-utils/combine-events.ts":
/*!****************************************************************!*\
  !*** ./library/reactions/src/reaction-utils/combine-events.ts ***!
  \****************************************************************/
/*! exports provided: combineEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineEvents", function() { return combineEvents; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observables */ "./library/reactions/src/reaction-utils/observables.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");



function combineEvents(el, hooks) {
    var events$ = hooks.map(function (_a) {
        var type = _a.type, debounce = _a.debounce;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el.nativeElement, type)
            .pipe(Object(_observables__WEBPACK_IMPORTED_MODULE_1__["throttleTimeIf"])(Boolean(debounce), debounce));
    });
    return rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"].apply(void 0, events$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (event) { return event.preventDefault(); }));
}


/***/ }),

/***/ "./library/reactions/src/reaction-utils/hydrate-reaction.ts":
/*!******************************************************************!*\
  !*** ./library/reactions/src/reaction-utils/hydrate-reaction.ts ***!
  \******************************************************************/
/*! exports provided: hydrateReaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrateReaction", function() { return hydrateReaction; });
/**
 * Copies the properties defined by the decorator to a reaction instance.
 */
function hydrateReaction(reaction) {
    var func = reaction.constructor;
    if (func && func.__REACTION__) {
        Object.keys(func.__REACTION__)
            .filter(function (key) { return !reaction.hasOwnProperty(key); })
            .reduce(function (acc, key) { return (acc[key] = func.__REACTION__[key], acc); }, reaction);
        delete func.__REACTION__;
    }
    if (!reaction.__REACTION__) {
        reaction.__REACTION__ = [];
    }
    return reaction;
}


/***/ }),

/***/ "./library/reactions/src/reaction-utils/observables.ts":
/*!*************************************************************!*\
  !*** ./library/reactions/src/reaction-utils/observables.ts ***!
  \*************************************************************/
/*! exports provided: toObservable, withSwitchMap, withMergeMap, throttleTimeIf, negate, disabledWhen, enabledWhen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toObservable", function() { return toObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withSwitchMap", function() { return withSwitchMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withMergeMap", function() { return withMergeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleTimeIf", function() { return throttleTimeIf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disabledWhen", function() { return disabledWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enabledWhen", function() { return enabledWhen; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");


/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 */
function toObservable(value) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(value) ? value : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(value);
}
/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
function withSwitchMap(inner) {
    return function (source) {
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (a) { return inner(a).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (b) { return [a, b]; })); }));
    };
}
/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
function withMergeMap(inner) {
    return function (source) {
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])(function (a) { return inner(a).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (b) { return [a, b]; })); }));
    };
}
/**
 * Conditionally apply a throttle time operator.
 */
function throttleTimeIf(cond, duration) {
    return function (source) {
        return cond ? source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(duration)) : source;
    };
}
/**
 * Maps values to an inverted boolean.
 */
function negate() {
    return function (source) { return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (val) { return !val; })); };
}
/**
 * Disables emitting of values while the passed observable emits true.
 */
function disabledWhen(disabled) {
    return function (source) {
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(disabled.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["defaultIfEmpty"])(false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(Boolean), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])())), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_a) {
            var value = _a[0], disabled = _a[1];
            return !disabled;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
            var value = _a[0];
            return value;
        }));
    };
}
/**
 * Enables emitting of values while the passed observable emits true.
 */
function enabledWhen(enabled) {
    return function (source) { return source.pipe(disabledWhen(enabled.pipe(negate()))); };
}


/***/ }),

/***/ "./library/reactions/src/reaction-utils/reaction-value.ts":
/*!****************************************************************!*\
  !*** ./library/reactions/src/reaction-utils/reaction-value.ts ***!
  \****************************************************************/
/*! exports provided: toReactionValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toReactionValue", function() { return toReactionValue; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observables */ "./library/reactions/src/reaction-utils/observables.ts");


/**
 * Converts the value to an observable. If the value is a function it is called recursively until a literal or observable
 * is returned.
 */
function toReactionValue(value, _default) {
    if (_default === void 0) { _default = undefined; }
    if (value === undefined) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(_default);
    }
    if (typeof value === 'function') {
        return toReactionValue(value(), _default);
    }
    return Object(_observables__WEBPACK_IMPORTED_MODULE_1__["toObservable"])(value);
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-description.ts":
/*!****************************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-description.ts ***!
  \****************************************************************/
/*! exports provided: reactionDescriptionReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionDescriptionReducer", function() { return reactionDescriptionReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionDescriptionReducer(acc, next) {
    var description = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.description);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { description: description });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-disabled.ts":
/*!*************************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-disabled.ts ***!
  \*************************************************************/
/*! exports provided: reactionDisabledReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionDisabledReducer", function() { return reactionDisabledReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionDisabledReducer(acc, next) {
    var disabled = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.disabled, false);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { disabled: disabled });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-icon.ts":
/*!*********************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-icon.ts ***!
  \*********************************************************/
/*! exports provided: ReactionIconAnimate, reactionIconReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionIconAnimate", function() { return ReactionIconAnimate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionIconReducer", function() { return reactionIconReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Supported types of animation.
 *
 * These are currently limited to what FontAwesome supports.
 */
var ReactionIconAnimate;
(function (ReactionIconAnimate) {
    ReactionIconAnimate["SPIN"] = "spin";
    ReactionIconAnimate["PULSE"] = "pulse";
})(ReactionIconAnimate || (ReactionIconAnimate = {}));
/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionIconReducer(acc, next) {
    var icon = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.icon);
    var animate = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.animate);
    var secondary = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.secondary);
    var secondaryAnimate = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.secondaryAnimate);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { icon: icon, animate: animate, secondary: secondary, secondaryAnimate: secondaryAnimate });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-order.ts":
/*!**********************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-order.ts ***!
  \**********************************************************/
/*! exports provided: reactionOrderReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionOrderReducer", function() { return reactionOrderReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionOrderReducer(acc, next) {
    var order = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.order, '0');
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { order: order });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-style.ts":
/*!**********************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-style.ts ***!
  \**********************************************************/
/*! exports provided: reactionStyleReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionStyleReducer", function() { return reactionStyleReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");



/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionStyleReducer(acc, next) {
    var css = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_2__["toReactionValue"])(next.css).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (value) {
        var values = typeof value === 'string' ? value.split(' ') : (value || []);
        return Array.from(new Set(values.map(function (str) { return str.trim(); }).filter(Boolean)));
    }));
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { css: css });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-title.ts":
/*!**********************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-title.ts ***!
  \**********************************************************/
/*! exports provided: reactionTitleReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionTitleReducer", function() { return reactionTitleReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionTitleReducer(acc, next) {
    var title = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.title, 'n/a');
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { title: title });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-tooltip.ts":
/*!************************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-tooltip.ts ***!
  \************************************************************/
/*! exports provided: reactionTooltipReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionTooltipReducer", function() { return reactionTooltipReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionTooltipReducer(acc, next) {
    var tooltip = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.tooltip);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { tooltip: tooltip });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction-visible.ts":
/*!************************************************************!*\
  !*** ./library/reactions/src/reaction/reaction-visible.ts ***!
  \************************************************************/
/*! exports provided: reactionVisibleReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionVisibleReducer", function() { return reactionVisibleReducer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reaction-utils/reaction-value */ "./library/reactions/src/reaction-utils/reaction-value.ts");


/**
 * Updates a state object with more observable properties from the reaction.
 */
function reactionVisibleReducer(acc, next) {
    var visible = Object(_reaction_utils_reaction_value__WEBPACK_IMPORTED_MODULE_1__["toReactionValue"])(next.visible, true);
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, { visible: visible });
}


/***/ }),

/***/ "./library/reactions/src/reaction/reaction.ts":
/*!****************************************************!*\
  !*** ./library/reactions/src/reaction/reaction.ts ***!
  \****************************************************/
/*! exports provided: reactionMetaData, reactionInjectable, Reaction, reactionClass, reactionMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionMetaData", function() { return reactionMetaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionInjectable", function() { return reactionInjectable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionClass", function() { return reactionClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactionMethod", function() { return reactionMethod; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * Sets the meta data on the constructor function.
 */
var reactionMetaData = function (clss, options) {
    options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options);
    delete options.providedIn;
    return (clss.__REACTION__ = options, clss);
};
/**
 * Calls the injectable decorator from Angular.
 */
var reactionInjectable = function (clss, options) { return options.hasOwnProperty('providedIn')
    ? Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: options.providedIn })(clss)
    : Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()(clss); };
/**
 * Applies the required decorator based upon the argument types.
 */
function Reaction() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1 && typeof args[0] === 'object') {
        return reactionClass(args[0]);
    }
    else if (args.length >= 1 && args.length <= 2 && typeof args[0] === 'string') {
        return reactionMethod(args[0], args.length === 2 ? args[1] : 0);
    }
}
/**
 * The class decorator function.
 */
function reactionClass(options) {
    return function (func) { return reactionInjectable(reactionMetaData(func, options), options); };
}
/**
 * The method decorator function.
 */
function reactionMethod(type, debounce) {
    return function (target, methodName, descriptor) {
        if (!target.__REACTION__) {
            target.__REACTION__ = [];
        }
        if (typeof target[methodName] === 'function') {
            target.__REACTION__.push({ type: type, debounce: debounce, method: target[methodName] });
        }
        return descriptor;
    };
}


/***/ }),

/***/ "./library/reactions/src/reactions.module.ts":
/*!***************************************************!*\
  !*** ./library/reactions/src/reactions.module.ts ***!
  \***************************************************/
/*! exports provided: ReactionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionsModule", function() { return ReactionsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _reaction_model_reaction_model_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reaction-model/reaction-model.directive */ "./library/reactions/src/reaction-model/reaction-model.directive.ts");
/* harmony import */ var _reaction_snapshots_reaction_snapshot_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reaction-snapshots/reaction-snapshot.pipe */ "./library/reactions/src/reaction-snapshots/reaction-snapshot.pipe.ts");
/* harmony import */ var _reaction_text_reaction_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reaction-text/reaction-text.component */ "./library/reactions/src/reaction-text/reaction-text.component.ts");








var ReactionsModule = /** @class */ (function () {
    function ReactionsModule() {
    }
    ReactionsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeModule"]
            ],
            declarations: [
                _reaction_model_reaction_model_directive__WEBPACK_IMPORTED_MODULE_5__["ReactionModelDirective"],
                _reaction_snapshots_reaction_snapshot_pipe__WEBPACK_IMPORTED_MODULE_6__["ReactionSnapshotPipe"],
                _reaction_text_reaction_text_component__WEBPACK_IMPORTED_MODULE_7__["ReactionTextComponent"]
            ],
            providers: [
                _reaction_snapshots_reaction_snapshot_pipe__WEBPACK_IMPORTED_MODULE_6__["ReactionSnapshotPipe"]
            ],
            exports: [
                _reaction_model_reaction_model_directive__WEBPACK_IMPORTED_MODULE_5__["ReactionModelDirective"],
                _reaction_snapshots_reaction_snapshot_pipe__WEBPACK_IMPORTED_MODULE_6__["ReactionSnapshotPipe"],
                _reaction_text_reaction_text_component__WEBPACK_IMPORTED_MODULE_7__["ReactionTextComponent"]
            ]
        })
    ], ReactionsModule);
    return ReactionsModule;
}());



/***/ }),

/***/ "./node_modules/raw-loader/index.js!./library/reactions/src/reaction-text/reaction-text.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./library/reactions/src/reaction-text/reaction-text.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"snapshot\">\n  <fa-icon *ngIf=\"icon && snapshot.icon\"\n           class=\"rg-reaction-icon\"\n           [fixedWidth]=\"true\"\n           [icon]=\"snapshot.icon\"\n           [pulse]=\"snapshot.animate === 'pulse'\"\n           [spin]=\"snapshot.animate === 'spin'\"></fa-icon>\n  <span *ngIf=\"title\"\n        class=\"rg-reaction-text\">{{snapshot.title}}</span>\n  <fa-icon *ngIf=\"secondary && snapshot.secondary\"\n           class=\"rg-reaction-secondary\"\n           [fixedWidth]=\"true\"\n           [icon]=\"snapshot.secondary\"></fa-icon>\n</ng-container>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/demo-card/demo-card.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/demo-card/demo-card.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  demo-card works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/demo/demo.component.html":
/*!********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/demo/demo.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container m-3\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <button *ngFor=\"let reaction of reactions\"\n              [rgReaction]=\"reaction\" #rgReaction=\"rgReaction\">\n        <rg-reaction-text [icon]=\"false\"\n                          [snapshot]=\"rgReaction.snapshot$ | async\"></rg-reaction-text>\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _library_reactions_src_reactions_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../library/reactions/src/reactions.module */ "./library/reactions/src/reactions.module.ts");
/* harmony import */ var _demo_demo_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./demo/demo.component */ "./src/app/demo/demo.component.ts");
/* harmony import */ var _demo_card_demo_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./demo-card/demo-card.component */ "./src/app/demo-card/demo-card.component.ts");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _library_reactions_src_reactions_module__WEBPACK_IMPORTED_MODULE_6__["ReactionsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _reactgular_logger__WEBPACK_IMPORTED_MODULE_9__["LoggerModule"].forRoot({ enabled: !_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].production })
            ],
            declarations: [
                _demo_demo_component__WEBPACK_IMPORTED_MODULE_7__["DemoComponent"],
                _demo_card_demo_card_component__WEBPACK_IMPORTED_MODULE_8__["DemoCardComponent"]
            ],
            providers: [],
            bootstrap: [
                _demo_demo_component__WEBPACK_IMPORTED_MODULE_7__["DemoComponent"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/demo-card/demo-card.component.scss":
/*!****************************************************!*\
  !*** ./src/app/demo-card/demo-card.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RlbW8tY2FyZC9kZW1vLWNhcmQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/demo-card/demo-card.component.ts":
/*!**************************************************!*\
  !*** ./src/app/demo-card/demo-card.component.ts ***!
  \**************************************************/
/*! exports provided: DemoCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoCardComponent", function() { return DemoCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DemoCardComponent = /** @class */ (function () {
    function DemoCardComponent() {
    }
    DemoCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rg-demo-card',
            template: __webpack_require__(/*! raw-loader!./demo-card.component.html */ "./node_modules/raw-loader/index.js!./src/app/demo-card/demo-card.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./demo-card.component.scss */ "./src/app/demo-card/demo-card.component.scss")]
        })
    ], DemoCardComponent);
    return DemoCardComponent;
}());



/***/ }),

/***/ "./src/app/demo/demo.component.scss":
/*!******************************************!*\
  !*** ./src/app/demo/demo.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RlbW8vZGVtby5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/demo/demo.component.ts":
/*!****************************************!*\
  !*** ./src/app/demo/demo.component.ts ***!
  \****************************************/
/*! exports provided: TOP_BAR_TOKEN, DemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOP_BAR_TOKEN", function() { return TOP_BAR_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoComponent", function() { return DemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _library_reactions_src_reaction_core_reaction_core_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../library/reactions/src/reaction-core/reaction-core.service */ "./library/reactions/src/reaction-core/reaction-core.service.ts");
/* harmony import */ var _reactions_create_reaction_create_reaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reactions/create-reaction/create-reaction */ "./src/app/reactions/create-reaction/create-reaction.ts");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");







var TOP_BAR_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('TOP_BAR_TOKEN');
var DemoComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function DemoComponent(reactions, _reactionCore, log) {
        this.reactions = reactions;
        this._reactionCore = _reactionCore;
        /**
         * Destructor event
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._log = log.withPrefix(DemoComponent_1.name);
        this._log.info({ reactions: reactions });
    }
    DemoComponent_1 = DemoComponent;
    /**
     * Destructor
     */
    DemoComponent.prototype.ngOnDestroy = function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    /**
     * Initialization
     */
    DemoComponent.prototype.ngOnInit = function () {
        this._reactionCore.events$.pipe(this._log.tap().log('events'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$)).subscribe(function (event) { return console.log('Demo:', event); });
    };
    var DemoComponent_1;
    DemoComponent = DemoComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rg-demo',
            template: __webpack_require__(/*! raw-loader!./demo.component.html */ "./node_modules/raw-loader/index.js!./src/app/demo/demo.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            providers: [
                { provide: TOP_BAR_TOKEN, useClass: _reactions_create_reaction_create_reaction__WEBPACK_IMPORTED_MODULE_5__["CreateReaction"], multi: true }
            ],
            styles: [__webpack_require__(/*! ./demo.component.scss */ "./src/app/demo/demo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(TOP_BAR_TOKEN)),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Array, _library_reactions_src_reaction_core_reaction_core_service__WEBPACK_IMPORTED_MODULE_4__["ReactionCoreService"],
            _reactgular_logger__WEBPACK_IMPORTED_MODULE_6__["LogService"]])
    ], DemoComponent);
    return DemoComponent;
}());



/***/ }),

/***/ "./src/app/reactions/create-reaction/create-reaction.ts":
/*!**************************************************************!*\
  !*** ./src/app/reactions/create-reaction/create-reaction.ts ***!
  \**************************************************************/
/*! exports provided: CreateReaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateReaction", function() { return CreateReaction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");
/* harmony import */ var _library_reactions_src_reaction_reaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../library/reactions/src/reaction/reaction */ "./library/reactions/src/reaction/reaction.ts");



var CreateReaction = /** @class */ (function () {
    function CreateReaction(log) {
        this._log = log.withPrefix(CreateReaction_1.name);
        this._log.info('constructor');
    }
    CreateReaction_1 = CreateReaction;
    // @ReactionHook('click')
    CreateReaction.prototype.click = function (event) {
        this._log.info('click', event);
    };
    /**
     * Gets the icon state
     */
    CreateReaction.prototype.icon = function () {
        return 'fa-plus';
    };
    /**
     * Gets the title state
     */
    CreateReaction.prototype.title = function () {
        return 'Create';
    };
    var CreateReaction_1;
    CreateReaction = CreateReaction_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_library_reactions_src_reaction_reaction__WEBPACK_IMPORTED_MODULE_2__["Reaction"])({ order: 'demo:000' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_reactgular_logger__WEBPACK_IMPORTED_MODULE_1__["LogService"]])
    ], CreateReaction);
    return CreateReaction;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nickf/github/reactgular/reactions/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map