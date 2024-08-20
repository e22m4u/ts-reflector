import 'reflect-metadata';
import {MetadataKey} from './metadata-key.js';

/**
 * Reflector key.
 */
export type ReflectorKey<T> =
  | MetadataKey<T>
  | symbol
  | string
  | number
  | object;

/**
 * Typed Reflect wrapper.
 */
export class Reflector {
  /**
   * Define metadata.
   *
   * @param key
   * @param metadata
   * @param target
   * @param propertyName
   */
  static defineMetadata<T>(
    key: ReflectorKey<T>,
    metadata: T,
    target: object,
    propertyName?: string,
  ) {
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
  static hasMetadata<T>(
    key: ReflectorKey<T>,
    target: object,
    propertyName?: string,
  ): boolean {
    return propertyName
      ? Reflect.hasMetadata(key, target, propertyName)
      : Reflect.hasMetadata(key, target);
  }

  /**
   * Has own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static hasOwnMetadata<T>(
    key: ReflectorKey<T>,
    target: object,
    propertyName?: string,
  ): boolean {
    return propertyName
      ? Reflect.hasOwnMetadata(key, target, propertyName)
      : Reflect.hasOwnMetadata(key, target);
  }

  /**
   * Get metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getMetadata<T>(
    key: ReflectorKey<T>,
    target: object,
    propertyName?: string,
  ): T | undefined {
    return propertyName
      ? Reflect.getMetadata(key, target, propertyName)
      : Reflect.getMetadata(key, target);
  }

  /**
   * Get own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getOwnMetadata<T>(
    key: ReflectorKey<T>,
    target: object,
    propertyName?: string,
  ): T | undefined {
    return propertyName
      ? Reflect.getOwnMetadata(key, target, propertyName)
      : Reflect.getOwnMetadata(key, target);
  }
}
