const inquirer = require("inquirer")
const jest = require("jest")
const fs = require("fs")
const generateHtml = require("./utils/generateHtml");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern")
let team = [];


function createMember(){
    inquirer.prompt([
        {
        type: "input",
        message: "what is the member's name?",
        name: "name",
        validate: function(data){
            if(data.length <= 0){
                return "You must input a name"
            }
            return true
        }
    },
    {
        type: "list",
        message: "what is the member's position?",
        choices: ["manager","engineer","intern"],
        name: "position"
    },
    {
        type: "input",
        message: "what is the member's email",
        name: "email",
        validate: function(data){
            if(data.includes(`@`) === false){
                return "Need a valid email"
            }
            return true
        }
    },
    {
        type: "input",
        message: "What is the member's id?",
        name: "id",
        validate: function(data){
            if (isNaN(parseInt(data))){
                return "An Id must be a number"
            }
            return true
        }
    }
    ]).then(function({name,position,email,id}){
        let positionData = "";
        if (position === "engineer"){
            positionData = "GitHub username";
        }else if (positionData === intern){
            positionData = "school name";
        }else {
            positionData = "office number";
        }
        inquirer.prompt([
           {
            type: "input",
            message: `Enter the member's ${positionData}`,
            name: "positionData",
            validate: function(data){
                if(role==="manager"){
                    if(isNaN(parseInt(data))){
                        return "a number is required"
                    }
                    return true 
                }
                return true 
            }
        },
        {
            type: "confirm",
            message: "Are there more members to introduce?",
            name: "more"
        }
        ]).then(function({positionData, more}){
            let teamMember;
            if(role ==="manager"){
                teamMember= new Manager(name, id, email, positionData)
            }else if(role==="engineer"){
                teamMember= new Engineer(name,id,email,positionData)
            }else{
                teamMember = new Intern(name,id,email,positionData)
            }
            team.push(teamMember)
            if(more===true){
                createMember()
            }else{
                let str = generateHtml(team)
                createHtml(str)
            }
        })
    })
}

function createHtml(str){
    fs.writeFile("./output/index.html", str, err=>{
        if(err) throw err
        console.log("Generated HTML File")
    })
}
function init(){
    createMember()
}

init()
