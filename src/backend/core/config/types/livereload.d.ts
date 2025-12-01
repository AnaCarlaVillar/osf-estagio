declare module "livereload" {
  interface LiveReloadServerOptions {
    exts?: string[];
    delay?: number;
  }

  interface LiveReloadServer {
    watch(path: string): void;
    server: {
      on(event: string, callback: () => void): void;
    };
  }

  function createServer(options?: LiveReloadServerOptions): LiveReloadServer;

  export = { createServer };
}