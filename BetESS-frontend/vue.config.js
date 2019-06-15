// const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    // baseUrl: IS_PRODUCTION
    // ? 'http://cdn123.com'
    // : '/',
    // For Production, replace set baseUrl to CDN
    // And set the CDN origin to `yourdomain.com/static`
    // Whitenoise will serve once to CDN which will then cache
    // and distribute
    devServer: {
      proxy: {
        '/betess*': {
          // Forward frontend dev server request for /api to django dev server
          //target: 'http://localhost:3001/',
          target: 'http://192.168.33.10:80/',
        }
      }
    }
  }
