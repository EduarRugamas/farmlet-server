const credenciales =  require('../databases/db.config.host');
const Pool = require('pg').Pool;


const pool = new Pool({
    user: credenciales.USER,
    host: credenciales.HOST,
    database: credenciales.DB,
    password: credenciales.PASSWORD,
    port: 5432
});

//obtener medicamentos todas
const getAllListaMedicamentos = (req, res) => {
    pool.query('SELECT * FROM listmedicamentos', (err, result) => {
        if (err){
            console.log(`Error al realizar la consulta ${err}`);
            res.json({
                Error: err
            })
            throw err;
        }else {
            res.status(200).json(result.rows)
        }
    });
};

//obtener promociones todas
const getAllListaPromociones = (req, res) => {
    pool.query('SELECT * FROM listpromociones', (err, result) => {
        if (err){
            console.log(`Error al realizar la consulta ${err}`);
            res.json({
                Error: err
            })
            throw err;
        }else {
            res.status(200).json(result.rows)
        }
    });
};

//obtener medicamento por id
const getMedicamentosbyId = (req, res) => {
    const id_medicamento = parseInt(req.params.id)
    pool.query('SELECT * FROM listmedicamentos WHERE id_medicamento = $1', [id_medicamento], (error, result) => {
        if (error){
            console.log(`Error al realizar la consulta ${error}`);
            res.json({
                Error: error
            })
            throw error;
        }else {
            console.log(result)
            res.status(200).send(result.rows)
        }
    });
};

//insert a base de datos
const insertMedicamento = (req, res) => {
    const {id_medicamento, nombre, descripcion, precio, imagen} = req.body;
    pool.query('INSERT INTO listmedicamentos (id_medicamento, nombre, descripcion, precio, imagen) VALUES ($1, $2, $3, $4, $5)', [id_medicamento, nombre, descripcion, precio, imagen], (err, result) => {
        if (err){
            console.log(`Error al realizar la consulta ${err}`);
            res.json({
                Error: err
            })
            throw err;
        }else {
            res.status(201).send(`Dato agregado correctamente with ID ${id_medicamento}`)
        }
    });
};

const updateListMedicamento = (req, res) => {
    const {id_medicamento, nombre, descripcion, precio, imagen} = req.body;

    pool.query(
        'UPDATE listmedicamentos SET nombre=$2, descripcion=$3, precio=$4, imagen=$5 WHERE id_medicamento=$1',
        [id_medicamento, nombre, descripcion, precio, imagen],
        (error, results) => {
            if (error) {
                console.log(`Error al realizar la consulta ${error}`);
                res.json({
                    Error: error
                })
                throw error
            }else {
                res.status(200).send(`medicamento modified with ID: ${id_medicamento}`)
                console.log(`data ${results.rows}`)
            }

        });
};

const deleteMedicamento = (req, res) => {
    const id_medicamento = parseInt(req.params.id)

    pool.query('DELETE FROM listmedicamentos WHERE id_medicamento = $1', [id_medicamento], (error, results) => {
        if (error) {
            console.log(`Error al realizar la consulta ${error}`);
            res.json({
                Error: error
            })
            throw error
        }
        res.status(200).send(`Medicamento deleted with ID: ${id_medicamento}`)
    })
}

module.exports = {
    getAllListaMedicamentos,
    getAllListaPromociones,
    getMedicamentosbyId,
    insertMedicamento,
    updateListMedicamento,
    deleteMedicamento
};

