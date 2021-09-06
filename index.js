const inquirer = require("inquirer")
const jest = require("jest")
const fs = require("fs")
const createHtml = require("./util/createHtml");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern")
let team = [];

const managerQ = () =>{
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the manager's id?",
            name: "managerId",
            validate: managerId => {
                if(isNaN(managerId)) {
                    return "an id must be a number";
                } else {
                    return true;
                }
        },
    },
    {
        type: "input",
        message: "what is the manager's email?",
        name: "managerEmail",
        validate: managerEmail => {
            if(!managerEmail.includes('@')) {
                return "That is not a valid email";
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNum",
        validate: officeNum => {
            if(isNaN(officeNum)) {
                return "That is not a number!";
            } else {
                return true;
            }
        }
    }
    ]).then(answer =>{
        const {managerId, managerName,managerEmail,officeNum} =answer;
        const manager = new Manager (managerId, managerName,managerEmail,officeNum);
        team.push(manager);
    })
}

const continueQ= () =>{
   return inquirer.prompt([
    {
        type: "list",
        message: "Which member would you like to add?",
        name: "positionInfo",
        choices: ["Engineer", "Intern", "I don't want to add any more members at this time."]
    }
   ]).then(answer =>{
       switch (answer.positionInfo){
           case "Engineer":
           engineerQ();
           break;

           case "Intern":
           internQ();
           break;

           case "I don't want to add any more members at this time.":
               let data = createHtml(team);
               writeHtml(data);
               break;
       }
   })

}

const engineerQ =()=>{
    return inquirer.prompt([

 {
            type: "input",
            message: "What is your name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "engineerId",
            validate: function (input) {
                if(isNaN(input)) {
                    return "Please enter a number";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your email?",
            name: "engineerEmail",
            validate: function (input) {
                if(!input.includes('@')) {
                    return "Please enter a valid email";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "github"
        }
    ])
    .then(answer => {
        const {engineerName, engineerId, engineerEmail, github} = answer;
        const engineer = new Engineer (engineerName, engineerId, engineerEmail, github);
        team.push(engineer);
        continueQ();
    })
}; 
const internQ = () => {
    return inquirer.prompt ([
        {
            type: "input",
            message: "What is your name?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "internId",
            validate: function (input) {
                if(isNaN(input)) {
                    return "That is not a number!";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "internEmail",
            validate: function (input) {
                if(!input.includes('@')) {
                    return "That is not an email";
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "Where do you go to school",
            name: "schoolName"
        }
    ])
    .then(answer => {
        const {internName, internId, internEmail, schoolName} = answer;
        const intern = new Intern (internName, internId, internEmail, schoolName);
        team.push(intern);
        continueQ();
    })
} 

function writeHtml(data){
    fs.writeFile("index.html" ,data , err =>{
        if (err){
            console.log(err);
        return;
        }else {
            console.log("success!")
        }
    })
};

managerQ().then(continueQ)

