(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/fesm5/reactgular-reactions.js":
/*!********************************************!*\
  !*** ./dist/fesm5/reactgular-reactions.js ***!
  \********************************************/
/*! exports provided: Reaction, ReactionClassDirective, ReactionClassModule, ReactionClickDirective, ReactionClickModule, ReactionCoreService, ReactionEvent, ReactionIconAnimate, ReactionKeyboardService, ReactionModelDirective, ReactionModelModule, ReactionProvider, ReactionShortcutService, ReactionSnapshotsModule, ReactionSnapshotsPipe, ReactionSortModule, ReactionSortPipe, ReactionStateModule, ReactionStatePipe, ReactionTextComponent, ReactionTextModule, ReactionTooltipDirective, ReactionTooltipModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionClassDirective", function() { return ReactionClassDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionClassModule", function() { return ReactionClassModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionClickDirective", function() { return ReactionClickDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionClickModule", function() { return ReactionClickModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionCoreService", function() { return ReactionCoreService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionEvent", function() { return ReactionEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionIconAnimate", function() { return ReactionIconAnimate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionKeyboardService", function() { return ReactionKeyboardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionModelDirective", function() { return ReactionModelDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionModelModule", function() { return ReactionModelModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionProvider", function() { return ReactionProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionShortcutService", function() { return ReactionShortcutService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionSnapshotsModule", function() { return ReactionSnapshotsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionSnapshotsPipe", function() { return ReactionSnapshotsPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionSortModule", function() { return ReactionSortModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionSortPipe", function() { return ReactionSortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionStateModule", function() { return ReactionStateModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionStatePipe", function() { return ReactionStatePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionTextComponent", function() { return ReactionTextComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionTextModule", function() { return ReactionTextModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionTooltipDirective", function() { return ReactionTooltipDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactionTooltipModule", function() { return ReactionTooltipModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 * @template TType
 * @param {?} value
 * @return {?}
 */
function toObservable(value) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(value) ? value : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(value);
}
/**
 * Emits the inner observable value with the outer observable value as a pair array.
 * @template T, R
 * @param {?} inner
 * @return {?}
 */
function withSwitchMap(inner) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return inner(a).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} b
         * @return {?}
         */
        function (b) { return (/** @type {?} */ ([a, b])); }))); })));
    });
}
/**
 * Conditionally apply a throttle time operator.
 * @template T
 * @param {?} cond
 * @param {?} duration
 * @return {?}
 */
function throttleTimeIf(cond, duration) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return cond ? source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["throttleTime"])(duration)) : source;
    });
}
/**
 * Disables emitting of values while the passed observable emits true.
 * @template T
 * @param {?} disabled
 * @return {?}
 */
function disabledWhen(disabled) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(disabled.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])(false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(Boolean), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])())), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), value = _b[0], disabled = _b[1];
            return !disabled;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), value = _b[0];
            return value;
        })));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Converts the value to an observable. If the value is a function it is called recursively until a literal or observable
 * is returned.
 * @template TType
 * @param {?} value
 * @param {?=} _default
 * @return {?}
 */
function toReactionValue(value, _default) {
    if (_default === void 0) { _default = undefined; }
    if (value === undefined) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_default);
    }
    if (typeof value === 'function') {
        return toReactionValue(value(), _default);
    }
    return toObservable(value);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionDescriptionReducer(acc, next) {
    /** @type {?} */
    var description = toReactionValue(next.description);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { description: description });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionDisabledReducer(acc, next) {
    /** @type {?} */
    var disabled = toReactionValue(next.disabled, false);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { disabled: disabled });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var ReactionIconAnimate = {
    SPIN: 'spin',
    PULSE: 'pulse',
};
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionIconReducer(acc, next) {
    /** @type {?} */
    var icon = toReactionValue(next.icon);
    /** @type {?} */
    var animate = toReactionValue(next.animate);
    /** @type {?} */
    var secondary = toReactionValue(next.secondary);
    /** @type {?} */
    var secondaryAnimate = toReactionValue(next.secondaryAnimate);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { icon: icon, animate: animate, secondary: secondary, secondaryAnimate: secondaryAnimate });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionOrderReducer(acc, next) {
    /** @type {?} */
    var order = toReactionValue(next.order, 0);
    /** @type {?} */
    var group = toReactionValue(next.group, 0);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { order: order, group: group });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionStyleReducer(acc, next) {
    /** @type {?} */
    var css = toReactionValue(next.css).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var values = typeof value === 'string' ? value.split(' ') : (value || []);
        return Array.from(new Set(values.map((/**
         * @param {?} str
         * @return {?}
         */
        function (str) { return str.trim(); })).filter(Boolean)));
    })));
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { css: css });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionTitleReducer(acc, next) {
    /** @type {?} */
    var title = toReactionValue(next.title, '');
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { title: title });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionTooltipReducer(acc, next) {
    /** @type {?} */
    var tooltip = toReactionValue(next.tooltip);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { tooltip: tooltip });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Updates a state object with more observable properties from the reaction.
 * @param {?} acc
 * @param {?} next
 * @return {?}
 */
