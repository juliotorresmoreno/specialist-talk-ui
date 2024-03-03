type ErrorOptions = {
  message?: string;
  cause?: any;
};

export class FetchError extends Error {
  cause?: any;

  constructor(opts: ErrorOptions | string = {}) {
    if (typeof opts === "string") {
      opts = { message: opts };
    }
    super(opts.message);
    this.cause = opts.cause;
  }
}
