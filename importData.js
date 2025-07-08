import fs from 'fs/promises';
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import pool from './db.js';

dotenv.config();


//function to import vulnerabilities
async function importVulnerabilities(){
    try{
        //read file as utf8 text
        const data = await fs.readFile('./vulnerabilities.json','utf-8');
        //parse json string to js array object
        const vulnerabilities = JSON.parse(data);

        //to insert data into database
        for(const vuln of vulnerabilities){
            const query = 
            `INSERT INTO vulnerabilities 
            (cve_id, severity, published_date, description, affected_products, patch_available, vendor)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT(cve_id) DO NOTHING
            `;

            //values of array to pass in the query
            const values = [
                vuln.cve_id,
                vuln.severity,
                vuln.published_date,
                vuln.description,
                vuln.affected_products,
                vuln.patch_available,
                vuln.vendor
            ];

            //execute query
            await pool.query(query, values);
            //log message
            console.log(`inserted ${vuln.cve_id}`);
        }

    }
    catch (err){
        console.log("Error in importing data: ", err);
    }
    finally{
        await pool.end();
    }
}

//call the function
importVulnerabilities();