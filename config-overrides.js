module.exports = function override(config, env) {
    if (env === 'development') {
      config.devServer = {
        ...config.devServer,
        setupMiddlewares: (middlewares, devServer) => {
          // Custom middleware logic here
          console.log('Setting up middlewares');
  
          // Example middleware logic (if you had any custom logic before)
          // devServer.app.use((req, res, next) => {
          //   console.log('Custom middleware');
          //   next();
          // });
  
          return middlewares;
        },
      };
    }
    return config;
  };
  