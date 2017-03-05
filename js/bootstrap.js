requirejs.config({
  baseUrl: 'js',
  paths: {
    'p5': 'lib/p5'
  }
});

require(['app/main']);
