const inquirer = require("inquirer");
const fs = require('fs');
const axios = require('axios');
// const markdown =  require('./utils/generateMarkdown');


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
    .then(function( {username, repo} ) {
        const queryUrl = `https://api.github.com/repos/${username}/${repo}`;
        const contribUrl = `https://api.github.com/repos/${username}/${repo}/contributors`;
        axios
        
        .get(queryUrl)
        .then(res =>{
            if (res.data.description != null){
                let description = res.data.description;
            }else{
                let description = "Description Needed";
            }
            
            let installation = "Enter installation instructions."; 
            console.log(installation)
            let usage = "Enter Usage Instructions.";
            console.log(usage)
            let tests = "Enter any and all tests run."; 
            console.log(tests)
            let questions = "Using the email link below, please reach out with any questions.";
            console.log(questions)
            axios
            .get(contribUrl)
            .then(data => {
                const contributors = [];
                data.data.forEach(element => {
                    contributors.push(element.login);
                    console.log(contributors);
                })
                
            });
            let license = res.data.license;
            console.log(license)

            // // const writeReadMe = ()=>{
            // //     if(description != undefined && installation != undefined && usage != undefined && faq != undefined && license !== undefined)
            // //         {
            // //             const readme=
            // //         `
            // //             # ${repo}
            // //             #### Author: ${username}

            // //             ${description}

            // //             //badge 

            // //             # Table of Contents
            // //             * ##Installation
            // //             * ##Usage
            // //             * ##Tests
            // //             * ##Questions
            // //             * ##Contributors
            // //             * ##License

            // //             ##Installation
            // //             ${installation}

            // //             ##Usage
            // //             ${usage}

            // //             ##Tests
            // //             ${tests}

            // //             ##Questions
            // //             ${questions}

            // //             ##Contributors
            // //             ${contributors}

            // //             ##License
            // //             ${license}
            // //             `
            // //         };
            // //     fs.writeFile(`${repo} README.md`, readme, function(err){
            // //         if (err) console.log(err)
            // //     })
            // }     
        })
})


// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();
