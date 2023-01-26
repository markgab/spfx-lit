import {LitElement, html, css, TemplateResult } from 'lit';
import {customElement, property} from 'lit/decorators';
import { escape } from '@microsoft/sp-lodash-subset';

@customElement('lit-app')
export class LitApp extends LitElement {

    @property({type: String})
    description: string;
    
    @property({type: Boolean})
    isDarkTheme: boolean;

    @property({type: String})
    environmentMessage: string;

    @property({type: Boolean})
    hasTeamsContext: boolean;

    @property({type: String})
    userDisplayName: string;

    render(): TemplateResult<1> {
        return html`
        <my-header color="red"></my-header>
        <section class="lit-app ${this.hasTeamsContext ? 'teams' : ''}">
          <div class="welcome">
            <img alt="" src="${this.isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')}" class="welcomeImage" />
            <h2>Well done, ${escape(this.userDisplayName)}!</h2>
            <div>${this.environmentMessage}</div>
            <div class="red">Web part property value: <strong>${escape(this.description)}</strong></div>
          </div>
          <div>
            <h3>Welcome to SharePoint Framework!</h3>
            <p>
              The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
            </p>
            <h4>Learn more about SPFx development:</h4>
              <ul class="links">
                <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
                <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</a></li>
                <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</a></li>
                <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
                <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</a></li>
                <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</a></li>
                <li><a href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</a></li>
              </ul>
          </div>
        </section>
        `;
    }

    static styles = css`
      .litApp {
        overflow: hidden;
        padding: 1em;
        color: var(--bodyText);
      }

      .litApp.teams {
        font-family: --teams-font-family;
      }

      .welcome {
        text-align: center;
      }

      .welcomeImage {
        width: 100%;
        max-width: 420px;
      }

      .links a {
          text-decoration: none;
          color: var(--link);
      }
      
      .links a:hover {
          text-decoration: underline;
          color: var(--linkHovered);
      }
    `;
}
