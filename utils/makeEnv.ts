import { doesTheFileExist, writeFile } from './filesControl'
import path from 'path'
import pc from 'picocolors'
const ENV_PATH = path.join(__dirname, '../.env')

const ENV = `# Before configure this is recommended to read the README.md file
HEROKU_BASE_URL=https://the-internet.herokuapp.com/
#for the credentials check the example "Basic Auth" page HEROKU_BASE_URL,  
BASIC_AUTH_USER_GLOBAL=
BASIC_AUTH_PASS_GLOBAL=
BASIC_AUTH_USER_CHROMIUM=
BASIC_AUTH_PASS_CHROMIUM=
`

if (!doesTheFileExist(ENV_PATH)) {
  writeFile(ENV_PATH, ENV)
  console.log(pc.green(`.env created`))
}
else console.log(pc.yellow(`.env already exits`))
