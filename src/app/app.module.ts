import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './modules/app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './modules/shared.module'
import { LoginComponent } from './views/login/login.component'
import { NotFoundComponent } from './views/not-found/not-found.component'
import { SnifferTokenListComponent } from './views/sniffer-token/sniffer-token-list/sniffer-token-list.component'
import { SnifferTokenFormComponent } from './views/sniffer-token/sniffer-token-form/sniffer-token-form.component'
import { SnifferDataListComponent } from './views/sniffer-data/sniffer-data-list/sniffer-data-list.component'
import { SnifferDataDetailComponent } from './views/sniffer-data/sniffer-data-detail/sniffer-data-detail.component'
import { SniffersListComponent } from './views/sniffers/sniffers-list/sniffers-list.component'
import { SnifferFormComponent } from './views/sniffers/sniffer-form/sniffer-form.component'
import { FabButtonComponent } from './components/fab-button/fab-button.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SnifferTokenListComponent,
    SnifferTokenFormComponent,
    SnifferDataListComponent,
    SnifferDataDetailComponent,
    SniffersListComponent,
    SnifferFormComponent,
    FabButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [],
  entryComponents: [
    SnifferTokenFormComponent,
    SnifferFormComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
