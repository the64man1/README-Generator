const inquirer = require("inquirer");
const fs = require("fs");

var badge = '';

function getBadge (answer) {
    if (answer.license == 'GNU') {
        return badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    } else if (answer.license == 'MIT') {
        return badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    } else if (answer.license == 'Mozilla') {
        return badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
    } else {
        return badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
    };
};

const writeReadme = (answer, badge) => `
# ${answer.title}
${badge}

## Description
    
${answer.motivation}\n\n
${answer.why}\n\n
${answer.problem}\n\n
${answer.learn}\n\n
    
## Table of Contents
    
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
    
## Installation
    
${answer.installation}
    
## Usage
    
${answer.usage}
    
## License
    
This project is distrubuted under the ${answer.license} License. See more information through this link: ${badge}
    
## Contributing
    
${answer.contributing}
    
## Tests
    
${answer.tests}
    
## Questions
    
For questions, you can contact me through GitHub (${answer.github}), or email me at ${answer.email}`
;

inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "What is the title of your project?"
    },
    {
        name: "motivation",
        type: "input",
        message: "First we will build the description section. Please describe your motivation for completing this project:"
    },
    {
        name: "why",
        type: "input",
        message: "Next please describe why you endeavoured on this project:"
    },
    {
        name: "problem",
        type: "input",
        message: "Next please describe what problem you solved:"
    },
    {
        name: "learn",
        type: "input",
        message: "To complete the description section, please describe what you learned:"
    },
    {
        name: "installation",
        type: "input",
        message: "Please enter step-by-step installation instructions for your project:"
    },
    {
        name: "usage",
        type: "input",
        message: "Please enter the usage information for your project:"
    },
    {
        name: "license",
        type: "list",
        message: "Choose a license for your project",
        choices: ["GNU", "MIT", "Mozilla", "Unilicense"]
    },
    {
        name: "contributing",
        type: "input",
        message: "Please enter contribution guidelines for your project:"
    },
    {
        name: "tests",
        type: "input",
        message: "Please enter the test instructions for your project:"
    },
    {
        name: "github",
        type: "input",
        message: "Please enter your GitHub username:"
    },
    {
        name: "email",
        type: "input",
        message: "Please enter your email address:"
    }
]) .then((answer) => {
    getBadge(answer);
    const readMeContent = writeReadme(answer, badge);

    fs.writeFile('README.md', readMeContent, (err) => err ? console.log(err) : console.log("README generated"));
});