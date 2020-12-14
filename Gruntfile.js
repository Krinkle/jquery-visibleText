/* eslint-env node */
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.initConfig({
    qunit: {
      options: {
        puppeteer: { args: ['--no-sandbox'] }
      },
      all: 'test/index.html'
    }
  });

  grunt.registerTask('test', ['qunit']);
};
