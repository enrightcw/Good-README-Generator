const inquirer = require("inquirer");
const fs = require('fs');
const axios = require('axios');
// const markdown =  require('./utils/generateMarkdown');
// const description;
const credits = ["none"];
// const install = "Enter installation instructions."; 
// const usage = "Enter Usage Instructions.";
// const tests = "Enter any and all tests run."; 
const askQ = "Using the email link below, please reach out with any questions.";
// const email = "someemail@email.com";
// const buildReadme = () =>{
//  return};

const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your GitHub Username?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your Repo title?"
    },
    {
        type: "input",
        name: "description",
        message: "Write a brief description about your project."
    },
    {
        type: "input",
        name: "install",
        message: "What command should be used to install dependencies?"
    },
    {
        type: "input",
        name: "tests",
        message: "What command should be used to run tests?"
    },
    {
        type: "input",
        name: "usage",
        message: "What shouild a user know about using this repo?"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address."
    }

];

inquirer.prompt(questions)
    .then(( {username, repo, description, install, tests, usage, email} ) => {
        const queryUrl = `https://api.github.com/repos/${username}/${repo}`;
        const contribUrl = `https://api.github.com/repos/${username}/${repo}/contributors`;
        axios
        
        .get(queryUrl)
        .then(res =>{
            
            
            axios
            .get(contribUrl)
            .then(data => {
                //data.data.forEach(element => credits.push(element.login))
                for(let i =0; i < data.data.length; i++){
                    credits.push(data.data[i].login);
                    console.log(credits);
                    
                }
                
            });

            const finalReadme = 
            `
# ${repo}
#### Author: ${username}

${description}

# Table of Contents
* [Installation] (#installation)
* [Usage] (#usage)
* [Tests] (#tests)
* [Questions] (#questions)
* [Contributors] (#contributors)
* [License] (#license)

## Installation

${install}

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

${credits}

## License

<img src="https://img.shields.io/github/license/${username}/${repo}">
`
                
            fs.writeFile("../README.md", finalReadme, function(err){
                if(err) console.log(err+ "Something went wrong.")
            })
                
             
        })   
})

