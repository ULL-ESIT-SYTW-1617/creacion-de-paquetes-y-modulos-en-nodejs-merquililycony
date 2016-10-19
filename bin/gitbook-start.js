#!/usr/bin/env node
"use strict"

    const fs = require('fs-extra'); // para poder hacer cp, mkdir rm -r
    const ejs = require('ejs'); // para la utilizacion de las plantillas
    const path = require('path'); // para la publicacion en npm
    const basePath = process.cwd();
    const myargs = require('minimist')(process.argv.slice(2));// para coger a partir del segundo argumento en adelante
    const json = require(path.join(__dirname,'../package.json'));
    const gitconfig = require('git-config');


    var dir; // para modificar el autor
    var autor;// para modificar el autor del libro
    var url_r_; // para modificar la url del repository
    var n_gitbook; // para modificar el nombre del libro
    var url_b_; // para modificar la url de los bugs
    var url_wiki_;

    if( myargs.v || myargs.version){
      console.log("version:"+json.version);
    }

    if(myargs.v || myargs.version)
    {
        console.log("Version:"+json.version);
    }
    // Menu
    if (myargs.h || myargs.help) {
      console.log("Help!");
      console.log("Comando: gitbook-start [opciones]");
      console.log("-d <directorio donde se desplegara gitbook>");
      console.log("--name <nombre del gitbook>");
      console.log("--author <nombre del autor>");
      console.log("--url <url del repositorio>");
      console.log("--version");
//
    } else {
        gitconfig(function(err,config){
          if(err){
            console.error(err);
          }
            autor = myargs.author || "User";
            dir = myargs.d || 'MyBook';
            n_gitbook = myargs.name || "MyBook";

            if(myargs.url){
<<<<<<< HEAD
              url-r = myargs.url;
              url-b = myargs.url.split(".git")[0].concat('/issues');
            }
            else {
              url-r = " ";
              url-b = " ";
=======
              url_r_ = myargs.url;
              url_b_ = myargs.url.split(".git")[0].concat('/issues');
            } else {
              url_r_ = "";
              url_b_ = "";
>>>>>>> d9296d9bc7bdfbe450138ad2170ce019ec85bc1d
            }

          // Construccion de MyBook
            fs.mkdirp(path.join(basePath, dir), function(err){
              if(err){
                console.error(err);
              } else {

                  fs.copy(path.join(__dirname,'../template','gulpfile.js'), path.join(basePath, dir , 'gulpfile.js'));
                  fs.copy(path.join(__dirname,'../template','README.md'), path.join(basePath, dir , 'README.md'));
                  fs.copy(path.join(__dirname, '../template', 'VERSION'), path.join(basePath, dir , 'VERSION'));
                  fs.mkdirp(path.join(basePath, dir , 'scripts'), function (err) {

                    if (err) {
                      console.error(err);
                    }
                });

                fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(basePath, dir ,'scripts'), function(err){
                    if(err){
                      return console.error(err);
                    }
                });

                fs.mkdirp(path.join(basePath, dir, '/txt'), function (err) {
                    if (err){
                      console.error(err);
                    } else {
                      fs.copy(path.join(__dirname, '../template', 'txt' , 'SUMMARY.md'), path.join(basePath, dir , 'txt', 'SUMMARY.md'));

                      fs.copy(path.join(__dirname,'../template', 'txt', 'section1'), path.join(basePath, dir , 'txt', 'section1'), function(err){
                        if(err) {
                          return console.error(err);
                        }

                      });

                      ejs.renderFile(path.join(__dirname, '../template', 'txt', 'README.ejs'), { name_gb: n_gitbook}, function(err,str) {
                        if(err) {
                          console.error(err);
                          throw err;
                    } else {
                        if(str)
                          fs.writeFile(path.join(basePath, dir ,'txt', 'README.md'), str);
                        }
                    });
                  }
                });
              }
            });

            // Fichero package.json
            ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'), { autor_name: autor , name_gitbook: n_gitbook, url_r: url_r_, url_bugs: url_b_,url_wiki_: url_wiki_}, function(err,str){
              if(err){
                  console.error("ERROR:"+err);
                }
              if(str){
                  fs.writeFile(path.join(basePath, dir , 'package.json'), str);
                }
            });
            // Fichero "book.json"
            ejs.renderFile(path.join(__dirname, '../template', 'book.ejs'), { name_gb: n_gitbook}, function(err,str){
                if(err) {
                    console.error("ERROR:"+err);
                }
                if(str)
                    fs.writeFile(path.join(basePath, dir , 'book.json'), str);

            });
        console.log("Construido!");
    });
}
