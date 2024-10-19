/**
 * Metadata key.
 */
export class MetadataKey {
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
    _fixStructuralTyping = 'metadataKey';
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
        return this.name
            ? this.constructor.name + `(${this.name})`
            : this.constructor.name;
    }
}