function reactionVisibleReducer(acc, next) {
    /** @type {?} */
    var visible = toReactionValue(next.visible, true);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { visible: visible });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copies the properties defined by the decorator to a reaction instance.
 * @param {?} reaction
 * @return {?}
 */
function hydrateReaction(reaction) {
    /** @type {?} */
    var func = (/** @type {?} */ (reaction.constructor));
    if (func && func.__REACTION__) {
        Object.keys(func.__REACTION__)
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return !reaction.hasOwnProperty(key); }))
            .reduce((/**
         * @param {?} acc
         * @param {?} key
         * @return {?}
         */
        function (acc, key) { return (acc[key] = func.__REACTION__[key], acc); }), reaction);
        delete func.__REACTION__;
    }
    if (!reaction.__REACTION__) {
        reaction.__REACTION__ = [];
    }
    return reaction;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies all the reducers to create a state object.
 * @param {?} acc
 * @param {?} reaction
 * @return {?}
 */
function reactionReducer(acc, reaction) {
    acc = reactionDescriptionReducer(acc, reaction);
    acc = reactionDisabledReducer(acc, reaction);
    acc = reactionIconReducer(acc, reaction);
    acc = reactionOrderReducer(acc, reaction);
    acc = reactionStyleReducer(acc, reaction);
    acc = reactionTitleReducer(acc, reaction);
    acc = reactionTooltipReducer(acc, reaction);
    return (/** @type {?} */ (reactionVisibleReducer(acc, reaction)));
}
/**
 * Applies operators to all of the object properties.
 * @param {?} state
 * @return {?}
 */
function reactionSharable(state) {
    /** @type {?} */
    var lift = (/**
     * @param {?} source
     * @return {?}
     */
    function (source) { return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1)); });
    return (/** @type {?} */ (Object.keys(state).reduce((/**
     * @param {?} acc
     * @param {?} key
     * @return {?}
     */
    function (acc, key) { return (acc[key] = lift(state[key]), acc); }), {})));
}
/**
 * Converts a reaction object into a ReactionStates object.
 * @param {?} reaction
 * @return {?}
 */
function toReactionState(reaction) {
    if (!reaction.__STATE__) {
        reaction.__STATE__ = reactionSharable(reactionReducer({}, hydrateReaction(reaction)));
    }
    return reaction.__STATE__;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Creates an observable that emits a snapshots (state object) of a reaction.
 * @param {?} reaction
 * @return {?}
 */
function toReactionSnapshot(reaction) {
    if (!reaction.__SNAPSHOT__) {
        /** @type {?} */
        var state$_1 = toReactionState(reaction);
        /** @type {?} */
        var combine$ = Object
            .keys(state$_1)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return state$_1[key].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ key: key, value: value }); }))); }));
        reaction.__SNAPSHOT__ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(combine$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return (/** @type {?} */ (values.reduce((/**
         * @param {?} acc
         * @param {?} next
         * @return {?}
         */
        function (acc, next) { return (acc[next.key] = next.value, acc); }), {}))); })));
    }
    return reaction.__SNAPSHOT__;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionProvider = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionProvider() {
        /**
         * Emits the reaction object.
         */
        this._reaction$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.reaction$ = this._reaction$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((/**
         * @param {?} reaction
         * @return {?}
         */
        function (reaction) { return typeof reaction === 'object'; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(hydrateReaction), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        this.state$ = this.reaction$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(toReactionState), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        this.snapshot$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(toReactionSnapshot), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
    }
    /**
     * Sets the reaction object.
     */
    /**
     * Sets the reaction object.
     * @param {?} reaction
     * @return {?}
     */
    ReactionProvider.prototype.set = /**
     * Sets the reaction object.
     * @param {?} reaction
     * @return {?}
     */
    function (reaction) {
        this._reaction$.next((/** @type {?} */ (reaction)));
    };
    ReactionProvider.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    ReactionProvider.ctorParameters = function () { return []; };
    return ReactionProvider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionClassDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionClassDirective(_reactionProvider, _el, _renderer) {
        this._reactionProvider = _reactionProvider;
        this._el = _el;
        this._renderer = _renderer;
        /**
         * Destructor event
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * Destructor
     */
    /**
     * Destructor
     * @return {?}
     */
    ReactionClassDirective.prototype.ngOnDestroy = /**
     * Destructor
     * @return {?}
     */
    function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    /**
     * Initialize
     */
    /**
     * Initialize
     * @return {?}
     */
    ReactionClassDirective.prototype.ngOnInit = /**
     * Initialize
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderer.addClass(this._el.nativeElement, 'rg-reaction');
        /** @type {?} */
        var snapshot$ = this._reactionProvider.snapshot$;
        /** @type {?} */
        var toArray = (/**
         * @param {?} cond
         * @param {?} value
         * @return {?}
         */
        function (cond, value) { return cond ? [value] : []; });
        /** @type {?} */
        var styles$ = [
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.css; }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.icon, 'rg-reaction-icon'); }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.secondary, 'rg-reaction-secondary'); }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.title, 'rg-reaction-title'); }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.tooltip, 'rg-reaction-tooltip'); }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.animate, 'rg-reaction-animate'); }))),
            snapshot$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return toArray(s.disabled, 'rg-reaction-disabled'); })))
        ];
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(styles$).pipe(
        // merge all the CSS arrays into a single array
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values.reduce((/**
         * @param {?} acc
         * @param {?} next
         * @return {?}
         */
        function (acc, next) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(acc, next)); }), []); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])([]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), prev = _b[0], next = _b[1];
            return {
                add: next.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !prev.includes(x); })),
                remove: prev.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !next.includes(x); }))
            };
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$)).subscribe((/**
         * @param {?} change
         * @return {?}
         */
        function (change) {
            change.add.forEach((/**
             * @param {?} css
             * @return {?}
             */
            function (css) { return _this._renderer.addClass(_this._el.nativeElement, css); }));
            change.remove.forEach((/**
             * @param {?} css
             * @return {?}
             */
            function (css) { return _this._renderer.removeClass(_this._el.nativeElement, css); }));
        }));
    };
    ReactionClassDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{ selector: '[rgReactionClass]' },] }
    ];
    /** @nocollapse */
    ReactionClassDirective.ctorParameters = function () { return [
        { type: ReactionProvider },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }
    ]; };
    return ReactionClassDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionClassModule = /** @class */ (function () {
    function ReactionClassModule() {
    }
    ReactionClassModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionClassDirective],
                    exports: [ReactionClassDirective]
                },] }
    ];
    return ReactionClassModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base interface for all reaction events.
 */
