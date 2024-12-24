"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  DecoratorTargetType: () => DecoratorTargetType,
  MetadataKey: () => MetadataKey,
  Reflector: () => Reflector,
  getDecoratorTargetType: () => getDecoratorTargetType
});
module.exports = __toCommonJS(index_exports);

// dist/esm/reflector.js
var import_reflect_metadata = require("reflect-metadata");
var _Reflector = class _Reflector {
  /**
   * Define metadata.
   *
   * @param key
   * @param metadata
   * @param target
   * @param propertyName
   */
  static defineMetadata(key, metadata, target, propertyName) {
    if (propertyName)
      return Reflect.defineMetadata(key, metadata, target, propertyName);
    return Reflect.defineMetadata(key, metadata, target);
  }
  /**
   * Has metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static hasMetadata(key, target, propertyName) {
    return propertyName ? Reflect.hasMetadata(key, target, propertyName) : Reflect.hasMetadata(key, target);
  }
  /**
   * Has own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static hasOwnMetadata(key, target, propertyName) {
    return propertyName ? Reflect.hasOwnMetadata(key, target, propertyName) : Reflect.hasOwnMetadata(key, target);
  }
  /**
   * Get metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getMetadata(key, target, propertyName) {
    return propertyName ? Reflect.getMetadata(key, target, propertyName) : Reflect.getMetadata(key, target);
  }
  /**
   * Get own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getOwnMetadata(key, target, propertyName) {
    return propertyName ? Reflect.getOwnMetadata(key, target, propertyName) : Reflect.getOwnMetadata(key, target);
  }
};
__name(_Reflector, "Reflector");
var Reflector = _Reflector;

// dist/esm/utils/get-decorator-target-type.js
var DecoratorTargetType;
(function(DecoratorTargetType2) {
  DecoratorTargetType2["CONSTRUCTOR"] = "constructor";
  DecoratorTargetType2["INSTANCE"] = "instance";
  DecoratorTargetType2["STATIC_METHOD"] = "staticMethod";
  DecoratorTargetType2["INSTANCE_METHOD"] = "instanceMethod";
  DecoratorTargetType2["STATIC_PROPERTY"] = "staticProperty";
  DecoratorTargetType2["INSTANCE_PROPERTY"] = "instanceProperty";
  DecoratorTargetType2["CONSTRUCTOR_PARAMETER"] = "constructorParameter";
  DecoratorTargetType2["STATIC_METHOD_PARAMETER"] = "staticMethodParameter";
  DecoratorTargetType2["INSTANCE_METHOD_PARAMETER"] = "instanceMethodParameter";
})(DecoratorTargetType || (DecoratorTargetType = {}));
function getDecoratorTargetType(target, propertyKey, descriptorOrIndex) {
  const isCtor = typeof target === "function";
  const isParameter = typeof descriptorOrIndex === "number";
  const isProperty = propertyKey != null && descriptorOrIndex == null;
  const isMethod = propertyKey != null && descriptorOrIndex != null;
  const D = DecoratorTargetType;
  if (isCtor) {
    if (isParameter)
      return propertyKey ? D.STATIC_METHOD_PARAMETER : D.CONSTRUCTOR_PARAMETER;
    if (isProperty)
      return D.STATIC_PROPERTY;
    if (isMethod)
      return D.STATIC_METHOD;
    return D.CONSTRUCTOR;
  } else {
    if (isParameter)
      return D.INSTANCE_METHOD_PARAMETER;
    if (isProperty)
      return D.INSTANCE_PROPERTY;
    if (isMethod)
      return D.INSTANCE_METHOD;
    return D.INSTANCE;
  }
}
__name(getDecoratorTargetType, "getDecoratorTargetType");

// dist/esm/metadata-key.js
var _MetadataKey = class _MetadataKey {
  name;
  /**
   * Fix generic type validation.
   *
   * Example:
   *
   * ```ts
   * class Foo<T> {}
   * class Bar<T> {}
   *
   * class Baz {
   *     static method<T>(
   *         foo: Foo<T>,
   *         bar: Bar<T>,
   *     ) {}
   * }
   *
   * Baz.method(
   *     new Foo<string>(),
   *     new Bar<number>(), // No error because T is not used.
   * );
   * ```
   */
  _fixUnusedGeneric;
  /**
   * Fix structural typing.
   */
  _fixStructuralTyping = "metadataKey";
  /**
   * Constructor.
   *
   * @param name
   */
  constructor(name) {
    this.name = name;
  }
  /**
   * To string.
   */
  toString() {
    return this.name ? this.constructor.name + `(${this.name})` : this.constructor.name;
  }
};
__name(_MetadataKey, "MetadataKey");
var MetadataKey = _MetadataKey;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DecoratorTargetType,
  MetadataKey,
  Reflector,
  getDecoratorTargetType
});
