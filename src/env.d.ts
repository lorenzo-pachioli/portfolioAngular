// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_SERVICE_ID: string,
  readonly NG_APP_TEMPLATE_ID: string,
  readonly NG_APP_PUBLIC_KEY: string,
  [key: string]: any;
}

declare const _NGX_ENV_: Env;

