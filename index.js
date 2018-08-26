const isFlag = (arg) => arg && !isNumber(arg) && arg.startsWith('--')
const isNumber = (num) => parseInt(num) === +num
const parseValue = (value) => isNumber(value) ? parseInt(value) : value

const argsToJSON = (args) => {
  if (!Array.isArray(args)) args = args.split(' ')

  let json = {}

  args.forEach((arg, i) => {
    const next = args[i + 1]

    if (isFlag(arg)) {
      const key = arg.substr(2)
      if (!next || isFlag(next)) {
        json[key] = true
      } else if (!isFlag(next)) {
        json[key] = json[key] ? [].concat(json[key], parseValue(next)) : parseValue(next)
      }
    }
  })

  return json
}

module.exports = argsToJSON
