"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_coc = require("coc.nvim");

// node_modules/ts-deepmerge/esm/index.js
var isObject = (obj) => {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
};
var merge = (...objects) => objects.reduce((result, current) => {
  if (Array.isArray(current)) {
    throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
  }
  Object.keys(current).forEach((key) => {
    if (["__proto__", "constructor", "prototype"].includes(key)) {
      return;
    }
    if (Array.isArray(result[key]) && Array.isArray(current[key])) {
      result[key] = merge.options.mergeArrays ? merge.options.uniqueArrayItems ? Array.from(new Set(result[key].concat(current[key]))) : [...result[key], ...current[key]] : current[key];
    } else if (isObject(result[key]) && isObject(current[key])) {
      result[key] = merge(result[key], current[key]);
    } else {
      result[key] = current[key] === void 0 ? merge.options.allowUndefinedOverrides ? current[key] : result[key] : current[key];
    }
  });
  return result;
}, {});
var defaultOptions = {
  allowUndefinedOverrides: true,
  mergeArrays: true,
  uniqueArrayItems: true
};
merge.options = defaultOptions;
merge.withOptions = (options, ...objects) => {
  merge.options = Object.assign(Object.assign({}, defaultOptions), options);
  const result = merge(...objects);
  merge.options = defaultOptions;
  return result;
};

// node_modules/xior/utils/index.mjs
function e(e2, r) {
  let t = new globalThis.AbortController();
  function n2(e3) {
    t.abort(e3), i2();
  }
  let o2 = [];
  for (let r2 of e2) {
    if ((null == r2 ? void 0 : r2.aborted) === true) {
      n2(r2.reason);
      break;
    }
    if ((null == r2 ? void 0 : r2.addEventListener) != null) {
      let e3 = () => {
        n2(r2.reason);
      };
      o2.push(() => {
        (null == r2 ? void 0 : r2.removeEventListener) != null && r2.removeEventListener("abort", e3);
      }), r2.addEventListener("abort", e3);
    }
  }
  function i2() {
    o2.forEach((e3) => {
      e3();
    }), null == r || r();
  }
  let s2 = t.signal;
  return s2.clear = i2, s2;
}
var n = void 0;
function o(e2, r = true, t = null, i2) {
  if (e2 === n || null === e2)
    return "";
  let s2 = [], l3 = r ? encodeURIComponent : (e3) => e3, u3 = Array.isArray(e2), { arrayFormat: a2, allowDots: f2, serializeDate: c2 } = i2 || {}, d2 = (e3) => {
    if (f2 && !u3)
      return `.${e3}`;
    if (u3) {
      if ("brackets" === a2)
        return "[]";
      if ("repeat" === a2)
        return "";
    }
    return `[${e3}]`;
  };
  for (let u4 in e2)
    if (Object.prototype.hasOwnProperty.call(e2, u4)) {
      let a3 = e2[u4];
      if (a3 !== n) {
        let e3 = t ? `${t}${d2(u4)}` : u4;
        if (!isNaN(a3) && a3 instanceof Date && (a3 = c2 ? c2(a3) : a3.toISOString()), "object" == typeof a3) {
          let t2 = o(a3, r, e3, i2);
          "" !== t2 && s2.push(t2);
        } else
          s2.push(`${l3(e3)}=${l3(a3)}`);
      }
    }
  return s2.join("&");
}
function i(e2) {
  return Array.isArray(e2) ? e2.map(i) : (e2 && "object" == typeof e2 && Object.keys(e2).forEach((r) => {
    let t = e2[r];
    t === n ? delete e2[r] : i(t);
  }), e2);
}
function s(e2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e2);
}
function l(e2, r) {
  return e2 ? r ? (e2.endsWith("/") ? e2 : e2 + "/") + ("/" === r[0] ? r.slice(1) : r) : e2 : r || "";
}
var u = class extends Error {
  constructor(e2, r, t) {
    super(e2), this.name = "XiorError", this.request = r, this.config = r, this.response = t;
  }
};
var a = class extends u {
  constructor(e2, r, t) {
    super(e2), this.name = "XiorTimeoutError", this.request = r, this.config = r, this.response = t;
  }
};

