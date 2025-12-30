import * as fs from 'fs'
import * as path from 'path'

interface IBufferEncoding {
  encoding: BufferEncoding;
  flag: string
}

const readOptions: IBufferEncoding = { encoding: 'utf8', flag: 'r' }

function resolvePath(_path: string) {
  return path.resolve(
    process.cwd(),
    _path
  )
}

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
    console.error(error)
  }
}

export function readDataFile(sourcePath: string, options: IBufferEncoding = readOptions) {
  try {
    return fs.readFileSync(resolvePath(sourcePath), options)
  }
  catch (error) {
    console.error(error)
  }
}