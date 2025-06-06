import {Client} from 'pg';
import express from 'express';

const app = express();

app.use(express.json());


const pgClient = new Client('postgresql://neondb_owner:npg_deSQsH1Lya8V@ep-winter-frost-a82hr8y4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');


async function Tmain(){
     await pgClient.connect();
}

Tmain();


app.post('/signup',  async (req, res) => {
try{
    
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const city = req.body.city;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const street = req.body.street;
    

    const insertUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`
    const insertAddress = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);`

     await pgClient.query('BEGIN');
    const response = await pgClient.query(insertUser, [username, email, password]);
    console.log(response.rows);

      await new Promise(x => setTimeout(x, 100 *1000))
    const response2 = await pgClient.query(insertAddress, [city, country, pincode, street, response.rows[0].id]);
     await pgClient.query('COMMIT');
        res.status(200).json({
            message: 'User created successfully'
        })
    }
catch(e){
     res.status(500).json({
        message: 'error in user creation',
        error: e.message
     })
 }
});


app.listen(3000);