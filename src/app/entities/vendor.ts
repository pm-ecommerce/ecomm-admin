export class Vendor {
    public id;
    public name;
    public email;
    public businessName;
    public status;
    public password;
    public address;

    constructor(vendor: Vendor = {} as Vendor) {
        this.id = vendor.id;
        this.name = vendor.name || '';
        this.businessName = vendor.businessName || '';
        this.status = vendor.status || '';
        this.password = vendor.password || '';
        this.address = vendor.address || {};
    }

    public clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    public createOptionId(event: any, attr: any, attrIndex: number) {
    }

}