import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './modules/app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './modules/shared.module'
import { LoginComponent } from './screens/login/login.component'
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { SnifferTokenListComponent } from './screens/sniffer-token/sniffer-token-list/sniffer-token-list.component'
import { SnifferTokenFormComponent } from './screens/sniffer-token/sniffer-token-form/sniffer-token-form.component'
import { SnifferDataListComponent } from './screens/sniffer-data/sniffer-data-list/sniffer-data-list.component'
import { SnifferDataDetailComponent } from './screens/sniffer-data/sniffer-data-detail/sniffer-data-detail.component'
import { SniffersListComponent } from './screens/sniffers/sniffers-list/sniffers-list.component';
import { SnifferFormComponent } from './screens/sniffers/sniffer-form/sniffer-form.component';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { AccordionComponent } from './components/accordion/accordion.component'

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
    AccordionComponent,
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
