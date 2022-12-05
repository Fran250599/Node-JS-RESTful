const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const User=require("./config")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// If you put this endpoint year and month will be parameters that
// will be showed in the browser
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

// For this one, we will implement an array of courses
// with a GET request, logic and error status codes
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    // 404
    res.status(404).send("Code with given id was not found");

  res.send(course);
});

// In the next lines, we will implement a POST request
// This helps us to add new information to the back end

// WITHOUT JOI VALIDATION

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    //404 bad request
    res.status(404).send("Invalid input");

  } else {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
  }
});

//POST REQUEST WITH JOI VALIDATION
app.post("/api/courses/joi", (req, res) => {

  const { error } = validation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//PUT REQUEST WITH JOI VALIDATION
app.put("/api/courses/:id", (req, res) => {

  // Look up the course
  // If not existing, return 404
  
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    // 404
    res.status(404).send("Code with given id was not found");

    const { error } = validation(req.body);

if (error) {
  res.status(400).send(error.details[0].message);
  return;
}
  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
  
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    // 404
    res.status(404).send("Code with given id was not found");
    
  const index = courses.indexOf(course);  
  courses.splice(index,1);

  res.send(course);

});

function validation(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}


// PORT -> Environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
