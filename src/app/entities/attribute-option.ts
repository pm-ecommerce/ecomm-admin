export class AttributeOption {
  protected index: number;
  protected attribute: any;
  protected attrIndex: number;

  public id: string;
  public name: string;
  public display: string;
  public value: string;
  public price: number;
  public image: string;

  constructor(attr: any, i: number, attrIndex: number) {
    this.attribute = attr;
    this.index = i;
    this.attrIndex = attrIndex;

    this.init();
  }

  protected init(): void {
    const option: AttributeOption = this.attribute.options[this.index];
    this.id = option.id;
    this.name = option.name || option.display || option.value;
    this.price = option.price;
    this.image = option.image;

    this.display = option.display;
    this.value = option.value;
  }

  public getAttribute(): any {
    return this.attribute;
  }

  public getIndex(): number {
    return this.index;
  }

  public getAttrIndex(): number {
    return this.attrIndex;
  }

  public makeValues(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
      display: this.display,
      value: this.value,
    };
  }

  public compare(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }

  get imageName(): string {
    return this.image.substr(this.image.indexOf('-') + 1);
  }
}