var  /**
 * Base interface for all reaction events.
 */
ReactionEvent = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionEvent(id, type, reaction, payload, el, view) {
        this.id = id;
        this.type = type;
        this.reaction = hydrateReaction(reaction);
        this._payload = payload;
        this.el = el;
        this.view = view;
    }
    /**
     * The original event that triggered this event.
     */
    /**
     * The original event that triggered this event.
     * @template TType
     * @return {?}
     */
    ReactionEvent.prototype.payload = /**
     * The original event that triggered this event.
     * @template TType
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this._payload));
    };
    return ReactionEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default with all keys disabled.
 * @type {?}
 */
var REACTION_CODE_MODIFIERS = Object.freeze({
    metaKey: false,
    altKey: false,
    ctrlKey: false
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Expects one or mode code strings like "click, ctrl+n"
 * @type {?}
 */
var reactionCodeParser = (/**
 * @param {?} codes
 * @return {?}
 */
function (codes) {
    return codes.split(',').map(reactionCodeTokens).map(reactionCode);
});
/**
 * Converts a string of reaction codes into a collection of code tokens. A reaction code looks like "ctrl+m" and you can
 * define multiple codes using a "," separator.
 * @type {?}
 */
var reactionCodeTokens = (/**
 * @param {?} str
 * @return {?}
 */
function (str) {
    return str.trim().replace(/\s/g, '').split('+').map(rewriteValue).map(reactionCodeToken);
});
/**
 * Converts a collection of tokens into a parsed reaction code.
 * @type {?}
 */
var reactionCode = (/**
 * @param {?} tokens
 * @return {?}
 */
function (tokens) {
    return ({ type: reactionRemoveModifiers(tokens), modifiers: reactionKeyModifiers(tokens) });
});
/**
 * Converts a single reaction code string to a token.
 * @type {?}
 */
var reactionCodeToken = (/**
 * @param {?} value
 * @return {?}
 */
function (value) {
    return ({ type: isCodeModifier(value) ? 'modifier' : 'type', value: value });
});
/**
 * True if the string is a keyboard modifier.
 * @type {?}
 */
var isCodeModifier = (/**
 * @param {?} value
 * @return {?}
 */
function (value) { return Boolean(value.match(/^(ctrl|alt|meta)$/i)); });
/**
 * Rewrites reaction code values.
 * @param {?} value
 * @return {?}
 */
function rewriteValue(value) {
    // a map would be faster, but won't show as untested in coverage report when a key is added.
    if (value === 'delete') {
        return 'del';
    }
    else if (value === 'escape') {
        return 'esc';
    }
    else if (value === 'back') {
        return 'backspace';
    }
    else if (value === 'cmd' || value === 'command') {
        return 'meta';
    }
    else if (value === 'doubleclick') {
        return 'dblclick';
    }
    else if (value === 'control') {
        return 'ctrl';
    }
    return value;
}
/**
 * Returns the type code with modifiers removed.
 * @param {?} tokens
 * @return {?}
 */
function reactionRemoveModifiers(tokens) {
    return tokens
        .filter((/**
     * @param {?} token
     * @return {?}
     */
    function (token) { return token.type === 'type'; }))
        .map((/**
     * @param {?} token
     * @return {?}
     */
    function (token) { return token.value; }))
        .join(' ');
}
/**
 * Parses the key modifiers for a string. For example; CTRL+N
 * @param {?} tokens
 * @return {?}
 */
function reactionKeyModifiers(tokens) {
    return tokens
        .filter((/**
     * @param {?} token
     * @return {?}
     */
    function (token) { return token.type === 'modifier'; }))
        .reduce((/**
     * @param {?} acc
     * @param {?} token
     * @return {?}
     */
    function (acc, token) {
        if (token.value === 'ctrl') {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { ctrlKey: true });
        }
        else if (token.value === 'alt') {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { altKey: true });
        }
        else if (token.value === 'meta') {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { metaKey: true });
        }
        throw new Error('Unsupported modifier');
    }), REACTION_CODE_MODIFIERS);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionShortcutService = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionShortcutService(_doc) {
        this._doc = _doc;
        this.esc$ = this.code('escape').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(undefined));
        this.enter$ = this.code('enter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(undefined));
        this.del$ = this.code('delete, backspace').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(undefined));
    }
    /**
     * Emits when keyboard keys have been pressed.
     */
    /**
     * Emits when keyboard keys have been pressed.
     * @param {?} type
     * @return {?}
     */
    ReactionShortcutService.prototype.code = /**
     * Emits when keyboard keys have been pressed.
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var codes = reactionCodeParser(type);
        /** @type {?} */
        var matchCode = (/**
         * @param {?} event
         * @param {?} code
         * @return {?}
         */
        function (event, code) {
            return event.key === code.type
                && event.ctrlKey === code.modifiers.ctrlKey
                && event.altKey === code.modifiers.altKey
                && event.metaKey === code.modifiers.metaKey;
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this._doc, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return codes.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return matchCode(event, c); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(Boolean));
    };
    ReactionShortcutService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ReactionShortcutService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] }
    ]; };
    /** @nocollapse */ ReactionShortcutService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ReactionShortcutService_Factory() { return new ReactionShortcutService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"])); }, token: ReactionShortcutService, providedIn: "root" });
    return ReactionShortcutService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * UI events are broadcast from this service and reactions can act upon those events. Events are things like mouse events, keyboard
 * events, etc.. etc..
 */
var ReactionCoreService = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionCoreService(_doc, _shortcut) {
        this._doc = _doc;
        this._shortcut = _shortcut;
        /**
         * Destruction event
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Disabled when above zero. Increments and decrements to support nested disabling.
         */
        this._disabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        /**
         * Emits if reactions are disabled.
         */
        this.disabled$ = this._disabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        /**
         * The internal ID for emitted events.
         */
        this._nextId = 1;
        this._events$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.events$ = this._events$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$));
        this.events$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$)).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var hook = event.reaction.__REACTION__.find((/**
             * @param {?} hook
             * @return {?}
             */
            function (hook) { return hook.type === event.type; }));
            if (hook) {
                hook.method.apply(event.reaction, event);
            }
        }));
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
        get: /**
         * Only emits the escape key when reactions are enabled. This prevents a popup dialog which listens for ESC to close
         * from triggering behaviors elsewhere in the application on ESC.
         *
         * For example; you could select multiple items and then open a dialog to multi-edit those items. You would want the
         * ESC key to close the dialog instead of deselecting the items.
         *
         * \@todo Maybe a priority setting for binding to hotkeys would be better.
         * @return {?}
         */
        function () {
            return this._shortcut.esc$.pipe(disabledWhen(this._disabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(Boolean))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactionCoreService.prototype, "nextId", {
        /**
         * The next ID for emitted events.
         */
        get: /**
         * The next ID for emitted events.
         * @return {?}
         */
        function () {
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
    /**
     * Bootstraps a reaction when it's being created.
     *
     * @deprecated use hydrate instead.
     * @param {?} reaction
     * @return {?}
     */
    ReactionCoreService.prototype.bootstrap = /**
     * Bootstraps a reaction when it's being created.
     *
     * @deprecated use hydrate instead.
     * @param {?} reaction
     * @return {?}
     */
    function (reaction) {
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
    /**
     * Disables emitting shortcut events until the observable emits.
     * @param {?} until$
     * @return {?}
     */
    ReactionCoreService.prototype.disableUntil = /**
     * Disables emitting shortcut events until the observable emits.
     * @param {?} until$
     * @return {?}
     */
    function (until$) {
        var _this = this;
        this._disabled$.next(this._disabled$.value + 1);
        until$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])((/**
         * @return {?}
         */
        function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(undefined); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$)).subscribe((/**
         * @return {?}
         */
        function () { return _this._disabled$.next(_this._disabled$.value - 1); }));
    };
    /**
     * Destructor
     */
    /**
     * Destructor
     * @return {?}
     */
    ReactionCoreService.prototype.ngOnDestroy = /**
     * Destructor
     * @return {?}
     */
    function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    /**
     * Broadcasts the event to the application.
     */
    /**
     * Broadcasts the event to the application.
     * @param {?} reaction
     * @param {?} type
     * @param {?} payload
     * @param {?=} el
     * @param {?=} view
     * @return {?}
     */
    ReactionCoreService.prototype.broadcast = /**
     * Broadcasts the event to the application.
     * @param {?} reaction
     * @param {?} type
     * @param {?} payload
     * @param {?=} el
     * @param {?=} view
     * @return {?}
     */
    function (reaction, type, payload, el, view) {
        this._events$.next(new ReactionEvent(this._nextId++, type, reaction, payload, el, view));
    };
    ReactionCoreService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ReactionCoreService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] },
        { type: ReactionShortcutService }
    ]; };
    /** @nocollapse */ ReactionCoreService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ReactionCoreService_Factory() { return new ReactionCoreService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ReactionShortcutService)); }, token: ReactionCoreService, providedIn: "root" });
    return ReactionCoreService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} el
 * @param {?} hooks
 * @return {?}
 */
