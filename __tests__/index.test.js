const argsToJSON = require('../index')

describe('Testing CLI args parser with array input', () => {
  it('should parse a simple flags', () => {
    const args = argsToJSON(['--foo'])
    expect(args).toStrictEqual({foo: true})
  })

  it('should parse a composite flags', () => {
    const args = argsToJSON(['--foo', 'bar'])
    expect(args).toStrictEqual({foo: 'bar'})
  })

  it('should parse a composite flags with integer value', () => {
    const args = argsToJSON(['--number', 3])
    expect(args).toStrictEqual({number: 3})
  })

  it('should parse multiple flags at once', () => {
    const args = argsToJSON(['--foo', '--bar', 'baz', '--number', 1])
    expect(args).toStrictEqual({foo: true, bar: 'baz', number: 1})
  })

  it('should handle multiple values for the same flag', () => {
    const args = argsToJSON(['--foo', '--bar', 'baz', '--bar', 'zab', '--number', 1])
    expect(args).toStrictEqual({foo: true, bar: ['baz', 'zab'], number: 1})
  })
})

describe('Testing CLI args parser with string input', () => {
  /* ... */
  it('should handle multiple values for the same flag', () => {
    const args = argsToJSON('--foo --bar baz --bar zab --number 1')
    expect(args).toStrictEqual({foo: true, bar: ['baz', 'zab'], number: 1})
  })
})