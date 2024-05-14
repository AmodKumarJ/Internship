const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config({path:'./config.env'})



const url = process.env.ATLAS_STR


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB......');
  });
        
const app = express()

app.use(express.json())
app.use(cors())

const adminRouter = require('./router/admin')
app.use('/admin',adminRouter)

const userRouter = require('./router/register')
app.use('/user',userRouter)
const signinRouter = require('./router/signin')    
app.use('/user',signinRouter)
const CandidateRoute = require('./router/ballotCreationForm')
app.use('/',CandidateRoute)
const ballotCreationFormRouter = require('./router/ballotCreationForm');
app.use('/admin', ballotCreationFormRouter);
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('server connected')
} )

