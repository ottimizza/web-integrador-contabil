export class TimeUtils {

  public static SECOND = (val = 1) =>  val * 1000;
  public static MINUTE = (val = 1) => val * 60000;
  public static HOUR = (val = 1) => val * 3600000;
  public static DAY = (val = 1) => val * 86400000;

  public static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export const refresh = () => TimeUtils.sleep(0);
