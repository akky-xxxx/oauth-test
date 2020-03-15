module.exports = {
  distDir: "../dist",
  webpack: (config, props) => {
    config.mode = props.dev ? "development" : "production"

    return config
  },
}
