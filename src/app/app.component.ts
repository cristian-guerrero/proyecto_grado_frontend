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

import 'reflect-metadata'

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
          this.loading = true
          this.setCanShowToolBar(event as RouterEvent)
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

    const exceptions = [
      '/login',
      '/',
    ]
    this.canShowToolBar = !exceptions.includes(event.url)

  }

}

// ----- test decorator ------

/*
function logType(target: any, key: string) {

  let t = Reflect.getMetadata('design:type', target, key)

  // JSON.stringify(target, null, 4)
  console.log(`${ key } type: ${ t.name } `)


}


function SetName(data: any) {

  console.log(data)
  return (target: any, key: string) => {

    console.log(target, key)
  }
}


class Demo {

  @Reflect.metadata('design:type', 'un nuevo valor ')
  @SetName({ nombre: 'un nombre' })
  @logType
  private attribute: number

  action() {
    // return this.name
  }
}


const d = new Demo()

console.log(d)
*/
