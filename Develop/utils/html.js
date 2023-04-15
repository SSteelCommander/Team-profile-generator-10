const generateManager = (employee) => {
  return `
  <div style="display: inline-block; min-width: 200px; margin: 5px; border-style: groove; padding: 2px;">
    <div style="border-style: solid; background: #4285F4;">
      <h3>${employee.teamManagerName}</h3>
      <h4>Manager</h4>
    </div>

    <div style="background: #f5f5f5;">
      <p style="border-style: solid;">ID: ${employee.teamManagerID}</p>
      <p style="border-style: solid;">
        Email:
        <a href="mailto:${employee.teamManagerEmail}">
          ${employee.teamManagerEmail}
        </a>
      </p>
      <p style="border-style: solid;">Office Number: ${employee.teamManagerNumber}</p>
    </div>
  </div>`;
};

const generateEngineer = (employee) => {
  return `
  <div style="display: inline-block; min-width: 200px; margin: 5px; border-style: groove; padding: 2px;">
  <div style="border-style: solid; background: #4285F4;">
      <h3>${employee.teamEngineerName}</h3>
      <h4>Manager</h4>
    </div>

    <div style="background: #f5f5f5;">
      <p style="border-style: solid;">ID: ${employee.teamEngineerID}</p>
      <p style="border-style: solid;">
        Email:
        <a href="mailto:${employee.teamEngineerEmail}">
          ${employee.teamEngineerEmail}
        </a>
      </p>
      <p style="border-style: solid;">
        Github Username:
        <a href="https://github.com/${employee.teamEngineerUser}">
          ${employee.teamEngineerUser}
        </a>
      </p>
    </div>
  </div>
  `;
};

const generateIntern = (employee) => {
  return `
  <div style="display: inline-block; min-width: 200px; margin: 5px; border-style: groove; padding: 2px;">
  <div style="border-style: solid; background: #4285F4;">
      <h3>${employee.teamInternName}</h3>
      <h4>Manager</h4>
    </div>

    <div style="background: #f5f5f5;">

      <p style="border-style: solid;">ID: ${employee.teamInternID}</p>
      <p style="border-style: solid;">
        Email:
        <a href="mailto:${employee.teamInternEmail}">
          ${employee.teamInternEmail}
        </a>
      </p>
      <p style="border-style: solid;">School: ${employee.teamInternSchool}</p>
    </div>
  </div>`;
};

const generateHTML = (data) => {
  let cards = [];

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    const role = employee.role;

    switch (role) {
      case "manager":
        const teamManager = generateManager(employee);
        cards.push(teamManager);
        break;
      case "engineer":
        const teamEngineer = generateEngineer(employee);
        cards.push(teamEngineer);
        break;
      case "intern":
        const teamIntern = generateIntern(employee);
        cards.push(teamIntern);
        break;
      default:
        break;
    }
  }

  const employeeCards = cards.join("");

  const generateTeam = generateTeamPage(employeeCards);
  return generateTeam;
};

const generateTeamPage = function (employeeCards) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Team</title>
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <header>
          <h1>My Team</h1>
      </header>
      <main>
          <div>
              <div style="grid-auto-columns: auto; display: grid; gap: 10px;">
                  ${employeeCards}
              </div>
          </div>
      </main>
      
  </body>
  </html>


`;
};

module.exports = generateHTML;