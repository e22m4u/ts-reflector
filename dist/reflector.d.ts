import 'reflect-metadata';
import { MetadataKey } from './metadata-key';
/**
 * Reflector key.
 */
export type ReflectorKey<T> = MetadataKey<T> | symbol | string | number | object;
/**
 * Typed Reflect wrapper.
 */
export declare class Reflector {
    /**
     * Define metadata.
     *
     * @param key
     * @param metadata
     * @param target
     * @param propertyName
     */
    static defineMetadata<T>(key: ReflectorKey<T>, metadata: T, target: object, propertyName?: string): void;
    /**
     * Has metadata.
     *
     * @param key
     * @param target
     * @param propertyName
     */
    static hasMetadata<T>(key: ReflectorKey<T>, target: object, propertyName?: string): boolean;
    /**
     * Has own metadata.
     *
     * @param key
     * @param target
     * @param propertyName
     */
    static hasOwnMetadata<T>(key: ReflectorKey<T>, target: object, propertyName?: string): boolean;
    /**
     * Get metadata.
     *
     * @param key
     * @param target
     * @param propertyName
     */
    static getMetadata<T>(key: ReflectorKey<T>, target: object, propertyName?: string): T | undefined;
    /**
     * Get own metadata.
     *
     * @param key
     * @param target
     * @param propertyName
     */
    static getOwnMetadata<T>(key: ReflectorKey<T>, target: object, propertyName?: string): T | undefined;
}
