/**
 * Metadata key.
 */
export class MetadataKey<T = unknown> {
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
  protected _fixUnusedGeneric?: T;

  /**
   * Fix structural typing.
   */
  protected _fixStructuralTyping = 'metadataKey' as const;

  /**
   * Constructor.
   *
   * @param name
   */
  constructor(readonly name?: string) {}

  /**
   * To string.
   */
  toString(): string {
    return this.name
      ? this.constructor.name + `(${this.name})`
      : this.constructor.name;
  }
}
