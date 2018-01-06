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
Emits ```
html-manifest.json
```  as file in the output directory


**Options**

name | type | default | description  
------- | ------- | -------  
path | string | undefined | File path 
filename | string | html-manifest.json | File name  

