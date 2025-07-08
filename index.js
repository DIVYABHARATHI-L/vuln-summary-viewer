import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import pd from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import pool from './db.js';

dotenv.config();

//get files name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//start express server
const app = express();
const PORT = process.env.PORT || 3000;

//use and set server
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

//get for home page
app.get("/", (req,res)=>{
    res.render("home");
});

//get vulnerabilities
app.get("/vulnerabilities", async (req,res)=>{
    try{
        //getting values from request
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // const sortBy = req.query.sortBy || 'published_date';
        const validSortFields = ['published_date', 'severity', 'cve_id'];
        const sortBy = validSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'published_date';
        const sortOrder = req.query.order === 'asc' ? 'ASC' : 'DESC';

        //query
        const query = 
        `SELECT * FROM vulnerabilities
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT $1 OFFSET $2
        `;

        //result
        const result = await pool.query(query, [limit,offset]);

        //result in json
        res.render("vulnerabilities", {
            vulnerabilities: result.rows,
            page,
            sortBy,
            sortOrder
        });
    }
    catch(err){
        console.error("Error fetching vulnerabilities:",err.stack);
        res.status(500).json({error: 'Internal Server Error'});
    }

});


// Filter vulnerabilities by severity levels (e.g., critical, high)
app.get("/vulnerabilities/severity", async (req, res) => {
    try {
      const severity = req.query.severity;
  
      const query = `
        SELECT * FROM vulnerabilities
        WHERE LOWER(severity) = LOWER($1)
        ORDER BY published_date DESC
      `;
  
      const result = await pool.query(query, [severity]);
  
      if (result.rows.length === 0) {
        return res.render("filter", { data: [], message: "No results found." });
      }
  
      res.render("filter", { data: result.rows, message: null });
  
    } catch (err) {
      console.error("Error filtering vulnerabilities:", err.stack);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
   
  

//listen for port
app.listen(PORT, ()=>{
    console.log(`Server running on https://localhost:${PORT}.`);
});