/* eslint-disable @typescript-eslint/no-explicit-any */

export class Log {
  private constructor() {
    throw new Error('Do not create instance, only static method supported');
  }

  public static d(...args: any[]): void {
    console.debug(...args);
  }

  public static l(...args: any[]): void {
    console.log(...args);
  }

  public static e(...args: any[]): void {
    console.error(...args);
  }
}
