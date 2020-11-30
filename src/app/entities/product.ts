export class Product {
  public id;
  public name;
  public category;
  public status;
  public slug;
  public description;
  public attributes;
  public price;
  public images;

  constructor(product: Product = {} as Product) {
    this.id = product.id;
    this.name = product.name || '';
    this.slug = product.slug || '';
    this.category = product.category || {};
    this.status = product.status || 0;
    this.price = product.price || 0;
    this.description = product.description || '';
    this.attributes = product.attributes || [];
    this.images = product.images || [];
  }

  public addAnotherAttribute() {
    this.attributes.push({
      name: '',
      options: []
    });
  }

  public clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  public cloneAttribute(attribute: any, index: number = 0) {
    const attr = this.clone(attribute);
    delete attr.id;
    if (attr.options && attr.options.length) {
      attr.options = attr.options.map((r: any) => {
        delete r.id;
        return r;
      });
    }

    const attributes = this.clone(this.attributes);
    attributes.splice(index + 1, 0, attr);
    this.attributes = attributes;
  }

  public removeAllAttributes() {
    this.attributes = [];
  }

  public removeCurrentAttribute(attrIndex: number) {
    this.attributes.splice(attrIndex, 1);
  }

  public createOptionId(event: any, attr: any, attrIndex: number) {
  }

}
