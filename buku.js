const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
// end-point akses data siswa
app.get("/buku", (req, res) => {
    // create sql query
    let sql = "select * from siswa"//untuk menjembatani ke database

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/buku/:id", (req, res) => {
    let data = {
        id_buku: req.params.id
    }
    // create sql query
    let sql = "select * from buku where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
// end-point menyimpan data siswa
app.post("/buku", (req,res) => {

    // prepare data
    let data = {
        judul_buku: req.body.judul_buku,
        jumlah_halaman: req.body.jumlah_halaman,
        dekripsi: req.body.dekripsi,
        kondisi_buku: req.body.kondisi_buku
    }

    // create sql query insert
    let sql = "insert into buku set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})
// end-point mengubah data siswa
app.put("/buku/:id_buku", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            judul_buku: req.body.judul_buku,
            jumlah_halaman: req.body.jumlah_halaman,
            dekripsi: req.body.dekripsi,
            kondisi_buku: req.body.kondisi_buku
        },

        // parameter (primary key)
        {
            id_buku: req.params.id_buku
        }
    ]

    // create sql query update
    let sql = "update buku set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})
// end-point menghapus data siswa berdasarkan id_siswa
app.delete("/buku/:id", (req,res) => {
    // prepare data
    let data = {
        id_buku: req.params.id
    }

    // create query sql delete
    let sql = "delete from buku where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})
app.listen(8000, () => {
    console.log("Run on port 8000")
})