# Development setup on Linux/Mac

## Prerequisites
* [git version-control](https://git-scm.com/)
* [node.js and npm newest LTS](https://nodejs.org/en/)
* [Python 3.6 or newer](https://www.python.org/downloads/)
* [Chromium-Browser](https://www.chromium.org/getting-involved/download-chromium) or [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)

## Setting up backend
Create a directory and clone the repository from github
```bash
cd
mkdir faceted
cd faceted
git clone https://github.com/Ohtu-FaceTed/FaceTed-Backend.git
cd FaceTed-Backend
```
Install the Python virtual environment module venv
```bash
pip install venv
```
Create a new venv inside the directory and activate it
```bash
python -m venv venv/
source venv/bin/activate
```
Install project dependencies
```bash
pip install -r requirements.txt
```
### Running the server
#### Note: All shell commands from now on assume you are at the root of the project and the virtual environment is active


Now you can start up the backend locally
```bash
python app.py
```
By default it is open at http://0.0.0.0:5000/

Type the following for a list of available commandline arguments
```bash
python app.py --help
```

For example `python app.py --profile` launches the server in debug mode and a profiler active which prints function calls and runtimes for each served request.
### Running tests
Run the test suite with `./test.sh`. Html-formatted coverage-report can be found in `htmlcov/index.html`.
### Linting
You can lint and autoformat the code with `./lint.sh` before making a commit to keep the codestyle consistent.

## Setting up frontend
Clone the repository from github
```bash
cd
cd faceted
git clone https://github.com/Ohtu-FaceTed/FaceTed-Search.git
cd FaceTed-Search
```
Install the local http-server and test dependencies
```bash
npm install
```
### Using local backend with the front
#### Note: All shell commands from now on assume you are at the root of the project


For using the local backend you must change the first line of `src/fs-question.js` from
```javascript
const baseUrl = 'http://faceted.ddns.net:5000';
```
to
```javascript
const baseUrl = 'http://0.0.0.0:5000';
```
Easiest way to do this is to use a npm script:
```bash
npm run local
```
And to change back
```bash
npm run remote
```
### Running the server
```bash
npm start
```
Starts the server on http://127.0.0.1:8080 by default. Open it to see the local frontend.
### Setting up tests
Before running the tests for the first time you need to set the CHROME_BIN environment variable to point to either Chromium-Browser or Google Chrome.

For example on linux you can add the line
```bash
export CHROME_BIN=/path/to/chrome/executable
```
to your .bashrc file and reopen the terminal to apply the change.

On Ubuntu the default export for chromium-browser installed from apt would be
```bash
export CHROME_BIN=/usr/bin/chromium-browser
```
### Running tests
```bash
npm test
```
Runs the test suite and generates coverage-report to `coverage/index.html`
### Linting
```
npm run lint
```
Autoformats the source files with eslint. If there are errors that can't be fixed automatically, they are printed to the console and you must fix them first. You should always run this before commits.

