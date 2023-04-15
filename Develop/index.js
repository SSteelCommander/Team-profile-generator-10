// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./utils/html");

const teamArray = [];

function TeamManager(
  teamManagerName,
  teamManagerID,
  teamManagerEmail,
  teamManagerNumber
) {
  this.teamManagerName = teamManagerName;
  this.teamManagerID = teamManagerID;
  this.teamManagerEmail = teamManagerEmail;
  this.teamManagerNumber = teamManagerNumber;
  this.role = "manager";
}
function TeamEngineer(
  teamEngineerName,
  teamEngineerID,
  teamEngineerEmail,
  teamEngineerUser
) {
  this.teamEngineerName = teamEngineerName;
  this.teamEngineerID = teamEngineerID;
  this.teamEngineerEmail = teamEngineerEmail;
  this.teamEngineerUser = teamEngineerUser;
  this.role = "engineer";
}
function TeamIntern(
  teamInternName,
  teamInternID,
  teamInternEmail,
  teamInternSchool
) {
  this.teamInternName = teamInternName;
  this.teamInternID = teamInternID;
  this.teamInternEmail = teamInternEmail;
  this.teamInternSchool = teamInternSchool;
  this.role = "intern";
}

const getTeamManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "what is your team managers name?",
        name: "teamManagerName",
      },
      {
        type: "input",
        message: "what is your team managers ID?",
        name: "teamManagerID",
      },
      {
        type: "input",
        message: "what is your team managers email?",
        name: "teamManagerEmail",
      },
      {
        type: "input",
        message: "what is your team managers office number?",
        name: "teamManagerNumber",
      },
    ])
    .then((answers) => {
      const {
        teamManagerName,
        teamManagerID,
        teamManagerEmail,
        teamManagerNumber,
      } = answers;
      let teamManager = new TeamManager(
        teamManagerName,
        teamManagerID,
        teamManagerEmail,
        teamManagerNumber
      );
      teamArray.push(teamManager);
      console.log(teamManager);
    });
};
const getNewEmployee = async () => {
  console.log(`
    Add Employees
    `);
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Employee's role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        message: "Employee's name?",
        name: "EmployeeName",
      },
      {
        type: "input",
        message: "Employee's ID?",
        name: "EmployeeID",
      },
      {
        type: "input",
        message: "Employee's email?",
        name: "EmployeeEmail",
      },
      {
        type: "input",
        message: "Employee's username?",
        name: "EmployeeUser",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        message: "Employee's school?",
        name: "EmployeeSchool",
        when: (input) => input.role === "Intern",
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      let {
        EmployeeName,
        EmployeeID,
        EmployeeEmail,
        role,
        EmployeeUser,
        EmployeeSchool,
        confirmAddEmployee,
      } = employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new TeamEngineer(
          EmployeeName,
          EmployeeID,
          EmployeeEmail,
          EmployeeUser
        );

        console.log(employee);
      } else if (role === "Intern") {
        employee = new TeamIntern(
          EmployeeName,
          EmployeeID,
          EmployeeEmail,
          EmployeeSchool
        );

        console.log(employee);
      }

      teamArray.push(employee);

      if (confirmAddEmployee) {
        return getNewEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

// TODO: Create a function to write README file
const writeFile = data => {
  fs.writeFile('./index.html', data, err => {
      if (err) {
          console.log(err);
          return;
      } else {
          console.log("My team generated at index.html")
      }
  })
};


// TODO: Create a function to initialize app
function init() {
  getTeamManager()
    .then(getNewEmployee)
    .then((teamArray) => {
      console.log(teamArray);
      html = generateHTML(teamArray);
      console.log(html);
      return writeFile(html);
    })
    .catch((err) => {
      console.log(err);
    });

}

// Function call to initialize app
init();