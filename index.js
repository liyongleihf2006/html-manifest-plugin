var path = require("path"); 
var fs = require("fs");

function HtmlManifestPlugin(options) {
    this.options = Object.assign({},{
        filename:"html-manifest.json",
        variable:"html_manifest_json"
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
            var targetTemplates=[];
            if(typeof this.options.templates === "string"){
                targetTemplates.push(this.options.templates);
            }else if(this.options.templates instanceof Array){
                targetTemplates = this.options.templates;
            };
            targetTemplates.forEach((template)=>{
                let filename = this.content[path.basename(template)];
                let insertStr = `<script>var ${this.options.variable} = ${JSON.stringify(this.content)}</script>`;
                fs.readFile(path.join(outputPath,filename), 'utf8', (err,data)=>{
                    if(err)throw err;
                    if(/\<script/.test(data)){
                        data = data.replace(/\<script/,(match,offset)=>{
                            return insertStr+match;
                        });
                    }else if(/\<\/head/.test(data)){
                        data = data.replace(/\<\/head/,(match,offset)=>{
                            return insertStr+match;
                        });
                    }else{
                        data = insertStr+data;
                    }
                    fs.writeFile(path.join(outputPath,filename),data, (err) => {
                        if (err) throw err;
                    });
                });
            });
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