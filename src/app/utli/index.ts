import * as Parse from 'parse'

/**
 * public server
 */
export const serve = 'https://sniffer-back.ddns.net'
/**
 * local server
 */
// export const serve = 'http://localhost:5337'


export class Consts {

  public static readonly APP_VERSION = '0.0.1'

  public static readonly PATTERNS = {
    emailExpression: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alphanum_space_expression: /[\w ]+/,
    alpha_expression: /[a-zA-ZñÑ áéíóúüÁÉÍÓÚÜ]+/,
    ip: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
  }


  public static readonly parseConf = {
    applicationId: 'facturacionElectronica',
    serverURL: `${serve}/sniffer-backend`,
    // ------------ live query url (web socket) --`---------- //
    liveQueryUrl: `ws://${serve}/sniffer-backend`, // don't forget use wss in secure enviroment
  }

  public static SNACKBAR_DURATION = 3000

  public static  get PUBLIC_ACL  () {
    const acl = new Parse.ACL()
    acl.setPublicWriteAccess(true)
    acl.setPublicReadAccess(true)
    return acl
  }

}
