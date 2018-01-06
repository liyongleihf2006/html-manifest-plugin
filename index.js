var path = require("path"); 
var fs = require("fs");

function HtmlManifestPlugin(options) {
    this.options = Object.assign({},{
        filename:"html-manifest.json"
    },options);
    this.content={};
}
 
HtmlManifestPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation',(compilation) =>{
            compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback)=> {
                var outputName = htmlPluginData.outputName;
                var templateName=path.basename(htmlPluginData.plugin.options.template);
                this.content[templateName]=outputName;
                callback(null, htmlPluginData);
            });
    });
    compiler.plugin("done",()=>{
            var outputPath = path.isAbsolute(this.options.path||"")?
                this.options.path:
                path.join(compiler.options.output.path,this.options.path||"");
            if(!fs.existsSync(outputPath)){
                fs.mkdir(outputPath,(err)=>{
                    if(err)throw err;
                    fs.writeFile(path.join(outputPath,this.options.filename),JSON.stringify(this.content), (err) => {
                        if (err) throw err;
                    });
                })
            }else{
                fs.writeFile(path.join(outputPath,this.options.filename),JSON.stringify(this.content), (err) => {
                    if (err) throw err;
                });
            }
    })
 
};
 
module.exports = HtmlManifestPlugin;