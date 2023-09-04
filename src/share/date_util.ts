export class DateUtil {
  static getFirstDateOfMonth(): string {
    const date = new Date();
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split('T');
    return firstDate[0].concat('T00:00:00.000Z');
  }

  static getLastDateOfMonth(): string {
    const date = new Date();
    const lastDay = new Date(
      date.getMonth() + 1,
      date.getFullYear(),
      0,
    ).getDate();

    const lastDate = new Date(date.getFullYear(), date.getMonth(), lastDay)
      .toISOString()
      .split('T');

    return lastDate[0].concat('T00:00:00.000Z');
  }

  static getDateTodayInit(): string {
    const today = new Date(Date.now()).toISOString().split('T');
    return today[0].concat('T00:00:00.000Z');
  }

  static getDateTomorrowInit(): string {
    const tomorrow = this.addDays(new Date(Date.now()), 1)
      .toISOString()
      .split('T');
    return tomorrow[0].concat('T00:00:00.000Z');
  }

  static getDateTodayEnd(): string {
    const today = new Date(Date.now()).toISOString().split('T');
    return today[0].concat('T23:59:59.000Z');
  }

  static getDateShort(date: string): string {
    return date.split('T')[0];
  }

  private static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
}
