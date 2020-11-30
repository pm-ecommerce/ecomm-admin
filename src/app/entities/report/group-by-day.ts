export class GroupByDay {
  public count: number;
  public sum: number;
  public day: string;

  constructor(item: GroupByDay = {} as GroupByDay) {
    this.count = item.count || 0;
    this.sum = item.sum || 0;
    this.day = item.day || '';
  }
}
