const admin = require("firebase-admin")
const creds = require("../credentials.json")

function connectDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    })
  }
  return admin.firestore()
}

exports.userSignup = (req, res) => {
  // check if valid request (email & pw present in request)
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Invalid request: missing email and/or password",
      status: 400,
      success: false,
    })
    return
  }
  // if so, connect to db
  const db = connectDb()
  // insert into db (assigns email as doc id) and return success
  db.collection("users")
    .doc(req.body.email.toLowerCase())
    .set(req.body)
    .then(() => {
      res.send({
        message: "User created successfully",
        status: 200,
        success: true,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err.message,
        status: 500,
        success: false,
      })
    })
}

exports.userLogin = (req, res) => {
  res.send("ok")
}
