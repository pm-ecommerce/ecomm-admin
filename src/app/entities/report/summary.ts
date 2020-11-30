export class Summary {
  vendorTotal;
  employeeTotal;
  userTotal;
  categoryTotal;
  productTotal;
  orderTotal;
  transactionTotal;
  deliveryTotal;
  costTotal;

  constructor(item: Summary = {} as Summary) {
    this.vendorTotal = item.vendorTotal || 0;
    this.employeeTotal = item.employeeTotal || 0;
    this.userTotal = item.userTotal || 0;
    this.categoryTotal = item.categoryTotal || 0;
    this.productTotal = item.productTotal || 0;
    this.orderTotal = item.orderTotal || 0;
    this.transactionTotal = item.transactionTotal || 0;
    this.deliveryTotal = item.deliveryTotal || 0;
    this.costTotal = item.costTotal || 0;
  }
}
