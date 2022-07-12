/* eslint-disable @typescript-eslint/naming-convention */

// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** Api key. */
  readonly VITE_API_KEY: string;

  /** Api URL. */
  readonly VITE_API_URL: string;
}

interface ImportMeta {

  /** Environment. */
  readonly env: ImportMetaEnv;
}
