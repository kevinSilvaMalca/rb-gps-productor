module.exports = {
  apps: [
    {
      name: "rb-gps-js",
      script: "./app.js",
      instances: 1,
      exec_mode: "fork",
      watch: true,
      log_file: "~/.pm2/logs/rb-gps-js.log",
      out_file: "NULL",
      error_file: "NULL",
      combine_logs: true,
      merge_logs: true,
      env_production: {
        NODE_ENV: "production",
        NODE_PATH:"./"
      },
      env_development: {
        NODE_ENV: "development",
        NODE_PATH:"./"
      }
    }
  ]
};
