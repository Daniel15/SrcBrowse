declare module "source-map" {
  declare class SourceMapConsumer {
    sources: $ReadOnlyArray<string>,

    destroy(): void;
    sourceContentFor(url: string): ?string;
  }

  declare module.exports: {
    SourceMapConsumer: (file: string | ArrayBuffer) => Promise<SourceMapConsumer>,
  }
}
