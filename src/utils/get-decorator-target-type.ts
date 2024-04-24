/**
 * Decorator target type.
 */
export enum DecoratorTargetType {
  CONSTRUCTOR = 'constructor',
  INSTANCE = 'instance',
  STATIC_METHOD = 'staticMethod',
  INSTANCE_METHOD = 'instanceMethod',
  STATIC_PROPERTY = 'staticProperty',
  INSTANCE_PROPERTY = 'instanceProperty',
  CONSTRUCTOR_PARAMETER = 'constructorParameter',
  STATIC_METHOD_PARAMETER = 'staticMethodParameter',
  INSTANCE_METHOD_PARAMETER = 'instanceMethodParameter',
}

/**
 * Get decorator target type.
 *
 * @param target
 * @param propertyKey
 * @param descriptorOrIndex
 */
export function getDecoratorTargetType(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
): DecoratorTargetType {
  const isCtor = typeof target === 'function';
  const isParameter = typeof descriptorOrIndex === 'number';
  const isProperty = propertyKey != null && descriptorOrIndex == null;
  const isMethod = propertyKey != null && descriptorOrIndex != null;
  const D = DecoratorTargetType;
  if (isCtor) {
    if (isParameter)
      return propertyKey ? D.STATIC_METHOD_PARAMETER : D.CONSTRUCTOR_PARAMETER;
    if (isProperty) return D.STATIC_PROPERTY;
    if (isMethod) return D.STATIC_METHOD;
    return D.CONSTRUCTOR;
  } else {
    if (isParameter) return D.INSTANCE_METHOD_PARAMETER;
    if (isProperty) return D.INSTANCE_PROPERTY;
    if (isMethod) return D.INSTANCE_METHOD;
    return D.INSTANCE;
  }
}