function combineEvents(el, hooks) {
    /** @type {?} */
    var events$ = hooks.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var type = _a.type, debounce = _a.debounce;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(el.nativeElement, type)
            .pipe(throttleTimeIf(Boolean(debounce), debounce));
    }));
    return rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(events$)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((/**
     * @param {?} event
     * @return {?}
     */
    function (event) { return event.preventDefault(); })));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionClickDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionClickDirective(_reactionProvider, _reactionCore, _el, _view) {
        this._reactionProvider = _reactionProvider;
        this._reactionCore = _reactionCore;
        this._el = _el;
        this._view = _view;
        /**
         * Destructor event
         */
        this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * Destructor
     */
    /**
     * Destructor
     * @return {?}
     */
    ReactionClickDirective.prototype.ngOnDestroy = /**
     * Destructor
     * @return {?}
     */
    function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    /**
     * Initialize
     */
    /**
     * Initialize
     * @return {?}
     */
    ReactionClickDirective.prototype.ngOnInit = /**
     * Initialize
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var disabled$ = this._reactionProvider.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.disabled; })));
        this._reactionProvider.reaction$.pipe(withSwitchMap((/**
         * @param {?} reaction
         * @return {?}
         */
        function (reaction) { return combineEvents(_this._el, reaction.__REACTION__); })), disabledWhen(disabled$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed$)).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), reaction = _b[0], event = _b[1];
            return _this._reactionCore.broadcast(reaction, event.type, event, _this._el, _this._view);
        }));
    };
    ReactionClickDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{ selector: '[rgReactionClick]' },] }
    ];
    /** @nocollapse */
    ReactionClickDirective.ctorParameters = function () { return [
        { type: ReactionProvider },
        { type: ReactionCoreService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] }
    ]; };
    return ReactionClickDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionClickModule = /** @class */ (function () {
    function ReactionClickModule() {
    }
    ReactionClickModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionClickDirective],
                    exports: [ReactionClickDirective]
                },] }
    ];
    return ReactionClickModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Dependency provider for other components to gain access to the reaction object.
 */
var ReactionModelDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function ReactionModelDirective(_reactionProvider) {
        this._reactionProvider = _reactionProvider;
        /**
         * Emits states of the reaction object.
         */
        this.state$ = this._reactionProvider.state$;
        /**
         * Emits snapshots of the reaction object.
         */
        this.snapshot$ = this._reactionProvider.snapshot$;
    }
    Object.defineProperty(ReactionModelDirective.prototype, "reaction", {
        /**
         * Sets the reaction object. We use unknown to reduce warnings in templates.
         */
        set: /**
         * Sets the reaction object. We use unknown to reduce warnings in templates.
         * @param {?} reaction
         * @return {?}
         */
        function (reaction) {
            this._reactionProvider.set(reaction);
        },
        enumerable: true,
        configurable: true
    });
    ReactionModelDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[reaction]',
                    providers: [ReactionProvider],
                    exportAs: 'rgReaction'
                },] }
    ];
    /** @nocollapse */
    ReactionModelDirective.ctorParameters = function () { return [
        { type: ReactionProvider }
    ]; };
    ReactionModelDirective.propDecorators = {
        reaction: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['reaction',] }]
    };
    return ReactionModelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionModelModule = /** @class */ (function () {
    function ReactionModelModule() {
    }
    ReactionModelModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionModelDirective],
                    exports: [ReactionModelDirective]
                },] }
    ];
    return ReactionModelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionSnapshotsPipe = /** @class */ (function () {
    function ReactionSnapshotsPipe() {
    }
    /**
     * Creates an observable that emits snapshots of the reaction.
     */
    /**
     * Creates an observable that emits snapshots of the reaction.
     * @param {?} value
     * @return {?}
     */
    ReactionSnapshotsPipe.prototype.transform = /**
     * Creates an observable that emits snapshots of the reaction.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object' ? toReactionSnapshot(value) : undefined;
    };
    ReactionSnapshotsPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{ name: 'reactionSnapshots$', pure: true },] }
    ];
    return ReactionSnapshotsPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionSnapshotsModule = /** @class */ (function () {
    function ReactionSnapshotsModule() {
    }
    ReactionSnapshotsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionSnapshotsPipe],
                    exports: [ReactionSnapshotsPipe]
                },] }
    ];
    return ReactionSnapshotsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Compare function for two reaction objects.
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function reactionSortCompare(a, b) {
    return a.group == b.group
        ? ((a.order < b.order) ? -1 : (a.order > b.order) ? 1 : 0)
        : ((a.group < b.group) ? -1 : 1);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} state
 * @param {?} item
 * @param {?} indx
 * @param {?} source
 * @return {?}
 */
