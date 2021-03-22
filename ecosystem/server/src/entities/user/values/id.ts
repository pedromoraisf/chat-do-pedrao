export class Id {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  get value(): string {
    return this.id
  }

  static create(id: string): Id {
    return new Id(id)
  }
}
