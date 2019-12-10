'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Documentación Front Sniffer</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-57f7fa7712119755d7e08f0c1b253627"' : 'data-target="#xs-components-links-module-AppModule-57f7fa7712119755d7e08f0c1b253627"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-57f7fa7712119755d7e08f0c1b253627"' :
                                            'id="xs-components-links-module-AppModule-57f7fa7712119755d7e08f0c1b253627"' }>
                                            <li class="link">
                                                <a href="components/AccordionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccordionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FabButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FabButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnifferDataDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnifferDataDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnifferDataListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnifferDataListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnifferFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnifferFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnifferTokenFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnifferTokenFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnifferTokenListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnifferTokenListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SniffersListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SniffersListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotifierModule.html" data-type="entity-link">NotifierModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' : 'data-target="#xs-components-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' :
                                            'id="xs-components-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' }>
                                            <li class="link">
                                                <a href="components/NotifierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotifierComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' : 'data-target="#xs-injectables-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' :
                                        'id="xs-injectables-links-module-NotifierModule-e522c98d34f131d2ae70e163a364046d"' }>
                                        <li class="link">
                                            <a href="injectables/NotifierService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotifierService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' : 'data-target="#xs-components-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' :
                                            'id="xs-components-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' }>
                                            <li class="link">
                                                <a href="components/AppToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' : 'data-target="#xs-injectables-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' :
                                        'id="xs-injectables-links-module-SharedModule-20c6504257ae6035d73b5654e1900619"' }>
                                        <li class="link">
                                            <a href="injectables/ParseService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ParseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SharedService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SharedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Consts.html" data-type="entity-link">Consts</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenericClass.html" data-type="entity-link">GenericClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotifierConfigModel.html" data-type="entity-link">NotifierConfigModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleDataSource.html" data-type="entity-link">SimpleDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/SnifferClass.html" data-type="entity-link">SnifferClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserClass.html" data-type="entity-link">UserClass</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccordionService.html" data-type="entity-link">AccordionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseService.html" data-type="entity-link">ParseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link">SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnifferDataResolverService.html" data-type="entity-link">SnifferDataResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnifferService.html" data-type="entity-link">SnifferService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginResolverService.html" data-type="entity-link">LoginResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/SniffersResolverService.html" data-type="entity-link">SniffersResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/TokensResolverService.html" data-type="entity-link">TokensResolverService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppOptions.html" data-type="entity-link">AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataWithCount.html" data-type="entity-link">DataWithCount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogDataInterface.html" data-type="entity-link">DialogDataInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PropertySortFns.html" data-type="entity-link">PropertySortFns</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShipData.html" data-type="entity-link">ShipData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});