// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
    stylesDir: path.join(__dirname, './src'),
    antDir: path.join(__dirname, './node_modules/antd'),
    themeVariables: [],
    generateOnce: false, // generate color.less on each compilation
    //varFile: path.join(__dirname, './src/styles/variables.less'),
};

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackPlugin(new AntDesignThemePlugin(options)),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
        },
    }),
);
