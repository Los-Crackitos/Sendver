# Sendver

[![License](https://img.shields.io/github/license/Los-Crackitos/Sendver)](LICENSE)

Sendver is a tiny email sender API that allow users to send email throught http POST request. You can use an SMTP provider or mailgun API.

## Installation

To install Sendver, you'll need to run the docker image from [docker hub](https://hub.docker.com/r/loscrackitos/sendver). You must set environment variable, than can allow you to send email from SMTP server or by mailgun API.

```docker run -p 8080:3000 --env MAILGUN_API_KEY=MYAPIKEY --env MAILGUN_DOMAIN=MYDOMAIN sendver ```

Here is the list of the environments variables :

| Key             | Description                                             |
| --------------- | ------------------------------------------------------- |
| PORT            | By default, is `3000`.                                  |
|                 |                                                         |
| SMTP_URL        | SMTP server url that can be used to send email.         |
| SMTP_PORT       | SMTP server port that can be used to send email.        |
| SMTP_USERNAME   | SMTP server username used to connect to smtp server.    |
| SMTP_PASSWORD   | SMTP server password used to connect with the username. |
| SMTP_SSL        | Determine if the SMTP server use SSL protocol.          |
|                 |                                                         |
| MAILGUN_API_KEY | API KEY of mailgun provider.                            |
| MAILGUN_DOMAIN  | DOMAIN of mailgun provider.                             |

## Usage

Then, you can send an email from sendver using http POST request. You must pass all the below data structure, as a json :

```curl --header "Content-Type: application/json" \ --request POST \ --data '{"subject":"mysubject","text":"mytext","html":"<p>BODY</p>","from":"from@sendver.com", "to":"to@sendver.com"}' \ http://localhost:8080/send```

## Want to contribute

### Getting Started

Clone the repository and run ```make init``` to copy all configuration files.
Then, run ```npm i``` & ```npm run start``` to start the project.

### Code of conduct

As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free experience for everyone, regardless of level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, or religion.

Examples of unacceptable behavior by participants include the use of sexual language or imagery, derogatory comments or personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct. Project maintainers who do not follow the Code of Conduct may be removed from the project team.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting one or more of the project maintainers.

This Code of Conduct is adapted from the Contributor Covenant, version 1.0.0, available at <https://www.contributor-covenant.org/version/1/0/0/code-of-conduct.html>

## Sponsors

Support our open source work 😄

## License

Sendver is under MIT license. Feel free to use it as you want.
