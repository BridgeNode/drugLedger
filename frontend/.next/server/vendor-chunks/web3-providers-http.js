"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/web3-providers-http";
exports.ids = ["vendor-chunks/web3-providers-http"];
exports.modules = {

/***/ "(ssr)/./node_modules/web3-providers-http/lib/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/web3-providers-http/lib/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HttpProvider: () => (/* binding */ HttpProvider),\n/* harmony export */   \"default\": () => (/* binding */ HttpProvider)\n/* harmony export */ });\n/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-fetch */ \"(ssr)/./node_modules/cross-fetch/dist/node-ponyfill.js\");\n/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-types */ \"(ssr)/./node_modules/web3-types/lib/esm/index.js\");\n/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-errors */ \"(ssr)/./node_modules/web3-errors/lib/esm/index.js\");\n/*\nThis file is part of web3.js.\n\nweb3.js is free software: you can redistribute it and/or modify\nit under the terms of the GNU Lesser General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nweb3.js is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Lesser General Public License for more details.\n\nYou should have received a copy of the GNU Lesser General Public License\nalong with web3.js.  If not, see <http://www.gnu.org/licenses/>.\n*/\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\nclass HttpProvider extends web3_types__WEBPACK_IMPORTED_MODULE_1__.Web3BaseProvider {\n    constructor(clientUrl, httpProviderOptions) {\n        super();\n        if (!HttpProvider.validateClientUrl(clientUrl))\n            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidClientError(clientUrl);\n        this.clientUrl = clientUrl;\n        this.httpProviderOptions = httpProviderOptions;\n    }\n    static validateClientUrl(clientUrl) {\n        return typeof clientUrl === 'string' ? /^http(s)?:\\/\\//i.test(clientUrl) : false;\n    }\n    /* eslint-disable class-methods-use-this */\n    getStatus() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    supportsSubscriptions() {\n        return false;\n    }\n    request(payload, requestOptions) {\n        var _a;\n        return __awaiter(this, void 0, void 0, function* () {\n            const providerOptionsCombined = Object.assign(Object.assign({}, (_a = this.httpProviderOptions) === null || _a === void 0 ? void 0 : _a.providerOptions), requestOptions);\n            const response = yield cross_fetch__WEBPACK_IMPORTED_MODULE_0__(this.clientUrl, Object.assign(Object.assign({}, providerOptionsCombined), { method: 'POST', headers: Object.assign(Object.assign({}, providerOptionsCombined.headers), { 'Content-Type': 'application/json' }), body: JSON.stringify(payload) }));\n            if (!response.ok) {\n                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument\n                throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.ResponseError(yield response.json(), undefined, undefined, response.status);\n            }\n            ;\n            return (yield response.json());\n        });\n    }\n    /* eslint-disable class-methods-use-this */\n    on() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    removeListener() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    once() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    removeAllListeners() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    connect() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    disconnect() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    reset() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n    /* eslint-disable class-methods-use-this */\n    reconnect() {\n        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.MethodNotImplementedError();\n    }\n}\n\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlcnMtaHR0cC9saWIvZXNtL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNnQztBQUNlO0FBQzRDO0FBQzVFLDJCQUEyQix3REFBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJEQUFrQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtFQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFLG1DQUFtQyx3Q0FBSywrQ0FBK0MsOEJBQThCLHVEQUF1RCxzQ0FBc0Msb0NBQW9DLGtDQUFrQztBQUN4UjtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0VBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtFQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0VBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtFQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0VBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBeUI7QUFDM0M7QUFDQTtBQUN3QjtBQUN4QiIsInNvdXJjZXMiOlsid2VicGFjazovL2RydWdsZWRnZXIvLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlcnMtaHR0cC9saWIvZXNtL2luZGV4LmpzPzVmYTQiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbndlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG50aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxud2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbk1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbkdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbmFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5pbXBvcnQgeyBXZWIzQmFzZVByb3ZpZGVyLCB9IGZyb20gJ3dlYjMtdHlwZXMnO1xuaW1wb3J0IHsgSW52YWxpZENsaWVudEVycm9yLCBNZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yLCBSZXNwb25zZUVycm9yIH0gZnJvbSAnd2ViMy1lcnJvcnMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHR0cFByb3ZpZGVyIGV4dGVuZHMgV2ViM0Jhc2VQcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoY2xpZW50VXJsLCBodHRwUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICghSHR0cFByb3ZpZGVyLnZhbGlkYXRlQ2xpZW50VXJsKGNsaWVudFVybCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZENsaWVudEVycm9yKGNsaWVudFVybCk7XG4gICAgICAgIHRoaXMuY2xpZW50VXJsID0gY2xpZW50VXJsO1xuICAgICAgICB0aGlzLmh0dHBQcm92aWRlck9wdGlvbnMgPSBodHRwUHJvdmlkZXJPcHRpb25zO1xuICAgIH1cbiAgICBzdGF0aWMgdmFsaWRhdGVDbGllbnRVcmwoY2xpZW50VXJsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY2xpZW50VXJsID09PSAnc3RyaW5nJyA/IC9eaHR0cChzKT86XFwvXFwvL2kudGVzdChjbGllbnRVcmwpIDogZmFsc2U7XG4gICAgfVxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgfVxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbiAgICBzdXBwb3J0c1N1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmVxdWVzdChwYXlsb2FkLCByZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwcm92aWRlck9wdGlvbnNDb21iaW5lZCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKF9hID0gdGhpcy5odHRwUHJvdmlkZXJPcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHJvdmlkZXJPcHRpb25zKSwgcmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaCh0aGlzLmNsaWVudFVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm92aWRlck9wdGlvbnNDb21iaW5lZCksIHsgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcHJvdmlkZXJPcHRpb25zQ29tYmluZWQuaGVhZGVycyksIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSwgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkgfSkpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlRXJyb3IoeWllbGQgcmVzcG9uc2UuanNvbigpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIHJldHVybiAoeWllbGQgcmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbiAgICBvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGhvZE5vdEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuICAgIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0aG9kTm90SW1wbGVtZW50ZWRFcnJvcigpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4gICAgb25jZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGhvZE5vdEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGhvZE5vdEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgfVxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0aG9kTm90SW1wbGVtZW50ZWRFcnJvcigpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgfVxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbiAgICByZWNvbm5lY3QoKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgfVxufVxuZXhwb3J0IHsgSHR0cFByb3ZpZGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/web3-providers-http/lib/esm/index.js\n");

/***/ })

};
;