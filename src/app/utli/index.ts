/**
 * local server
 */
export const serve = 'http://localhost:3001'


export class Const {

  public static readonly PATTERNS = {
    emailExpression: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alphanum_space_expression: /[\w ]+/,
    alpha_expression: /[a-zA-ZñÑ áéíóúüÁÉÍÓÚÜ]+/
  }

}
