const path = require('path');
const { useBabelRc, override, addWebpackAlias } = require('customize-cra')

module.exports = {
  webpack: override(
    useBabelRc(),
    addWebpackAlias({
      ['react-redux']: process.env.NODE_ENV === 'development' ? 'react-redux/lib' : 'react-redux'
    })
  ),
  paths: function(paths, env) {
    const appPath = path.resolve(__dirname, 'app');
    const publicPath = path.resolve(__dirname, appPath, 'public');
    const appSrc = path.resolve(__dirname, appPath, 'src');

    paths.appPath = appPath;
    paths.appBuild = path.resolve(__dirname, appPath, 'build');
    paths.appPublic = publicPath;
    paths.appSrc = appSrc;
    paths.appHtml = path.resolve(__dirname, publicPath, 'index.html');

    paths.appIndexJs =  path.resolve(__dirname, appSrc, 'index.tsx');
    paths.appTsConfig = path.resolve(__dirname, appPath, 'tsconfig.json');

    paths.appTypeDeclarations = path.resolve(__dirname, appSrc, 'react-app-env.d.ts');
    paths.testsSetup = path.resolve(__dirname, appSrc, 'setupTests.ts');

    return paths;
  }
};
