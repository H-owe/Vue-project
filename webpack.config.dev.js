
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/main.js',
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    { loader: 'vue-loader'}
                ]  
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html',//参照文件
            filename:'index.html' //生成的index.html
        })
    ]

    
}