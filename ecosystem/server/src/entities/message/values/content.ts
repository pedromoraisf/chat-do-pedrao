export class Content {
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  static create(content: string): Content {
    const cleanedContent = Content.clean(content);
    return new Content(cleanedContent);
  }

  static clean(content: string): string {
    if (!(content && typeof content === 'string')) return '';

    return content.trim();
  }
}
