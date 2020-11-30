export class GroupByMonth {
  public count: number;
  public sum: number;
  public month: string;

  constructor(item: GroupByMonth = {} as GroupByMonth) {
    this.count = item.count || 0;
    this.sum = item.sum || 0;
    this.month = item.month || '';
  }
}
