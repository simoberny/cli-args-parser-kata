const isFlag = (arg) => arg && !isNumber(arg) && arg.startsWith('--')
const isNumber = (num) => parseInt(num) === +num

module.exports = argsToJSON = (args) => {
    if(!Array.isArray(args)) args = args.split(" ");

    let json = {}

    args.forEach((arg, i) => {  
        const next = args[i+1]

        if(isFlag(arg)){
            const key = arg.substr(2)
            if(!next || isFlag(next)) json[key] = true
            else if(isNumber(next)) json[key] = parseInt(next)
            else if(!isFlag(next)){
                if(json[key]) json[key] = [...[json[key]], next].reduce((acc, val) => acc.concat(val), [])
                else json[key] = next
            }
        }
    })

    return json;
}