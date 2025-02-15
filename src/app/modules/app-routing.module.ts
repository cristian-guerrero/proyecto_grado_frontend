import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NotFoundComponent } from '../views/not-found/not-found.component'
import { LoginComponent } from '../views/login/login.component'
import { SnifferTokenListComponent } from '../views/sniffer-token/sniffer-token-list/sniffer-token-list.component'
import { SnifferDataListComponent } from '../views/sniffer-data/sniffer-data-list/sniffer-data-list.component'
import { SnifferDataDetailComponent } from '../views/sniffer-data/sniffer-data-detail/sniffer-data-detail.component'
import { SniffersListComponent } from '../views/sniffers/sniffers-list/sniffers-list.component'
import { TokensResolverService } from '../resolvers/tokens-resolver.service'
import { LoginResolverService } from '../resolvers/login-resolver.service'
import { SniffersResolverService } from '../resolvers/sniffers-resolver.service'
import { SnifferDataResolverService } from '../resolvers/sniffer-data-resolver.service'


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: { data: LoginResolverService },
    data: { title: 'Login', type: 'login' }
  },
  {
    path: 'sniffer-token',
    component: SnifferTokenListComponent,
    resolve: { data: TokensResolverService },
    data: {
      type: 'list',
      title: 'Lista de Token'
    },
  },
  {
    path: 'sniffer-data',
    component: SnifferDataListComponent,
    resolve: { data: SnifferDataResolverService },
    data: {
      type: 'list',
      title: 'Lista Datos de Sniffer'
    }
  },
  {
    path: 'sniffer-data/detail/:id',
    component: SnifferDataDetailComponent,
    data: {
      title: 'Detalles de datos',
      type: 'detail',
    }
  },
  {
    path: 'sniffers-list',
    component: SniffersListComponent,
     resolve: { data: SniffersResolverService },
    data: {
      title: 'Lista de Sniffers',
      type: 'list',
    }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full', data: { type: 'login' } },
  { path: '**', component: NotFoundComponent, data: { type: 'notFound', value: 'notFound' } },

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
