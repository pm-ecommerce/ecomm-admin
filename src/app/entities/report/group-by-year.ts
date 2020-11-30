export class GroupByYear {
  public count: number;
  public sum: number;
  public year: string;

  constructor(item: GroupByYear = {} as GroupByYear) {
    this.count = item.count || 0;
    this.sum = item.sum || 0;
    this.year = item.year || '';
  }
}
