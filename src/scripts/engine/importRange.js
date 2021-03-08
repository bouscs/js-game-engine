/**
 * Import multiple files, replacing '{i}' in path with a range of numbers
 */
export default (path, start = 0, length = 1) => {
  const files = []

  let current = start
  for (let i = 0; i < length; i++) {
    files[i] = path.replace('{i}', current)
    current++
  }

  return files
}
