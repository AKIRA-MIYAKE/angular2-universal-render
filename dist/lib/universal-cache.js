"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
function rehydrateCache(defaultValue) {
    const win = window;
    if (win['UNIVERSAL_CACHE'] && win['UNIVERSAL_CACHE']['Cache']) {
        let serverCache = defaultValue;
        try {
            serverCache = JSON.parse(win['UNIVERSAL_CACHE']['Cache']);
            if (typeof serverCache !== typeof defaultValue) {
                serverCache = defaultValue;
            }
        }
        catch (e) {
            serverCache = defaultValue;
        }
        return serverCache;
    }
    return defaultValue;
}
exports.rehydrateCache = rehydrateCache;
let Cache = class Cache {
    constructor(isBrowser) {
        this._cache = {};
        if (isBrowser) {
            let serverCache = rehydrateCache(this._cache);
            this.rehydrate(serverCache);
        }
    }
    has(key) {
        return this._cache[key];
    }
    set(key, value) {
        this._cache[key] = value;
    }
    get(key) {
        return this._cache[key];
    }
    clear() {
        Object.keys(this._cache).forEach((key) => {
            delete this._cache[key];
        });
    }
    dehydrate() {
        let json = {};
        Object.keys(this._cache).forEach((key) => {
            json[key] = this._cache[key];
        });
        return json;
    }
    rehydrate(json) {
        Object.keys(json).forEach((key) => {
            this._cache[key] = json[key];
        });
    }
    toJSON() {
        return this.dehydrate();
    }
};
Cache = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('isBrowser')), 
    __metadata('design:paramtypes', [Boolean])
], Cache);
exports.Cache = Cache;
//# sourceMappingURL=universal-cache.js.map