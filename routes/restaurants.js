const express = require("express");
const router = express.Router();
const {Restaurant, timeslots} = require("../models/Restaurant")


router.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;

  // map the timeslots array with the openingtimes in combined
  /* console.log(timeslots) */
  let combined = 
  timeslots.map(timeSlotObj =>{
    let businessTime = openingtimes[timeSlotObj.day]
    if(businessTime.opentime){
      
      for (let key in timeSlotObj.timeslots){
        let timeNum = Number(key)
        let openingTime =businessTime.opentime
        let closingTime =businessTime.closetime
        
        if(timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true
        
      }
      return timeSlotObj
     }else return timeSlotObj 

  })



  const owner = req.user._id;
  // console.log("Weekdays from server", weekdays);
  Restaurant.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
    weekdays: weekdays,
    tablenumber: tablenumber,
    tables: tables,
    openingtime: openingtimes,
    timeslots: combined,
    owner: owner
  })
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET /api/projects
// returns a list of all projects
// router.get("/", (req, res) => {
//   Project.find()
//     .populate("tasks")
//     .then(projects => {
//       res.json(projects);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// GET /api/projects/:id
// return a specific `restaurant` resource with a given id
// router.get("/:id", (req, res) => {
//   // check if req.params.id is valid, if not respond with a 4xx status code
//   Restaurant.findById(req.params.id)
//     // .populate("tasks")
//     .then(restaurant => {
//       if (!restaurant) {
//         res.status(404).json(restaurant);
//       } else {
//         res.json(restaurant);
//       }
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // PUT /api/projects/:id
// router.put("/:id", (req, res) => {
//   const { title, description } = req.body;

//   Project.findByIdAndUpdate(
//     req.params.id,
//     { title, description },
//     // { new: true } ensures that we are getting the updated document in the .then callback
//     { new: true }
//   )
//     .then(project => {
//       res.json(project);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // DELETE /api/projects/:id
// router.delete("/:id", (req, res) => {
//   // delete the project
//   Project.findByIdAndDelete(req.params.id)
//     .then(project => {
//       // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `project.tasks` array
//       return Task.deleteMany({ _id: { $in: project.tasks } }).then(() => {
//         res.json({ message: "ok" });
//       });
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

module.exports = router;
