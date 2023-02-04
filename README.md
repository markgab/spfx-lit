# spfx-lit

## Summary

This is my first attempt to replace React with Lit Web Components in SharePoint Framework. 

It occured to me that Microsoft FAST could be a better fit for this, but when I compared the two, Lit was simply more mature and better documented. I may yet get into FAST when the time is right. 

## What was Changed in SPFx
Over all changes were minimal, far less than what it takes to get VUE to work with SharePoint Framework. This is what I did to get it to working.

### Changes to tsconfig.json 
The compiling target was changed to es2015. Also, the typescript-lit-html-plugin was installed to improve intellisense. Add es6 and es2015 to lib.

```JSON
{  
  "compilerOptions": {
    "target": "es2015",
    ...,
  },
  "plugins": [
    {
      "name": "typescript-lit-html-plugin"
    }
  ],
  "lib": [
    "es2015",
    "es6",
    ...,
  ],
}
```

### Install Lit
```CMD
npm install --save lit
npm install --save-dev typescript-lit-html-plugin
```

### Modify Web Part Render Method

```TypeScript
  public render = () => litRender(html`
        <lit-app 
          description=${this.properties.description}
          .isDarkTheme=${this._isDarkTheme}
          environmentMessage=${this._environmentMessage}
          .hasTeamsContext=${!!this.context.sdks.microsoftTeams}
          userDisplayName=${this.context.pageContext.user.displayName}
        ></lit-app>
      `, 
      this.domElement
  );
```

## Known Issues

### SCSS Modules

SCSS modules work as they would in any web part, SPFx loads the styles at the top of the page. However, for better or worse, Lit components are protected from external styles by the shadow DOM. Lit **does** provide a loader to inject SCSS into the components, but I was unable to get this to work with SPFx using [Microsofts recommended method](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/extending-webpack-in-build-pipeline). If someone figures it out, please let me know!

So SCSS modules are not functioning well. However this is not a huge loss, fortunately with the shadow DOM, SCSS module class name hashing is rendered obsolete since all web component styles are encapsulated away from the rest of the DOM. 

It is worth noting that a SCSS file can still be useful to translate Fabric UI theme variables into CSS variables that could still affect the styles in the shadow DOM like this.
```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss';

:root {
  --teams-font-family: #{$ms-font-family-fallbacks};
}
```

### Lit HTML Template Intellisense
Lit template component intellisense does function. However it does not work natively in VS Code. These extensions are recommended.

* [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html#:~:text=Works%2520with%2520literal%2520html%2520strings%2520that%2520contain%2520placeholders.,you%2520use%2520VS%2520Code%2527s%2520built-in%2520version%2520of%2520TypeScript.)
* [lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)

Combined with the [typescript-lit-html-plugin](https://www.npmjs.com/package/typescript-lit-html-plugin) that is registered in the tsconfig.json file, the intellisense can be quite good. 

If you are still experiencing issues, run the select typescript version in the VS Code command palette.

```cmd
> Select TypeScript version
```
