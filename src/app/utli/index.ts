/**
 * local server
 */
export const serve = 'http://localhost:5337'


export class Consts {

  public static readonly APP_VERSION = '0.0.1'

  public static readonly PATTERNS = {
    emailExpression: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alphanum_space_expression: /[\w ]+/,
    alpha_expression: /[a-zA-ZñÑ áéíóúüÁÉÍÓÚÜ]+/
  }


  public static readonly parseConf = {
    applicationId: 'facturacionElectronica',
    serverURL: `${serve}/sniffer-backend`,
    // ------------ live query url (web socket) --`---------- //
    liveQueryUrl: `ws://${serve}/sniffer-backend`, // don't forget use wss in secure enviroment
  }

}
