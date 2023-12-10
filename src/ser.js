const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User=require('./model/user')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const connection = require("./db");
connection();
const cors = require('cors');
// Enable CORS for all routes


//DotEnv variable??
const JWT_SECRET="lg^*e;§eok~ze%ZFEFD%%µù*cd:cwxmv!!dfl:!mefn!!"
// mongoose.connect('mongodb://localhost:27017/login-app-db', {
// 	 useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	//useCreateIndex: true
// })

const app=express()
app.use(cors());

app.use('/', express.static(path.join(__dirname,'static')))
app.post('/api/todos',async(req,res)=>{
	// if( !jwt.verify(req.header.token)){
	// 	res.status(403).send({message:"unauthorised!"})
	// }
	// 	const token=jwt.decode(req.header.token)
	// 	const user=User.findOne(token.id)
	// 	if(!user ){
	// 		res.status(403).send({message:"unauthorised!"})
	// 	}
	const {tk,action, title,date,description}=req.body
	if(tk){
	const response = await todo.create({
		tk,action, title,date,description
	})}
	


})

app.use(bodyParser.json())

app.get("/api/todos",(req,res)=>{
	const todo=req.body
	 
	res.send(todo.find({tk:rtk})) //rtk(min loal storge)
})

app.post('/api/login',async(req,res)=>{

	const { username, password } = req.body

	const user = await User.findOne({ username: req.body.username })
	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		//jwt.verify()
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


app.post('/api/register', async(req,res)=>{
	
	console.log(req.body)
	const {email, username, password:plaintp}=req.body


	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' })
	}

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	

	if (!plaintp || typeof plaintp !== 'string') {
		return res.json({ status: 'error', error: 'Invalid pass' })
	}

	if (plaintp.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const  password =await bcrypt.hash(plaintp,10)
	try {
		const response = await User.create({
			email,
			username,
			
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
	res.json ({status  :'ok'})
})

app.listen(4000,function () { console.log('ser up at 4000') })