// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jQVXF":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0bcb44a518dbc454";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1SICI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _romanizeNumbers = require("./helpers/romanizeNumbers");
var _romanizeNumbersDefault = parcelHelpers.interopDefault(_romanizeNumbers);
var _chord = require("./helpers/Chord");
var _chordDefault = parcelHelpers.interopDefault(_chord);
var _keyboard = require("./helpers/Keyboard");
var _keyboardDefault = parcelHelpers.interopDefault(_keyboard);
var _guitar = require("./helpers/Guitar");
var _guitarDefault = parcelHelpers.interopDefault(_guitar);
var _scale = require("./helpers/Scale");
var _scaleDefault = parcelHelpers.interopDefault(_scale);
var _customSelect = require("./helpers/customSelect");
var _customSelectDefault = parcelHelpers.interopDefault(_customSelect);
document.addEventListener("DOMContentLoaded", ()=>{
    const DEFAULT_ROOT = "C";
    const DEFAULT_SCALE_TYPE = "major";
    const scaleCanvas = document.querySelector(".canvas");
    const chordCanvas = document.querySelector(".chord__applicature");
    (0, _customSelectDefault.default)();
    const chordKyboard = new (0, _keyboardDefault.default)(chordCanvas);
    const keyboard = new (0, _keyboardDefault.default)(scaleCanvas);
    const guitar = new (0, _guitarDefault.default)(scaleCanvas);
    const chord = new (0, _chordDefault.default)();
    const scaleClass = new (0, _scaleDefault.default)(DEFAULT_ROOT, DEFAULT_SCALE_TYPE);
    window.scaleClass = scaleClass;
    // default settings
    let instrument1 = "guitar";
    let scale1 = [];
    const rootNotes = document.querySelector(".select-root");
    const diatonicChordField = document.querySelector(".progression__chords-diatonic");
    const basicChordField = document.querySelector(".progression__chords-basic");
    rootNotes.addEventListener("click", (e)=>{
        const target = e.target;
        if (target.classList.contains("select-root__item")) scaleClass.setRoot(target.innerText);
        if (target.classList.contains("select-root__alter")) {
            scaleClass.setIsSharp(target.innerText.toLowerCase() === "sharp");
            rootNotes.querySelectorAll(".select-root__item").forEach((item, index)=>{
                item.innerText = scaleClass.getNotes()[index];
                item.dataset.root = scaleClass.getNotes()[index].toLowerCase();
            });
        }
        toggleActive();
        main();
    });
    document.addEventListener("changeSettings", (e)=>{
        if (e.detail.eventType === "instrument") {
            instrument1 = e.detail.value;
            main();
            return;
        }
        scaleClass.setScaleType(e.detail.value);
        main();
    });
    const main = ()=>{
        scale1 = scaleClass.getScale();
        chordKyboard.renderKeyboard(chord.calcChord(scaleClass.root));
        printScaleTable(scale1);
        printDiatonicChords(chord.calcDiatonic(scale1, scaleClass.scaleType));
        setChordApplicatures();
        keyboard.setIsSharp(scaleClass.isSharp);
        chordKyboard.setIsSharp(scaleClass.isSharp);
        chord.setIsSharp(scaleClass.isSharp);
        guitar.setIsSharp(scaleClass.isSharp);
        render(scale1, instrument1);
    };
    const toggleActive = ()=>{
        rootNotes.querySelectorAll(".active").forEach((item)=>item.classList.remove("active"));
        let curRoot = rootNotes.querySelector(`[data-root='${scaleClass.root.toLocaleLowerCase()}']`);
        if (!curRoot) {
            scaleClass.setRoot(scaleClass.getNotes()[0]);
            curRoot = rootNotes.querySelector(`[data-root='${scaleClass.root.toLocaleLowerCase()}']`);
        }
        curRoot.classList.add("active");
        rootNotes.querySelector(`[data-is-${scaleClass.isSharp ? "sharp" : "flat"}]`).classList.add("active");
    };
    const printScaleTable = (scale)=>{
        const tableCells = document.querySelectorAll(".scale__notes td:not(:first-child)");
        tableCells.forEach((item, index)=>item.innerText = scale[index]);
    };
    const printDiatonicChords = (chords)=>{
        let mainSteps = "";
        let commonSteps = "";
        chords.forEach((item, index)=>{
            const sign = (0, _romanizeNumbersDefault.default)(index + 1);
            if ([
                0,
                3,
                4
            ].includes(index)) mainSteps += `<span>${sign}: </span><span class="chord">${item}</span><br>`;
            else commonSteps += `<span>${sign}: </span><span class="chord">${item}</span><br>`;
        });
        diatonicChordField.innerHTML = mainSteps;
        basicChordField.innerHTML = commonSteps;
    };
    const setChordApplicatures = ()=>{
        const chords = document.querySelectorAll(".progression .chord");
        const title = document.querySelector(".chord__title");
        chords.forEach((item)=>{
            item.addEventListener("click", (e)=>{
                const chordNotes = chord.calcChord(e.target.innerText);
                title.innerText = `Chord ${e.target.innerText}`;
                chordKyboard.renderKeyboard(chordNotes);
            });
        });
    };
    // ======================= canvas settings ========================
    const render = (activeKeys, instrument)=>{
        if (instrument === "piano") keyboard.renderKeyboard(scale1);
        else if (instrument === "guitar") guitar.renderGuitar(scale1, scaleClass.root);
    };
    main();
});

},{"./helpers/romanizeNumbers":"gsCYk","./helpers/Chord":"fw20S","./helpers/Keyboard":"3eMxX","./helpers/Guitar":"24o42","./helpers/Scale":"6AgEa","./helpers/customSelect":"4vWz9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gsCYk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function romanize(arabicNumber) {
    if (arabicNumber === 1) return "root";
    if (!+arabicNumber) return NaN;
    let digits = String(+arabicNumber).split("");
    let key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX"
    ];
    let roman = "", i = 3;
    while(i--)roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
