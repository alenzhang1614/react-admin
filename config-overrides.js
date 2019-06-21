const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {//按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({//自定义配置
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
);