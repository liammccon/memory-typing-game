module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/memory-typing-game/'
  : '/',

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}