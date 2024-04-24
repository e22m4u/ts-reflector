"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorTargetType = exports.DecoratorTargetType = void 0;
/**
 * Decorator target type.
 */
var DecoratorTargetType;
(function (DecoratorTargetType) {
    DecoratorTargetType["CONSTRUCTOR"] = "constructor";
    DecoratorTargetType["INSTANCE"] = "instance";
    DecoratorTargetType["STATIC_METHOD"] = "staticMethod";
    DecoratorTargetType["INSTANCE_METHOD"] = "instanceMethod";
    DecoratorTargetType["STATIC_PROPERTY"] = "staticProperty";
    DecoratorTargetType["INSTANCE_PROPERTY"] = "instanceProperty";
    DecoratorTargetType["CONSTRUCTOR_PARAMETER"] = "constructorParameter";
    DecoratorTargetType["STATIC_METHOD_PARAMETER"] = "staticMethodParameter";
    DecoratorTargetType["INSTANCE_METHOD_PARAMETER"] = "instanceMethodParameter";
})(DecoratorTargetType || (exports.DecoratorTargetType = DecoratorTargetType = {}));
/**
 * Get decorator target type.
 *
 * @param target
 * @param propertyKey
 * @param descriptorOrIndex
 */
function getDecoratorTargetType(target, propertyKey, descriptorOrIndex) {
    const isCtor = typeof target === 'function';
    const isParameter = typeof descriptorOrIndex === 'number';
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
    }
    else {
        if (isParameter)
            return D.INSTANCE_METHOD_PARAMETER;
        if (isProperty)
            return D.INSTANCE_PROPERTY;
        if (isMethod)
            return D.INSTANCE_METHOD;
        return D.INSTANCE;
    }
}
exports.getDecoratorTargetType = getDecoratorTargetType;
