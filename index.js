'use strict';

var express = require('express');
var router = express.Router();
router.use(express.json());

var tareas = []

// escriban sus rutas acá 
// siéntanse libres de dividir entre archivos si lo necesxitan
router.get('/users', (req, res) => {
    res.status(200).send(tareas) // con send, el status es 200
})

router.post('/users', (req, res) => {
    if(req.body.person && typeof req.body.person === 'string' ){
        tareas.push(req.body.person);
        res.status(201).send({encargado: req.body.person})
    } else if(req.query.person){
        tareas.push(req.query.person);
        res.status(201).send({encargado: req.query.person})
    } else {
        res.sendStatus(401)
    };
})

router.put('/users', (req, res) => {
    const { person, lastName } = req.body;
    let fullName;

    if(person && lastName) {
        tareas.forEach((p, index)=> {
            if(p === person) {
                tareas[index] = `${person} ${lastName}`
                fullName = tareas[index]
            }
        })
        return res.status(201).send({fullName: fullName})
    } else if(person){
        const { lastName } = req.query
        
        tareas.forEach((p, index) => {
            if(p === person) {
                tareas[index] = `${person} ${lastName}`
                fullName = tareas[index]
            }
        })
        return res.status(201).send({fullName: fullName})
    } else {
        res.sendStatus(404)
    }
});

router.delete('/users', (req, res) => {
    const { person } = req.body;
    let found;

    if(person) {
        tareas.forEach((p, i) => {
            if(p.includes(person)) { //Si llega a incluir a la persona, la saco
                tareas.splice(i, 1); // Desde donde estoy parado > incluye a ese string > lo saco. (primer argumento (DONDE ESTOY PARADO) segundo argumento(CUANTOS ELEMENTOS SACO,incluyendo DONDE ESTOY PARADO))
                found = true;
            } 
        })
        if(found) return res.sendStatus(200)
    }
    else {
        const { person } = req.query;

        tareas.forEach((p, i) => {
            if(p.includes(person)) { //Si llega a incluir a la persona, la saco
                tareas.splice(i, 1); // Desde donde estoy parado > incluye a ese string > lo saco. (primer argumento (DONDE ESTOY PARADO) segundo argumento(CUANTOS ELEMENTOS SACO,incluyendo DONDE ESTOY PARADO))
                found = true;
            } 
        });

        if(found) return res.sendStatus(200);
        else return res.sendStatus(404);
    };
});



module.exports = {
    router, 
    tareas
};