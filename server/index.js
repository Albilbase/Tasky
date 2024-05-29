import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
const port =3001

app.use(express.json())

//  Cross-Origin Resource Sharing =? to access other domain
app.use(cors())

app.get("/",(req,res)=>{
  res.json("API Runing Sucssfuly")
})

// Start { Read } From Database table => (task)

app.get("/task",(req,res)=>{
  const q = "SELECT * FROM task"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// End { Read } From Database table => (task)

// **********************

// Start { Update } to Database table => (task)

app.put("/task/:id",(req,res)=>{
  const taskId = req.params.id;
  const q = "UPDATE task SET `title` = ?,`description` = ?,`time` = ?,`date` = ? WHERE id = ?"
  const values = [
    req.body.title,
    req.body.description,
    req.body.time,
    req.body.date,
  ]

  db.query(q,[...values,taskId],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Update Data Succesfuly")
  })
})

// End { Update } to Database table => (task)

// **********************

// Start { Update/done } to Database table => (task)

app.put("/task/done/:id",(req,res)=>{
  const taskId = req.params.id;
  const q = "UPDATE task SET `isDone` = ? WHERE id = ?"
  const values = [
    req.body.isDone
  ]
  db.query(q,[...values,taskId],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Update Data Succesfuly")
  })
})

// End { Update/done } to Database table => (task)
// **********************
// Start { Create } to Database table => (task)

app.post("/task",(req,res)=>{
  const q = "INSERT INTO task (`title`,`description`,`time`,`date`,`isDone`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.description,
    req.body.time,
    req.body.date,
    req.body.isDone
  ]
  db.query(q,[values],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Add Task Succesfuly")
  })
})

// End { Create } to Database table => (task)


// **********************

// Start { Delete } From Database table => (task)

app.delete("/task/:id",(req,res)=>{
  const taskId = req.params.id;
  const q = "DELETE FROM task WHERE id =?"
  db.query(q,[taskId],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Deleted Succesfuly")
  })
})

// End { Delete } From Database table => (task)


// ----------------------------------------------


// Start { Read } From Database table => (notification)

app.get("/notifications",(req,res)=>{
  const q = "SELECT * FROM notifications"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// Start { Read } From Database table => (notification)

// Start { Delete } From Database table => (notification)

app.delete("/notifications/:id",(req,res)=>{
  const notificationId = req.params.id;
  const q = "DELETE FROM notifications WHERE id =?"
  db.query(q,[notificationId],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Deleted Succesfuly")
  })
})

// End { Delete } From Database table => (notification)

// Start { Create } to Database table => (notification)

app.post("/notifications",(req,res)=>{
  const q = "INSERT INTO notifications (`message` ,`title`) VALUES (?)"
  const values = [
    req.body.message,
    req.body.title
  ]
  db.query(q,[values],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Post Message Succesfuly")
  })
})

// End { Create } to Database table => (notification)


// ----------------------------------------------

// Start { Create } to Database table => (users)

app.post("/user",(req,res)=>{
  const q = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
  ]
  db.query(q,[values],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Add User Succesfuly")
  })
})

// End { Create } to Database table => (users)

// Start { Read } From Database table => (users)

app.get("/user",(req,res)=>{
  const q = "SELECT * FROM users"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// Start { Read } From Database table => (users)

app.listen(port,()=>{
  console.log(`server is run on port ${port}`)
})