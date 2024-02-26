const EnumEmployeeType = require('../lib/enum/EnumEmployeeType');

// creates the team
const generateTeam = (team) => {
  // creates the manager html
  const generateManager = (manager) => {
    let managerCardHtmlTemplate = `<div class="card employee-card">
    <div class="card-header">
      <h2 class="card-title">{{name}}</h2>
      <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>{{role}}</h3>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">ID: {{id}}</li>
        <li class="list-group-item">Email: <a href="mailto:{{email}}">{{email}}</a></li>
        <li class="list-group-item">Office number: {{officeNumber}}</li>
      </ul>
    </div>
  </div>`;

    try {
      managerCardHtmlTemplate = managerCardHtmlTemplate
        .replace(/{{name}}/g, manager.getName())
        .replace(/{{role}}/g, manager.getRole())
        .replace(/{{id}}/g, manager.getId())
        .replace(/{{email}}/g, manager.getEmail())
        .replace(/{{officeNumber}}/g, manager.getOfficeNumber());
    } catch (err) {
      console.error(err);
    } finally {
      return managerCardHtmlTemplate;
    }
  };

  // creates the html for engineers
  const generateEngineer = (engineer) => {
    let engineerCartHtmlTemplate = `<div class="card employee-card mr-2 ml-2">
  <div class="card-header">
    <h2 class="card-title">{{name}}</h2>
    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>{{role}}</h3>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">ID: {{id}}</li>
      <li class="list-group-item">Email:<a href="mailto:{{email}}">{{email}}</a></li>
      <li class="list-group-item">GitHub: <a href="https://github.com/{{github}}" target="_blank"
          rel="noopener noreferrer">{{github}}</a></li>
    </ul>
  </div>
</div>`;

    try {
      engineerCartHtmlTemplate = engineerCartHtmlTemplate
        .replace(/{{name}}/g, engineer.getName())
        .replace(/{{role}}/g, engineer.getRole())
        .replace(/{{id}}/g, engineer.getId())
        .replace(/{{email}}/g, engineer.getEmail())
        .replace(/{{github}}/g, engineer.getGithub());
    } catch (err) {
      console.error(err);
    } finally {
      return engineerCartHtmlTemplate;
    }
  };

  // creates the html for interns
  const generateIntern = (intern) => {
    let internCardHtmlTemplate = `<div class="card employee-card">
    <div class="card-header">
      <h2 class="card-title">{{name}}</h2>
      <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>{{role}}</h3>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">ID: {{id}}</li>
        <li class="list-group-item">Email: <a href="mailto:{{email}}">{{email}}</a></li>
        <li class="list-group-item">School: {{school}}</li>
      </ul>
    </div>
  </div>`;

    try {
      internCardHtmlTemplate = internCardHtmlTemplate
        .replace(/{{name}}/g, intern.getName())
        .replace(/{{role}}/g, intern.getRole())
        .replace(/{{id}}/g, intern.getId())
        .replace(/{{email}}/g, intern.getEmail())
        .replace(/{{school}}/g, intern.getSchool());
    } catch (err) {
      console.error(err);
    } finally {
      return internCardHtmlTemplate;
    }
  };

  const html = [];

  html.push(
    team
      .filter((employee) => employee.getRole() === EnumEmployeeType.MANAGER)
      .map((manager) => generateManager(manager))
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === EnumEmployeeType.ENGINEER)
      .map((engineer) => generateEngineer(engineer))
      .join('')
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === EnumEmployeeType.INTERN)
      .map((intern) => generateIntern(intern))
      .join('')
  );

  return html.join('');
};

// exports function to generate entire page
module.exports = (team, teamName) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${teamName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">${teamName}</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateTeam(team)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
