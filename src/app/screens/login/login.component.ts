import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ParseService } from '../../services/parse.service'
import { NotifierService } from '../../modules/notifier/notifier.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup
  loading: boolean
  formField = LoginModel
  pFiedType = 'password'
  pIconTooltip = 'Mostrar Contraseña'


  constructor(private fb: FormBuilder,
              private parse: ParseService,
              private router: Router,
              private ngZone: NgZone) {
    this.form = this.buildForm(this.fb)
  }

  ngOnInit() {
  }


  buildForm(builder: FormBuilder) {
    return builder.group({
      [ LoginModel.USER_NAME ]: [ null, [ Validators.required ] ],
      [ LoginModel.PASSWORD ]: [ null, [ Validators.required ] ],
    })
  }

  send() {

    if (!this.form.valid) {
      return
    }
    this.loading = true
    console.log(this.form.value)
    this.parse.logIn(this.form.value).subscribe(response => {
      console.log(response)
      this.loading = false
      this.ngZone.run(() => this.router.navigate([ '/sniffer-data' ]))
      // this.notifier.showSuccess('Bienvenido')
    }, err => {
      this.loading = false
      console.log(err)
      // this.notifier.showError('Nombre de usuario o contraseña incorrectas')
    })
  }

  showPassword() {
    if (this.pFiedType === 'password') {
      this.pFiedType = 'text'
      this.pIconTooltip = 'Ocultar contraseña'
    } else {
      this.pFiedType = 'password'
      this.pIconTooltip = 'Mostrar contraseña'
    }
  }

}


export class LoginModel {
  public static USER_NAME = 'username'
  public static PASSWORD = 'password'

}
