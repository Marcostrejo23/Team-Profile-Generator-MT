
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
                <li class="list-group-item bg-secondary text-blue">ID: ${manager.getId()}</li>
                <li class="list-group-item bg-secondary text-blue">Email: <a href="mailto:${manager.getEmail()}" class="text-blue">${manager.getEmail()}</a></li>
                <li class="list-group-item bg-secondary text-blue">Office number: ${manager.getOfficeNumber()}</li>
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
                <li class="list-group-item bg-secondary text-blue">ID: ${engineer.getId()}</li>
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
                <li class="list-group-item bg-secondary text-blue">ID: ${intern.getId()}</li>
                <li class="list-group-item bg-secondary text-blue">Email: <a href="mailto:${intern.getEmail()}" class="text-blue">${intern.getEmail()}</a></li>
                <li class="list-group-item bg-secondary text-blue">School: ${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
        `;
    };
    const html = [];

    html.push(team.filter(employee=>employee.getRole()==manager)).map(manager =>createManager(manager));
    html.push(team.filter(employee=>employee.getRole()==engineer)).map(engineer =>createEngineer(engineer));
    html.push(team.filter(employee=>employee.getRole()==intern)).map(intern =>createIntern(intern));
    return html.join("");
};