function reactionGroupNullReducer(state, item, indx, source) {
    state.reactions.push(item.reaction);
    state.groupSize++;
    /** @type {?} */
    var hasNext = indx < source.length - 1;
    /** @type {?} */
    var next = hasNext && source[indx + 1];
    if (hasNext
        && item.group !== (next && next.group)
        && state.groupSize >= state.minGroupSize) {
        state.reactions.push(null);
        state.groupSize = 0;
    }
    return state;
}
/**
 * Given an ordered array of reaction objects returns an array where null separates different groups.
 * @type {?}
 */
var reactionGroupNull = (/**
 * @param {?} items
 * @param {?=} minGroupSize
 * @return {?}
 */
function (items, minGroupSize) {
    if (minGroupSize === void 0) { minGroupSize = 0; }
    return minGroupSize === 0
        ? items.map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var reaction = _a.reaction;
            return reaction;
        }))
        : items.reduce(reactionGroupNullReducer, { reactions: [], groupSize: 0, minGroupSize: minGroupSize }).reactions;
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var toSortCompares$ = (/**
 * @param {?} reactions
 * @return {?}
 */
function (reactions) {
    return reactions.map((/**
     * @param {?} reaction
     * @return {?}
     */
    function (reaction) {
        /** @type {?} */
        var state$ = toReactionState(reaction);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])([state$.order, state$.group, Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(reaction)]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), order = _b[0], group = _b[1], reaction = _b[2];
            return ({ order: order, group: group, reaction: reaction });
        })));
    }));
});
/** @type {?} */
var mapSortComparesToReaction = (/**
 * @param {?} states
 * @return {?}
 */
function (states) {
    states = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(states);
    states.sort(reactionSortCompare);
    return states;
});
/** @type {?} */
var reactionSort = (/**
 * @param {?} reactions
 * @param {?=} minGroupSize
 * @return {?}
 */
function (reactions, minGroupSize) {
    if (minGroupSize === void 0) { minGroupSize = 0; }
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(toSortCompares$(reactions))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(mapSortComparesToReaction), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
     * @param {?} sortables
     * @return {?}
     */
    function (sortables) { return reactionGroupNull(sortables, minGroupSize); })));
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionSortPipe = /** @class */ (function () {
    function ReactionSortPipe() {
    }
    /**
     *
     */
    /**
     *
     * @param {?} reactions
     * @param {?=} args
     * @return {?}
     */
    ReactionSortPipe.prototype.transform = /**
     *
     * @param {?} reactions
     * @param {?=} args
     * @return {?}
     */
    function (reactions, args) {
        if (!(reactions instanceof Array)) {
            return undefined;
        }
        return reactionSort(reactions);
    };
    ReactionSortPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{ name: 'reactionSort$', pure: true },] }
    ];
    return ReactionSortPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionSortModule = /** @class */ (function () {
    function ReactionSortModule() {
    }
    ReactionSortModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionSortPipe],
                    exports: [ReactionSortPipe]
                },] }
    ];
    return ReactionSortModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionStatePipe = /** @class */ (function () {
    function ReactionStatePipe() {
    }
    /**
     * Hydrates a reaction and converts to a reaction state object of observable properties.
     */
    /**
     * Hydrates a reaction and converts to a reaction state object of observable properties.
     * @param {?} value
     * @return {?}
     */
    ReactionStatePipe.prototype.transform = /**
     * Hydrates a reaction and converts to a reaction state object of observable properties.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object' ? toReactionState(value) : undefined;
    };
    ReactionStatePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{ name: 'reactionState', pure: true },] }
    ];
    return ReactionStatePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionStateModule = /** @class */ (function () {
    function ReactionStateModule() {
    }
    ReactionStateModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionStatePipe],
                    exports: [ReactionStatePipe]
                },] }
    ];
    return ReactionStateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Displays the body of a reaction control. Mostly the icon and title.
 */
