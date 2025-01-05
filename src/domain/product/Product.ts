import { ProductJSON } from "./Product.types";

export default class Product {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly value: number,
  ) {}

  toJSON(): ProductJSON {
    return {
      name: this.name,
      description: this.description,
      value: this.value,
    };
  }
}
