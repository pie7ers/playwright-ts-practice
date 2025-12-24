import { doesTheFileExist, writeFile } from './filesControl'
import path from 'path'
import pc from 'picocolors'
const SECRETS_PATH = path.join(__dirname, '../.secrets')

const SECRETS = `# Before configure this is recommended to read the README.md file
#TO TEST JOBS VIA ACT
#SLACK
SLACK_WEBHOOK_URL_TEST=
`

if (!doesTheFileExist(SECRETS_PATH)) {
  writeFile(SECRETS_PATH, SECRETS)
  console.log(pc.green(`.secrets created`))
}
else console.log(pc.yellow(`.secrets already exits`))
