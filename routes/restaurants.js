const express = require("express");
const router = express.Router();
const Project = require("../models/Restaurant");

// POST /api/restaurants
// create a new `restaurant` resource
router.post("/", (req, res) => {

  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;
  const owner = req.user._id;
  // console.log("Weekdays from server", weekdays);
  Project.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
    weekdays: weekdays,
    tablenumber: tablenumber,
    tables: tables,
    openingtimes: openingtimes,
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

// // GET /api/projects/:id
// // return a specific `project` resource with a given id
// router.get("/:id", (req, res) => {
//   // check if req.params.id is valid, if not respond with a 4xx status code
//   Project.findById(req.params.id)
//     .populate("tasks")
//     .then(project => {
//       if (!project) {
//         res.status(404).json(project);
//       } else {
//         res.json(project);
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
