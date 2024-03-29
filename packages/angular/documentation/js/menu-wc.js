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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ShortcutsModule.html" data-type="entity-link" >ShortcutsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' : 'data-bs-target="#xs-components-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' :
                                            'id="xs-components-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' }>
                                            <li class="link">
                                                <a href="components/ShortcutsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShortcutsKeyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsKeyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' : 'data-bs-target="#xs-directives-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' :
                                        'id="xs-directives-links-module-ShortcutsModule-94254dc9de06764f9b4d48fbe36d0d3def25dca4eb6d098c6efde77518e23588d959bd8de4ffa5fc4ad0b72fba3416b2325f7a007211749b07f97a70438a46e9"' }>
                                        <li class="link">
                                            <a href="directives/ShortcutsAnchorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsAnchorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ShortcutsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortcutsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ShortkeyDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShortkeyDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FullContextOptions.html" data-type="entity-link" >FullContextOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShortcutsEventHandler.html" data-type="entity-link" >IShortcutsEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShortcutsModuleOptions.html" data-type="entity-link" >ShortcutsModuleOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
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
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});