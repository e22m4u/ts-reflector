import 'reflect-metadata';
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
    static hasOwnMetadata(key, target, propertyName) {
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
    static getMetadata(key, target, propertyName) {
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
    static getOwnMetadata(key, target, propertyName) {
        return propertyName
            ? Reflect.getOwnMetadata(key, target, propertyName)
            : Reflect.getOwnMetadata(key, target);
    }
}
