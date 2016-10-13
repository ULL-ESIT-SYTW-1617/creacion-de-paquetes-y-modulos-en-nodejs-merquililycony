#!/usr/bin/env node
"use strict"

    const fs = require('fs-extra'); // para poder hacer cp, mkdir rm -r
    const ejs = require('ejs'); // para la utilizacion de las plantillas
    const path = require('path'); // para la publicacion en npm
    const myargs = require('minimist')(process.argv.slice(2));// para coger a partir del segundo argumento en adelante


    var dir; // para modificar el directorio
    var autor_name;// para modificar el autor del libro
    var url_r; // para modificar la url del repository
    var name_gb; // para modificar el nombre del libro
    var url_b; // para modificar la url de los bugs

    // Menu
    if(myargs.h || myargs.help){
      console.log("Help!");
      console.log("Comando: gitbook-start [opciones]");
      console.log("--name <nombre del gitbook>");
      console.log("--author <nombre del autor>");
      console.log("--url <url del repo>");
      console.log("--urlb <url del bug>");
    }
