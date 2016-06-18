/// <reference path="./../index.ts" />
"use strict";
const es = require("./../index");
const EmpContext_1 = require("./modal/EmpContext");
var config = new es.ConnectionConfig();
config.handler = "mysql";
config.hostname = "localhost";
config.name = "mysql";
config.username = "root";
config.password = "Application~";
config.database = "test";
var context = new EmpContext_1.default(config, __dirname + "/mappings");
let q = 4;
let p = context.employees.get(1);
p.then((v) => {
    console.log("id: " + v.id.val + ", name: " + v.name.val + ", desc: " + v.description.val);
    v.description.val = "test update 2";
    return context.employees.update(v);
}).then((v) => {
    console.log("id: " + v.id.val + ", name: " + v.name.val + ", desc: " + v.description.val);
    console.log("updated");
    let a = context.employees.getEntity();
    a.name.val = "name 2";
    a.description.val = "desc insert 2";
    return context.employees.insert(a);
}).then((v) => {
    console.log("inserted");
    console.log("id: " + v.id.val + ", name: " + v.name.val + ", desc: " + v.description.val);
    context.employees.delete(v);
}).then(() => {
    console.log("deleted");
}).then(() => {
    return context.employees.where((a) => {
        return a.name.IsNull();
        // return (a.id.lt(q)).or(a.id.eq(2));
    }).list();
}).then((v) => {
    for (var i = 0; i < v.length; i++) {
        var j = v[i];
        console.log("id: " + j.id.val + ", name: " + j.name.val + ", desc: " + j.description.val);
    }
});