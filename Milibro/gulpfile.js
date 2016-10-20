var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs-extra');
// var iaas = require('gitbook-start-iaas-ull-es-josue-nayra');

//------------------------------------------------------------------------------------
// Repositorio Github

gulp.task('push', function(){
    if (!fs.existsSync(path.join(__dirname, '.git'))){
      git()
        .init()
        .add('./*')
        .commit("first commit")
        .addRemote('origin', json.repository.url)
        .push('origin', 'master');
    }
    else
    {
       git()
        .add('./*')
        .commit("Actualizando Gitbook.")
        .push('origin', 'master');   
    }
});

//------------------------------------------------------------------------------------
// Instalar dependencias y recursos

gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'    
    ])) 
});

//------------------------------------------------------------------------------------

// Generate-Gitbook

gulp.task('deploy', function(){
    return gulp.src(path.join(__dirname,'scripts'))
       .pipe(shell(['./scripts/losh generate-gitbook']))
       .pipe(shell(['./scripts/losh generate-wiki']))
       .pipe(shell(['./scripts/losh deploy-gitbook']))
       .pipe(shell(['./scripts/losh deploy-wiki']));
});

// gulp.task('deploy-iaas', function(){
//         var iaas_IP = json.iaas_IP;
//         var path = json.iaas_path;

//         iaas.deploy(iaas_IP, path, json.repository.url);
// });

//------------------------------------------------------------------------------------

gulp.task('default', ['deploy']);