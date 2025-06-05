    import {Client} from 'pg';
import express from 'express';

const app = express();

app.use(express.json());


const pgClient = new Client('postgresql://neondb_owner:npg_deSQsH1Lya8V@ep-winter-frost-a82hr8y4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');


async function main(){
     await pgClient.connect();
    const response = await pgClient.query("UPDATE users SET username = 'ajeet123' WHERE id = 4 ;");
    console.log(response);
};

main();


app.post('/signup',  async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const inserQuery = `INSERT INTO users (username, email, password) VALUES ('${username}','${email}', '${password}');`

    const response = await pgClient.query(inserQuery);


        res.status(200).json({
            message: 'User created successfully'
        })
});



app.listen(3000);