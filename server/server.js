const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
// const { Schema } = require("mongoose");

let date_ob = new Date()

// Get only 5 user http://localhost:5000/user/show?p=2 


// Get all user data  http://localhost:5000/user/data_all

// Get all user email http://localhost:5000/user/all_email

// post add user http://localhost:5000/user/add

// find One user post http://localhost:5000/user

// delete user delete http://localhost:5000/user/delete


// Groups 

// Add new group post http://localhost:5000/group/new

// Get add group name get http://localhost:5000/group/name

// get full data get http://localhost:5000/group/Full_info

// get specific group info post http://localhost:5000/group/specific

// Add participate into group http://localhost:5000/group/enter and  http://localhost:5000/user/group/enter  // with same body{email , groupName}

// Remove participate into group http://localhost:5000/group/remove && http://localhost:5000//user/group/remove     // with same body{email , groupName}



// Chat

// Add chat in group http://localhost:5000/group/chat   formate :- {groupName , message , from }




const app = express();

app.use(cors());


app.use(express.json());

const http = require("http").Server(app);

let db;

connectToDb((err) => {
    if (!err) {
        http.listen(5000, () => {
            console.log("started on 5000 !!!");
        });
        db = getDb();
    } else {
        console.log(err);
    }
});

app.get('/', (req, res) => {
    res.status(200).send("Server started !!!!!!!")
})

app.get('/user/show', (req, res) => {

    const page = req.query.p || 0

    const datapage = 5

    let data = []

    db.collection('users')
        .find()
        .skip(page * datapage)
        .limit(datapage)
        .forEach(a => data.push(a))
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("I do't Know")
        })

})

app.get('/user/data_all', (req, res) => {

    let data = []

    db.collection('users')
        .find()
        .forEach(a => data.push(a))
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("I do't Know")
        })

})

app.get('/user/all_email', (req, res) => {
    let data = []

    db.collection('users')
        .find()
        .forEach(a => data.push(a.email))
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

app.post('/user/add', (req, res) => {
    let data = req.body

    db.collection('users')
        .findOne({ email: data["email"] })
        .then(doc => {
            if (doc != null) {
                res.status(400).json({ "status": "Already exist" })
            }
            else {
                db.collection('users')
                    .insertOne(data)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(404).json(err)
                    })
            }
        })


})


app.post('/user', (req, res) => {

    db.collection('users')
        .findOne(req.body)
        .then(a => {
            res.status(200).json(a)
        })
        .catch(err => {
            res.status(404).json(err)
        })

})


app.delete('/user/delete', (req, res) => {


    db.collection('users')
        .findOne(req.body)
        .then(a => {
            if (a == null) {
                res.status(400).json({ "status": "Not Found" })
            }
            else {
                db.collection('users')
                    .deleteOne(req.body)
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(404).json(err)
                    })
            }
        })
})

app.post('/user/group/enter', (req, res) => {

    db.collection('users')
        .findOneAndUpdate({ email: req.body.email }, {
            $addToSet: {
                groups: req.body.groupName
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

app.post('/user/group/remove', (req, res) => {
    db.collection('users')
        .findOneAndUpdate({ email: req.body.email }, {
            $pull: {
                groups: req.body.groupName
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send("I do't Know");
        });
});


// Groups

app.post("/group/enter", (req, res) => {
    db.collection("users")
        .findOneAndUpdate(
            { email: req.body.email },
            {
                $push: {
                    groups: req.body.groupName,
                },
            }
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.get('/group/enter_all', (req, res) => {
    let emails = req.body.emails

    db.collection('groups')
        .findOneAndUpdate({ name: req.body.groupName }, {
            $addToSet: {
                participate: emails.forEach
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })

})

app.get("/group/name", (req, res) => {
    let data = [];
    db.collection("groups")
        .find({}, { name: 1 })
        .forEach((a) => data.push(a.name))
        .then(() => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.get("/group/Full_info", (req, res) => {
    let data = [];
    db.collection("groups")
        .find({}, { name: 1 })
        .forEach((a) => data.push(a))
        .then(() => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.post("/group/new", (req, res) => {
    db.collection("groups")
        .insertOne({
            name: req.body.groupName,
            participate: [],
            chat: [],
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.post("/group/specific", (req, res) => {
    db.collection("groups")
        .findOne(req.body)
        .then((a) => {
            res.status(200).json(a);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

app.post('/group/remove', (req, res) => {

    db.collection('groups')
        .findOneAndUpdate({ name: req.body.groupName }, {
            $pull: {
                participate: req.body.email
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })

})

// socket connection

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  //creating a room
  socket.on("join-room", (groupName) => {
    console.log(groupName)
    socket.join(groupName);
    console.log(socket.adapter.rooms.get(groupName).size)
  });

  socket.on("leave-room", (groupName) => {
    socket.leave(groupName);
    console.log(groupName)
  });


  socket.on("send-message", (data) => {
    console.log(data)
    io.to(`#${data.groupName}`).emit("recieve-message", data)
  })

});


// Chat

app.post("/group/chat", (req, res) => {

    db.collection('groups')
        .findOneAndUpdate({ name: req.body.groupName }, {
            $addToSet: {
                chat: {
                    message: req.body.message,
                    from: req.body.from,
                    created_time: date_ob.toISOString()
                }
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })

})

