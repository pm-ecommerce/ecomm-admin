export class Group {
  public count: number;
  public sum: number;
  public name: string;
  public year: string;
  public month: string;
  public week: string;
  public day: string;

  constructor(item: Group = {} as Group) {
    this.count = item.count || 0;
    this.sum = item.sum || 0;
    this.name = item.name || '';
    this.year = item.year || '';
    this.month = item.month || '';
    this.week = item.week || '';
    this.day = item.day || '';
  }
}
