import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ParseService } from '../../services/parse.service'
import { NotifierService } from '../../modules/notifier/notifier.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserClass } from '../../models/user-class'
import { LoadingAndNotifierService } from '../../modules/loading-and-notifier/loading-and-notifier.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup
  loading: boolean
  formField = UserClass
  pFiedType = 'password'
  pIconTooltip = 'Mostrar Contraseña'


  constructor(private fb: FormBuilder,
              private parse: ParseService,
              private router: Router,
              // private ngZone: NgZone
              private notifier: LoadingAndNotifierService) {
    this.form = this.buildForm(this.fb)
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.notifier.closeLoadingComponent()
  }


  buildForm(builder: FormBuilder) {
    return builder.group({
      [ UserClass.USER_NAME ]: [ null, [ Validators.required ] ],
      [ UserClass.PASSWORD ]: [ null, [ Validators.required ] ],
    })
  }

  send() {

    if (!this.form.valid) {
      return
    }
    this.loading = true
    this.notifier.openLoadingComponent('Por favor espere', '')
    console.log(this.form.value)
    this.parse.logIn(this.form.value).subscribe(response => {
      console.log(response)
      this.loading = false
      // this.ngZone.run(() => this.router.navigate([ '/sniffer-data' ]))
      this.router.navigate([ '/sniffer-data' ])
      // this.notifier.showSuccess('Bienvenido')
    }, err => {
      this.loading = false
      this.notifier.closeLoadingComponent()
      this.notifier.showMessage('Ocurrio un error al intentar ingresar')
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



