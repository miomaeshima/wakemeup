const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")))
}


app.get("/timer", async(req, res)=>{
    try{
    const allEntries = await pool.query("SELECT * FROM timer");
    res.json(allEntries.rows)
    
    } catch (err){
        console.error(err.message);
    }
});

app.post("/timer", async (req, res) => {
  try {
    const { day, sunrise, description } = req.body;
    const newEntry = await pool.query(
      'INSERT INTO timer (day, sunrise, description) VALUES ($1, $2, $3) RETURNING *',
      [day, sunrise, description]
    );
    res.json(newEntry.rows[0]);
  } catch (err) {
    console.error(err.message);
 }
});

// app.get("/timer/:day", async (req, res)=>{
//     try{
//         const {day} = req.params;
//         const dayData = await pool.query("SELECT * FROM timer WHERE day = $1", [day]);
//         res.json(dayData.rows[0]) 
//     }catch(err){
//         console.error(err.messagge)
//     }
// })

app.put("/timer/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const{day, sunrise, description} = req.body;
        
        const updatedData = await pool.query(
            "UPDATE timer SET day=$1, sunrise = $2, description=$3 WHERE id = $4", [day, sunrise, description, id]
        );
        res.json("Data was updated.");

    }catch(err){
        console.error(err.message);
    }    
});

app.delete("/timer/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const deletedData = await pool.query(
            "DELETE FROM timer WHERE id = $1", [id]
        );
        res.json("Data was deleted.");

    }catch(err){
        console.error(err.message)
    }
})

//catch all method
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
