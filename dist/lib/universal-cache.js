"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
function rehydrateCache(defaultValue) {
    var win = window;
    if (win['UNIVERSAL_CACHE'] && win['UNIVERSAL_CACHE']['Cache']) {
        var serverCache = defaultValue;
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
var Cache = (function () {
    function Cache(isBrowser) {
        this._cache = {};
        if (isBrowser) {
            var serverCache = rehydrateCache(this._cache);
            this.rehydrate(serverCache);
        }
    }
    Cache.prototype.has = function (key) {
        return this._cache[key];
    };
    Cache.prototype.set = function (key, value) {
        this._cache[key] = value;
    };
    Cache.prototype.get = function (key) {
        return this._cache[key];
    };
    Cache.prototype.clear = function () {
        var _this = this;
        Object.keys(this._cache).forEach(function (key) {
            delete _this._cache[key];
        });
    };
    Cache.prototype.dehydrate = function () {
        var _this = this;
        var json = {};
        Object.keys(this._cache).forEach(function (key) {
            json[key] = _this._cache[key];
        });
        return json;
    };
    Cache.prototype.rehydrate = function (json) {
        var _this = this;
        Object.keys(json).forEach(function (key) {
            _this._cache[key] = json[key];
        });
    };
    Cache.prototype.toJSON = function () {
        return this.dehydrate();
    };
    Cache = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('isBrowser'))
    ], Cache);
    return Cache;
}());
exports.Cache = Cache;