var ReactionTextComponent = /** @class */ (function () {
    function ReactionTextComponent() {
        /**
         *
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
    ReactionTextComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'rg-reaction-text',
                    template: "<ng-container *ngIf=\"snapshot\">\n  <fa-icon *ngIf=\"icon && snapshot.icon\"\n           class=\"rg-reaction-icon\"\n           [fixedWidth]=\"true\"\n           [icon]=\"snapshot.icon\"\n           [pulse]=\"snapshot.animate === 'pulse'\"\n           [spin]=\"snapshot.animate === 'spin'\"></fa-icon>\n  <span *ngIf=\"title\"\n        class=\"rg-reaction-text\">{{snapshot.title}}</span>\n  <fa-icon *ngIf=\"secondary && snapshot.secondary\"\n           class=\"rg-reaction-secondary\"\n           [fixedWidth]=\"true\"\n           [icon]=\"snapshot.secondary\"></fa-icon>\n</ng-container>\n",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                    styles: [""]
                }] }
    ];
    ReactionTextComponent.propDecorators = {
        icon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        secondary: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        snapshot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return ReactionTextComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionTextModule = /** @class */ (function () {
    function ReactionTextModule() {
    }
    ReactionTextModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]
                    ],
                    declarations: [ReactionTextComponent],
                    exports: [ReactionTextComponent]
                },] }
    ];
    return ReactionTextModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionTooltipDirective = /** @class */ (function () {
    function ReactionTooltipDirective() {
    }
    ReactionTooltipDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[rgReactionTooltip]'
                },] }
    ];
    /** @nocollapse */
    ReactionTooltipDirective.ctorParameters = function () { return []; };
    return ReactionTooltipDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactionTooltipModule = /** @class */ (function () {
    function ReactionTooltipModule() {
    }
    ReactionTooltipModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
                    declarations: [ReactionTooltipDirective],
                    exports: [ReactionTooltipDirective]
                },] }
    ];
    return ReactionTooltipModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies the required decorator based upon the argument types.
 * @param {...?} args
 * @return {?}
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
        return reactionMethod(args[0], args.length === 2 ? args[1] : {});
    }
    else {
        throw new Error('Invalid arguments for Reaction decorator');
    }
}
/**
 * Calls the injectable decorator from Angular.
 * @type {?}
 */
var reactionInjectable = (/**
 * @template TFunction
 * @param {?} clss
 * @param {?} options
 * @return {?}
 */
function (clss, options) { return options.hasOwnProperty('providedIn')
    ? (/** @type {?} */ (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: options.providedIn })(clss)))
    : (/** @type {?} */ (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()(clss))); });
/**
 * Sets the meta data on the constructor function.
 * @type {?}
 */
var reactionMetaData = (/**
 * @template TFunction
 * @param {?} clss
 * @param {?} options
 * @return {?}
 */
function (clss, options) {
    options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options);
    delete options.providedIn;
    return (clss.__REACTION__ = options, clss);
});
/**
 * The class decorator function.
 * @param {?} options
 * @return {?}
 */
function reactionClass(options) {
    return (/**
     * @template ReactionConstructor
     * @param {?} func
     * @return {?}
     */
    function (func) { return reactionInjectable(reactionMetaData(func, options), options); });
}
/**
 * The method decorator function.
 * @param {?} type
 * @param {?} options
 * @return {?}
 */
