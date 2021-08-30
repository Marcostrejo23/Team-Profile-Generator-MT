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


// function createMember(){
//     return inquirer.prompt([
//         {
//         type: "input",
//         message: "what is the member's name?",
//         name: "name",
//         validate: function(data){
//             if(data.length <= 0){
//                 return "You must input a name"
//             }
//             return true
//         }
//     },
//     {
//         type: "list",
//         message: "what is the member's position?",
//         choices: ["manager","engineer","intern"],
//         name: "position"
//     },
//     {
//         type: "input",
//         message: "what is the member's email",
//         name: "email",
//         validate: function(data){
//             if(data.includes(`@`) === false){
//                 return "Need a valid email"
//             }
//             return true
//         }
//     },
//     {
//         type: "input",
//         message: "What is the member's id?",
//         name: "id",
//         validate: function(data){
//             if (isNaN(parseInt(data))){
//                 return "An Id must be a number"
//             }
//             return true
//         }
//     }
//     ]).then(function({name,position,email,id}){
//         let positionData = "";
//         if (position === "engineer"){
//             positionData = "GitHub username";
//         }else if (position === "intern") {
//             positionData = "school name";
//         }else {
//             positionData = "office number";
//         }
//         inquirer.prompt([
//            {
//             type: "input",
//             message: `Enter the member's ${positionData}`,
//             name: "positionData",
//             validate: function(data){
//                 if(role==="manager"){
//                     if(isNaN(parseInt(data))){
//                         return "a number is required"
//                     }
//                     return true 
//                 }
//                 return true 
//             }
//         },
//         {
//             type: "confirm",
//             message: "Are there more members to introduce?",
//             name: "more"
//         }
//         ]).then(function({positionData, more}){
//             let teamMember;
//             if(role ==="manager"){
//                 teamMember= new Manager(name, id, email, positionData)
//             }else if(role==="engineer"){
//                 teamMember= new Engineer(name,id,email,positionData)
//             }else{
//                 teamMember = new Intern(name,id,email,positionData)
//             }
//             team.push(teamMember)
//             if(more===true){
//                 createMember()
//             }else{
//                 let str = createHtml(team)
//                 writeHtml(str)
//             }
//         })
//     })
// }

// function writeHtml(str){
//     fs.writeFile("./output/index.html", str, err=>{
//         if(err) throw err
//         console.log("Generated HTML File")
//     })
// }
// function init(){
//     createMember()
// }

// init()