// node_modules/xior/dist/index.mjs
function u2(e2, t, r, n2, i2, s2, a2) {
  try {
    var o2 = e2[s2](a2), u3 = o2.value;
  } catch (e3) {
    r(e3);
    return;
  }
  o2.done ? t(u3) : Promise.resolve(u3).then(n2, i2);
}
function l2() {
  return (l2 = Object.assign || function(e2) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n2 in r)
        Object.prototype.hasOwnProperty.call(r, n2) && (e2[n2] = r[n2]);
    }
    return e2;
  }).apply(this, arguments);
}
var c = "application/";
var f = `${c}x-www-form-urlencoded`;
var h = `${c}json`;
var d = "undefined" != typeof URLSearchParams;
function p() {
  var n2;
  return n2 = function* (n3) {
    let i2 = n3.paramsSerializer || o, s2 = false !== n3.encodeURI, a2 = n3.method ? n3.method.toUpperCase() : "GET", o2 = n3.url || "", u3 = o2, c2 = d && n3.data && n3.data instanceof URLSearchParams, p2 = c2 ? Object.fromEntries(n3.data.entries()) : n3.data, y2 = p2, m2 = (null == n3 ? void 0 : n3.headers) ? l2({}, n3.headers) : {}, E2 = n3.params || {}, v2 = function(e2 = "GET") {
      return ["HEAD", "GET", "OPTIONS"].includes(e2);
    }(a2);
    if (p2 && !(p2 instanceof FormData)) {
      let r = "", s3 = "content-type";
      if (null == n3 ? void 0 : n3.headers) {
        let e2 = Object.keys(n3.headers).find((e3) => e3.toLowerCase() === s3);
        e2 && (s3 = e2, r = n3.headers[e2]);
      }
      (!r || c2) && (r = v2 || c2 ? f : h, m2[s3] = r), "object" != typeof p2 || (v2 && n3.params && (E2 = merge({}, p2 || {}, E2)), r === h ? y2 = JSON.stringify(i(p2)) : v2 || r !== f || (y2 = i2(p2)));
    }
    if (Object.keys(E2).length > 0) {
      let e2 = i2(E2, s2);
      o2 += o2.includes("?") ? `&${e2}` : `?${e2}`;
    }
    return l2({}, n3, { _data: y2, _url: o2, data: p2, url: u3, method: a2, headers: m2, isGet: v2 });
  }, (p = function() {
    var e2 = this, t = arguments;
    return new Promise(function(r, i2) {
      var s2 = n2.apply(e2, t);
      function a2(e3) {
        u2(s2, r, i2, a2, o2, "next", e3);
      }
      function o2(e3) {
        u2(s2, r, i2, a2, o2, "throw", e3);
      }
      a2(void 0);
    });
  }).apply(this, arguments);
}
function y(e2, t, r, n2, i2, s2, a2) {
  try {
    var o2 = e2[s2](a2), u3 = o2.value;
  } catch (e3) {
    r(e3);
    return;
  }
  o2.done ? t(u3) : Promise.resolve(u3).then(n2, i2);
}
function m(e2) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n2, i2) {
      var s2 = e2.apply(t, r);
      function a2(e3) {
        y(s2, n2, i2, a2, o2, "next", e3);
      }
      function o2(e3) {
        y(s2, n2, i2, a2, o2, "throw", e3);
      }
      a2(void 0);
    });
  };
}
function E() {
  return (E = Object.assign || function(e2) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n2 in r)
        Object.prototype.hasOwnProperty.call(r, n2) && (e2[n2] = r[n2]);
    }
    return e2;
  }).apply(this, arguments);
}
var v = void 0;
var P = typeof AbortController != `${v}`;
function R() {
  return (R = m(function* (e2, t) {
    let r;
    if (!t || !e2.ok || ["text", "json"].includes(t)) {
      if ((r = yield e2.text()) && "text" !== t)
        try {
          r = JSON.parse(r);
        } catch (e3) {
        }
    } else if ("blob" === t)
      return e2.blob();
    else if ("arraybuffer" === t)
      return e2.arrayBuffer();
    return r;
  })).apply(this, arguments);
}
var b = class _b {
  static create(e2) {
    return new _b(e2);
  }
  get interceptors() {
    return { request: { use: (e2, t, r) => (this.REQI.push(e2), e2), eject: (e2) => {
      this.REQI = this.REQI.filter((t) => t !== e2);
    }, clear: () => {
      this.REQI = [];
    } }, response: { use: (e2, t) => (this.RESI.push({ fn: e2, onRejected: t }), e2), eject: (e2) => {
      this.RESI = this.RESI.filter((t) => t.fn !== e2);
    }, clear: () => {
      this.RESI = [];
    } } };
  }
  get plugins() {
    return { use: (e2) => (this.P.push(e2), e2), eject: (e2) => {
      this.P = this.P.filter((t) => t !== e2);
    }, clear: () => {
      this.P = [];
    } };
  }
  request(t) {
    var n2 = this;
    return m(function* () {
      let i2 = merge({}, n2.config || {}, n2.defaults || {}, "string" == typeof t ? { url: t } : t || {}, { headers: {}, params: {} });
      for (let e2 of (i2.withCredentials && !i2.credentials && (i2.credentials = "include"), i2.paramsSerializer || (i2.paramsSerializer = o), n2.REQI))
        i2 = yield e2(i2);
      let s2 = n2.fetch.bind(n2);
      n2.P.forEach((e2) => {
        s2 = e2(s2, n2);
      });
      let a2 = s2(i2);
      if (!i2._RESIRun) {
        let e2 = 0, t2 = [];
        for (n2.RESI.forEach(function(e3) {
          t2.push(e3.fn, e3.onRejected);
        }); t2.length > e2; )
          a2 = a2.then(t2[e2++], t2[e2++]);
      }
      return a2;
    })();
  }
  fetch(e2) {
    return m(function* () {
      let t;
      let r = yield function(e3) {
        return p.apply(this, arguments);
      }(e2), { url: u3, method: l3, headers: c2, timeout: f2, signal: h2, data: d2, _data: y2, _url: b2, isGet: O2 } = r, g = function(e3, t2) {
        if (null == e3)
          return {};
        var r2, n2, i2 = {}, s2 = Object.keys(e3);
        for (n2 = 0; n2 < s2.length; n2++)
          t2.indexOf(r2 = s2[n2]) >= 0 || (i2[r2] = e3[r2]);
        return i2;
      }(r, ["url", "method", "headers", "timeout", "signal", "data", "_data", "_url", "isGet"]);
      e2._url = b2;
      let S = [], j = v;
      if (f2 && P) {
        let t2 = new AbortController();
        j = setTimeout(() => {
          t2.abort(new a(`timeout of ${f2}ms exceeded`, e2));
        }, f2), S.push(t2.signal);
      }
      h2 && S.push(h2), t = S[0], S.length > 1 && (t = e(S, () => {
        clearTimeout(j);
      }));
      let I = b2 || u3;
      return e2.baseURL && !s(I) && (I = l(e2.baseURL, I)), fetch(I, E({ body: O2 ? v : y2 }, g, { signal: t, method: l3, headers: c2 })).then(m(function* (t2) {
        let { responseType: r2 } = e2, n2 = { data: yield function(e3, t3) {
          return R.apply(this, arguments);
        }(t2, r2), response: t2, config: e2, request: e2, status: t2.status, statusText: t2.statusText, headers: t2.headers };
        return t2.ok ? n2 : Promise.reject(new u(t2.status ? `Request failed with status code ${t2.status}` : "Network error", e2, n2));
      })).finally(() => {
        var e3;
        j && clearTimeout(j), null == t || null == (e3 = t.clear) || e3.call(t);
      });
    })();
  }
  cG(e2) {
    return (t, r) => this.request(r ? E({}, r, { method: e2, url: t }) : { method: e2, url: t });
  }
  cP(e2) {
    return (t, r, n2) => this.request(n2 ? E({}, n2, { method: e2, url: t, data: r }) : { method: e2, url: t, data: r });
  }
  get(e2, t) {
    return this.cG("GET")(e2, t);
  }
  head(e2, t) {
    return this.cG("HEAD")(e2, t);
  }
  post(e2, t, r) {
    return this.cP("POST")(e2, t, r);
  }
  put(e2, t, r) {
    return this.cP("PUT")(e2, t, r);
  }
  patch(e2, t, r) {
    return this.cP("PATCH")(e2, t, r);
  }
  delete(e2, t) {
    return this.cG("DELETE")(e2, t);
  }
  options(e2, t) {
    return this.cG("OPTIONS")(e2, t);
  }
  constructor(e2) {
    this.REQI = [], this.RESI = [], this.P = [], this.config = e2, this.defaults = { params: {}, headers: {} };
  }
};
b.VERSION = "0.6.3";
var O = Object.assign(b.create(), { create: b.create, VERSION: b.VERSION });

