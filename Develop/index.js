const inquirer = require("inquirer");
const fs = require('fs');
const axios = require('axios');
// const markdown =  require('./utils/generateMarkdown');
const description = "Description needed";
const contributors = [];
const installation = "Enter installation instructions."; 
const usage = "Enter Usage Instructions.";
const tests = "Enter any and all tests run."; 
const askQ = "Using the email link below, please reach out with any questions.";
const email = "someemail@email.com";

const questions = [
    {
    type: "input",
    name: "repo",
    message: "What is your Repo title?"
}, 
{
    type: "input",
    name: "username",
    message: "What is your GitHub Username?"
}];

inquirer.prompt(questions)
    .then(( {username, repo} ) => {
        const queryUrl = `https://api.github.com/repos/${username}/${repo}`;
        const contribUrl = `https://api.github.com/repos/${username}/${repo}/contributors`;
        axios
        
        .get(queryUrl)
        .then(res =>{
            if (res.data.description != null){
                description = res.data.description;
            }
            
            axios
            .get(contribUrl)
            .then(data => {
                
                data.data.forEach(element => {
                    contributors.push(element.login);
                    console.log(contributors);
                })
                
            });
            const license = res.data.license;
            
            console.log(license)
  
                    const readme=
`
# ${repo}
#### Author: ${username}

${description}

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

### Picture
<img src="${res.data.owner.avatar_url}" width="30" style="border-radius: 15px">

### Email 
${email}

## Contributors

${contributors}

## License

<img src="https://img.shields.io/github/license/${username}/${repo}">
`;
                fs.writeFile("../README.md", readme, function(err){
                    if(err) console.log(err+ "Something went wrong.")
                })
                
             
        })   
})


// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();
