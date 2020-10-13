const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// This array fills in with employee data

const employees = [];

let teamTitle;


// function to prompt input for Project Title and team information - it will loop until user replies n to prompt to add more employees 
// if then will call the function to render the HTML and write to team page

function getData(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is this Project's name?",
            name: "teamTitle",
        }])
        .then( answers => { teamTitle = answers.teamTitle;

            EmployeeInfo()
            console.log(teamTitle);
            // console.log(teamMembers);
             })


        }


function EmployeeInfo() {
    inquirer.prompt([

        {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer", "Manager"]
        },

        // Inputs based on the employeeRole above

        {
            type: "input",
            message: "What is the Manager's name?",
            name: "employeeName",
            when: (userInput) => userInput.employeeRole === "Manager"
        },
        {
            type: "input",
            message: "What is the Manager's employee ID?",
            name: "employeeEmail",
            when: (userInput) => userInput.employeeRole === "Manager"
        },
        {
            type: "input",
            message: "What is the Manager's email?",
            name: "employeeEmail",
            when: (userInput) => userInput.employeeRole === "Manager"
        },
        {
            type: "input",
            message: "What is the Manager's office Number?",
            name: "managerOffice",
            when: (userInput) => userInput.employeeRole === "Manager"
        },
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName",
            when: (userInput) => userInput.employeeRole !== "Manager"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "employeeId",
            when: (userInput) => userInput.employeeRole !== "Manager"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail",
            when: (userInput) => userInput.employeeRole !== "Manager"
        },
        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "What's the Intern's school?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        
        // if yes, add another employee - if no then call render function from htmlRender.js
        {
            type: "confirm",
            name: "newEmployee",
            message: "Add another team member?" 
        }
    ]).then(answers => {

        // Pushes a new employees into the employees array with the appropriate information based upon role 
  
        if (answers.employeeRole === "Manager") {
            const manager = new Manager(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            employees.push(manager);
        } 
        else if (answers.employeeRole === "Intern") {
            const intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            employees.push(intern);
        } 
        else if (answers.employeeRole === "Engineer") {
           const engineer = new Engineer (answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github);
           employees.push(engineer);
        }
        if (answers.newEmployee === true) {
            EmployeeInfo();
        }

       // calls function from htmlRenderer.js, writes the html to the console log
       // will add write to team.html file 

        else { const renderedHTML = render(employees)
               console.log(renderedHTML)};
    })
}

getData();