// src/index.ts
async function getWordMeaning(word) {
  try {
    const response = await O.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = response.data;
    if (Array.isArray(data) && data.length > 0) {
      const meanings = data[0].meanings;
      let result = "";
      for (const meaning of meanings) {
        const partOfSpeech = meaning.partOfSpeech;
        const definitions = meaning.definitions;
        result += `**${partOfSpeech}**:
`;
        for (let i2 = 0; i2 < definitions.length; i2++) {
          result += `${i2 + 1}. ${definitions[i2].definition}
`;
        }
      }
      return result;
    }
  } catch (error) {
    const message = `error meaning ${error}`;
    import_coc.window.showInformationMessage(message);
  }
  return null;
}
function getWordRangeAtPosition(document, position) {
  const text = document.getText();
  const lines = text.split("\n");
  if (position.line >= lines.length) {
    return null;
  }
  const line = lines[position.line];
  let start = position.character;
  let end = position.character;
  while (start > 0 && /\w/.test(line[start - 1])) {
    start--;
  }
  while (end < line.length && /\w/.test(line[end])) {
    end++;
  }
  if (start === end) {
    return null;
  }
  return {
    start: { character: start, line: position.line },
    end: { character: end, line: position.line }
  };
}
async function doHover(document, position) {
  const wordRange = getWordRangeAtPosition(document, position);
  if (!wordRange)
    return null;
  const word = document.getText(wordRange);
  const meaning = await getWordMeaning(word);
  if (meaning) {
    return {
      contents: [meaning]
    };
  }
  return null;
}
async function activate(context) {
  const provider = {
    provideHover: doHover
  };
  const disposable = import_coc.languages.registerHoverProvider(["txt"], provider);
  context.subscriptions.push(disposable);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
