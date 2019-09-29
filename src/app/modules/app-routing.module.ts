import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NotFoundComponent } from '../screens/not-found/not-found.component'
import { LoginComponent } from '../screens/login/login.component'
import { SnifferTokenListComponent } from '../screens/sniffer-token/sniffer-token-list/sniffer-token-list.component'
import { SnifferDataListComponent } from '../screens/sniffer-data/sniffer-data-list/sniffer-data-list.component'
import { SnifferDataDetailComponent } from '../screens/sniffer-data/sniffer-data-detail/sniffer-data-detail.component'


const routes: Routes = [
  {
    path: 'login', component: LoginComponent, data: { name: 'Login', value: 'login', title: 'Login' }
  },
  {
    path: 'sniffer-token',
    component: SnifferTokenListComponent,
    data: {}
  },
  {
    path: 'sniffer-data',
    component: SnifferDataListComponent,
    data: {}
  },
   {
    path: 'sniffer-data/detail/:id',
    component: SnifferDataDetailComponent,
    data: {}
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, data: { name: 'Página no encontrada', value: 'notFound' } },

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