function reactionMethod(type, options) {
    return (/**
     * @param {?} target
     * @param {?} methodName
     * @param {?} descriptor
     * @return {?}
     */
    function (target, methodName, descriptor) {
        if (!target.__REACTION__) {
            target.__REACTION__ = [];
        }
        if (typeof target[methodName] === 'function') {
            reactionCodeParser(type).forEach((/**
             * @param {?} code
             * @return {?}
             */
            function (code) {
                target.__REACTION__.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options, code, { method: target[methodName] }));
            }));
        }
        return descriptor;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
         * Destroy event.
         */
        this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emits the current state of the keyboard.
         */
        this._state$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            ctrlKey: false,
            altKey: false,
            metaKey: false,
            shiftKey: false
        });
        /** @type {?} */
        var keyUpEvent = new KeyboardEvent('keyup', {
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_doc, 'keydown'), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_doc, 'keyup'), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'blur').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(keyUpEvent))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed$)).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var ctrlKey = _a.ctrlKey, altKey = _a.altKey, shiftKey = _a.shiftKey, metaKey = _a.metaKey;
            return _this._state$.next({ ctrlKey: ctrlKey, altKey: altKey, shiftKey: shiftKey, metaKey: metaKey });
        }));
        this.ctrl$ = this._state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.ctrlKey; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        this.alt$ = this._state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.altKey; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        this.shift$ = this._state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.shiftKey; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        this.meta$ = this._state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.metaKey; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
    }
    /**
     * Destructor
     */
    /**
     * Destructor
     * @return {?}
     */
    ReactionKeyboardService.prototype.ngOnDestroy = /**
     * Destructor
     * @return {?}
     */
    function () {
        this._destroyed$.next();
        this._destroyed$.complete();
    };
    ReactionKeyboardService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ReactionKeyboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"],] }] }
    ]; };
    /** @nocollapse */ ReactionKeyboardService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function ReactionKeyboardService_Factory() { return new ReactionKeyboardService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"])); }, token: ReactionKeyboardService, providedIn: "root" });
    return ReactionKeyboardService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=reactgular-reactions.js.map


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

module.exports = "<div class=\"container m-3\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <button *ngFor=\"let reaction of reactions\"\n              [reaction]=\"reaction\"\n              rgReactionClass\n              rgReactionClick\n              #rgReaction=\"rgReaction\">\n        <rg-reaction-text [icon]=\"false\"\n                          [snapshot]=\"rgReaction.snapshot$ | async\"></rg-reaction-text>\n      </button>\n    </div>\n  </div>\n</div>\n"

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
/* harmony import */ var _demo_demo_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./demo/demo.component */ "./src/app/demo/demo.component.ts");
/* harmony import */ var _demo_card_demo_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./demo-card/demo-card.component */ "./src/app/demo-card/demo-card.component.ts");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _reactgular_logger__WEBPACK_IMPORTED_MODULE_8__["LoggerModule"].forRoot({ enabled: !_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].production })
            ],
            declarations: [
                _demo_demo_component__WEBPACK_IMPORTED_MODULE_6__["DemoComponent"],
                _demo_card_demo_card_component__WEBPACK_IMPORTED_MODULE_7__["DemoCardComponent"]
            ],
            providers: [],
            bootstrap: [
                _demo_demo_component__WEBPACK_IMPORTED_MODULE_6__["DemoComponent"]
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
/* harmony import */ var _reactions_create_reaction_create_reaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reactions/create-reaction/create-reaction */ "./src/app/reactions/create-reaction/create-reaction.ts");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");
/* harmony import */ var _reactgular_reactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @reactgular/reactions */ "./dist/fesm5/reactgular-reactions.js");







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
                { provide: TOP_BAR_TOKEN, useClass: _reactions_create_reaction_create_reaction__WEBPACK_IMPORTED_MODULE_4__["CreateReaction"], multi: true }
            ],
            styles: [__webpack_require__(/*! ./demo.component.scss */ "./src/app/demo/demo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(TOP_BAR_TOKEN)),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Array, _reactgular_reactions__WEBPACK_IMPORTED_MODULE_6__["ReactionCoreService"],
            _reactgular_logger__WEBPACK_IMPORTED_MODULE_5__["LogService"]])
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
/* harmony import */ var _reactgular_reactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reactgular/reactions */ "./dist/fesm5/reactgular-reactions.js");
/* harmony import */ var _reactgular_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reactgular/logger */ "./node_modules/@reactgular/logger/fesm5/reactgular-logger.js");



var CreateReaction = /** @class */ (function () {
    function CreateReaction(log) {
        this._log = log.withPrefix(CreateReaction_1.name);
    }
    CreateReaction_1 = CreateReaction;
    CreateReaction.prototype.click = function (event) {
        this._log.info('click', event);
    };
    var CreateReaction_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_reactgular_reactions__WEBPACK_IMPORTED_MODULE_1__["Reaction"])('click'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_reactgular_reactions__WEBPACK_IMPORTED_MODULE_1__["ReactionEvent"]]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], CreateReaction.prototype, "click", null);
    CreateReaction = CreateReaction_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_reactgular_reactions__WEBPACK_IMPORTED_MODULE_1__["Reaction"])({
            title: 'Create',
            tooltip: 'Creates a new note',
            icon: 'fa-plus',
            order: 'demo:000'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_reactgular_logger__WEBPACK_IMPORTED_MODULE_2__["LogService"]])
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