export class DateUtils {

  public static ymdToDmy(date: string) {
    if (date.length !== 10) {
      throw new Error('The date passed to the method DateUtils.ymdToDmy() is not in the formate yyyy-mm-dd');
    } else {
      const dates = date.split('-');
      if (dates.length !== 3) {
        throw new Error('The date passed to the method DateUtils.ymdToDmy() is not in the formate yyyy-mm-dd');
      }
      return `${dates[2]}/${dates[1]}/${dates[0]}`;
    }
  }

  public static ymdToCompetence(date: string) {
    const dates = date.split('-');
    return `${dates[1]}/${dates[0]}`;
  }

  public static lastCompetence(competence: string) {
    const dates = competence.split('/').map(d => +d);
    if (dates[0] > 1) {
      const month = dates[0] - 1;
      let monthText = `${month}`;
      if (month < 10) {
        monthText = '0' + monthText;
      }
      return `${monthText}/${dates[1]}`;
    } else {
      return `12/${dates[1] - 1}`;
    }

  }

}
