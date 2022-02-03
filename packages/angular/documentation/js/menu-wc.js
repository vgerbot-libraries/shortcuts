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
                    <a href="index.html" data-type="index-link">@shortcuts/angular-root documentation</a>
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
                                <a href="modules/ShortcutsModule.html" data-type="entity-link" >ShortcutsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' : 'data-target="#xs-components-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' :
                                            'id="xs-components-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' }>
                                            <li class="link">
                                                <a href="components/ShortcutsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortcutsKeyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsKeyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' : 'data-target="#xs-directives-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' :
                                        'id="xs-directives-links-module-ShortcutsModule-0281c1501f690d2a41db3eb4895d1f1493a97bbc8c4847b25fd9bb4aece42bdc4fe43ac5374b55f1f2a87ae5648950923da8e6adedf161bfc7c3cf5d5d50e80e"' }>
                                        <li class="link">
                                            <a href="directives/ShortcutsAnchorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsAnchorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ShortcutsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsDirective</a>
                                        </li>
                                    </ul>
                                </li>
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
                                    <a href="injectables/ShortcutsService.html" data-type="entity-link" >ShortcutsService</a>
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
                                <a href="interfaces/ShortcutsModuleOptions.html" data-type="entity-link" >ShortcutsModuleOptions</a>
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
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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