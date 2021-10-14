const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const db = require('./app/models/queries');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res)=>{
    res.json(
        {
            message: "Welcome to API FarmLet-Server"
        }
    )
});

app.get('/medicines', db.getAllListaMedicamentos);
app.get('/medicines/:id', db.getMedicamentosbyId);
app.post('/medicines-create', db.insertMedicamento);
//no se actualiza en la base de datos
app.put('/medicines-update/:id', db.updateListMedicamento);
//revisar el end-point update

app.delete('/medicines-delete/:id', db.deleteMedicamento);


const PORT = process.env.PORT || 2035;
app.listen(PORT, ()=>{
   console.log(`Server is running on PORT ${PORT}`);
});





