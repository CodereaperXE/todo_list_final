const userModel = require("../Models/userModel") //model used in database for login and signup

const loginVerification = require("../Controllers/validator") //using for both login and signup verification

//temporary task
let temp_task = {
  TaskId: -1,
  TaskName: "None",
  Description: "None",
  Reminder: "None",
}
//signup handler
let signup = async (req, res) => {
  let signupData = req.body
  try {
    if (!loginVerification.isValidBody(signupData)) {
      return res.status(200).send({ status: false, msg: "No data" })
    }
    let { Name, Email, Password } = signupData //retrieving data from signupData request

    //name validation
    if (!loginVerification.isValid(Name)) {
      return res.status(200).send({ status: false, msg: "Invalid Name" })
    }
    if (!loginVerification.isValidName.test(Name)) {
      return res
        .status(200)
        .send({ status: false, msg: "Please Enter a valid Name" })
    }

    //email validation
    if (!loginVerification.isValid(Email)) {
      return res.status(200).send({ status: false, msg: "Invalid Email" })
    }
    if (!loginVerification.isValidEmail.test(Email)) {
      return res
        .status(200)
        .send({ status: false, msg: "Please Enter a valid Email" })
    }

    //password validation
    if (!loginVerification.isValid(Password)) {
      return res.status(200).send({ status: false, msg: "Invalid Password" })
    }
    if (!loginVerification.isValid(Password)) {
      return res.status(200).send({ status: false, msg: "Invalid Password" })
    }

    //checking if already signed in
    const checkIfSignup = await userModel.findOne(signupData)
    if (checkIfSignup) {
      console.log("Already signed in")
      return res.status(200).send({ status: true, msg: "Already signed in" })
    }
    //if not signed up then signup
    // signupData.Tasks = temp_task
    const registerSignup = await userModel.create(signupData)
    return res
      .status(201)
      .send({ status: true, msg: "Signup Successful", data: registerSignup })
    //catch any errors
  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, msg: "Internal Sever Error" })
  }
}

//login handler
let login = async (req, res) => {
  try {
    let loginData = req.body
    if (!loginVerification.isValid(loginData)) {
      return res.status(200).send({ status: false, msg: "No Data" })
    }
    let { Email, Password } = loginData
    //login verification
    if (!loginVerification.isValid(Email)) {
      return res.status(200).send({ status: false, msg: "Invalid Email" })
    }
    if (!loginVerification.isValidEmail.test(Email)) {
      return res.status(200).send({ status: false, msg: "Enter a valid emial" })
    }
    //password verification
    if (!loginVerification.isValid(Password)) {
      return res.status(200).send({ status: false, msg: "Invalid Password" })
    }

    //checking if not signed up

    let checkIfSignup = await userModel.findOne({ Email, Password })

    if (!checkIfSignup) {
      console.log("Not signed up")
      return res.status(200).send({ status: false, msg: "Not signed up" })
    }

    //wait for userModel to respond using await
    // let registerLogin=await userModel.create(loginData);
    return res
      .status(201)
      .send({ status: true, msg: "Login Successful" /*,data:registerLogin*/ }) //send login successfull
    //catch any errors
  } catch (error) {
    return res.status(500).send({ status: false, msg: "Internal Server Error" })
  }
}

//exporting functions
module.exports = { login, signup }