exports.default = romanize;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"fw20S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Chord {
    patterns = {
        maj: [
            0,
            4,
            7
        ],
        m: [
            0,
            3,
            7
        ],
        dim: [
            0,
            3,
            6
        ],
        aug: [
            0,
            4,
            8
        ]
    };
    isSharp = true;
    diatonicPatterns = {
        major: [
            "",
            "m",
            "m",
            "",
            "",
            "m",
            "dim"
        ],
        natural_minor: [
            "m",
            "dim",
            "",
            "m",
            "m",
            "",
            ""
        ],
        harmonic_minor: [
            "m",
            "dim",
            "aug",
            "m",
            "",
            "",
            "dim"
        ],
        melodic_minor: [
            "m",
            "m",
            "aug",
            "",
            "",
            "dim",
            "dim"
        ]
    };
    _notes = {
        sharp: [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
        ],
        flat: [
            "C",
            "D\u266D",
            "D",
            "E\u266D",
            "E",
            "F",
            "F\u266D",
            "G",
            "A\u266D",
            "A",
            "B\u266D",
            "B"
        ]
    };
    _getNotes() {
        return this._notes[this.isSharp ? "sharp" : "flat"];
    }
    setIsSharp(isSharp) {
        this.isSharp = isSharp;
    }
    calcChord(chord) {
        const chordType = this.getChordType(chord);
        const startPoint = this._getNotes().indexOf(this.getNote(chord));
        const sortedArr = this._getNotes().slice(startPoint).concat(this._getNotes().slice(0, startPoint));
        return this.patterns[chordType].map((item)=>sortedArr[item]);
    }
    getChordType(chord) {
        let chordType = chord.split("");
        chordType = chordType.filter((item)=>/[a-zA-Z]+/.test(item)); // trim '#'
        chordType.shift();
        return chordType.join("") || "maj";
    }
    getNote(chord) {
        return chord.split("").includes("#") ? `${chord[0]}#` : `${chord[0]}`;
    }
    calcDiatonic(scale, scaleName) {
        const diatonicPattern = this.diatonicPatterns[scaleName];
        return diatonicPattern.map((item, index)=>`${scale[index]}${item}`);
    }
}
exports.default = Chord;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3eMxX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Keyboard {
    constructor(keyboardCanvas, isSharp = true){
        this.canvas = keyboardCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.isSharp = isSharp;
    }
    _notes = {
        sharp: [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
        ],
        flat: [
            "C",
            "D\u266D",
            "D",
            "E\u266D",
            "E",
            "F",
            "F\u266D",
            "G",
            "A\u266D",
            "A",
            "B\u266D",
            "B"
        ]
    };
    pianoKeyboard = [
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        true,
        false,
        true,
        false,
        true
    ];
    xCoordinate = 15;
    yCoordinate = 15;
    preparedKeysData(activeNotes) {
        return this._getNotes().concat(this._getNotes()).map((item)=>{
            return {
                isActive: activeNotes.includes(item),
                note: item,
                isRoot: item === activeNotes[0]
            };
        });
    }
    _getNotes() {
        return this._notes[this.isSharp ? "sharp" : "flat"];
    }
    setIsSharp(isSharp) {
        this.isSharp = isSharp;
    }
    renderKeyboard(activeNotes) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 900;
        this.canvas.height = 380;
        this.ctx.scale(2, 2);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        activeNotes = this.preparedKeysData(activeNotes);
        let x_coord = this.xCoordinate;
        let y_coord = this.yCoordinate;
        const keyboardExtended = this.pianoKeyboard.concat(this.pianoKeyboard);
        keyboardExtended.forEach((key, index)=>{
            const active = activeNotes[index].isActive;
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "black";
            if (key) {
                this.ctx.fillStyle = "white";
                this.ctx.globalCompositeOperation = "destination-over";
                this.ctx.fillRect(x_coord, y_coord, 30, 160);
                this.ctx.strokeRect(x_coord, y_coord, 30, 160);
            } else {
                this.ctx.fillStyle = "black";
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.fillRect(x_coord, y_coord, 22, 120);
                this.ctx.strokeRect(x_coord, y_coord, 22, 120);
            }
            if (active) {
                const pointCoordX = x_coord + (key ? 30 : 22) / 2 - (key ? 8 : 6);
                const pointCoordY = key ? 145 : 115;
                const height = key ? 20 : 14;
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.fillStyle = activeNotes[index].isRoot ? "gold" : "#26CC26";
                this.ctx.fillRect(pointCoordX, pointCoordY, key ? 16 : 12, height);
                this.ctx.beginPath();
                this.ctx.font = "8px Nunito, sans-serif";
                this.ctx.fillStyle = "black";
                const noteCoordX = activeNotes[index].note.length < 2 ? pointCoordX + 5 : pointCoordX;
                this.ctx.fillText(activeNotes[index].note, noteCoordX, pointCoordY + height / 2 + 4);
            }
            if (key === true) x_coord += 20;
            if (key === false && keyboardExtended[index + 1] !== false) x_coord += 10;
            if (index === 4 || index === 11 || index === 16) x_coord += 10;
        });
    }
}
exports.default = Keyboard;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"24o42":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Guitar {
    constructor(guitarCanvas, isSharp = true){
        this.canvas = guitarCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.isSharp = isSharp;
    }
    _guitarStrings = {
        sharp: [
            [
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#"
            ],
            [
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B",
                "C",
                "C#"
            ],
            [
                "G",
                "G#",
                "A",
                "A#",
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A"
            ],
            [
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E"
            ],
            [
                "A",
                "A#",
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B"
            ],
            [
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#"
            ]
        ],
        flat: [
            [
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D"
            ],
            [
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D"
            ],
            [
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A"
            ],
            [
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E"
            ],
            [
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B"
            ],
            [
                "E",
                "F",
                "G\u266D",
                "G",
                "A\u266D",
                "A",
                "B\u266D",
                "B",
                "C",
                "D\u266D",
                "D",
                "E\u266D",
                "E",
                "F",
                "G\u266D"
            ]
        ]
    };
    setIsSharp(isSharp) {
        this.isSharp = isSharp;
    }
    _getStrings() {
        return this._guitarStrings[this.isSharp ? "sharp" : "flat"];
    }
    notesOnString = [];
    isToRender = [];
    width = 800;
    height = 280;
    renderGuitar(scale, root) {
        this.scale = scale;
        this.root = root;
        this.canvasGuitarSetup();
        this.getNotesOnFretBoard();
        this.renderGuitarNotes(this.notesOnString);
    }
    canvasGuitarSetup() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(6, 6);
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.lineWidth = "0.4";
        const x_coord = 8;
        const y_coord = 3;
        const fretboardWidth = 120;
        const fretboardHeight = 35;
        const y_coord_string = 3.3;
        const x_fret = x_coord;
        const y_fret = y_coord;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#a36f40";
        this.ctx.strokeRect(x_coord, y_coord, fretboardWidth, fretboardHeight);
        this.ctx.fillRect(x_coord, y_coord, fretboardWidth, fretboardHeight);
        for(let i = 2; i <= 36; i += 6){
            this.ctx.strokeStyle = "lightgrey";
            this.ctx.moveTo(x_coord, y_coord_string + i);
            this.ctx.lineTo(x_coord + 120, y_coord_string + i);
            this.ctx.stroke();
        }
        for(let i1 = 8; i1 <= 119; i1 += 8){
            this.ctx.moveTo(x_fret + i1, y_fret);
            this.ctx.lineTo(x_fret + i1, y_fret + fretboardHeight);
            this.ctx.stroke();
        }
        // sets fret numbers
        const step = 8.5;
        this.ctx.font = "4px Nunito, sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("5", x_coord + step * 4 + 1, 43);
        this.ctx.fillText("7", x_coord + step * 6, 43);
        this.ctx.fillText("9", x_coord + step * 8 - 1, 43);
        this.ctx.fillText("12", x_coord + step * 11 - 4, 43);
    }
    getNotesOnFretBoard() {
        for(let i = 0; i < 6; i++){
            this.notesOnString[i] = this._getStrings()[i].filter((item)=>this.scale.includes(item));
            this.isToRender[i] = this._getStrings()[i].map((item)=>this.notesOnString[i].includes(item));
        }
    }
    renderGuitarNotes() {
        let y_coord = -0.5;
        for(let i = 0; i < 6; i++){
            let x_coord = -4;
            y_coord += 6;
            for(let j = 0; j < 15; j++)if (this.isToRender[i][j] !== true) x_coord += 8; // if note is absent
            else {
                this.ctx.beginPath();
                this.ctx.arc(x_coord + 8, y_coord, 2, 0, 2 * Math.PI);
                this.ctx.fillStyle = this._getStrings()[i][j] !== this.root ? "#26CC26" : "gold";
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.font = "3px Nunito, sans-serif";
                this.ctx.fillStyle = "black";
                this.ctx.fillText(this._getStrings()[i][j], x_coord + 8 - 1, y_coord + 1);
                x_coord += 8;
            }
        }
    }
}
exports.default = Guitar;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6AgEa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Scale {
    constructor(root, scaleType, isSharp = true){
        this.root = root;
        this.scaleType = scaleType;
        this.isSharp = isSharp;
        this.scalePattern = this.scalePatterns[scaleType];
    }
    _notes = {
        sharp: [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
        ],
        flat: [
            "C",
            "D\u266D",
            "D",
            "E\u266D",
            "E",
            "F",
            "G\u266D",
            "G",
            "A\u266D",
            "A",
            "B\u266D",
            "B"
        ]
    };
    scalePatterns = {
        major: [
            0,
            2,
            4,
            5,
            7,
            9,
            11
        ],
        natural_minor: [
            0,
            2,
            3,
            5,
            7,
            8,
            10
        ],
        harmonic_minor: [
            0,
            2,
            3,
            5,
            7,
            8,
            11
        ],
        melodic_minor: [
            0,
            2,
            3,
            5,
            7,
            9,
            11
        ]
    };
    setRoot(root) {
        this.root = root;
    }
    setScaleType(scaleType) {
        this.scaleType = scaleType;
        this.scalePattern = this.scalePatterns[scaleType];
    }
    setIsSharp(isSharp) {
        this.isSharp = isSharp;
    }
    getNotes() {
        return this.isSharp ? this._notes.sharp : this._notes.flat;
    }
    getScale() {
        const noteSet = this.getNotes();
        const startPoint = noteSet.indexOf(this.root);
        const sortedArr = noteSet.slice(startPoint).concat(noteSet.slice(0, startPoint));
        return this.scalePattern.map((item)=>sortedArr[item]);
    }
}
exports.default = Scale;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4vWz9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function initSelect() {
    const selected = document.querySelectorAll(".selected");
    const optionsList = document.querySelectorAll(".select-box__option");
    selected.forEach((item)=>{
        item.addEventListener("click", ()=>{
            const optionsContainer = item.parentNode.querySelector(".select-box__options");
            optionsContainer.classList.toggle("active");
            document.addEventListener("click", closeOptionList);
        });
    });
    const closeOptionList = (e)=>{
        if (e.target.closest(".select-box")) return;
        document.querySelector(".select-box__options.active").classList.remove("active");
        document.removeEventListener("click", closeOptionList);
    };
    optionsList.forEach((option1)=>{
        option1.addEventListener("click", (e)=>{
            const parent = e.target.closest(".select-box");
            const eventType = parent.dataset.type;
            const option = e.target.closest(".select-box__option");
            const optionValue = option.dataset[eventType];
            parent.querySelector(".selected").innerHTML = option.querySelector("label").innerHTML;
            option.parentNode.classList.remove("active");
            const eventDetail = {
                eventType: eventType,
                value: optionValue
            };
            const changedSettings = new CustomEvent("changeSettings", {
                detail: eventDetail
            });
            document.removeEventListener("click", closeOptionList);
            document.dispatchEvent(changedSettings);
        });
    });
}
exports.default = initSelect;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jQVXF","1SICI"], "1SICI", "parcelRequiref233")

//# sourceMappingURL=index.18dbc454.js.map
