const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`corriendo en el puerto ${PORT}`)
})

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"empleados_crud"
})

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


app.post('/create', (req,res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const nacionalidad = req.body.nacionalidad;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;
    
    db.query('INSERT INTO empleados(nombre, edad, nacionalidad, cargo, experiencia) values(?,?,?,?,?)',[nombre,edad,nacionalidad,cargo,experiencia],
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Empleado registrado con exito!!");
        }
    }
    );
});

app.get('/empleados', (req, res) => {
    db.query('Select * from empleados',
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const nacionalidad = req.body.nacionalidad;
    const cargo = req.body.cargo;
    const experiencia = req.body.experiencia;

    db.query("UPDATE empleados SET nombre=?, edad=?, nacionalidad=?, cargo=?, experiencia=? where id=?",[nombre, edad, nacionalidad, cargo, experiencia, id],
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send("Empleuado actualizado con exito exitosamente!!!")
            }
        }
    )
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id

    db.query('DELETE from empleados where id=?', [id], 
        (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send("Empleado eliminado exitosamente!!!!")
            }
        })
})

