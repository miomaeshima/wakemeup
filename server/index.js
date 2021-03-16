const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

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

app.get("/timer/:day", async (req, res)=>{
    try{
        const {day} = req.params;
        const dayData = await pool.query("SELECT * FROM timer WHERE day = $1", [day]);
        res.json(dayData.rows[0]) 
    }catch(err){
        console.error(err.messagge)
    }
})

app.put("/timer/:day", async(req, res)=>{
    try{
        const {day} = req.params;
        const{sunrise, description} = req.body;
        
        const updatedData = await pool.query(
            "UPDATE timer SET sunrise = $1, description=$2 WHERE day = $3", [sunrise, description, day]
        );
        res.json("Data was updated.");

    }catch(err){
        console.error(err.message);
    }    
});

app.delete("/timer/:day", async(req, res)=>{
    try{
        const {day} = req.params;
        const deletedData = await pool.query(
            "DELETE FROM timer WHERE day = $1", [day]
        );
        res.json("Data was deleted.");

    }catch(err){
        console.error(err.message)
    }
})

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
