# html-manifest-plugin

When using html-webpack-plugin, generate a JSON file that corresponds to the key value pair of the template file and the target file

**Install**

```
npm install --save-dev html-manifest-plugin
```  

**Usage**

webpack.config.js

```js
const HtmlManifestPlugin = require("html-manifest-plugin");

module.exports = {
  ...
  ,plugins: [
    ...
        new HtmlManifestPlugin()
    ...
  ]
}
```  
Emits `html-manifest.json` as file in the output directory


**Options**

|name|type|default|description  
|:--:|:--:|:-----:|:----------| 
|path|string|undefined|File path|
|filename|string|html-manifest.json|File name|
|templates|string or array|undefined|The generated JSON will inject the template files (the template file is the template in the html-webpack-plugin)|
|variable|string|html_manifest_json|JSON variable name injected into the template files|


