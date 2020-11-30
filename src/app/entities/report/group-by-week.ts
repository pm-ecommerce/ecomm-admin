export class GroupByWeek {
  public count: number;
  public sum: number;
  public week: string;

  constructor(item: GroupByWeek = {} as GroupByWeek) {
    this.count = item.count || 0;
    this.sum = item.sum || 0;
    this.week = item.week || '';
  }
}
