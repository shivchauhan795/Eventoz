import express from "express"
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authMiddleware from './auth'

dotenv.config()

const mongourl = process.env.MONGO_URL
const client = new MongoClient(mongourl)
const dbName = 'eventoz'
const app = express()
const port = 3000
client.connect()


// register 
app.post("/register", async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = {
            email: request.body.email,
            password: hashedPassword,
        }

        const alreadyExist = await collection.findOne({ email: request.body.email })

        if (alreadyExist) {
            return response.status(409).send({
                message: "User with this email already exists",
            });
        }

        const result = await collection.insertOne(user);
        response.status(201).send({
            message: "User Created Successfully",
            result,
        });


    } catch (error) {
        response.status(500).send({
            message: "Error creating user",
            error,
        });
    }
});

//login
app.post("/login", async (request, response) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ email: request.body.email });
        if (!user) {
            return response.status(404).send({
                message: "Email not found",
            });
        }
        const match = await bcrypt.compare(request.body.password, user.password);

        if (!match) {
            return response.status(401).send({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );
        response.status(200).send({
            message: "Login successful",
            user: {
                email: user.email,
                token,
            }
        });

    } catch (error) {
        response.status(404).send({
            message: "Email not found",
            error,
        });
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint",authMiddleware, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });