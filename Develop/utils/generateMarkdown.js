const description = "Description needed";
const contributors = [];
const installation = "Enter installation instructions."; 
const usage = "Enter Usage Instructions.";
const tests = "Enter any and all tests run."; 
const askQ = "Using the email link below, please reach out with any questions.";
const email = "mailto:someemail@email.com";

function generateMarkdown() {
  return 
  `
# ${repo}
#### Author: ${username}

${description}

//badge 

# Table of Contents
* ## Installation
* ## Usage
* ## Tests
* ## Questions
* ## Contributors
* ## License

## Installation

${installation}

## Usage

${usage}

## Tests

${tests}

## Questions

${askQ}

### Email

${email}

### Picture

<img src="${res.data.owner.avatar_url}" width="30" style="border-radius: 15px">

## Contributors

${contributors}

## License

${license}
  `

}

module.exports = generateMarkdown;
