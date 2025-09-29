import * as fs from 'fs'
import path from 'path'

export function doesTheFileExist(path: string): boolean {
  try {
    fs.accessSync(path)
    return true
  }
  catch {
    return false
  }
}

export function writeFile(destinationPath: string, content: string, options?: fs.WriteFileOptions) {
  const dirPath = path.dirname(destinationPath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  let opt = options !== undefined ? options : 'utf-8'
  try {
    fs.writeFileSync(destinationPath, content, opt)
  } catch (error) {
    console.log(`${error}`)
  }
}