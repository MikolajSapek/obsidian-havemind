/* Havemind — Apache-2.0 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  ConflictResolveModal: () => ConflictResolveModal,
  HAVEMIND_ACTIVITY_VIEW: () => HAVEMIND_ACTIVITY_VIEW,
  HAVEMIND_ONBOARDING_VIEW: () => HAVEMIND_ONBOARDING_VIEW,
  HavemindOnboardingView: () => HavemindOnboardingView,
  buildConflictModalModel: () => buildConflictModalModel,
  default: () => HavemindPlugin,
  planQuarantineRequeueFallback: () => planQuarantineRequeueFallback,
  planRetryFromDisk: () => planRetryFromDisk,
  renderConflictModalBody: () => renderConflictModalBody,
  renderConflictSection: () => renderConflictSection,
  renderRecoveryNotice: () => renderRecoveryNotice,
  renderSendQueueSection: () => renderSendQueueSection
});
module.exports = __toCommonJS(main_exports);
var import_obsidian14 = require("obsidian");

// ../../packages/protocol/dist/appearance-scope.js
var OBSIDIAN_PREFIX = ".obsidian/";
var ALLOW_EXACT = /* @__PURE__ */ new Set([
  ".obsidian/appearance.json",
  ".obsidian/app.json",
  ".obsidian/core-plugins.json",
  // Graph view settings, node colour groups included — a stated user requirement.
  ".obsidian/graph.json",
  ".obsidian/hotkeys.json"
]);
var SNIPPETS_PREFIX = ".obsidian/snippets/";
var SNIPPETS_SEGMENT_COUNT = 3;
var SNIPPET_EXTENSIONS = /* @__PURE__ */ new Set(["css"]);
var THEMES_PREFIX = ".obsidian/themes/";
var THEMES_MIN_SEGMENT_COUNT = 4;
var THEME_EXTENSIONS = /* @__PURE__ */ new Set([
  "css",
  "gif",
  "jpeg",
  "jpg",
  "json",
  "png",
  "svg",
  "webp"
]);
var SECRET_STORE_SEGMENT = "data.json";
function normalizeSeparators(path) {
  return path.replace(/\\/gu, "/");
}
function extensionOf(path) {
  const dot = path.lastIndexOf(".");
  const slash = path.lastIndexOf("/");
  if (dot <= slash + 1)
    return "";
  return path.slice(dot + 1).toLowerCase();
}
function hasBlockedSegment(segments) {
  return segments.some((segment) => segment.length === 0 || segment === "." || segment === ".." || segment === SECRET_STORE_SEGMENT);
}
function isSyncableConfigPath(path) {
  const normalized = normalizeSeparators(path);
  if (!normalized.startsWith(OBSIDIAN_PREFIX))
    return false;
  const segments = normalized.split("/");
  if (hasBlockedSegment(segments))
    return false;
  if (ALLOW_EXACT.has(normalized))
    return true;
  if (normalized.startsWith(SNIPPETS_PREFIX)) {
    return segments.length === SNIPPETS_SEGMENT_COUNT && SNIPPET_EXTENSIONS.has(extensionOf(normalized));
  }
  if (normalized.startsWith(THEMES_PREFIX)) {
    return segments.length >= THEMES_MIN_SEGMENT_COUNT && THEME_EXTENSIONS.has(extensionOf(normalized));
  }
  return false;
}

// ../../packages/protocol/dist/canonicalization.js
var WINDOWS_DRIVE_PATH = /^[a-zA-Z]:/u;
var RESERVED_ROOTS = /* @__PURE__ */ new Set([
  ".obsidian",
  ".trash",
  "havemind conflicts"
]);
function canonicalizeMarkdown(content) {
  const withoutBom = content.charCodeAt(0) === 65279 ? content.slice(1) : content;
  const lf = withoutBom.replace(/\r\n?/gu, "\n");
  const withoutTrailingNewlines = lf.replace(/\n+$/u, "");
  return withoutTrailingNewlines.length === 0 ? "" : `${withoutTrailingNewlines}
`;
}
function containsControlCharacter(value) {
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    if (codePoint !== void 0 && (codePoint <= 31 || codePoint >= 127 && codePoint <= 159)) {
      return true;
    }
  }
  return false;
}
function normalizedVaultPath(path) {
  if (path.length === 0) {
    throw new Error("Vault path must not be empty.");
  }
  if (path.startsWith("/") || path.includes("\\") || WINDOWS_DRIVE_PATH.test(path)) {
    throw new Error("Vault path must be relative and use forward slashes.");
  }
  if (containsControlCharacter(path)) {
    throw new Error("Vault path must not contain control characters.");
  }
  const normalized = path.normalize("NFC");
  const segments = normalized.split("/");
  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    throw new Error("Vault path contains an empty or traversal segment.");
  }
  return normalized;
}
function reservedRoot(path) {
  const [root] = path.split("/");
  if (root === void 0 || !RESERVED_ROOTS.has(root.toLowerCase())) {
    return false;
  }
  if (isSyncableConfigPath(path)) {
    return false;
  }
  return true;
}
function canonicalizeVaultPath(path) {
  const normalized = normalizedVaultPath(path);
  if (reservedRoot(normalized)) {
    throw new Error("Vault path uses a reserved Havemind root.");
  }
  return normalized;
}

// ../../node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPreprocess: () => ZodPreprocess,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  config: () => config,
  core: () => core_exports2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getErrorMap: () => getErrorMap,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  includes: () => _includes,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  invertCodec: () => invertCodec,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse2,
  safeParseAsync: () => safeParseAsync2,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// ../../node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPreprocess: () => $ZodPreprocess,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  clone: () => clone,
  config: () => config,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  initializeContext: () => initializeContext,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidJWT: () => isValidJWT,
  locales: () => locales_exports,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  prettifyError: () => prettifyError,
  process: () => process,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  treeifyError: () => treeifyError,
  util: () => util_exports,
  version: () => version
});

// ../../node_modules/zod/v4/core/core.js
var _a;
var NEVER = /* @__PURE__ */ Object.freeze({
  status: "aborted"
});
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer3, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: /* @__PURE__ */ new Set()
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer3(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a3;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
};
var $ZodEncodeError = class extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
};
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}

// ../../node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  explicitlyAborted: () => explicitlyAborted,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set2 = false;
  return {
    get value() {
      if (!set2) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const ratio = val / step;
  const roundedRatio = Math.round(ratio);
  const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
  if (Math.abs(ratio - roundedRatio) < tolerance)
    return 0;
  return ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object2, key, getter) {
  let value = void 0;
  Object.defineProperty(object2, key, {
    get() {
      if (value === EVALUATING) {
        return void 0;
      }
      if (value === void 0) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless) {
    return false;
  }
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  if (o instanceof Map)
    return new Map(o);
  if (o instanceof Set)
    return new Set(o);
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set([
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "undefined"
]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  if (a._zod.def.checks?.length) {
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  }
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? []
  });
  return clone(a, def);
}
function partial(Class2, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class2, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a3;
    (_a3 = iss).path ?? (_a3.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
  const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
  rest.path ?? (rest.path = []);
  rest.message = message;
  if (ctx?.reportInput) {
    rest.input = _input;
  }
  return rest;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  const binaryString = atob(base643);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex3) {
  const cleanHex = hex3.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
  constructor(..._args) {
  }
};

// ../../node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error51, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error51.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error51, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error52, path = []) => {
    for (const issue2 of error52.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue2));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue2));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    }
  };
  processError(error51);
  return fieldErrors;
}
function treeifyError(error51, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error52, path = []) => {
    var _a3, _b;
    for (const issue2 of error52.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a3 = curr.properties)[el] ?? (_a3[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error51);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error51) {
  const lines = [];
  const issues = [...error51.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`\u2716 ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}

// ../../node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// ../../node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  cuid: () => cuid,
  cuid2: () => cuid2,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  httpProtocol: () => httpProtocol,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time3 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time3}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// ../../node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a3;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a3 = inst._zod).onattach ?? (_a3.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a3;
    (_a3 = inst2._zod.bag).multipleOf ?? (_a3.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a3;
  $ZodCheck.init(inst, def);
  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a3, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a3 = inst._zod).check ?? (_a3.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// ../../node_modules/zod/v4/core/doc.js
var Doc = class {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
};

// ../../node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 4,
  patch: 3
};

// ../../node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a3;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload))
            continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      if (!def.normalize && def.protocol?.source === httpProtocol.source) {
        if (!/^https?:\/\//i.test(trimmed)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid URL format",
            input: payload.value,
            inst,
            continue: !def.abort
          });
          return;
        }
      }
      const url2 = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url2.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url2.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error();
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (/\s/.test(data))
    return false;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {
      }
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
  const isPresent = key in input;
  if (result.issues.length) {
    if (isOptionalIn && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && !isOptionalIn) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: void 0,
        path: [key]
      });
    }
    return;
  }
  if (result.value === void 0) {
    if (isPresent) {
      final.value[key] = void 0;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalIn = _catchall.optin === "optional";
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (key === "__proto__")
      continue;
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalIn = el._zod.optin === "optional";
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalIn = schema?._zod?.optin === "optional";
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalIn && isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else if (!isOptionalIn) {
        doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map2 = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map2.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map2.set(v, o);
      }
    }
    return map2;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback || ctx.direction === "backward") {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      options: Array.from(disc.value.keys()),
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const optinStart = getTupleOptStart(items, "optin");
    const optoutStart = getTupleOptStart(items, "optout");
    if (!def.rest) {
      if (input.length < optinStart) {
        payload.issues.push({
          code: "too_small",
          minimum: optinStart,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
      if (input.length > items.length) {
        payload.issues.push({
          code: "too_big",
          maximum: items.length,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
      }
    }
    const itemResults = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      const r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((rr) => {
          itemResults[i] = rr;
        }));
      } else {
        itemResults[i] = r;
      }
    }
    if (def.rest) {
      let i = items.length - 1;
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((r) => handleTupleResult(r, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
    }
    return handleTupleResults(itemResults, payload, items, input, optoutStart);
  };
});
function getTupleOptStart(items, key) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i]._zod[key] !== "optional")
      return i + 1;
  }
  return 0;
}
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
function handleTupleResults(itemResults, final, items, input, optoutStart) {
  for (let i = 0; i < items.length; i++) {
    const r = itemResults[i];
    const isPresent = i < input.length;
    if (r.issues.length) {
      if (!isPresent && i >= optoutStart) {
        final.value.length = i;
        break;
      }
      final.issues.push(...prefixIssues(i, r.issues));
    }
    final.value[i] = r.value;
  }
  for (let i = final.value.length - 1; i >= input.length; i--) {
    if (items[i]._zod.optout === "optional" && final.value[i] === void 0) {
      final.value.length = i;
    } else {
      break;
    }
  }
  return final;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = /* @__PURE__ */ new Set();
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          if (keyResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
            continue;
          }
          const outKey = keyResult.value;
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[outKey] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(input, key))
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Map();
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Set();
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        payload.fallback = true;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    payload.fallback = true;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (input === void 0 && (result.issues.length || result.fallback)) {
    return { issues: [], value: void 0 };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const input = payload.value;
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, input));
      return handleOptionalResult(result, input);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
          payload.fallback = true;
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
      payload.fallback = true;
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
  $ZodPipe.init(inst, def);
});
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => {
    const d = def;
    if (!d._cachedInner)
      d._cachedInner = def.getter();
    return d._cachedInner;
  });
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}

// ../../node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  ca: () => ca_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  el: () => el_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  he: () => he_default,
  hr: () => hr_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  nl: () => nl_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ro: () => ro_default,
  ru: () => ru_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  th: () => th_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// ../../node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0645\u062F\u062E\u0644",
    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    url: "\u0631\u0627\u0628\u0637",
    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
    jwt: "JWT",
    template_literal: "\u0645\u062F\u062E\u0644"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
        }
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}

// ../../node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
        if (_issue.format === "ends_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
        if (_issue.format === "includes")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
        if (_issue.format === "regex")
          return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
        return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return `Yanl\u0131\u015F d\u0259y\u0259r`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}

// ../../node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0443\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0430\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0447\u0430\u0441",
    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0443\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u043B\u0456\u043A",
    array: "\u043C\u0430\u0441\u0456\u045E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
        }
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
      default:
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}

// ../../node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u043E\u0434",
    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    json_string: "JSON \u043D\u0438\u0437",
    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
        }
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        if (_issue.format === "emoji")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "datetime")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "date")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        if (_issue.format === "time")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "duration")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}

// ../../node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adre\xE7a electr\xF2nica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adre\xE7a IPv4",
    ipv6: "adre\xE7a IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
        return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element inv\xE0lid a ${issue2.origin}`;
      default:
        return `Entrada inv\xE0lida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}

// ../../node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regul\xE1rn\xED v\xFDraz",
    email: "e-mailov\xE1 adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a \u010Das ve form\xE1tu ISO",
    date: "datum ve form\xE1tu ISO",
    time: "\u010Das ve form\xE1tu ISO",
    duration: "doba trv\xE1n\xED ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
    e164: "\u010D\xEDslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u010D\xEDslo",
    string: "\u0159et\u011Bzec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
        }
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
        return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
      default:
        return `Neplatn\xFD vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}

// ../../node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkesl\xE6t",
    date: "ISO-dato",
    time: "ISO-klokkesl\xE6t",
    duration: "ISO-varighed",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "s\xE6t",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}

// ../../node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${issue2.origin}`;
      default:
        return `Ung\xFCltige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}

// ../../node_modules/zod/v4/locales/el.js
var error9 = () => {
  const Sizable = {
    string: { unit: "\u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    file: { unit: "bytes", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    array: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    set: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    map: { unit: "\u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2",
    email: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03CE\u03C1\u03B1",
    date: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1",
    time: "ISO \u03CE\u03C1\u03B1",
    duration: "ISO \u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1",
    ipv4: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv4",
    ipv6: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv6",
    mac: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 MAC",
    cidrv4: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv4",
    cidrv6: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv6",
    base64: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64",
    base64url: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64url",
    json_string: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC JSON",
    e164: "\u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 E.164",
    jwt: "JWT",
    template_literal: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (typeof issue2.expected === "string" && /^[A-Z]/.test(issue2.expected)) {
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD instanceof ${issue2.expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}`;
        }
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${stringifyPrimitive(issue2.values[0])}`;
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD \u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1"}`;
        return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03BE\u03B5\u03BA\u03B9\u03BD\u03AC \u03BC\u03B5 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03BD\u03B5\u03B9 \u03BC\u03B5 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03BF \u03BC\u03BF\u03C4\u03AF\u03B2\u03BF ${_issue.pattern}`;
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03AC\u03C3\u03B9\u03BF \u03C4\u03BF\u03C5 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4${issue2.keys.length > 1 ? "\u03B1" : "\u03BF"} \u03BA\u03BB\u03B5\u03B9\u03B4${issue2.keys.length > 1 ? "\u03B9\u03AC" : "\u03AF"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF \u03BA\u03BB\u03B5\u03B9\u03B4\u03AF \u03C3\u03C4\u03BF ${issue2.origin}`;
      case "invalid_union":
        return "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2";
      case "invalid_element":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C4\u03B9\u03BC\u03AE \u03C3\u03C4\u03BF ${issue2.origin}`;
      default:
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2`;
    }
  };
};
function el_default() {
  return {
    localeError: error9()
  };
}

// ../../node_modules/zod/v4/locales/en.js
var error10 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error10()
  };
}

// ../../node_modules/zod/v4/locales/eo.js
var error11 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emo\u011Dio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-da\u016Dro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
        }
        return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error11()
  };
}

// ../../node_modules/zod/v4/locales/es.js
var error12 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "direcci\xF3n de correo electr\xF3nico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duraci\xF3n ISO",
    ipv4: "direcci\xF3n IPv4",
    ipv6: "direcci\xF3n IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "n\xFAmero",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "n\xFAmero grande",
    symbol: "s\xEDmbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "funci\xF3n",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeraci\xF3n",
    union: "uni\xF3n",
    literal: "literal",
    promise: "promesa",
    void: "vac\xEDo",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
        return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inv\xE1lida`;
    }
  };
};
function es_default() {
  return {
    localeError: error12()
  };
}

// ../../node_modules/zod/v4/locales/fa.js
var error13 = () => {
  const Sizable = {
    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u06CC",
    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
    url: "URL",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
    base64: "base64-encoded \u0631\u0634\u062A\u0647",
    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
    json_string: "JSON \u0631\u0634\u062A\u0647",
    e164: "E.164 \u0639\u062F\u062F",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0622\u0631\u0627\u06CC\u0647"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
        }
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
        }
        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
        }
        if (_issue.format === "ends_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
        }
        if (_issue.format === "includes") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
        }
        if (_issue.format === "regex") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
      case "invalid_union":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
      default:
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
    }
  };
};
function fa_default() {
  return {
    localeError: error13()
  };
}

// ../../node_modules/zod/v4/locales/fi.js
var error14 = () => {
  const Sizable = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "s\xE4\xE4nn\xF6llinen lauseke",
    email: "s\xE4hk\xF6postiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen sy\xF6te`;
    }
  };
};
function fi_default() {
  return {
    localeError: error14()
  };
}

// ../../node_modules/zod/v4/locales/fr.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    string: "cha\xEEne",
    number: "nombre",
    int: "entier",
    boolean: "bool\xE9en",
    bigint: "grand entier",
    symbol: "symbole",
    undefined: "ind\xE9fini",
    null: "null",
    never: "jamais",
    void: "vide",
    date: "date",
    array: "tableau",
    object: "objet",
    tuple: "tuple",
    record: "enregistrement",
    map: "carte",
    set: "ensemble",
    file: "fichier",
    nonoptional: "non-optionnel",
    nan: "NaN",
    function: "fonction"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
        }
        return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
        return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error15()
  };
}

// ../../node_modules/zod/v4/locales/fr-CA.js
var error16 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
        }
        return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u2264" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u2265" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error16()
  };
}

// ../../node_modules/zod/v4/locales/he.js
var error17 = () => {
  const TypeNames = {
    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
  };
  const Sizable = {
    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
    // no unit
  };
  const typeEntry = (t) => t ? TypeNames[t] : void 0;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `\u05D4${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
        }
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${noun} \u05DC\u05D0 ${adjective}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
      }
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
      }
      default:
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
    }
  };
};
function he_default() {
  return {
    localeError: error17()
  };
}

// ../../node_modules/zod/v4/locales/hr.js
var error18 = () => {
  const Sizable = {
    string: { unit: "znakova", verb: "imati" },
    file: { unit: "bajtova", verb: "imati" },
    array: { unit: "stavki", verb: "imati" },
    set: { unit: "stavki", verb: "imati" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "unos",
    email: "email adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum i vrijeme",
    date: "ISO datum",
    time: "ISO vrijeme",
    duration: "ISO trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "IPv4 raspon",
    cidrv6: "IPv6 raspon",
    base64: "base64 kodirani tekst",
    base64url: "base64url kodirani tekst",
    json_string: "JSON tekst",
    e164: "E.164 broj",
    jwt: "JWT",
    template_literal: "unos"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "tekst",
    number: "broj",
    boolean: "boolean",
    array: "niz",
    object: "objekt",
    set: "skup",
    file: "datoteka",
    date: "datum",
    bigint: "bigint",
    symbol: "simbol",
    undefined: "undefined",
    null: "null",
    function: "funkcija",
    map: "mapa"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neispravan unos: o\u010Dekuje se instanceof ${issue2.expected}, a primljeno je ${received}`;
        }
        return `Neispravan unos: o\u010Dekuje se ${expected}, a primljeno je ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neispravna vrijednost: o\u010Dekivano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neispravna opcija: o\u010Dekivano jedno od ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} ima ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
        return `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} bude ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Premalo: o\u010Dekivano da ${origin} ima ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premalo: o\u010Dekivano da ${origin} bude ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neispravan tekst: mora zapo\u010Dinjati s "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neispravan tekst: mora zavr\u0161avati s "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neispravan tekst: mora sadr\u017Eavati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
        return `Neispravna ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neispravan broj: mora biti vi\u0161ekratnik od ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznat${issue2.keys.length > 1 ? "i klju\u010Devi" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neispravan klju\u010D u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Neispravan unos";
      case "invalid_element":
        return `Neispravna vrijednost u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Neispravan unos`;
    }
  };
};
function hr_default() {
  return {
    localeError: error18()
  };
}

// ../../node_modules/zod/v4/locales/hu.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email c\xEDm",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO id\u0151b\xE9lyeg",
    date: "ISO d\xE1tum",
    time: "ISO id\u0151",
    duration: "ISO id\u0151intervallum",
    ipv4: "IPv4 c\xEDm",
    ipv6: "IPv6 c\xEDm",
    cidrv4: "IPv4 tartom\xE1ny",
    cidrv6: "IPv6 tartom\xE1ny",
    base64: "base64-k\xF3dolt string",
    base64url: "base64url-k\xF3dolt string",
    json_string: "JSON string",
    e164: "E.164 sz\xE1m",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "sz\xE1m",
    array: "t\xF6mb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
        }
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
        if (_issue.format === "ends_with")
          return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
        if (_issue.format === "includes")
          return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
        return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
      default:
        return `\xC9rv\xE9nytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error19()
  };
}

// ../../node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error20 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0576\u0577\u0561\u0576",
        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    file: {
      unit: {
        one: "\u0562\u0561\u0575\u0569",
        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    array: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    set: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0574\u0578\u0582\u057F\u0584",
    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
    url: "URL",
    emoji: "\u0567\u0574\u0578\u057B\u056B",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
    time: "ISO \u056A\u0561\u0574",
    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    json_string: "JSON \u057F\u0578\u0572",
    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
    jwt: "JWT",
    template_literal: "\u0574\u0578\u0582\u057F\u0584"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0569\u056B\u057E",
    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
        }
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
        if (_issue.format === "ends_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
        if (_issue.format === "includes")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
        return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      default:
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
    }
  };
};
function hy_default() {
  return {
    localeError: error20()
  };
}

// ../../node_modules/zod/v4/locales/id.js
var error21 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error21()
  };
}

// ../../node_modules/zod/v4/locales/is.js
var error22 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "a\xF0 hafa" },
    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
    array: { unit: "hluti", verb: "a\xF0 hafa" },
    set: { unit: "hluti", verb: "a\xF0 hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefsl\xF3\xF0",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og t\xEDmi",
    date: "ISO dagsetning",
    time: "ISO t\xEDmi",
    duration: "ISO t\xEDmalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 t\xF6lugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error22()
  };
}

// ../../node_modules/zod/v4/locales/it.js
var error23 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Input non valido: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error23()
  };
}

// ../../node_modules/zod/v4/locales/ja.js
var error24 = () => {
  const Sizable = {
    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u5165\u529B\u5024",
    email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
    url: "URL",
    emoji: "\u7D75\u6587\u5B57",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u6642",
    date: "ISO\u65E5\u4ED8",
    time: "ISO\u6642\u523B",
    duration: "ISO\u671F\u9593",
    ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
    ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
    cidrv4: "IPv4\u7BC4\u56F2",
    cidrv6: "IPv6\u7BC4\u56F2",
    base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    json_string: "JSON\u6587\u5B57\u5217",
    e164: "E.164\u756A\u53F7",
    jwt: "JWT",
    template_literal: "\u5165\u529B\u5024"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5024",
    array: "\u914D\u5217"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
        }
        return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "ends_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "includes")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "regex")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return `\u7121\u52B9\u306A\u5165\u529B`;
    }
  };
};
function ja_default() {
  return {
    localeError: error24()
  };
}

// ../../node_modules/zod/v4/locales/ka.js
var error25 = () => {
  const Sizable = {
    string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
    email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    url: "URL",
    emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
    date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
    time: "\u10D3\u10E0\u10DD",
    duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
    ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8",
    base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8",
    json_string: "JSON \u10D5\u10D4\u10DA\u10D8",
    e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
    jwt: "JWT",
    template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
    string: "\u10D5\u10D4\u10DA\u10D8",
    boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
    function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
    array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
        }
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
        }
        if (_issue.format === "ends_with")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
        if (_issue.format === "includes")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
        if (_issue.format === "regex")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
      default:
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
    }
  };
};
function ka_default() {
  return {
    localeError: error25()
  };
}

// ../../node_modules/zod/v4/locales/km.js
var error26 = () => {
  const Sizable = {
    string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
    url: "URL",
    emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
    date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
    time: "\u1798\u17C9\u17C4\u1784 ISO",
    duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
    ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
    base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
    json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
    e164: "\u179B\u17C1\u1781 E.164",
    jwt: "JWT",
    template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u179B\u17C1\u1781",
    array: "\u17A2\u17B6\u179A\u17C1 (Array)",
    null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
        }
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      case "invalid_union":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      default:
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
    }
  };
};
function km_default() {
  return {
    localeError: error26()
  };
}

// ../../node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}

// ../../node_modules/zod/v4/locales/ko.js
var error27 = () => {
  const Sizable = {
    string: { unit: "\uBB38\uC790", verb: "to have" },
    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
    array: { unit: "\uAC1C", verb: "to have" },
    set: { unit: "\uAC1C", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\uC785\uB825",
    email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    url: "URL",
    emoji: "\uC774\uBAA8\uC9C0",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
    date: "ISO \uB0A0\uC9DC",
    time: "ISO \uC2DC\uAC04",
    duration: "ISO \uAE30\uAC04",
    ipv4: "IPv4 \uC8FC\uC18C",
    ipv6: "IPv6 \uC8FC\uC18C",
    cidrv4: "IPv4 \uBC94\uC704",
    cidrv6: "IPv6 \uBC94\uC704",
    base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    json_string: "JSON \uBB38\uC790\uC5F4",
    e164: "E.164 \uBC88\uD638",
    jwt: "JWT",
    template_literal: "\uC785\uB825"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
        }
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
        const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing)
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
        const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing) {
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
        }
        if (_issue.format === "ends_with")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "includes")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "regex")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
      case "invalid_union":
        return `\uC798\uBABB\uB41C \uC785\uB825`;
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
      default:
        return `\uC798\uBABB\uB41C \uC785\uB825`;
    }
  };
};
function ko_default() {
  return {
    localeError: error27()
  };
}

// ../../node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number4) {
  const abs = Math.abs(number4);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error28 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simboli\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "bait\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne didesnis kaip",
          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
          notInclusive: "turi b\u016Bti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "\u012Fvestis",
    email: "el. pa\u0161to adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukm\u0117",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 u\u017Ekoduota eilut\u0117",
    base64url: "base64url u\u017Ekoduota eilut\u0117",
    json_string: "JSON eilut\u0117",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "\u012Fvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skai\u010Dius",
    bigint: "sveikasis skai\u010Dius",
    string: "eilut\u0117",
    boolean: "login\u0117 reik\u0161m\u0117",
    undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulin\u0117 reik\u0161m\u0117"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error28()
  };
}

// ../../node_modules/zod/v4/locales/mk.js
var error29 = () => {
  const Sizable = {
    string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u043D\u0435\u0441",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u045F\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0443\u043C",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
    cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
    cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
    base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    json_string: "JSON \u043D\u0438\u0437\u0430",
    e164: "E.164 \u0431\u0440\u043E\u0458",
    jwt: "JWT",
    template_literal: "\u0432\u043D\u0435\u0441"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0431\u0440\u043E\u0458",
    array: "\u043D\u0438\u0437\u0430"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
        }
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
      default:
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
    }
  };
};
function mk_default() {
  return {
    localeError: error29()
  };
}

// ../../node_modules/zod/v4/locales/ms.js
var error30 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error30()
  };
}

// ../../node_modules/zod/v4/locales/nl.js
var error31 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error31()
  };
}

// ../../node_modules/zod/v4/locales/no.js
var error32 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "\xE5 ha" },
    file: { unit: "bytes", verb: "\xE5 ha" },
    array: { unit: "elementer", verb: "\xE5 inneholde" },
    set: { unit: "elementer", verb: "\xE5 inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error32()
  };
}

// ../../node_modules/zod/v4/locales/ota.js
var error33 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostag\xE2h",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO heng\xE2m\u0131",
    date: "ISO tarihi",
    time: "ISO zaman\u0131",
    duration: "ISO m\xFCddeti",
    ipv4: "IPv4 ni\u015F\xE2n\u0131",
    ipv6: "IPv6 ni\u015F\xE2n\u0131",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-\u015Fifreli metin",
    base64url: "base64url-\u015Fifreli metin",
    json_string: "JSON metin",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
        return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
        }
        return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
        if (_issue.format === "ends_with")
          return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
        if (_issue.format === "regex")
          return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
        return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return `K\u0131ymet tan\u0131namad\u0131.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error33()
  };
}

// ../../node_modules/zod/v4/locales/ps.js
var error34 = () => {
  const Sizable = {
    string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
    array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u064A",
    email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
    date: "\u0646\u06D0\u067C\u0647",
    time: "\u0648\u062E\u062A",
    duration: "\u0645\u0648\u062F\u0647",
    ipv4: "\u062F IPv4 \u067E\u062A\u0647",
    ipv6: "\u062F IPv6 \u067E\u062A\u0647",
    cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
    cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
    base64: "base64-encoded \u0645\u062A\u0646",
    base64url: "base64url-encoded \u0645\u062A\u0646",
    json_string: "JSON \u0645\u062A\u0646",
    e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u064A"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0627\u0631\u06D0"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
        }
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
        }
        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
        }
        if (_issue.format === "ends_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
        }
        if (_issue.format === "includes") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
        }
        if (_issue.format === "regex") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      case "invalid_union":
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      default:
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
    }
  };
};
function ps_default() {
  return {
    localeError: error34()
  };
}

// ../../node_modules/zod/v4/locales/pl.js
var error35 = () => {
  const Sizable = {
    string: { unit: "znak\xF3w", verb: "mie\u0107" },
    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
    array: { unit: "element\xF3w", verb: "mie\u0107" },
    set: { unit: "element\xF3w", verb: "mie\u0107" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyra\u017Cenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
    base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
    json_string: "ci\u0105g znak\xF3w w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wej\u015Bcie"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
        return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
      default:
        return `Nieprawid\u0142owe dane wej\u015Bciowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error35()
  };
}

// ../../node_modules/zod/v4/locales/pt.js
var error36 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padr\xE3o",
    email: "endere\xE7o de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "dura\xE7\xE3o ISO",
    ipv4: "endere\xE7o IPv4",
    ipv6: "endere\xE7o IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmero",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${issue2.origin}`;
      default:
        return `Campo inv\xE1lido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error36()
  };
}

// ../../node_modules/zod/v4/locales/ro.js
var error37 = () => {
  const Sizable = {
    string: { unit: "caractere", verb: "s\u0103 aib\u0103" },
    file: { unit: "octe\u021Bi", verb: "s\u0103 aib\u0103" },
    array: { unit: "elemente", verb: "s\u0103 aib\u0103" },
    set: { unit: "elemente", verb: "s\u0103 aib\u0103" },
    map: { unit: "intr\u0103ri", verb: "s\u0103 aib\u0103" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "intrare",
    email: "adres\u0103 de email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "dat\u0103 \u0219i or\u0103 ISO",
    date: "dat\u0103 ISO",
    time: "or\u0103 ISO",
    duration: "durat\u0103 ISO",
    ipv4: "adres\u0103 IPv4",
    ipv6: "adres\u0103 IPv6",
    mac: "adres\u0103 MAC",
    cidrv4: "interval IPv4",
    cidrv6: "interval IPv6",
    base64: "\u0219ir codat base64",
    base64url: "\u0219ir codat base64url",
    json_string: "\u0219ir JSON",
    e164: "num\u0103r E.164",
    jwt: "JWT",
    template_literal: "intrare"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "\u0219ir",
    number: "num\u0103r",
    boolean: "boolean",
    function: "func\u021Bie",
    array: "matrice",
    object: "obiect",
    undefined: "nedefinit",
    symbol: "simbol",
    bigint: "num\u0103r mare",
    void: "void",
    never: "never",
    map: "hart\u0103",
    set: "set"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Intrare invalid\u0103: a\u0219teptat ${expected}, primit ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Intrare invalid\u0103: a\u0219teptat ${stringifyPrimitive(issue2.values[0])}`;
        return `Op\u021Biune invalid\u0103: a\u0219teptat una dintre ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Prea mare: a\u0219teptat ca ${issue2.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemente"}`;
        return `Prea mare: a\u0219teptat ca ${issue2.origin ?? "valoarea"} s\u0103 fie ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Prea mic: a\u0219teptat ca ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Prea mic: a\u0219teptat ca ${issue2.origin} s\u0103 fie ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0218ir invalid: trebuie s\u0103 \xEEnceap\u0103 cu "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u0218ir invalid: trebuie s\u0103 se termine cu "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0218ir invalid: trebuie s\u0103 includ\u0103 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u0218ir invalid: trebuie s\u0103 se potriveasc\u0103 cu modelul ${_issue.pattern}`;
        return `Format invalid: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Num\u0103r invalid: trebuie s\u0103 fie multiplu de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chei nerecunoscute: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cheie invalid\u0103 \xEEn ${issue2.origin}`;
      case "invalid_union":
        return "Intrare invalid\u0103";
      case "invalid_element":
        return `Valoare invalid\u0103 \xEEn ${issue2.origin}`;
      default:
        return `Intrare invalid\u0103`;
    }
  };
};
function ro_default() {
  return {
    localeError: error37()
  };
}

// ../../node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error38 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u044F",
    duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
    base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
    json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
    }
  };
};
function ru_default() {
  return {
    localeError: error38()
  };
}

// ../../node_modules/zod/v4/locales/sl.js
var error39 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-po\u0161tni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in \u010Das",
    date: "ISO datum",
    time: "ISO \u010Das",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 \u0161tevilka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0161tevilo",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error39()
  };
}

// ../../node_modules/zod/v4/locales/sv.js
var error40 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att inneh\xE5lla" },
    set: { unit: "objekt", verb: "att inneh\xE5lla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulj\xE4rt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad str\xE4ng",
    base64url: "base64url-kodad str\xE4ng",
    json_string: "JSON-str\xE4ng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error40()
  };
}

// ../../node_modules/zod/v4/locales/ta.js
var error41 = () => {
  const Sizable = {
    string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
    email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
    time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
    ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
    e164: "E.164 \u0B8E\u0BA3\u0BCD",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0B8E\u0BA3\u0BCD",
    array: "\u0B85\u0BA3\u0BBF",
    null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
        }
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "ends_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "includes")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "regex")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
    }
  };
};
function ta_default() {
  return {
    localeError: error41()
  };
}

// ../../node_modules/zod/v4/locales/th.js
var error42 = () => {
  const Sizable = {
    string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
    url: "URL",
    emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
    time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
    ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
    cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
    cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
    base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
    base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
    json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
    e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
    jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
    template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
    array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
    null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
        }
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
        if (_issue.format === "regex")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      default:
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
    }
  };
};
function th_default() {
  return {
    localeError: error42()
  };
}

// ../../node_modules/zod/v4/locales/tr.js
var error43 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmal\u0131" },
    file: { unit: "bayt", verb: "olmal\u0131" },
    array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
    set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO s\xFCre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aral\u0131\u011F\u0131",
    cidrv6: "IPv6 aral\u0131\u011F\u0131",
    base64: "base64 ile \u015Fifrelenmi\u015F metin",
    base64url: "base64url ile \u015Fifrelenmi\u015F metin",
    json_string: "JSON dizesi",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "\u015Eablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
        return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
        if (_issue.format === "ends_with")
          return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
        if (_issue.format === "regex")
          return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
        return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return `Ge\xE7ersiz de\u011Fer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error43()
  };
}

// ../../node_modules/zod/v4/locales/uk.js
var error44 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
    date: "\u0434\u0430\u0442\u0430 ISO",
    time: "\u0447\u0430\u0441 ISO",
    duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
    ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
    ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
    cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
    cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
    base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
    base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
    json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
    }
  };
};
function uk_default() {
  return {
    localeError: error44()
  };
}

// ../../node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}

// ../../node_modules/zod/v4/locales/ur.js
var error45 = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
    file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
    array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
    set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0627\u0646 \u067E\u0679",
    email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
    uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
    nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
    ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
    xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
    ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
    date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
    time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
    duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
    ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
    cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
    base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
    e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
    jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
    template_literal: "\u0627\u0646 \u067E\u0679"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0646\u0645\u0628\u0631",
    array: "\u0622\u0631\u06D2",
    null: "\u0646\u0644"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
        }
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        }
        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        }
        if (_issue.format === "ends_with")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "includes")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "regex")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
    }
  };
};
function ur_default() {
  return {
    localeError: error45()
  };
}

// ../../node_modules/zod/v4/locales/uz.js
var error46 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
    file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
    array: { unit: "element", verb: "bo\u2018lishi kerak" },
    set: { unit: "element", verb: "bo\u2018lishi kerak" },
    map: { unit: "yozuv", verb: "bo\u2018lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return `Noto\u2018g\u2018ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error46()
  };
}

// ../../node_modules/zod/v4/locales/vi.js
var error47 = () => {
  const Sizable = {
    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
    file: { unit: "byte", verb: "c\xF3" },
    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0111\u1EA7u v\xE0o",
    email: "\u0111\u1ECBa ch\u1EC9 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ng\xE0y gi\u1EDD ISO",
    date: "ng\xE0y ISO",
    time: "gi\u1EDD ISO",
    duration: "kho\u1EA3ng th\u1EDDi gian ISO",
    ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
    ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
    cidrv4: "d\u1EA3i IPv4",
    cidrv6: "d\u1EA3i IPv6",
    base64: "chu\u1ED7i m\xE3 h\xF3a base64",
    base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
    json_string: "chu\u1ED7i JSON",
    e164: "s\u1ED1 E.164",
    jwt: "JWT",
    template_literal: "\u0111\u1EA7u v\xE0o"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "s\u1ED1",
    array: "m\u1EA3ng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
        }
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      default:
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
    }
  };
};
function vi_default() {
  return {
    localeError: error47()
  };
}

// ../../node_modules/zod/v4/locales/zh-CN.js
var error48 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
    array: { unit: "\u9879", verb: "\u5305\u542B" },
    set: { unit: "\u9879", verb: "\u5305\u542B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F93\u5165",
    email: "\u7535\u5B50\u90AE\u4EF6",
    url: "URL",
    emoji: "\u8868\u60C5\u7B26\u53F7",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u671F\u65F6\u95F4",
    date: "ISO\u65E5\u671F",
    time: "ISO\u65F6\u95F4",
    duration: "ISO\u65F6\u957F",
    ipv4: "IPv4\u5730\u5740",
    ipv6: "IPv6\u5730\u5740",
    cidrv4: "IPv4\u7F51\u6BB5",
    cidrv6: "IPv6\u7F51\u6BB5",
    base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
    base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
    json_string: "JSON\u5B57\u7B26\u4E32",
    e164: "E.164\u53F7\u7801",
    jwt: "JWT",
    template_literal: "\u8F93\u5165"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5B57",
    array: "\u6570\u7EC4",
    null: "\u7A7A\u503C(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
        }
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
        if (_issue.format === "ends_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
        if (_issue.format === "includes")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
        return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return `\u65E0\u6548\u8F93\u5165`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error48()
  };
}

// ../../node_modules/zod/v4/locales/zh-TW.js
var error49 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F38\u5165",
    email: "\u90F5\u4EF6\u5730\u5740",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u65E5\u671F\u6642\u9593",
    date: "ISO \u65E5\u671F",
    time: "ISO \u6642\u9593",
    duration: "ISO \u671F\u9593",
    ipv4: "IPv4 \u4F4D\u5740",
    ipv6: "IPv6 \u4F4D\u5740",
    cidrv4: "IPv4 \u7BC4\u570D",
    cidrv6: "IPv6 \u7BC4\u570D",
    base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
    base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
    json_string: "JSON \u5B57\u4E32",
    e164: "E.164 \u6578\u503C",
    jwt: "JWT",
    template_literal: "\u8F38\u5165"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
        }
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
        }
        if (_issue.format === "ends_with")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
        if (_issue.format === "includes")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
        return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error49()
  };
}

// ../../node_modules/zod/v4/locales/yo.js
var error50 = () => {
  const Sizable = {
    string: { unit: "\xE0mi", verb: "n\xED" },
    file: { unit: "bytes", verb: "n\xED" },
    array: { unit: "nkan", verb: "n\xED" },
    set: { unit: "nkan", verb: "n\xED" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
    email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\xE0k\xF3k\xF2 ISO",
    date: "\u1ECDj\u1ECD\u0301 ISO",
    time: "\xE0k\xF3k\xF2 ISO",
    duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
    ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
    ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
    cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
    cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
    base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
    base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
    json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
    e164: "n\u1ECD\u0301mb\xE0 E.164",
    jwt: "JWT",
    template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\u1ECD\u0301mb\xE0",
    array: "akop\u1ECD"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
        }
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
        return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function yo_default() {
  return {
    localeError: error50()
  };
}

// ../../node_modules/zod/v4/core/registries.js
var _a2;
var $output = /* @__PURE__ */ Symbol("ZodOutput");
var $input = /* @__PURE__ */ Symbol("ZodInput");
var $ZodRegistry = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta3 = _meta[0];
    this._map.set(schema, meta3);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.set(meta3.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta3 = this._map.get(schema);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.delete(meta3.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
};
function registry() {
  return new $ZodRegistry();
}
(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;

// ../../node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _positive(params) {
  return /* @__PURE__ */ _gt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _negative(params) {
  return /* @__PURE__ */ _lt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
  return /* @__PURE__ */ _lte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
  return /* @__PURE__ */ _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
  const ch = /* @__PURE__ */ _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: ((input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec2,
          continue: false
        });
        return {};
      }
    }),
    reverseTransform: ((input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    }),
    error: params.error
  });
  return codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}

// ../../node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? void 0
  };
}
function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a3;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta3 = ctx.metadataRegistry.get(schema);
  if (meta3)
    Object.assign(result.schema, meta3);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a3 = result.schema).default ?? (_a3.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  } else {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== void 0 && result.id === rootMetaId)
    delete result.id;
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      if (seen.def.id === seen.defId)
        delete seen.def.id;
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec"))
      return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};

// ../../node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  json2.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minLength = minimum;
  if (typeof maximum === "number")
    json2.maxLength = maximum;
  if (format) {
    json2.format = formatMap[format] ?? format;
    if (json2.format === "")
      delete json2.format;
    if (format === "time") {
      delete json2.format;
    }
  }
  if (contentEncoding)
    json2.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json2.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json2.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json2.type = "integer";
  else
    json2.type = "number";
  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin) {
    if (legacy) {
      json2.minimum = exclusiveMinimum;
      json2.exclusiveMinimum = true;
    } else {
      json2.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json2.minimum = minimum;
  }
  if (exMax) {
    if (legacy) {
      json2.maximum = exclusiveMaximum;
      json2.exclusiveMaximum = true;
    } else {
      json2.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json2.maximum = maximum;
  }
  if (typeof multipleOf === "number")
    json2.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json2, _params) => {
  if (ctx.target === "openapi-3.0") {
    json2.type = "string";
    json2.nullable = true;
    json2.enum = [null];
  } else {
    json2.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json2, _params) => {
  json2.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {
};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json2, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json2.type = "number";
  if (values.every((v) => typeof v === "string"))
    json2.type = "string";
  json2.enum = values;
};
var literalProcessor = (schema, ctx, json2, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === void 0) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
  } else if (vals.length === 1) {
    const val = vals[0];
    json2.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.enum = [val];
    } else {
      json2.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json2.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json2.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json2.type = "boolean";
    if (vals.every((v) => v === null))
      json2.type = "null";
    json2.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const file2 = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== void 0)
    file2.minLength = minimum;
  if (maximum !== void 0)
    file2.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file2.contentMediaType = mime[0];
      Object.assign(_json, file2);
    } else {
      Object.assign(_json, file2);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file2);
  }
};
var successProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
  json2.type = "array";
  json2.items = process(def.element, ctx, {
    ...params,
    path: [...params.path, "items"]
  });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  json2.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json2.properties[key] = process(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === void 0;
    } else {
      return v.optout === void 0;
    }
  }));
  if (requiredKeys.size > 0) {
    json2.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json2.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json2.additionalProperties = false;
  } else if (def.catchall) {
    json2.additionalProperties = process(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json2.oneOf = options;
  } else {
    json2.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const a = process(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json2.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json2.prefixItems = prefixItems;
    if (rest) {
      json2.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json2.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json2.items.anyOf.push(rest);
    }
    json2.minItems = prefixItems.length;
    if (!rest) {
      json2.maxItems = prefixItems.length;
    }
  } else {
    json2.items = prefixItems;
    if (rest) {
      json2.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json2.patternProperties = {};
    for (const pattern of patterns) {
      json2.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json2.propertyNames = process(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json2.additionalProperties = process(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json2.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const inner = process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json2.nullable = true;
  } else {
    json2.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json2.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
  process(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}

// ../../node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
  /** @deprecated Access via ctx instead */
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  /** @deprecated Access via ctx instead */
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process(schema, this.ctx, _params);
  }
  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
};

// ../../node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// ../../node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodIntersection: () => ZodIntersection,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPreprocess: () => ZodPreprocess,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  invertCodec: () => invertCodec,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// ../../node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});

// ../../node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// ../../node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
var ZodError = /* @__PURE__ */ $constructor("ZodError", initializer2);
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, {
  Parent: Error
});

// ../../node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../../node_modules/zod/v4/classic/schemas.js
var _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
  const proto = Object.getPrototypeOf(inst);
  let installed = _installedGroups.get(proto);
  if (!installed) {
    installed = /* @__PURE__ */ new Set();
    _installedGroups.set(proto, installed);
  }
  if (installed.has(group))
    return;
  installed.add(group);
  for (const key in methods) {
    const fn = methods[key];
    Object.defineProperty(proto, key, {
      configurable: true,
      enumerable: false,
      get() {
        const bound = fn.bind(this);
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: bound
        });
        return bound;
      },
      set(v) {
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: v
        });
      }
    });
  }
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  _installLazyMethods(inst, "ZodType", {
    check(...chks) {
      const def2 = this.def;
      return this.clone(util_exports.mergeDefs(def2, {
        checks: [
          ...def2.checks ?? [],
          ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
        ]
      }), { parent: true });
    },
    with(...chks) {
      return this.check(...chks);
    },
    clone(def2, params) {
      return clone(this, def2, params);
    },
    brand() {
      return this;
    },
    register(reg, meta3) {
      reg.add(this, meta3);
      return this;
    },
    refine(check2, params) {
      return this.check(refine(check2, params));
    },
    superRefine(refinement, params) {
      return this.check(superRefine(refinement, params));
    },
    overwrite(fn) {
      return this.check(_overwrite(fn));
    },
    optional() {
      return optional(this);
    },
    exactOptional() {
      return exactOptional(this);
    },
    nullable() {
      return nullable(this);
    },
    nullish() {
      return optional(nullable(this));
    },
    nonoptional(params) {
      return nonoptional(this, params);
    },
    array() {
      return array(this);
    },
    or(arg) {
      return union([this, arg]);
    },
    and(arg) {
      return intersection(this, arg);
    },
    transform(tx) {
      return pipe(this, transform(tx));
    },
    default(d) {
      return _default2(this, d);
    },
    prefault(d) {
      return prefault(this, d);
    },
    catch(params) {
      return _catch2(this, params);
    },
    pipe(target) {
      return pipe(this, target);
    },
    readonly() {
      return readonly(this);
    },
    describe(description) {
      const cl = this.clone();
      globalRegistry.add(cl, { description });
      return cl;
    },
    meta(...args) {
      if (args.length === 0)
        return globalRegistry.get(this);
      const cl = this.clone();
      globalRegistry.add(cl, args[0]);
      return cl;
    },
    isOptional() {
      return this.safeParse(void 0).success;
    },
    isNullable() {
      return this.safeParse(null).success;
    },
    apply(fn) {
      return fn(this);
    }
  });
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  _installLazyMethods(inst, "_ZodString", {
    regex(...args) {
      return this.check(_regex(...args));
    },
    includes(...args) {
      return this.check(_includes(...args));
    },
    startsWith(...args) {
      return this.check(_startsWith(...args));
    },
    endsWith(...args) {
      return this.check(_endsWith(...args));
    },
    min(...args) {
      return this.check(_minLength(...args));
    },
    max(...args) {
      return this.check(_maxLength(...args));
    },
    length(...args) {
      return this.check(_length(...args));
    },
    nonempty(...args) {
      return this.check(_minLength(1, ...args));
    },
    lowercase(params) {
      return this.check(_lowercase(params));
    },
    uppercase(params) {
      return this.check(_uppercase(params));
    },
    trim() {
      return this.check(_trim());
    },
    normalize(...args) {
      return this.check(_normalize(...args));
    },
    toLowerCase() {
      return this.check(_toLowerCase());
    },
    toUpperCase() {
      return this.check(_toUpperCase());
    },
    slugify() {
      return this.check(_slugify());
    }
  });
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: regexes_exports.httpProtocol,
    hostname: regexes_exports.domain,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
  _installLazyMethods(inst, "ZodNumber", {
    gt(value, params) {
      return this.check(_gt(value, params));
    },
    gte(value, params) {
      return this.check(_gte(value, params));
    },
    min(value, params) {
      return this.check(_gte(value, params));
    },
    lt(value, params) {
      return this.check(_lt(value, params));
    },
    lte(value, params) {
      return this.check(_lte(value, params));
    },
    max(value, params) {
      return this.check(_lte(value, params));
    },
    int(params) {
      return this.check(int(params));
    },
    safe(params) {
      return this.check(int(params));
    },
    positive(params) {
      return this.check(_gt(0, params));
    },
    nonnegative(params) {
      return this.check(_gte(0, params));
    },
    negative(params) {
      return this.check(_lt(0, params));
    },
    nonpositive(params) {
      return this.check(_lte(0, params));
    },
    multipleOf(value, params) {
      return this.check(_multipleOf(value, params));
    },
    step(value, params) {
      return this.check(_multipleOf(value, params));
    },
    finite() {
      return this;
    }
  });
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
  inst.element = def.element;
  _installLazyMethods(inst, "ZodArray", {
    min(n, params) {
      return this.check(_minLength(n, params));
    },
    nonempty(params) {
      return this.check(_minLength(1, params));
    },
    max(n, params) {
      return this.check(_maxLength(n, params));
    },
    length(n, params) {
      return this.check(_length(n, params));
    },
    unwrap() {
      return this.element;
    }
  });
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
  util_exports.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  _installLazyMethods(inst, "ZodObject", {
    keyof() {
      return _enum2(Object.keys(this._zod.def.shape));
    },
    catchall(catchall) {
      return this.clone({ ...this._zod.def, catchall });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: never() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(incoming) {
      return util_exports.extend(this, incoming);
    },
    safeExtend(incoming) {
      return util_exports.safeExtend(this, incoming);
    },
    merge(other) {
      return util_exports.merge(this, other);
    },
    pick(mask) {
      return util_exports.pick(this, mask);
    },
    omit(mask) {
      return util_exports.omit(this, mask);
    },
    partial(...args) {
      return util_exports.partial(ZodOptional, this, args[0]);
    },
    required(...args) {
      return util_exports.required(ZodNonOptional, this, args[0]);
    }
  });
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...util_exports.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...util_exports.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodRecord({
      type: "record",
      keyType: string2(),
      valueType: keyType,
      ...util_exports.normalizeParams(valueType)
    });
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = void 0;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(util_exports.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(util_exports.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        payload.fallback = true;
        return payload;
      });
    }
    payload.value = output;
    payload.fallback = true;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
function invertCodec(codec2) {
  const def = codec2._zod.def;
  return new ZodCodec({
    type: "pipe",
    in: def.out,
    out: def.in,
    transform: def.reverseTransform,
    reverseTransform: def.transform
  });
}
var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodPreprocess.init(inst, def);
});
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...util_exports.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return new ZodPreprocess({
    type: "pipe",
    in: transform(fn),
    out: schema
  });
}

// ../../node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
/* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));

// ../../node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...schemas_exports2,
  ...checks_exports2,
  iso: iso_exports
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  // Schema identification
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  // Core schema keywords
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  // Type
  "type",
  "enum",
  "const",
  // Composition
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  // Array
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  // Number
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  // Already handled metadata
  "description",
  "default",
  // Content
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  // Unsupported (error-throwing)
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  // OpenAPI
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path = ref.slice(1).split("/").filter(Boolean);
  if (path.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path[0] === defsKey) {
    const key = path[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== void 0) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== void 0) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== void 0) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  if (schema.default !== void 0) {
    baseSchema = baseSchema.default(schema.default);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  if (schema.description) {
    baseSchema = baseSchema.describe(schema.description);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let normalized;
  try {
    normalized = JSON.parse(JSON.stringify(schema));
  } catch {
    throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
  }
  const version2 = detectVersion(normalized, params?.defaultTarget);
  const defs = normalized.$defs || normalized.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: normalized,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(normalized, ctx);
}

// ../../node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint3,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// ../../node_modules/zod/v4/classic/external.js
config(en_default());

// ../../packages/protocol/dist/hashing.js
var sha256HexSchema = external_exports.string().regex(/^[0-9a-f]{64}$/u);
var blobHashSchema = sha256HexSchema.transform((value) => value);
var plaintextHashSchema = sha256HexSchema.transform((value) => value);
function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function sha256Hex(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  const digestInput = new Uint8Array(bytes.byteLength);
  digestInput.set(bytes);
  const digest = await crypto.subtle.digest("SHA-256", digestInput);
  return bytesToHex(new Uint8Array(digest));
}
async function hashBlob(bytes) {
  return await sha256Hex(bytes);
}
async function hashPlaintext(content) {
  return await sha256Hex(canonicalizeMarkdown(content));
}

// ../../packages/protocol/dist/version.js
var HAVEMIND_SERVICE_ID = "havemind";
var PROTOCOL_MAJOR_VERSION = 1;
var PROTOCOL_MINOR_VERSION = 0;
var PROTOCOL_VERSION = Object.freeze({
  major: PROTOCOL_MAJOR_VERSION,
  minor: PROTOCOL_MINOR_VERSION
});
var ERROR_CODES = Object.freeze({
  AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED",
  DEVICE_REVOKED: "DEVICE_REVOKED",
  FORBIDDEN: "FORBIDDEN",
  HEAD_SET_CHANGED: "HEAD_SET_CHANGED",
  INCOMPATIBLE_PROTOCOL: "INCOMPATIBLE_PROTOCOL",
  INVALID_INVITATION: "INVALID_INVITATION",
  INVALID_REQUEST: "INVALID_REQUEST",
  KEY_EPOCH_REQUIRED: "KEY_EPOCH_REQUIRED",
  MISSING_PARENT: "MISSING_PARENT",
  NOT_FOUND: "NOT_FOUND",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  RATE_LIMITED: "RATE_LIMITED",
  REVISION_ID_REUSE: "REVISION_ID_REUSE",
  UNSUPPORTED_SEMANTICS: "UNSUPPORTED_SEMANTICS"
});
var protocolVersionSchema = external_exports.object({
  major: external_exports.number().int().nonnegative(),
  minor: external_exports.number().int().nonnegative()
}).strict();
var protocolVersionRangeSchema = external_exports.object({
  major: external_exports.number().int().nonnegative(),
  minMinor: external_exports.number().int().nonnegative(),
  maxMinor: external_exports.number().int().nonnegative()
}).strict().refine((range) => range.minMinor <= range.maxMinor, {
  message: "minMinor must not exceed maxMinor",
  path: ["minMinor"]
});
var httpsApiBaseUrlSchema = external_exports.string().url().refine((value) => new URL(value).protocol === "https:", {
  message: "apiBaseUrl must use HTTPS"
}).refine((value) => {
  const url2 = new URL(value);
  return url2.username === "" && url2.password === "" && url2.search === "" && url2.hash === "";
}, {
  message: "apiBaseUrl must not contain credentials, a query or a fragment"
});
var capabilitySchema = external_exports.string().min(1).max(80).regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-v[1-9][0-9]*$/u);
var discoveryDocumentSchema = external_exports.object({
  service: external_exports.literal(HAVEMIND_SERVICE_ID),
  name: external_exports.string().trim().min(1).max(80),
  apiBaseUrl: httpsApiBaseUrlSchema,
  protocol: protocolVersionRangeSchema,
  authMethods: external_exports.array(external_exports.enum(["opaque-token"])).min(1),
  capabilities: external_exports.array(capabilitySchema).max(64)
}).strict();

// ../../packages/protocol/dist/revision-schema.js
var identifierSchema = external_exports.string().uuid();
var parentRevisionIdsSchema = external_exports.array(identifierSchema).max(32);
function usesLfLineEndings(text) {
  return !text.includes("\r");
}
var requiredSemanticsSchema = external_exports.object({
  payloadFormat: external_exports.literal("revision-payload-v1"),
  syncSemantics: external_exports.literal("dag-cas-v1"),
  provenanceRecipe: external_exports.literal("source-range-v1"),
  pathNormalization: external_exports.literal("nfc-lowercase-v1")
}).strict();
var protectedRevisionHeaderSchema = external_exports.object({
  protocol: protocolVersionSchema,
  vaultId: identifierSchema,
  fileId: identifierSchema,
  revisionId: identifierSchema,
  parentRevisionIds: parentRevisionIdsSchema,
  expectedMemberId: identifierSchema,
  expectedDeviceId: identifierSchema,
  payloadEncoding: external_exports.literal("plaintext-json-v1"),
  semantics: requiredSemanticsSchema
}).strict().superRefine((header, context) => {
  if (new Set(header.parentRevisionIds).size !== header.parentRevisionIds.length) {
    context.addIssue({
      code: "custom",
      message: "Parent revision IDs must be unique.",
      path: ["parentRevisionIds"]
    });
  }
  if (header.parentRevisionIds.includes(header.revisionId)) {
    context.addIssue({
      code: "custom",
      message: "A revision cannot be its own parent.",
      path: ["parentRevisionIds"]
    });
  }
  for (let index = 1; index < header.parentRevisionIds.length; index += 1) {
    const previous = header.parentRevisionIds[index - 1];
    const current = header.parentRevisionIds[index];
    if (previous !== void 0 && current !== void 0 && previous > current) {
      context.addIssue({
        code: "custom",
        message: "Parent revision IDs must use canonical ascending order.",
        path: ["parentRevisionIds", index]
      });
    }
  }
});
var opaqueBlobReceiptSchema = external_exports.object({
  revisionId: identifierSchema,
  memberId: identifierSchema,
  deviceId: identifierSchema,
  serverSequence: external_exports.number().int().positive().safe(),
  serverTime: external_exports.string().datetime({ offset: true }),
  blobHash: blobHashSchema,
  byteLength: external_exports.number().int().nonnegative().safe(),
  /**
   * The DAG parents of this revision, copied verbatim from the stored
   * protected header. Carried on the receipt so the client's apply side can
   * prove whether an incoming revision is a causal fast-forward from its local
   * head (rule 3, no silent overwrite of a concurrent fork). The server merely
   * relays the metadata it already stored — it never computes lineage, so the
   * opaque boundary is intact. Optional for backward compatibility: receipts
   * committed before this field existed decode with no parents, in which case
   * apply falls back to its pre-existing best-effort clean apply.
   */
  parentRevisionIds: parentRevisionIdsSchema.optional()
}).strict();
var sourceRangePartSchema = external_exports.object({
  type: external_exports.literal("source"),
  parentRevisionId: identifierSchema,
  start: external_exports.number().int().nonnegative().safe(),
  end: external_exports.number().int().positive().safe()
}).strict().refine((part) => part.start < part.end, {
  message: "Source range must not be empty or inverted.",
  path: ["end"]
});
var literalPartSchema = external_exports.object({
  type: external_exports.literal("literal"),
  text: external_exports.string().min(1).refine(usesLfLineEndings, {
    message: "Literal text must use LF line endings."
  })
}).strict();
var reconstructionRecipeSchema = external_exports.object({
  version: external_exports.literal(1),
  parts: external_exports.array(external_exports.discriminatedUnion("type", [sourceRangePartSchema, literalPartSchema]))
}).strict();
var canonicalPathSchema = external_exports.string().refine((path) => {
  try {
    return canonicalizeVaultPath(path) === path;
  } catch {
    return false;
  }
}, { message: "Path must be a canonical non-reserved vault path." });
var normalizedMarkdownSchema = external_exports.string().refine(usesLfLineEndings, {
  message: "Markdown content must use LF line endings."
});
var sha256HexField = external_exports.string().regex(/^[0-9a-f]{64}$/u);
function isCanonicalBase64(value) {
  const length = value.length;
  if (length % 4 !== 0)
    return false;
  let bodyEnd = length;
  if (length > 0 && value.charCodeAt(length - 1) === 61) {
    bodyEnd = value.charCodeAt(length - 2) === 61 ? length - 2 : length - 1;
  }
  for (let index = 0; index < bodyEnd; index += 1) {
    const code = value.charCodeAt(index);
    const isBase64Char = code >= 65 && code <= 90 || // A-Z
    code >= 97 && code <= 122 || // a-z
    code >= 48 && code <= 57 || // 0-9
    code === 43 || // +
    code === 47;
    if (!isBase64Char)
      return false;
  }
  return true;
}
var base64ContentSchema = external_exports.string().refine(isCanonicalBase64, { message: "Binary content must be standard base64." });
var contentRevisionPayloadSchema = external_exports.object({
  schemaVersion: external_exports.literal(1),
  operation: external_exports.enum([
    "initial-import",
    "create",
    "update",
    "rename",
    "restore",
    "reconcile"
  ]),
  path: canonicalPathSchema,
  previousPath: canonicalPathSchema.optional(),
  content: normalizedMarkdownSchema,
  plaintextHash: plaintextHashSchema,
  recipe: reconstructionRecipeSchema
}).strict().superRefine((payload, context) => {
  if (payload.operation === "rename") {
    if (payload.previousPath === void 0) {
      context.addIssue({
        code: "custom",
        message: "Rename requires previousPath.",
        path: ["previousPath"]
      });
    } else if (payload.previousPath === payload.path) {
      context.addIssue({
        code: "custom",
        message: "Rename path and previousPath must be different.",
        path: ["previousPath"]
      });
    }
  } else if (payload.previousPath !== void 0) {
    context.addIssue({
      code: "custom",
      message: "previousPath is valid only for rename.",
      path: ["previousPath"]
    });
  }
});
var binaryRevisionPayloadSchema = external_exports.object({
  schemaVersion: external_exports.literal(1),
  operation: external_exports.enum([
    "initial-import",
    "create",
    "update",
    "rename",
    "restore",
    "reconcile"
  ]),
  kind: external_exports.literal("binary"),
  path: canonicalPathSchema,
  previousPath: canonicalPathSchema.optional(),
  contentBase64: base64ContentSchema,
  blobByteHash: sha256HexField,
  recipe: external_exports.null()
}).strict().superRefine((payload, context) => {
  if (payload.operation === "rename") {
    if (payload.previousPath === void 0) {
      context.addIssue({
        code: "custom",
        message: "Rename requires previousPath.",
        path: ["previousPath"]
      });
    } else if (payload.previousPath === payload.path) {
      context.addIssue({
        code: "custom",
        message: "Rename path and previousPath must be different.",
        path: ["previousPath"]
      });
    }
  } else if (payload.previousPath !== void 0) {
    context.addIssue({
      code: "custom",
      message: "previousPath is valid only for rename.",
      path: ["previousPath"]
    });
  }
});
var tombstoneRevisionPayloadSchema = external_exports.object({
  schemaVersion: external_exports.literal(1),
  operation: external_exports.literal("delete"),
  path: canonicalPathSchema,
  content: external_exports.null(),
  plaintextHash: external_exports.null(),
  recipe: external_exports.null()
}).strict();
var innerRevisionPayloadSchema = external_exports.union([
  contentRevisionPayloadSchema,
  binaryRevisionPayloadSchema,
  tombstoneRevisionPayloadSchema
]);
function validateRevisionPayloadAgainstHeader(headerInput, payloadInput) {
  const header = protectedRevisionHeaderSchema.parse(headerInput);
  const payload = innerRevisionPayloadSchema.parse(payloadInput);
  const parents = new Set(header.parentRevisionIds);
  if (payload.operation !== "delete" && payload.operation !== "restore" && payload.recipe !== null) {
    for (const part of payload.recipe.parts) {
      if (part.type === "source" && !parents.has(part.parentRevisionId)) {
        throw new Error(`Recipe source ${part.parentRevisionId} is not a protected-header parent.`);
      }
    }
  }
  const isRootOperation = payload.operation === "create" || payload.operation === "initial-import";
  if (isRootOperation && header.parentRevisionIds.length !== 0) {
    throw new Error(`${payload.operation} must not have a parent revision.`);
  }
  if (!isRootOperation && header.parentRevisionIds.length === 0) {
    throw new Error(`${payload.operation} requires at least one parent revision.`);
  }
  if (payload.operation === "reconcile" && header.parentRevisionIds.length < 2) {
    throw new Error("reconcile requires at least two parent revisions.");
  }
  return { header, payload };
}

// ../../packages/sync-core/dist/diff3.js
var DEFAULT_ADJACENCY_LINES = 1;
var DEFAULT_MAX_LCS_CELLS = 4e6;
function splitLines(text) {
  return text.split("\n");
}
function lcsMatches(x, y) {
  const n = x.length;
  const m = y.length;
  const width = m + 1;
  const table = new Int32Array((n + 1) * width);
  for (let i2 = n - 1; i2 >= 0; i2 -= 1) {
    for (let j2 = m - 1; j2 >= 0; j2 -= 1) {
      table[i2 * width + j2] = x[i2] === y[j2] ? table[(i2 + 1) * width + (j2 + 1)] + 1 : Math.max(table[(i2 + 1) * width + j2], table[i2 * width + (j2 + 1)]);
    }
  }
  const matches = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (x[i] === y[j]) {
      matches.push({ x: i, y: j });
      i += 1;
      j += 1;
    } else if (table[(i + 1) * width + j] >= table[i * width + (j + 1)]) {
      i += 1;
    } else {
      j += 1;
    }
  }
  return matches;
}
function diffHunks(ancestor, variant) {
  const matches = lcsMatches(ancestor, variant);
  const hunks = [];
  let oCursor = 0;
  let vCursor = 0;
  const boundaries = [...matches, { x: ancestor.length, y: variant.length }];
  for (const match of boundaries) {
    const oLength = match.x - oCursor;
    const abLength = match.y - vCursor;
    if (oLength > 0 || abLength > 0) {
      hunks.push({ oStart: oCursor, oLength, abStart: vCursor, abLength });
    }
    oCursor = match.x + 1;
    vCursor = match.y + 1;
  }
  return hunks;
}
function variantStart(hunks, p) {
  let delta = 0;
  for (const hunk of hunks) {
    if (hunk.oStart + hunk.oLength <= p && hunk.oStart < p) {
      delta += hunk.abLength - hunk.oLength;
    }
  }
  return p + delta;
}
function variantEnd(hunks, p) {
  let delta = 0;
  for (const hunk of hunks) {
    if (hunk.oStart + hunk.oLength <= p) {
      delta += hunk.abLength - hunk.oLength;
    }
  }
  return p + delta;
}
function segmentFor(hunks, variant, oStart, oEnd) {
  return variant.slice(variantStart(hunks, oStart), variantEnd(hunks, oEnd));
}
function linesEqual(a, b) {
  if (a.length !== b.length)
    return false;
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index])
      return false;
  }
  return true;
}
function mergeText(ancestor, local, remote, options = {}) {
  const adjacency = options.adjacencyLines ?? DEFAULT_ADJACENCY_LINES;
  const maxCells = options.maxLcsCells ?? DEFAULT_MAX_LCS_CELLS;
  const o = splitLines(ancestor);
  const a = splitLines(local);
  const b = splitLines(remote);
  if ((o.length + 1) * (a.length + 1) > maxCells || (o.length + 1) * (b.length + 1) > maxCells) {
    return { status: "conflict" };
  }
  const localHunks = diffHunks(o, a);
  const remoteHunks = diffHunks(o, b);
  const events = [
    ...localHunks.map((hunk) => ({ ...hunk, side: "local" })),
    ...remoteHunks.map((hunk) => ({ ...hunk, side: "remote" }))
  ].sort((left, right) => left.oStart - right.oStart || (left.side === right.side ? 0 : left.side === "local" ? -1 : 1));
  const merged = [];
  let oCursor = 0;
  let index = 0;
  while (index < events.length) {
    const first = events[index];
    if (first === void 0)
      break;
    for (let line = oCursor; line < first.oStart; line += 1) {
      merged.push(o[line]);
    }
    const regionStart = first.oStart;
    let regionEnd = first.oStart + first.oLength;
    const sides = /* @__PURE__ */ new Set([first.side]);
    index += 1;
    while (index < events.length) {
      const next = events[index];
      if (next === void 0)
        break;
      if (next.oStart - regionEnd >= adjacency)
        break;
      regionEnd = Math.max(regionEnd, next.oStart + next.oLength);
      sides.add(next.side);
      index += 1;
    }
    const localSegment = segmentFor(localHunks, a, regionStart, regionEnd);
    const remoteSegment = segmentFor(remoteHunks, b, regionStart, regionEnd);
    const ancestorSegment = o.slice(regionStart, regionEnd);
    if (!sides.has("remote") || linesEqual(remoteSegment, ancestorSegment)) {
      merged.push(...localSegment);
    } else if (!sides.has("local") || linesEqual(localSegment, ancestorSegment)) {
      merged.push(...remoteSegment);
    } else if (linesEqual(localSegment, remoteSegment)) {
      merged.push(...localSegment);
    } else {
      return { status: "conflict" };
    }
    oCursor = regionEnd;
  }
  for (let line = oCursor; line < o.length; line += 1) {
    merged.push(o[line]);
  }
  return { status: "merged", text: merged.join("\n") };
}

// ../../node_modules/diff/libesm/diff/base.js
var Diff = class {
  diff(oldStr, newStr, options = {}) {
    let callback;
    if (typeof options === "function") {
      callback = options;
      options = {};
    } else if ("callback" in options) {
      callback = options.callback;
    }
    const oldString = this.castInput(oldStr, options);
    const newString = this.castInput(newStr, options);
    const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
    const newTokens = this.removeEmpty(this.tokenize(newString, options));
    return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
  }
  diffWithOptionsObj(oldTokens, newTokens, options, callback) {
    var _a3;
    const done = (value) => {
      value = this.postProcess(value, options);
      if (callback) {
        setTimeout(function() {
          callback(value);
        }, 0);
        return void 0;
      } else {
        return value;
      }
    };
    const newLen = newTokens.length, oldLen = oldTokens.length;
    let editLength = 1;
    let maxEditLength = newLen + oldLen;
    if (options.maxEditLength != null) {
      maxEditLength = Math.min(maxEditLength, options.maxEditLength);
    }
    const maxExecutionTime = (_a3 = options.timeout) !== null && _a3 !== void 0 ? _a3 : Infinity;
    const abortAfterTimestamp = Date.now() + maxExecutionTime;
    const bestPath = [{ oldPos: -1, lastComponent: void 0 }];
    let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
    if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
      return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
    }
    let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
    const execEditLength = () => {
      for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
        let basePath;
        const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
        if (removePath) {
          bestPath[diagonalPath - 1] = void 0;
        }
        let canAdd = false;
        if (addPath) {
          const addPathNewPos = addPath.oldPos - diagonalPath;
          canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
        }
        const canRemove = removePath && removePath.oldPos + 1 < oldLen;
        if (!canAdd && !canRemove) {
          bestPath[diagonalPath] = void 0;
          continue;
        }
        if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) {
          basePath = this.addToPath(addPath, true, false, 0, options);
        } else {
          basePath = this.addToPath(removePath, false, true, 1, options);
        }
        newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
        if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
          return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
        } else {
          bestPath[diagonalPath] = basePath;
          if (basePath.oldPos + 1 >= oldLen) {
            maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
          }
          if (newPos + 1 >= newLen) {
            minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
          }
        }
      }
      editLength++;
    };
    if (callback) {
      (function exec() {
        setTimeout(function() {
          if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
            return callback(void 0);
          }
          if (!execEditLength()) {
            exec();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
        const ret = execEditLength();
        if (ret) {
          return ret;
        }
      }
    }
  }
  addToPath(path, added, removed, oldPosInc, options) {
    const last = path.lastComponent;
    if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: last.count + 1, added, removed, previousComponent: last.previousComponent }
      };
    } else {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: 1, added, removed, previousComponent: last }
      };
    }
  }
  extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
    const newLen = newTokens.length, oldLen = oldTokens.length;
    let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
      newPos++;
      oldPos++;
      commonCount++;
      if (options.oneChangePerToken) {
        basePath.lastComponent = { count: 1, previousComponent: basePath.lastComponent, added: false, removed: false };
      }
    }
    if (commonCount && !options.oneChangePerToken) {
      basePath.lastComponent = { count: commonCount, previousComponent: basePath.lastComponent, added: false, removed: false };
    }
    basePath.oldPos = oldPos;
    return newPos;
  }
  equals(left, right, options) {
    if (options.comparator) {
      return options.comparator(left, right);
    } else {
      return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  }
  removeEmpty(array2) {
    const ret = [];
    for (let i = 0; i < array2.length; i++) {
      if (array2[i]) {
        ret.push(array2[i]);
      }
    }
    return ret;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  castInput(value, options) {
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tokenize(value, options) {
    return Array.from(value);
  }
  join(chars) {
    return chars.join("");
  }
  postProcess(changeObjects, options) {
    return changeObjects;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(lastComponent, newTokens, oldTokens) {
    const components = [];
    let nextComponent;
    while (lastComponent) {
      components.push(lastComponent);
      nextComponent = lastComponent.previousComponent;
      delete lastComponent.previousComponent;
      lastComponent = nextComponent;
    }
    components.reverse();
    const componentLen = components.length;
    let componentPos = 0, newPos = 0, oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
      const component = components[componentPos];
      if (!component.removed) {
        if (!component.added && this.useLongestToken) {
          let value = newTokens.slice(newPos, newPos + component.count);
          value = value.map(function(value2, i) {
            const oldValue = oldTokens[oldPos + i];
            return oldValue.length > value2.length ? oldValue : value2;
          });
          component.value = this.join(value);
        } else {
          component.value = this.join(newTokens.slice(newPos, newPos + component.count));
        }
        newPos += component.count;
        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
        oldPos += component.count;
      }
    }
    return components;
  }
};

// ../../node_modules/diff/libesm/diff/character.js
var CharacterDiff = class extends Diff {
};
var characterDiff = new CharacterDiff();
function diffChars(oldStr, newStr, options) {
  return characterDiff.diff(oldStr, newStr, options);
}

// ../../packages/sync-core/dist/provenance.js
var ProvenanceValidationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ProvenanceValidationError";
  }
};
function assertRun(run) {
  if (!Number.isSafeInteger(run.length) || run.length <= 0) {
    throw new ProvenanceValidationError("Provenance run length must be a positive safe integer.");
  }
  if (run.sourceRevisionId.trim().length === 0) {
    throw new ProvenanceValidationError("Provenance source revision ID must not be empty.");
  }
}
function provenanceLength(runs) {
  return runs.reduce((length, run) => {
    assertRun(run);
    return length + run.length;
  }, 0);
}
function assertValidProvenance(content, runs) {
  const coveredLength = provenanceLength(runs);
  if (coveredLength !== content.length) {
    throw new ProvenanceValidationError(`Provenance covers ${coveredLength} UTF-16 units, expected ${content.length}.`);
  }
}
function normalizeProvenanceRuns(runs) {
  const normalized = [];
  for (const run of runs) {
    assertRun(run);
    const previous = normalized.at(-1);
    if (previous?.sourceRevisionId === run.sourceRevisionId) {
      normalized[normalized.length - 1] = {
        length: previous.length + run.length,
        sourceRevisionId: previous.sourceRevisionId
      };
      continue;
    }
    normalized.push({ ...run });
  }
  return normalized;
}
function sliceProvenance(runs, start, end) {
  const totalLength = provenanceLength(runs);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || end > totalLength) {
    throw new ProvenanceValidationError(`Invalid provenance slice [${start}, ${end}) for length ${totalLength}.`);
  }
  if (start === end) {
    return [];
  }
  const selected = [];
  let offset = 0;
  for (const run of runs) {
    const runEnd = offset + run.length;
    const selectedStart = Math.max(start, offset);
    const selectedEnd = Math.min(end, runEnd);
    if (selectedStart < selectedEnd) {
      selected.push({
        length: selectedEnd - selectedStart,
        sourceRevisionId: run.sourceRevisionId
      });
    }
    offset = runEnd;
    if (offset >= end) {
      break;
    }
  }
  return normalizeProvenanceRuns(selected);
}

// ../../packages/sync-core/dist/recipe.js
var ReconstructionError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ReconstructionError";
  }
};
function isUtf16Boundary(content, offset) {
  if (offset <= 0 || offset >= content.length) {
    return true;
  }
  const previous = content.charCodeAt(offset - 1);
  const current = content.charCodeAt(offset);
  const previousIsHighSurrogate = previous >= 55296 && previous <= 56319;
  const currentIsLowSurrogate = current >= 56320 && current <= 57343;
  return !(previousIsHighSurrogate && currentIsLowSurrogate);
}
function indexParents(parents) {
  const byId = /* @__PURE__ */ new Map();
  for (const parent of parents) {
    if (parent.revisionId.trim().length === 0) {
      throw new ReconstructionError("Parent revision ID must not be empty.");
    }
    if (byId.has(parent.revisionId)) {
      throw new ReconstructionError(`Duplicate parent revision: ${parent.revisionId}.`);
    }
    if (parent.content.includes("\r")) {
      throw new ReconstructionError("Parent content must use canonical LF.");
    }
    assertValidProvenance(parent.content, parent.provenance);
    byId.set(parent.revisionId, parent);
  }
  return byId;
}
function reconstructFromRecipe(recipe, parents, currentRevisionId) {
  if (recipe.version !== 1) {
    throw new ReconstructionError("Unsupported reconstruction recipe version.");
  }
  if (currentRevisionId.trim().length === 0) {
    throw new ReconstructionError("Current revision ID must not be empty.");
  }
  const parentsById = indexParents(parents);
  const contentParts = [];
  const provenanceParts = [];
  for (const part of recipe.parts) {
    if (part.type === "literal") {
      if (part.text.length === 0) {
        throw new ReconstructionError("Literal recipe parts must not be empty.");
      }
      if (part.text.includes("\r")) {
        throw new ReconstructionError("Literal recipe text must use canonical LF.");
      }
      contentParts.push(part.text);
      provenanceParts.push({
        length: part.text.length,
        sourceRevisionId: currentRevisionId
      });
      continue;
    }
    const parent = parentsById.get(part.parentRevisionId);
    if (parent === void 0) {
      throw new ReconstructionError(`Unknown parent revision: ${part.parentRevisionId}.`);
    }
    if (!Number.isSafeInteger(part.start) || !Number.isSafeInteger(part.end) || part.start < 0 || part.end <= part.start || part.end > parent.content.length) {
      throw new ReconstructionError("Invalid source range in reconstruction recipe.");
    }
    if (!isUtf16Boundary(parent.content, part.start) || !isUtf16Boundary(parent.content, part.end)) {
      throw new ReconstructionError("Source range must end on valid UTF-16 boundaries.");
    }
    contentParts.push(parent.content.slice(part.start, part.end));
    provenanceParts.push(...sliceProvenance(parent.provenance, part.start, part.end));
  }
  const content = contentParts.join("");
  const provenance = normalizeProvenanceRuns(provenanceParts);
  assertValidProvenance(content, provenance);
  return { content, provenance };
}
function validateReconstruction(recipe, parents, expectedContent, currentRevisionId) {
  if (expectedContent.includes("\r")) {
    throw new ReconstructionError("Expected snapshot must use canonical LF.");
  }
  const reconstructed = reconstructFromRecipe(recipe, parents, currentRevisionId);
  if (reconstructed.content !== expectedContent) {
    throw new ReconstructionError("Reconstruction recipe does not match the full snapshot.");
  }
  return reconstructed;
}

// ../../packages/sync-core/dist/diff-recipe.js
var DEFAULT_MAX_TEXT_LENGTH = 2 * 1024 * 1024;
function appendPart(parts, part) {
  const previous = parts.at(-1);
  if (previous?.type === "literal" && part.type === "literal") {
    parts[parts.length - 1] = {
      type: "literal",
      text: previous.text + part.text
    };
    return;
  }
  if (previous?.type === "source" && part.type === "source" && previous.parentRevisionId === part.parentRevisionId && previous.end === part.start) {
    parts[parts.length - 1] = {
      type: "source",
      parentRevisionId: previous.parentRevisionId,
      start: previous.start,
      end: part.end
    };
    return;
  }
  parts.push(part);
}
function assertCanonicalText(content, name) {
  if (content.includes("\r")) {
    throw new Error(`${name} must use canonical LF line endings.`);
  }
}
function generateEditRecipe(parent, nextContent, options = {}) {
  const maxTextLength = options.maxTextLength ?? DEFAULT_MAX_TEXT_LENGTH;
  if (!Number.isSafeInteger(maxTextLength) || maxTextLength < 0) {
    throw new Error("Diff text limit must be a non-negative safe integer.");
  }
  assertCanonicalText(parent.content, "Parent content");
  assertCanonicalText(nextContent, "Next content");
  assertValidProvenance(parent.content, parent.provenance);
  if (parent.content.length > maxTextLength || nextContent.length > maxTextLength) {
    throw new Error(`Text exceeds the ${maxTextLength} UTF-16 unit diff limit.`);
  }
  const parts = [];
  let parentOffset = 0;
  for (const change of diffChars(parent.content, nextContent)) {
    const length = change.value.length;
    if (change.added === true) {
      if (length > 0) {
        appendPart(parts, { type: "literal", text: change.value });
      }
      continue;
    }
    if (change.removed === true) {
      parentOffset += length;
      continue;
    }
    if (length > 0) {
      appendPart(parts, {
        type: "source",
        parentRevisionId: parent.revisionId,
        start: parentOffset,
        end: parentOffset + length
      });
    }
    parentOffset += length;
  }
  if (parentOffset !== parent.content.length) {
    throw new Error("Diff did not consume the complete parent snapshot.");
  }
  const recipe = { version: 1, parts };
  validateReconstruction(recipe, [parent], nextContent, "__havemind_recipe_validation__");
  return recipe;
}

// ../../packages/sync-core/dist/payload-codec.js
var OPERATIONS = /* @__PURE__ */ new Set([
  "initial-import",
  "create",
  "update",
  "rename",
  "restore",
  "reconcile",
  "delete"
]);
var PayloadDecodeError = class extends Error {
  constructor(message, cause) {
    super(message, cause === void 0 ? void 0 : { cause });
    __publicField(this, "name", "PayloadDecodeError");
  }
};
function decodeRevisionPayload(bytes) {
  const text = typeof bytes === "string" ? bytes : new TextDecoder().decode(bytes);
  let json2;
  try {
    json2 = JSON.parse(text);
  } catch (error51) {
    throw new PayloadDecodeError("Revision payload is not valid JSON.", error51);
  }
  if (!isRecord(json2)) {
    throw new PayloadDecodeError("Revision payload must be a JSON object.");
  }
  if (json2.schemaVersion !== 1) {
    throw new PayloadDecodeError("Unsupported revision payload schema version.");
  }
  if (typeof json2.operation !== "string" || !OPERATIONS.has(json2.operation)) {
    throw new PayloadDecodeError("Revision payload has an unknown operation.");
  }
  const operation = json2.operation;
  const path = assertCanonicalPath(json2.path, "path");
  const previousPath = json2.previousPath === void 0 || json2.previousPath === null ? null : assertCanonicalPath(json2.previousPath, "previousPath");
  if (json2.kind === "binary") {
    if (operation === "delete") {
      throw new PayloadDecodeError("A binary payload cannot be a delete tombstone.");
    }
    if (typeof json2.contentBase64 !== "string") {
      throw new PayloadDecodeError("A binary revision must carry string contentBase64.");
    }
    const binaryContent = decodeBase64(json2.contentBase64);
    return { operation, path, previousPath, kind: "binary", content: null, binaryContent };
  }
  let content;
  if (operation === "delete") {
    if (json2.content !== null && json2.content !== void 0) {
      throw new PayloadDecodeError("A delete tombstone must not carry content.");
    }
    content = null;
  } else {
    if (typeof json2.content !== "string") {
      throw new PayloadDecodeError("A content revision must carry string content.");
    }
    content = json2.content;
  }
  return { operation, path, previousPath, kind: "markdown", content, binaryContent: null };
}
function decodeBase64(base643) {
  if (!isCanonicalBase64(base643)) {
    throw new PayloadDecodeError("Binary revision content is not valid base64.");
  }
  let binary;
  try {
    binary = atob(base643);
  } catch (error51) {
    throw new PayloadDecodeError("Binary revision content is not valid base64.", error51);
  }
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
function assertCanonicalPath(value, field) {
  if (typeof value !== "string") {
    throw new PayloadDecodeError(`Revision payload ${field} must be a string.`);
  }
  try {
    if (canonicalizeVaultPath(value) !== value) {
      throw new PayloadDecodeError(`Revision payload ${field} is not a canonical vault path.`);
    }
  } catch (error51) {
    if (error51 instanceof PayloadDecodeError)
      throw error51;
    throw new PayloadDecodeError(`Revision payload ${field} is a reserved or invalid vault path.`, error51);
  }
  return value;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ../../packages/sync-core/dist/revision-envelope.js
var DEFAULT_MAX_REVISION_PAYLOAD_BYTES = 512 * 1024;
var RevisionPayloadTooLargeError = class extends Error {
  constructor(path, byteLength, maxByteLength) {
    super(`Note "${path}" is too large to sync: ${byteLength} bytes exceeds the ${maxByteLength}-byte limit.`);
    __publicField(this, "path");
    __publicField(this, "byteLength");
    __publicField(this, "maxByteLength");
    __publicField(this, "name", "RevisionPayloadTooLargeError");
    this.path = path;
    this.byteLength = byteLength;
    this.maxByteLength = maxByteLength;
  }
};
var REQUIRED_SEMANTICS = {
  payloadFormat: "revision-payload-v1",
  syncSemantics: "dag-cas-v1",
  provenanceRecipe: "source-range-v1",
  pathNormalization: "nfc-lowercase-v1"
};
async function buildRevisionEnvelope(input) {
  const path = canonicalizeVaultPath(input.path);
  const parentRevisionIds = [...new Set(input.parentRevisionIds)].sort();
  const header = {
    protocol: { major: PROTOCOL_VERSION.major, minor: PROTOCOL_VERSION.minor },
    vaultId: input.identity.vaultId,
    fileId: input.identity.fileId,
    revisionId: input.revisionId,
    parentRevisionIds,
    expectedMemberId: input.identity.memberId,
    expectedDeviceId: input.identity.deviceId,
    payloadEncoding: "plaintext-json-v1",
    semantics: REQUIRED_SEMANTICS
  };
  const payload = await buildInnerPayload(input, path);
  validateRevisionPayloadAgainstHeader(header, payload);
  const json2 = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json2);
  const maxPayloadBytes = input.maxPayloadBytes ?? DEFAULT_MAX_REVISION_PAYLOAD_BYTES;
  if (bytes.byteLength > maxPayloadBytes) {
    throw new RevisionPayloadTooLargeError(path, bytes.byteLength, maxPayloadBytes);
  }
  return {
    header,
    payloadBase64: bytesToBase64(bytes),
    contentHash: await sha256Hex(bytes),
    revisionId: input.revisionId,
    fileId: input.identity.fileId,
    idempotencyKey: input.idempotencyKey
  };
}
async function buildInnerPayload(input, path) {
  if (input.operation === "delete") {
    return {
      schemaVersion: 1,
      operation: "delete",
      path,
      content: null,
      plaintextHash: null,
      recipe: null
    };
  }
  if (input.kind === "binary") {
    const bytes = input.binaryContent ?? new Uint8Array(0);
    const base2 = {
      schemaVersion: 1,
      operation: input.operation,
      kind: "binary",
      path
    };
    if (input.operation === "rename") {
      if (input.previousPath === void 0 || input.previousPath === null) {
        throw new Error("A rename revision requires a previousPath.");
      }
      base2.previousPath = canonicalizeVaultPath(input.previousPath);
    }
    base2.contentBase64 = bytesToBase64(bytes);
    base2.blobByteHash = await hashBlob(bytes);
    base2.recipe = null;
    return base2;
  }
  const content = canonicalizeMarkdown(input.content ?? "");
  const base = {
    schemaVersion: 1,
    operation: input.operation,
    path
  };
  if (input.operation === "rename") {
    if (input.previousPath === void 0 || input.previousPath === null) {
      throw new Error("A rename revision requires a previousPath.");
    }
    base.previousPath = canonicalizeVaultPath(input.previousPath);
  }
  base.content = content;
  base.plaintextHash = await hashPlaintext(content);
  base.recipe = buildLiteralRecipe(content);
  return base;
}
function buildLiteralRecipe(content) {
  const parts = content.length === 0 ? [] : [{ type: "literal", text: content }];
  return { version: 1, parts };
}
function bytesToBase64(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

// ../../packages/sync-core/dist/revision-dag.js
var RevisionDagError = class extends Error {
  constructor(code, message) {
    super(message);
    __publicField(this, "code");
    this.code = code;
    this.name = "RevisionDagError";
  }
};
function fileKey(vaultId, fileId) {
  return `${vaultId}\0${fileId}`;
}
function compareIds(left, right) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}
function sameStringArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function sameRevision(left, right) {
  return left.revisionId === right.revisionId && left.vaultId === right.vaultId && left.fileId === right.fileId && left.blobHash === right.blobHash && sameStringArray(left.parentRevisionIds, right.parentRevisionIds);
}
function assertNonEmpty(value, field) {
  if (value.trim().length === 0) {
    throw new RevisionDagError("INVALID_REVISION", `${field} must not be empty.`);
  }
}
function assertParentList(node) {
  const seen = /* @__PURE__ */ new Set();
  for (const parentId of node.parentRevisionIds) {
    assertNonEmpty(parentId, "Parent revision ID");
    if (parentId === node.revisionId) {
      throw new RevisionDagError("SELF_PARENT", "A revision cannot reference itself as a parent.");
    }
    if (seen.has(parentId)) {
      throw new RevisionDagError("DUPLICATE_PARENT", `Duplicate parent revision: ${parentId}.`);
    }
    seen.add(parentId);
  }
  for (let index = 1; index < node.parentRevisionIds.length; index += 1) {
    const previous = node.parentRevisionIds[index - 1];
    const current = node.parentRevisionIds[index];
    if (previous !== void 0 && current !== void 0 && previous > current) {
      throw new RevisionDagError("UNSORTED_PARENTS", "Parent revision IDs must use canonical ascending order.");
    }
  }
}
function sameSet(values, expected) {
  return values.size === expected.length && expected.every((value) => values.has(value));
}
var RevisionDag = class _RevisionDag {
  constructor() {
    __publicField(this, "revisions", /* @__PURE__ */ new Map());
    __publicField(this, "headsByFile", /* @__PURE__ */ new Map());
  }
  get size() {
    return this.revisions.size;
  }
  add(node) {
    const existing = this.revisions.get(node.revisionId);
    if (existing !== void 0) {
      if (sameRevision(existing, node)) {
        return "replayed";
      }
      throw new RevisionDagError("REVISION_ID_REUSE", `Revision ID ${node.revisionId} was reused with different bytes.`);
    }
    assertNonEmpty(node.revisionId, "Revision ID");
    assertNonEmpty(node.vaultId, "Vault ID");
    assertNonEmpty(node.fileId, "File ID");
    assertNonEmpty(node.blobHash, "Blob hash");
    assertParentList(node);
    const key = fileKey(node.vaultId, node.fileId);
    const currentHeads = this.headsByFile.get(key) ?? /* @__PURE__ */ new Set();
    if (node.parentRevisionIds.length === 0) {
      if (currentHeads.size > 0) {
        throw new RevisionDagError("FILE_ALREADY_EXISTS", "Only the first revision of a file may have no parents.");
      }
    } else {
      for (const parentId of node.parentRevisionIds) {
        const parent = this.revisions.get(parentId);
        if (parent === void 0) {
          throw new RevisionDagError("PARENT_NOT_FOUND", `Parent revision ${parentId} does not exist.`);
        }
        if (parent.vaultId !== node.vaultId || parent.fileId !== node.fileId) {
          throw new RevisionDagError("PARENT_FILE_MISMATCH", `Parent revision ${parentId} belongs to another vault or file.`);
        }
      }
      if (node.parentRevisionIds.length >= 2 && !sameSet(currentHeads, node.parentRevisionIds)) {
        throw new RevisionDagError("HEAD_SET_CHANGED", "Reconciliation parents no longer match the current head set.");
      }
    }
    const nextHeads = new Set(currentHeads);
    for (const parentId of node.parentRevisionIds) {
      nextHeads.delete(parentId);
    }
    nextHeads.add(node.revisionId);
    this.revisions.set(node.revisionId, {
      ...node,
      parentRevisionIds: [...node.parentRevisionIds]
    });
    this.headsByFile.set(key, nextHeads);
    return "accepted";
  }
  addBatch(nodes) {
    const positionById = /* @__PURE__ */ new Map();
    nodes.forEach((node, index) => {
      if (!positionById.has(node.revisionId)) {
        positionById.set(node.revisionId, index);
      }
    });
    nodes.forEach((node, index) => {
      for (const parentId of node.parentRevisionIds) {
        const parentPosition = positionById.get(parentId);
        if (!this.revisions.has(parentId) && parentPosition !== void 0 && parentPosition >= index) {
          throw new RevisionDagError("BATCH_NOT_TOPOLOGICAL", `Parent ${parentId} must appear before ${node.revisionId}.`);
        }
      }
    });
    const working = this.clone();
    const results = nodes.map((node) => working.add(node));
    this.revisions = working.revisions;
    this.headsByFile = working.headsByFile;
    return results;
  }
  getHeads(vaultId, fileId) {
    return [...this.headsByFile.get(fileKey(vaultId, fileId)) ?? []].sort(compareIds);
  }
  clone() {
    const copy = new _RevisionDag();
    copy.revisions = new Map([...this.revisions].map(([revisionId, node]) => [
      revisionId,
      { ...node, parentRevisionIds: [...node.parentRevisionIds] }
    ]));
    copy.headsByFile = new Map([...this.headsByFile].map(([key, heads]) => [key, new Set(heads)]));
    return copy;
  }
};

// src/runtime/author-colors.ts
var AUTHOR_COLORS = [
  { token: "--havemind-author-1", light: "#1a73c2", dark: "#7cb6f0" },
  { token: "--havemind-author-2", light: "#8a3fc0", dark: "#c99bf0" },
  { token: "--havemind-author-3", light: "#0f8a6a", dark: "#5fd3ac" },
  { token: "--havemind-author-4", light: "#c25a00", dark: "#f0a35f" },
  { token: "--havemind-author-5", light: "#b03060", dark: "#ef92b6" },
  { token: "--havemind-author-6", light: "#5a6ac0", dark: "#a3aef0" }
];
var AUTHOR_COLOR_TOKENS = AUTHOR_COLORS.map(
  (color) => color.token
);
var INITIAL_IMPORT_COLOR_TOKEN = "--havemind-author-initial";
var INITIAL_IMPORT_LABEL = "Initial import";
function fnv1a(value) {
  let hash2 = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash2 ^= value.charCodeAt(index);
    hash2 = Math.imul(hash2, 16777619) >>> 0;
  }
  return hash2 >>> 0;
}
var FALLBACK_COLOR = {
  token: "--havemind-author-1",
  light: "#1a73c2",
  dark: "#7cb6f0"
};
function authorColor(memberId) {
  const index = fnv1a(memberId) % AUTHOR_COLORS.length;
  return AUTHOR_COLORS[index] ?? FALLBACK_COLOR;
}
function authorColorToken(memberId) {
  return authorColor(memberId).token;
}

// src/attribution/attribution.ts
function defaultFormatTimestamp(timestamp) {
  return new Date(timestamp).toISOString();
}
function assignColorTokens(authors, presentSources) {
  const tokenByActorId = /* @__PURE__ */ new Map();
  for (const sourceId of presentSources) {
    const info = authors.get(sourceId);
    if (info?.actor.kind === "author") {
      tokenByActorId.set(
        info.actor.actorId,
        authorColorToken(info.actor.actorId)
      );
    }
  }
  return tokenByActorId;
}
function tooltipFor(author, format) {
  return author.kind === "initial-import" ? INITIAL_IMPORT_LABEL : `${author.displayName} \xB7 ${format(author.timestamp)}`;
}
function prepareOverlay(input) {
  if (!input.enabled) {
    return "overlay-disabled";
  }
  if (input.contentHash !== input.headBlobHash) {
    return "hash-mismatch";
  }
  if (provenanceLength(input.provenance) !== input.content.length) {
    return "provenance-content-mismatch";
  }
  const presentSources = new Set(
    input.provenance.map((run) => run.sourceRevisionId)
  );
  for (const sourceId of presentSources) {
    if (!input.authors.has(sourceId)) {
      return "unresolved-source";
    }
  }
  const tokenByActorId = assignColorTokens(input.authors, presentSources);
  const runs = [];
  let offset = 0;
  for (const run of input.provenance) {
    const info = input.authors.get(run.sourceRevisionId);
    if (info === void 0) {
      return "unresolved-source";
    }
    const author = resolveAuthor(info, tokenByActorId);
    runs.push({ from: offset, to: offset + run.length, author });
    offset += run.length;
  }
  return { runs, legend: buildLegend(runs) };
}
function resolveAuthor(info, tokenByActorId) {
  if (info.actor.kind === "initial-import") {
    return {
      kind: "initial-import",
      actorId: null,
      displayName: INITIAL_IMPORT_LABEL,
      timestamp: info.timestamp,
      colorToken: INITIAL_IMPORT_COLOR_TOKEN
    };
  }
  return {
    kind: "author",
    actorId: info.actor.actorId,
    displayName: info.actor.displayName,
    timestamp: info.timestamp,
    colorToken: tokenByActorId.get(info.actor.actorId) ?? authorColorToken(info.actor.actorId)
  };
}
function buildLegend(runs) {
  const legend = [];
  const seen = /* @__PURE__ */ new Set();
  for (const run of runs) {
    const key = run.author.colorToken + "|" + run.author.displayName;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    legend.push({
      colorToken: run.author.colorToken,
      label: run.author.displayName
    });
  }
  return legend;
}
function buildLivePreviewOverlay(input) {
  const prepared = prepareOverlay(input);
  if (typeof prepared === "string") {
    return { visible: false, hiddenReason: prepared, segments: [], legend: [] };
  }
  const format = input.formatTimestamp ?? defaultFormatTimestamp;
  const segments = prepared.runs.map((run) => {
    const tooltip = tooltipFor(run.author, format);
    return {
      from: run.from,
      to: run.to,
      colorToken: run.author.colorToken,
      underline: true,
      tooltip,
      ariaLabel: tooltip,
      animate: !input.reducedMotion,
      author: run.author
    };
  });
  return {
    visible: true,
    hiddenReason: null,
    segments,
    legend: prepared.legend
  };
}
function computeLineRanges(content) {
  const parts = content.split("\n");
  const ranges = [];
  let offset = 0;
  parts.forEach((part, index) => {
    const hasNewline = index < parts.length - 1;
    const start = offset;
    const end = start + part.length + (hasNewline ? 1 : 0);
    ranges.push({ start, end });
    offset = end;
  });
  return ranges;
}
function blockCharRange(section, lineRanges) {
  const first = lineRanges[section.lineStart];
  const last = lineRanges[section.lineEnd];
  if (first === void 0 || last === void 0 || section.lineEnd < section.lineStart) {
    return null;
  }
  return { start: first.start, end: last.end };
}
function buildReadingViewOverlay(input, blocks) {
  const prepared = prepareOverlay(input);
  if (typeof prepared === "string") {
    return { visible: false, hiddenReason: prepared, markers: [], legend: [] };
  }
  const format = input.formatTimestamp ?? defaultFormatTimestamp;
  const lineRanges = computeLineRanges(input.content);
  const markers = [];
  for (const block of blocks) {
    if (block.section === null) {
      continue;
    }
    const range = blockCharRange(block.section, lineRanges);
    if (range === null) {
      continue;
    }
    const marker = buildBlockMarker(block.blockId, range, prepared.runs, {
      format,
      animate: !input.reducedMotion
    });
    if (marker !== null) {
      markers.push(marker);
    }
  }
  return {
    visible: true,
    hiddenReason: null,
    markers,
    legend: prepared.legend
  };
}
function buildBlockMarker(blockId, range, runs, options) {
  const authors = [];
  const coveredByToken = /* @__PURE__ */ new Map();
  for (const run of runs) {
    const overlap = Math.min(run.to, range.end) - Math.max(run.from, range.start);
    if (overlap <= 0) {
      continue;
    }
    if (!authors.some((existing) => sameAuthor(existing, run.author))) {
      authors.push(run.author);
    }
    coveredByToken.set(
      run.author.colorToken,
      (coveredByToken.get(run.author.colorToken) ?? 0) + overlap
    );
  }
  if (authors.length === 0) {
    return null;
  }
  const dominant = pickDominant(authors, coveredByToken);
  const tooltip = authors.map((author) => tooltipFor(author, options.format)).join("; ");
  return {
    blockId,
    colorToken: dominant.colorToken,
    underline: true,
    tooltip,
    ariaLabel: tooltip,
    animate: options.animate,
    authors
  };
}
function sameAuthor(left, right) {
  return left.colorToken === right.colorToken && left.displayName === right.displayName;
}
function pickDominant(authors, coveredByToken) {
  return [...authors].sort((left, right) => {
    const leftCovered = coveredByToken.get(left.colorToken) ?? 0;
    const rightCovered = coveredByToken.get(right.colorToken) ?? 0;
    if (leftCovered !== rightCovered) {
      return rightCovered - leftCovered;
    }
    return left.colorToken < right.colorToken ? -1 : 1;
  })[0];
}

// src/runtime/activity-log.ts
var DEFAULT_MAX_ENTRIES = 200;
var REMOTE_COLOR_ID = "havemind-remote";
var FEED_VAULT_ID = "havemind-feed";
var ActivityLog = class {
  constructor(options = {}) {
    __publicField(this, "entries", []);
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "maxEntries");
    this.maxEntries = options.maxEntries ?? DEFAULT_MAX_ENTRIES;
  }
  /** Records (or replaces by revisionId) an entry and notifies subscribers. */
  record(entry) {
    const next = this.entries.filter(
      (existing) => existing.revisionId !== entry.revisionId
    );
    next.push(entry);
    this.entries = next.length > this.maxEntries ? next.slice(next.length - this.maxEntries) : next;
    for (const listener of this.listeners) {
      listener();
    }
  }
  /** All recorded entries in insertion order (oldest first). */
  snapshot() {
    return [...this.entries];
  }
  /** Subscribe to changes; returns an unsubscribe disposer. */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
};
function soleOtherMember(roster) {
  const others = roster.filter((member) => !member.self);
  return others.length === 1 ? others[0] : null;
}
function remoteAppliedToActivityEntry(info, timestamp) {
  return {
    revisionId: info.revisionId,
    fileId: info.fileId,
    path: info.path,
    kind: toRemoteActivityKind(info.operation),
    author: { kind: "remote" },
    timestamp,
    hasContent: info.operation !== "delete"
  };
}
function remoteAppliedToActivityEntryOrNull(info, timestamp) {
  if (info.origin === "bootstrap") {
    return null;
  }
  return remoteAppliedToActivityEntry(info, timestamp);
}
function toRemoteActivityKind(operation) {
  switch (operation) {
    case "create":
      return "create";
    case "update":
      return "edit";
    case "rename":
      return "rename";
    case "delete":
      return "delete";
    default:
      return "edit";
  }
}
function activityEntriesToRecords(entries, roster) {
  const byMembership = new Map(
    roster.map((member) => [member.membershipId, member])
  );
  return entries.map((entry) => {
    const author = resolveAuthor2(entry.author, byMembership, roster);
    return {
      revisionId: entry.revisionId,
      // A non-empty placeholder: the feed never tracks a real vaultId today,
      // but sync-core's RevisionDag (used by the append-only restore path)
      // rejects an empty vaultId outright.
      vaultId: FEED_VAULT_ID,
      fileId: entry.fileId,
      path: entry.path,
      previousPath: null,
      kind: entry.kind,
      actor: author,
      timestamp: entry.timestamp,
      content: entry.hasContent ? "" : null,
      // Non-empty placeholder for the same reason as vaultId above — the feed
      // never tracks a real content hash, but RevisionDag rejects an empty
      // blobHash. Keyed by revisionId so distinct entries stay distinct.
      blobHash: `feed:${entry.revisionId}`,
      parentRevisionIds: [],
      provenance: [],
      restoredFromRevisionId: null
    };
  });
}
function resolveAuthor2(author, byMembership, roster) {
  if (author.kind === "initial-import") {
    return { kind: "initial-import" };
  }
  if (author.kind === "member") {
    const member = byMembership.get(author.membershipId);
    return {
      kind: "author",
      actorId: author.membershipId,
      displayName: member?.displayName ?? "Unknown member"
    };
  }
  const other = soleOtherMember(roster);
  if (other !== null) {
    return {
      kind: "author",
      actorId: other.membershipId,
      displayName: other.displayName
    };
  }
  return { kind: "author", actorId: REMOTE_COLOR_ID, displayName: "Remote" };
}

// src/attribution/overlay-source.ts
var WHOLE_FILE_ATTRIBUTION = "havemind:whole-file-attribution";
function newestByTimestamp(records) {
  let newest = null;
  for (const record2 of records) {
    if (newest === null || record2.timestamp >= newest.timestamp) {
      newest = record2;
    }
  }
  return newest;
}
function toOverlayActor(actor) {
  if (actor.kind === "initial-import") {
    return { kind: "initial-import" };
  }
  return {
    kind: "author",
    actorId: actor.actorId,
    displayName: actor.displayName
  };
}
function buildFileOverlayInput(request) {
  const { path } = request;
  if (!request.enabled || path === null) {
    return null;
  }
  if (request.content.length === 0) {
    return null;
  }
  const forPath = request.entries.filter((entry) => entry.path === path);
  if (forPath.length === 0) {
    return null;
  }
  const newest = newestByTimestamp(
    activityEntriesToRecords(forPath, request.roster)
  );
  if (newest === null) {
    return null;
  }
  return {
    enabled: true,
    content: request.content,
    contentHash: WHOLE_FILE_ATTRIBUTION,
    headBlobHash: WHOLE_FILE_ATTRIBUTION,
    provenance: [
      { length: request.content.length, sourceRevisionId: newest.revisionId }
    ],
    authors: /* @__PURE__ */ new Map([
      [
        newest.revisionId,
        {
          actor: toOverlayActor(newest.actor),
          timestamp: newest.timestamp
        }
      ]
    ]),
    reducedMotion: request.reducedMotion,
    ...request.formatTimestamp === void 0 ? {} : { formatTimestamp: request.formatTimestamp }
  };
}

// src/attribution/editor-extension.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_obsidian = require("obsidian");
var AUTHOR_MARK_CLASS = "havemind-author-mark";
var AUTHOR_MARK_ANIMATE_CLASS = "havemind-author-mark-animate";
function pathForEditorView(view) {
  const info = view.state.field(import_obsidian.editorInfoField, false);
  return info?.file?.path ?? null;
}
function buildAuthorDecorations(overlay, docLength) {
  if (overlay === null || !overlay.visible) {
    return import_view.Decoration.none;
  }
  const builder = new import_state.RangeSetBuilder();
  for (const segment of overlay.segments) {
    const from = Math.min(Math.max(segment.from, 0), docLength);
    const to = Math.min(Math.max(segment.to, 0), docLength);
    if (to <= from) {
      continue;
    }
    builder.add(
      from,
      to,
      import_view.Decoration.mark({
        class: segment.animate ? `${AUTHOR_MARK_CLASS} ${AUTHOR_MARK_ANIMATE_CLASS}` : AUTHOR_MARK_CLASS,
        attributes: {
          title: segment.tooltip,
          "aria-label": segment.ariaLabel,
          "data-havemind-author": segment.author.displayName,
          // The token name only — the concrete light/dark value lives in
          // `styles.css`, never in the note or the decoration.
          style: `--havemind-overlay-color: var(${segment.colorToken});`
        }
      })
    );
  }
  return builder.finish();
}
function createAuthorOverlayExtension(source) {
  return import_view.ViewPlugin.fromClass(
    class {
      constructor(view) {
        __publicField(this, "decorations");
        this.decorations = this.build(view);
      }
      update(update) {
        this.decorations = this.build(update.view);
      }
      build(view) {
        return buildAuthorDecorations(
          source.overlayFor(
            pathForEditorView(view),
            view.state.doc.toString()
          ),
          view.state.doc.length
        );
      }
    },
    { decorations: (value) => value.decorations }
  );
}

// src/attribution/reading-view.ts
var AUTHOR_BLOCK_CLASS = "havemind-author-block";
var AUTHOR_BLOCK_ANIMATE_CLASS = "havemind-author-block-animate";
var AUTHOR_BLOCK_ATTRIBUTE = "data-havemind-authors";
function applyReadingMarker(element, marker) {
  element.addClass(AUTHOR_BLOCK_CLASS);
  if (marker.animate) {
    element.addClass(AUTHOR_BLOCK_ANIMATE_CLASS);
  }
  element.setAttribute(
    AUTHOR_BLOCK_ATTRIBUTE,
    marker.authors.map((author) => author.displayName).join(", ")
  );
  element.setAttribute("title", marker.tooltip);
  element.setAttribute("aria-label", marker.ariaLabel);
  element.style.setProperty(
    "--havemind-overlay-color",
    `var(${marker.colorToken})`
  );
}
function createAuthorReadingViewProcessor(source) {
  return (element, context) => {
    const section = context.getSectionInfo(element);
    if (section === null) {
      return;
    }
    const overlay = source.overlayFor(context.sourcePath, section.text, section);
    if (overlay === null || !overlay.visible) {
      return;
    }
    const marker = overlay.markers[0];
    if (marker === void 0) {
      return;
    }
    applyReadingMarker(element, marker);
  };
}

// src/onboarding/invite.ts
var INVITE_ENVELOPE_VERSION = 1;
var ENVELOPE_PREFIX = "v1.";
var ENVELOPE_PATTERN = /^v1\.([A-Za-z0-9_-]+)$/u;
var BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/u;
var INVITATION_PREFIX = "hm_it_";
var TOKEN_PAYLOAD_PATTERN = /^[A-Za-z0-9_-]{43}$/u;
var TOKEN_BYTE_LENGTH = 32;
var MAX_ENVELOPE_LENGTH = 1024;
var InviteFormatError = class extends Error {
  constructor() {
    super("The secure invitation has an invalid or non-canonical format.");
    __publicField(this, "code", "invalid-invitation-envelope");
    __publicField(this, "name", "InviteFormatError");
  }
};
function buildInviteEnvelope(input) {
  assertCanonicalHttpsOrigin(input.serverOrigin);
  assertInvitationToken(input.invitationToken);
  return encodeEnvelope({
    version: INVITE_ENVELOPE_VERSION,
    serverOrigin: input.serverOrigin,
    invitationToken: input.invitationToken
  });
}
function parseInviteEnvelope(value) {
  if (value.length > MAX_ENVELOPE_LENGTH) throw new InviteFormatError();
  const match = ENVELOPE_PATTERN.exec(value);
  const payload = match?.[1];
  if (!payload) throw new InviteFormatError();
  let decoded;
  try {
    const bytes = decodeBase64Url(payload);
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new InviteFormatError();
  }
  let parsed;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    throw new InviteFormatError();
  }
  const envelope = parseEnvelopeRecord(parsed);
  if (encodeEnvelope(envelope) !== value) throw new InviteFormatError();
  return envelope;
}
function isSafePassiveJoinProtocolData(data) {
  const keys = Object.keys(data);
  return keys.length === 1 && data.action === "havemind-join";
}
function parseEnvelopeRecord(value) {
  if (!isRecord2(value)) throw new InviteFormatError();
  const keys = Object.keys(value);
  if (keys.length !== 3 || !keys.includes("version") || !keys.includes("serverOrigin") || !keys.includes("invitationToken") || value.version !== INVITE_ENVELOPE_VERSION || typeof value.serverOrigin !== "string" || typeof value.invitationToken !== "string") {
    throw new InviteFormatError();
  }
  assertCanonicalHttpsOrigin(value.serverOrigin);
  assertInvitationToken(value.invitationToken);
  return {
    version: INVITE_ENVELOPE_VERSION,
    serverOrigin: value.serverOrigin,
    invitationToken: value.invitationToken
  };
}
function encodeEnvelope(envelope) {
  const canonicalJson = JSON.stringify({
    version: envelope.version,
    serverOrigin: envelope.serverOrigin,
    invitationToken: envelope.invitationToken
  });
  return `${ENVELOPE_PREFIX}${encodeBase64Url(
    new TextEncoder().encode(canonicalJson)
  )}`;
}
function assertCanonicalHttpsOrigin(value) {
  let url2;
  try {
    url2 = new URL(value);
  } catch {
    throw new InviteFormatError();
  }
  if (url2.protocol !== "https:" || url2.username !== "" || url2.password !== "" || url2.pathname !== "/" || url2.search !== "" || url2.hash !== "" || url2.origin !== value) {
    throw new InviteFormatError();
  }
}
function assertInvitationToken(value) {
  if (!value.startsWith(INVITATION_PREFIX)) throw new InviteFormatError();
  const payload = value.slice(INVITATION_PREFIX.length);
  if (!TOKEN_PAYLOAD_PATTERN.test(payload)) throw new InviteFormatError();
  let decoded;
  try {
    decoded = decodeBase64Url(payload);
  } catch {
    throw new InviteFormatError();
  }
  if (decoded.byteLength !== TOKEN_BYTE_LENGTH || encodeBase64Url(decoded) !== payload) {
    throw new InviteFormatError();
  }
}
function encodeBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}
function decodeBase64Url(value) {
  if (!BASE64URL_PATTERN.test(value) || value.length % 4 === 1) {
    throw new InviteFormatError();
  }
  const base643 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base643.padEnd(base643.length + (4 - base643.length % 4) % 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  if (encodeBase64Url(bytes) !== value) throw new InviteFormatError();
  return bytes;
}
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/sync-state.ts
var PAYLOAD_MISSING_REASON = "payload-missing";
var DEFAULT_MAX_LOCALLY_AUTHORED = 1e4;
var QUARANTINED_ENVELOPE_BUDGET_BYTES = 5 * 1024 * 1024;
var FAILED_TO_QUEUE_PREFIX = "failed-to-queue:";
function failedToQueueRevisionId(path) {
  return `${FAILED_TO_QUEUE_PREFIX}${path}`;
}
function parseFailedToQueuePath(revisionId) {
  if (!revisionId.startsWith(FAILED_TO_QUEUE_PREFIX)) return null;
  const path = revisionId.slice(FAILED_TO_QUEUE_PREFIX.length);
  return path.length === 0 ? null : path;
}
function emptyState() {
  return {
    version: 1,
    cursor: 0,
    outbox: [],
    locallyAuthored: [],
    deferred: [],
    quarantine: [],
    pathOwners: {},
    baseHashes: {},
    baseContents: {},
    conflictArtifacts: {},
    quarantinedEnvelopes: {}
  };
}
function parentIdsFromHeader(header) {
  if (!isRecord3(header)) return [];
  const ids = header.parentRevisionIds;
  if (!Array.isArray(ids)) return [];
  return ids.filter((id) => typeof id === "string");
}
function base64ByteLength(base643) {
  const length = base643.length;
  if (length === 0) return 0;
  let padding = 0;
  if (base643.endsWith("==")) padding = 2;
  else if (base643.endsWith("=")) padding = 1;
  return Math.floor(length * 3 / 4) - padding;
}
var DurableSyncState = class {
  constructor(options) {
    __publicField(this, "persist");
    __publicField(this, "maxLocallyAuthored");
    __publicField(this, "now");
    __publicField(this, "envelopeBudgetBytes");
    /**
     * Optional out-of-band payload store (arch P1). Undefined → payloads always
     * stay inline in `data.json` (legacy behaviour, unchanged). Present → payload
     * bytes are mirrored here and stripped from the on-disk blob; every access is
     * wrapped in a fallible guard so an unavailable store degrades to inline.
     */
    __publicField(this, "payloadStore");
    /**
     * The set of outbox/stash `revisionId`s whose payload currently lives in the
     * payload store (so the on-disk form strips their inline bytes). Populated on
     * enqueue/requeue, on load rehydration, and on legacy-blob migration; pruned
     * on receipt/discard/eviction. A revisionId absent here keeps its bytes inline
     * (the fallback path), so the disk form only ever strips a payload the store
     * actually holds — never one that would then be irrecoverable.
     */
    __publicField(this, "externalized", /* @__PURE__ */ new Set());
    __publicField(this, "cache", null);
    /**
     * Set when the primary blob was present-but-corrupt with an UNRECOVERABLE
     * outbox (the queue container itself could not be read), no usable `.bak`
     * existed, and the raw bytes were preserved to a sidecar for manual recovery
     * (GAP-1). It is a purely OBSERVABLE signal (see {@link isRecoveryRequired}),
     * never a save lock — the instance resumes from a clean, writable empty state
     * and the primary is rewritten so a restart never re-locks. Surfaced to the UI
     * so the user sees "local queue needs recovery" rather than silently assuming
     * the queue drained. A salvageable corruption (readable outbox, only a
     * non-outbox core field damaged) never sets this: the queue is kept and the
     * cleaned state is written back, so nothing is at risk.
     */
    __publicField(this, "recoveryRequired", false);
    /**
     * De-dupes concurrent cold-cache loads. Without it, two callers that both find
     * a null cache each `await persist.load()`; the later resolution re-parses the
     * on-disk blob and clobbers any cache mutation the first caller made during the
     * await (an enqueued revision, an advanced cursor) — a silent dropped push at
     * connect (rule 3). All concurrent callers share this single in-flight load.
     */
    __publicField(this, "loadPromise", null);
    /**
     * Serializes every read-modify-write critical section against the shared
     * in-memory cache. Each mutating method reads the cache (`ensureLoaded`) and
     * writes it back (`mutate`) as a `{ ...state, field }` spread, with `await`
     * points in between. On a WARM cache `ensureLoaded` reads synchronously, so
     * two sections that overlap each capture the SAME snapshot and the later
     * `mutate` silently drops the earlier one's write — a lost update. In the
     * two-device sync loop this dropped a file's base CONTENT while keeping its
     * base HASH, which then made the three-way merge (it needs the ancestor
     * content) fail and spawn a SPURIOUS conflict copy (rule 3: zero silent
     * overwrites / data loss). This is the in-memory analogue of the data.json
     * `PluginDataMutex`, which only guards the on-disk save, not the cache RMW.
     * Chaining each section on this single tail makes it run to completion before
     * the next one reads, so no committed write is ever clobbered. Read-only
     * accessors stay off the queue: `mutate` swaps the whole cache object in one
     * synchronous assignment, so any read sees a complete, consistent snapshot.
     */
    __publicField(this, "mutationTail", Promise.resolve());
    this.persist = options.persist;
    this.maxLocallyAuthored = options.maxLocallyAuthored ?? DEFAULT_MAX_LOCALLY_AUTHORED;
    this.now = options.now ?? (() => Date.now());
    this.envelopeBudgetBytes = options.quarantinedEnvelopeBudgetBytes ?? QUARANTINED_ENVELOPE_BUDGET_BYTES;
    this.payloadStore = options.payloadStore;
  }
  /**
   * Whether the last load found a present-but-corrupt blob with an unparseable
   * non-empty outbox and no usable backup (GAP-1). While true, no mutation is
   * persisted (the corrupt blob and its sidecar copy are left intact), and the
   * UI/status should tell the user the local queue needs recovery.
   */
  isRecoveryRequired() {
    return this.recoveryRequired;
  }
  async loadCursor() {
    return (await this.ensureLoaded()).cursor;
  }
  async saveCursor(sequence) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({ ...state, cursor: sequence });
    });
  }
  async listOutbox() {
    const state = await this.ensureLoaded();
    return state.outbox.map((envelope) => {
      const parentRevisionIds = parentIdsFromHeader(envelope.header);
      return {
        revisionId: envelope.revisionId,
        fileId: envelope.fileId,
        contentHash: envelope.contentHash,
        payloadBytes: base64ByteLength(envelope.payloadBase64),
        // Omitted when empty so a root create carries no dependency (and existing
        // exact-shape assertions on parentless rows are unchanged).
        ...parentRevisionIds.length > 0 ? { parentRevisionIds } : {}
      };
    });
  }
  async recordPushReceipt(receipt) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      const outbox = state.outbox.filter(
        (envelope) => envelope.revisionId !== receipt.revisionId
      );
      await this.dropPayload(receipt.revisionId);
      await this.mutate({
        ...state,
        outbox,
        locallyAuthored: this.rememberAuthored(
          state.locallyAuthored,
          receipt.revisionId
        )
      });
    });
  }
  async quarantineOutboxItem(revisionId, reason) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      const failed = state.outbox.find(
        (envelope) => envelope.revisionId === revisionId
      );
      const outbox = state.outbox.filter(
        (envelope) => envelope.revisionId !== revisionId
      );
      const entry = {
        revisionId,
        fileId: failed?.fileId ?? "",
        reason
      };
      const quarantine = [
        ...state.quarantine.filter((item) => item.revisionId !== revisionId),
        entry
      ];
      const quarantinedEnvelopes = { ...state.quarantinedEnvelopes };
      if (failed !== void 0) {
        quarantinedEnvelopes[revisionId] = failed;
      }
      const budgeted = this.evictStashesOverBudget(quarantinedEnvelopes);
      for (const evictedId of Object.keys(quarantinedEnvelopes)) {
        if (!(evictedId in budgeted)) {
          await this.dropPayload(evictedId);
        }
      }
      await this.mutate({
        ...state,
        outbox,
        quarantine,
        quarantinedEnvelopes: budgeted
      });
    });
  }
  /**
   * Returns a copy of `envelopes` trimmed to the byte budget (MAJOR 4). Object
   * key order is insertion order, so iterating from the front evicts the OLDEST
   * stashes until the summed decoded payload bytes fit. A single stash larger
   * than the whole budget is evicted too — its row survives and Retry re-commits
   * from disk, which is the only recovery once the bytes are dropped.
   */
  evictStashesOverBudget(envelopes) {
    const entries = Object.entries(envelopes);
    let total = entries.reduce(
      (sum, [, env]) => sum + base64ByteLength(env.payloadBase64),
      0
    );
    if (total <= this.envelopeBudgetBytes) return envelopes;
    const trimmed = { ...envelopes };
    for (const [key, env] of entries) {
      if (total <= this.envelopeBudgetBytes) break;
      total -= base64ByteLength(env.payloadBase64);
      delete trimmed[key];
    }
    return trimmed;
  }
  /**
   * Record a durable "failed to queue" entry (SND-02): a local change whose
   * commit-path enqueue permanently failed (e.g. a transient readText/saveData
   * failure that survived a bounded re-arm), so it never reached the outbox and
   * has no envelope to retry. It reuses the SND-01 quarantine machinery so the
   * send-queue panel surfaces it alongside server-rejected sends under the
   * distinguishable reason `failed-to-queue`, keyed by a synthetic revisionId
   * derived from the path (see {@link failedToQueueRevisionId}) so repeated
   * failures for the same file coalesce into one row rather than flooding the
   * panel. Nothing is ever silently dropped.
   *
   * Discard behaves identically to a server-rejected send, but Retry does NOT:
   * a failed-to-queue row has no stashed envelope (it never reached the outbox),
   * so `requeueQuarantined` is inert for it. Retry instead re-triggers the
   * commit chain for the path from disk (MAJOR 2, routed by the caller via
   * {@link parseFailedToQueuePath}) — the on-disk content is the source of truth.
   */
  async recordFailedToQueue(path) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      const revisionId = failedToQueueRevisionId(path);
      const entry = {
        revisionId,
        fileId: path,
        reason: "failed-to-queue"
      };
      const quarantine = [
        ...state.quarantine.filter((item) => item.revisionId !== revisionId),
        entry
      ];
      await this.mutate({ ...state, quarantine });
    });
  }
  async listQuarantine() {
    return (await this.ensureLoaded()).quarantine;
  }
  async isLocallyAuthored(revisionId) {
    const state = await this.ensureLoaded();
    return state.locallyAuthored.includes(revisionId);
  }
  /**
   * Synchronous owner lookup against the warmed cache. Returns the fileId that
   * owns `path`, or null if Havemind has not materialized a file there. The
   * vault adapter uses this to update already-synced files in place while
   * routing genuine collisions (a foreign file at the path) to conflicts.
   */
  fileIdAtPath(path) {
    return this.cache?.pathOwners[path] ?? null;
  }
  async recordPathOwner(fileId, path) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({
        ...state,
        pathOwners: { ...state.pathOwners, [path]: fileId }
      });
    });
  }
  async forgetPath(path) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      if (!(path in state.pathOwners)) return;
      const pathOwners = { ...state.pathOwners };
      delete pathOwners[path];
      await this.mutate({ ...state, pathOwners });
    });
  }
  /**
   * Synchronous lookup of the last synced base content hash for a file against
   * the warmed cache, or null when Havemind has no recorded base yet. The vault
   * adapter uses this to detect whether the on-disk content has diverged from
   * the shared base before applying an incoming remote revision.
   */
  baseHashFor(fileId) {
    return this.cache?.baseHashes[fileId] ?? null;
  }
  async recordBaseHash(fileId, hash2) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({
        ...state,
        baseHashes: { ...state.baseHashes, [fileId]: hash2 }
      });
    });
  }
  async forgetBaseHash(fileId) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      if (!(fileId in state.baseHashes)) return;
      const baseHashes = { ...state.baseHashes };
      delete baseHashes[fileId];
      await this.mutate({ ...state, baseHashes });
    });
  }
  /**
   * The exact base CONTENT for a file (the merge ancestor, MRG-01), or null when
   * none is recorded. Synchronous against the warmed cache, like `baseHashFor`.
   */
  baseContentFor(fileId) {
    return this.cache?.baseContents[fileId] ?? null;
  }
  async recordBaseContent(fileId, content) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({
        ...state,
        baseContents: { ...state.baseContents, [fileId]: content }
      });
    });
  }
  async forgetBaseContent(fileId) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      if (!(fileId in state.baseContents)) return;
      const baseContents = { ...state.baseContents };
      delete baseContents[fileId];
      await this.mutate({ ...state, baseContents });
    });
  }
  /**
   * The conflict-artifact path already written for `revisionId` (MRG-02
   * cascade guard), or null if this revision has not conflicted before.
   * Synchronous against the warmed cache.
   */
  conflictArtifactPathFor(revisionId) {
    return this.cache?.conflictArtifacts[revisionId] ?? null;
  }
  async recordConflictArtifactPath(revisionId, path) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({
        ...state,
        conflictArtifacts: { ...state.conflictArtifacts, [revisionId]: path }
      });
    });
  }
  async enqueue(envelope) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      const stamped = envelope.enqueuedAt === void 0 ? { ...envelope, enqueuedAt: this.now() } : envelope;
      if (await this.safePutPayload(stamped.revisionId, stamped.payloadBase64)) {
        this.externalized.add(stamped.revisionId);
      } else {
        this.externalized.delete(stamped.revisionId);
      }
      const outbox = [
        ...state.outbox.filter(
          (entry) => entry.revisionId !== envelope.revisionId
        ),
        stamped
      ];
      await this.mutate({ ...state, outbox });
    });
  }
  /**
   * Outbox items paired with their enqueue time (SND-01), read synchronously
   * against the warm cache. A missing `enqueuedAt` (legacy blob) is reported as
   * 0 — "very old" — so a pre-upgrade item still counts as waiting. The runner
   * always warms the cache before it pushes, so the panel's synchronous read
   * finds a populated cache once connected; a cold cache reports no ages.
   */
  outboxAges() {
    return (this.cache?.outbox ?? []).map((envelope) => ({
      revisionId: envelope.revisionId,
      enqueuedAt: envelope.enqueuedAt ?? 0
    }));
  }
  /** Synchronous quarantine snapshot against the warm cache (SND-01). */
  quarantineSnapshot() {
    return this.cache?.quarantine ?? [];
  }
  /** The vault path a fileId currently owns (reverse of `fileIdAtPath`), or null. */
  pathForFileId(fileId) {
    const owners = this.cache?.pathOwners ?? {};
    for (const [path, owner] of Object.entries(owners)) {
      if (owner === fileId) return path;
    }
    return null;
  }
  /**
   * Retry a quarantined send (SND-01): re-enqueue its stashed envelope through
   * the normal outbox machinery (fresh enqueue time), then drop it from the
   * quarantine and the stash. Returns true when it re-enqueued, false when
   * nothing is stashed for `revisionId` — already requeued/discarded, or the
   * stash was evicted under the byte budget (MAJOR 4). A false return leaves the
   * quarantine row intact so the caller can degrade Retry to a re-commit from
   * disk; a double click cannot double-enqueue because the second call finds no
   * stash and returns false.
   */
  async requeueQuarantined(revisionId) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      const stashed = state.quarantinedEnvelopes[revisionId];
      if (stashed === void 0) return false;
      const quarantinedEnvelopes = { ...state.quarantinedEnvelopes };
      delete quarantinedEnvelopes[revisionId];
      const outbox = [
        ...state.outbox.filter((entry) => entry.revisionId !== revisionId),
        { ...stashed, enqueuedAt: this.now() }
      ];
      const quarantine = state.quarantine.filter(
        (item) => item.revisionId !== revisionId
      );
      await this.mutate({ ...state, outbox, quarantine, quarantinedEnvelopes });
      return true;
    });
  }
  /**
   * Permanently drop a quarantined send (SND-01): remove it from the quarantine
   * and forget its stashed envelope. Idempotent — dropping an unknown id is a
   * no-op.
   */
  async discardQuarantined(revisionId) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      if (!state.quarantine.some((item) => item.revisionId === revisionId) && state.quarantinedEnvelopes[revisionId] === void 0) {
        return;
      }
      const quarantinedEnvelopes = { ...state.quarantinedEnvelopes };
      delete quarantinedEnvelopes[revisionId];
      const quarantine = state.quarantine.filter(
        (item) => item.revisionId !== revisionId
      );
      await this.dropPayload(revisionId);
      await this.mutate({ ...state, quarantine, quarantinedEnvelopes });
    });
  }
  async getEnvelope(revisionId) {
    await this.ensureLoaded();
    return this.peekEnvelope(revisionId);
  }
  /**
   * Synchronous lookup against the warmed cache. The runner always awaits
   * `listOutbox` (which loads the cache) before it pushes, so the transport's
   * synchronous `resolveEnvelope` finds a warm cache by the time it runs.
   */
  peekEnvelope(revisionId) {
    const found = this.cache?.outbox.find(
      (envelope) => envelope.revisionId === revisionId
    );
    if (found === void 0) return void 0;
    return {
      header: found.header,
      idempotencyKey: found.idempotencyKey,
      payloadBase64: found.payloadBase64
    };
  }
  async listDeferred() {
    return (await this.ensureLoaded()).deferred;
  }
  async saveDeferred(events) {
    return this.runExclusive(async () => {
      const state = await this.ensureLoaded();
      await this.mutate({ ...state, deferred: [...events] });
    });
  }
  rememberAuthored(existing, revisionId) {
    if (existing.includes(revisionId)) return existing;
    const next = [...existing, revisionId];
    return next.length > this.maxLocallyAuthored ? next.slice(next.length - this.maxLocallyAuthored) : next;
  }
  async ensureLoaded() {
    if (this.cache !== null) return this.cache;
    if (this.loadPromise === null) {
      this.loadPromise = this.persist.load().then((raw) => this.hydrate(raw)).then(() => this.reconcilePayloads()).finally(() => {
        this.loadPromise = null;
      });
    }
    await this.loadPromise;
    if (this.cache === null) this.cache = emptyState();
    return this.cache;
  }
  /**
   * Parse the loaded primary blob into the cache (GAP-1 fail-closed policy). A
   * mutation may have populated the cache while the load was in flight (e.g. an
   * enqueue that awaited this same shared promise and then wrote); never clobber
   * it — re-check `this.cache === null` before each assignment.
   *
   *  - ABSENT (null/undefined): a clean first run → empty, writable state.
   *  - OK: the parsed state (with bad outbox envelopes quarantined, not nuked).
   *  - CORRUPT (present but a core field failed): try the `.bak` first; if it is
   *    a valid present state, recover from it. Otherwise, with no usable backup:
   *      · SALVAGE when the outbox is still readable (only a non-outbox core
   *        field is damaged): keep the queue + locally-authored ids, reset the
   *        unrecoverable fields to safe defaults, preserve the raw blob to a
   *        sidecar, and write the CLEANED state back as the new primary. Nothing
   *        is at risk, so recovery is NOT flagged and the next load reads 'ok'.
   *      · UNRECOVERABLE when the queue container itself cannot be read: preserve
   *        the raw blob to a sidecar for manual recovery, resume from a clean,
   *        writable empty state, rewrite the primary to it (so a restart never
   *        re-locks), and set the observable recovery signal.
   */
  async hydrate(raw) {
    if (this.cache !== null) return;
    const outcome = parsePersistedState(raw);
    if (outcome.status !== "corrupt") {
      if (this.cache === null) this.cache = outcome.state;
      return;
    }
    const backup = await this.persist.loadBackup();
    if (this.cache !== null) return;
    const backupOutcome = parsePersistedState(backup);
    if (backupOutcome.status === "ok") {
      await this.persist.preserveCorrupt(raw, this.now());
      if (this.cache === null) {
        this.cache = backupOutcome.state;
        if (salvageHasOutboxEntriesMissingFrom(outcome.salvage, backupOutcome.state.outbox)) {
          this.recoveryRequired = true;
        }
      }
      return;
    }
    await this.persist.preserveCorrupt(raw, this.now());
    if (this.cache !== null) return;
    if (outcome.salvage !== null) {
      this.cache = outcome.salvage;
    } else {
      this.cache = emptyState();
      if (outcome.outboxAtRisk) this.recoveryRequired = true;
    }
    await this.persist.save(this.toDiskForm(this.cache));
  }
  async mutate(next) {
    this.cache = next;
    await this.persist.save(this.toDiskForm(next));
  }
  /**
   * Arch P1: the on-disk projection of `state`. For every outbox/stash envelope
   * whose payload is externalized (its `revisionId` is in {@link externalized},
   * i.e. the store durably holds the bytes), the inline `payloadBase64` is
   * replaced by `''` and marked `payloadExternalized: true`. A payload NOT in the
   * set (legacy, or an inline-fallback under an unavailable store) is written
   * inline unchanged — so the disk form only ever strips bytes the store actually
   * holds, never bytes that would then be irrecoverable. Returns `state` itself
   * when nothing is externalized (the legacy path), so behaviour is identical to
   * before when no payload store is configured.
   */
  toDiskForm(state) {
    if (this.externalized.size === 0) return state;
    const strip = (env) => this.externalized.has(env.revisionId) ? { ...env, payloadBase64: "", payloadExternalized: true } : env;
    const quarantinedEnvelopes = {};
    for (const [key, env] of Object.entries(state.quarantinedEnvelopes)) {
      quarantinedEnvelopes[key] = strip(env);
    }
    return {
      ...state,
      outbox: state.outbox.map(strip),
      quarantinedEnvelopes
    };
  }
  /** Fallible payload-store read: undefined on absence OR any store failure. */
  async safeGetPayload(revisionId) {
    if (this.payloadStore === void 0) return void 0;
    try {
      return await this.payloadStore.getPayload(revisionId);
    } catch {
      return void 0;
    }
  }
  /**
   * Fallible payload-store write. Returns true when the bytes are durably in the
   * store (so the caller marks the id externalized and the disk form strips it),
   * false when there is no store or the write threw (keep the payload inline —
   * the graceful mobile/unavailable fallback).
   */
  async safePutPayload(revisionId, payloadBase64) {
    if (this.payloadStore === void 0) return false;
    try {
      await this.payloadStore.putPayload(revisionId, payloadBase64);
      return true;
    } catch (error51) {
      console.warn(
        `Havemind: outbox payload for ${revisionId} could not be externalized; keeping it inline in data.json.`,
        error51
      );
      return false;
    }
  }
  /**
   * Drop a revision's externalized payload from the store when it leaves BOTH the
   * outbox and the stash for good (receipt, discard, budget eviction). A no-op
   * when the id was never externalized (inline path). Best-effort: a failed
   * delete only leaks bytes, never corrupts state, so it is swallowed.
   */
  async dropPayload(revisionId) {
    if (!this.externalized.has(revisionId)) return;
    if (this.payloadStore !== void 0) {
      try {
        await this.payloadStore.deletePayload(revisionId);
      } catch {
      }
    }
    this.externalized.delete(revisionId);
  }
  /**
   * Reconcile outbox/stash payloads with the out-of-band store after load (arch
   * P1). For each envelope:
   *  - EXTERNALIZED (a reference: empty inline bytes + marker): fetch the bytes.
   *    Present → rehydrate them into the in-memory cache so `peekEnvelope` drains
   *    the real payload; missing/unresolvable → fail-closed. A missing OUTBOX
   *    payload is quarantined (never drained empty); a missing STASH payload is
   *    dropped (its quarantine row already records the failure), mirroring the
   *    byte-budget eviction contract.
   *  - INLINE (legacy or fallback): opportunistically MIGRATE the bytes into the
   *    store, marking the id externalized so the next save shrinks `data.json`.
   * When anything changed, the cleaned/migrated state is persisted immediately
   * (disk form) so a legacy blob is shrunk on first load, not only on next edit.
   */
  async reconcilePayloads() {
    const state = this.cache;
    if (state === null) return;
    let cacheChanged = false;
    let persistNeeded = false;
    const nextOutbox = [];
    const addedQuarantine = [];
    for (const env of state.outbox) {
      if (env.payloadExternalized === true) {
        const payload = await this.safeGetPayload(env.revisionId);
        if (typeof payload === "string") {
          this.externalized.add(env.revisionId);
          nextOutbox.push({ ...env, payloadBase64: payload });
          cacheChanged = true;
        } else {
          console.warn(
            `Havemind: outbox payload for ${env.revisionId} is missing from the store; quarantining it (fail-closed).`
          );
          addedQuarantine.push({
            revisionId: env.revisionId,
            fileId: env.fileId,
            reason: PAYLOAD_MISSING_REASON
          });
          cacheChanged = true;
          persistNeeded = true;
        }
      } else {
        nextOutbox.push(env);
        if (await this.safePutPayload(env.revisionId, env.payloadBase64)) {
          this.externalized.add(env.revisionId);
          persistNeeded = true;
        }
      }
    }
    const nextStash = {};
    for (const [key, env] of Object.entries(state.quarantinedEnvelopes)) {
      if (env.payloadExternalized === true) {
        const payload = await this.safeGetPayload(env.revisionId);
        if (typeof payload === "string") {
          this.externalized.add(env.revisionId);
          nextStash[key] = { ...env, payloadBase64: payload };
          cacheChanged = true;
        } else {
          persistNeeded = true;
        }
      } else {
        nextStash[key] = env;
        if (await this.safePutPayload(env.revisionId, env.payloadBase64)) {
          this.externalized.add(env.revisionId);
          persistNeeded = true;
        }
      }
    }
    if (!cacheChanged && !persistNeeded) return;
    const next = {
      ...state,
      outbox: nextOutbox,
      quarantine: [...state.quarantine, ...addedQuarantine],
      quarantinedEnvelopes: nextStash
    };
    this.cache = next;
    if (persistNeeded) {
      await this.persist.save(this.toDiskForm(next));
    }
  }
  /**
   * Runs a read-modify-write `section` (an `ensureLoaded` + `mutate` pair)
   * atomically with respect to every other section, by chaining them on a
   * single tail. See {@link mutationTail} for why this is required. `section`s
   * never nest (no mutating method calls another), so this cannot deadlock; the
   * tail swallows outcomes so one section's rejection never wedges the next.
   */
  runExclusive(section) {
    const run = this.mutationTail.then(section, section);
    this.mutationTail = run.then(
      () => void 0,
      () => void 0
    );
    return run;
  }
};
var CORRUPT_ENVELOPE_PREFIX = "corrupt-envelope:";
function parseOutboxEntries(outbox) {
  const parsedOutbox = [];
  const quarantinedBadEnvelopes = [];
  outbox.forEach((entry, index) => {
    const parsed = parseEnvelope(entry);
    if (parsed === null) {
      quarantinedBadEnvelopes.push(quarantineForCorruptEnvelope(entry, index));
    } else {
      parsedOutbox.push(parsed);
    }
  });
  if (quarantinedBadEnvelopes.length > 0) {
    console.warn(
      `Havemind: ${quarantinedBadEnvelopes.length} unparseable outbox envelope(s) were quarantined; the rest of the outbox was preserved.`
    );
  }
  return { parsedOutbox, quarantinedBadEnvelopes };
}
function parsePersistedState(raw) {
  if (raw === null || raw === void 0) {
    return { status: "absent", state: emptyState(), salvage: null, outboxAtRisk: false };
  }
  const strict = strictParse(raw);
  if (strict !== null) {
    return { status: "ok", state: strict, salvage: null, outboxAtRisk: false };
  }
  return {
    status: "corrupt",
    state: emptyState(),
    salvage: salvageState(raw),
    outboxAtRisk: outboxAtRisk(raw)
  };
}
function strictParse(raw) {
  if (!isRecord3(raw) || raw.version !== 1) return null;
  const cursor = raw.cursor;
  const outbox = raw.outbox;
  const locallyAuthored = raw.locallyAuthored;
  const deferred = raw.deferred;
  if (!Number.isSafeInteger(cursor) || cursor < 0 || !Array.isArray(outbox) || !Array.isArray(locallyAuthored) || !Array.isArray(deferred)) {
    return null;
  }
  if (!locallyAuthored.every((value) => typeof value === "string")) {
    return null;
  }
  const parsedDeferred = [];
  for (const entry of deferred) {
    const parsed = parseRemoteEvent(entry);
    if (parsed === null) return null;
    parsedDeferred.push(parsed);
  }
  const { parsedOutbox, quarantinedBadEnvelopes } = parseOutboxEntries(outbox);
  const pathOwners = parseStringMap(raw.pathOwners) ?? warnDegrade("pathOwners", {});
  const baseHashes = parseStringMap(raw.baseHashes) ?? warnDegrade("baseHashes", {});
  const baseContents = parseStringMap(raw.baseContents) ?? warnDegrade("baseContents", {});
  const conflictArtifacts = parseStringMap(raw.conflictArtifacts) ?? warnDegrade("conflictArtifacts", {});
  const quarantine = parseQuarantine(raw.quarantine) ?? warnDegrade("quarantine", []);
  const quarantinedEnvelopes = parseEnvelopeMap(raw.quarantinedEnvelopes) ?? warnDegrade("quarantinedEnvelopes", {});
  return {
    version: 1,
    cursor,
    outbox: parsedOutbox,
    locallyAuthored,
    deferred: parsedDeferred,
    // Merge the corrupt-envelope rows in so nothing is silently dropped.
    quarantine: [...quarantine, ...quarantinedBadEnvelopes],
    pathOwners,
    baseHashes,
    baseContents,
    conflictArtifacts,
    quarantinedEnvelopes
  };
}
function salvageState(raw) {
  if (!isRecord3(raw) || !Array.isArray(raw.outbox)) return null;
  const { parsedOutbox, quarantinedBadEnvelopes } = parseOutboxEntries(raw.outbox);
  const cursor = Number.isSafeInteger(raw.cursor) && raw.cursor >= 0 ? raw.cursor : 0;
  const locallyAuthored = Array.isArray(raw.locallyAuthored) && raw.locallyAuthored.every((value) => typeof value === "string") ? raw.locallyAuthored : [];
  const quarantine = parseQuarantine(raw.quarantine) ?? [];
  return {
    version: 1,
    cursor,
    outbox: parsedOutbox,
    locallyAuthored,
    deferred: salvageDeferred(raw.deferred),
    quarantine: [...quarantine, ...quarantinedBadEnvelopes],
    pathOwners: parseStringMap(raw.pathOwners) ?? {},
    baseHashes: parseStringMap(raw.baseHashes) ?? {},
    baseContents: parseStringMap(raw.baseContents) ?? {},
    conflictArtifacts: parseStringMap(raw.conflictArtifacts) ?? {},
    quarantinedEnvelopes: parseEnvelopeMap(raw.quarantinedEnvelopes) ?? {}
  };
}
function salvageDeferred(value) {
  if (!Array.isArray(value)) return [];
  const result = [];
  for (const entry of value) {
    const parsed = parseRemoteEvent(entry);
    if (parsed === null) return [];
    result.push(parsed);
  }
  return result;
}
function outboxAtRisk(raw) {
  if (!isRecord3(raw)) return false;
  const outbox = raw.outbox;
  if (outbox === void 0 || Array.isArray(outbox)) return false;
  return true;
}
function salvageHasOutboxEntriesMissingFrom(salvage, backupOutbox) {
  if (salvage === null || salvage.outbox.length === 0) return false;
  const backupIds = new Set(backupOutbox.map((entry) => entry.revisionId));
  return salvage.outbox.some((entry) => !backupIds.has(entry.revisionId));
}
function quarantineForCorruptEnvelope(entry, index) {
  const revisionId = isRecord3(entry) && typeof entry.revisionId === "string" ? entry.revisionId : `${CORRUPT_ENVELOPE_PREFIX}${index}`;
  const fileId = isRecord3(entry) && typeof entry.fileId === "string" ? entry.fileId : "";
  return { revisionId, fileId, reason: "corrupt-envelope" };
}
function warnDegrade(field, fallback) {
  console.warn(
    `Havemind: persisted "${field}" was malformed and was reset to its default; other sync state was preserved.`
  );
  return fallback;
}
function parseEnvelopeMap(value) {
  if (value === void 0) return {};
  if (!isRecord3(value)) return null;
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    const parsed = parseEnvelope(entry);
    if (parsed === null) return null;
    result[key] = parsed;
  }
  return result;
}
function parseQuarantine(value) {
  if (value === void 0) return [];
  if (!Array.isArray(value)) return null;
  const result = [];
  for (const entry of value) {
    if (!isRecord3(entry) || typeof entry.revisionId !== "string" || typeof entry.fileId !== "string" || typeof entry.reason !== "string") {
      return null;
    }
    result.push({
      revisionId: entry.revisionId,
      fileId: entry.fileId,
      reason: entry.reason
    });
  }
  return result;
}
function parseStringMap(value) {
  if (value === void 0) return {};
  if (!isRecord3(value)) return null;
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== "string") return null;
    result[key] = entry;
  }
  return result;
}
function parseEnvelope(value) {
  if (!isRecord3(value)) return null;
  if (typeof value.operationId !== "string" || typeof value.revisionId !== "string" || typeof value.fileId !== "string" || typeof value.contentHash !== "string" || typeof value.idempotencyKey !== "string" || typeof value.payloadBase64 !== "string") {
    return null;
  }
  return {
    operationId: value.operationId,
    revisionId: value.revisionId,
    fileId: value.fileId,
    contentHash: value.contentHash,
    idempotencyKey: value.idempotencyKey,
    payloadBase64: value.payloadBase64,
    header: value.header,
    // Preserve the enqueue time across a restart (SND-01); a non-number degrades
    // to "unstamped" so `outboxAges` treats it as old rather than throwing.
    ...typeof value.enqueuedAt === "number" ? { enqueuedAt: value.enqueuedAt } : {},
    // Arch P1: carry the externalized marker so load-time reconciliation knows
    // to rehydrate the payload from the store (an empty inline `payloadBase64` is
    // otherwise indistinguishable from a genuinely 0-byte payload).
    ...value.payloadExternalized === true ? { payloadExternalized: true } : {}
  };
}
function parseRemoteEvent(value) {
  if (!isRecord3(value) || !Number.isSafeInteger(value.serverSequence)) {
    return null;
  }
  const revision = value.revision;
  if (!isRecord3(revision) || typeof revision.revisionId !== "string" || typeof revision.fileId !== "string" || typeof revision.contentHash !== "string") {
    return null;
  }
  return {
    serverSequence: value.serverSequence,
    revision: {
      revisionId: revision.revisionId,
      fileId: revision.fileId,
      contentHash: revision.contentHash
    }
  };
}
function isRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/conflict-resolution.ts
var CONFLICT_FOLDER = "Havemind Conflicts";
var UUID = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
var LEGACY_UUID_RE = new RegExp(`^${UUID}-${UUID}$`);
var NEW_SUFFIX_RE = / \(conflict (.+) (\d{4}-\d{2}-\d{2} \d{4})\)$/;
function splitExtension(name) {
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return { base: name, extension: "" };
  return { base: name.slice(0, dot), extension: name.slice(dot + 1) };
}
function parseConflictCopyName(name) {
  const { base, extension } = splitExtension(name);
  const isBinary = extension.toLowerCase() !== "md";
  const match = NEW_SUFFIX_RE.exec(base);
  if (match) {
    const noteBasename2 = base.slice(0, base.length - match[0].length);
    if (noteBasename2.length === 0) return null;
    return {
      kind: "new",
      extension,
      isBinary,
      noteBasename: noteBasename2,
      author: match[1] ?? null,
      timestamp: match[2] ?? null
    };
  }
  if (LEGACY_UUID_RE.test(base)) {
    return {
      kind: "legacy",
      extension,
      isBinary,
      noteBasename: null,
      author: null,
      timestamp: null
    };
  }
  return null;
}
var MANUAL_HINT = "Target unknown \u2014 open files manually.";
function listConflictCopies(port) {
  const notes = port.listNoteFiles();
  const copies = [];
  for (const file2 of port.listConflictFiles()) {
    const parsed = parseConflictCopyName(file2.name);
    if (parsed === null) continue;
    if (parsed.kind === "legacy") {
      copies.push({
        copyPath: file2.path,
        copyName: file2.name,
        kind: "legacy",
        noteName: null,
        author: null,
        timestamp: null,
        isBinary: parsed.isBinary,
        targetPath: null,
        targetKnown: false,
        manualHint: MANUAL_HINT
      });
      continue;
    }
    const targetLeaf = `${parsed.noteBasename}.${parsed.extension}`;
    const candidates = notes.filter((note) => note.name === targetLeaf);
    const unique = candidates.length === 1 ? candidates[0] : void 0;
    copies.push({
      copyPath: file2.path,
      copyName: file2.name,
      kind: "new",
      noteName: parsed.noteBasename,
      author: parsed.author,
      timestamp: parsed.timestamp,
      isBinary: parsed.isBinary,
      targetPath: unique?.path ?? null,
      targetKnown: unique !== void 0,
      manualHint: unique !== void 0 ? null : MANUAL_HINT
    });
  }
  copies.sort((a, b) => a.copyName.localeCompare(b.copyName));
  return copies;
}
function toLines(text) {
  return text.replace(/\r\n/g, "\n").split("\n");
}
function computeLineDiff(mine, theirs) {
  const a = toLines(mine);
  const b = toLines(theirs);
  const n = a.length;
  const m = b.length;
  const width = m + 1;
  const lcs = new Int32Array((n + 1) * width);
  const get = (idx) => lcs[idx] ?? 0;
  for (let i2 = n - 1; i2 >= 0; i2--) {
    for (let j2 = m - 1; j2 >= 0; j2--) {
      lcs[i2 * width + j2] = a[i2] === b[j2] ? get((i2 + 1) * width + (j2 + 1)) + 1 : Math.max(get((i2 + 1) * width + j2), get(i2 * width + (j2 + 1)));
    }
  }
  const diff = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    const ai = a[i] ?? "";
    const bj = b[j] ?? "";
    if (ai === bj) {
      diff.push({ type: "context", text: ai });
      i++;
      j++;
    } else if (get((i + 1) * width + j) >= get(i * width + (j + 1))) {
      diff.push({ type: "removed", text: ai });
      i++;
    } else {
      diff.push({ type: "added", text: bj });
      j++;
    }
  }
  while (i < n) diff.push({ type: "removed", text: a[i++] ?? "" });
  while (j < m) diff.push({ type: "added", text: b[j++] ?? "" });
  return diff;
}
function createConflictResolver(port) {
  const settled = /* @__PURE__ */ new Set();
  return {
    async resolve(copy, action) {
      if (settled.has(copy.copyPath)) return "ignored";
      settled.add(copy.copyPath);
      switch (action) {
        case "keepMine":
          await port.deleteFile(copy.copyPath);
          break;
        case "keepTheirs": {
          if (copy.targetPath === null) {
            await port.deleteFile(copy.copyPath);
            break;
          }
          if (!await port.exists(copy.copyPath)) {
            return "vanished";
          }
          const content = await port.readText(copy.copyPath);
          if (content === null) {
            return "vanished";
          }
          await port.writeText(copy.targetPath, content);
          await port.deleteFile(copy.copyPath);
          break;
        }
        case "keepBoth":
          break;
      }
      return "resolved";
    }
  };
}
function createObsidianConflictPort(vault) {
  const inReservedFolder = (path) => path === CONFLICT_FOLDER || path.startsWith(`${CONFLICT_FOLDER}/`);
  const allFiles = () => {
    if (typeof vault.getFiles !== "function") return [];
    return vault.getFiles().map((file2) => ({ path: file2.path, name: file2.name }));
  };
  return {
    listConflictFiles: () => allFiles().filter((file2) => inReservedFolder(file2.path)),
    listNoteFiles: () => allFiles().filter((file2) => !inReservedFolder(file2.path)),
    exists: async (path) => vault.getAbstractFileByPath(path) !== null,
    readText: async (path) => {
      const file2 = vault.getAbstractFileByPath(path);
      if (file2 === null) return null;
      return vault.read(file2);
    },
    writeText: async (path, content) => {
      const file2 = vault.getAbstractFileByPath(path);
      if (file2 === null) return;
      await vault.modify(file2, content);
    },
    deleteFile: async (path) => {
      const file2 = vault.getAbstractFileByPath(path);
      if (file2 === null) return;
      await vault.delete(file2);
    }
  };
}

// src/runtime/send-queue-status.ts
var DEFAULT_STALE_THRESHOLD_MS = 3e4;
function buildSendQueueStatus(input) {
  const threshold = input.staleThresholdMs ?? DEFAULT_STALE_THRESHOLD_MS;
  const waitingCount = input.outbox.filter(
    (entry) => input.now - entry.enqueuedAt >= threshold
  ).length;
  const failed = input.quarantine.map((entry) => ({
    revisionId: entry.revisionId,
    label: entry.path !== void 0 && entry.path.length > 0 ? entry.path : entry.fileId.length > 0 ? entry.fileId : "Unknown change",
    reason: entry.reason
  }));
  return { waitingCount, failed };
}
function selectNewlyQuarantined(known, quarantine) {
  const fresh = quarantine.filter((entry) => !known.has(entry.revisionId));
  const next = new Set(known);
  for (const entry of quarantine) next.add(entry.revisionId);
  return { fresh, next };
}

// src/runtime/conflict-sweep.ts
async function sweepConflictCopies(deps) {
  const merge2 = deps.merge ?? mergeText;
  let resolved = 0;
  for (const copy of listConflictCopies(deps.port)) {
    if (copy.kind === "legacy" || copy.isBinary || !copy.targetKnown) continue;
    const targetPath = copy.targetPath;
    if (targetPath === null) continue;
    try {
      const fileId = deps.fileIdAtPath(targetPath);
      if (fileId === null) continue;
      const ancestor = deps.baseContentFor(fileId);
      if (ancestor === null) continue;
      const baseHash = deps.baseHashFor(fileId);
      if (baseHash === null || await deps.hashContent(ancestor) !== baseHash) {
        continue;
      }
      const [mine, theirs] = await Promise.all([
        deps.port.readText(targetPath),
        deps.port.readText(copy.copyPath)
      ]);
      if (mine === null || theirs === null) continue;
      const result = merge2(ancestor, mine, theirs);
      if (result.status !== "merged") continue;
      await deps.port.writeText(targetPath, result.text);
      await deps.port.deleteFile(copy.copyPath);
      resolved += 1;
    } catch {
      continue;
    }
  }
  if (resolved > 0) {
    deps.notify(`Auto-resolved ${resolved} conflict(s)`);
  }
  return resolved;
}

// src/runtime/plugin-data-mutex.ts
function isRecord4(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var PluginDataMutex = class {
  constructor(access) {
    __publicField(this, "access");
    __publicField(this, "queue", Promise.resolve());
    this.access = access;
  }
  /** The current on-disk blob (an empty record when absent/malformed). */
  load() {
    return this.enqueue(async () => {
      const data = await this.access.loadData();
      return isRecord4(data) ? data : {};
    });
  }
  /**
   * Atomically read-modify-write the whole blob: `mutator` receives the LATEST
   * on-disk snapshot (read inside the critical section) and returns the blob to
   * persist. Runs strictly after every previously-enqueued operation.
   */
  update(mutator) {
    return this.enqueue(async () => {
      const data = await this.access.loadData();
      const base = isRecord4(data) ? data : {};
      await this.access.saveData(mutator(base));
    });
  }
  enqueue(task) {
    const run = this.queue.then(task, task);
    this.queue = run.then(
      () => void 0,
      () => void 0
    );
    return run;
  }
};
function createSerializedDataPort(mutex) {
  let lastLoaded = {};
  return {
    async load() {
      lastLoaded = await mutex.load();
      return lastLoaded;
    },
    async save(data) {
      const loadedAtSave = lastLoaded;
      await mutex.update((disk) => {
        const next = { ...disk };
        for (const key of Object.keys(data)) {
          if (data[key] !== loadedAtSave[key]) {
            next[key] = data[key];
          }
        }
        return next;
      });
    }
  };
}
var mutexes = /* @__PURE__ */ new WeakMap();
function getPluginDataMutex(access) {
  const existing = mutexes.get(access);
  if (existing !== void 0) return existing;
  const created = new PluginDataMutex(access);
  mutexes.set(access, created);
  return created;
}

// src/runtime/rerun-guard.ts
var RerunGuard = class {
  constructor(runOnce) {
    __publicField(this, "runOnce");
    __publicField(this, "running", false);
    __publicField(this, "pending", false);
    this.runOnce = runOnce;
  }
  /**
   * Run the task. If it is already running, mark a re-run and return; the
   * in-flight pass loops once more when it finishes. Resolves when no further
   * re-run is pending.
   */
  async trigger() {
    if (this.running) {
      this.pending = true;
      return;
    }
    this.running = true;
    try {
      do {
        this.pending = false;
        await this.runOnce();
      } while (this.pending);
    } finally {
      this.running = false;
    }
  }
};

// src/activity/activity.ts
var ActivityError = class extends Error {
  constructor(code, message, cause) {
    super(message, cause === void 0 ? void 0 : { cause });
    __publicField(this, "code", code);
    __publicField(this, "name", "ActivityError");
  }
};
function actorLabel(actor) {
  return actor.kind === "initial-import" ? "Initial import" : actor.displayName;
}
function buildActivityFeed(records) {
  return records.map(
    (record2) => ({
      revisionId: record2.revisionId,
      fileId: record2.fileId,
      path: record2.path,
      kind: record2.kind,
      actorLabel: actorLabel(record2.actor),
      actorId: record2.actor.kind === "author" ? record2.actor.actorId : null,
      timestamp: record2.timestamp,
      canRestore: record2.content !== null
    })
  ).sort((left, right) => {
    if (left.timestamp !== right.timestamp) {
      return right.timestamp - left.timestamp;
    }
    return left.revisionId < right.revisionId ? 1 : -1;
  });
}
function buildHistoryDag(history) {
  const dag = new RevisionDag();
  for (const record2 of history) {
    dag.add(toRevisionNode(record2));
  }
  return dag;
}
function toRevisionNode(record2) {
  return {
    revisionId: record2.revisionId,
    vaultId: record2.vaultId,
    fileId: record2.fileId,
    parentRevisionIds: [...record2.parentRevisionIds],
    blobHash: record2.blobHash
  };
}
function headSnapshot(head) {
  if (head.content === null) {
    return { revisionId: head.revisionId, content: "", provenance: [] };
  }
  return {
    revisionId: head.revisionId,
    content: head.content,
    provenance: head.provenance
  };
}
function restoreRevision(options) {
  const { history, targetRevisionId, restorer, now, newRevisionId, hashContent } = options;
  const target = history.find(
    (record3) => record3.revisionId === targetRevisionId
  );
  if (target === void 0) {
    throw new ActivityError(
      "UNKNOWN_TARGET",
      `Cannot restore unknown target revision ${targetRevisionId}.`
    );
  }
  if (target.content === null) {
    throw new ActivityError(
      "DELETED_TARGET",
      `Cannot restore the content of a deleted revision ${targetRevisionId}.`
    );
  }
  const dag = buildHistoryDag(history);
  const heads = dag.getHeads(target.vaultId, target.fileId);
  if (heads.length !== 1) {
    throw new ActivityError(
      "UNRECONCILED_HISTORY",
      `Restore requires a single reconciled head, found ${heads.length}.`
    );
  }
  const headId = heads[0];
  const head = history.find((record3) => record3.revisionId === headId);
  if (head === void 0) {
    throw new ActivityError(
      "UNRECONCILED_HISTORY",
      `The current head ${headId} is missing from history.`
    );
  }
  const parent = headSnapshot(head);
  const recipe = generateEditRecipe(parent, target.content);
  const reconstructed = reconstructFromRecipe(recipe, [parent], newRevisionId);
  const revision = {
    revisionId: newRevisionId,
    vaultId: target.vaultId,
    fileId: target.fileId,
    parentRevisionIds: [headId],
    blobHash: hashContent(target.content)
  };
  try {
    dag.add(revision);
  } catch (error51) {
    if (error51 instanceof RevisionDagError) {
      throw new ActivityError(
        "APPEND_ONLY_VIOLATION",
        `Restore would break the append-only history: ${error51.message}`,
        error51
      );
    }
    throw error51;
  }
  const record2 = {
    revisionId: newRevisionId,
    vaultId: target.vaultId,
    fileId: target.fileId,
    path: head.path,
    previousPath: null,
    kind: "edit",
    actor: {
      kind: "author",
      actorId: restorer.actorId,
      displayName: restorer.displayName
    },
    timestamp: now,
    content: reconstructed.content,
    blobHash: revision.blobHash,
    parentRevisionIds: [headId],
    provenance: reconstructed.provenance,
    restoredFromRevisionId: target.revisionId
  };
  return {
    revision,
    record: record2,
    recipe,
    reconstructedContent: reconstructed.content
  };
}

// src/runtime/activity-restore.ts
function restoreActivityEntry(options) {
  try {
    const result = restoreRevision({
      history: options.history,
      targetRevisionId: options.targetRevisionId,
      restorer: options.restorer,
      now: options.now,
      newRevisionId: options.newRevisionId,
      // Non-cryptographic: this hash only feeds the in-memory Activity DAG's
      // append validation for this restore call — never the server, never
      // durable sync state, never a security boundary.
      hashContent: nonCryptoHash
    });
    return {
      revisionId: result.record.revisionId,
      fileId: result.record.fileId,
      path: result.record.path,
      kind: result.record.kind,
      author: { kind: "member", membershipId: options.restorer.actorId },
      timestamp: result.record.timestamp,
      hasContent: result.record.content !== null
    };
  } catch (error51) {
    if (error51 instanceof ActivityError) return null;
    throw error51;
  }
}
function nonCryptoHash(content) {
  let hash2 = 0;
  for (let index = 0; index < content.length; index += 1) {
    hash2 = hash2 * 31 + content.charCodeAt(index) | 0;
  }
  return hash2.toString(16);
}

// src/runtime/roster.ts
function upsertRosterMember(roster, member) {
  return [
    ...roster.filter((entry) => entry.membershipId !== member.membershipId),
    member
  ];
}
function removeRosterMember(roster, membershipId) {
  return roster.filter((entry) => entry.membershipId !== membershipId);
}
var ROSTER_KEY = "approvedMembersRoster";
function isRecord5(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseMember(value) {
  if (!isRecord5(value) || typeof value.membershipId !== "string" || typeof value.displayName !== "string" || value.role !== "owner" && value.role !== "editor" || typeof value.self !== "boolean") {
    return null;
  }
  return {
    membershipId: value.membershipId,
    displayName: value.displayName,
    role: value.role,
    self: value.self
  };
}
function parseRoster(raw) {
  const source = isRecord5(raw) ? raw[ROSTER_KEY] : null;
  if (!Array.isArray(source)) return [];
  const members = [];
  for (const entry of source) {
    const parsed = parseMember(entry);
    if (parsed !== null) {
      members.push(parsed);
    }
  }
  return members;
}
var RosterStore = class {
  constructor(options) {
    __publicField(this, "persist");
    this.persist = options.persist;
  }
  async readMembers() {
    return parseRoster(await this.persist.load());
  }
  /** Upserts a member (idempotent by membershipId) and persists the roster. */
  async recordMember(member) {
    const data = await this.persist.load();
    const base = isRecord5(data) ? data : {};
    const next = upsertRosterMember(parseRoster(data), member);
    await this.persist.save({ ...base, [ROSTER_KEY]: next });
    return next;
  }
  /**
   * Removes a member (idempotent by membershipId) and persists the roster.
   * Used when the owner permanently removes a member from the vault; the server
   * revocation is append-only, and here the owner's local presence list simply
   * drops the departed member.
   */
  async removeMember(membershipId) {
    const data = await this.persist.load();
    const base = isRecord5(data) ? data : {};
    const next = removeRosterMember(parseRoster(data), membershipId);
    await this.persist.save({ ...base, [ROSTER_KEY]: next });
    return next;
  }
};

// src/runtime/rejoin-roster.ts
function buildRejoinRosterView(members, deadMembershipIds = []) {
  const dead = new Set(deadMembershipIds);
  const rows = [...members].sort((left, right) => {
    if (left.role !== right.role) {
      return left.role === "owner" ? -1 : 1;
    }
    return left.displayName.localeCompare(right.displayName);
  }).map((member) => {
    const isDead = !member.self && dead.has(member.membershipId);
    return {
      colorToken: authorColorToken(member.membershipId),
      connected: !isDead,
      displayName: member.displayName,
      membershipId: member.membershipId,
      rejoinable: isDead,
      // Removal is state-independent: every non-self member can be removed,
      // connected or not. The owner's own row is never removable.
      removable: !member.self,
      role: member.role,
      self: member.self,
      statusLabel: isDead ? "disconnected" : "connected"
    };
  });
  return { empty: rows.length === 0, rows };
}

// src/runtime/rejoin.ts
var REJOIN_POLL_INTERVAL_MS = 3e4;
var RejoinRequestError = class extends Error {
  constructor(message, status) {
    super(message);
    __publicField(this, "name", "RejoinRequestError");
    __publicField(this, "status");
    this.status = status;
  }
};
async function requestRejoinGrant(options) {
  const token = await options.getAccessToken();
  const response = await options.requestUrl({
    url: `${options.apiBaseUrl}/owner/rejoin-grants`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    throw: false,
    body: JSON.stringify({ membershipId: options.membershipId })
  });
  if (response.status < 200 || response.status >= 300) {
    throw new RejoinRequestError(
      `Rejoin grant request failed with HTTP ${response.status}.`,
      response.status
    );
  }
  const body = response.json;
  const boundDeviceId = isRecord6(body) && typeof body.boundDeviceId === "string" ? body.boundDeviceId : "";
  return {
    boundDeviceId,
    membershipId: options.membershipId,
    status: "waiting"
  };
}
var RejoinController = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "state", "terminal-auth");
    this.options = options;
  }
  getState() {
    return this.state;
  }
  /**
   * Attempts a single redemption. Idempotent while in-flight: a concurrent call
   * during `rejoining`, or a call after success, is a no-op that returns the
   * current state rather than firing a second request.
   */
  async attempt() {
    if (this.state === "rejoining" || this.state === "syncing") {
      return this.state;
    }
    this.state = "rejoining";
    const refreshToken = this.options.generateRefreshToken();
    let response;
    try {
      response = await this.options.requestUrl({
        url: `${this.options.apiBaseUrl}/auth/rejoin`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        throw: false,
        body: JSON.stringify({
          deviceId: this.options.deviceId,
          initialRefreshTokenHash: this.options.hashRefreshToken(refreshToken),
          membershipId: this.options.membershipId,
          rejoinSecret: this.options.rejoinSecret
        })
      });
    } catch {
      this.state = "terminal-auth";
      return this.state;
    }
    if (response.status < 200 || response.status >= 300) {
      this.state = "terminal-auth";
      return this.state;
    }
    const body = response.json;
    if (!isRecord6(body) || typeof body.membershipId !== "string" || typeof body.vaultId !== "string") {
      this.state = "rejoin-failed";
      return this.state;
    }
    try {
      await this.options.saveRefreshToken(refreshToken);
    } catch {
      this.state = "rejoin-failed";
      return this.state;
    }
    this.state = "syncing";
    return {
      membershipId: body.membershipId,
      status: "syncing",
      vaultId: body.vaultId
    };
  }
};
function isRecord6(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/status.ts
var LABELS = {
  disconnected: "Disconnected",
  syncing: "Syncing",
  retrying: "Retrying\u2026",
  synced: "Synced",
  offline: "Offline",
  conflict: "Conflict",
  deferred: "Waiting to apply",
  "reconnect-required": "Reconnect required",
  "reset-required": "Reset required"
};
var RESET_REQUIRED_DETAIL = "The stored connection data is incomplete or unreadable. Reset the connection and pair this device again.";
var NO_E2EE_NOTE = "Private Tailscale network only \u2014 no end-to-end encryption.";
var DEFERRED_DETAIL = "A change waits for an open note to settle before applying.";
function connectionStatusFromCycle(status) {
  switch (status) {
    case "synced":
      return "synced";
    case "offline":
      return "offline";
    case "conflict":
      return "conflict";
    // A deferred apply wrote nothing and produced no conflict copy, so it gets
    // its own waiting state rather than the conflict warning.
    case "deferred":
      return "deferred";
    case "unauthenticated":
      return "reconnect-required";
  }
}
function formatStatusBar(input) {
  const text = `Havemind: ${LABELS[input.status]}`;
  const format = input.formatTimestamp ?? defaultFormatTimestamp2;
  const lastSync = input.lastSyncedAt === void 0 ? "Last sync: not yet." : `Last sync: ${format(input.lastSyncedAt)}.`;
  return { text, tooltip: `${text} \u2014 ${lastSync} ${NO_E2EE_NOTE}` };
}
var MONTH_ABBREVIATIONS = "JanFebMarAprMayJunJulAugSepOctNovDec";
function twoDigits(value) {
  return value < 10 ? `0${value}` : String(value);
}
function defaultFormatTimestamp2(timestamp, now = Date.now()) {
  const at = new Date(timestamp);
  const today = new Date(now);
  const clock = `${twoDigits(at.getHours())}:${twoDigits(at.getMinutes())}`;
  const sameDay = at.getFullYear() === today.getFullYear() && at.getMonth() === today.getMonth() && at.getDate() === today.getDate();
  if (sameDay) {
    return clock;
  }
  const monthStart = at.getMonth() * 3;
  const month = MONTH_ABBREVIATIONS.slice(monthStart, monthStart + 3);
  return `${at.getDate()} ${month}, ${clock}`;
}
var PANEL_STYLES = {
  disconnected: {
    icon: "circle",
    label: "Not connected",
    colorToken: "--text-muted",
    spin: false,
    showForm: true
  },
  syncing: {
    icon: "hexagon",
    label: "Syncing\u2026",
    colorToken: "--text-accent",
    spin: true,
    showForm: false
  },
  // A pending retry is not progress: it keeps the warning colour and its own
  // glyph so it is never mistaken for the accent-coloured Syncing state.
  retrying: {
    icon: "refresh-cw",
    label: "Retrying\u2026",
    colorToken: "--text-warning",
    spin: true,
    showForm: false
  },
  synced: {
    icon: "check-circle",
    label: "Connected \u2014 synced",
    colorToken: "--text-success",
    spin: false,
    showForm: false
  },
  offline: {
    icon: "cloud-off",
    label: "Offline \u2014 will retry",
    colorToken: "--text-warning",
    spin: false,
    showForm: false
  },
  conflict: {
    icon: "alert-triangle",
    label: "Conflict \u2014 see Havemind Conflicts",
    colorToken: "--text-warning",
    spin: false,
    showForm: false
  },
  // Nothing is wrong and nothing needs doing, so this is muted rather than a
  // warning — and it never mentions the Conflicts folder, which stays empty.
  deferred: {
    icon: "clock",
    label: "Waiting to apply",
    colorToken: "--text-muted",
    spin: false,
    showForm: false
  },
  "reconnect-required": {
    icon: "alert-triangle",
    label: "Reconnect required",
    colorToken: "--text-error",
    spin: false,
    showForm: true
  },
  // The paste form stays available alongside the Reset button: pairing this
  // device afresh overwrites the broken record and is an equally valid way out.
  "reset-required": {
    icon: "alert-triangle",
    label: "Connection data damaged",
    colorToken: "--text-error",
    spin: false,
    showForm: true
  }
};
function buildConnectionPanel(input) {
  const style = PANEL_STYLES[input.status];
  const format = input.formatTimestamp ?? defaultFormatTimestamp2;
  const parts = [];
  if (input.serverName !== void 0 && input.serverName.length > 0) {
    parts.push(`Server: ${input.serverName}`);
  }
  if (input.status === "synced" && input.lastSyncedAt !== void 0) {
    parts.push(`Last sync: ${format(input.lastSyncedAt)}`);
  }
  if (input.status === "reconnect-required" || input.status === "offline" || // A pending retry states its reason too, so the panel explains what went
  // wrong before the failures add up to Offline.
  input.status === "retrying") {
    parts.push(input.errorMessage ?? "The server refused the session.");
  }
  if (input.status === "deferred") {
    parts.push(DEFERRED_DETAIL);
  }
  if (input.status === "reset-required") {
    parts.push(input.errorMessage ?? RESET_REQUIRED_DETAIL);
  }
  parts.push(NO_E2EE_NOTE);
  return {
    status: input.status,
    icon: style.icon,
    label: style.label,
    colorToken: style.colorToken,
    spin: style.spin && input.reducedMotion !== true,
    showForm: style.showForm,
    detail: parts.join(" \xB7 ")
  };
}

// src/runtime/scheduler.ts
var SyncScheduler = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "disposers", []);
    __publicField(this, "running", false);
    __publicField(this, "intervalMs");
    __publicField(this, "intervalDisposer", null);
    __publicField(this, "fire", () => void 0);
    this.options = options;
    this.intervalMs = options.intervalMs;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.fire = () => {
      if (this.running) this.options.trigger();
    };
    this.fire();
    this.disposers.push(this.options.hooks.onFocus(this.fire));
    this.disposers.push(this.options.hooks.onOnline(this.fire));
    this.intervalDisposer = this.options.hooks.setInterval(
      this.fire,
      this.intervalMs
    );
  }
  /**
   * Re-arms the periodic timer at a new cadence, disposing the current interval
   * registration and re-registering at `ms`. Used to degrade the poll to a slow
   * heartbeat while a real-time push channel is connected and revert it when push
   * is down, without disturbing the focus/online triggers. A no-op (other than
   * remembering `ms` for the next `start()`) while stopped.
   */
  setIntervalMs(ms) {
    this.intervalMs = ms;
    if (!this.running) return;
    this.intervalDisposer?.();
    this.intervalDisposer = this.options.hooks.setInterval(this.fire, ms);
  }
  stop() {
    if (!this.running) return;
    this.running = false;
    this.intervalDisposer?.();
    this.intervalDisposer = null;
    for (const dispose of this.disposers.splice(0)) {
      dispose();
    }
  }
};

// src/runtime/adapters/config-apply.ts
var CSS_CONFIG_PREFIXES = [
  ".obsidian/snippets/",
  ".obsidian/themes/"
];
var CSS_CONFIG_EXACT = [".obsidian/appearance.json"];
function classifyConfigApplyEffect(path) {
  const normalized = path.replace(/\\/gu, "/");
  if (CSS_CONFIG_EXACT.includes(normalized)) return "css-reload";
  if (CSS_CONFIG_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return "css-reload";
  }
  return "reload-notice";
}
var CONFIG_RELOAD_NOTICE = "Havemind: settings synced \u2014 reload Obsidian to apply them.";
var CONFIG_APPLY_BATCH_MS = 250;
function createConfigApplyReloader(options) {
  const schedule = options.schedule ?? ((run, delayMs) => void window.setTimeout(run, delayMs));
  const warn = options.warn ?? ((message, error51) => {
    console.warn(message, error51);
  });
  const batchMs = options.batchMs ?? CONFIG_APPLY_BATCH_MS;
  let cssPending = false;
  let noticePending = false;
  let armed = false;
  const runGuarded = (label, effect) => {
    try {
      effect();
    } catch (error51) {
      warn(`Havemind: could not ${label} after a synced settings change.`, error51);
    }
  };
  const flush = () => {
    armed = false;
    const css = cssPending;
    const notice = noticePending;
    cssPending = false;
    noticePending = false;
    if (css) runGuarded("refresh the custom CSS", options.triggerCssChange);
    if (notice) {
      runGuarded(
        "show the reload notice",
        () => options.notify(CONFIG_RELOAD_NOTICE)
      );
    }
  };
  return {
    applied(path) {
      if (classifyConfigApplyEffect(path) === "css-reload") {
        cssPending = true;
      } else {
        noticePending = true;
      }
      if (armed) return;
      armed = true;
      schedule(flush, batchMs);
    }
  };
}

// src/runtime/adapters/request-url.ts
var import_obsidian2 = require("obsidian");
function createRequestUrlFn() {
  return async (options) => {
    const response = await (0, import_obsidian2.requestUrl)({
      url: options.url,
      method: options.method,
      throw: false,
      ...options.headers === void 0 ? {} : { headers: options.headers },
      ...options.body === void 0 ? {} : { body: options.body }
    });
    return {
      status: response.status,
      text: response.text,
      get json() {
        try {
          return response.json;
        } catch {
          return void 0;
        }
      }
    };
  };
}

// src/sync/config-normalize.ts
var GRAPH_SETTINGS_PATH = ".obsidian/graph.json";
var GRAPH_VOLATILE_KEYS = /* @__PURE__ */ new Set([
  "scale",
  "close",
  "collapse-filter",
  "collapse-color-groups",
  "collapse-display",
  "collapse-forces"
]);
var JSON_INDENT = 2;
function normalizeSeparators2(path) {
  return path.replace(/\\/gu, "/");
}
function hasVolatileConfigFields(path) {
  return normalizeSeparators2(path) === GRAPH_SETTINGS_PATH;
}
function parseConfigObject(text) {
  let parsed;
  try {
    parsed = JSON.parse(text.replace(/^\uFEFF/u, ""));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }
  return parsed;
}
function pickKeys(source, keep) {
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (keep(key)) result[key] = value;
  }
  return result;
}
function normalizeConfigContent(path, text) {
  if (!hasVolatileConfigFields(path)) return text;
  const parsed = parseConfigObject(text);
  if (parsed === null) return text;
  return JSON.stringify(
    pickKeys(parsed, (key) => !GRAPH_VOLATILE_KEYS.has(key)),
    null,
    JSON_INDENT
  );
}
function mergeConfigContent(path, localText, remoteText) {
  if (!hasVolatileConfigFields(path)) return remoteText;
  const remote = parseConfigObject(remoteText);
  if (remote === null) return remoteText;
  const local = localText === null ? null : parseConfigObject(localText);
  const localVolatile = local === null ? {} : pickKeys(local, (key) => GRAPH_VOLATILE_KEYS.has(key));
  const remoteSemantic = pickKeys(
    remote,
    (key) => !GRAPH_VOLATILE_KEYS.has(key)
  );
  return `${JSON.stringify({ ...localVolatile, ...remoteSemantic }, null, JSON_INDENT)}
`;
}

// src/obsidian/vault-adapter.ts
var RESERVED_TOP_LEVEL_DIRECTORIES = /* @__PURE__ */ new Set([CONFLICT_FOLDER]);
var SYNCABLE_BINARY_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg",
  "pdf"
];
var MAX_BINARY_FILE_BYTES = 25 * 1024 * 1024;
var LocalVaultError = class extends Error {
  constructor(code, message) {
    super(message);
    __publicField(this, "code", code);
    __publicField(this, "name", "LocalVaultError");
  }
};
function normalizeWirePath(path) {
  return path.replace(/\\/gu, "/").normalize("NFC");
}
function classifyVaultPath(path) {
  const canonicalPath = normalizeWirePath(path);
  const kind = eligibleKind(canonicalPath);
  if (kind === null) {
    return { eligible: false };
  }
  return {
    canonicalPath,
    collisionKey: canonicalPath.toLowerCase(),
    eligible: true,
    kind
  };
}
function pathExtension(canonicalPath) {
  const dot = canonicalPath.lastIndexOf(".");
  const slash = canonicalPath.lastIndexOf("/");
  if (dot <= slash + 1) return "";
  return canonicalPath.slice(dot + 1).toLowerCase();
}
var SYNCABLE_BINARY_EXTENSION_SET = new Set(
  SYNCABLE_BINARY_EXTENSIONS
);
var CONFIG_TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  "md",
  "json",
  "css",
  "js",
  "txt"
]);
function configContentKind(canonicalPath) {
  const extension = pathExtension(canonicalPath);
  if (SYNCABLE_BINARY_EXTENSION_SET.has(extension)) return "binary";
  if (CONFIG_TEXT_EXTENSIONS.has(extension)) return "markdown";
  return null;
}
function eligibleKind(canonicalPath) {
  if (isSyncableConfigPath(canonicalPath)) {
    return configContentKind(canonicalPath);
  }
  const extension = pathExtension(canonicalPath);
  const kind = extension === "md" ? "markdown" : SYNCABLE_BINARY_EXTENSION_SET.has(extension) ? "binary" : null;
  if (kind === null) {
    return null;
  }
  const segments = canonicalPath.split("/");
  if (segments.some((segment) => segment === "" || segment.startsWith("."))) {
    return null;
  }
  const [top] = segments;
  if (top === void 0 || RESERVED_TOP_LEVEL_DIRECTORIES.has(top)) {
    return null;
  }
  return kind;
}
var VaultChangeObserver = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "tail", Promise.resolve());
    this.options = options;
  }
  async observeCreate(path) {
    return this.enqueue(() => this.handleCreate(path));
  }
  async observeModify(path) {
    return this.enqueue(() => this.handleModify(path));
  }
  async observeRename(previousPath, nextPath) {
    return this.enqueue(() => this.handleRename(previousPath, nextPath));
  }
  async observeDelete(path) {
    return this.enqueue(() => this.handleDelete(path));
  }
  /**
   * Handles a folder-level rename (Obsidian or another plugin moving a whole
   * folder). Defence-in-depth: it does NOT assume Obsidian emits a per-child
   * TFile rename for every note. It enumerates the mappings under the folder's
   * OLD path prefix and routes each through the existing per-file rename
   * machinery so heads/base state stay consistent. If a per-child event ALSO
   * fires later, that child is already at its new path and dedupes to a no-op
   * (see `handleRename`), so no child is double-processed. Returns the genuine
   * per-child operations (empty when nothing was under the folder).
   */
  async observeFolderRename(previousFolderPath, nextFolderPath) {
    return this.enqueue(
      () => this.handleFolderRename(previousFolderPath, nextFolderPath)
    );
  }
  /**
   * Handles a folder-level delete by enumerating the mappings under the deleted
   * folder's prefix and routing each through the existing per-file delete path
   * (tombstoning each note). Idempotent with any per-child TFile delete events.
   */
  async observeFolderDelete(folderPath) {
    return this.enqueue(() => this.handleFolderDelete(folderPath));
  }
  enqueue(task) {
    const run = this.tail.then(task, task);
    this.tail = run.then(noop, noop);
    return run;
  }
  async handleCreate(path) {
    const classified = classifyVaultPath(path);
    if (!classified.eligible) return null;
    const existing = await this.findMapping(classified.collisionKey);
    if (existing !== void 0) {
      return this.commitModify(path, classified, existing);
    }
    return this.commitCreate(path, classified);
  }
  /**
   * Resolves the on-disk path to read from, canonical-first (FINDING 3). The
   * canonical (forward-slash, NFC) form matches Obsidian's own path index, so it
   * is tried first; the caller's original path is a belt-and-braces fallback for
   * an exotic filesystem where only the raw form resolves. Returns `null` when
   * NEITHER variant exists on disk — a genuine miss. Reading via the original
   * (possibly backslash) path alone would miss on real Obsidian and either drop a
   * live edit or read '' and push a phantom empty file over the peer's copy.
   */
  async resolveReadPath(canonicalPath, originalPath) {
    if (await this.options.vault.exists(canonicalPath)) return canonicalPath;
    if (originalPath !== canonicalPath && await this.options.vault.exists(originalPath)) {
      return originalPath;
    }
    return null;
  }
  /**
   * Reads a file's content and content hash according to its sync kind: markdown
   * is canonicalised text hashed with SHA-256; a binary attachment is read as raw
   * bytes, carried as base64 in `content`, and hashed over the RAW bytes
   * (`hashBlob`) — never a canonicalised form (F9). The read uses the canonical
   * path first, falling back to the original (FINDING 3). Returns `null` when the
   * file resolves at neither path (a genuine miss — never push a phantom '') or
   * when a binary file is over {@link MAX_BINARY_FILE_BYTES} (excluded, not an
   * error).
   */
  async readContentForKind(canonicalPath, originalPath, kind) {
    const readPath = await this.resolveReadPath(canonicalPath, originalPath);
    if (readPath === null) return null;
    if (kind === "binary") {
      const bytes = await this.options.vault.readBinary(readPath);
      if (bytes.byteLength > MAX_BINARY_FILE_BYTES) return null;
      return { content: bytesToBase642(bytes), contentHash: await hashBlob(bytes) };
    }
    const content = normalizeContent(
      normalizeConfigContent(canonicalPath, await this.options.vault.readText(readPath))
    );
    return { content, contentHash: await sha256Hex2(content) };
  }
  async commitCreate(readPath, classified) {
    const read = await this.readContentForKind(
      classified.canonicalPath,
      readPath,
      classified.kind
    );
    if (read === null) return null;
    const { content, contentHash } = read;
    const fileId = this.options.generateFileId();
    const operation = this.buildOperation({
      content,
      contentHash,
      contentKind: classified.kind,
      fileId,
      kind: "create",
      path: classified.canonicalPath,
      previousContent: null,
      previousContentHash: null,
      previousPath: null
    });
    const revisionId = await this.options.repository.commitLocalChange({
      operation,
      removeFileId: null,
      upsertMapping: {
        collisionKey: classified.collisionKey,
        content,
        contentHash,
        contentKind: classified.kind,
        fileId,
        path: classified.canonicalPath
      }
    });
    return { ...operation, revisionId };
  }
  async handleModify(path) {
    const classified = classifyVaultPath(path);
    if (!classified.eligible) return null;
    const mapping = await this.findMapping(classified.collisionKey);
    if (mapping === void 0) {
      return this.commitCreate(path, classified);
    }
    return this.commitModify(path, classified, mapping);
  }
  async commitModify(readPath, classified, mapping) {
    const read = await this.readContentForKind(
      classified.canonicalPath,
      readPath,
      classified.kind
    );
    if (read === null) return null;
    const { content, contentHash } = read;
    if (contentHash === mapping.contentHash) return null;
    const operation = this.buildOperation({
      content,
      contentHash,
      contentKind: classified.kind,
      fileId: mapping.fileId,
      kind: "update",
      path: classified.canonicalPath,
      previousContent: mapping.content,
      previousContentHash: mapping.contentHash,
      previousPath: null
    });
    const revisionId = await this.options.repository.commitLocalChange({
      operation,
      removeFileId: null,
      upsertMapping: {
        collisionKey: classified.collisionKey,
        content,
        contentHash,
        contentKind: classified.kind,
        fileId: mapping.fileId,
        path: classified.canonicalPath
      }
    });
    return { ...operation, revisionId };
  }
  async handleRename(previousPath, nextPath) {
    const from = classifyVaultPath(previousPath);
    const to = classifyVaultPath(nextPath);
    if (!from.eligible) {
      return to.eligible ? this.commitCreate(nextPath, to) : null;
    }
    if (!to.eligible) {
      return this.commitDelete(from.collisionKey);
    }
    const mapping = await this.findMapping(from.collisionKey);
    if (mapping === void 0) {
      return this.handleCreate(nextPath);
    }
    const occupant = await this.findMapping(to.collisionKey);
    if (occupant !== void 0 && occupant.fileId !== mapping.fileId) {
      throw new LocalVaultError(
        "path-collision",
        `A different file already occupies ${to.canonicalPath}.`
      );
    }
    const read = await this.readContentForKind(
      to.canonicalPath,
      nextPath,
      to.kind
    );
    if (read === null) return null;
    const { content, contentHash } = read;
    const operation = this.buildOperation({
      content,
      contentHash,
      contentKind: to.kind,
      fileId: mapping.fileId,
      kind: "rename",
      path: to.canonicalPath,
      previousContent: mapping.content,
      previousContentHash: mapping.contentHash,
      previousPath: from.canonicalPath
    });
    const revisionId = await this.options.repository.commitLocalChange({
      operation,
      removeFileId: null,
      upsertMapping: {
        collisionKey: to.collisionKey,
        content,
        contentHash,
        contentKind: to.kind,
        fileId: mapping.fileId,
        path: to.canonicalPath
      }
    });
    return { ...operation, revisionId };
  }
  async handleDelete(path) {
    const classified = classifyVaultPath(path);
    if (!classified.eligible) return null;
    return this.commitDelete(classified.collisionKey);
  }
  async handleFolderRename(previousFolderPath, nextFolderPath) {
    const fromPrefix = normalizeWirePath(previousFolderPath);
    const toPrefix = normalizeWirePath(nextFolderPath);
    const results = [];
    for (const mapping of await this.options.repository.listMappings()) {
      const suffix = pathUnderFolder(mapping.path, fromPrefix);
      if (suffix === null) continue;
      const op = await this.handleRename(mapping.path, `${toPrefix}${suffix}`);
      if (op !== null) results.push(op);
    }
    return results;
  }
  async handleFolderDelete(folderPath) {
    const prefix = normalizeWirePath(folderPath);
    const results = [];
    for (const mapping of await this.options.repository.listMappings()) {
      if (pathUnderFolder(mapping.path, prefix) === null) continue;
      const op = await this.handleDelete(mapping.path);
      if (op !== null) results.push(op);
    }
    return results;
  }
  async commitDelete(collisionKey) {
    const mapping = await this.findMapping(collisionKey);
    if (mapping === void 0) return null;
    const operation = this.buildOperation({
      content: null,
      contentHash: null,
      ...mapping.contentKind === void 0 ? {} : { contentKind: mapping.contentKind },
      fileId: mapping.fileId,
      kind: "delete",
      path: mapping.path,
      previousContent: mapping.content,
      previousContentHash: mapping.contentHash,
      previousPath: null
    });
    const revisionId = await this.options.repository.commitLocalChange({
      operation,
      removeFileId: mapping.fileId,
      upsertMapping: null
    });
    return { ...operation, revisionId };
  }
  async findMapping(collisionKey) {
    const mappings = await this.options.repository.listMappings();
    return mappings.find((mapping) => mapping.collisionKey === collisionKey);
  }
  buildOperation(fields) {
    return {
      ...fields,
      observedAt: this.options.clock(),
      operationId: this.options.generateOperationId(),
      // Unknown until the repository commits the change and reports back the
      // real id it enqueued; the caller fills this in on the returned object.
      revisionId: null
    };
  }
};
function normalizeContent(text) {
  return canonicalizeMarkdown(text);
}
function pathUnderFolder(path, folderPrefix) {
  const prefix = `${folderPrefix}/`;
  return path.startsWith(prefix) ? path.slice(folderPrefix.length) : null;
}
function bytesToBase642(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
async function sha256Hex2(text) {
  const data = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function noop() {
  return void 0;
}

// src/runtime/canonicalization-rebase.ts
var CANONICALIZATION_REBASE_VERSION = 1;
var BINARY_EXTENSION_SET = new Set(SYNCABLE_BINARY_EXTENSIONS);
function mappingIsBinary(mapping) {
  return mapping.contentKind === "binary" || BINARY_EXTENSION_SET.has(pathExtension(mapping.path));
}
function isRecord7(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readMapping(entry) {
  if (!isRecord7(entry) || typeof entry.collisionKey !== "string" || typeof entry.content !== "string" || typeof entry.contentHash !== "string" || typeof entry.fileId !== "string" || typeof entry.path !== "string") {
    return null;
  }
  return {
    collisionKey: entry.collisionKey,
    content: entry.content,
    contentHash: entry.contentHash,
    ...typeof entry.contentKind === "string" ? { contentKind: entry.contentKind } : {},
    fileId: entry.fileId,
    path: entry.path
  };
}
async function rebaseCanonicalizedHashes(deps) {
  const targetVersion = deps.targetVersion ?? CANONICALIZATION_REBASE_VERSION;
  const raw = await deps.data.load();
  const data = isRecord7(raw) ? raw : {};
  const marker = data[deps.keys.markerKey];
  if (typeof marker === "number" && marker >= targetVersion) {
    return { ran: false, mappingsRebased: 0, baseHashesRebased: 0, missingFiles: 0 };
  }
  let mappingsRebased = 0;
  let baseHashesRebased = 0;
  let missingFiles = 0;
  const pathByFileId = /* @__PURE__ */ new Map();
  const binaryFileIds = /* @__PURE__ */ new Set();
  const producer = data[deps.keys.producerKey];
  let nextProducer;
  if (isRecord7(producer) && Array.isArray(producer.mappings)) {
    const nextMappings2 = [];
    for (const entry of producer.mappings) {
      const mapping = readMapping(entry);
      if (mapping === null) {
        nextMappings2.push(entry);
        continue;
      }
      pathByFileId.set(mapping.fileId, mapping.path);
      if (mappingIsBinary(mapping)) {
        binaryFileIds.add(mapping.fileId);
        nextMappings2.push(entry);
        continue;
      }
      if (!deps.vault.exists(mapping.path)) {
        missingFiles += 1;
        nextMappings2.push(entry);
        continue;
      }
      const canonical = deps.canonicalize(await deps.vault.read(mapping.path));
      const contentHash = await deps.hash(canonical);
      nextMappings2.push({ ...mapping, content: canonical, contentHash });
      mappingsRebased += 1;
    }
    nextProducer = { ...producer, mappings: nextMappings2 };
  }
  const persist = data[deps.keys.persistKey];
  let nextPersist;
  if (isRecord7(persist) && isRecord7(persist.baseHashes)) {
    if (isRecord7(persist.pathOwners)) {
      for (const [ownerPath, ownerFileId] of Object.entries(persist.pathOwners)) {
        if (typeof ownerFileId === "string" && !pathByFileId.has(ownerFileId)) {
          pathByFileId.set(ownerFileId, ownerPath);
        }
      }
    }
    const nextBaseHashes = {};
    for (const [fileId, hash2] of Object.entries(persist.baseHashes)) {
      if (binaryFileIds.has(fileId)) {
        nextBaseHashes[fileId] = hash2;
        continue;
      }
      const path = pathByFileId.get(fileId);
      if (typeof hash2 !== "string" || path === void 0 || !deps.vault.exists(path)) {
        if (typeof hash2 === "string" && (path === void 0 || !deps.vault.exists(path))) {
          missingFiles += 1;
        }
        nextBaseHashes[fileId] = hash2;
        continue;
      }
      const canonical = deps.canonicalize(await deps.vault.read(path));
      nextBaseHashes[fileId] = await deps.hash(canonical);
      baseHashesRebased += 1;
    }
    nextPersist = { ...persist, baseHashes: nextBaseHashes };
  }
  await deps.data.save({
    ...data,
    ...nextProducer === void 0 ? {} : { [deps.keys.producerKey]: nextProducer },
    ...nextPersist === void 0 ? {} : { [deps.keys.persistKey]: nextPersist },
    [deps.keys.markerKey]: targetVersion
  });
  return { ran: true, mappingsRebased, baseHashesRebased, missingFiles };
}

// src/storage/client-store.ts
var CLIENT_STORE_NAMES = [
  "activity",
  "connection",
  "cursors",
  "deferred-applies",
  "file-mappings",
  "heads",
  "inbox",
  "outbox",
  // Arch P1: out-of-band store for large outbox payload bytes, keyed by
  // revisionId. Keeps a 25 MB attachment out of the per-plugin `data.json`,
  // which is re-serialised on every cursor save.
  "payloads",
  "provenance"
];
var CLIENT_STORE_VERSION = 2;
var CLIENT_DATABASE_PREFIX = "havemind-client-";
var CLIENT_INSTANCE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var ClientStoreError = class extends Error {
  constructor(code, message, cause) {
    super(message, cause === void 0 ? void 0 : { cause });
    __publicField(this, "code", code);
    __publicField(this, "name", "ClientStoreError");
  }
};
async function ensureClientInstanceId(repository, generateId = generateClientInstanceId) {
  const existingId = await repository.readClientInstanceId();
  if (existingId !== null) {
    assertClientInstanceId(existingId);
    return existingId;
  }
  const generatedId = generateId();
  assertClientInstanceId(generatedId);
  await repository.writeClientInstanceId(generatedId);
  return generatedId;
}
function isValidClientInstanceId(value) {
  return value.length >= 16 && value.length <= 64 && CLIENT_INSTANCE_ID_PATTERN.test(value);
}
var IndexedDbClientStore = class {
  constructor(options) {
    __publicField(this, "databaseName");
    __publicField(this, "database", null);
    __publicField(this, "indexedDB");
    __publicField(this, "openAttempt", 0);
    __publicField(this, "storeState", "closed");
    assertClientInstanceId(options.clientInstanceId);
    const indexedDB = options.indexedDB ?? globalThis.indexedDB;
    if (!indexedDB) {
      throw new ClientStoreError(
        "storage-unavailable",
        "IndexedDB is unavailable in this Obsidian runtime."
      );
    }
    this.databaseName = `${CLIENT_DATABASE_PREFIX}${options.clientInstanceId}`;
    this.indexedDB = indexedDB;
  }
  get state() {
    return this.storeState;
  }
  async open() {
    if (this.database && (this.storeState === "ready" || this.storeState === "write-failed")) {
      return;
    }
    if (this.storeState === "opening") {
      throw new ClientStoreError(
        "transaction-failed",
        "The IndexedDB connection is already opening."
      );
    }
    const attempt = ++this.openAttempt;
    this.storeState = "opening";
    let request;
    try {
      request = this.indexedDB.open(
        this.databaseName,
        CLIENT_STORE_VERSION
      );
    } catch (error51) {
      this.storeState = "closed";
      throw normalizeClientStoreError(error51);
    }
    await new Promise((resolve, reject) => {
      let settled = false;
      const rejectOnce = (error51) => {
        if (settled) return;
        settled = true;
        reject(error51);
      };
      request.onupgradeneeded = () => {
        const database = request.result;
        for (const storeName of CLIENT_STORE_NAMES) {
          if (!database.objectStoreNames.contains(storeName)) {
            database.createObjectStore(storeName);
          }
        }
      };
      request.onblocked = () => {
        if (attempt !== this.openAttempt) return;
        this.storeState = "blocked";
        rejectOnce(
          new ClientStoreError(
            "blocked-upgrade",
            "IndexedDB upgrade is blocked by another open Havemind client."
          )
        );
      };
      request.onerror = () => {
        if (attempt !== this.openAttempt) return;
        this.storeState = "closed";
        rejectOnce(normalizeClientStoreError(request.error));
      };
      request.onsuccess = () => {
        const database = request.result;
        if (settled || attempt !== this.openAttempt || this.storeState !== "opening") {
          database.close();
          rejectOnce(
            new ClientStoreError(
              "closed",
              "The IndexedDB connection was closed while opening."
            )
          );
          return;
        }
        settled = true;
        this.database = database;
        this.storeState = "ready";
        database.onversionchange = () => {
          database.close();
          if (this.database === database) this.database = null;
          this.storeState = "versionchange";
        };
        resolve();
      };
    });
  }
  close() {
    this.openAttempt += 1;
    this.database?.close();
    this.database = null;
    this.storeState = "closed";
  }
  async setConnectionValue(key, value) {
    assertStorageKey(key);
    await this.runTransaction(
      "connection",
      "readwrite",
      (store) => store.put(value, key)
    );
  }
  async getConnectionValue(key) {
    assertStorageKey(key);
    return this.runTransaction(
      "connection",
      "readonly",
      (store) => store.get(key)
    );
  }
  async enqueueOutbox(entry) {
    assertOutboxEntry(entry);
    await this.runTransaction(
      "outbox",
      "readwrite",
      (store) => store.put(entry, entry.operationId)
    );
  }
  async listOutbox() {
    const entries = await this.runTransaction(
      "outbox",
      "readonly",
      (store) => store.getAll()
    );
    return entries.map(parseOutboxEntry);
  }
  /**
   * Arch P1: store an outbox revision's base64 payload out-of-band, keyed by
   * `revisionId`, so the large bytes stay out of the per-plugin `data.json`.
   */
  async putPayload(revisionId, payloadBase64) {
    assertStorageKey(revisionId);
    await this.runTransaction(
      "payloads",
      "readwrite",
      (store) => store.put(payloadBase64, revisionId)
    );
  }
  /** The stored payload for `revisionId`, or undefined when absent (torn state). */
  async getPayload(revisionId) {
    assertStorageKey(revisionId);
    const value = await this.runTransaction(
      "payloads",
      "readonly",
      (store) => store.get(revisionId)
    );
    return typeof value === "string" ? value : void 0;
  }
  /** Remove a stored payload; a no-op when absent. */
  async deletePayload(revisionId) {
    assertStorageKey(revisionId);
    await this.runTransaction(
      "payloads",
      "readwrite",
      (store) => store.delete(revisionId)
    );
  }
  requireDatabase() {
    if (this.database && (this.storeState === "ready" || this.storeState === "write-failed")) {
      return this.database;
    }
    if (this.storeState === "versionchange") {
      throw new ClientStoreError(
        "version-changed",
        "The IndexedDB schema changed in another Havemind client."
      );
    }
    throw new ClientStoreError(
      "closed",
      "The Havemind IndexedDB connection is not open."
    );
  }
  async runTransaction(storeName, mode, createRequest) {
    const isWrite = mode === "readwrite";
    let transaction;
    let request;
    try {
      transaction = this.requireDatabase().transaction(storeName, mode);
      request = createRequest(transaction.objectStore(storeName));
    } catch (error51) {
      const normalized = normalizeClientStoreError(error51);
      if (isWrite && normalized.code !== "closed" && normalized.code !== "version-changed") {
        this.storeState = "write-failed";
      }
      throw normalized;
    }
    return new Promise((resolve, reject) => {
      let requestResult;
      let requestSucceeded = false;
      let settled = false;
      const fail = (error51) => {
        if (settled) return;
        settled = true;
        if (isWrite) this.storeState = "write-failed";
        reject(normalizeClientStoreError(error51));
      };
      request.onsuccess = () => {
        requestResult = request.result;
        requestSucceeded = true;
      };
      request.onerror = () => {
        if (request.error) fail(request.error);
      };
      transaction.onerror = () => {
        fail(transaction.error ?? request.error);
      };
      transaction.onabort = () => {
        fail(transaction.error ?? request.error);
      };
      transaction.oncomplete = () => {
        if (settled) return;
        if (!requestSucceeded) {
          fail(
            new ClientStoreError(
              "transaction-failed",
              "IndexedDB completed without confirming the requested operation."
            )
          );
          return;
        }
        settled = true;
        if (isWrite) this.storeState = "ready";
        resolve(requestResult);
      };
    });
  }
};
function assertClientInstanceId(value) {
  if (!isValidClientInstanceId(value)) {
    throw new ClientStoreError(
      "invalid-client-instance-id",
      "client_instance_id must be 16-64 lowercase alphanumeric or hyphen characters."
    );
  }
}
function assertStorageKey(value) {
  if (value.length === 0 || value.length > 256) {
    throw new ClientStoreError(
      "transaction-failed",
      "IndexedDB keys must contain between 1 and 256 characters."
    );
  }
}
function assertOutboxEntry(entry) {
  assertStorageKey(entry.operationId);
  if (!Number.isFinite(entry.createdAt) || entry.createdAt < 0) {
    throw new ClientStoreError(
      "transaction-failed",
      "Outbox createdAt must be a non-negative finite timestamp."
    );
  }
}
function parseOutboxEntry(value) {
  if (!isRecord8(value)) {
    throw new ClientStoreError(
      "transaction-failed",
      "IndexedDB contains a malformed outbox entry."
    );
  }
  const entry = {
    createdAt: value.createdAt,
    operationId: value.operationId,
    payload: value.payload
  };
  if (typeof entry.operationId !== "string" || typeof entry.createdAt !== "number") {
    throw new ClientStoreError(
      "transaction-failed",
      "IndexedDB contains a malformed outbox entry."
    );
  }
  assertOutboxEntry(entry);
  return entry;
}
function isRecord8(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function generateClientInstanceId() {
  if (!globalThis.crypto?.randomUUID) {
    throw new ClientStoreError(
      "storage-unavailable",
      "Secure random UUID generation is unavailable in this Obsidian runtime."
    );
  }
  return globalThis.crypto.randomUUID();
}
function normalizeClientStoreError(error51) {
  if (error51 instanceof ClientStoreError) return error51;
  if (getErrorName(error51) === "QuotaExceededError") {
    return new ClientStoreError(
      "quota-exceeded",
      "IndexedDB quota was exceeded; the operation was not durably queued.",
      error51
    );
  }
  return new ClientStoreError(
    "transaction-failed",
    "The IndexedDB operation failed.",
    error51
  );
}
function getErrorName(error51) {
  if (typeof error51 === "object" && error51 !== null && "name" in error51 && typeof error51.name === "string") {
    return error51.name;
  }
  return null;
}

// src/runtime/adapters/plugin-data-keys.ts
var PERSIST_KEY = "syncState";
var PERSIST_BAK_KEY = "syncState.bak";
var PERSIST_STAGING_KEY = "syncState.staging";
var PERSIST_CORRUPT_PREFIX = "syncStateCorrupt.";
var PERSIST_PRODUCER_CORRUPT_PREFIX = "pushProducerCorrupt.";
var CANONICALIZATION_REBASE_MARKER_KEY = "canonicalizationRebaseVersion";
var CLIENT_INSTANCE_KEY = "clientInstanceId";
var PUSH_PRODUCER_KEY = "pushProducer";
var OWNER_CONNECTION_KEY = "ownerConnection";
var OWNER_CONNECTION_CORRUPT_PREFIX = "ownerConnectionCorrupt.";
var CORRUPT_SIDECAR_PREFIXES = [
  PERSIST_CORRUPT_PREFIX,
  PERSIST_PRODUCER_CORRUPT_PREFIX,
  OWNER_CONNECTION_CORRUPT_PREFIX
];
function isCorruptSidecarKey(key) {
  return CORRUPT_SIDECAR_PREFIXES.some((prefix) => key.startsWith(prefix));
}

// src/runtime/adapters/shared.ts
function isRecord9(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/adapters/plugin-data-ports.ts
function createPersistPort(plugin) {
  const mutex = getPluginDataMutex(plugin);
  return {
    async load() {
      const data = await plugin.loadData();
      if (isRecord9(data)) return data[PERSIST_KEY] ?? null;
      return null;
    },
    async loadBackup() {
      const data = await plugin.loadData();
      if (isRecord9(data)) return data[PERSIST_BAK_KEY] ?? null;
      return null;
    },
    async save(state) {
      await mutex.update((base) => ({ ...base, [PERSIST_STAGING_KEY]: state }));
      await mutex.update((base) => {
        const next = { ...base };
        const priorPrimary = next[PERSIST_KEY];
        if (priorPrimary !== void 0) next[PERSIST_BAK_KEY] = priorPrimary;
        next[PERSIST_KEY] = PERSIST_STAGING_KEY in next ? next[PERSIST_STAGING_KEY] : state;
        delete next[PERSIST_STAGING_KEY];
        return next;
      });
    },
    async preserveCorrupt(raw, timestamp) {
      await mutex.update((base) => {
        const key = `${PERSIST_CORRUPT_PREFIX}${timestamp}`;
        if (key in base) return base;
        return { ...base, [key]: raw };
      });
    }
  };
}
async function preserveCorruptProducerState(plugin, raw, timestamp) {
  await getPluginDataMutex(plugin).update((base) => {
    const key = `${PERSIST_PRODUCER_CORRUPT_PREFIX}${timestamp}`;
    if (key in base) return base;
    return { ...base, [key]: raw };
  });
}
async function runCanonicalizationRebase(plugin) {
  const vaultApi = plugin.app.vault;
  const vault = {
    exists: (path) => vaultApi.getAbstractFileByPath(path) !== null,
    read: async (path) => {
      const file2 = vaultApi.getAbstractFileByPath(path);
      return file2 === null ? "" : vaultApi.read(file2);
    }
  };
  await rebaseCanonicalizedHashes({
    data: {
      load: () => plugin.loadData(),
      save: (data) => plugin.saveData(data)
    },
    vault,
    hash: (content) => hashPlaintext(content),
    canonicalize: canonicalizeMarkdown,
    keys: {
      markerKey: CANONICALIZATION_REBASE_MARKER_KEY,
      persistKey: PERSIST_KEY,
      producerKey: PUSH_PRODUCER_KEY
    }
  });
}
function createRawPersistPort(plugin) {
  return createSerializedDataPort(getPluginDataMutex(plugin));
}
function createClientInstanceRepo(plugin) {
  return {
    async readClientInstanceId() {
      const data = await plugin.loadData();
      const value = isRecord9(data) ? data[CLIENT_INSTANCE_KEY] : null;
      return typeof value === "string" ? value : null;
    },
    async writeClientInstanceId(value) {
      await getPluginDataMutex(plugin).update((base) => ({
        ...base,
        [CLIENT_INSTANCE_KEY]: value
      }));
    }
  };
}
function createOutboxPayloadStore(plugin) {
  let storePromise = null;
  const ensureStore = () => {
    if (storePromise === null) {
      storePromise = (async () => {
        try {
          const clientInstanceId = await ensureClientInstanceId(
            createClientInstanceRepo(plugin)
          );
          const store = new IndexedDbClientStore({ clientInstanceId });
          await store.open();
          return store;
        } catch (error51) {
          console.warn(
            "Havemind: outbox payload store unavailable; payloads stay inline in data.json.",
            error51
          );
          return null;
        }
      })();
    }
    return storePromise;
  };
  return {
    async putPayload(revisionId, payloadBase64) {
      const store = await ensureStore();
      if (store === null) {
        throw new Error("Havemind: outbox payload store is unavailable.");
      }
      await store.putPayload(revisionId, payloadBase64);
    },
    async getPayload(revisionId) {
      const store = await ensureStore();
      if (store === null) return void 0;
      return store.getPayload(revisionId);
    },
    async deletePayload(revisionId) {
      const store = await ensureStore();
      if (store === null) return;
      await store.deletePayload(revisionId);
    }
  };
}

// src/runtime/adapters/scheduler-hooks.ts
function createSchedulerHooks(plugin, target = window) {
  return {
    onFocus(run) {
      target.addEventListener("focus", run);
      return () => target.removeEventListener("focus", run);
    },
    onOnline(run) {
      target.addEventListener("online", run);
      return () => target.removeEventListener("online", run);
    },
    setInterval(run, ms) {
      const id = window.setInterval(run, ms);
      plugin.registerInterval(id);
      return () => window.clearInterval(id);
    }
  };
}
function createBackoffScheduler() {
  return (callback, delayMs) => {
    window.setTimeout(callback, delayMs);
  };
}

// src/runtime/adapters/vault-file-port.ts
var import_obsidian3 = require("obsidian");

// src/sync/config-adapter.ts
var CONFIG_DIR = ".obsidian";
var HAVEMIND_PLUGIN_DIR = ".obsidian/plugins/havemind-sync";
function isUnderHavemindPlugin(folder) {
  return folder === HAVEMIND_PLUGIN_DIR || folder.startsWith(`${HAVEMIND_PLUGIN_DIR}/`);
}
async function listSyncableConfigPaths(adapter, root = CONFIG_DIR) {
  const found = [];
  const pending = [root];
  const visited = /* @__PURE__ */ new Set();
  while (pending.length > 0) {
    const dir = pending.pop();
    if (dir === void 0 || visited.has(dir)) continue;
    visited.add(dir);
    let listing;
    try {
      listing = await adapter.list(dir);
    } catch {
      continue;
    }
    for (const file2 of listing.files) {
      if (isSyncableConfigPath(file2)) found.push(file2);
    }
    for (const folder of listing.folders) {
      if (isUnderHavemindPlugin(folder)) continue;
      pending.push(folder);
    }
  }
  found.sort();
  return found;
}
async function ensureConfigParentDirs(adapter, path) {
  const separator = path.lastIndexOf("/");
  if (separator === -1) return;
  const segments = path.slice(0, separator).split("/");
  let prefix = "";
  for (const segment of segments) {
    prefix = prefix === "" ? segment : `${prefix}/${segment}`;
    try {
      await adapter.mkdir(prefix);
    } catch {
    }
  }
}
async function writeConfigText(adapter, path, content) {
  await ensureConfigParentDirs(adapter, path);
  await adapter.write(path, content);
}
async function writeConfigBinary(adapter, path, data) {
  await ensureConfigParentDirs(adapter, path);
  await adapter.writeBinary(path, data);
}
async function removeConfig(adapter, path) {
  if (await adapter.exists(path)) await adapter.remove(path);
}

// src/runtime/keyed-mutex.ts
function noop2() {
}
var KeyedMutex = class {
  constructor() {
    __publicField(this, "chains", /* @__PURE__ */ new Map());
  }
  runExclusive(key, task) {
    const previous = this.chains.get(key) ?? Promise.resolve();
    const run = previous.then(task, task);
    const settled = run.then(noop2, noop2);
    this.chains.set(key, settled);
    void settled.then(() => {
      if (this.chains.get(key) === settled) {
        this.chains.delete(key);
      }
    });
    return run;
  }
  /** Number of keys with an in-flight or not-yet-drained chain (for tests). */
  size() {
    return this.chains.size;
  }
};

// src/runtime/vault-apply.ts
var ParentFolderOccupiedError = class extends Error {
  constructor(occupiedPath) {
    super(`Cannot create parent folder: path occupied by a file: ${occupiedPath}`);
    __publicField(this, "occupiedPath");
    this.name = "ParentFolderOccupiedError";
    this.occupiedPath = occupiedPath;
  }
};
var MAX_CONFLICT_BASENAME_LENGTH = 60;
function resolvesLastWriterWins(path) {
  return isSyncableConfigPath(path);
}
var VaultApplyAdapter = class {
  constructor(options) {
    __publicField(this, "files");
    __publicField(this, "conflictFolder");
    __publicField(this, "resolveRevision");
    __publicField(this, "hashContent");
    __publicField(this, "onRemoteApplied");
    __publicField(this, "producerSync");
    __publicField(this, "now");
    __publicField(this, "resolveAuthorName");
    __publicField(this, "fallbackAuthorName");
    __publicField(this, "onConflictWritten");
    __publicField(this, "lock");
    this.files = options.files;
    this.conflictFolder = options.conflictFolder;
    this.resolveRevision = options.resolveRevision;
    this.hashContent = options.hashContent;
    if (options.onRemoteApplied !== void 0) {
      this.onRemoteApplied = options.onRemoteApplied;
    }
    if (options.producerSync !== void 0) {
      this.producerSync = options.producerSync;
    }
    this.now = options.conflictNaming?.now ?? (() => /* @__PURE__ */ new Date());
    if (options.conflictNaming?.resolveAuthorName !== void 0) {
      this.resolveAuthorName = options.conflictNaming.resolveAuthorName;
    }
    this.fallbackAuthorName = options.conflictNaming?.fallbackAuthorName ?? "peer";
    if (options.onConflictWritten !== void 0) {
      this.onConflictWritten = options.onConflictWritten;
    }
    this.lock = options.lock ?? new KeyedMutex();
  }
  async openBuffers(fileId) {
    return this.files.openBufferStates(fileId);
  }
  /**
   * The per-file lock key: the file's canonical collision key, so remote apply
   * and the local producer (which keys on the same collision key) share ONE
   * critical section per file. Falls back to the raw path for a non-syncable
   * path (never reached in practice — apply only sees syncable revisions).
   */
  lockKey(path) {
    const classified = classifyVaultPath(path);
    return classified.eligible ? classified.collisionKey : path;
  }
  async applyRemote(event, options) {
    const decoded = await this.resolveRevision(event);
    const fileId = event.revision.fileId;
    const origin = options?.bootstrap === true ? "bootstrap" : "live";
    return this.lock.runExclusive(
      this.lockKey(decoded.path),
      () => this.applyDecoded(event, decoded, fileId, origin)
    );
  }
  async applyDecoded(event, decoded, fileId, origin) {
    if (decoded.operation === "delete") {
      if (this.files.fileIdAtPath(decoded.path) === fileId) {
        await this.producerSync?.onRemoteDelete({ fileId, path: decoded.path });
        await this.files.deleteByPath(decoded.path);
        await this.files.forgetPath(decoded.path);
        await this.files.forgetBaseHash(fileId);
        await this.files.forgetBaseContent(fileId);
        this.onRemoteApplied?.({
          revisionId: event.revision.revisionId,
          fileId,
          path: decoded.path,
          operation: decoded.operation,
          origin
        });
      }
      return "applied";
    }
    if (decoded.kind === "binary") {
      return this.applyRemoteBinary(event, decoded, fileId, origin);
    }
    const text = decoded.content ?? "";
    const lastWriterWins = resolvesLastWriterWins(decoded.path);
    if (decoded.operation === "rename" && decoded.previousPath !== null && this.files.fileIdAtPath(decoded.previousPath) === fileId) {
      const previousOnDisk = await this.files.readByPath(decoded.previousPath);
      if (previousOnDisk !== null && !lastWriterWins) {
        const base = this.files.baseHashFor(fileId);
        const previousHash = await this.hashContent(previousOnDisk);
        if (base === null || previousHash !== base) {
          await this.writeConflict(event, decoded);
          return "conflict";
        }
      }
      await this.producerSync?.onRemoteDelete({
        fileId,
        path: decoded.previousPath
      });
      await this.files.deleteByPath(decoded.previousPath);
      await this.files.forgetPath(decoded.previousPath);
    }
    const onDisk = await this.files.readByPath(decoded.path);
    const owner = this.files.fileIdAtPath(decoded.path);
    if (owner !== null && owner !== fileId) {
      if (onDisk !== null && contentMatches(onDisk, text)) {
        const contentHash2 = await this.hashContent(text);
        await this.producerSync?.onRemoteDelete({ fileId: owner, path: decoded.path });
        await this.files.forgetBaseHash(owner);
        await this.files.forgetBaseContent(owner);
        await this.files.recordPathOwner(fileId, decoded.path);
        await this.files.recordBaseHash(fileId, contentHash2);
        await this.files.recordBaseContent(fileId, text);
        await this.producerSync?.onRemoteWrite({
          fileId,
          path: decoded.path,
          content: text,
          contentHash: contentHash2,
          contentKind: "markdown",
          revisionId: event.revision.revisionId
        });
        return "noop";
      }
      if (!lastWriterWins) {
        await this.writeConflict(event, decoded);
        return "conflict";
      }
      await this.producerSync?.onRemoteDelete({ fileId: owner, path: decoded.path });
      await this.files.forgetBaseHash(owner);
      await this.files.forgetBaseContent(owner);
    }
    if (onDisk !== null) {
      if (contentMatches(onDisk, text)) {
        const contentHash2 = await this.hashContent(text);
        await this.files.recordBaseHash(fileId, contentHash2);
        await this.files.recordBaseContent(fileId, text);
        await this.files.recordPathOwner(fileId, decoded.path);
        await this.producerSync?.onRemoteWrite({
          fileId,
          path: decoded.path,
          content: text,
          contentHash: contentHash2,
          contentKind: "markdown",
          revisionId: event.revision.revisionId
        });
        return "noop";
      }
      const base = this.files.baseHashFor(fileId);
      const onDiskHash = await this.hashContent(onDisk);
      const diverged = base === null || onDiskHash !== base;
      if (diverged || !await this.isCausalFastForward(fileId, event)) {
        const merged = await this.tryMergeApply(
          event,
          decoded,
          fileId,
          onDisk,
          text,
          base,
          origin
        );
        if (merged !== null) {
          return merged;
        }
        if (!lastWriterWins) {
          await this.writeConflict(event, decoded);
          return "conflict";
        }
      }
    }
    const contentHash = await this.hashContent(text);
    await this.producerSync?.onRemoteWrite({
      fileId,
      path: decoded.path,
      content: text,
      contentHash,
      contentKind: "markdown",
      revisionId: event.revision.revisionId
    });
    const preWriteOnDisk = await this.files.readByPath(decoded.path);
    if (preWriteOnDisk !== null && !lastWriterWins && !contentMatches(preWriteOnDisk, text)) {
      const preWriteBase = this.files.baseHashFor(fileId);
      const preWriteHash = await this.hashContent(preWriteOnDisk);
      if (preWriteBase === null || preWriteHash !== preWriteBase) {
        await this.producerSync?.onRemoteDelete({ fileId, path: decoded.path });
        const merged = await this.tryMergeApply(
          event,
          decoded,
          fileId,
          preWriteOnDisk,
          text,
          preWriteBase,
          origin
        );
        if (merged !== null) {
          return merged;
        }
        await this.writeConflict(event, decoded);
        return "conflict";
      }
    }
    try {
      await this.files.writeByPath(decoded.path, text);
    } catch (error51) {
      if (error51 instanceof ParentFolderOccupiedError && !lastWriterWins) {
        await this.producerSync?.onRemoteDelete({ fileId, path: decoded.path });
        await this.writeConflict(event, decoded);
        return "conflict";
      }
      throw error51;
    }
    await this.files.recordPathOwner(fileId, decoded.path);
    await this.files.recordBaseHash(fileId, contentHash);
    await this.files.recordBaseContent(fileId, text);
    this.onRemoteApplied?.({
      revisionId: event.revision.revisionId,
      fileId,
      path: decoded.path,
      operation: decoded.operation,
      origin
    });
    return "applied";
  }
  /**
   * Attempts a line-level three-way merge (MRG-01) of a diverged markdown file
   * before any conflict copy. Returns `'applied'` when it merged and wrote the
   * combined content in place, or `null` when no merge is possible (no shared
   * base, the ancestor text is not locally persisted, the stored ancestor no
   * longer matches the base hash, or the changes overlap) — the caller then
   * writes a conflict copy.
   *
   * ANCESTOR is the locally-persisted base content; LOCAL is the current on-disk
   * content; REMOTE is the incoming revision. A successful merge IS a
   * convergence event, so the base advances to the merged state. The merged
   * content is deliberately NOT adopted into the producer mapping: it is a NEW
   * local revision this device authored, so letting the reflected vault write
   * flow through the normal local-edit path pushes the merged result to the peer
   * (who converges by content-equality — no ping-pong).
   */
  async tryMergeApply(event, decoded, fileId, onDisk, incoming, base, origin) {
    if (base === null) {
      return null;
    }
    const ancestor = this.files.baseContentFor(fileId);
    if (ancestor === null) {
      return null;
    }
    if (await this.hashContent(ancestor) !== base) {
      return null;
    }
    const result = mergeText(ancestor, onDisk, incoming);
    if (result.status !== "merged") {
      return null;
    }
    const merged = result.text;
    const mergedHash = await this.hashContent(merged);
    if (merged === onDisk) {
      await this.files.recordPathOwner(fileId, decoded.path);
      await this.files.recordBaseHash(fileId, mergedHash);
      await this.files.recordBaseContent(fileId, merged);
      return "noop";
    }
    await this.files.writeByPath(decoded.path, merged);
    await this.files.recordPathOwner(fileId, decoded.path);
    await this.files.recordBaseHash(fileId, mergedHash);
    await this.files.recordBaseContent(fileId, merged);
    this.onRemoteApplied?.({
      revisionId: event.revision.revisionId,
      fileId,
      path: decoded.path,
      operation: decoded.operation,
      origin
    });
    return "applied";
  }
  /**
   * Causal apply-vs-conflict decision (rule 3): true when the incoming
   * revision is either provably a fast-forward from this device's current
   * head for `fileId`, or when causality simply cannot be evaluated because
   * the incoming revision carries no `parentRevisionIds` at all (a transport
   * that does not yet surface causal parentage — see `RemoteRevision`).
   *
   * When `parentRevisionIds` IS present, this only returns true if a
   * `producerSync` is wired with `localHeadFor`, that lookup resolves to a
   * known (non-null) local head, AND the incoming revision's parents include
   * it — i.e. the peer built its revision directly on top of (or through)
   * what we last knew. Any missing piece there means causality cannot be
   * established, so this fails SAFE (false) rather than risk a silent
   * overwrite of a concurrent peer edit.
   */
  async isCausalFastForward(fileId, event) {
    const parents = event.revision.parentRevisionIds;
    if (parents === void 0) {
      return true;
    }
    const localHeadFor = this.producerSync?.localHeadFor;
    if (localHeadFor === void 0) {
      return false;
    }
    const localHead = await localHeadFor(fileId);
    if (localHead === null) {
      return false;
    }
    return parents.includes(localHead);
  }
  /**
   * Applies a whole-file binary revision (F9). Structurally mirrors the markdown
   * `applyRemote` above but operates on RAW bytes: comparison and base hashing
   * use `hashBlob`/byte-equality (never `canonicalizeMarkdown`), writes go
   * through the byte vault API, and any conflict artifact keeps the original
   * file extension. Every data-safety invariant is preserved — diverged on-disk
   * bytes become a conflict artifact, never an overwrite (rule 3); the base
   * advances only on a clean apply or convergence, never on a divergence.
   */
  async applyRemoteBinary(event, decoded, fileId, origin) {
    const bytes = decoded.binaryContent ?? new Uint8Array(0);
    const incomingHash = await hashBlob(bytes);
    const incomingBase64 = bytesToBase642(bytes);
    const lastWriterWins = resolvesLastWriterWins(decoded.path);
    if (decoded.operation === "rename" && decoded.previousPath !== null && this.files.fileIdAtPath(decoded.previousPath) === fileId) {
      const previousOnDisk = await this.files.readBinaryByPath(decoded.previousPath);
      if (previousOnDisk !== null && !lastWriterWins) {
        const base = this.files.baseHashFor(fileId);
        const previousHash = await hashBlob(previousOnDisk);
        if (base === null || previousHash !== base) {
          await this.writeConflict(event, decoded);
          return "conflict";
        }
      }
      await this.producerSync?.onRemoteDelete({
        fileId,
        path: decoded.previousPath
      });
      await this.files.deleteByPath(decoded.previousPath);
      await this.files.forgetPath(decoded.previousPath);
    }
    const onDisk = await this.files.readBinaryByPath(decoded.path);
    const owner = this.files.fileIdAtPath(decoded.path);
    if (owner !== null && owner !== fileId) {
      if (onDisk !== null && bytesEqual(onDisk, bytes)) {
        await this.producerSync?.onRemoteDelete({ fileId: owner, path: decoded.path });
        await this.files.forgetBaseHash(owner);
        await this.files.recordPathOwner(fileId, decoded.path);
        await this.files.recordBaseHash(fileId, incomingHash);
        await this.producerSync?.onRemoteWrite({
          fileId,
          path: decoded.path,
          content: incomingBase64,
          contentHash: incomingHash,
          contentKind: "binary",
          revisionId: event.revision.revisionId
        });
        return "noop";
      }
      if (!lastWriterWins) {
        await this.writeConflict(event, decoded);
        return "conflict";
      }
      await this.producerSync?.onRemoteDelete({ fileId: owner, path: decoded.path });
      await this.files.forgetBaseHash(owner);
      await this.files.forgetBaseContent(owner);
    }
    if (onDisk !== null) {
      if (bytesEqual(onDisk, bytes)) {
        await this.files.recordBaseHash(fileId, incomingHash);
        await this.files.recordPathOwner(fileId, decoded.path);
        await this.producerSync?.onRemoteWrite({
          fileId,
          path: decoded.path,
          content: incomingBase64,
          contentHash: incomingHash,
          contentKind: "binary",
          revisionId: event.revision.revisionId
        });
        return "noop";
      }
      const base = this.files.baseHashFor(fileId);
      const onDiskHash = await hashBlob(onDisk);
      if (!lastWriterWins && (base === null || onDiskHash !== base)) {
        await this.writeConflict(event, decoded);
        return "conflict";
      }
      if (!lastWriterWins && !await this.isCausalFastForward(fileId, event)) {
        await this.writeConflict(event, decoded);
        return "conflict";
      }
    }
    await this.producerSync?.onRemoteWrite({
      fileId,
      path: decoded.path,
      content: incomingBase64,
      contentHash: incomingHash,
      contentKind: "binary",
      revisionId: event.revision.revisionId
    });
    const preWriteOnDisk = await this.files.readBinaryByPath(decoded.path);
    if (preWriteOnDisk !== null && !lastWriterWins && !bytesEqual(preWriteOnDisk, bytes)) {
      const preWriteBase = this.files.baseHashFor(fileId);
      const preWriteHash = await hashBlob(preWriteOnDisk);
      if (preWriteBase === null || preWriteHash !== preWriteBase) {
        await this.producerSync?.onRemoteDelete({ fileId, path: decoded.path });
        await this.writeConflict(event, decoded);
        return "conflict";
      }
    }
    try {
      await this.files.writeBinaryByPath(decoded.path, bytes);
    } catch (error51) {
      if (error51 instanceof ParentFolderOccupiedError && !lastWriterWins) {
        await this.producerSync?.onRemoteDelete({ fileId, path: decoded.path });
        await this.writeConflict(event, decoded);
        return "conflict";
      }
      throw error51;
    }
    await this.files.recordPathOwner(fileId, decoded.path);
    await this.files.recordBaseHash(fileId, incomingHash);
    this.onRemoteApplied?.({
      revisionId: event.revision.revisionId,
      fileId,
      path: decoded.path,
      operation: decoded.operation,
      origin
    });
    return "applied";
  }
  /**
   * The runner's separate open-BUFFER divergence path: the incoming revision is
   * preserved as a conflict copy without touching the live file. Unreachable for
   * an allowlisted `.obsidian/` settings file, which is why it needs no
   * last-writer-wins branch — Obsidian never opens a hidden config file as an
   * editor buffer, so `openBuffers` can never report one for a config fileId.
   */
  async recordConflict(event) {
    const decoded = await this.resolveRevision(event);
    await this.writeConflict(event, decoded);
  }
  /**
   * Writes the incoming revision to a readable conflict copy (MRG-02) under the
   * reserved folder, preserving both sides. Idempotent per revision: a
   * re-delivered revision reuses the path already recorded for it, so a retry can
   * never spawn a fresh timestamped duplicate (the conflict-cascade guard).
   * Markdown and binary are handled uniformly via the decoded payload's kind.
   */
  async writeConflict(event, decoded) {
    const isBinary = decoded.kind === "binary";
    const existing = this.files.conflictArtifactPathFor(event.revision.revisionId);
    const target = existing ?? await this.buildConflictPath(event, decoded);
    if (isBinary) {
      await this.files.writeBinaryConflictArtifact(
        target,
        decoded.binaryContent ?? new Uint8Array(0)
      );
    } else {
      await this.files.writeConflictArtifact(target, decoded.content ?? "");
    }
    if (existing === null) {
      await this.files.recordConflictArtifactPath(
        event.revision.revisionId,
        target
      );
      this.onConflictWritten?.();
    }
  }
  /**
   * Builds the readable conflict-copy path per the fixed naming contract:
   * `<basename> (conflict <author> <YYYY-MM-DD HHmm>).<ext>` inside the reserved
   * folder. Binary copies keep the source extension; markdown copies use `md`.
   * A name collision appends ` 2`, ` 3`, … to the note basename.
   */
  async buildConflictPath(event, decoded) {
    const isBinary = decoded.kind === "binary";
    const extension = isBinary ? pathExtension(decoded.path) || "bin" : "md";
    const basename = noteBasename(decoded.path).slice(
      0,
      MAX_CONFLICT_BASENAME_LENGTH
    );
    const author = this.resolveAuthorName?.(event) ?? this.fallbackAuthorName;
    const stamp = formatConflictTimestamp(this.now());
    const suffix = ` (conflict ${author} ${stamp})`;
    let candidate = `${this.conflictFolder}/${basename}${suffix}.${extension}`;
    let counter = 2;
    while (await this.files.conflictArtifactExists(candidate)) {
      candidate = `${this.conflictFolder}/${basename} ${counter}${suffix}.${extension}`;
      counter += 1;
    }
    return candidate;
  }
};
function noteBasename(path) {
  const slash = path.lastIndexOf("/");
  const leaf = slash === -1 ? path : path.slice(slash + 1);
  const dot = leaf.lastIndexOf(".");
  return dot <= 0 ? leaf : leaf.slice(0, dot);
}
function formatConflictTimestamp(date5) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date5.getFullYear()}-${pad(date5.getMonth() + 1)}-${pad(date5.getDate())} ${pad(date5.getHours())}${pad(date5.getMinutes())}`;
}
function bytesEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false;
  for (let index = 0; index < a.byteLength; index += 1) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}
function contentMatches(onDisk, incoming) {
  return canonicalizeMarkdown(onDisk) === canonicalizeMarkdown(incoming);
}

// src/runtime/adapters/vault-file-port.ts
async function ensureWritableConflictFolder(vault, folder) {
  const abstract = vault.getAbstractFileByPath(folder);
  if (abstract === null) {
    await vault.createFolder(folder);
    return folder;
  }
  if (abstract instanceof import_obsidian3.TFolder) {
    return folder;
  }
  const fallback = `${folder} (files)`;
  const fallbackAbstract = vault.getAbstractFileByPath(fallback);
  if (fallbackAbstract === null) {
    await vault.createFolder(fallback);
    return fallback;
  }
  if (fallbackAbstract instanceof import_obsidian3.TFolder) {
    return fallback;
  }
  return "";
}
async function resolveConflictTarget(vault, path) {
  const separatorIndex = path.lastIndexOf("/");
  const folder = separatorIndex === -1 ? "" : path.slice(0, separatorIndex);
  const filename = separatorIndex === -1 ? path : path.slice(separatorIndex + 1);
  const resolvedFolder = folder === "" ? "" : await ensureWritableConflictFolder(vault, folder);
  return resolvedFolder === "" ? filename : `${resolvedFolder}/${filename}`;
}
function toArrayBuffer(bytes) {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  );
}
async function ensureParentFolders(vault, path) {
  const separatorIndex = path.lastIndexOf("/");
  if (separatorIndex === -1) return;
  const segments = path.slice(0, separatorIndex).split("/");
  let prefix = "";
  for (const segment of segments) {
    prefix = prefix === "" ? segment : `${prefix}/${segment}`;
    const existing = vault.getAbstractFileByPath(prefix);
    if (existing === null) {
      await vault.createFolder(prefix);
      continue;
    }
    if (existing instanceof import_obsidian3.TFolder) {
      continue;
    }
    throw new ParentFolderOccupiedError(prefix);
  }
}
function createVaultFilePort(options) {
  const { vault, state, configApply } = options;
  return {
    openBufferStates() {
      return [];
    },
    fileIdAtPath(path) {
      return state.fileIdAtPath(path);
    },
    async readByPath(path) {
      if (isSyncableConfigPath(path)) {
        if (!await vault.adapter.exists(path)) return null;
        return canonicalizeMarkdown(
          normalizeConfigContent(path, await vault.adapter.read(path))
        );
      }
      const existing = vault.getAbstractFileByPath(path);
      if (existing === null) return null;
      const raw = await vault.read(existing);
      return canonicalizeMarkdown(raw);
    },
    async readBinaryByPath(path) {
      if (isSyncableConfigPath(path)) {
        if (!await vault.adapter.exists(path)) return null;
        return new Uint8Array(await vault.adapter.readBinary(path));
      }
      const existing = vault.getAbstractFileByPath(path);
      if (existing === null) return null;
      const buffer = await vault.readBinary(existing);
      return new Uint8Array(buffer);
    },
    baseHashFor: (fileId) => state.baseHashFor(fileId),
    recordBaseHash: (fileId, hash2) => state.recordBaseHash(fileId, hash2),
    forgetBaseHash: (fileId) => state.forgetBaseHash(fileId),
    baseContentFor: (fileId) => state.baseContentFor(fileId),
    recordBaseContent: (fileId, content) => state.recordBaseContent(fileId, content),
    forgetBaseContent: (fileId) => state.forgetBaseContent(fileId),
    async conflictArtifactExists(path) {
      return vault.getAbstractFileByPath(path) !== null;
    },
    conflictArtifactPathFor: (revisionId) => state.conflictArtifactPathFor(revisionId),
    recordConflictArtifactPath: (revisionId, path) => state.recordConflictArtifactPath(revisionId, path),
    async writeByPath(path, content) {
      if (isSyncableConfigPath(path)) {
        const local = await vault.adapter.exists(path) ? await vault.adapter.read(path) : null;
        await writeConfigText(
          vault.adapter,
          path,
          mergeConfigContent(path, local, content)
        );
        configApply?.applied(path);
        return;
      }
      const existing = vault.getAbstractFileByPath(path);
      if (existing === null) {
        await ensureParentFolders(vault, path);
        await vault.create(path, content);
        return;
      }
      await vault.modify(existing, content);
    },
    async writeBinaryByPath(path, bytes) {
      if (isSyncableConfigPath(path)) {
        await writeConfigBinary(vault.adapter, path, toArrayBuffer(bytes));
        configApply?.applied(path);
        return;
      }
      const existing = vault.getAbstractFileByPath(path);
      const data = toArrayBuffer(bytes);
      if (existing === null) {
        await ensureParentFolders(vault, path);
        await vault.createBinary(path, data);
        return;
      }
      await vault.modifyBinary(existing, data);
    },
    async deleteByPath(path) {
      if (isSyncableConfigPath(path)) {
        await removeConfig(vault.adapter, path);
        configApply?.applied(path);
        return;
      }
      const existing = vault.getAbstractFileByPath(path);
      if (existing !== null) {
        await vault.delete(existing);
      }
    },
    async writeConflictArtifact(path, content) {
      const targetPath = await resolveConflictTarget(vault, path);
      const existing = vault.getAbstractFileByPath(targetPath);
      if (existing === null) {
        await vault.create(targetPath, content);
        return;
      }
      await vault.modify(existing, content);
    },
    async writeBinaryConflictArtifact(path, bytes) {
      const targetPath = await resolveConflictTarget(vault, path);
      const data = toArrayBuffer(bytes);
      const existing = vault.getAbstractFileByPath(targetPath);
      if (existing === null) {
        await vault.createBinary(targetPath, data);
        return;
      }
      await vault.modifyBinary(existing, data);
    },
    recordPathOwner: (fileId, path) => state.recordPathOwner(fileId, path),
    forgetPath: (path) => state.forgetPath(path)
  };
}

// src/runtime/adapters/sync-controller.ts
var import_obsidian4 = require("obsidian");

// src/sync/sync-runner.ts
var PARENT_QUARANTINED_REASON = "parent-quarantined";
var MISSING_PARENT_REASON = "missing-parent";
function buildLineageIndex(outbox) {
  const parents = /* @__PURE__ */ new Map();
  const children = /* @__PURE__ */ new Map();
  for (const item of outbox) {
    const itemParents = item.parentRevisionIds ?? [];
    parents.set(item.revisionId, itemParents);
    for (const parentId of itemParents) {
      const list = children.get(parentId);
      if (list === void 0) {
        children.set(parentId, [item.revisionId]);
      } else {
        list.push(item.revisionId);
      }
    }
  }
  return {
    parentsOf: (revisionId) => parents.get(revisionId) ?? [],
    childrenOf: (revisionId) => children.get(revisionId) ?? []
  };
}
var DEFAULT_BASE_BACKOFF_MS = 5e3;
var DEFAULT_MAX_BACKOFF_MS = 6e4;
var DEFAULT_MAX_PUSH_BATCH_BYTES = 512 * 1024;
var DEFAULT_MAX_PUSH_BATCH_ITEMS = 64;
function decideRemoteApply(buffers, incomingContentHash) {
  const divergent = buffers.filter(
    (buffer) => buffer.currentHash !== buffer.baseHash
  );
  if (divergent.length === 0) {
    return "apply";
  }
  if (divergent.every((buffer) => buffer.currentHash === incomingContentHash)) {
    return "apply";
  }
  if (divergent.some((buffer) => buffer.baseHash === null)) {
    return "defer";
  }
  return "conflict";
}
var SyncRunner = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "inFlight", null);
    __publicField(this, "rerunRequested", false);
    __publicField(this, "failureCount", 0);
    __publicField(this, "cycleCounter", 0);
    __publicField(this, "stopped", false);
    /**
     * The server head observed on the FIRST pull after this runner was built (a
     * runner is rebuilt per connection). Every remote event at or below it belongs
     * to the one-time initial catch-up that materialises the pre-existing vault, so
     * its applies are flagged `bootstrap` and stay quiet in the Activity feed; an
     * event beyond it is a live peer edit and records a normal entry. Null until the
     * first successful pull sets it. The server returns the current head as the pull
     * `cursor` (not a page end), so it is a stable boundary even when the catch-up
     * spans several paged cycles.
     */
    __publicField(this, "bootstrapTarget", null);
    this.options = {
      baseBackoffMs: options.baseBackoffMs ?? DEFAULT_BASE_BACKOFF_MS,
      maxBackoffMs: options.maxBackoffMs ?? DEFAULT_MAX_BACKOFF_MS,
      random: options.random ?? Math.random,
      maxPushBatchBytes: options.maxPushBatchBytes ?? DEFAULT_MAX_PUSH_BATCH_BYTES,
      maxPushBatchItems: options.maxPushBatchItems ?? DEFAULT_MAX_PUSH_BATCH_ITEMS,
      ...options
    };
  }
  /**
   * Single-flight entry point. Overlapping triggers coalesce into exactly one
   * additional rerun rather than launching parallel cycles.
   *
   * A stopped runner is inert: it issues no push/pull. This is what guarantees
   * that after a reconnect (or teardown) the previous connection's runner can
   * never ship a stale-identity revision — its own backoff timer may still fire,
   * but the trigger it drives is a no-op. Only the freshly-built runner, whose
   * transport already carries the current identity, ever pushes after reconnect.
   */
  trigger() {
    if (this.stopped) {
      return Promise.resolve(idleCycleResult());
    }
    if (this.inFlight !== null) {
      this.rerunRequested = true;
      return this.inFlight;
    }
    return this.loop();
  }
  /**
   * Quiesces the runner permanently: it stops accepting triggers and cancels any
   * pending backoff (the scheduled callback re-checks `stopped` before running).
   * Called from the controller's `stop()` on teardown/reconnect so a prior-session
   * runner cannot race a push onto the wire under an identity the server no longer
   * accepts. Idempotent.
   */
  stop() {
    this.stopped = true;
  }
  async loop() {
    let result;
    do {
      this.rerunRequested = false;
      const cycle = this.runCycle();
      this.inFlight = cycle;
      try {
        result = await cycle;
      } finally {
        this.inFlight = null;
      }
    } while (this.rerunRequested && !this.stopped);
    return result;
  }
  async runCycle() {
    const cycleId = this.cycleCounter += 1;
    let result;
    try {
      const push = await this.runPush();
      const apply = await this.runPull();
      this.failureCount = 0;
      result = {
        applied: apply.applied,
        conflicts: apply.conflicts,
        cycleId,
        deferred: apply.deferred,
        pushed: push.pushed,
        quarantined: push.quarantined,
        status: apply.status,
        suppressed: apply.suppressed
      };
    } catch (error51) {
      const status = isAuthDenied(error51) ? "unauthenticated" : "offline";
      if (status === "offline") {
        this.scheduleBackoff();
      }
      result = {
        applied: 0,
        conflicts: 0,
        cycleId,
        deferred: 0,
        pushed: 0,
        quarantined: 0,
        status,
        suppressed: 0
      };
    }
    this.options.onCycleComplete?.(result);
    return result;
  }
  /**
   * Drains the outbox in size-bounded sub-batches and reconciles each per-item
   * result. A permanently rejected revision is dead-lettered (quarantined) so it
   * can never block other files or trigger an infinite retry; a transient
   * rejection is left in the outbox to retry after the next pull. A whole-request
   * permanent failure is isolated to a single item and quarantined; a transient
   * transport failure is re-thrown so the cycle backs off offline as before.
   *
   * Quarantining a revision CASCADES to its outbox descendants (the revisions
   * whose lineage transitively depends on it): a dead parent will never land, so
   * every child would otherwise be rejected with MISSING_PARENT forever. The
   * cascade dead-letters the whole lineage in topological order so descendants
   * stop retrying, and the `quarantined` count reflects the full lineage so the
   * status surface can never read a clean "synced" while a lineage is dead.
   */
  async runPush() {
    const outbox = await this.options.state.listOutbox();
    if (outbox.length === 0) {
      return { pushed: 0, quarantined: 0 };
    }
    const queue = this.planPushBatches(outbox);
    const lineage = buildLineageIndex(outbox);
    const pending = new Set(outbox.map((item) => item.revisionId));
    const accepted = /* @__PURE__ */ new Set();
    const quarantinedIds = /* @__PURE__ */ new Set();
    let pushed = 0;
    const quarantineLineage = async (rootId, rootReason) => {
      const work = [
        { id: rootId, reason: rootReason }
      ];
      while (work.length > 0) {
        const next = work.shift();
        if (next === void 0 || !pending.has(next.id)) {
          continue;
        }
        pending.delete(next.id);
        quarantinedIds.add(next.id);
        await this.options.state.quarantineOutboxItem(next.id, next.reason);
        for (const childId of lineage.childrenOf(next.id)) {
          work.push({ id: childId, reason: PARENT_QUARANTINED_REASON });
        }
      }
    };
    for (let index = 0; index < queue.length; index += 1) {
      const batch = queue[index];
      if (batch === void 0 || batch.length === 0) {
        continue;
      }
      const live = batch.filter((item) => pending.has(item.revisionId));
      if (live.length === 0) {
        continue;
      }
      let results;
      try {
        results = await this.options.transport.push(live);
      } catch (error51) {
        if (isAuthDenied(error51)) {
          throw error51;
        }
        if (isPermanentError(error51)) {
          if (live.length === 1 && live[0] !== void 0) {
            await quarantineLineage(live[0].revisionId, permanentReason(error51));
            continue;
          }
          for (const item of live) {
            queue.push([item]);
          }
          continue;
        }
        throw error51;
      }
      for (const result of results) {
        if (quarantinedIds.has(result.revisionId)) {
          continue;
        }
        if (result.outcome === "accepted" && result.receipt !== void 0) {
          await this.options.state.recordPushReceipt(result.receipt);
          pending.delete(result.revisionId);
          accepted.add(result.revisionId);
          pushed += 1;
        } else if (result.outcome === "rejected" && result.permanent === true) {
          await quarantineLineage(result.revisionId, "server-rejected");
        } else if (result.outcome === "rejected" && result.missingParent === true && !await this.parentStillViable(
          result.revisionId,
          lineage,
          pending,
          accepted
        )) {
          await quarantineLineage(result.revisionId, MISSING_PARENT_REASON);
        }
      }
    }
    return { pushed, quarantined: quarantinedIds.size };
  }
  /**
   * Whether a MISSING_PARENT child's lineage is still healthy: at least one of its
   * parents is still pending in the outbox, was accepted earlier this cycle, or
   * was locally authored on a prior cycle (already on the server). When true the
   * child stays retryable (the parent will land); when false every parent is dead
   * or absent, so the child is an orphan the runner dead-letters.
   */
  async parentStillViable(revisionId, lineage, pending, accepted) {
    for (const parentId of lineage.parentsOf(revisionId)) {
      if (pending.has(parentId) || accepted.has(parentId)) {
        return true;
      }
      if (await this.options.state.isLocallyAuthored(parentId)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Groups the outbox into sub-batches that each stay under the byte and item
   * budgets. A single revision larger than the byte budget still occupies its
   * own batch (it is the first item, so no split fires), isolating it so a 4xx
   * on that one request never wedges other files.
   */
  planPushBatches(outbox) {
    const maxBytes = this.options.maxPushBatchBytes;
    const maxItems = this.options.maxPushBatchItems;
    const batches = [];
    let current = [];
    let currentBytes = 0;
    for (const item of outbox) {
      const bytes = item.payloadBytes ?? 0;
      const wouldOverflow = current.length > 0 && (current.length >= maxItems || currentBytes + bytes > maxBytes);
      if (wouldOverflow) {
        batches.push(current);
        current = [];
        currentBytes = 0;
      }
      current.push(item);
      currentBytes += bytes;
    }
    if (current.length > 0) {
      batches.push(current);
    }
    return batches;
  }
  async runPull() {
    let cursor = await this.options.state.loadCursor();
    const { cursor: serverHead, events } = await this.options.transport.pull(cursor);
    if (this.bootstrapTarget === null) {
      this.bootstrapTarget = serverHead;
    }
    const bootstrapTarget = this.bootstrapTarget;
    const ordered = [...events].sort(
      (left, right) => left.serverSequence - right.serverSequence
    );
    let applied = 0;
    let suppressed = 0;
    let conflicts = 0;
    let deferred = 0;
    for (const remoteEvent of ordered) {
      if (remoteEvent.serverSequence <= cursor) {
        continue;
      }
      if (remoteEvent.serverSequence !== cursor + 1) {
        break;
      }
      if (await this.options.state.isLocallyAuthored(remoteEvent.revision.revisionId)) {
        suppressed += 1;
        cursor = remoteEvent.serverSequence;
        await this.options.state.saveCursor(cursor);
        continue;
      }
      const buffers = await this.options.vault.openBuffers(
        remoteEvent.revision.fileId
      );
      const decision = decideRemoteApply(
        buffers,
        remoteEvent.revision.contentHash
      );
      if (decision === "defer") {
        deferred += 1;
        break;
      }
      if (decision === "conflict") {
        await this.options.vault.recordConflict(remoteEvent);
        conflicts += 1;
      } else {
        const outcome = await this.options.vault.applyRemote(remoteEvent, {
          // At or below the connect-time head → part of the initial catch-up, so
          // its Activity entry is suppressed (baseline). Beyond it → a live edit.
          bootstrap: bootstrapTarget !== null && remoteEvent.serverSequence <= bootstrapTarget
        });
        if (outcome === "conflict") {
          conflicts += 1;
        } else {
          applied += 1;
        }
      }
      cursor = remoteEvent.serverSequence;
      await this.options.state.saveCursor(cursor);
    }
    return {
      applied,
      conflicts,
      deferred,
      status: resolveStatus({ conflicts, deferred }),
      suppressed
    };
  }
  scheduleBackoff() {
    if (this.stopped) {
      return;
    }
    this.failureCount += 1;
    const ceiling = Math.min(
      this.options.maxBackoffMs,
      this.options.baseBackoffMs * 2 ** (this.failureCount - 1)
    );
    const half = ceiling / 2;
    const delayMs = half + this.options.random() * half;
    this.options.scheduler(() => {
      void this.trigger();
    }, delayMs);
  }
};
function isAuthDenied(error51) {
  return typeof error51 === "object" && error51 !== null && error51.authDenied === true;
}
function isPermanentError(error51) {
  return typeof error51 === "object" && error51 !== null && error51.permanent === true;
}
function idleCycleResult() {
  return {
    applied: 0,
    conflicts: 0,
    deferred: 0,
    pushed: 0,
    quarantined: 0,
    status: "synced",
    suppressed: 0
  };
}
function permanentReason(error51) {
  if (error51 instanceof Error && error51.message.length > 0) {
    return error51.message;
  }
  return "permanent-http-error";
}
function resolveStatus(counts) {
  if (counts.conflicts > 0) {
    return "conflict";
  }
  if (counts.deferred > 0) {
    return "deferred";
  }
  return "synced";
}

// src/runtime/controller.ts
var OFFLINE_FAILURE_THRESHOLD = 3;
var HavemindSyncController = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "now");
    __publicField(this, "scheduler");
    __publicField(this, "lastSyncedAt");
    __publicField(this, "consecutiveFailures", 0);
    __publicField(this, "lastObservedCycleId", 0);
    this.options = options;
    this.now = options.now ?? Date.now;
    this.scheduler = new SyncScheduler({
      trigger: () => {
        void this.syncNow();
      },
      hooks: options.hooks,
      intervalMs: options.intervalMs
    });
  }
  start() {
    this.scheduler.start();
    this.options.wake?.start();
  }
  stop() {
    this.scheduler.stop();
    this.options.wake?.stop();
    this.options.runner.stop?.();
  }
  /**
   * Reacts to a push-connectivity transition by flipping the periodic poll
   * cadence: while push is connected the poll degrades to the slow heartbeat
   * (`pushConnectedIntervalMs`) because the subscription delivers real-time
   * wakes; when push is down it reverts to the normal `intervalMs` so the poll
   * alone keeps the vault fresh. Wired to the subscription's connectivity
   * callback in `buildSyncController`.
   */
  setPushConnected(connected) {
    const connectedMs = this.options.pushConnectedIntervalMs ?? this.options.intervalMs;
    this.scheduler.setIntervalMs(
      connected ? connectedMs : this.options.intervalMs
    );
  }
  async syncNow() {
    this.report("syncing");
    const result = await this.options.runner.trigger();
    this.observeCycle(result);
  }
  /**
   * Derives the indicator from the LATEST cycle outcome — never a sticky flag.
   * Called for every completed cycle: both the ones this controller triggers and
   * the ones the runner drives itself through backoff (wired via the runner's
   * `onCycleComplete`). A single transient failure shows a brief retrying state
   * and recovers to Synced on the next successful cycle; only several
   * consecutive failures declare Offline.
   */
  observeCycle(result) {
    if (result.cycleId !== void 0) {
      if (result.cycleId <= this.lastObservedCycleId) {
        return;
      }
      this.lastObservedCycleId = result.cycleId;
    }
    if (result.status === "offline") {
      this.consecutiveFailures += 1;
      const status2 = this.consecutiveFailures >= OFFLINE_FAILURE_THRESHOLD ? "offline" : "retrying";
      this.report(status2);
      return;
    }
    this.consecutiveFailures = 0;
    const status = connectionStatusFromCycle(result.status);
    if (status === "synced") {
      this.lastSyncedAt = this.now();
    }
    this.report(status);
    if (result.status === "unauthenticated") {
      this.stop();
    }
  }
  report(status) {
    this.options.onStatus(
      status,
      formatStatusBar(
        this.lastSyncedAt === void 0 ? { status } : { status, lastSyncedAt: this.lastSyncedAt }
      )
    );
  }
};

// src/runtime/sync-transport.ts
var RequestUrlTransportError = class extends Error {
  constructor(reason, message, options) {
    super(message);
    __publicField(this, "reason", reason);
    __publicField(this, "name", "RequestUrlTransportError");
    /** True on HTTP 401 — the session was refused; the loop must stop, not retry. */
    __publicField(this, "authDenied");
    /**
     * True on a whole-request 4xx the same bytes will never satisfy (400 bad
     * request, 413 payload too large, 422 invalid batch). The runner quarantines
     * the offending revision instead of retrying it forever. 5xx and network
     * failures stay transient (this is false) and keep the retry-with-backoff path.
     */
    __publicField(this, "permanent");
    this.authDenied = options?.authDenied ?? false;
    this.permanent = options?.permanent ?? false;
  }
};
var PERMANENT_SYNC_CODES = /* @__PURE__ */ new Set([
  "INVALID_REQUEST",
  "INVALID_BATCH",
  "FORBIDDEN",
  "REVISION_ID_REUSE",
  "CONFLICT",
  "NOT_FOUND"
]);
function isPermanentSyncCode(code) {
  return typeof code === "string" && PERMANENT_SYNC_CODES.has(code);
}
function isPermanentStatus(status) {
  return status === 400 || status === 403 || status === 413 || status === 422;
}
function stampCurrentIdentity(header, identity) {
  if (identity === void 0 || !isRecord10(header)) {
    return header;
  }
  return {
    ...header,
    vaultId: identity.vaultId,
    expectedMemberId: identity.memberId,
    expectedDeviceId: identity.deviceId
  };
}
var RequestUrlTransport = class {
  constructor(options) {
    __publicField(this, "options");
    this.options = options;
  }
  async push(revisions) {
    const payload = revisions.map((revision) => {
      const envelope = this.options.resolveEnvelope(revision.revisionId);
      if (envelope === void 0) {
        throw new RequestUrlTransportError(
          "unresolved-envelope",
          `No stored envelope for revision ${revision.revisionId}.`
        );
      }
      return {
        header: stampCurrentIdentity(envelope.header, this.options.identity),
        idempotencyKey: envelope.idempotencyKey,
        payload: envelope.payloadBase64
      };
    });
    const response = await this.request({
      method: "POST",
      url: `${this.options.apiBaseUrl}/vaults/${this.options.vaultId}/revisions`,
      body: JSON.stringify({ revisions: payload })
    });
    return parsePushResponse(response);
  }
  async pull(after) {
    const epoch = this.options.serverEpoch?.() ?? null;
    const query = epoch === null ? `after=${after}` : `after=${after}&epoch=${encodeURIComponent(epoch)}`;
    const response = await this.request({
      method: "GET",
      url: `${this.options.apiBaseUrl}/vaults/${this.options.vaultId}/events?${query}`
    });
    return parsePullResponse(response);
  }
  async request(init) {
    const token = await this.options.getAuthToken();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (init.body !== void 0) {
      headers["Content-Type"] = "application/json";
    }
    const response = await this.options.requestUrl({
      ...init,
      headers,
      throw: false
    });
    if (response.status < 200 || response.status >= 300) {
      throw new RequestUrlTransportError(
        "http-status",
        `Server returned HTTP ${response.status}.`,
        {
          authDenied: response.status === 401,
          permanent: isPermanentStatus(response.status)
        }
      );
    }
    return response;
  }
};
function parsePushResponse(response) {
  const body = response.json;
  if (!isRecord10(body) || !Array.isArray(body.results)) {
    throw malformed("push response missing results array");
  }
  return body.results.map((result) => {
    if (!isRecord10(result) || typeof result.revisionId !== "string") {
      throw malformed("push result missing revisionId");
    }
    if (result.status === "rejected") {
      return {
        revisionId: result.revisionId,
        outcome: "rejected",
        permanent: isPermanentSyncCode(result.code),
        // Surface MISSING_PARENT so the runner can resolve the lineage: terminal
        // for an orphaned child (dead parent) but retryable while the parent is
        // still pending. Omitted otherwise so unrelated rejections are unchanged.
        ...result.code === "MISSING_PARENT" ? { missingParent: true } : {}
      };
    }
    if (!isRecord10(result.receipt)) {
      throw malformed("push result missing receipt");
    }
    const receiptRevisionId = result.receipt.revisionId;
    const serverSequence = result.receipt.serverSequence;
    if (typeof receiptRevisionId !== "string" || !Number.isSafeInteger(serverSequence) || serverSequence < 0) {
      throw malformed("push receipt has invalid identity or sequence");
    }
    return {
      revisionId: result.revisionId,
      outcome: "accepted",
      receipt: {
        revisionId: receiptRevisionId,
        serverSequence
      }
    };
  });
}
function parsePullResponse(response) {
  const body = response.json;
  if (!isRecord10(body) || !Number.isSafeInteger(body.cursor) || !Array.isArray(body.events)) {
    throw malformed("pull response missing cursor or events");
  }
  const events = body.events.map((raw) => {
    if (!isRecord10(raw) || !Number.isSafeInteger(raw.serverSequence) || typeof raw.revisionId !== "string" || typeof raw.fileId !== "string" || !isRecord10(raw.receipt) || typeof raw.receipt.blobHash !== "string") {
      throw malformed("pull event is malformed");
    }
    const rawParents = raw.receipt.parentRevisionIds;
    const parentRevisionIds = Array.isArray(rawParents) && rawParents.every((parent) => typeof parent === "string") ? rawParents : void 0;
    return {
      serverSequence: raw.serverSequence,
      revision: {
        revisionId: raw.revisionId,
        fileId: raw.fileId,
        contentHash: raw.receipt.blobHash,
        ...parentRevisionIds === void 0 ? {} : { parentRevisionIds }
      }
    };
  });
  return { cursor: body.cursor, events };
}
function malformed(detail) {
  return new RequestUrlTransportError("malformed-response", detail);
}
function isRecord10(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/wake-subscription.ts
var DEFAULT_BASE_BACKOFF_MS2 = 5e3;
var DEFAULT_MAX_BACKOFF_MS2 = 6e4;
var DEFAULT_SETTLE_DELAY_MS = 250;
var WakeAuthDeniedError = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "WakeAuthDeniedError");
    __publicField(this, "authDenied", true);
  }
};
var WakeSubscription = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "stopped", false);
    __publicField(this, "started", false);
    __publicField(this, "failureCount", 0);
    /**
     * The cursor sent on the /wait that last resolved as an advance and fired a
     * wake, or `null` when no wake is awaiting settlement. While set, the loop
     * waits for the durable cursor to advance past it (syncNow landing) before
     * re-arming the long-poll, so it never re-issues a fast-path /wait for the
     * same still-behind cursor.
     */
    __publicField(this, "pendingSyncFromCursor", null);
    /** null until the first edge is emitted, so the very first state is reported. */
    __publicField(this, "connected", null);
    __publicField(this, "runPromise", Promise.resolve());
    this.options = {
      scheduler: options.scheduler ?? ((callback, delayMs) => {
        setTimeout(callback, delayMs);
      }),
      random: options.random ?? Math.random,
      baseBackoffMs: options.baseBackoffMs ?? DEFAULT_BASE_BACKOFF_MS2,
      maxBackoffMs: options.maxBackoffMs ?? DEFAULT_MAX_BACKOFF_MS2,
      settleDelayMs: options.settleDelayMs ?? DEFAULT_SETTLE_DELAY_MS,
      ...options
    };
  }
  /** Arms the long-poll loop. Idempotent; a no-op once stopped. */
  start() {
    if (this.started || this.stopped) {
      return;
    }
    this.started = true;
    this.runPromise = this.runLoop();
  }
  /**
   * Quiesces the subscription permanently: no further long-poll is issued (a poll
   * already in flight resolves and the loop then exits before re-issuing).
   * Idempotent.
   */
  stop() {
    this.stopped = true;
  }
  /** Resolves once the loop has fully stopped — a teardown/test synchronisation aid. */
  async whenStopped() {
    await this.runPromise;
  }
  async runLoop() {
    while (!this.stopped) {
      let sentCursor;
      let resolvedCursor;
      try {
        sentCursor = await this.options.loadCursor();
        if (this.pendingSyncFromCursor !== null && sentCursor <= this.pendingSyncFromCursor) {
          await this.settleDelay();
          continue;
        }
        this.pendingSyncFromCursor = null;
        resolvedCursor = await this.pollOnce(sentCursor);
      } catch (error51) {
        if (this.stopped) {
          return;
        }
        this.setConnected(false);
        if (isAuthDenied2(error51)) {
          this.stopped = true;
          return;
        }
        await this.backoff();
        continue;
      }
      if (this.stopped) {
        return;
      }
      this.failureCount = 0;
      this.setConnected(true);
      if (resolvedCursor > sentCursor) {
        this.pendingSyncFromCursor = sentCursor;
        this.options.onWake();
      } else {
        this.pendingSyncFromCursor = null;
      }
    }
  }
  /** Bounded pause between re-checks while a fired wake settles. */
  settleDelay() {
    return new Promise((resolve) => {
      this.options.scheduler(() => resolve(), this.options.settleDelayMs);
    });
  }
  async pollOnce(cursor) {
    const token = await this.options.getAuthToken();
    const response = await this.options.requestUrl({
      method: "GET",
      url: `${this.options.apiBaseUrl}/vaults/${this.options.vaultId}/wait?cursor=${cursor}`,
      headers: { Authorization: `Bearer ${token}` },
      throw: false
    });
    if (response.status === 401) {
      throw new WakeAuthDeniedError("wake long-poll refused (HTTP 401)");
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`wake long-poll returned HTTP ${response.status}`);
    }
    const body = response.json;
    if (!isRecord11(body) || !Number.isSafeInteger(body.cursor)) {
      throw new Error("wake long-poll response missing numeric cursor");
    }
    return body.cursor;
  }
  backoff() {
    this.failureCount += 1;
    const ceiling = Math.min(
      this.options.maxBackoffMs,
      this.options.baseBackoffMs * 2 ** (this.failureCount - 1)
    );
    const half = ceiling / 2;
    const delayMs = half + this.options.random() * half;
    return new Promise((resolve) => {
      this.options.scheduler(() => resolve(), delayMs);
    });
  }
  setConnected(next) {
    if (this.connected === next) {
      return;
    }
    this.connected = next;
    this.options.onConnectedChange?.(next);
  }
};
function isAuthDenied2(error51) {
  return typeof error51 === "object" && error51 !== null && error51.authDenied === true;
}
function isRecord11(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/adapters/sync-controller.ts
var DEFAULT_INTERVAL_MS = 15 * 1e3;
var PUSH_CONNECTED_INTERVAL_MS = 6e4;
function buildSyncController(plugin, connection, onStatus, hooks, producerSync, fileApplyLock) {
  const state = new DurableSyncState({
    persist: createPersistPort(plugin),
    // Arch P1: keep large outbox payload bytes out of `data.json`. Best-effort —
    // degrades to inline when IndexedDB is unavailable (see the factory).
    payloadStore: createOutboxPayloadStore(plugin)
  });
  const transport = new RequestUrlTransport({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connection.apiBaseUrl,
    vaultId: connection.vaultId,
    getAuthToken: connection.getAuthToken,
    resolveEnvelope: (revisionId) => state.peekEnvelope(revisionId),
    ...connection.serverEpoch === void 0 ? {} : { serverEpoch: connection.serverEpoch },
    ...connection.pushIdentity === void 0 ? {} : {
      identity: {
        vaultId: connection.vaultId,
        memberId: connection.pushIdentity.memberId,
        deviceId: connection.pushIdentity.deviceId
      }
    }
  });
  const vault = new VaultApplyAdapter({
    files: createVaultFilePort({
      vault: plugin.app.vault,
      state,
      // A remotely-applied appearance file used to stay INVISIBLE until the
      // receiving device restarted Obsidian, because Obsidian caches its config
      // in memory and the plugin never signalled a reload. `css-change` is the
      // documented workspace event that makes it re-read snippets and themes.
      configApply: createConfigApplyReloader({
        triggerCssChange: () => {
          plugin.app.workspace.trigger?.("css-change");
        },
        notify: (message) => {
          new import_obsidian4.Notice(message);
        }
      })
    }),
    conflictFolder: CONFLICT_FOLDER,
    resolveRevision: connection.resolveRevision,
    // AUD-03: the apply-side base hash must be computed over the SAME canonical
    // content form the push producer uses (`hashPlaintext` = SHA-256 over
    // `canonicalizeMarkdown`), so a base seeded by a local push and an on-disk
    // read compare on equal terms. Never the raw token digest below.
    hashContent: (content) => hashPlaintext(content),
    // FIX 1: a genuinely applied remote revision (never 'noop'/'conflict')
    // reaches the Activity feed too, attributed to `remote` — previously only
    // the local-change wrapper ever recorded an entry, so the other device's
    // edits never showed up.
    ...hooks?.onRemoteActivity === void 0 ? {} : {
      onRemoteApplied: (event) => {
        const entry = remoteAppliedToActivityEntryOrNull(event, Date.now());
        if (entry !== null) {
          hooks.onRemoteActivity?.(entry);
        }
      }
    },
    // FIX 2 (re-entrancy): keep the push producer's mapping in lockstep with
    // apply writes so the reflected vault event is deduped, never re-pushed,
    // re-attributed, or given a fresh fileId.
    ...producerSync === void 0 ? {} : { producerSync },
    // MRG-05: signal a debounced auto-repair sweep whenever a NEW conflict copy
    // lands (never on an idempotent rewrite — no self-retrigger).
    ...hooks?.onConflictWritten === void 0 ? {} : { onConflictWritten: hooks.onConflictWritten },
    // TOCTOU close (rule 3): the SAME per-file lock the push producer holds, so
    // a local write can never land and be clobbered between apply's read and its
    // write for one file. Different files still apply/produce concurrently.
    ...fileApplyLock === void 0 ? {} : { lock: fileApplyLock }
  });
  const controllerRef = {};
  const runner = new SyncRunner({
    transport,
    state,
    vault,
    scheduler: createBackoffScheduler(),
    onCycleComplete: (result) => controllerRef.current?.observeCycle(result)
  });
  let wake;
  try {
    wake = new WakeSubscription({
      requestUrl: createRequestUrlFn(),
      apiBaseUrl: connection.apiBaseUrl,
      vaultId: connection.vaultId,
      getAuthToken: connection.getAuthToken,
      loadCursor: () => state.loadCursor(),
      onWake: () => {
        void controllerRef.current?.syncNow();
      },
      onConnectedChange: (connected) => {
        controllerRef.current?.setPushConnected(connected);
      }
    });
  } catch (error51) {
    wake = void 0;
    console.error(
      "Havemind: real-time push setup failed; continuing poll-only",
      error51
    );
  }
  const controller = new HavemindSyncController({
    runner,
    hooks: createSchedulerHooks(plugin),
    intervalMs: connection.intervalMs ?? DEFAULT_INTERVAL_MS,
    onStatus,
    // Push is optional: omit `wake` entirely on the poll-only fallback path so
    // the controller never tries to start a subscription that failed to build.
    ...wake === void 0 ? {} : { wake, pushConnectedIntervalMs: PUSH_CONNECTED_INTERVAL_MS }
  });
  controllerRef.current = controller;
  return { controller, state };
}

// src/runtime/adapters/status-constants.ts
var HAVEMIND_STATUS_DISCONNECTED = formatStatusBar({
  status: "disconnected"
});
var HAVEMIND_STATUS_RESET_REQUIRED = formatStatusBar({
  status: "reset-required"
});

// src/onboarding/controller.ts
var CLIENT_PROTOCOL = Object.freeze({
  major: 1,
  minMinor: 0,
  maxMinor: 0
});
var DISCOVERY_PATH = "/.well-known/havemind";
var TOKEN_PAYLOAD_PATTERN2 = /^[A-Za-z0-9_-]{43}$/u;
var UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
var SAFE_IDENTIFIER_PATTERN = /^[A-Za-z0-9_-]{1,256}$/u;
var CAPABILITY_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-v[1-9][0-9]*$/u;
var MAX_BOOTSTRAP_PAGE_ITEMS = 1e3;
var VERIFICATION_PIN_PATTERN = /^[0-9]{6}$/u;
var ERROR_MESSAGES = {
  "credential-storage-failed": "Secure credential storage failed.",
  "incompatible-protocol": "The server protocol is not compatible.",
  "invalid-device-label": "The device name is invalid.",
  "invalid-generated-credential": "Secure credential generation failed.",
  "invalid-response": "The server returned an invalid response.",
  "invalid-state": "The saved onboarding state is invalid.",
  "invitation-expired": "The invitation has expired.",
  "missing-credential": "A required secure credential is missing.",
  "origin-mismatch": "The server tried to use another HTTPS origin.",
  "redirect-refused": "The server request attempted to redirect.",
  "remote-failed": "The server request failed.",
  "review-required": "Review the invitation before continuing.",
  "storage-failed": "Durable onboarding storage failed."
};
var OnboardingError = class extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);
    __publicField(this, "code", code);
    __publicField(this, "name", "OnboardingError");
  }
  toJSON() {
    return { code: this.code, message: this.message, name: this.name };
  }
};
var OnboardingController = class {
  constructor(options) {
    __publicField(this, "clock");
    __publicField(this, "createInitialRefreshToken");
    __publicField(this, "createRejoinSecret");
    __publicField(this, "createRedemptionId");
    __publicField(this, "remoteApi");
    __publicField(this, "secrets");
    __publicField(this, "store");
    __publicField(this, "activeInvitation", null);
    __publicField(this, "currentState", { phase: "idle" });
    this.clock = options.clock;
    this.createInitialRefreshToken = options.createInitialRefreshToken ?? generateRefreshToken;
    this.createRejoinSecret = options.createRejoinSecret ?? generateRejoinSecret;
    this.createRedemptionId = options.createRedemptionId ?? generateCanonicalUuid;
    this.remoteApi = options.remoteApi;
    this.secrets = options.secrets;
    this.store = options.store;
  }
  get state() {
    return structuredClone(this.currentState);
  }
  beginFromPastedEnvelope(canonicalEnvelope) {
    const parsed = parseInviteEnvelope(canonicalEnvelope);
    this.activeInvitation = { canonicalEnvelope, parsed };
    this.currentState = {
      phase: "origin-review",
      serverOrigin: parsed.serverOrigin
    };
    return this.state;
  }
  async loadInvitationReview() {
    if (this.currentState.phase !== "origin-review" || !this.activeInvitation || this.activeInvitation.parsed.serverOrigin !== this.currentState.serverOrigin) {
      throw new OnboardingError("review-required");
    }
    const invitation = this.activeInvitation.parsed;
    const discoveryUrl = `${invitation.serverOrigin}${DISCOVERY_PATH}`;
    const discoveryResponse = await this.callRemote(
      () => this.remoteApi.discover({ redirect: "error", url: discoveryUrl })
    );
    const discovery = parseDiscoveryResponse(
      discoveryResponse,
      discoveryUrl,
      invitation.serverOrigin
    );
    const reviewUrl = `${discovery.apiBaseUrl}/invitations/review`;
    const reviewResponse = await this.callRemote(
      () => this.remoteApi.reviewInvitation({
        invitationToken: invitation.invitationToken,
        redirect: "error",
        url: reviewUrl
      })
    );
    const review = parseInvitationReviewResponse(reviewResponse, reviewUrl);
    if (Date.parse(review.expiresAt) <= this.clock.now()) {
      throw new OnboardingError("invitation-expired");
    }
    this.currentState = {
      ...review,
      apiBaseUrl: discovery.apiBaseUrl,
      phase: "invitation-review",
      protocolVersion: discovery.protocolVersion,
      serverName: discovery.serverName,
      serverOrigin: invitation.serverOrigin
    };
    return this.state;
  }
  async confirmInvitation(deviceLabel) {
    if (this.currentState.phase !== "invitation-review" || !this.activeInvitation) {
      throw new OnboardingError("review-required");
    }
    assertDeviceLabel(deviceLabel);
    if (Date.parse(this.currentState.expiresAt) <= this.clock.now()) {
      throw new OnboardingError("invitation-expired");
    }
    const redemptionId = this.createRedemptionId();
    const initialRefreshToken = this.createInitialRefreshToken();
    const rejoinSecret = this.createRejoinSecret();
    if (!UUID_PATTERN.test(redemptionId)) {
      throw new OnboardingError("invalid-generated-credential");
    }
    assertGeneratedToken(initialRefreshToken, "hm_rt_");
    assertGeneratedToken(rejoinSecret, "hm_rj_");
    await this.writeSecret(
      () => this.secrets.saveRefreshToken(initialRefreshToken)
    );
    await this.writeSecret(
      () => this.secrets.saveRejoinSecret(rejoinSecret)
    );
    await this.writeSecret(
      () => this.secrets.saveInvitationEnvelope(
        this.activeInvitation?.canonicalEnvelope ?? ""
      )
    );
    const redeeming = {
      ...connectionMetadata(this.currentState),
      deviceLabel,
      phase: "redeeming",
      redemptionId,
      version: 1
    };
    await this.saveState(redeeming);
    this.currentState = redeeming;
    return this.redeem(redeeming, this.activeInvitation.parsed);
  }
  async resume() {
    const stored = await this.loadState();
    if (stored === null) {
      const envelope = await this.readSecret(
        () => this.secrets.getInvitationEnvelope()
      );
      if (envelope !== null) return this.beginFromPastedEnvelope(envelope);
      this.currentState = { phase: "idle" };
      return this.state;
    }
    const durable = parseDurableState(stored);
    this.currentState = durable;
    switch (durable.phase) {
      case "redeeming":
        return this.resumeRedemption(durable);
      case "pending-approval":
        return this.pollApproval(durable);
      case "approval-received":
        return this.beginBootstrap(durable);
      case "bootstrapping":
        return this.fetchBootstrapPage(durable);
      case "connected":
        await this.requireRefreshToken();
        return this.state;
    }
  }
  async resumeRedemption(state) {
    const canonicalEnvelope = await this.readSecret(
      () => this.secrets.getInvitationEnvelope()
    );
    if (canonicalEnvelope === null) {
      throw new OnboardingError("missing-credential");
    }
    const invitation = parseInviteEnvelopeSafely(canonicalEnvelope);
    if (invitation.serverOrigin !== state.serverOrigin) {
      throw new OnboardingError("invalid-state");
    }
    this.activeInvitation = { canonicalEnvelope, parsed: invitation };
    return this.redeem(state, invitation);
  }
  async redeem(state, invitation) {
    const initialRefreshToken = await this.requireRefreshToken();
    const rejoinSecret = await this.requireRejoinSecret();
    const url2 = `${state.apiBaseUrl}/invitations/redeem`;
    const response = await this.callRemote(
      () => this.remoteApi.redeemInvitation({
        deviceLabel: state.deviceLabel,
        initialRefreshToken,
        invitationToken: invitation.invitationToken,
        redemptionId: state.redemptionId,
        rejoinSecret,
        redirect: "error",
        url: url2
      })
    );
    const pending = parsePendingRedemptionResponse(response, url2);
    await this.writeSecret(
      () => this.secrets.savePendingCredential(pending.pendingCredential)
    );
    const pendingState = {
      ...connectionMetadata(state),
      pendingDeviceId: pending.pendingDeviceId,
      phase: "pending-approval",
      verificationPhrase: pending.verificationPhrase,
      version: 1
    };
    await this.saveState(pendingState);
    this.currentState = pendingState;
    await this.clearSecretBestEffort(
      () => this.secrets.clearInvitationEnvelope()
    );
    this.activeInvitation = null;
    return this.state;
  }
  async pollApproval(state) {
    await this.requireRefreshToken();
    const pendingCredential = await this.readSecret(
      () => this.secrets.getPendingCredential()
    );
    if (pendingCredential === null) {
      throw new OnboardingError("missing-credential");
    }
    assertStoredToken(pendingCredential, "hm_pd_");
    const url2 = `${state.apiBaseUrl}/devices/${state.pendingDeviceId}/approval`;
    const response = await this.callRemote(
      () => this.remoteApi.pollApproval({
        pendingCredential,
        redirect: "error",
        url: url2
      })
    );
    const approval = parseApprovalResponse(response, url2);
    if (approval.status === "pending") return this.state;
    if (approval.status === "rejected") {
      await this.clearSecretBestEffort(
        () => this.secrets.clearPendingCredential()
      );
      this.currentState = { phase: "rejected" };
      return this.state;
    }
    const approved = {
      ...connectionMetadata(state),
      // Replace the review's memberId (the invitee's user id) with the active
      // membership id the server minted at approval. This is the id POST
      // /revisions authorises `expectedMemberId` against, so once it lands in the
      // connection's push identity the invitee's revisions are accepted instead
      // of 403'd. Every later phase copies it forward via connectionMetadata.
      memberId: approval.membershipId,
      bootstrapCursor: approval.bootstrapCursor,
      deviceId: approval.deviceId,
      downloadedItems: 0,
      pendingDeviceId: state.pendingDeviceId,
      phase: "approval-received",
      version: 1
    };
    await this.saveState(approved);
    this.currentState = approved;
    return this.state;
  }
  async beginBootstrap(state) {
    await this.requireRefreshToken();
    const bootstrapping = {
      ...connectionMetadata(state),
      bootstrapCursor: state.bootstrapCursor,
      deviceId: state.deviceId,
      downloadedItems: state.downloadedItems,
      phase: "bootstrapping",
      version: 1
    };
    await this.saveState(bootstrapping);
    this.currentState = bootstrapping;
    await this.clearSecretBestEffort(
      () => this.secrets.clearPendingCredential()
    );
    return this.state;
  }
  async fetchBootstrapPage(state) {
    const refreshToken = await this.requireRefreshToken();
    const url2 = `${state.apiBaseUrl}/bootstrap`;
    const response = await this.callRemote(
      () => this.remoteApi.fetchBootstrapPage({
        cursor: state.bootstrapCursor,
        redirect: "error",
        refreshToken,
        url: url2,
        vaultId: state.vaultId
      })
    );
    const page = parseBootstrapResponse(response, url2);
    if (!page.complete && page.nextCursor === state.bootstrapCursor) {
      throw new OnboardingError("invalid-response");
    }
    const downloadedItems = state.downloadedItems + page.items.length;
    const nextState = page.complete ? {
      ...connectionMetadata(state),
      deviceId: state.deviceId,
      downloadedItems,
      phase: "connected",
      version: 1
    } : {
      ...connectionMetadata(state),
      bootstrapCursor: page.nextCursor,
      deviceId: state.deviceId,
      downloadedItems,
      phase: "bootstrapping",
      version: 1
    };
    try {
      await this.store.commitBootstrapPage(page.items, nextState);
    } catch {
      throw new OnboardingError("storage-failed");
    }
    this.currentState = nextState;
    return this.state;
  }
  async requireRefreshToken() {
    const refreshToken = await this.readSecret(
      () => this.secrets.getRefreshToken()
    );
    if (refreshToken === null) {
      throw new OnboardingError("missing-credential");
    }
    assertStoredToken(refreshToken, "hm_rt_");
    return refreshToken;
  }
  /**
   * The device's rejoin secret, persisted at confirmInvitation. If a redemption
   * that began before this feature is resumed without a stored secret, mint and
   * persist a fresh one — the server stores whatever hash it receives, so this
   * still provisions a valid rejoin capability for the device.
   */
  async requireRejoinSecret() {
    const existing = await this.readSecret(
      () => this.secrets.getRejoinSecret()
    );
    if (existing !== null) {
      assertStoredToken(existing, "hm_rj_");
      return existing;
    }
    const minted = this.createRejoinSecret();
    assertGeneratedToken(minted, "hm_rj_");
    await this.writeSecret(() => this.secrets.saveRejoinSecret(minted));
    return minted;
  }
  async callRemote(request) {
    try {
      return await request();
    } catch (error51) {
      if (error51 instanceof OnboardingError) throw error51;
      throw new OnboardingError("remote-failed");
    }
  }
  async loadState() {
    try {
      return await this.store.loadState();
    } catch {
      throw new OnboardingError("storage-failed");
    }
  }
  async saveState(state) {
    try {
      await this.store.saveState(state);
    } catch {
      throw new OnboardingError("storage-failed");
    }
  }
  async readSecret(read) {
    try {
      return await read();
    } catch {
      throw new OnboardingError("credential-storage-failed");
    }
  }
  async writeSecret(write) {
    try {
      await write();
    } catch {
      throw new OnboardingError("credential-storage-failed");
    }
  }
  async clearSecretBestEffort(clear) {
    try {
      await clear();
    } catch {
    }
  }
};
function parseDiscoveryResponse(response, expectedUrl, expectedOrigin) {
  const body = parseSuccessfulResponse(response, expectedUrl);
  if (!hasExactKeys(body, [
    "apiBaseUrl",
    "authMethods",
    "capabilities",
    "name",
    "protocol",
    "service"
  ]) || body.service !== "havemind" || !isCanonicalDisplayText(body.name, 80) || !Array.isArray(body.authMethods) || body.authMethods.length !== 1 || body.authMethods[0] !== "opaque-token" || !Array.isArray(body.capabilities) || body.capabilities.length > 64 || body.capabilities.some(
    (capability) => typeof capability !== "string" || !CAPABILITY_PATTERN.test(capability)
  ) || !isRecord12(body.protocol) || !hasExactKeys(body.protocol, ["major", "maxMinor", "minMinor"]) || !isNonnegativeInteger(body.protocol.major) || !isNonnegativeInteger(body.protocol.minMinor) || !isNonnegativeInteger(body.protocol.maxMinor) || body.protocol.minMinor > body.protocol.maxMinor || typeof body.apiBaseUrl !== "string") {
    throw new OnboardingError("invalid-response");
  }
  const apiBaseUrl = parseCanonicalApiBaseUrl(
    body.apiBaseUrl,
    expectedOrigin
  );
  const protocolVersion = negotiateProtocol({
    major: body.protocol.major,
    maxMinor: body.protocol.maxMinor,
    minMinor: body.protocol.minMinor
  });
  return {
    apiBaseUrl,
    protocolVersion,
    serverName: body.name
  };
}
function parseInvitationReviewResponse(response, expectedUrl) {
  const body = parseSuccessfulResponse(response, expectedUrl);
  if (!hasExactKeys(body, [
    "expiresAt",
    "intendedMemberDisplayName",
    "inviterDisplayName",
    "memberId",
    "vaultId",
    "vaultName",
    "version"
  ]) || body.version !== 1 || !isCanonicalUuid(body.vaultId) || !isCanonicalUuid(body.memberId) || !isCanonicalDisplayText(body.vaultName, 120) || !isCanonicalDisplayText(body.inviterDisplayName, 80) || !isCanonicalDisplayText(body.intendedMemberDisplayName, 80) || !isCanonicalIsoTimestamp(body.expiresAt)) {
    throw new OnboardingError("invalid-response");
  }
  return {
    expiresAt: body.expiresAt,
    intendedMemberDisplayName: body.intendedMemberDisplayName,
    inviterDisplayName: body.inviterDisplayName,
    memberId: body.memberId,
    vaultId: body.vaultId,
    vaultName: body.vaultName
  };
}
function parsePendingRedemptionResponse(response, expectedUrl) {
  const body = parseSuccessfulResponse(response, expectedUrl);
  if (!hasExactKeys(body, [
    "pendingCredential",
    "pendingDeviceId",
    "status",
    "verificationPhrase"
  ]) || body.status !== "pending" || !isCanonicalUuid(body.pendingDeviceId) || !isCanonicalToken(body.pendingCredential, "hm_pd_") || !isVerificationPin(body.verificationPhrase)) {
    throw new OnboardingError("invalid-response");
  }
  return {
    pendingCredential: body.pendingCredential,
    pendingDeviceId: body.pendingDeviceId,
    verificationPhrase: body.verificationPhrase
  };
}
function parseApprovalResponse(response, expectedUrl) {
  const body = parseSuccessfulResponse(response, expectedUrl);
  if (hasExactKeys(body, ["status"]) && body.status === "pending") {
    return { status: "pending" };
  }
  if (hasExactKeys(body, ["status"]) && body.status === "rejected") {
    return { status: "rejected" };
  }
  if (!hasExactKeys(body, ["bootstrapCursor", "deviceId", "membershipId", "status"]) || body.status !== "approved" || !isCanonicalUuid(body.deviceId) || !isCanonicalUuid(body.membershipId) || !isCursor(body.bootstrapCursor)) {
    throw new OnboardingError("invalid-response");
  }
  return {
    bootstrapCursor: body.bootstrapCursor,
    deviceId: body.deviceId,
    membershipId: body.membershipId,
    status: "approved"
  };
}
function parseBootstrapResponse(response, expectedUrl) {
  const body = parseSuccessfulResponse(response, expectedUrl);
  if (!hasExactKeys(body, [
    "complete",
    "items",
    "nextCursor",
    "version"
  ]) || body.version !== 1 || typeof body.complete !== "boolean" || !Array.isArray(body.items) || body.items.length > MAX_BOOTSTRAP_PAGE_ITEMS || !isCursor(body.nextCursor) || body.complete && body.nextCursor !== null || !body.complete && body.nextCursor === null) {
    throw new OnboardingError("invalid-response");
  }
  return {
    complete: body.complete,
    items: body.items,
    nextCursor: body.nextCursor
  };
}
function parseSuccessfulResponse(response, expectedUrl) {
  if (!isRecord12(response) || response.finalUrl !== expectedUrl) {
    throw new OnboardingError("redirect-refused");
  }
  if (response.status !== 200) throw new OnboardingError("remote-failed");
  if (!isRecord12(response.body)) {
    throw new OnboardingError("invalid-response");
  }
  return response.body;
}
function parseCanonicalApiBaseUrl(value, expectedOrigin) {
  let url2;
  try {
    url2 = new URL(value);
  } catch {
    throw new OnboardingError("invalid-response");
  }
  const canonicalValue = url2.pathname === "/" ? url2.origin : url2.href;
  if (url2.protocol !== "https:" || url2.origin !== expectedOrigin || url2.username !== "" || url2.password !== "" || url2.search !== "" || url2.hash !== "" || value !== canonicalValue || url2.pathname !== "/" && url2.pathname.endsWith("/")) {
    throw new OnboardingError("origin-mismatch");
  }
  return value;
}
function negotiateProtocol(server) {
  if (server.major !== CLIENT_PROTOCOL.major) {
    throw new OnboardingError("incompatible-protocol");
  }
  const minimum = Math.max(server.minMinor, CLIENT_PROTOCOL.minMinor);
  const maximum = Math.min(server.maxMinor, CLIENT_PROTOCOL.maxMinor);
  if (minimum > maximum) {
    throw new OnboardingError("incompatible-protocol");
  }
  return { major: CLIENT_PROTOCOL.major, minor: maximum };
}
function parseDurableState(value) {
  if (!isRecord12(value) || typeof value.phase !== "string") {
    throw new OnboardingError("invalid-state");
  }
  const phase = value.phase;
  const phaseKeys = {
    "approval-received": [
      "bootstrapCursor",
      "deviceId",
      "downloadedItems",
      "pendingDeviceId"
    ],
    bootstrapping: [
      "bootstrapCursor",
      "deviceId",
      "downloadedItems"
    ],
    connected: ["deviceId", "downloadedItems"],
    "pending-approval": [
      "pendingDeviceId",
      "verificationPhrase"
    ],
    redeeming: ["deviceLabel", "redemptionId"]
  };
  if (!Object.hasOwn(phaseKeys, phase)) {
    throw new OnboardingError("invalid-state");
  }
  const expectedKeys = [
    "apiBaseUrl",
    "expiresAt",
    "intendedMemberDisplayName",
    "inviterDisplayName",
    "memberId",
    "phase",
    "protocolVersion",
    "serverName",
    "serverOrigin",
    "vaultId",
    "vaultName",
    "version",
    ...phaseKeys[phase]
  ];
  if (!hasExactKeys(value, expectedKeys) || value.version !== 1) {
    throw new OnboardingError("invalid-state");
  }
  validateStoredConnectionMetadata(value);
  switch (phase) {
    case "redeeming":
      if (!isCanonicalDisplayText(value.deviceLabel, 80) || !isCanonicalUuid(value.redemptionId)) {
        throw new OnboardingError("invalid-state");
      }
      break;
    case "pending-approval":
      if (!isCanonicalUuid(value.pendingDeviceId) || !isVerificationPin(value.verificationPhrase)) {
        throw new OnboardingError("invalid-state");
      }
      break;
    case "approval-received":
      if (!isCanonicalUuid(value.pendingDeviceId) || !isCanonicalUuid(value.deviceId) || !isCursor(value.bootstrapCursor) || !isNonnegativeInteger(value.downloadedItems)) {
        throw new OnboardingError("invalid-state");
      }
      break;
    case "bootstrapping":
      if (!isCanonicalUuid(value.deviceId) || !isCursor(value.bootstrapCursor) || !isNonnegativeInteger(value.downloadedItems)) {
        throw new OnboardingError("invalid-state");
      }
      break;
    case "connected":
      if (!isCanonicalUuid(value.deviceId) || !isNonnegativeInteger(value.downloadedItems)) {
        throw new OnboardingError("invalid-state");
      }
      break;
    default:
      throw new OnboardingError("invalid-state");
  }
  return structuredClone(value);
}
function validateStoredConnectionMetadata(value) {
  if (typeof value.serverOrigin !== "string" || !isCanonicalHttpsOrigin(value.serverOrigin) || typeof value.apiBaseUrl !== "string" || !isApiBaseForOrigin(value.apiBaseUrl, value.serverOrigin) || !isCanonicalDisplayText(value.serverName, 80) || !isCanonicalDisplayText(value.vaultName, 120) || !isCanonicalDisplayText(value.inviterDisplayName, 80) || !isCanonicalDisplayText(value.intendedMemberDisplayName, 80) || !isCanonicalUuid(value.vaultId) || !isCanonicalUuid(value.memberId) || !isCanonicalIsoTimestamp(value.expiresAt) || !isRecord12(value.protocolVersion) || !hasExactKeys(value.protocolVersion, ["major", "minor"]) || value.protocolVersion.major !== 1 || value.protocolVersion.minor !== 0) {
    throw new OnboardingError("invalid-state");
  }
}
function connectionMetadata(state) {
  return {
    apiBaseUrl: state.apiBaseUrl,
    expiresAt: state.expiresAt,
    intendedMemberDisplayName: state.intendedMemberDisplayName,
    inviterDisplayName: state.inviterDisplayName,
    memberId: state.memberId,
    protocolVersion: structuredClone(state.protocolVersion),
    serverName: state.serverName,
    serverOrigin: state.serverOrigin,
    vaultId: state.vaultId,
    vaultName: state.vaultName
  };
}
function assertDeviceLabel(value) {
  if (!isCanonicalDisplayText(value, 80)) {
    throw new OnboardingError("invalid-device-label");
  }
}
function assertGeneratedToken(value, prefix) {
  if (!isCanonicalToken(value, prefix)) {
    throw new OnboardingError("invalid-generated-credential");
  }
}
function assertStoredToken(value, prefix) {
  if (!isCanonicalToken(value, prefix)) {
    throw new OnboardingError("missing-credential");
  }
}
function isCanonicalToken(value, prefix) {
  if (typeof value !== "string" || !value.startsWith(prefix) || value.length !== prefix.length + 43) {
    return false;
  }
  const payload = value.slice(prefix.length);
  if (!TOKEN_PAYLOAD_PATTERN2.test(payload)) return false;
  try {
    const bytes = decodeBase64Url2(payload);
    return bytes.byteLength === 32 && encodeBase64Url2(bytes) === payload;
  } catch {
    return false;
  }
}
function isVerificationPin(value) {
  return typeof value === "string" && VERIFICATION_PIN_PATTERN.test(value);
}
function isCanonicalUuid(value) {
  return typeof value === "string" && UUID_PATTERN.test(value);
}
function isCursor(value) {
  return value === null || typeof value === "string" && SAFE_IDENTIFIER_PATTERN.test(value);
}
function isCanonicalDisplayText(value, maxLength) {
  return typeof value === "string" && value.length >= 1 && value.length <= maxLength && value === value.trim() && !hasControlCharacter(value);
}
function hasControlCharacter(value) {
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (codePoint <= 31 || codePoint === 127) return true;
  }
  return false;
}
function isCanonicalIsoTimestamp(value) {
  if (typeof value !== "string") return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}
function isCanonicalHttpsOrigin(value) {
  try {
    const url2 = new URL(value);
    return url2.protocol === "https:" && url2.username === "" && url2.password === "" && url2.pathname === "/" && url2.search === "" && url2.hash === "" && url2.origin === value;
  } catch {
    return false;
  }
}
function isApiBaseForOrigin(value, origin) {
  try {
    const url2 = new URL(value);
    const canonicalValue = url2.pathname === "/" ? url2.origin : url2.href;
    return url2.protocol === "https:" && url2.origin === origin && url2.username === "" && url2.password === "" && url2.search === "" && url2.hash === "" && value === canonicalValue && (url2.pathname === "/" || !url2.pathname.endsWith("/"));
  } catch {
    return false;
  }
}
function isNonnegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}
function hasExactKeys(value, expectedKeys) {
  if (!isRecord12(value)) return false;
  const keys = Object.keys(value);
  return keys.length === expectedKeys.length && expectedKeys.every((key) => Object.hasOwn(value, key));
}
function isRecord12(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseInviteEnvelopeSafely(value) {
  try {
    return parseInviteEnvelope(value);
  } catch {
    throw new OnboardingError("missing-credential");
  }
}
function generateCanonicalUuid() {
  if (!globalThis.crypto?.randomUUID) {
    throw new OnboardingError("invalid-generated-credential");
  }
  return globalThis.crypto.randomUUID();
}
function generateRefreshToken() {
  if (!globalThis.crypto?.getRandomValues) {
    throw new OnboardingError("invalid-generated-credential");
  }
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
  return `hm_rt_${encodeBase64Url2(bytes)}`;
}
function generateRejoinSecret() {
  if (!globalThis.crypto?.getRandomValues) {
    throw new OnboardingError("invalid-generated-credential");
  }
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
  return `hm_rj_${encodeBase64Url2(bytes)}`;
}
function encodeBase64Url2(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}
function decodeBase64Url2(value) {
  const base643 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base643.padEnd(base643.length + (4 - base643.length % 4) % 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

// src/runtime/connection.ts
function isConnectedOnboardingState(state) {
  return typeof state === "object" && state !== null && state.phase === "connected";
}
var BlobFetchError = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "BlobFetchError");
  }
};
var BlobIntegrityError = class extends Error {
  constructor(expectedHash, actualHash) {
    super(
      `Blob for ${expectedHash} failed integrity verification: downloaded bytes hash to ${actualHash}.`
    );
    __publicField(this, "name", "BlobIntegrityError");
    __publicField(this, "permanent", true);
    __publicField(this, "expectedHash");
    __publicField(this, "actualHash");
    this.expectedHash = expectedHash;
    this.actualHash = actualHash;
  }
};
function buildConnectionResolvers(options) {
  return {
    apiBaseUrl: options.apiBaseUrl,
    vaultId: options.vaultId,
    getAuthToken: options.getAccessToken,
    resolveRevision: async (event) => {
      const token = await options.getAccessToken();
      const response = await options.requestUrl({
        url: `${options.apiBaseUrl}/vaults/${options.vaultId}/blobs/${event.revision.contentHash}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        throw: false
      });
      if (response.status < 200 || response.status >= 300) {
        throw new BlobFetchError(
          `Blob fetch for ${event.revision.contentHash} returned HTTP ${response.status}.`
        );
      }
      const body = response.text ?? "";
      const actualHash = await sha256Hex(body);
      if (actualHash !== event.revision.contentHash) {
        throw new BlobIntegrityError(event.revision.contentHash, actualHash);
      }
      return decodeRevisionPayload(body);
    }
  };
}

// src/runtime/onboarding-api.ts
var PENDING_CREDENTIAL_HEADER = "x-havemind-pending-credential";
var REFRESH_TOKEN_HEADER = "x-havemind-refresh-token";
var RequestUrlOnboardingApi = class {
  constructor(options) {
    __publicField(this, "requestUrl");
    this.requestUrl = options.requestUrl;
  }
  async discover(request) {
    return this.send(request.url, { method: "GET" });
  }
  async reviewInvitation(request) {
    return this.send(request.url, {
      method: "POST",
      body: JSON.stringify({ invitationToken: request.invitationToken })
    });
  }
  async redeemInvitation(request) {
    return this.send(request.url, {
      method: "POST",
      body: JSON.stringify({
        deviceLabel: request.deviceLabel,
        initialRefreshToken: request.initialRefreshToken,
        invitationToken: request.invitationToken,
        redemptionId: request.redemptionId,
        rejoinSecret: request.rejoinSecret
      })
    });
  }
  async pollApproval(request) {
    return this.send(request.url, {
      method: "GET",
      headers: { [PENDING_CREDENTIAL_HEADER]: request.pendingCredential }
    });
  }
  async fetchBootstrapPage(request) {
    const params = [];
    if (request.vaultId !== null) {
      params.push(`vault=${encodeURIComponent(request.vaultId)}`);
    }
    if (request.cursor !== null) {
      params.push(`cursor=${encodeURIComponent(request.cursor)}`);
    }
    const url2 = params.length === 0 ? request.url : `${request.url}?${params.join("&")}`;
    return this.send(request.url, {
      method: "GET",
      requestUrl: url2,
      headers: { [REFRESH_TOKEN_HEADER]: request.refreshToken }
    });
  }
  async send(finalUrl, init) {
    const headers = { ...init.headers };
    if (init.body !== void 0) {
      headers["Content-Type"] = "application/json";
    }
    const response = await this.requestUrl({
      url: init.requestUrl ?? finalUrl,
      method: init.method,
      throw: false,
      ...Object.keys(headers).length === 0 ? {} : { headers },
      ...init.body === void 0 ? {} : { body: init.body }
    });
    return { body: response.json, finalUrl, status: response.status };
  }
};

// src/runtime/onboarding-secrets.ts
var ObsidianOnboardingSecrets = class {
  constructor(options) {
    __publicField(this, "secretStorage");
    __publicField(this, "invitationKey");
    __publicField(this, "pendingKey");
    __publicField(this, "refreshKey");
    __publicField(this, "rejoinKey");
    __publicField(this, "pendingRotationKey");
    if (!isValidClientInstanceId(options.clientInstanceId)) {
      throw new Error(
        "A valid client_instance_id is required for onboarding secret namespacing."
      );
    }
    this.secretStorage = options.secretStorage;
    const prefix = `havemind-${options.clientInstanceId}-onb`;
    this.invitationKey = `${prefix}-invitation`;
    this.pendingKey = `${prefix}-pending`;
    this.refreshKey = `${prefix}-refresh`;
    this.rejoinKey = `${prefix}-rejoin`;
    this.pendingRotationKey = `${prefix}-rotation`;
  }
  async getInvitationEnvelope() {
    return this.read(this.invitationKey);
  }
  async saveInvitationEnvelope(value) {
    this.write(this.invitationKey, value);
  }
  async clearInvitationEnvelope() {
    this.write(this.invitationKey, "");
  }
  async getPendingCredential() {
    return this.read(this.pendingKey);
  }
  async savePendingCredential(value) {
    this.write(this.pendingKey, value);
  }
  async clearPendingCredential() {
    this.write(this.pendingKey, "");
  }
  async getRefreshToken() {
    return this.read(this.refreshKey);
  }
  async saveRefreshToken(value) {
    this.write(this.refreshKey, value);
  }
  async getRejoinSecret() {
    return this.read(this.rejoinKey);
  }
  async saveRejoinSecret(value) {
    this.write(this.rejoinKey, value);
  }
  /**
   * The in-flight refresh rotation record (rule 6: secret material, so it lives
   * in SecretStorage alongside the refresh token, never in `data.json`). Stored
   * as JSON; a malformed or absent value reads back as null so a fresh rotation
   * is minted.
   */
  async getPendingRotation() {
    const raw = this.read(this.pendingRotationKey);
    if (raw === null) {
      return null;
    }
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null && typeof parsed.refreshToken === "string" && typeof parsed.rotationId === "string" && typeof parsed.successorRefreshToken === "string") {
        return parsed;
      }
    } catch {
    }
    return null;
  }
  async savePendingRotation(record2) {
    this.write(this.pendingRotationKey, JSON.stringify(record2));
  }
  async clearPendingRotation() {
    this.write(this.pendingRotationKey, "");
  }
  read(key) {
    const value = this.secretStorage.getSecret(key);
    return value === null || value.length === 0 ? null : value;
  }
  write(key, value) {
    this.secretStorage.setSecret(key, value);
  }
};

// src/runtime/onboarding-store.ts
var ONBOARDING_KEY = "onboarding";
var PluginDataOnboardingStore = class {
  constructor(options) {
    __publicField(this, "persist");
    __publicField(this, "cache", null);
    this.persist = options.persist;
  }
  async loadState() {
    return (await this.ensureLoaded()).state;
  }
  async saveState(state) {
    const current = await this.ensureLoaded();
    await this.mutate({ ...current, state });
  }
  async commitBootstrapPage(items, state) {
    const current = await this.ensureLoaded();
    const pageFileIds = items.map(extractFileId).filter((id) => id !== null);
    const fileIds = [.../* @__PURE__ */ new Set([...current.fileIds, ...pageFileIds])];
    await this.mutate({ fileIds, state });
  }
  /** FileIds observed during bootstrap, for the path-mapping resolver. */
  knownFileIds() {
    return this.cache?.fileIds ?? [];
  }
  async ensureLoaded() {
    if (this.cache !== null) return this.cache;
    const raw = await this.persist.load();
    this.cache = parsePersisted(raw);
    return this.cache;
  }
  async mutate(next) {
    this.cache = next;
    const data = await this.persist.load();
    const base = isRecord13(data) ? data : {};
    await this.persist.save({ ...base, [ONBOARDING_KEY]: next });
  }
};
function parsePersisted(raw) {
  const container = isRecord13(raw) ? raw[ONBOARDING_KEY] : null;
  if (!isRecord13(container)) {
    return { state: null, fileIds: [] };
  }
  const fileIds = Array.isArray(container.fileIds) ? container.fileIds.filter((id) => typeof id === "string") : [];
  const state = isRecord13(container.state) ? container.state : null;
  return { state, fileIds };
}
function extractFileId(item) {
  if (isRecord13(item) && typeof item.fileId === "string") {
    return item.fileId;
  }
  return null;
}
function isRecord13(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/adapters/owner-connection.ts
function parseOwnerConnection(raw) {
  if (raw === null || raw === void 0) {
    return { status: "absent" };
  }
  if (!isRecord9(raw) || typeof raw.apiBaseUrl !== "string" || typeof raw.vaultId !== "string") {
    return { status: "corrupt", raw };
  }
  return {
    status: "connection",
    raw,
    connection: {
      apiBaseUrl: raw.apiBaseUrl,
      vaultId: raw.vaultId,
      ...typeof raw.memberId === "string" ? { memberId: raw.memberId } : {},
      ...typeof raw.deviceId === "string" ? { deviceId: raw.deviceId } : {}
    }
  };
}
async function readOwnerConnectionResult(plugin) {
  const data = await plugin.loadData();
  return parseOwnerConnection(isRecord9(data) ? data[OWNER_CONNECTION_KEY] : null);
}
async function readOwnerConnection(plugin) {
  const result = await readOwnerConnectionResult(plugin);
  return result.status === "connection" ? result.connection : null;
}
function gateOwnerConnection(result, refreshTokenPresent) {
  if (result.status === "absent") return { kind: "absent" };
  if (result.status === "corrupt") {
    return { kind: "reset-required", reason: "corrupt-record", raw: result.raw };
  }
  if (!refreshTokenPresent) {
    return { kind: "reset-required", reason: "missing-secret", raw: result.raw };
  }
  return { kind: "connect", connection: result.connection };
}
async function hasStoredRefreshToken(plugin) {
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  return await secrets.getRefreshToken() !== null;
}
async function evaluateOwnerConnection(plugin) {
  const result = await readOwnerConnectionResult(plugin);
  if (result.status !== "connection") {
    return gateOwnerConnection(result, false);
  }
  let refreshTokenPresent;
  try {
    refreshTokenPresent = await hasStoredRefreshToken(plugin);
  } catch (error51) {
    console.warn(
      "Havemind: could not read the stored refresh token; assuming the pairing is intact.",
      error51
    );
    refreshTokenPresent = true;
  }
  return gateOwnerConnection(result, refreshTokenPresent);
}
async function preserveCorruptOwnerConnection(plugin, raw, timestamp) {
  await getPluginDataMutex(plugin).update((base) => {
    const key = `${OWNER_CONNECTION_CORRUPT_PREFIX}${timestamp}`;
    if (key in base) return base;
    return { ...base, [key]: raw };
  });
}
async function resetHavemindConnectionState(plugin, now = () => Date.now()) {
  const result = await readOwnerConnectionResult(plugin);
  if (result.status !== "absent") {
    await preserveCorruptOwnerConnection(plugin, result.raw, now());
  }
  try {
    const clientInstanceId = await ensureClientInstanceId(
      createClientInstanceRepo(plugin)
    );
    const secrets = new ObsidianOnboardingSecrets({
      clientInstanceId,
      secretStorage: plugin.app.secretStorage
    });
    await secrets.saveRefreshToken("");
    await secrets.saveRejoinSecret("");
    await secrets.clearInvitationEnvelope();
    await secrets.clearPendingCredential();
    await secrets.clearPendingRotation();
  } catch (error51) {
    console.warn(
      "Havemind: could not clear the stored connection secrets during reset.",
      error51
    );
  }
  await getPluginDataMutex(plugin).update((base) => {
    const next = {};
    for (const [key, value] of Object.entries(base)) {
      if (isCorruptSidecarKey(key)) next[key] = value;
    }
    return next;
  });
}
async function writeOwnerConnection(plugin, connection) {
  await getPluginDataMutex(plugin).update((base) => ({
    ...base,
    [OWNER_CONNECTION_KEY]: connection
  }));
}

// src/runtime/adapters/onboarding-wiring.ts
async function buildOnboardingController(plugin) {
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const store = new PluginDataOnboardingStore({
    persist: createRawPersistPort(plugin)
  });
  const controller = new OnboardingController({
    clock: { now: () => Date.now() },
    remoteApi: new RequestUrlOnboardingApi({ requestUrl: createRequestUrlFn() }),
    secrets,
    store
  });
  return { controller, store };
}
async function resolveConnectedVault(plugin) {
  const owner = await readOwnerConnection(plugin);
  if (owner !== null) {
    return {
      apiBaseUrl: owner.apiBaseUrl,
      vaultId: owner.vaultId,
      serverOrigin: owner.apiBaseUrl
    };
  }
  const { controller: onboarding } = await buildOnboardingController(plugin);
  const state = await onboarding.resume();
  if (!isConnectedOnboardingState(state)) {
    return null;
  }
  const connected = state;
  return {
    apiBaseUrl: connected.apiBaseUrl,
    vaultId: connected.vaultId,
    serverOrigin: connected.serverOrigin
  };
}

// src/runtime/adapters/config-poll.ts
var CONFIG_POLL_INTERVAL_MS = 5e3;
var CONFIG_POLL_FAILURE_NOTICE_EVERY = 10;
var CONFIG_POLL_FAILURE_NOTICE = "Havemind: config sync ran into repeated errors \u2014 see console.";
function describeConfigPollFailure(error51) {
  return error51 instanceof Error ? `reason=${error51.name}` : `reason=${typeof error51}`;
}
function createConfigPollTick(deps) {
  const warn = deps.warn ?? ((message, reason) => console.warn(message, reason));
  let consecutiveFailures = 0;
  return async () => {
    try {
      const ops = await deps.poll();
      consecutiveFailures = 0;
      if (ops.length === 0) return;
      for (const op of ops) deps.recordActivity(op);
      deps.triggerSync();
    } catch (error51) {
      consecutiveFailures += 1;
      warn(
        `Havemind: config sync tick failed (${consecutiveFailures} consecutive).`,
        describeConfigPollFailure(error51)
      );
      const shouldNotify = consecutiveFailures === 1 || consecutiveFailures % CONFIG_POLL_FAILURE_NOTICE_EVERY === 0;
      if (shouldNotify) deps.notify(CONFIG_POLL_FAILURE_NOTICE);
    }
  };
}

// src/runtime/adapters/vault-change-listeners.ts
var import_obsidian5 = require("obsidian");
function registerVaultChangeListeners(vault, handlers) {
  const refs = [
    vault.on("create", (file2) => {
      if (file2 instanceof import_obsidian5.TFile) handlers.onCreate(file2.path);
    }),
    vault.on("modify", (file2) => {
      if (file2 instanceof import_obsidian5.TFile) handlers.onModify(file2.path);
    }),
    vault.on("delete", (file2) => {
      if (file2 instanceof import_obsidian5.TFolder) {
        handlers.onFolderDelete(file2.path);
        return;
      }
      const path = file2.path;
      if (typeof path === "string") handlers.onDelete(path);
    }),
    vault.on("rename", (file2, oldPath) => {
      if (typeof oldPath !== "string") return;
      if (file2 instanceof import_obsidian5.TFile) {
        handlers.onRename(oldPath, file2.path);
      } else if (file2 instanceof import_obsidian5.TFolder) {
        handlers.onFolderRename(oldPath, file2.path);
      }
    })
  ];
  return () => {
    for (const ref of refs) vault.offref(ref);
  };
}

// src/runtime/adapters/producer-state.ts
var EMPTY_PRODUCER_STATE = { mappings: [], heads: {} };
function isValidProducerMapping(entry) {
  return isRecord9(entry) && typeof entry.collisionKey === "string" && typeof entry.content === "string" && typeof entry.contentHash === "string" && typeof entry.fileId === "string" && typeof entry.path === "string";
}
function buildProducerMapping(entry) {
  return {
    collisionKey: entry.collisionKey,
    content: entry.content,
    contentHash: entry.contentHash,
    // Preserve the binary/markdown discriminator across every load→save
    // cycle. Dropping it here silently converts a persisted binary mapping
    // to markdown, so the startup rebase then canonicalises its base64 over
    // the markdown path and corrupts the raw-byte hash → a false conflict on
    // the next binary sync (BLOCKER). Validate as an optional
    // 'markdown'|'binary'; anything else (absent/legacy) defaults to
    // markdown by omission, keeping legacy mappings unchanged.
    ...entry.contentKind === "binary" || entry.contentKind === "markdown" ? { contentKind: entry.contentKind } : {},
    fileId: entry.fileId,
    path: entry.path
  };
}
function parseProducerStateResult(raw) {
  if (raw === null || raw === void 0) {
    return {
      status: "absent",
      state: EMPTY_PRODUCER_STATE,
      quarantinedMappings: []
    };
  }
  if (!isRecord9(raw) || !Array.isArray(raw.mappings) || !isRecord9(raw.heads)) {
    console.warn(
      "Havemind: producer state was present but structurally corrupt; its raw bytes were preserved to a sidecar and an empty state was used for this session."
    );
    return {
      status: "corrupt",
      state: EMPTY_PRODUCER_STATE,
      quarantinedMappings: []
    };
  }
  const mappings = [];
  const quarantinedMappings = [];
  for (const entry of raw.mappings) {
    if (isValidProducerMapping(entry)) {
      mappings.push(buildProducerMapping(entry));
    } else {
      quarantinedMappings.push(entry);
    }
  }
  if (quarantinedMappings.length > 0) {
    console.warn(
      `Havemind: ${quarantinedMappings.length} malformed producer mapping(s) were preserved for recovery; the rest of the mapping set was kept.`
    );
  }
  const heads = {};
  for (const [fileId, revisionId] of Object.entries(raw.heads)) {
    if (typeof revisionId === "string") heads[fileId] = revisionId;
  }
  return { status: "ok", state: { mappings, heads }, quarantinedMappings };
}

// src/runtime/connect-driver.ts
async function driveToConnected(options) {
  let state = { phase: "idle" };
  for (let step = 0; step < options.maxSteps; step += 1) {
    state = await options.controller.resume();
    if (state.phase === "connected" || state.phase === "rejected") {
      return state;
    }
    if (state.phase === "pending-approval") {
      await options.sleep(options.pollIntervalMs);
    }
  }
  return state;
}

// src/runtime/connect-input.ts
var PAIRING_PREFIX = "hm_pt_";
var ENVELOPE_PREFIX2 = "v1.";
function classifyConnectInput(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith(PAIRING_PREFIX)) return "pairing";
  if (trimmed.startsWith(ENVELOPE_PREFIX2)) return "envelope";
  return "unknown";
}
var OwnerPairError = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "OwnerPairError");
  }
};
async function pairOwnerDevice(options) {
  const response = await options.requestUrl({
    url: `${options.apiBaseUrl}/owner/pair`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    throw: false,
    body: JSON.stringify({
      deviceLabel: options.deviceLabel,
      initialRefreshTokenHash: options.initialRefreshTokenHash,
      pairingToken: options.pairingToken
    })
  });
  if (response.status < 200 || response.status >= 300) {
    throw new OwnerPairError(`Owner pairing returned HTTP ${response.status}.`);
  }
  const json2 = response.json;
  if (!isRecord14(json2) || typeof json2.vaultId !== "string" || typeof json2.deviceId !== "string") {
    throw new OwnerPairError("Owner pairing response was malformed.");
  }
  return {
    vaultId: json2.vaultId,
    deviceId: json2.deviceId,
    ...typeof json2.membershipId === "string" ? { memberId: json2.membershipId } : {}
  };
}
function isRecord14(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/access-token.ts
var EXPIRY_SKEW_MS = 3e4;
var AccessTokenError = class extends Error {
  constructor(message, options) {
    super(message);
    __publicField(this, "name", "AccessTokenError");
    /**
     * True when the server refused the credential (HTTP 401) — a terminal state
     * that must halt the sync loop until the user reconnects, never a retry. A
     * missing token or a transient 5xx/network failure is not auth-denied.
     */
    __publicField(this, "authDenied");
    this.authDenied = options?.authDenied ?? false;
  }
};
var RefreshTokenAccessProvider = class {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "now");
    __publicField(this, "cachedToken", null);
    __publicField(this, "cachedExpiry", 0);
    __publicField(this, "memoryPending", null);
    __publicField(this, "inFlight", null);
    this.options = options;
    this.now = options.now ?? Date.now;
  }
  async getAccessToken() {
    if (this.cachedToken !== null && this.now() < this.cachedExpiry - EXPIRY_SKEW_MS) {
      return this.cachedToken;
    }
    return this.rotate();
  }
  /**
   * Single-flight guard: concurrent callers share one in-flight rotation. The
   * identical refresh token is never rotated twice in parallel, so a second
   * caller can never present the already-rotated token and trip the server's
   * reuse-burn. The guard clears once the rotation settles, so the next call may
   * start a fresh rotation.
   */
  rotate() {
    if (this.inFlight !== null) {
      return this.inFlight;
    }
    const run = this.rotateOnce();
    this.inFlight = run;
    return run.finally(() => {
      this.inFlight = null;
    });
  }
  async rotateOnce() {
    const refreshToken = await this.options.getRefreshToken();
    if (refreshToken === null) {
      throw new AccessTokenError("No refresh token is stored.");
    }
    const pending = await this.resolvePendingRotation(refreshToken);
    const rotationId = pending.rotationId;
    const successorRefreshToken = pending.successorRefreshToken;
    const response = await this.options.requestUrl({
      url: `${this.options.apiBaseUrl}/auth/refresh`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      throw: false,
      body: JSON.stringify({
        refreshToken,
        rotationId,
        successorRefreshToken
      })
    });
    if (response.status < 200 || response.status >= 300) {
      if (response.status === 401) {
        await this.clearPendingRotation();
        throw new AccessTokenError(
          `Refresh failed with HTTP ${response.status}.`,
          { authDenied: true }
        );
      }
      throw new AccessTokenError(`Refresh failed with HTTP ${response.status}.`, {
        authDenied: false
      });
    }
    const body = response.json;
    if (!isRecord15(body) || typeof body.accessToken !== "string" || typeof body.accessExpiresAt !== "string") {
      throw new AccessTokenError("Refresh response was malformed.");
    }
    await this.options.saveRefreshToken(successorRefreshToken);
    await this.clearPendingRotation();
    this.cachedToken = body.accessToken;
    this.cachedExpiry = Date.parse(body.accessExpiresAt);
    return body.accessToken;
  }
  /**
   * Returns the in-flight pair to present: a persisted record that matches the
   * current refresh token (a replay), or a freshly minted pair that is
   * persisted before it is returned. A stored record whose `refreshToken` does
   * not match the current token is never replayed — it is overwritten by the
   * fresh pair.
   */
  async resolvePendingRotation(refreshToken) {
    const stored = await this.loadPending();
    if (stored !== null && stored.refreshToken === refreshToken) {
      return stored;
    }
    const record2 = {
      refreshToken,
      rotationId: this.options.generateRotationId(),
      successorRefreshToken: this.options.generateSuccessorToken()
    };
    this.memoryPending = record2;
    await this.savePending(record2);
    return record2;
  }
  /**
   * Loads the persisted in-flight record, degrading to the in-memory record if
   * no durable store is wired or the store throws. A store outage must never
   * abort a rotation, so a load failure is treated as "use whatever is in
   * memory" (identical to the in-memory-only configuration).
   */
  async loadPending() {
    if (!this.options.loadPendingRotation) {
      return this.memoryPending;
    }
    try {
      return await this.options.loadPendingRotation();
    } catch (error51) {
      console.error(
        "Havemind: pending-rotation load failed; using in-memory record",
        error51
      );
      return this.memoryPending;
    }
  }
  /**
   * Persists the freshly minted record durably. A save failure is swallowed:
   * the record still lives in memory (single-flight remains safe within this
   * process) and the rotation proceeds — degrading to in-memory-only rather
   * than aborting.
   */
  async savePending(record2) {
    if (!this.options.savePendingRotation) {
      return;
    }
    try {
      await this.options.savePendingRotation(record2);
    } catch (error51) {
      console.error(
        "Havemind: pending-rotation save failed; continuing in-memory only",
        error51
      );
    }
  }
  async clearPendingRotation() {
    this.memoryPending = null;
    if (!this.options.clearPendingRotation) {
      return;
    }
    try {
      await this.options.clearPendingRotation();
    } catch (error51) {
      console.error("Havemind: pending-rotation clear failed", error51);
    }
  }
};
function isRecord15(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/remote-apply-coordinator.ts
function createRemoteApplyProducerSync(getProducer) {
  return {
    async onRemoteWrite({ fileId, path, content, contentHash, revisionId, contentKind }) {
      const producer = getProducer();
      if (producer === null) return;
      const classified = classifyVaultPath(path);
      if (!classified.eligible) return;
      const mapping = {
        collisionKey: classified.collisionKey,
        content,
        contentHash,
        // Carry the binary discriminator into the durable producer mapping so a
        // RECEIVED binary is persisted (and rebased) as binary, never markdown.
        // Absent/markdown is omitted — an absent contentKind already means
        // markdown, keeping the mapping shape unchanged for text notes.
        ...contentKind === "binary" ? { contentKind: "binary" } : {},
        fileId,
        path: classified.canonicalPath
      };
      await producer.adoptRemoteMapping(mapping, revisionId);
    },
    async onRemoteDelete({ fileId, path }) {
      const producer = getProducer();
      if (producer === null) return;
      const classified = classifyVaultPath(path);
      if (!classified.eligible) return;
      await producer.forgetRemoteMapping(classified.collisionKey, fileId);
    },
    async localHeadFor(fileId) {
      const producer = getProducer();
      if (producer === null) return null;
      return producer.headFor(fileId);
    }
  };
}

// src/runtime/adapters/push-producer.ts
var import_obsidian6 = require("obsidian");

// src/sync/config-poller.ts
async function pollConfigOnce(deps) {
  const ops = [];
  const configPaths = await deps.listConfigPaths();
  const onDisk = /* @__PURE__ */ new Set();
  for (const path of configPaths) {
    onDisk.add(normalizeWirePath(path).toLowerCase());
    const op = await deps.observer.observeModify(path);
    if (op !== null) ops.push(op);
  }
  for (const mapping of await deps.listMappings()) {
    if (!isSyncableConfigPath(mapping.path)) continue;
    if (onDisk.has(mapping.collisionKey)) continue;
    const op = await deps.observer.observeDelete(mapping.path);
    if (op !== null) ops.push(op);
  }
  return ops;
}

// src/sync/outbox-repository.ts
var MAX_BINARY_PAYLOAD_BYTES = 40 * 1024 * 1024;
function decodeBase64ToBytes(base643) {
  const binary = atob(base643);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
var OPERATION_BY_KIND = {
  create: "create",
  update: "update",
  rename: "rename",
  delete: "delete"
};
var OutboxLocalChangeRepository = class {
  constructor(options) {
    __publicField(this, "options");
    this.options = options;
  }
  async listMappings() {
    return (await this.options.store.load()).mappings;
  }
  /**
   * This device's current head revisionId for `fileId` — the last revision it
   * authored locally or adopted from a remote apply — or null if none is
   * known. Read by the apply side's causal apply-vs-conflict decision (rule 3)
   * to tell a fast-forward (the incoming revision descends from this head)
   * from a concurrent divergence that must never be silently overwritten.
   */
  async headFor(fileId) {
    const state = await this.options.store.load();
    return state.heads[fileId] ?? null;
  }
  async commitLocalChange(commit) {
    const state = await this.options.store.load();
    const { operation } = commit;
    const head = state.heads[operation.fileId];
    const kind = operation.kind;
    const envelopeOperation = resolveOperation(kind, head);
    if (!(kind === "delete" && head === void 0)) {
      const parentRevisionIds = envelopeOperation === "create" || head === void 0 ? [] : [head];
      const revisionId = this.options.generateRevisionId();
      const isBinary = operation.contentKind === "binary";
      const built = await buildRevisionEnvelope({
        identity: {
          vaultId: this.options.identity.vaultId,
          fileId: operation.fileId,
          memberId: this.options.identity.memberId,
          deviceId: this.options.identity.deviceId
        },
        revisionId,
        parentRevisionIds,
        operation: envelopeOperation,
        path: operation.path,
        previousPath: operation.previousPath,
        ...isBinary ? {
          kind: "binary",
          content: null,
          binaryContent: decodeBase64ToBytes(operation.content ?? ""),
          maxPayloadBytes: MAX_BINARY_PAYLOAD_BYTES
        } : {
          content: operation.content,
          ...this.options.maxPayloadBytes === void 0 ? {} : { maxPayloadBytes: this.options.maxPayloadBytes }
        },
        idempotencyKey: operation.operationId
      });
      await this.options.enqueue({
        header: built.header,
        idempotencyKey: built.idempotencyKey,
        payloadBase64: built.payloadBase64,
        operationId: operation.operationId,
        revisionId: built.revisionId,
        fileId: built.fileId,
        contentHash: built.contentHash
      });
      await this.options.store.save(
        applyCommit(state, commit, {
          fileId: operation.fileId,
          revisionId,
          isDelete: kind === "delete"
        })
      );
      await this.seedSharedState(operation);
      return built.revisionId;
    }
    await this.options.store.save(
      applyCommit(state, commit, {
        fileId: operation.fileId,
        revisionId: null,
        isDelete: true
      })
    );
    await this.seedSharedState(operation);
    return null;
  }
  /**
   * Mirrors a committed local change into the SHARED apply-side ownership+base
   * so a later remote edit to a locally-authored file updates in place instead
   * of forever diverting to a conflict artifact. A create/update/rename seeds the
   * owner+base (and forgets the prior path on a rename); a delete forgets both.
   */
  async seedSharedState(operation) {
    if (operation.kind === "delete") {
      await this.options.onLocalForgotten?.({
        fileId: operation.fileId,
        path: operation.path
      });
      return;
    }
    if (operation.contentHash === null) return;
    await this.options.onLocalMaterialized?.({
      fileId: operation.fileId,
      path: operation.path,
      contentHash: operation.contentHash,
      // Seed the merge ancestor from the authored markdown text; a binary file
      // (base64 in `content`) never merges, so it passes null.
      content: operation.contentKind === "binary" ? null : operation.content,
      previousPath: operation.previousPath
    });
  }
  /**
   * Adopts, without enqueuing, the producer mapping+head for a file the apply
   * side just materialised from a remote revision. This keeps the producer's
   * fileId↔path↔content map in lockstep with the vault write, so the vault event
   * that write triggers dedupes to a no-op instead of (a) re-pushing the peer's
   * edit, (b) recording it as LOCAL activity, or (c) minting a fresh random
   * fileId for the same path (a duplicate fileId across devices).
   */
  async adoptRemoteMapping(mapping, headRevisionId) {
    const state = await this.options.store.load();
    const mappings = upsertMapping(state.mappings, mapping);
    await this.options.store.save({
      mappings,
      heads: { ...state.heads, [mapping.fileId]: headRevisionId }
    });
  }
  /** Forgets the producer mapping+head for a file the apply side just deleted. */
  async forgetRemoteMapping(collisionKey, fileId) {
    const state = await this.options.store.load();
    const mappings = state.mappings.filter(
      (mapping) => mapping.collisionKey !== collisionKey && mapping.fileId !== fileId
    );
    const heads = { ...state.heads };
    delete heads[fileId];
    await this.options.store.save({ mappings, heads });
  }
};
function upsertMapping(mappings, upsert) {
  const next = mappings.filter(
    (mapping) => mapping.fileId !== upsert.fileId && mapping.collisionKey !== upsert.collisionKey
  );
  next.push(upsert);
  return next;
}
function resolveOperation(kind, head) {
  const mapped = OPERATION_BY_KIND[kind];
  if (mapped !== "create" && mapped !== "delete" && head === void 0) {
    return "create";
  }
  return mapped;
}
function applyCommit(state, commit, head) {
  const mappings = nextMappings(state.mappings, commit);
  const heads = { ...state.heads };
  if (head.isDelete) {
    delete heads[head.fileId];
  } else if (head.revisionId !== null) {
    heads[head.fileId] = head.revisionId;
  }
  return { mappings, heads };
}
function nextMappings(mappings, commit) {
  let next = [...mappings];
  if (commit.removeFileId !== null) {
    next = next.filter((mapping) => mapping.fileId !== commit.removeFileId);
  }
  if (commit.upsertMapping !== null) {
    next = upsertMapping(next, commit.upsertMapping);
  }
  return next;
}

// src/sync/reconciliation.ts
var SYNCABLE_EXTENSION_SET = /* @__PURE__ */ new Set([
  "md",
  ...SYNCABLE_BINARY_EXTENSIONS
]);
var MAX_SKIPPED_DETAILS = 10;
var MAX_BINARY_FILE_MB = MAX_BINARY_FILE_BYTES / (1024 * 1024);
function formatReconcileNotices(result) {
  const notices = [];
  if (result.attachmentsExcluded > 0) {
    notices.push(
      `Havemind: ${result.attachmentsExcluded} attachment(s) not synced (unsupported file type(s)).`
    );
  }
  if (result.binaryExcluded > 0) {
    notices.push(
      `Havemind: ${result.binaryExcluded} attachment(s) not synced (over the ${MAX_BINARY_FILE_MB} MB size limit).`
    );
  }
  return notices;
}
function warnSkippedPaths(result) {
  for (const { path, reason } of result.skippedPaths) {
    console.warn(`Havemind: skipped ${path}: ${reason}`);
  }
}
async function readEligibleContent(vault, readPath, kind) {
  if (kind === "binary") {
    const bytes = await vault.readBinary(readPath);
    if (bytes.byteLength > MAX_BINARY_FILE_BYTES) return "too-large";
    return { content: bytesToBase642(bytes) };
  }
  return {
    content: normalizeContent2(
      normalizeConfigContent(readPath, await vault.readText(readPath))
    )
  };
}
async function reconcileVaultState(options) {
  const { observer, repository, vault } = options;
  const allPaths = await vault.listAllPaths();
  const attachmentsExcluded = allPaths.filter((path) => {
    const normalized = path.normalize("NFC");
    if (isSyncableConfigPath(normalized)) return false;
    return !SYNCABLE_EXTENSION_SET.has(pathExtension(normalized));
  }).length;
  const paths = await vault.listSyncablePaths();
  const eligible = /* @__PURE__ */ new Map();
  let ignored = 0;
  for (const rawPath of paths) {
    const classified = classifyVaultPath(rawPath);
    if (!classified.eligible) {
      ignored += 1;
      continue;
    }
    if (eligible.has(classified.collisionKey)) {
      throw new LocalVaultError(
        "path-collision",
        `Two live vault files map to ${classified.collisionKey}.`
      );
    }
    eligible.set(classified.collisionKey, {
      readPath: rawPath,
      kind: classified.kind
    });
  }
  const mappingsByCollision = /* @__PURE__ */ new Map();
  for (const mapping of await repository.listMappings()) {
    mappingsByCollision.set(mapping.collisionKey, mapping);
  }
  let unchanged = 0;
  let updated = 0;
  let skipped = 0;
  let binaryExcluded = 0;
  const skippedPaths = [];
  const recordSkip = (detail) => {
    if (skippedPaths.length < MAX_SKIPPED_DETAILS) skippedPaths.push(detail);
  };
  const unmatchedVault = [];
  for (const [collisionKey, { readPath, kind }] of eligible) {
    const read = await readEligibleContent(vault, readPath, kind);
    if (read === "too-large") {
      binaryExcluded += 1;
      mappingsByCollision.delete(collisionKey);
      continue;
    }
    const { content } = read;
    const mapping = mappingsByCollision.get(collisionKey);
    if (mapping === void 0) {
      unmatchedVault.push({ collisionKey, content, readPath });
      continue;
    }
    mappingsByCollision.delete(collisionKey);
    if (mapping.content === content) {
      unchanged += 1;
    } else if (await observeResilient(readPath, recordSkip, () => observer.observeModify(readPath))) {
      updated += 1;
    } else {
      skipped += 1;
    }
  }
  const unmatchedMappings = [...mappingsByCollision.values()];
  const {
    created,
    deleted,
    renamed,
    skipped: tailSkipped
  } = await applyRenamesCreatesDeletes(
    observer,
    unmatchedVault,
    unmatchedMappings,
    recordSkip
  );
  return {
    attachmentsExcluded,
    binaryExcluded,
    completed: true,
    created,
    deleted,
    ignored,
    renamed,
    skipped: skipped + tailSkipped,
    skippedPaths,
    unchanged,
    updated
  };
}
async function observeResilient(path, onSkip, task) {
  try {
    await task();
    return true;
  } catch (error51) {
    if (error51 instanceof LocalVaultError) throw error51;
    onSkip({ path, reason: describeSkipReason(error51) });
    return false;
  }
}
function describeSkipReason(error51) {
  if (error51 instanceof Error && error51.message !== "") return error51.message;
  return "unknown error";
}
async function applyRenamesCreatesDeletes(observer, unmatchedVault, unmatchedMappings, onSkip) {
  const vaultByContent = groupBy(unmatchedVault, (file2) => file2.content);
  const mappingsByContent = groupBy(unmatchedMappings, (m) => m.content);
  const consumedVault = /* @__PURE__ */ new Set();
  const consumedMappings = /* @__PURE__ */ new Set();
  let renamed = 0;
  let skipped = 0;
  for (const [content, files] of vaultByContent) {
    const candidates = mappingsByContent.get(content) ?? [];
    const [file2] = files;
    const [mapping] = candidates;
    if (files.length === 1 && candidates.length === 1 && file2 && mapping) {
      consumedVault.add(file2);
      consumedMappings.add(mapping);
      if (await observeResilient(
        file2.readPath,
        onSkip,
        () => observer.observeRename(mapping.path, file2.readPath)
      )) {
        renamed += 1;
      } else {
        skipped += 1;
      }
    }
  }
  let created = 0;
  for (const file2 of unmatchedVault) {
    if (consumedVault.has(file2)) continue;
    if (await observeResilient(
      file2.readPath,
      onSkip,
      () => observer.observeCreate(file2.readPath)
    )) {
      created += 1;
    } else {
      skipped += 1;
    }
  }
  let deleted = 0;
  for (const mapping of unmatchedMappings) {
    if (consumedMappings.has(mapping)) continue;
    if (await observeResilient(
      mapping.path,
      onSkip,
      () => observer.observeDelete(mapping.path)
    )) {
      deleted += 1;
    } else {
      skipped += 1;
    }
  }
  return { created, deleted, renamed, skipped };
}
function groupBy(items, key) {
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const groupKey = key(item);
    const group = groups.get(groupKey);
    if (group === void 0) {
      groups.set(groupKey, [item]);
    } else {
      group.push(item);
    }
  }
  return groups;
}
function normalizeContent2(text) {
  return canonicalizeMarkdown(text);
}

// src/runtime/commit-recovery.ts
var CommitPathRecovery = class {
  constructor(deps) {
    __publicField(this, "deps");
    /** Paths that have failed once and been re-armed (awaiting their retry). */
    __publicField(this, "rearmed", /* @__PURE__ */ new Set());
    this.deps = deps;
  }
  /**
   * Handle a commit-path failure for `path`. The first failure re-arms; a
   * second consecutive failure records a durable failed-to-queue entry. Never
   * throws — recovery must not itself wedge the change loop.
   */
  async onCommitFailure(path) {
    if (!this.rearmed.has(path)) {
      this.rearmed.add(path);
      this.deps.notify(
        `A change to ${path} could not be queued \u2014 will retry.`
      );
      this.deps.rearm(path);
      return;
    }
    this.rearmed.delete(path);
    this.deps.notify(
      `A change to ${path} could not be queued \u2014 see the Havemind panel.`
    );
    await this.deps.recordFailedToQueue(path);
  }
  /**
   * Note a successful commit for `path`: reset its in-memory retry budget AND
   * discard any durable failed-to-queue row an earlier failure left behind
   * (MAJOR 1), so a change that ultimately went through never lingers as a
   * phantom failure in the send-queue panel.
   */
  onCommitSuccess(path) {
    this.rearmed.delete(path);
    this.deps.clearFailedToQueue(path);
  }
};
function retryFailedCommit(path, deps) {
  if (!deps.exists(path)) return "file-missing";
  return deps.retrigger(path) ? "retriggered" : "unavailable";
}

// src/runtime/local-base-lifecycle.ts
async function applyLocalMaterialization(store, input) {
  if (input.previousPath !== null && input.previousPath !== input.path) {
    await store.forgetPath(input.previousPath);
  }
  await store.recordPathOwner(input.fileId, input.path);
  if (store.baseHashFor(input.fileId) === null) {
    await store.recordBaseHash(input.fileId, input.contentHash);
    if (input.content !== null) {
      await store.recordBaseContent(input.fileId, input.content);
    }
  }
}
async function forgetLocalMaterialization(store, input) {
  await store.forgetPath(input.path);
  await store.forgetBaseHash(input.fileId);
  await store.forgetBaseContent(input.fileId);
}

// src/runtime/modify-debounce.ts
var MODIFY_SETTLE_MS = 1500;
var realTimer = {
  set: (callback, ms) => globalThis.setTimeout(callback, ms),
  clear: (handle) => {
    globalThis.clearTimeout(handle);
  }
};
var ModifyDebouncer = class {
  constructor(options) {
    __publicField(this, "onSettled");
    __publicField(this, "delayMs");
    __publicField(this, "timer");
    __publicField(this, "pending", /* @__PURE__ */ new Map());
    /**
     * Set by `dispose()`. Once torn down the debouncer is inert: a late vault
     * event or a commit-recovery re-arm reaching `trigger()` must not schedule a
     * fresh timer against a producer that no longer exists — its settle would run
     * `onSettled` on a torn-down producer and a stale save could clobber the next
     * producer's `data.json` after a re-pair.
     */
    __publicField(this, "disposed", false);
    this.onSettled = options.onSettled;
    this.delayMs = options.delayMs ?? MODIFY_SETTLE_MS;
    this.timer = options.timer ?? realTimer;
  }
  /**
   * Records a modify for `path`, resetting any in-flight settle window for that
   * same path so only the LAST modify in a burst reaches `onSettled`. A no-op
   * once disposed, so a re-arm or late event after teardown never re-schedules.
   *
   * Returns whether a settle was actually scheduled: `true` when live, `false`
   * once disposed. The retry-from-disk recovery (FINDING 3) reads this to tell a
   * genuine re-arm from a no-op against a torn-down producer.
   */
  trigger(path) {
    if (this.disposed) return false;
    const existing = this.pending.get(path);
    if (existing !== void 0) {
      this.timer.clear(existing);
    }
    const handle = this.timer.set(() => {
      this.pending.delete(path);
      this.onSettled(path);
    }, this.delayMs);
    this.pending.set(path, handle);
    return true;
  }
  /**
   * Cancels the pending settle for a single `path`, if any. Called when a
   * rename or delete for that path fires: those events carry their own content
   * (or tombstone) immediately, so a later settled modify for the same path
   * would resolve against a file that has moved or gone — reading '' for the
   * missing path and pushing a phantom empty create. A no-op when nothing is
   * pending for `path`.
   */
  cancel(path) {
    const existing = this.pending.get(path);
    if (existing !== void 0) {
      this.timer.clear(existing);
      this.pending.delete(path);
    }
  }
  /**
   * Cancels every pending settle and marks the debouncer disposed. Called on
   * producer teardown/unload. After this the invariant holds unconditionally: no
   * settle can fire against the torn-down producer — both because every pending
   * timer is cleared here AND because `trigger()` is now inert, so even a re-arm
   * or a late vault event arriving after teardown cannot schedule a new one.
   */
  dispose() {
    this.disposed = true;
    for (const handle of this.pending.values()) {
      this.timer.clear(handle);
    }
    this.pending.clear();
  }
};

// src/runtime/adapters/push-producer.ts
function toActivityKind(kind) {
  return kind === "update" ? "edit" : kind;
}
function startPushProducer(plugin, state, identity, triggerSync, producerRef, hooks, fileApplyLock) {
  const vault = plugin.app.vault;
  const store = {
    async load() {
      const data = await plugin.loadData();
      const raw = isRecord9(data) ? data[PUSH_PRODUCER_KEY] : null;
      const result = parseProducerStateResult(raw);
      try {
        if (result.status === "corrupt") {
          await preserveCorruptProducerState(plugin, raw, Date.now());
        } else if (result.quarantinedMappings.length > 0) {
          await preserveCorruptProducerState(
            plugin,
            { mappings: result.quarantinedMappings },
            Date.now()
          );
        }
      } catch (error51) {
        console.warn(
          "Havemind: failed to preserve corrupt producer state to a sidecar.",
          error51
        );
      }
      return result.state;
    },
    async save(next) {
      await getPluginDataMutex(plugin).update((base) => ({
        ...base,
        [PUSH_PRODUCER_KEY]: next
      }));
    }
  };
  const repository = new OutboxLocalChangeRepository({
    identity,
    store,
    enqueue: (envelope) => state.enqueue(envelope),
    generateRevisionId: () => globalThis.crypto.randomUUID(),
    // FIX 1: seed the SHARED apply store for every file this device authors or
    // pushes, so a later peer edit to a locally-authored file resolves to its
    // real fileId and updates in place instead of forever forking to a conflict
    // artifact. A rename also forgets the stale owner of the previous path.
    //
    // DATA-SAFETY (rule 3): the base is SEEDED only on first authorship and is
    // NEVER advanced by a local push — advancing it here reopened the silent-
    // overwrite window (a concurrent peer revision matching the just-authored
    // base slips past the on-disk guard). The single source of truth for that
    // rule lives in `local-base-lifecycle.ts`, shared with the integration
    // harness so a regression can't hide behind a differently-modelled test.
    onLocalMaterialized: (materialization) => applyLocalMaterialization(state, materialization),
    onLocalForgotten: (forget) => forgetLocalMaterialization(state, forget)
  });
  producerRef.current = repository;
  const snapshot = {
    async listSyncablePaths() {
      const notes = vault.getFiles().map((file2) => file2.path).filter((path) => {
        const extension = pathExtension(path.normalize("NFC"));
        return extension === "md" || SYNCABLE_BINARY_EXTENSIONS.includes(extension);
      });
      const config2 = await listSyncableConfigPaths(vault.adapter, CONFIG_DIR);
      return [...notes, ...config2];
    },
    async readText(path) {
      if (isSyncableConfigPath(path)) {
        return await vault.adapter.exists(path) ? vault.adapter.read(path) : "";
      }
      const file2 = vault.getAbstractFileByPath(path);
      return file2 === null ? "" : vault.read(file2);
    },
    async readBinary(path) {
      if (isSyncableConfigPath(path)) {
        if (!await vault.adapter.exists(path)) return new Uint8Array(0);
        return new Uint8Array(await vault.adapter.readBinary(path));
      }
      const file2 = vault.getAbstractFileByPath(path);
      if (file2 === null) return new Uint8Array(0);
      return new Uint8Array(await vault.readBinary(file2));
    },
    async listAllPaths() {
      return vault.getFiles().map((file2) => file2.path);
    },
    async exists(path) {
      if (isSyncableConfigPath(path)) return vault.adapter.exists(path);
      return vault.getAbstractFileByPath(path) !== null;
    }
  };
  const observer = new VaultChangeObserver({
    clock: () => Date.now(),
    generateFileId: () => globalThis.crypto.randomUUID(),
    generateOperationId: () => globalThis.crypto.randomUUID(),
    repository,
    vault: snapshot
  });
  const lockedObserve = (path, run) => {
    if (fileApplyLock === void 0) return run();
    const classified = classifyVaultPath(path);
    const key = classified.eligible ? classified.collisionKey : path;
    return fileApplyLock.runExclusive(key, run);
  };
  const afterChange = (task) => {
    void task.then(
      () => triggerSync(),
      (error51) => {
        if (error51 instanceof RevisionPayloadTooLargeError) {
          new import_obsidian6.Notice(`Havemind: ${error51.message}`);
          return;
        }
        new import_obsidian6.Notice(
          "Havemind: a change could not be queued \u2014 see the Havemind panel."
        );
      }
    );
  };
  const recordActivity = (op) => {
    if (op === null || hooks?.onLocalActivity === void 0) return;
    hooks.onLocalActivity({
      // The real revision id the outbox repository generated and enqueued
      // (`OutboxLocalChangeRepository.commitLocalChange`'s `built.revisionId`,
      // surfaced here as `op.revisionId`) — never `op.operationId`, which is
      // only a client-side idempotency key and would break restore + the
      // local-push/remote-echo dedup in `ActivityLog`. Falls back to the
      // operationId only when no revision was created (a delete of a file
      // that was never pushed), so the entry still has a stable, unique id.
      revisionId: op.revisionId ?? op.operationId,
      fileId: op.fileId,
      path: op.path,
      kind: toActivityKind(op.kind),
      author: { kind: "member", membershipId: identity.memberId },
      timestamp: op.observedAt,
      hasContent: op.content !== null
    });
  };
  const observed = (task) => {
    afterChange(
      task.then((op) => {
        recordActivity(op);
        return op;
      })
    );
  };
  const observedMany = (task) => {
    afterChange(
      task.then((ops) => {
        for (const op of ops) recordActivity(op);
        return ops;
      })
    );
  };
  const commitPathRecovery = new CommitPathRecovery({
    notify: (message) => new import_obsidian6.Notice(message),
    rearm: (path) => modifyDebouncer.trigger(path),
    recordFailedToQueue: async (path) => {
      await state.recordFailedToQueue(path);
      hooks?.onFailedToQueueNotified?.(failedToQueueRevisionId(path));
    },
    // MAJOR 1: a successful commit discards any stale failed-to-queue row an
    // earlier transient failure recorded, then refreshes the panel so the
    // phantom failure disappears at once. Guarded on the warm snapshot so the
    // common case (a success with no such row) neither saves nor refreshes.
    clearFailedToQueue: (path) => {
      const revisionId = failedToQueueRevisionId(path);
      const present = state.quarantineSnapshot().some((item) => item.revisionId === revisionId);
      if (!present) return;
      void state.discardQuarantined(revisionId).then(() => {
        hooks?.onSendQueueChanged?.();
      });
    }
  });
  const observeSettledModify = (path) => {
    void lockedObserve(path, () => observer.observeModify(path)).then(
      (op) => {
        recordActivity(op);
        commitPathRecovery.onCommitSuccess(path);
        triggerSync();
      },
      (error51) => {
        if (error51 instanceof RevisionPayloadTooLargeError) {
          new import_obsidian6.Notice(`Havemind: ${error51.message}`);
          return;
        }
        void commitPathRecovery.onCommitFailure(path);
      }
    );
  };
  const modifyDebouncer = new ModifyDebouncer({
    onSettled: (path) => observeSettledModify(path)
  });
  const disposeListeners = registerVaultChangeListeners(vault, {
    onCreate: (path) => observed(lockedObserve(path, () => observer.observeCreate(path))),
    onModify: (path) => modifyDebouncer.trigger(path),
    onDelete: (path) => {
      modifyDebouncer.cancel(path);
      observed(lockedObserve(path, () => observer.observeDelete(path)));
    },
    onRename: (oldPath, newPath) => {
      modifyDebouncer.cancel(oldPath);
      observed(observer.observeRename(oldPath, newPath));
    },
    onFolderRename: (oldPath, newPath) => observedMany(observer.observeFolderRename(oldPath, newPath)),
    onFolderDelete: (folderPath) => observedMany(observer.observeFolderDelete(folderPath))
  });
  afterChange(
    reconcileVaultState({ observer, repository, vault: snapshot }).then(
      (result) => {
        if (result.skipped > 0) {
          new import_obsidian6.Notice(
            `Havemind: ${result.skipped} file(s) could not be synced and were skipped.`
          );
          warnSkippedPaths(result);
        }
        for (const notice of formatReconcileNotices(result)) {
          new import_obsidian6.Notice(notice);
        }
      }
    )
  );
  const configObserver = {
    observeModify: (path) => lockedObserve(path, () => observer.observeModify(path)),
    observeDelete: (path) => lockedObserve(path, () => observer.observeDelete(path))
  };
  const runConfigPollTick = createConfigPollTick({
    poll: () => pollConfigOnce({
      observer: configObserver,
      listConfigPaths: () => listSyncableConfigPaths(vault.adapter, CONFIG_DIR),
      listMappings: () => repository.listMappings()
    }),
    recordActivity,
    triggerSync,
    notify: (message) => new import_obsidian6.Notice(message)
  });
  const configPollId = window.setInterval(() => {
    void runConfigPollTick();
  }, CONFIG_POLL_INTERVAL_MS);
  plugin.registerInterval(configPollId);
  return {
    dispose: () => {
      window.clearInterval(configPollId);
      modifyDebouncer.dispose();
      disposeListeners();
    },
    // MAJOR 2: a failed-to-queue row has no stashed envelope, so its Retry
    // re-runs the commit chain against the current on-disk content — routed
    // through the SAME debouncer trigger the bounded re-arm uses. Tri-state
    // (FINDING 1): `file-missing` when the file is gone (drop the row),
    // `unavailable` when the debouncer no-op'd the re-arm because it was disposed
    // (keep the row), `retriggered` on a real re-arm. `trigger` reports whether
    // it actually scheduled, which is exactly the disposed/unavailable signal.
    retryFailedCommit: (path) => retryFailedCommit(path, {
      exists: (candidate) => vault.getAbstractFileByPath(candidate) !== null,
      retrigger: (candidate) => modifyDebouncer.trigger(candidate)
    })
  };
}

// src/runtime/adapters/tokens.ts
function generateBrandedToken(prefix) {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const base64url3 = btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
  return `${prefix}${base64url3}`;
}
function generateRefreshTokenValue() {
  return generateBrandedToken("hm_rt_");
}
function generateRotationIdValue() {
  return generateBrandedToken("hm_ri_");
}
async function sha256Hex3(value) {
  const data = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

// src/runtime/adapters/sync-loop.ts
var NOOP_HANDLE = {
  stop: () => void 0,
  serverName: ""
};
function serverNameFromUrl(apiBaseUrl) {
  try {
    return new URL(apiBaseUrl).host;
  } catch {
    return apiBaseUrl;
  }
}
async function startSyncLoop(plugin, connection, onStatus, extras = {}) {
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const accessProvider = new RefreshTokenAccessProvider({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connection.apiBaseUrl,
    getRefreshToken: () => secrets.getRefreshToken(),
    saveRefreshToken: (value) => secrets.saveRefreshToken(value),
    generateRotationId: generateRotationIdValue,
    generateSuccessorToken: generateRefreshTokenValue,
    // GAP-5: durable in-flight rotation persistence. Connect-safe — the
    // provider swallows any load/save/clear failure and degrades to
    // in-memory-only, so a SecretStorage outage never aborts connect or sync.
    loadPendingRotation: () => secrets.getPendingRotation(),
    savePendingRotation: (record2) => secrets.savePendingRotation(record2),
    clearPendingRotation: () => secrets.clearPendingRotation()
  });
  const resolvers = buildConnectionResolvers({
    apiBaseUrl: connection.apiBaseUrl,
    vaultId: connection.vaultId,
    getAccessToken: () => accessProvider.getAccessToken(),
    requestUrl: createRequestUrlFn()
  });
  const hasPushIdentity = connection.memberId !== void 0 && connection.deviceId !== void 0;
  const producerRef = {
    current: null
  };
  const producerSync = createRemoteApplyProducerSync(() => producerRef.current);
  const fileApplyLock = new KeyedMutex();
  const { controller, state } = buildSyncController(
    plugin,
    {
      apiBaseUrl: resolvers.apiBaseUrl,
      vaultId: resolvers.vaultId,
      getAuthToken: resolvers.getAuthToken,
      resolveRevision: resolvers.resolveRevision,
      // Re-stamp the live identity onto every outbound header so a revision that
      // a prior-session producer enqueued can never ship a stale actor (rule 3).
      ...hasPushIdentity ? {
        pushIdentity: {
          memberId: connection.memberId,
          deviceId: connection.deviceId
        }
      } : {}
    },
    onStatus,
    extras.hooks,
    producerSync,
    fileApplyLock
  );
  await runCanonicalizationRebase(plugin);
  controller.start();
  let producer = null;
  if (hasPushIdentity) {
    producer = startPushProducer(
      plugin,
      state,
      {
        vaultId: connection.vaultId,
        memberId: connection.memberId,
        deviceId: connection.deviceId
      },
      () => {
        void controller.syncNow();
      },
      producerRef,
      extras.hooks,
      fileApplyLock
    );
  }
  const selfMembership = connection.memberId === void 0 ? void 0 : { membershipId: connection.memberId, role: extras.role ?? "editor" };
  return {
    ...selfMembership === void 0 ? {} : { selfMembership },
    // The live durable state, so the plugin can read the send-queue (SND-01) and
    // drive the auto-repair sweep (MRG-05) off the same store the runner uses.
    state,
    // Tearing the producer's vault listeners down on stop is critical: a re-pair
    // (or reconnect) calls stop() on the previous handle before starting a new
    // one, and without this the prior-session observer stays attached and keeps
    // enqueuing revisions stamped with the OLD identity alongside the new one —
    // the exact mix of accepted (current identity) and 403-rejected (stale
    // identity) pushes. Disposing here guarantees exactly one live producer.
    stop: () => {
      controller.stop();
      producer?.dispose();
    },
    // MAJOR 2: the panel routes Retry on a failed-to-queue row here so the
    // commit chain re-runs from disk. Absent when no producer started (no push
    // identity), which is also when no failed-to-queue row can exist.
    ...producer === null ? {} : { retryFailedCommit: producer.retryFailedCommit },
    serverName: serverNameFromUrl(connection.apiBaseUrl)
  };
}

// src/runtime/adapters/connect-flows.ts
var APPROVAL_POLL_INTERVAL_MS = 5e3;
var MAX_CONNECT_STEPS = 720;
var OWNER_DEVICE_LABEL = "Havemind owner device";
var INVITEE_DEVICE_LABEL = "Havemind device";
async function startHavemindConnection(plugin, onStatus, hooks) {
  const gate = await evaluateOwnerConnection(plugin);
  if (gate.kind === "reset-required") {
    try {
      await preserveCorruptOwnerConnection(plugin, gate.raw, Date.now());
    } catch (error51) {
      console.warn(
        "Havemind: failed to preserve the damaged connection record to a sidecar.",
        error51
      );
    }
    console.warn(
      `Havemind: the stored connection is unusable (${gate.reason}); reset it and pair this device again.`
    );
    onStatus("reset-required", HAVEMIND_STATUS_RESET_REQUIRED);
    return NOOP_HANDLE;
  }
  if (gate.kind === "connect") {
    return startSyncLoop(plugin, gate.connection, onStatus, {
      role: "owner",
      ...hooks === void 0 ? {} : { hooks }
    });
  }
  const { controller: onboarding } = await buildOnboardingController(plugin);
  const connectedState = await driveToConnected({
    controller: onboarding,
    sleep: (ms) => new Promise((resolve) => window.setTimeout(resolve, ms)),
    pollIntervalMs: APPROVAL_POLL_INTERVAL_MS,
    maxSteps: MAX_CONNECT_STEPS
  });
  if (!isConnectedOnboardingState(connectedState)) {
    onStatus("disconnected", HAVEMIND_STATUS_DISCONNECTED);
    return NOOP_HANDLE;
  }
  const connected = connectedState;
  return startSyncLoop(plugin, connected, onStatus, { role: "editor", ...hooks === void 0 ? {} : { hooks } });
}
async function connectFromInput(plugin, input, serverUrl, options) {
  const kind = classifyConnectInput(input);
  try {
    if (kind === "pairing") {
      return await connectAsOwner(plugin, input.trim(), serverUrl, options);
    }
    if (kind === "envelope") {
      return await connectAsInvitee(plugin, input.trim(), options);
    }
    options.report(
      "Unrecognised input. Paste a v1.\u2026 invitation or an hm_pt_\u2026 pairing token."
    );
    return null;
  } catch (error51) {
    options.report(`Could not connect: ${describeError(error51)}`);
    return null;
  }
}
async function connectAsOwner(plugin, pairingToken, serverUrl, options) {
  const apiBaseUrl = normalizeServerOrigin(serverUrl);
  if (apiBaseUrl === null) {
    options.report("Enter the server URL (https://\u2026) to pair the owner device.");
    return null;
  }
  options.report("Pairing owner device\u2026");
  const refreshToken = generateRefreshTokenValue();
  const pairing = await pairOwnerDevice({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl,
    deviceLabel: OWNER_DEVICE_LABEL,
    initialRefreshTokenHash: await sha256Hex3(refreshToken),
    pairingToken
  });
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  await secrets.saveRefreshToken(refreshToken);
  const connection = {
    apiBaseUrl,
    vaultId: pairing.vaultId,
    deviceId: pairing.deviceId,
    ...pairing.memberId === void 0 ? {} : { memberId: pairing.memberId }
  };
  await writeOwnerConnection(plugin, connection);
  options.report("Connected. Syncing\u2026");
  return startSyncLoop(plugin, connection, options.onStatus, {
    role: "owner",
    ...options.hooks === void 0 ? {} : { hooks: options.hooks }
  });
}
async function connectAsInvitee(plugin, envelope, options) {
  const { controller: onboarding } = await buildOnboardingController(plugin);
  options.report("Reviewing invitation\u2026");
  onboarding.beginFromPastedEnvelope(envelope);
  await onboarding.loadInvitationReview();
  options.report("Redeeming invitation\u2026");
  const pending = await onboarding.confirmInvitation(INVITEE_DEVICE_LABEL);
  if (pending.phase === "pending-approval") {
    options.report(
      `Ask the owner to approve this phrase: ${pending.verificationPhrase}. Waiting\u2026`
    );
    options.onPendingApproval?.(pending.verificationPhrase);
  }
  const state = await driveToConnected({
    controller: onboarding,
    sleep: (ms) => new Promise((resolve) => window.setTimeout(resolve, ms)),
    pollIntervalMs: APPROVAL_POLL_INTERVAL_MS,
    maxSteps: MAX_CONNECT_STEPS
  });
  if (state.phase === "rejected") {
    options.report(
      "This invitation is no longer valid \u2014 ask the owner for a new one."
    );
    options.onInvitationRejected?.();
    return null;
  }
  if (!isConnectedOnboardingState(state)) {
    options.report("Timed out waiting for approval. Try Connect again.");
    return null;
  }
  const connected = state;
  options.report("Connected. Syncing\u2026");
  return startSyncLoop(plugin, connected, options.onStatus, {
    role: "editor",
    ...options.hooks === void 0 ? {} : { hooks: options.hooks }
  });
}
function normalizeServerOrigin(value) {
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  try {
    const url2 = new URL(trimmed);
    if (url2.protocol !== "https:") return null;
    return url2.origin;
  } catch {
    return null;
  }
}
function describeError(error51) {
  return error51 instanceof Error ? error51.message : "unexpected error";
}

// src/runtime/approve-device.ts
var ApproveDeviceError = class extends Error {
  constructor(message, options = {}) {
    super(message);
    __publicField(this, "name", "ApproveDeviceError");
    /** Attempts left after a wrong code, when the server reported it. */
    __publicField(this, "attemptsRemaining");
    /** True when the invitation is now locked (too many wrong codes). */
    __publicField(this, "locked");
    this.locked = options.locked ?? false;
    if (options.attemptsRemaining !== void 0) {
      this.attemptsRemaining = options.attemptsRemaining;
    }
  }
};
var LOCKED_MESSAGE = "Too many incorrect codes. This invitation is now invalid \u2014 create a new one.";
var MESSAGE_BY_CODE = {
  FORBIDDEN: "You are not the owner of this vault, so you cannot approve here.",
  NOT_FOUND: "No pending device is waiting for this invitation.",
  REDEEMED: "This invitation has no device awaiting approval.",
  GONE: "This invitation has expired. Create a new one."
};
async function approveRedeemedDevice(options) {
  const token = await options.getAccessToken();
  const response = await options.requestUrl({
    url: `${options.apiBaseUrl}/vaults/${options.vaultId}/invitations/${options.invitationId}/approve`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    throw: false,
    body: JSON.stringify({ verificationPhrase: options.verificationPhrase })
  });
  if (response.status < 200 || response.status >= 300) {
    throw describeFailure(response.status, response.json);
  }
  const json2 = response.json;
  if (!isRecord16(json2) || typeof json2.deviceId !== "string" || typeof json2.membershipId !== "string" || typeof json2.userId !== "string") {
    throw new ApproveDeviceError("The approval response was malformed.");
  }
  return {
    deviceId: json2.deviceId,
    membershipId: json2.membershipId,
    userId: json2.userId,
    status: "approved"
  };
}
function describeFailure(status, json2) {
  const error51 = isRecord16(json2) && isRecord16(json2.error) ? json2.error : void 0;
  const code = typeof error51?.code === "string" ? error51.code : void 0;
  const attemptsRemaining = typeof error51?.attemptsRemaining === "number" ? error51.attemptsRemaining : void 0;
  if (code === "PHRASE_MISMATCH") {
    const remaining = attemptsRemaining ?? 0;
    const plural = remaining === 1 ? "attempt" : "attempts";
    return new ApproveDeviceError(
      `Incorrect code \u2014 ${remaining} ${plural} left.`,
      { attemptsRemaining: remaining }
    );
  }
  if (code === "APPROVAL_LOCKED") {
    return new ApproveDeviceError(LOCKED_MESSAGE, { locked: true });
  }
  const known = code === void 0 ? void 0 : MESSAGE_BY_CODE[code];
  if (known !== void 0) {
    return new ApproveDeviceError(known);
  }
  return new ApproveDeviceError(`Approval returned HTTP ${status}.`);
}
function isRecord16(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/create-invitation.ts
var CreateInvitationError = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "CreateInvitationError");
  }
};
async function createVaultInvitation(options) {
  const token = await options.getAccessToken();
  const body = {};
  if (options.intendedRole !== void 0) body.intendedRole = options.intendedRole;
  if (options.intendedMemberDisplayName !== void 0) {
    body.intendedMemberDisplayName = options.intendedMemberDisplayName;
  }
  const response = await options.requestUrl({
    url: `${options.apiBaseUrl}/vaults/${options.vaultId}/invitations`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    throw: false,
    body: JSON.stringify(body)
  });
  if (response.status < 200 || response.status >= 300) {
    throw new CreateInvitationError(
      `Invitation creation returned HTTP ${response.status}.`
    );
  }
  const json2 = response.json;
  if (!isRecord17(json2) || typeof json2.invitationToken !== "string" || typeof json2.expiresAt !== "string" || typeof json2.invitationId !== "string") {
    throw new CreateInvitationError("Invitation response was malformed.");
  }
  let envelope;
  try {
    envelope = buildInviteEnvelope({
      serverOrigin: options.serverOrigin,
      invitationToken: json2.invitationToken
    });
  } catch (error51) {
    throw new CreateInvitationError(
      "Server returned an invalid invitation token.",
      { cause: error51 }
    );
  }
  return {
    envelope,
    expiresAt: json2.expiresAt,
    invitationId: json2.invitationId
  };
}
function isRecord17(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/runtime/remove-member.ts
var RevokeMembershipError = class extends Error {
  constructor(message, status) {
    super(message);
    __publicField(this, "name", "RevokeMembershipError");
    __publicField(this, "status");
    this.status = status;
  }
};
async function revokeMembership(options) {
  const token = await options.getAccessToken();
  const response = await options.requestUrl({
    url: `${options.apiBaseUrl}/owner/memberships/${options.membershipId}/revoke`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    throw: false,
    body: JSON.stringify({})
  });
  if (response.status < 200 || response.status >= 300) {
    throw new RevokeMembershipError(
      `Remove member request failed with HTTP ${response.status}.`,
      response.status
    );
  }
  return { membershipId: options.membershipId, status: "removed" };
}

// src/runtime/adapters/owner-actions.ts
async function createInvitationForOwner(plugin, options) {
  const connected = await resolveConnectedVault(plugin);
  if (connected === null) {
    return null;
  }
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const accessProvider = new RefreshTokenAccessProvider({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    getRefreshToken: () => secrets.getRefreshToken(),
    saveRefreshToken: (value) => secrets.saveRefreshToken(value),
    generateRotationId: generateRotationIdValue,
    generateSuccessorToken: generateRefreshTokenValue,
    // GAP-5: durable in-flight rotation persistence. Connect-safe — the
    // provider swallows any load/save/clear failure and degrades to
    // in-memory-only, so a SecretStorage outage never aborts connect or sync.
    loadPendingRotation: () => secrets.getPendingRotation(),
    savePendingRotation: (record2) => secrets.savePendingRotation(record2),
    clearPendingRotation: () => secrets.clearPendingRotation()
  });
  return createVaultInvitation({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    serverOrigin: connected.serverOrigin,
    vaultId: connected.vaultId,
    getAccessToken: () => accessProvider.getAccessToken(),
    ...options?.intendedRole === void 0 ? {} : { intendedRole: options.intendedRole },
    ...options?.intendedMemberDisplayName === void 0 ? {} : { intendedMemberDisplayName: options.intendedMemberDisplayName }
  });
}
async function approvePendingDeviceForOwner(plugin, options) {
  const connected = await resolveConnectedVault(plugin);
  if (connected === null) {
    return null;
  }
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const accessProvider = new RefreshTokenAccessProvider({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    getRefreshToken: () => secrets.getRefreshToken(),
    saveRefreshToken: (value) => secrets.saveRefreshToken(value),
    generateRotationId: generateRotationIdValue,
    generateSuccessorToken: generateRefreshTokenValue,
    // GAP-5: durable in-flight rotation persistence. Connect-safe — the
    // provider swallows any load/save/clear failure and degrades to
    // in-memory-only, so a SecretStorage outage never aborts connect or sync.
    loadPendingRotation: () => secrets.getPendingRotation(),
    savePendingRotation: (record2) => secrets.savePendingRotation(record2),
    clearPendingRotation: () => secrets.clearPendingRotation()
  });
  return approveRedeemedDevice({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    vaultId: connected.vaultId,
    invitationId: options.invitationId,
    verificationPhrase: options.verificationPhrase,
    getAccessToken: () => accessProvider.getAccessToken()
  });
}
async function requestRejoinGrantForOwner(plugin, options) {
  const connected = await resolveConnectedVault(plugin);
  if (connected === null) {
    return null;
  }
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const accessProvider = new RefreshTokenAccessProvider({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    getRefreshToken: () => secrets.getRefreshToken(),
    saveRefreshToken: (value) => secrets.saveRefreshToken(value),
    generateRotationId: generateRotationIdValue,
    generateSuccessorToken: generateRefreshTokenValue,
    // GAP-5: durable in-flight rotation persistence. Connect-safe — the
    // provider swallows any load/save/clear failure and degrades to
    // in-memory-only, so a SecretStorage outage never aborts connect or sync.
    loadPendingRotation: () => secrets.getPendingRotation(),
    savePendingRotation: (record2) => secrets.savePendingRotation(record2),
    clearPendingRotation: () => secrets.clearPendingRotation()
  });
  return requestRejoinGrant({
    apiBaseUrl: connected.apiBaseUrl,
    requestUrl: createRequestUrlFn(),
    getAccessToken: () => accessProvider.getAccessToken(),
    membershipId: options.membershipId
  });
}
async function revokeMembershipForOwner(plugin, options) {
  const connected = await resolveConnectedVault(plugin);
  if (connected === null) {
    return null;
  }
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const accessProvider = new RefreshTokenAccessProvider({
    requestUrl: createRequestUrlFn(),
    apiBaseUrl: connected.apiBaseUrl,
    getRefreshToken: () => secrets.getRefreshToken(),
    saveRefreshToken: (value) => secrets.saveRefreshToken(value),
    generateRotationId: generateRotationIdValue,
    generateSuccessorToken: generateRefreshTokenValue,
    // GAP-5: durable in-flight rotation persistence. Connect-safe — the
    // provider swallows any load/save/clear failure and degrades to
    // in-memory-only, so a SecretStorage outage never aborts connect or sync.
    loadPendingRotation: () => secrets.getPendingRotation(),
    savePendingRotation: (record2) => secrets.savePendingRotation(record2),
    clearPendingRotation: () => secrets.clearPendingRotation()
  });
  return revokeMembership({
    apiBaseUrl: connected.apiBaseUrl,
    requestUrl: createRequestUrlFn(),
    getAccessToken: () => accessProvider.getAccessToken(),
    membershipId: options.membershipId
  });
}

// src/runtime/adapters/rejoin-wiring.ts
async function readRejoinIdentity(plugin) {
  const owner = await readOwnerConnection(plugin);
  if (owner !== null && owner.deviceId !== void 0 && owner.memberId !== void 0) {
    return {
      apiBaseUrl: owner.apiBaseUrl,
      deviceId: owner.deviceId,
      membershipId: owner.memberId,
      role: "owner"
    };
  }
  const { controller: onboarding } = await buildOnboardingController(plugin);
  const state = await onboarding.resume();
  if (isConnectedOnboardingState(state)) {
    const connected = state;
    if (typeof connected.deviceId === "string" && typeof connected.memberId === "string") {
      return {
        apiBaseUrl: connected.apiBaseUrl,
        deviceId: connected.deviceId,
        membershipId: connected.memberId,
        role: "invitee"
      };
    }
  }
  return null;
}
async function buildRejoinControllerForInvitee(plugin) {
  const identity = await readRejoinIdentity(plugin);
  if (identity === null || identity.role === "owner") {
    return null;
  }
  const clientInstanceId = await ensureClientInstanceId(
    createClientInstanceRepo(plugin)
  );
  const secrets = new ObsidianOnboardingSecrets({
    clientInstanceId,
    secretStorage: plugin.app.secretStorage
  });
  const rejoinSecret = await secrets.getRejoinSecret();
  if (rejoinSecret === null) {
    return null;
  }
  const candidateToken = generateRefreshTokenValue();
  const candidateTokenHash = await sha256Hex3(candidateToken);
  return new RejoinController({
    apiBaseUrl: identity.apiBaseUrl,
    requestUrl: createRequestUrlFn(),
    membershipId: identity.membershipId,
    deviceId: identity.deviceId,
    rejoinSecret,
    generateRefreshToken: () => candidateToken,
    hashRefreshToken: () => candidateTokenHash,
    saveRefreshToken: (token) => secrets.saveRefreshToken(token)
  });
}

// src/runtime/clipboard.ts
async function copyTextToClipboard(text, deps) {
  if (deps.clipboard) {
    try {
      await deps.clipboard.writeText(text);
      return true;
    } catch {
    }
  }
  if (deps.fallbackCopy) {
    try {
      return deps.fallbackCopy(text);
    } catch {
      return false;
    }
  }
  return false;
}
function browserClipboardCopyDeps() {
  return {
    clipboard: typeof navigator !== "undefined" && navigator.clipboard ? navigator.clipboard : void 0,
    fallbackCopy: (text) => {
      if (typeof document === "undefined") return false;
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "true");
      field.style.position = "fixed";
      field.style.opacity = "0";
      const node = field;
      document.body.appendChild(node);
      field.select();
      let copied;
      try {
        copied = document.execCommand("copy");
      } finally {
        document.body.removeChild(node);
      }
      return copied;
    }
  };
}

// src/ui/activity-view.ts
var import_obsidian8 = require("obsidian");

// src/runtime/activity-render.ts
function defaultFormatTimestamp3(timestamp) {
  return new Date(timestamp).toISOString();
}
function buildActivityViewModel(records, options = {}) {
  const format = options.formatTimestamp ?? defaultFormatTimestamp3;
  const rows = buildActivityFeed(records).map(
    (entry) => ({
      revisionId: entry.revisionId,
      fileId: entry.fileId,
      label: `${entry.kind} \xB7 ${entry.path} \xB7 ${entry.actorLabel}`,
      headline: `${entry.actorLabel} ${entry.kind}`,
      pathLabel: entry.path,
      timestamp: entry.timestamp,
      timeLabel: format(entry.timestamp),
      colorToken: entry.actorId === null ? INITIAL_IMPORT_COLOR_TOKEN : authorColorToken(entry.actorId),
      canRestore: entry.canRestore
    })
  );
  return { empty: rows.length === 0, rows };
}

// src/ui/primitives.ts
var import_obsidian7 = require("obsidian");
function prefersReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var DECORATIVE = { "aria-hidden": "true" };
function formatActivityTime(timestamp) {
  const date5 = new Date(timestamp);
  return `${date5.toLocaleDateString()} ${date5.toLocaleTimeString()}`;
}
function renderViewTitle(content, text) {
  const heading = content.createEl("h3", { text });
  heading.addClass("havemind-view-title");
  const icon = heading.createEl("span", { attr: DECORATIVE });
  icon.addClass("havemind-title-icon");
  (0, import_obsidian7.setIcon)(icon, "hexagon");
}
function renderSection(content, name, render) {
  try {
    render();
  } catch (error51) {
    console.error(`Havemind: the "${name}" panel section failed to render`, error51);
    const fallback = content.createDiv({ text: "Section unavailable" });
    fallback.addClass("havemind-section-error");
  }
}
function armedButton(parent, label, confirmLabel, cls, onConfirm) {
  let armed = false;
  let executed = false;
  const button = parent.createEl("button", { text: label });
  button.addClass(cls);
  button.onClickEvent(() => {
    if (executed) return;
    if (!armed) {
      armed = true;
      button.setText(confirmLabel);
      button.addClass("havemind-conflict-action-armed");
      return;
    }
    executed = true;
    onConfirm();
  });
}

// src/ui/view-types.ts
var HAVEMIND_ACTIVITY_VIEW = "havemind-activity";
var HAVEMIND_ONBOARDING_VIEW = "havemind-onboarding";

// src/ui/activity-view.ts
var EMPTY_ACTIVITY_TEXT = "No activity yet. Connect to a vault to see changes as they happen.";
var HavemindActivityView = class extends import_obsidian8.ItemView {
  constructor(leaf, options = {}) {
    super(leaf);
    __publicField(this, "options");
    this.options = options;
  }
  getDisplayText() {
    return "Havemind activity";
  }
  getIcon() {
    return "hexagon";
  }
  getViewType() {
    return HAVEMIND_ACTIVITY_VIEW;
  }
  onOpen() {
    this.render();
  }
  /** Re-renders from the live feed — called when the activity log changes. */
  refresh() {
    this.render();
  }
  render() {
    const content = this.containerEl.children[1];
    if (!content) return;
    content.empty();
    content.addClass("havemind-view");
    renderViewTitle(content, "Havemind activity");
    renderSection(content, "activity", () => {
      const model = buildActivityViewModel(this.options.feedProvider?.() ?? [], {
        formatTimestamp: formatActivityTime
      });
      if (model.empty) {
        const empty = content.createDiv({ text: EMPTY_ACTIVITY_TEXT });
        empty.addClass("havemind-empty");
        return;
      }
      for (const row of model.rows) {
        const entry = content.createDiv();
        entry.addClass("havemind-activity-row");
        const text = entry.createDiv();
        text.createDiv({ text: row.headline });
        text.createDiv({ text: row.pathLabel }).addClass("havemind-hint");
        entry.style.setProperty("--havemind-row-color", `var(${row.colorToken})`);
        if (row.canRestore && this.options.onRestore) {
          const restore = entry.createEl("button", { text: "Restore" });
          restore.addClass("havemind-activity-action");
          restore.onClickEvent(() => this.options.onRestore?.(row.revisionId));
        }
        const time3 = entry.createEl("span", { text: ` ${row.timeLabel}` });
        time3.addClass("havemind-activity-time");
      }
    });
  }
};

// src/ui/conflict-modal.ts
var import_obsidian9 = require("obsidian");
function buildConflictModalModel(copy, diff) {
  return {
    title: copy.noteName ?? copy.copyName,
    author: copy.author,
    timestamp: copy.timestamp,
    isBinary: copy.isBinary,
    targetKnown: copy.targetKnown,
    diff,
    manualHint: copy.manualHint
  };
}
function renderConflictModalBody(container, model, actions) {
  container.addClass("havemind-conflict-modal");
  renderViewTitle(container, `Resolve conflict \u2014 ${model.title}`);
  if (model.author !== null && model.timestamp !== null) {
    const meta3 = container.createDiv({
      text: `Conflict from ${model.author} \xB7 ${model.timestamp}`
    });
    meta3.addClass("havemind-conflict-modal-meta");
  }
  if (model.manualHint !== null) {
    const hint = container.createDiv({ text: model.manualHint });
    hint.addClass("havemind-conflict-hint");
  }
  if (model.diff !== null) {
    const diffBox = container.createDiv({ text: "" });
    diffBox.addClass("havemind-conflict-diff");
    for (const line of model.diff) {
      const prefix = line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  ";
      const row = diffBox.createDiv({ text: `${prefix}${line.text}` });
      row.addClass("havemind-conflict-line");
      row.addClass(`havemind-conflict-line-${line.type}`);
    }
  }
  const buttons = container.createDiv({ text: "" });
  buttons.addClass("havemind-conflict-buttons");
  if (actions.onKeepMine) {
    armedButton(
      buttons,
      "Keep mine",
      "Confirm keep mine",
      "mod-warning",
      actions.onKeepMine
    );
  }
  if (actions.onKeepTheirs && model.targetKnown && !model.isBinary) {
    armedButton(
      buttons,
      "Keep theirs",
      "Confirm keep theirs",
      "mod-warning",
      actions.onKeepTheirs
    );
  }
  const keepBoth = buttons.createEl("button", { text: "Keep both (close)" });
  keepBoth.addClass("havemind-conflict-action");
  keepBoth.onClickEvent(() => actions.onKeepBoth());
}
var ConflictResolveModal = class extends import_obsidian9.Modal {
  constructor(app, model, actions) {
    super(app);
    __publicField(this, "model");
    __publicField(this, "actions");
    this.model = model;
    this.actions = actions;
  }
  onOpen() {
    renderConflictModalBody(this.contentEl, this.model, this.actions);
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/onboarding-view.ts
var import_obsidian12 = require("obsidian");

// src/runtime/getting-started-render.ts
var SELF_HOSTING_DOC_PATH = "https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md";
function buildGettingStartedViewModel() {
  return {
    title: "Getting started",
    requirement: "Havemind needs a self-hosted server on your Tailscale network \u2014 there is no cloud. Connect to one you were given, or run your own.",
    steps: [
      {
        number: 1,
        text: "Install and connect Tailscale, and make sure it shows connected."
      },
      {
        number: 2,
        text: "Get your Server URL and a pairing token from whoever runs your Havemind server, or set up your own.",
        docRef: { label: "Self-hosting guide", url: SELF_HOSTING_DOC_PATH }
      },
      {
        number: 3,
        text: "Paste the Server URL and pairing token below, then select Connect."
      },
      {
        number: 4,
        text: "Joining someone's vault? Read the 6-digit code aloud to the owner so they can approve you."
      },
      {
        number: 5,
        text: "Done \u2014 your edits sync to the other devices in about a second. Use a dedicated vault, and don't run another sync tool on it."
      }
    ],
    footnote: "New here? Installing the plugin and running a server are covered in the project README and docs/self-hosting.md."
  };
}

// src/ui/conflict-section.ts
var import_obsidian10 = require("obsidian");
function renderConflictSection(content, copies, actions) {
  if (copies.length === 0) return;
  const header = content.createDiv({ text: "" });
  header.addClass("havemind-conflict-header");
  const icon = header.createEl("span", { attr: DECORATIVE });
  icon.addClass("havemind-conflict-icon");
  (0, import_obsidian10.setIcon)(icon, "git-merge");
  header.createEl("span", { text: " Conflicts" });
  const badge = header.createEl("span", { text: `${copies.length}` });
  badge.addClass("havemind-conflict-count");
  for (const copy of copies) {
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-conflict-row");
    const name = copy.noteName ?? copy.copyName;
    row.createEl("span", { text: name }).addClass("havemind-conflict-note");
    if (copy.author !== null && copy.timestamp !== null) {
      row.createEl("span", {
        text: ` \xB7 ${copy.author} \xB7 ${copy.timestamp}`
      }).addClass("havemind-conflict-meta");
    }
    if (copy.manualHint !== null) {
      const hint = row.createDiv({ text: copy.manualHint });
      hint.addClass("havemind-conflict-hint");
    }
    const resolve = row.createEl("button", { text: "Resolve" });
    resolve.addClass("mod-cta");
    resolve.addClass("havemind-conflict-action");
    resolve.onClickEvent(() => actions.onResolve(copy.copyPath));
  }
}

// src/ui/getting-started-section.ts
function renderGettingStarted(content, model) {
  const wrap = content.createDiv();
  wrap.addClass("havemind-getting-started");
  wrap.createEl("h4", { text: model.title });
  wrap.createDiv({ text: model.requirement }).addClass("havemind-getting-started-requirement");
  for (const step of model.steps) {
    const row = wrap.createDiv();
    row.addClass("havemind-step");
    const badge = row.createEl("span", { text: String(step.number) });
    badge.addClass("havemind-step-number");
    const body = row.createDiv();
    body.addClass("havemind-step-text");
    body.createEl("span", { text: step.text });
    if (step.docRef) {
      body.createEl("span", { text: " " });
      const link = body.createEl("a", {
        text: step.docRef.label,
        attr: { href: step.docRef.url, target: "_blank", rel: "noopener" }
      });
      link.addClass("havemind-step-link");
    }
  }
  wrap.createDiv({ text: model.footnote }).addClass("havemind-hint");
}

// src/ui/roster-section.ts
var import_obsidian11 = require("obsidian");
function renderRejoinRoster(content, roster, actions) {
  content.createEl("h4", { text: "Connected" });
  if (roster.empty) {
    const empty = content.createDiv({
      text: "No members yet. Approved devices appear here as connected."
    });
    empty.addClass("havemind-empty");
    return;
  }
  for (const row of roster.rows) {
    const item = content.createDiv({ text: "" });
    item.addClass("havemind-roster-row");
    const dot = item.createEl("span", { attr: DECORATIVE });
    dot.addClass("havemind-roster-dot");
    if (!row.connected) dot.addClass("is-disconnected");
    dot.style.setProperty(
      "color",
      row.self ? "var(--interactive-accent)" : `var(${row.colorToken})`
    );
    (0, import_obsidian11.setIcon)(dot, row.connected ? "circle" : "circle-off");
    const text = item.createDiv();
    text.createDiv({ text: row.displayName });
    text.createDiv({
      text: row.self ? `${row.role} \xB7 you` : `${row.role} \xB7 ${row.statusLabel}`
    }).addClass("havemind-hint");
    if (row.rejoinable && actions.onRejoin) {
      if (actions.waiting.has(row.membershipId)) {
        const status = item.createDiv({
          text: `Waiting for ${row.displayName} to reconnect\u2026`
        });
        status.addClass("havemind-rejoin-waiting");
      } else {
        const rejoin = item.createEl("button", { text: "Rejoin" });
        rejoin.addClass("mod-cta");
        rejoin.addClass("havemind-roster-action");
        rejoin.onClickEvent(() => actions.onRejoin?.(row.membershipId));
      }
    } else if (row.connected && !row.self && actions.onMarkDisconnected) {
      const mark = item.createEl("button", { text: "Mark offline" });
      mark.addClass("havemind-roster-action");
      mark.onClickEvent(() => actions.onMarkDisconnected?.(row.membershipId));
    }
    if (row.removable && actions.onRemove) {
      let armed = false;
      let executed = false;
      const remove = item.createEl("button", { text: "Remove" });
      remove.addClass("mod-warning");
      remove.addClass("havemind-roster-action");
      remove.onClickEvent(() => {
        if (executed) {
          return;
        }
        if (!armed) {
          armed = true;
          remove.setText("Confirm remove");
          remove.addClass("havemind-roster-action-armed");
          return;
        }
        executed = true;
        actions.onRemove?.(row.membershipId);
      });
    }
  }
}

// src/ui/send-queue-section.ts
function renderSendQueueSection(content, view, actions) {
  if (view.waitingCount > 0) {
    const waiting = content.createDiv({
      text: `${view.waitingCount} change(s) waiting to send`
    });
    waiting.addClass("havemind-send-waiting");
  }
  if (view.failed.length === 0) return;
  const header = content.createDiv({
    text: `${view.failed.length} change(s) failed to send`
  });
  header.addClass("havemind-send-failed");
  for (const row of view.failed) {
    const item = content.createDiv({ text: "" });
    item.addClass("havemind-send-failed-row");
    item.createEl("span", { text: row.label }).addClass("havemind-send-file");
    item.createEl("span", { text: ` \xB7 ${row.reason}` }).addClass("havemind-send-reason");
    const retry = item.createEl("button", { text: "Retry" });
    retry.addClass("havemind-send-action");
    retry.onClickEvent(() => actions.onRetry(row.revisionId));
    armedButton(
      item,
      "Discard",
      "Confirm discard",
      "mod-warning",
      () => actions.onDiscard(row.revisionId)
    );
  }
}
function renderRecoveryNotice(content, recoveryRequired) {
  if (!recoveryRequired) return;
  const row = content.createDiv({
    text: "Local queue needs recovery \u2014 some unsent changes could not be read and were preserved for manual recovery."
  });
  row.addClass("havemind-send-recovery");
}

// src/ui/onboarding-view.ts
var HavemindOnboardingView = class extends import_obsidian12.ItemView {
  constructor(leaf, options = {}) {
    super(leaf);
    __publicField(this, "options");
    /**
     * In-progress typed input that must survive a re-render. A status change can
     * re-render the view while the owner/guest is mid-typing; capturing these
     * before `empty()` and restoring them after keeps the flow resumable rather
     * than discarding work the user still needs.
     */
    __publicField(this, "draft", { token: "", server: "", role: "editor", name: "" });
    /**
     * Whether the collapsed "Getting started" help is expanded in the connected
     * panel. Disconnected users always see the tutorial; once connected it hides
     * behind a small help button so it is discoverable without nagging.
     */
    __publicField(this, "helpOpen", false);
    /** Live input elements from the current render, read during the next one. */
    __publicField(this, "liveInputs", {});
    this.options = options;
  }
  getDisplayText() {
    return "Connect to Havemind";
  }
  getIcon() {
    return "link";
  }
  getViewType() {
    return HAVEMIND_ONBOARDING_VIEW;
  }
  onOpen() {
    this.render();
  }
  /** Re-renders from the current panel state — called on every status change. */
  refresh() {
    this.render();
  }
  render() {
    const content = this.containerEl.children[1];
    if (!content) return;
    this.captureDrafts();
    content.empty();
    content.addClass("havemind-view");
    this.liveInputs = {};
    const composer = this.options.composerProvider?.() ?? null;
    if (composer) {
      this.renderCreateConnection(content, composer);
      return;
    }
    if (this.options.guestInvalidProvider?.() === true) {
      this.renderGuestInvalid(content);
      return;
    }
    const waiting = this.options.guestWaitingProvider?.() ?? null;
    if (waiting) {
      this.renderGuestWaiting(content, waiting);
      return;
    }
    renderViewTitle(content, "Connect to Havemind");
    const panel = this.options.panelProvider?.() ?? buildConnectionPanel({ status: "disconnected" });
    renderSection(content, "status", () => this.renderIndicator(content, panel));
    renderSection(content, "send queue", () => this.renderSendQueue(content));
    renderSection(content, "conflicts", () => this.renderConflicts(content));
    renderSection(content, "connection", () => {
      if (panel.showForm) {
        renderGettingStarted(content, buildGettingStartedViewModel());
        content.createEl("hr").addClass("havemind-divider");
        this.renderForm(content);
      } else {
        this.renderConnected(content);
      }
    });
  }
  /** Reads live input values into `draft` so the next render can restore them. */
  captureDrafts() {
    const live = this.liveInputs;
    if (live.token) this.draft.token = live.token.value;
    if (live.server) this.draft.server = live.server.value;
    if (live.role) this.draft.role = live.role.value === "owner" ? "owner" : "editor";
    if (live.name) this.draft.name = live.name.value;
  }
  renderIndicator(content, panel) {
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-status");
    if (panel.spin) row.addClass("havemind-status-spin");
    if (panel.status === "synced" || panel.status === "conflict") {
      row.addClass("havemind-status-dot");
    }
    row.style.setProperty("color", `var(${panel.colorToken})`);
    const icon = row.createEl("span", { attr: DECORATIVE });
    (0, import_obsidian12.setIcon)(icon, panel.icon);
    row.createEl("span", { text: ` ${panel.label}` });
    const detail = content.createDiv({ text: panel.detail });
    detail.addClass("havemind-status-detail");
    if (this.options.onRetry !== void 0 && (panel.status === "offline" || panel.status === "reconnect-required")) {
      const retry = content.createEl("button", { text: "Retry now" });
      retry.addClass("mod-cta");
      retry.addClass("havemind-retry");
      retry.onClickEvent(() => this.options.onRetry?.());
    }
    if (this.options.onReset !== void 0 && panel.status === "reset-required") {
      const reset = content.createEl("button", {
        text: "Reset connection",
        attr: {
          "aria-label": "Reset the stored Havemind connection and pair this device again"
        }
      });
      reset.addClass("mod-warning");
      reset.addClass("havemind-reset");
      reset.onClickEvent(() => this.options.onReset?.());
    }
  }
  /**
   * Draws the MRG-03 "Conflicts" section when copies exist. The provider reads
   * the vault synchronously; an empty list renders nothing so the section
   * appears only while there is something to resolve.
   */
  renderConflicts(content) {
    const copies = this.options.conflictsProvider?.() ?? [];
    const onResolveConflict = this.options.onResolveConflict;
    if (copies.length === 0 || onResolveConflict === void 0) return;
    renderConflictSection(content, copies, {
      onResolve: (copyPath) => onResolveConflict(copyPath)
    });
  }
  /**
   * Draws the SND-01 send-queue section (waiting + failed) beneath the status
   * indicator. The provider reads the persisted sync state; a null return
   * (disconnected) or an all-clear view renders nothing.
   */
  renderSendQueue(content) {
    renderRecoveryNotice(content, this.options.recoveryRequiredProvider?.() ?? false);
    const view = this.options.sendQueueProvider?.() ?? null;
    if (view === null) return;
    const onRetry = this.options.onRetrySend;
    const onDiscard = this.options.onDiscardSend;
    if (onRetry === void 0 || onDiscard === void 0) return;
    renderSendQueueSection(content, view, {
      onRetry: (revisionId) => onRetry(revisionId),
      onDiscard: (revisionId) => onDiscard(revisionId)
    });
  }
  /**
   * The collapsed help affordance for the connected panel: a small life-buoy
   * icon button that toggles the "Getting started" steps in place. It never
   * nags — the steps stay hidden until the user asks for them, and re-opening
   * them touches no connection state.
   */
  renderHelpAffordance(content) {
    const bar = content.createDiv();
    bar.addClass("havemind-help-bar");
    const toggle = bar.createEl("button", {
      attr: {
        "aria-label": this.helpOpen ? "Hide getting started" : "Show getting started",
        "aria-expanded": this.helpOpen ? "true" : "false"
      }
    });
    toggle.addClass("havemind-help-toggle");
    (0, import_obsidian12.setIcon)(toggle.createEl("span", { attr: DECORATIVE }), "life-buoy");
    toggle.onClickEvent(() => {
      this.helpOpen = !this.helpOpen;
      this.render();
    });
    if (this.helpOpen) {
      renderGettingStarted(content, buildGettingStartedViewModel());
      content.createEl("hr").addClass("havemind-divider");
    }
  }
  renderConnected(content) {
    this.renderHelpAffordance(content);
    const roster = this.options.rejoinRosterProvider?.();
    if (roster !== void 0) {
      this.renderRoster(content, roster);
    }
    const disconnect = content.createEl("button", { text: "Disconnect" });
    disconnect.onClickEvent(() => this.options.onDisconnect?.());
  }
  /** Renders the rejoin-aware roster with its owner actions from the options. */
  renderRoster(content, roster) {
    renderRejoinRoster(content, roster, {
      waiting: this.options.rejoinWaitingProvider?.() ?? /* @__PURE__ */ new Set(),
      ...this.options.onRejoin === void 0 ? {} : { onRejoin: this.options.onRejoin },
      ...this.options.onMarkDisconnected === void 0 ? {} : { onMarkDisconnected: this.options.onMarkDisconnected },
      ...this.options.onRemove === void 0 ? {} : { onRemove: this.options.onRemove }
    });
  }
  /**
   * Guest waiting screen: the invitation is already redeemed and this device is
   * waiting for the owner to approve it. The verification phrase is shown so it
   * survives a pane close/reopen; no paste form is drawn (re-pasting would try
   * to re-redeem a single-use invitation).
   */
  renderGuestWaiting(content, model) {
    renderViewTitle(content, "Connecting to Havemind");
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-status");
    row.style.setProperty("color", "var(--text-accent)");
    (0, import_obsidian12.setIcon)(row.createEl("span", { attr: DECORATIVE }), "loader");
    row.createEl("span", { text: " Waiting for the other device to approve\u2026" });
    content.createDiv({ text: "Read this 6-digit code to the vault owner." }).addClass("havemind-hint");
    const phrase = content.createDiv({ text: model.verificationPhrase });
    phrase.addClass("havemind-verification-phrase");
    content.createDiv({
      text: "Keep Obsidian open \u2014 this resumes automatically once approved."
    }).addClass("havemind-hint");
    const disconnect = content.createEl("button", { text: "Cancel" });
    disconnect.onClickEvent(() => this.options.onDisconnect?.());
  }
  /**
   * Terminal guest screen after the owner rejected this device or the 3-attempt
   * cap was reached. The invitation is spent, so we present a clear message plus
   * the paste form to try a fresh invite — never offline, never a blank form.
   */
  renderGuestInvalid(content) {
    renderViewTitle(content, "Connect to Havemind");
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-status");
    row.style.setProperty("color", "var(--text-error)");
    (0, import_obsidian12.setIcon)(row.createEl("span", { attr: DECORATIVE }), "alert-triangle");
    row.createEl("span", { text: " This invitation is no longer valid" });
    content.createDiv({
      text: "Ask the vault owner for a new invitation, then paste it below."
    }).addClass("havemind-hint");
    this.renderForm(content);
  }
  renderForm(content) {
    content.createEl("label", {
      text: "Invitation or owner pairing token"
    });
    const tokenInput = content.createEl("textarea", {
      placeholder: "v1.\u2026 or hm_pt_\u2026",
      value: this.draft.token
    });
    content.createEl("label", { text: "Server URL" });
    const serverInput = content.createEl("input", {
      type: "text",
      placeholder: "https://your-server.example",
      value: this.draft.server
    });
    this.liveInputs.token = tokenInput;
    this.liveInputs.server = serverInput;
    const status = content.createDiv({ text: "" });
    status.addClass("havemind-form-status");
    const connect = content.createEl("button", { text: "Connect" });
    connect.addClass("mod-cta");
    connect.onClickEvent(() => {
      const input = tokenInput.value.trim();
      const serverUrl = serverInput.value.trim();
      if (input.length === 0) {
        status.setText("Paste an invitation or pairing token first.");
        return;
      }
      status.setText("Connecting\u2026");
      this.options.onConnect?.(
        input,
        serverUrl,
        (message) => status.setText(message)
      );
    });
  }
  /**
   * The unified owner "Create connection" panel. The create section (role +
   * name + Create invitation, plus the minted envelope with Copy) and the live
   * "waiting for the other device" section render together in one surface;
   * approving a waiting device never unmounts the create section.
   */
  renderCreateConnection(content, model) {
    renderViewTitle(content, "Creating connection");
    if (model.notice) this.renderNotice(content, model.notice, model.noticeKind);
    renderSection(
      content,
      "create invitation",
      () => this.renderCreateSection(content, model)
    );
    renderSection(content, "roster", () => {
      const roster = this.options.rejoinRosterProvider?.();
      if (roster !== void 0 && !roster.empty) {
        const rosterDivider = content.createEl("hr");
        rosterDivider.addClass("havemind-divider");
        this.renderRoster(content, roster);
      }
    });
    renderSection(content, "waiting devices", () => {
      const divider = content.createEl("hr");
      divider.addClass("havemind-divider");
      content.createEl("h4", { text: "Waiting for the other device" });
      if (model.pending.length === 0) {
        content.createDiv({
          text: "No device is waiting yet. When the other device redeems the invite, it appears here to approve."
        }).addClass("havemind-empty");
        return;
      }
      for (const entry of model.pending) {
        this.renderPendingRow(content, entry);
      }
    });
  }
  renderCreateSection(content, model) {
    content.createEl("label", { text: "Role" });
    const roleSelect = content.createEl("select");
    for (const value of ["editor", "owner"]) {
      roleSelect.createEl("option", { text: value, value });
    }
    roleSelect.value = this.draft.role || model.role;
    content.createEl("label", { text: "Name" });
    const nameInput = content.createEl("input", {
      type: "text",
      placeholder: "e.g. Magda",
      value: this.draft.name || model.name
    });
    this.liveInputs.role = roleSelect;
    this.liveInputs.name = nameInput;
    const status = content.createDiv({ text: "" });
    status.addClass("havemind-form-status");
    const create = content.createEl("button", { text: "Create invitation" });
    create.addClass("mod-cta");
    create.onClickEvent(() => {
      const role = roleSelect.value === "owner" ? "owner" : "editor";
      const name = nameInput.value.trim();
      status.setText("Creating invitation\u2026");
      this.options.onCreateInvitation?.(
        role,
        name,
        (message) => status.setText(message)
      );
    });
    if (model.invitation === null) return;
    const envelope = model.invitation.envelope;
    if (model.invitationExpired === true) {
      content.createDiv({
        text: "This invitation expired. Create a new one above to invite the other device."
      }).addClass("havemind-hint");
      const dismiss2 = content.createEl("button", { text: "Done" });
      dismiss2.onClickEvent(() => this.options.onDismissInvitation?.());
      return;
    }
    content.createDiv({
      text: "Invite created \u2014 copy it and send it to the other device. Single-use, expires in 15 minutes."
    }).addClass("havemind-hint");
    const code = content.createEl("code", { text: envelope });
    code.addClass("havemind-invite-envelope");
    content.createEl("textarea", {
      value: envelope,
      cls: "havemind-invite-copy-fallback"
    });
    const copyStatus = content.createDiv({ text: "" });
    copyStatus.addClass("havemind-form-status");
    const copy = content.createEl("button", { text: "Copy" });
    copy.addClass("mod-cta");
    copy.onClickEvent(() => {
      this.options.onCopyInvitation?.(envelope);
      copyStatus.setText("Copied to clipboard.");
    });
    content.createDiv({ text: `Expires: ${model.invitation.expiresAt}` }).addClass("havemind-hint");
    const dismiss = content.createEl("button", { text: "Done" });
    dismiss.onClickEvent(() => this.options.onDismissInvitation?.());
  }
  /**
   * Renders the composer's transient notice line. 'success' (e.g. a device
   * just connected) uses the icon+label+colour status-row convention shared
   * with the Connect panel indicator — never colour alone; other notices
   * (progress/info) stay a plain text line.
   */
  renderNotice(content, notice, kind) {
    if (kind !== "success") {
      content.createDiv({ text: notice }).addClass("havemind-hint");
      return;
    }
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-status");
    row.style.setProperty("color", "var(--text-success)");
    (0, import_obsidian12.setIcon)(row.createEl("span", { attr: DECORATIVE }), "check-circle");
    row.createEl("span", { text: ` ${notice}` });
  }
  renderPendingRow(content, entry) {
    const row = content.createDiv({ text: "" });
    row.addClass("havemind-pending-row");
    row.style.setProperty("color", "var(--text-accent)");
    (0, import_obsidian12.setIcon)(row.createEl("span", { attr: DECORATIVE }), "user-round-check");
    row.createEl("span", {
      text: ` ${entry.intendedMemberDisplayName ?? "Pending device"} \xB7 expires ${entry.expiresAt}`
    });
    row.createEl("label", {
      text: "Enter the 6-digit code your peer reads to you"
    });
    const phraseInput = row.createEl("input", {
      type: "text",
      placeholder: "123456",
      attr: { inputmode: "numeric", maxlength: "6", pattern: "[0-9]*" }
    });
    const status = row.createDiv({ text: "" });
    status.addClass("havemind-form-status");
    const approve = row.createEl("button", { text: "Approve" });
    approve.addClass("mod-cta");
    approve.onClickEvent(() => {
      const phrase = phraseInput.value.trim();
      if (phrase.length === 0) {
        status.setText("Enter the code you heard, then approve.");
        return;
      }
      status.setText("Approving\u2026");
      this.options.onApprove?.(
        entry.invitationId,
        phrase,
        (message) => status.setText(message)
      );
    });
  }
};

// src/ui/retry-plan.ts
function planRetryFromDisk(outcome, path, discardOnRetrigger) {
  switch (outcome) {
    case "file-missing":
      return {
        notice: `${path} no longer exists \u2014 removing it from the queue.`,
        discard: true
      };
    case "retriggered":
      return { notice: null, discard: discardOnRetrigger };
    default:
      return {
        notice: "Cannot retry while disconnected \u2014 reconnect first.",
        discard: false
      };
  }
}
function planQuarantineRequeueFallback(requeued, path) {
  if (requeued) return { kind: "requeued" };
  if (path !== null) return { kind: "retry-from-disk", path };
  return {
    kind: "discard-dead-letter",
    notice: "The original file for this change no longer exists \u2014 removing it."
  };
}

// src/ui/setting-tab.ts
var import_obsidian13 = require("obsidian");
function formatMemberCount(count) {
  if (count === 0) return "No members recorded yet";
  return count === 1 ? "1 member" : `${count} members`;
}
var HavemindSettingTab = class extends import_obsidian13.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    /**
     * This tab's own plugin, typed. `PluginSettingTab.plugin` is declared as the
     * base `Plugin`, so keeping a narrowed field is what lets `display()` read the
     * Havemind surface directly instead of casting through `unknown` every time.
     */
    __publicField(this, "havemind");
    this.havemind = plugin;
  }
  display() {
    this.containerEl.empty();
    const plugin = this.havemind;
    const info = plugin.settingsInfo();
    new import_obsidian13.Setting(this.containerEl).setName("Havemind").setHeading();
    new import_obsidian13.Setting(this.containerEl).setName("Server").setDesc(info.server);
    new import_obsidian13.Setting(this.containerEl).setName("Connection").setDesc(info.status);
    new import_obsidian13.Setting(this.containerEl).setName("Last sync").setDesc(info.lastSync);
    new import_obsidian13.Setting(this.containerEl).setName("Vault members").setDesc(info.members);
    new import_obsidian13.Setting(this.containerEl).setName("Actions").setHeading();
    this.renderActions(plugin, info);
    const refresh = this.containerEl.createEl("button", { text: "Refresh" });
    refresh.onClickEvent(() => this.display());
  }
  /**
   * The action rows. Every button routes into the SAME plugin method its command
   * palette entry runs — `connectionActions()` is the single definition of what
   * each action does, so the two surfaces can never drift apart.
   */
  renderActions(plugin, info) {
    const actions = plugin.connectionActions();
    new import_obsidian13.Setting(this.containerEl).setName("Havemind panel").setDesc(
      "Connect a device, invite a peer, resolve conflicts and inspect the send queue."
    ).addButton(
      (button) => button.setButtonText("Open Havemind panel").setCta().onClick(() => plugin.revealPanel())
    );
    new import_obsidian13.Setting(this.containerEl).setName("Sync now").setDesc("Force a fresh sync cycle instead of waiting for the next poll.").addButton(
      (button) => button.setButtonText("Sync now").setDisabled(!info.connected).onClick(() => actions.syncNow())
    );
    new import_obsidian13.Setting(this.containerEl).setName("Disconnect").setDesc("Stop syncing. Notes on disk are left exactly as they are.").addButton(
      (button) => button.setButtonText("Disconnect").setDisabled(!info.connected).onClick(() => actions.disconnect())
    );
    new import_obsidian13.Setting(this.containerEl).setName("Reset connection").setDesc(
      "Clear the stored pairing so this device can be paired again. No note is touched."
    ).addButton(
      (button) => button.setButtonText("Reset connection").onClick(() => actions.resetConnection())
    );
    const overlayOn = plugin.authorOverlayEnabled();
    new import_obsidian13.Setting(this.containerEl).setName("Author overlay").setDesc(
      overlayOn ? "Currently on. Each note shows who last changed it, by colour and by name." : "Currently off. Author colours and names are hidden in both editor views."
    ).addButton(
      (button) => button.setButtonText(overlayOn ? "Hide authors" : "Show authors").onClick(() => {
        plugin.toggleAuthorOverlay();
        this.display();
      })
    );
  }
};

// src/main.ts
var CONFLICT_SWEEP_DEBOUNCE_MS = 2e3;
var SHOW_AUTHORS_KEY = "showAuthors";
var HavemindPlugin = class extends import_obsidian14.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "activityOptions", {});
    __publicField(this, "statusItem", null);
    __publicField(this, "connection", null);
    /**
     * Set true in `onunload`. `startConnection` runs on `onLayoutReady` and awaits
     * an async connection build; if the plugin is disabled while that await is in
     * flight, `onunload` runs first and the resolved handle must be stopped, never
     * assigned — otherwise its vault listeners and running sync loop leak with no
     * `stop()` ever reaching them.
     */
    __publicField(this, "unloaded", false);
    __publicField(this, "pendingInvitation", null);
    __publicField(this, "pendingApprovals", []);
    __publicField(this, "connectionActive", false);
    __publicField(this, "connectionNotice");
    /** Visual treatment for `connectionNotice`; see CreateConnectionViewModel. */
    __publicField(this, "connectionNoticeKind");
    __publicField(this, "awaitingApproval", null);
    /**
     * True once the server reported this invitation is dead (owner rejected the
     * device or the 3-attempt cap was reached). Shows the "ask for a new invite"
     * screen instead of the waiting screen — never offline, never a blank form.
     */
    __publicField(this, "guestInvitationInvalid", false);
    __publicField(this, "connectionStatus", "disconnected");
    __publicField(this, "lastSyncedAt");
    __publicField(this, "connectionError");
    __publicField(this, "onboardingView", null);
    __publicField(this, "activityView", null);
    /** Live feed behind the Activity view (previously orphaned — now wired). */
    __publicField(this, "activityLog", new ActivityLog());
    /** Disposer for the activityLog subscription set up in onload(); torn down in onunload(). */
    __publicField(this, "activityLogUnsubscribe", null);
    /**
     * Persistent presence roster: the members connected to this vault. Sourced
     * from approve-time records + the local self membership and persisted in
     * data.json (endpoint-free). Never derived from sync activity.
     */
    __publicField(this, "rosterMembers", []);
    /**
     * F9 Rejoin (owner side). Membership ids the owner has asserted are dead
     * (pilot heuristic — no server liveness signal yet, see renderRejoinRoster):
     * their roster rows draw as disconnected and offer Rejoin.
     */
    __publicField(this, "deadMembershipIds", []);
    /** Membership ids the owner has issued a rejoin grant for (awaiting reconnect). */
    __publicField(this, "rejoinWaiting", /* @__PURE__ */ new Set());
    /**
     * F9 Rejoin (invitee side). The live controller driving terminal-auth →
     * syncing while this device polls for the owner's grant, plus the interval id
     * so unload tears the poll down. Null when no rejoin is armed.
     */
    __publicField(this, "rejoinController", null);
    __publicField(this, "rejoinPollTimer", null);
    /** Guards the post-rejoin restart so it fires exactly once (no double-start). */
    __publicField(this, "rejoinRestarted", false);
    /**
     * Monotonic counter bumped each time a live connection is (re-)established
     * (`startConnection`/`connectFromInput` assign a handle). The invitee rejoin
     * poll captures it when it arms; a poll tick that sees the counter has advanced
     * knows the connection was rebuilt since it armed (Retry now, a fresh user
     * connect, a rejoin restart) and must not tear that healthy connection down —
     * see `pollRejoinOnce` (FINDING 1b).
     */
    __publicField(this, "connectGeneration", 0);
    /** `connectGeneration` captured when the rejoin poll armed; null when disarmed. */
    __publicField(this, "rejoinArmedGeneration", null);
    /**
     * Guards a user-initiated "Retry now" so a rapid double-click never spawns a
     * second connection build while the first is still in flight — two live
     * handles could otherwise be created (one would leak). Cleared once the retry
     * settles.
     */
    __publicField(this, "retryInFlight", false);
    /**
     * Guards the user-initiated "Reset connection" (P1 #5) so a double-click can
     * never run two overlapping clear-and-rewrite passes over `data.json`.
     */
    __publicField(this, "resetInFlight", false);
    /**
     * MRG-03 conflict resolver. Its per-copy guard makes a double-clicked resolve
     * fire each destructive vault op at most once. Lazily bound to the live vault
     * port on first use so a headless test never needs a real vault.
     */
    __publicField(this, "conflictResolver", null);
    /**
     * The live durable sync state (SND-01 + MRG-05), captured from the connection
     * handle. Null when disconnected — the send-queue panel then renders nothing
     * and the sweep is a no-op.
     */
    __publicField(this, "syncState", null);
    /**
     * Quarantine revisionIds already announced with a Notice (SND-01). A Notice
     * fires only the FIRST time an item enters quarantine, never on every retry.
     */
    __publicField(this, "notifiedQuarantineIds", /* @__PURE__ */ new Set());
    /**
     * Debounce timer for the MRG-05 auto-repair sweep. A burst of new conflict
     * copies coalesces into a single pass ~2s after the last write.
     */
    __publicField(this, "conflictSweepTimer", null);
    /**
     * Serialises sweep runs AND re-arms one more pass when a trigger arrives
     * mid-run — so a conflict copy written while a sweep is in flight is not
     * dropped (MINOR); the guarded no-op used to leave it un-swept.
     */
    __publicField(this, "conflictSweepGuard", new RerunGuard(
      () => this.runConflictSweepOnce()
    ));
    /**
     * F6 author overlay: whether "Show authors" is on for this vault. OFF by
     * default — attribution decoration changes how every note looks, so it is
     * opt-in. Persisted under `showAuthors` in `data.json` through the shared
     * plugin-data mutex; a data.json that cannot be read leaves the flag
     * session-only rather than blocking load.
     */
    __publicField(this, "showAuthors", false);
    /**
     * True once the user has decided for this session. `restoreAuthorOverlayFlag`
     * runs asynchronously from `onload`, so a toggle can land BEFORE the stored
     * value comes back off disk; without this guard the restore would silently
     * undo that toggle and then persist the undone value.
     */
    __publicField(this, "authorOverlayChosen", false);
  }
  onload() {
    this.activityOptions = {
      feedProvider: () => activityEntriesToRecords(this.activityLog.snapshot(), this.rosterMembers),
      onRestore: (revisionId) => this.handleRestore(revisionId)
    };
    this.activityLogUnsubscribe = this.activityLog.subscribe(
      () => this.activityView?.refresh()
    );
    this.registerView(HAVEMIND_ACTIVITY_VIEW, (leaf) => {
      const view = new HavemindActivityView(leaf, this.activityOptions);
      this.activityView = view;
      return view;
    });
    this.registerView(HAVEMIND_ONBOARDING_VIEW, (leaf) => {
      const view = new HavemindOnboardingView(leaf, {
        composerProvider: () => this.connectionActive ? this.composerModel() : null,
        guestWaitingProvider: () => this.awaitingApproval,
        guestInvalidProvider: () => this.guestInvitationInvalid,
        panelProvider: () => this.connectionPanel(),
        conflictsProvider: () => listConflictCopies(this.conflictPort()),
        onResolveConflict: (copyPath) => {
          void this.openConflictModal(copyPath);
        },
        sendQueueProvider: () => this.sendQueueView(),
        recoveryRequiredProvider: () => this.syncState?.isRecoveryRequired() ?? false,
        onRetrySend: (revisionId) => {
          void this.retrySend(revisionId);
        },
        onDiscardSend: (revisionId) => {
          void this.discardSend(revisionId);
        },
        rejoinRosterProvider: () => this.rejoinRosterView(),
        rejoinWaitingProvider: () => this.rejoinWaiting,
        onRejoin: (membershipId) => {
          void this.requestRejoin(membershipId);
        },
        onMarkDisconnected: (membershipId) => this.markMemberDisconnected(membershipId),
        onRemove: (membershipId) => {
          void this.removeMember(membershipId);
        },
        onConnect: (input, serverUrl, report) => {
          void this.connectFromInput(input, serverUrl, report);
        },
        onDisconnect: () => this.disconnect(),
        onRetry: () => {
          void this.retryConnection();
        },
        onReset: () => {
          void this.resetConnection();
        },
        onCopyInvitation: (envelope) => {
          void copyTextToClipboard(envelope, browserClipboardCopyDeps());
        },
        onCreateInvitation: (role, name, report) => {
          void this.createInvitation(role, name, report);
        },
        onDismissInvitation: () => this.dismissInvitation(),
        onApprove: (invitationId, verificationPhrase, report) => {
          void this.approvePendingDevice(invitationId, verificationPhrase, report);
        }
      });
      this.onboardingView = view;
      return view;
    });
    this.addCommand({
      id: "open-activity",
      name: "Open activity",
      callback: () => this.openActivityView()
    });
    this.addCommand({
      id: "connect",
      name: "Connect to Havemind",
      callback: () => this.openConnectView()
    });
    this.addCommand({
      id: "create-connection",
      name: "Create connection (owner)",
      callback: () => this.openCreateConnectionView()
    });
    const actions = this.connectionActions();
    this.addCommand({
      id: "sync-now",
      name: "Sync now",
      checkCallback: (checking) => {
        if (checking) return actions.connected();
        actions.syncNow();
        return true;
      }
    });
    this.addCommand({
      id: "disconnect",
      name: "Disconnect",
      checkCallback: (checking) => {
        if (checking) return actions.connected();
        actions.disconnect();
        return true;
      }
    });
    this.addCommand({
      id: "reset-connection",
      name: "Reset connection",
      callback: () => {
        actions.resetConnection();
      }
    });
    this.addCommand({
      id: "show-authors",
      name: "Show authors",
      callback: () => this.toggleAuthorOverlay()
    });
    this.addRibbonIcon("hexagon", "Open Havemind activity", () => {
      void this.openActivityView();
    });
    this.addRibbonIcon("users", "Show authors", () => {
      this.toggleAuthorOverlay();
    });
    this.registerEditorExtension(
      createAuthorOverlayExtension({
        overlayFor: (path, content) => {
          const input = this.overlayInputFor(path, content);
          return input === null ? null : buildLivePreviewOverlay(input);
        }
      })
    );
    this.registerMarkdownPostProcessor(
      createAuthorReadingViewProcessor({
        overlayFor: (path, content, section) => this.readingViewOverlay(path, content, section)
      })
    );
    void this.restoreAuthorOverlayFlag();
    this.statusItem = this.addStatusBarItem();
    this.statusItem.addClass("havemind-status-bar");
    this.statusItem.onClickEvent(() => {
      void this.openView(HAVEMIND_ONBOARDING_VIEW);
    });
    this.statusItem.setAttribute("role", "button");
    this.statusItem.setAttribute("tabindex", "0");
    this.statusItem.setAttribute("aria-label", "Open Havemind panel");
    this.statusItem.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      void this.openView(HAVEMIND_ONBOARDING_VIEW);
    });
    this.setStatus(formatStatusBar({ status: "disconnected" }));
    this.addSettingTab(new HavemindSettingTab(this.app, this));
    this.registerObsidianProtocolHandler("havemind-join", (data) => {
      if (!isSafePassiveJoinProtocolData(data)) return;
      this.connectionActive = false;
      void this.openView(HAVEMIND_ONBOARDING_VIEW);
    });
    this.app.workspace.onLayoutReady(() => {
      void this.startConnection();
    });
  }
  onunload() {
    this.unloaded = true;
    this.disarmRejoin();
    if (this.conflictSweepTimer !== null) {
      globalThis.clearTimeout(this.conflictSweepTimer);
      this.conflictSweepTimer = null;
    }
    this.connection?.stop();
    this.connection = null;
    this.syncState = null;
    this.activityLogUnsubscribe?.();
    this.activityLogUnsubscribe = null;
  }
  openConnectView() {
    this.connectionActive = false;
    this.onboardingView?.refresh();
    return this.openView(HAVEMIND_ONBOARDING_VIEW);
  }
  /**
   * Owner action: open the unified "Create connection" panel where the invite
   * is minted and the joining device is approved in one living surface.
   */
  openCreateConnectionView() {
    this.connectionActive = true;
    this.connectionNotice = void 0;
    this.connectionNoticeKind = void 0;
    this.onboardingView?.refresh();
    return this.openView(HAVEMIND_ONBOARDING_VIEW);
  }
  /** Snapshot of the owner composer state for the unified panel. */
  composerModel() {
    return {
      role: "editor",
      name: "",
      invitation: this.pendingInvitation,
      pending: this.pendingApprovals,
      invitationExpired: this.isInvitationExpired(),
      ...this.connectionNotice === void 0 ? {} : { notice: this.connectionNotice },
      ...this.connectionNoticeKind === void 0 ? {} : { noticeKind: this.connectionNoticeKind }
    };
  }
  /** True once the minted invitation is past its ISO-8601 expiry. */
  isInvitationExpired() {
    if (this.pendingInvitation === null) return false;
    const expiry = Date.parse(this.pendingInvitation.expiresAt);
    return Number.isFinite(expiry) && Date.now() >= expiry;
  }
  /**
   * Owner action: approve the joining device that read out `verificationPhrase`
   * against `POST …/invitations/:invitationId/approve`. The phrase is a
   * second-channel secret and is never logged; failures are reported to the view.
   */
  async approvePendingDevice(invitationId, verificationPhrase, report) {
    try {
      const approved = await approvePendingDeviceForOwner(this, {
        invitationId,
        verificationPhrase
      });
      if (approved === null) {
        report("Connect as the vault owner before approving a device.");
        return;
      }
      const approvedEntry = this.pendingApprovals.find(
        (entry) => entry.invitationId === invitationId
      );
      const approvedName = approvedEntry?.intendedMemberDisplayName;
      const connectedMessage = `${approvedName ?? "Device"} connected.`;
      void this.recordRosterMember({
        membershipId: approved.membershipId,
        displayName: approvedName ?? "Member",
        role: approvedEntry?.intendedRole ?? "editor",
        self: false
      });
      this.pendingApprovals = this.pendingApprovals.filter(
        (entry) => entry.invitationId !== invitationId
      );
      this.connectionNotice = connectedMessage;
      this.connectionNoticeKind = "success";
      report(connectedMessage);
      this.onboardingView?.refresh();
    } catch (error51) {
      if (error51 instanceof ApproveDeviceError && error51.locked) {
        this.pendingApprovals = this.pendingApprovals.filter(
          (entry) => entry.invitationId !== invitationId
        );
        this.connectionNotice = "This invitation is now invalid. Create a new one above to try again.";
        this.connectionNoticeKind = void 0;
        report(error51.message);
        this.onboardingView?.refresh();
        return;
      }
      if (error51 instanceof ApproveDeviceError) {
        report(error51.message);
        return;
      }
      report(
        `Could not approve: ${error51 instanceof Error ? error51.message : "unexpected error"}`
      );
    }
  }
  async startConnection() {
    await this.loadRoster();
    const handle = await startHavemindConnection(
      this,
      (status, view) => this.handleStatus(status, view),
      this.activityHooks()
    );
    if (this.unloaded || this.connection !== null) {
      handle.stop();
      return;
    }
    this.connection = handle;
    this.syncState = handle.state ?? null;
    this.connectGeneration += 1;
    this.adoptSelfMembership(this.connection);
    this.scheduleConflictSweep();
  }
  /** Runtime hooks handed to the sync loop so live surfaces stay fed. */
  activityHooks() {
    return {
      onLocalActivity: (entry) => this.activityLog.record(entry),
      // FIX 1: a remote-applied revision reaches the Activity feed too, so
      // the other device's edits are no longer invisible.
      onRemoteActivity: (entry) => this.activityLog.record(entry),
      // MRG-05: a new conflict copy schedules a debounced auto-repair sweep.
      onConflictWritten: () => this.scheduleConflictSweep(),
      // MAJOR 1: a successful commit that cleared a stale failed-to-queue row
      // refreshes the panel at once, so the phantom failure disappears.
      onSendQueueChanged: () => this.onboardingView?.refresh(),
      // MINOR 7: commit-recovery already showed a Notice for this failed-to-queue
      // row, so record its id as notified — the panel's quarantine-notice check
      // then skips it, preventing a duplicate Notice for the same event.
      onFailedToQueueNotified: (revisionId) => this.notifiedQuarantineIds.add(revisionId)
    };
  }
  /**
   * Handles the Activity feed's "Restore" click: runs the append-only restore
   * over the current feed history and records the result as a new,
   * locally-attributed entry. A restore that cannot be performed (unknown or
   * deleted target, unreconciled history) is surfaced via a Notice rather
   * than silently doing nothing.
   */
  handleRestore(revisionId) {
    const self = this.rosterMembers.find((member) => member.self);
    if (self === void 0) {
      new import_obsidian14.Notice("Havemind: connect before restoring a revision.");
      return;
    }
    const history = activityEntriesToRecords(
      this.activityLog.snapshot(),
      this.rosterMembers
    );
    const entry = restoreActivityEntry({
      history,
      targetRevisionId: revisionId,
      restorer: { actorId: self.membershipId, displayName: self.displayName },
      now: Date.now(),
      newRevisionId: globalThis.crypto.randomUUID()
    });
    if (entry === null) {
      new import_obsidian14.Notice("Havemind: could not restore that revision.");
      return;
    }
    this.activityLog.record(entry);
  }
  /**
   * The Obsidian-backed conflict vault port. `this.app.vault` is not modelled on
   * the ambient `App`, so cast through a local shape rather than patching the
   * shared interface (the port degrades to "no conflicts" for a stub vault).
   */
  conflictPort() {
    const app = this.app;
    return createObsidianConflictPort(app.vault);
  }
  /**
   * Opens the MRG-03 resolve modal for a conflict copy: computes the note-vs-copy
   * diff (text copies with a known target only), then wires the three actions to
   * the shared resolver. After a resolve, the panel re-renders so the resolved
   * row drops out and the section disappears once empty.
   */
  async openConflictModal(copyPath) {
    const port = this.conflictPort();
    const copy = listConflictCopies(port).find((c) => c.copyPath === copyPath);
    if (copy === void 0) return null;
    let diff = null;
    if (copy.targetKnown && !copy.isBinary && copy.targetPath !== null) {
      const [mine, theirs] = await Promise.all([
        port.readText(copy.targetPath),
        port.readText(copy.copyPath)
      ]);
      if (mine !== null && theirs !== null) {
        diff = computeLineDiff(mine, theirs);
      }
    }
    if (this.conflictResolver === null) {
      this.conflictResolver = createConflictResolver(port);
    }
    const resolver = this.conflictResolver;
    const run = (action, modal2) => {
      void resolver.resolve(copy, action).then((outcome) => {
        if (outcome === "vanished") {
          new import_obsidian14.Notice("This conflict was already auto-resolved.");
        }
        modal2.close();
        this.onboardingView?.refresh();
      });
    };
    const modal = new ConflictResolveModal(
      this.app,
      buildConflictModalModel(copy, diff),
      {
        onKeepMine: () => run("keepMine", modal),
        ...copy.targetKnown && !copy.isBinary ? { onKeepTheirs: () => run("keepTheirs", modal) } : {},
        onKeepBoth: () => run("keepBoth", modal)
      }
    );
    modal.open();
    return modal;
  }
  /** Records the local member into the roster once the connection knows it. */
  adoptSelfMembership(handle) {
    const self = handle?.selfMembership;
    if (self === void 0) return;
    void this.recordRosterMember({
      membershipId: self.membershipId,
      displayName: "You",
      role: self.role,
      self: true
    });
  }
  /** The durable roster store over the shared plugin-data blob. */
  rosterStore() {
    return new RosterStore({
      persist: createSerializedDataPort(getPluginDataMutex(this))
    });
  }
  async loadRoster() {
    this.rosterMembers = await this.rosterStore().readMembers();
    this.onboardingView?.refresh();
  }
  /** Upserts a member, persists the roster, and refreshes the live surfaces. */
  async recordRosterMember(member) {
    this.rosterMembers = await this.rosterStore().recordMember(member);
    this.onboardingView?.refresh();
    this.activityView?.refresh();
  }
  /**
   * Drives the Connect form: classifies the pasted input (invitation envelope or
   * owner pairing token), runs the matching flow, and once connected starts the
   * live sync loop. Progress is reported back to the view; secrets are never
   * logged.
   */
  async connectFromInput(input, serverUrl, report) {
    this.guestInvitationInvalid = false;
    this.connection?.stop();
    this.connection = null;
    const handle = await connectFromInput(this, input, serverUrl, {
      report,
      onStatus: (status, view) => this.handleStatus(status, view),
      hooks: this.activityHooks(),
      // Durably record the waiting state so a pane reopen resumes the waiting
      // screen (with the code) instead of a blank paste form.
      onPendingApproval: (verificationPhrase) => {
        this.awaitingApproval = { verificationPhrase };
        this.onboardingView?.refresh();
      },
      // The owner rejected the device or the attempt cap was reached: leave the
      // waiting screen for the terminal "invitation invalid" screen. This is an
      // expected auth response, not a connection loss — status is untouched.
      onInvitationRejected: () => {
        this.awaitingApproval = null;
        this.guestInvitationInvalid = true;
        this.onboardingView?.refresh();
      }
    });
    if (handle !== null) {
      if (this.unloaded || this.connection !== null) {
        handle.stop();
        return;
      }
      this.awaitingApproval = null;
      this.guestInvitationInvalid = false;
      this.connection = handle;
      this.syncState = handle.state ?? null;
      this.connectGeneration += 1;
      this.adoptSelfMembership(handle);
      this.scheduleConflictSweep();
    }
  }
  /**
   * Command-palette "Sync now": force an immediate cycle instead of waiting for
   * the loop's own schedule. The connection handle exposes no direct sync entry
   * point, so this reuses the panel's "Retry now" path — stop the running loop,
   * start a fresh one — which is exactly the forced cycle the button performs.
   *
   * The palette greys the command out while nothing is connected, so this guard
   * is the belt to that braces: a direct invocation explains itself rather than
   * looking like a silent no-op.
   */
  async syncNow() {
    if (this.connection === null) {
      new import_obsidian14.Notice("Havemind: connect before syncing.");
      return;
    }
    await this.retryConnection();
  }
  /** Stops the live sync loop; the paste form returns so the user can reconnect. */
  disconnect() {
    this.connection?.stop();
    this.connection = null;
    this.syncState = null;
    this.disarmRejoin();
    this.connectionStatus = "disconnected";
    this.lastSyncedAt = void 0;
    this.connectionError = void 0;
    this.awaitingApproval = null;
    this.guestInvitationInvalid = false;
    this.setStatus(formatStatusBar({ status: "disconnected" }));
    this.onboardingView?.refresh();
  }
  /** Updates the status bar and live Connect indicator from a cycle status. */
  handleStatus(status, view) {
    this.connectionStatus = status;
    if (status === "synced") {
      this.lastSyncedAt = Date.now();
      this.connectionError = void 0;
    }
    if (status === "reset-required") {
      this.connectionError = void 0;
    }
    if (status === "reconnect-required") {
      this.connectionError = "The server refused the session \u2014 reconnect.";
      void this.armRejoin();
    }
    this.checkQuarantineNotices();
    this.setStatus(view);
    this.onboardingView?.refresh();
  }
  /**
   * SND-01 send-queue view for the panel, or null when disconnected (no state).
   * Reads outbox ages + quarantine straight from the persisted sync state and
   * resolves each quarantined fileId back to a vault path where one is known.
   */
  sendQueueView() {
    const state = this.syncState;
    if (state === null) return null;
    return buildSendQueueStatus({
      outbox: state.outboxAges(),
      quarantine: state.quarantineSnapshot().map((item) => {
        const path = state.pathForFileId(item.fileId);
        return {
          revisionId: item.revisionId,
          fileId: item.fileId,
          reason: item.reason,
          ...path === null ? {} : { path }
        };
      }),
      now: Date.now()
    });
  }
  /**
   * Retry a quarantined send. A server-rejected send (SND-01) re-enqueues its
   * stashed envelope through the outbox. A failed-to-queue row (SND-02, MAJOR 2)
   * has no envelope — it never reached the outbox — so Retry re-runs the commit
   * chain for the path against the current on-disk content; if the file has
   * since been deleted, surface a Notice and drop the stale row instead of
   * pushing a phantom empty create for a vanished file.
   */
  async retrySend(revisionId) {
    const failedPath = parseFailedToQueuePath(revisionId);
    if (failedPath !== null) {
      await this.retryFromDisk(revisionId, failedPath, { discardOnRetrigger: false });
      return;
    }
    const requeued = await this.syncState?.requeueQuarantined(revisionId) ?? false;
    const fallback = planQuarantineRequeueFallback(
      requeued,
      this.pathForQuarantineRow(revisionId)
    );
    if (fallback.kind === "retry-from-disk") {
      await this.retryFromDisk(revisionId, fallback.path, {
        discardOnRetrigger: true
      });
      return;
    }
    if (fallback.kind === "discard-dead-letter") {
      new import_obsidian14.Notice(fallback.notice);
      await this.syncState?.discardQuarantined(revisionId);
    }
    this.onboardingView?.refresh();
  }
  /** The vault path a quarantine row's fileId resolves to, or null. */
  pathForQuarantineRow(revisionId) {
    const state = this.syncState;
    if (state === null) return null;
    const row = state.quarantineSnapshot().find((item) => item.revisionId === revisionId);
    return row === void 0 ? null : state.pathForFileId(row.fileId);
  }
  /**
   * Re-run the commit chain for `path` from disk (the MAJOR 2 recovery for a row
   * with no usable stashed envelope). FINDING 1: the retry outcome is tri-state.
   * Only a CONFIRMED-missing file drops the row; `unavailable` (debouncer
   * disposed) and a null/uncallable connection — the common state for a durable
   * row after a restart, before reconnect — keep the row and tell the user to
   * reconnect, so a real unsynced change is never silently discarded.
   * `discardOnRetrigger` drops the row immediately after a real re-trigger for a
   * superseded server-rejected row (MAJOR 4); a failed-to-queue row keeps its
   * row until the commit lands.
   */
  async retryFromDisk(revisionId, path, options) {
    const outcome = this.connection?.retryFailedCommit?.(path);
    const effect = planRetryFromDisk(outcome, path, options.discardOnRetrigger);
    if (effect.notice !== null) new import_obsidian14.Notice(effect.notice);
    if (effect.discard) await this.syncState?.discardQuarantined(revisionId);
    this.onboardingView?.refresh();
  }
  /** Permanently discard a quarantined send (SND-01). */
  async discardSend(revisionId) {
    await this.syncState?.discardQuarantined(revisionId);
    this.onboardingView?.refresh();
  }
  /**
   * SND-01: emit one Notice per item the FIRST time it enters quarantine. A
   * retry that re-quarantines the same revision is silent — its id is already in
   * `notifiedQuarantineIds`. Discarding then re-quarantining a NEW revision for
   * the same file does notify, which is correct: it is a distinct failed send.
   */
  checkQuarantineNotices() {
    const state = this.syncState;
    if (state === null) return;
    const quarantine = state.quarantineSnapshot().map((item) => ({
      revisionId: item.revisionId,
      fileId: item.fileId,
      reason: item.reason,
      ...state.pathForFileId(item.fileId) === null ? {} : { path: state.pathForFileId(item.fileId) }
    }));
    const { fresh, next } = selectNewlyQuarantined(
      this.notifiedQuarantineIds,
      quarantine
    );
    this.notifiedQuarantineIds = new Set(next);
    for (const item of fresh) {
      const label = item.path ?? item.fileId;
      new import_obsidian14.Notice(
        `A change to ${label} could not be sent \u2014 see the Havemind panel.`
      );
    }
  }
  /**
   * MRG-05: schedule a single debounced auto-repair sweep. A burst of new
   * conflict copies (or a start-up call plus a runtime write) collapses into one
   * pass ~2s after the last trigger. The sweep only writes notes (outside the
   * reserved folder) and deletes resolved copies (inside it), and the trigger
   * keys off NEW copy writes only, so a sweep never re-schedules itself.
   */
  scheduleConflictSweep() {
    if (this.conflictSweepTimer !== null) {
      globalThis.clearTimeout(this.conflictSweepTimer);
    }
    this.conflictSweepTimer = globalThis.setTimeout(() => {
      this.conflictSweepTimer = null;
      void this.runConflictSweep();
    }, CONFLICT_SWEEP_DEBOUNCE_MS);
  }
  /**
   * Runs one auto-repair pass (MRG-05). Reuses the persisted merge ancestor +
   * base hash from the sync state; a copy with no hash-verified ancestor is left
   * untouched for the manual modal. A guard prevents overlapping runs. Refreshes
   * the panel afterwards so a resolved conflict's row drops out.
   */
  async runConflictSweep() {
    if (this.syncState === null) return;
    await this.conflictSweepGuard.trigger();
  }
  /** One sweep pass. Called only via {@link conflictSweepGuard}. */
  async runConflictSweepOnce() {
    const state = this.syncState;
    if (state === null) return;
    await sweepConflictCopies({
      port: this.conflictPort(),
      fileIdAtPath: (path) => state.fileIdAtPath(path),
      baseContentFor: (fileId) => state.baseContentFor(fileId),
      baseHashFor: (fileId) => state.baseHashFor(fileId),
      hashContent: (content) => hashPlaintext(content),
      notify: (message) => {
        new import_obsidian14.Notice(`Havemind: ${message}`);
      }
    });
    this.onboardingView?.refresh();
  }
  /** The rejoin-aware roster projection over the persistent members. */
  rejoinRosterView() {
    return buildRejoinRosterView(this.rosterMembers, this.deadMembershipIds);
  }
  /**
   * Owner action (pilot heuristic): assert a connected contact has fallen off so
   * their row offers Rejoin. No server liveness signal reaches the owner yet, so
   * "disconnected" is owner-driven — see renderRejoinRoster.
   */
  markMemberDisconnected(membershipId) {
    if (!this.deadMembershipIds.includes(membershipId)) {
      this.deadMembershipIds = [...this.deadMembershipIds, membershipId];
    }
    this.onboardingView?.refresh();
  }
  /**
   * Owner action: issue a rejoin grant for a known-dead contact via the existing
   * authenticated transport, then show "waiting for <name> to reconnect" until
   * the roster refreshes. Nothing secret is sent or shown.
   */
  async requestRejoin(membershipId) {
    try {
      const waiting = await requestRejoinGrantForOwner(this, { membershipId });
      if (waiting === null) {
        new import_obsidian14.Notice("Havemind: connect as the vault owner before rejoining a member.");
        return;
      }
      this.rejoinWaiting = /* @__PURE__ */ new Set([...this.rejoinWaiting, membershipId]);
      this.onboardingView?.refresh();
    } catch (error51) {
      new import_obsidian14.Notice(
        `Havemind: could not request rejoin \u2014 ${error51 instanceof Error ? error51.message : "unexpected error"}`
      );
    }
  }
  /**
   * Owner action: permanently remove a member from the vault. Revokes the
   * membership server-side (append-only — the member's past revisions and
   * attribution survive; their sessions are burned and they are terminally
   * locked out), then drops the member from the local roster and clears any
   * dead/waiting markers so no stale Rejoin affordance lingers. This is a
   * control-plane action and records nothing in the Activity feed. On success a
   * confirmation Notice names the removed member.
   */
  async removeMember(membershipId) {
    const member = this.rosterMembers.find(
      (entry) => entry.membershipId === membershipId
    );
    const displayName = member?.displayName ?? "member";
    try {
      const removed = await revokeMembershipForOwner(this, { membershipId });
      if (removed === null) {
        new import_obsidian14.Notice(
          "Havemind: connect as the vault owner before removing a member."
        );
        return;
      }
      this.rosterMembers = await this.rosterStore().removeMember(membershipId);
      this.deadMembershipIds = this.deadMembershipIds.filter(
        (id) => id !== membershipId
      );
      this.rejoinWaiting = new Set(
        [...this.rejoinWaiting].filter((id) => id !== membershipId)
      );
      new import_obsidian14.Notice(`Removed ${displayName} from the vault.`);
      this.onboardingView?.refresh();
      this.activityView?.refresh();
    } catch (error51) {
      new import_obsidian14.Notice(
        `Havemind: could not remove member \u2014 ${error51 instanceof Error ? error51.message : "unexpected error"}`
      );
    }
  }
  /**
   * Invitee side: arm the rejoin poll after a terminal auth failure. Idempotent
   * — a second terminal status while a poll is already armed is a no-op, so the
   * poll is never doubled. Builds the controller from this device's persisted
   * (membershipId, deviceId); if none is stored there is nothing to rejoin with.
   */
  async armRejoin() {
    if (this.rejoinController !== null) return;
    const controller = await buildRejoinControllerForInvitee(this);
    if (controller === null || this.unloaded || this.rejoinController !== null) {
      return;
    }
    this.rejoinController = controller;
    this.rejoinRestarted = false;
    this.rejoinArmedGeneration = this.connectGeneration;
    const timer = globalThis.setInterval(() => {
      void this.pollRejoinOnce();
    }, REJOIN_POLL_INTERVAL_MS);
    this.registerInterval(timer);
    this.rejoinPollTimer = timer;
  }
  /**
   * One rejoin poll tick. Presents the persisted binding; on the first
   * 'syncing' result it disarms and restarts the connection exactly once (the
   * `rejoinRestarted` guard plus the controller's own idempotency prevent a
   * double-start). If unload raced the in-flight attempt, it cancels cleanly.
   */
  async pollRejoinOnce() {
    const controller = this.rejoinController;
    if (controller === null || this.rejoinRestarted || this.unloaded) return;
    if (this.rejoinArmedGeneration !== null && this.connectGeneration !== this.rejoinArmedGeneration) {
      this.disarmRejoin();
      return;
    }
    let result;
    try {
      result = await controller.attempt();
    } catch {
      if (this.unloaded || this.rejoinRestarted) return;
      this.surfaceRejoinFailed();
      return;
    }
    if (this.unloaded || this.rejoinRestarted) return;
    if (typeof result === "object" && result.status === "syncing") {
      this.rejoinRestarted = true;
      this.disarmRejoin();
      await this.restartConnectionAfterRejoin();
      return;
    }
    if (result === "rejoin-failed") {
      this.surfaceRejoinFailed();
    }
  }
  /**
   * Disarm the doomed poll and surface a terminal rejoin failure to the user
   * (status + Notice), leaving a manual reconnect as the only retry path. Shared
   * by the 'rejoin-failed' controller result and a raw throw from attempt().
   */
  surfaceRejoinFailed() {
    this.disarmRejoin();
    this.connectionError = "Rejoin failed \u2014 the server rejected the automatic rejoin. Reconnect manually to resume syncing.";
    this.setStatus(formatStatusBar({ status: "reconnect-required" }));
    new import_obsidian14.Notice(
      "Havemind: rejoin failed. Reconnect manually to resume syncing."
    );
    this.onboardingView?.refresh();
  }
  /** Tears the invitee rejoin poll down (idempotent). */
  disarmRejoin() {
    if (this.rejoinPollTimer !== null) {
      globalThis.clearInterval(this.rejoinPollTimer);
      this.rejoinPollTimer = null;
    }
    this.rejoinController = null;
    this.rejoinArmedGeneration = null;
  }
  /**
   * Restarts the connection after a successful rejoin. The fresh refresh token
   * is already persisted, so startConnection resumes sync under the SAME
   * membership. Follows the established invariant: stop-previous → await →
   * guard-against-unload → assign (the guard lives inside startConnection).
   */
  async restartConnectionAfterRejoin() {
    this.connection?.stop();
    this.connection = null;
    await this.startConnection();
  }
  /**
   * User-initiated "Retry now": force an immediate reconnect from a non-synced
   * backoff/terminal state instead of waiting out the sync runner's backoff.
   * Reuses the SAME startConnection code path as the layout-ready autostart
   * (stop-previous → await → guard-against-unload/clobber → assign, the guard
   * lives inside startConnection) rather than inventing a parallel connect.
   *
   * Idempotent under a rapid double-click: the `retryInFlight` guard makes the
   * second click a no-op while the first build is still awaiting, so two live
   * handles can never be created.
   *
   * Terminal reconnect-required (auth-dead) choice: restart FIRST. The persisted
   * refresh token may still work, so a plain restart is the option that cannot
   * make things worse.
   *
   * FINDING 1a: disarm any armed invitee rejoin poll BEFORE restarting. Leaving
   * it armed lets a stale 30 s tick fire against the connection this retry just
   * rebuilt — attempt() → 'syncing' → stop + restart — thrashing a healthy
   * connection up to 30 s after the user fixed it. The fallback is not lost: if
   * the restart lands back in reconnect-required, `handleStatus` re-arms the poll
   * from scratch.
   */
  async retryConnection() {
    if (this.retryInFlight) return;
    this.retryInFlight = true;
    try {
      this.disarmRejoin();
      this.connection?.stop();
      this.connection = null;
      await this.startConnection();
    } finally {
      this.retryInFlight = false;
    }
  }
  /**
   * User-initiated "Reset connection" (P1 #5): clear the damaged persisted
   * pairing so this device can be paired again. This is the supported form of the
   * manual "delete data.json" the field incident needed.
   *
   * Order: quiesce first (stop the loop, disarm the rejoin poll) so nothing
   * re-writes the keys mid-reset, then clear disk + secrets, then drop the
   * in-memory mirrors of what was just cleared (roster, send-queue state,
   * pending invitation/approval) and return the panel to `disconnected`.
   *
   * Idempotent under a rapid double-click via `resetInFlight`. No vault content
   * is touched: notes on disk are the source of truth and are re-reconciled once
   * the device is paired again.
   */
  async resetConnection() {
    if (this.resetInFlight) return;
    this.resetInFlight = true;
    try {
      this.disarmRejoin();
      this.connection?.stop();
      this.connection = null;
      this.syncState = null;
      await resetHavemindConnectionState(this);
      this.rosterMembers = [];
      this.deadMembershipIds = [];
      this.rejoinWaiting = /* @__PURE__ */ new Set();
      this.pendingInvitation = null;
      this.pendingApprovals = [];
      this.notifiedQuarantineIds = /* @__PURE__ */ new Set();
      this.awaitingApproval = null;
      this.guestInvitationInvalid = false;
      this.connectionActive = false;
      this.connectionNotice = void 0;
      this.connectionNoticeKind = void 0;
      this.connectionStatus = "disconnected";
      this.lastSyncedAt = void 0;
      this.connectionError = void 0;
      this.setStatus(formatStatusBar({ status: "disconnected" }));
      new import_obsidian14.Notice(
        "Havemind: connection reset. Paste a new invitation or pairing token to connect."
      );
    } catch (error51) {
      new import_obsidian14.Notice(
        `Havemind: could not reset the connection \u2014 ${error51 instanceof Error ? error51.message : "unexpected error"}`
      );
    } finally {
      this.resetInFlight = false;
      this.onboardingView?.refresh();
    }
  }
  /**
   * A short human-readable connection status line for the settings tab (MINOR 9).
   * Reuses the same panel view-model the pane renders, so the wording stays in
   * lockstep with the live indicator.
   */
  panelStatusLabel() {
    return this.connectionPanel().label;
  }
  /** Opens (or reveals) the Havemind pane. */
  revealPanel() {
    void this.openView(HAVEMIND_ONBOARDING_VIEW);
  }
  /**
   * The three connection actions plus their availability, in one place. Both the
   * command palette entries (see `onload`) and the settings-tab buttons call
   * through here, so neither surface holds its own copy of what an action does.
   */
  connectionActions() {
    return {
      syncNow: () => {
        void this.syncNow();
      },
      disconnect: () => {
        this.disconnect();
      },
      resetConnection: () => {
        void this.resetConnection();
      },
      connected: () => this.connection !== null
    };
  }
  /** The read-only summary the settings tab renders (FINDING 7). */
  settingsInfo() {
    const serverName = this.connection?.serverName ?? "";
    return {
      server: serverName.length === 0 ? "Not connected" : serverName,
      status: this.panelStatusLabel(),
      lastSync: this.lastSyncedAt === void 0 ? "Not yet" : formatActivityTime(this.lastSyncedAt),
      members: formatMemberCount(this.rosterMembers.length),
      connected: this.connection !== null
    };
  }
  /** Whether the F6 author overlay is currently drawing. */
  authorOverlayEnabled() {
    return this.showAuthors;
  }
  /**
   * The "Show authors" action, shared by the command, the ribbon and the
   * settings tab. Holds no listener of its own: both overlay surfaces read this
   * flag through a closure, so flipping it plus asking Obsidian to re-run the
   * registered editor extensions is the whole effect. Reading view redraws on
   * its next render, which the Notice says out loud rather than leaving the user
   * wondering why one pane changed and the other did not.
   */
  toggleAuthorOverlay() {
    this.showAuthors = !this.showAuthors;
    this.authorOverlayChosen = true;
    this.app.workspace.updateOptions?.();
    new import_obsidian14.Notice(
      `Havemind: author overlay ${this.showAuthors ? "on" : "off"}. Reading view updates on its next render.`
    );
    void this.persistAuthorOverlayFlag();
  }
  /** Reads the persisted "Show authors" flag; absent or unreadable means off. */
  async restoreAuthorOverlayFlag() {
    try {
      const stored = await getPluginDataMutex(this).load();
      if (this.authorOverlayChosen) return;
      this.showAuthors = stored[SHOW_AUTHORS_KEY] === true;
      if (this.showAuthors) {
        this.app.workspace.updateOptions?.();
      }
    } catch {
    }
  }
  /** Persists the flag without disturbing any other `data.json` key. */
  async persistAuthorOverlayFlag() {
    try {
      await getPluginDataMutex(this).update((current) => ({
        ...current,
        [SHOW_AUTHORS_KEY]: this.showAuthors
      }));
    } catch {
    }
  }
  /**
   * Overlay input for one file, honestly degraded to whole-file attribution —
   * see `attribution/overlay-source.ts` for why per-line is not derivable yet.
   */
  overlayInputFor(path, content) {
    return buildFileOverlayInput({
      enabled: this.showAuthors,
      path,
      content,
      entries: this.activityLog.snapshot(),
      roster: this.rosterMembers,
      reducedMotion: prefersReducedMotion(),
      formatTimestamp: formatActivityTime
    });
  }
  /** The Reading-view overlay for the one block Obsidian just rendered. */
  readingViewOverlay(path, content, section) {
    const input = this.overlayInputFor(path, content);
    if (input === null) return null;
    return buildReadingViewOverlay(input, [
      {
        blockId: `${path}:${section.lineStart}-${section.lineEnd}`,
        section: { lineStart: section.lineStart, lineEnd: section.lineEnd }
      }
    ]);
  }
  connectionPanel() {
    return buildConnectionPanel({
      status: this.connectionStatus,
      serverName: this.connection?.serverName ?? "",
      reducedMotion: prefersReducedMotion(),
      ...this.lastSyncedAt === void 0 ? {} : { lastSyncedAt: this.lastSyncedAt },
      ...this.connectionError === void 0 ? {} : { errorMessage: this.connectionError }
    });
  }
  /**
   * Owner action: mint an invitation for the connected vault, reveal the
   * copyable envelope, and register the joining device in the waiting list so
   * the owner can approve it by clicking a row (never by typing a UUID). The
   * envelope (a secret) is rendered only for the owner to copy — never logged.
   */
  async createInvitation(role, name, report) {
    try {
      const invitation = await createInvitationForOwner(this, {
        intendedRole: role,
        ...name.length === 0 ? {} : { intendedMemberDisplayName: name }
      });
      if (invitation === null) {
        report("Connect as the vault owner before creating an invitation.");
        return;
      }
      this.connectionActive = true;
      this.setPendingInvitation(invitation);
      this.pendingApprovals = [
        ...this.pendingApprovals.filter(
          (entry) => entry.invitationId !== invitation.invitationId
        ),
        {
          invitationId: invitation.invitationId,
          expiresAt: invitation.expiresAt,
          intendedRole: role,
          ...name.length === 0 ? {} : { intendedMemberDisplayName: name }
        }
      ];
      this.connectionNotice = "Invitation created. Copy it and send it to the other device.";
      this.connectionNoticeKind = void 0;
      this.onboardingView?.refresh();
    } catch (error51) {
      report(
        `Could not create invitation: ${error51 instanceof Error ? error51.message : "unexpected error"}`
      );
    }
  }
  /** Clears the minted-invitation display without touching the waiting list. */
  /**
   * Closes the owner composer and returns to the connection panel. Clearing
   * `connectionActive` is what makes Done a real exit: `render()` gives the
   * composer priority and returns before drawing the status indicator, so
   * leaving the composer open would hide "Connected — synced" indefinitely and
   * read as if the vault had disconnected.
   */
  dismissInvitation() {
    this.pendingInvitation = null;
    this.connectionActive = false;
    this.connectionNotice = void 0;
    this.connectionNoticeKind = void 0;
    this.onboardingView?.refresh();
  }
  /** Stores the created invitation so the onboarding view can display it. */
  setPendingInvitation(invitation) {
    this.pendingInvitation = invitation;
  }
  setStatus(view) {
    const item = this.statusItem;
    if (item === null) return;
    item.empty();
    const glyph = item.createEl("span", { attr: DECORATIVE });
    (0, import_obsidian14.setIcon)(glyph, "hexagon");
    item.createEl("span", { text: view.text });
  }
  /** Supplies the Activity view with a live feed and a restore action. */
  setActivityOptions(options) {
    this.activityOptions = options;
  }
  openActivityView() {
    return this.openView(HAVEMIND_ACTIVITY_VIEW);
  }
  async openView(type) {
    const existingLeaf = this.app.workspace.getLeavesOfType(type)[0];
    const leaf = existingLeaf ?? this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    if (!existingLeaf) {
      await leaf.setViewState({
        active: true,
        type
      });
    }
    await this.app.workspace.revealLeaf(leaf);
  }
};
