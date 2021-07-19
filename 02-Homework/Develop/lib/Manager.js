// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
inquirer.prompt(
    [
        {
            type: `input`,
            message: `what is your name?`,
            name: `name`,
        },
        {
            type: `input`,
            message: `what is your id?`,
            name: `id`,
        },
        {
            type: `input`,
            message: `what is your email?`,
            name: `email`,
        },
        {
            type: `input`,
            message: `what is your office number?`,
            name: `officeNum`,
        },
    ]);