# Development setup on Linux/Mac

## Prerequisites

-   [git version-control](https://git-scm.com/)
-   [node.js and npm LTS version](https://nodejs.org/en/)
-   [Python 3.6 or newer](https://www.python.org/downloads/)
-   [Chromium-Browser](https://www.chromium.org/getting-involved/download-chromium) or [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)

## Setting up backend

Create a directory and clone the repository from GitHub

```bash
cd
mkdir -p faceted
cd faceted
git clone https://github.com/Ohtu-FaceTed/FaceTed-Backend.git
cd FaceTed-Backend
```

Install the Python [virtual environment](https://docs.python.org/3/library/venv.html) module venv.

```bash
pip install venv
```

Create a new virtual environment inside the directory.

```bash
python -m venv venv/
```
Activate the virtual environment.

```bash
source venv/bin/activate
```
#### Note that you should do this step everytime you work on the project.
You can exit the virtual environment with `deactivate` or by closing the terminal.

Install project dependencies.

```bash
pip install -r requirements.txt
```

### Importing data and users

##### NOTE: only do these steps on initial setup, since they will alter app.db. Ideally only do these steps with during initial setup as this requires you to delete or in some other way remove app.db from the root directory.



#### Setting up the user

From the root of the project navigate to the "data" folder and open the file "user.json".
In here you can set a admin user for the project by editing the defaults (user: "admin" , username: "admin" and password:"admin") to whatever you'd like.

#### Importing the .CSV data

##### NOTE: The .csv file names are case sensitive. For replacementfiles to work the have to be named in the exact same way the current ones are.

Importing the data comes down to one command. While in the root of the project:
```bash
py import_data.py data app.db
```
Note that in the current version this throws an error:
```bash
Failed to read building data: [Errno 2] File b'attributes.csv' does not exist: b'attributes.csv'
Substituting placeholder data!
...\FaceTed-Backend\venv\lib\site-packages\flask_sqlalchemy\__init__.py:835: FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and 
will be disabled by default in the future.  Set it to True or False to suppress this warning.  
  'SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and '
```
which can be ignored as it has to do with the structure of the project, and does not affect the script. As previously stated running this script might cause issues if app.db already exists.

The script should create app.db in the root of the project root directory, which now contains the data from the .csv files.


### Running the server

#### Note: All shell commands from now on assume you are at the root of the project and the virtual environment is active

Now you can start up the backend locally.

```bash
python app.py
```

By default it is open at http://0.0.0.0:5000/
and the adminpanel at: http://0.0.0.0:5000/801fc3

Type the following for a list of available commandline arguments.

```bash
python app.py --help
```

For example `python app.py --profile` launches the server in debug mode and a profiler active which prints function calls and runtimes for each served request.

### Running tests

Run the test suite with `./test.sh`. Html-formatted coverage-report can be found in `htmlcov/index.html`.

### Linting

You can lint and autoformat the code with `./lint.sh` before making a commit to keep the codestyle consistent.

## Setting up frontend

Clone the repository from GitHub.

```bash
cd
mkdir -p faceted
cd faceted
git clone https://github.com/Ohtu-FaceTed/FaceTed-Search.git
cd FaceTed-Search
```

Install the local http-server and test dependencies.

```bash
npm install
```

### Using local backend with the front

#### Note: All shell commands from now on assume you are at the root of the project.

For using the local backend you must change the first line of `src/fs-question.js` from

```javascript
const baseUrl = "http://faceted.ddns.net:5000";
```

to

```javascript
const baseUrl = "http://0.0.0.0:5000";
```

Easiest way to do this is to use the provided npm script "local".

```bash
npm run local
```

And to change back you can use the script "remote".

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

For example on Linux you can add the line

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

Runs the test suite and generates coverage-report to `coverage/index.html`.

### Linting

```
npm run lint
```

Autoformats the source files with eslint. If there are errors that can't be fixed automatically, they are printed to the console and you must fix them first. You should always run this before commits.
