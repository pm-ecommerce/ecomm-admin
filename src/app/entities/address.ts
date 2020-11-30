export class Address {
  public id;
  public address1;
  public address2;
  public zipcode;
  public city;
  public state;
  public country;

  constructor(addr: Address = {} as Address) {
    this.id = addr.id;
    this.address1 = addr.address1;
    this.address2 = addr.address2;
    this.zipcode = addr.zipcode;
    this.city = addr.city;
    this.state = addr.state;
    this.country = addr.country;
  }
}
