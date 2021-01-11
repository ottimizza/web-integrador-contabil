import { EMAIL_REGULAR_EXPRESSION } from './rfc-email.regex';

export class StringUtils {

  public static normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Regex recomendada pela RFC 882
   */
  public static validateEmail(email: string) {
    return EMAIL_REGULAR_EXPRESSION.test(email.replace(' ', ','));
  }

}
