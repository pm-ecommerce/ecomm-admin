export class Order {
  order_id;
  user_id;
  billing_address_id;
  shipping_address_id;
  tax;
  status;
  order_date;
  order_item_list;

  constructor(item: Order = {} as Order) {
    this.order_id = item.order_id || 0;
    this.user_id = item.user_id || 0;
    this.billing_address_id = item.billing_address_id || {};
    this.shipping_address_id = item.shipping_address_id || {};
    this.tax = item.tax;
    this.status = item.status;
    this.order_date = item.order_date;
    this.order_item_list = item.order_item_list || [];
  }
}
