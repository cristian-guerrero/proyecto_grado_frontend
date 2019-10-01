import { Component } from '@angular/core'
import {
  Router,
  Event,
  NavigationError,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  ActivatedRoute, RouterEvent
} from '@angular/router'
import { Title } from '@angular/platform-browser'
import { SharedService } from './services/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  loading: boolean
  barTitle: string
  progressBarMode = 'indeterminate'
  canShowToolBar = false

  constructor(private router: Router,
              private title: Title,
              private route: ActivatedRoute,
              private sharedService: SharedService) {

    this.handleRouter()
  }


  handleRouter() {

    this.router.events.subscribe((event: Event) => {

      switch (true) {
        case event instanceof NavigationStart:
          this.setCanShowToolBar(event as RouterEvent)
          this.loading = true
          break

        case event instanceof NavigationEnd:
          this.setTitle()
          this.loading = false
          break

        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.loading = false
          break

        default:
          break

      }
    })
  }


  setTitle() {

    let currentRoute = this.route.root
    while (currentRoute.children[ 0 ] !== undefined) {
      currentRoute = currentRoute.children[ 0 ]
    }
    const contextPathTitle = `${ currentRoute.snapshot.data.title || '' }`
    this.title.setTitle(contextPathTitle)
    this.barTitle = contextPathTitle
  }


  setCanShowToolBar(event: RouterEvent) {
    console.log(event)

    const exceptions = [
      '/login',
      '/',
    ]
    this.canShowToolBar = !exceptions.includes(event.url)

  }

}
