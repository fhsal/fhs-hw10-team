const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// defining path to where output file will be saved 

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
        .then( answers => { 
            
            teamName = answers.teamTitle;
            console.log(teamName);
            
            // var main = fs.readFileSync('./templates/main.html', 'utf8');
            // main = main.replace({teamTitle}, teamTitle);
            // console.log(main);
            
            EmployeeInfo()
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
        // Manager prompts are duplicated so that the user knows those relate to that role, but could also use employee prompts 

        {
            type: "input",
            message: "What is the Manager's name?",
            name: "employeeName",
            when: (userInput) => userInput.employeeRole === "Manager"
        },
        {
            type: "input",
            message: "What is the Manager's employee ID?",
            name: "employeeId",
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
            name: "officeNumber",
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
        
        // Engineer specific input 

        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        
        // Intern specific input 

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
            const manager = new Manager(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.officeNumber);
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
        
        // if yes, gather info for next employee
        
        if (answers.newEmployee === true) {
            EmployeeInfo();
        }

       // calls function from htmlRenderer.js, writes the html to the console log
       // and writes the rendered html to team.html file into the output folder 

        else { const renderedHTML = render(employees)
               console.log(renderedHTML)
               fs.writeFileSync(outputPath, renderedHTML)};
    })
}

// calling function

getData();
