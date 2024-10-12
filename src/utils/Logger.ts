export class Logger {
  private readonly tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private getLink(text?: string): string {
    return text ? `\x1b[36m\x1b[4m${text}` : "";
  }

  private getFeature(text?: string): string {
    return text ? `\x1b[35m<${text}>` : "";
  }

  private getMessage(text: string): string {
    return `\x1b[0m${text}`;
  }

  public debug(message: string, feature?: string, link?: string) {
    const messageText = this.getMessage(message);
    const featureText = this.getFeature(feature);
    const linkText = this.getLink(link);
    console.debug(
      `\x1b[36m[${this.tag}] ${featureText} ${messageText} ${linkText}\x1b[0m`
    );
  }

  public warning(message: string, feature?: string, link?: string) {
    const messageText = this.getMessage(message);
    const featureText = this.getFeature(feature);
    const linkText = this.getLink(link);
    console.warn(
      `\x1b[33m[${this.tag}] ${featureText} ${messageText} ${linkText}\x1b[0m`
    );
  }

  public error(message: string, feature?: string, link?: string) {
    const messageText = this.getMessage(message);
    const featureText = this.getFeature(feature);
    const linkText = this.getLink(link);
    console.error(
      `\x1b[31m[${this.tag}] ${featureText} ${messageText} ${linkText}\x1b[0m`
    );
  }

  public info(message: string, feature?: string, link?: string) {
    const messageText = this.getMessage(message);
    const featureText = this.getFeature(feature);
    const linkText = this.getLink(link);
    console.info(
      `\x1b[32m[${this.tag}] ${featureText} ${messageText} ${linkText}\x1b[0m`
    );
  }
}
