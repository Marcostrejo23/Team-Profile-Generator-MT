
const createTeam = team =>{
    const createManager = manager => {
        return `
        <div class="card employee-card m-3 col-lg-6 col-sm-12 bg-dark" style="width: 15rem;">
        <div class="card-header bg-secondary">
            <h2 class="card-title">${manager.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item bg-secondary text-blue">ID: ${manager.getid()}</li>
                <li class="list-group-item bg-secondary text-blue">Email: <a href="mailto:${manager.getEmail()}" class="text-blue">${manager.getEmail()}</a></li>
                <li class="list-group-item bg-secondary text-blue">Office number: ${manager.getofficeNumber()}</li>
            </ul>
        </div>
    </div>
        `;
    };

    const createEngineer = engineer => {
        return `
        <div class="card employee-card m-3 col-lg-6 col-sm-12 bg-dark" style="width: 15rem;">
        <div class="card-header bg-secondary">
            <h2 class="card-title">${engineer.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${engineer.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item bg-secondary text-blue">ID: ${engineer.getid()}</li>
                <li class="list-group-item bg-secondary text-blue">Email: <a href="mailto:${engineer.getEmail()}" class="text-blue">${engineer.getEmail()}</a></li>
                <li class="list-group-item bg-secondary text-blue">Github: ${engineer.getGitHub()}</li>
            </ul>
        </div>
    </div>
        `;
    };
    const createIntern = intern => {
        return `
        <div class="card employee-card m-3 col-lg-6 col-sm-12 bg-dark" style="width: 15rem;">
        <div class="card-header bg-secondary">
            <h2 class="card-title">${intern.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${intern.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item bg-secondary text-blue">ID: ${intern.getid()}</li>
                <li class="list-group-item bg-secondary text-blue">Email: <a href="mailto:${intern.getEmail()}" class="text-blue">${intern.getEmail()}</a></li>
                <li class="list-group-item bg-secondary text-blue">School: ${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
        `;
    };
    const html = [];

    html.push(team.filter(employee=>employee.getRole()=="Manager").map(manager =>createManager(manager)));
    html.push(team.filter(employee=>employee.getRole()=="Engineer").map(engineer =>createEngineer(engineer)));
    html.push(team.filter(employee=>employee.getRole()=="Intern").map(intern =>createIntern(intern)));
    return html.join("");
};

const createHtml = (team)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    <body class="bg-danger">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading bg-primary">
                    <h1 class="text-center text-white">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex flex-wrap justify-content-center">
                    ${createTeam(team)}
                </div>
            </div>
        </div>
    </body>
    </html>
        `;
};

module.exports = createHtml