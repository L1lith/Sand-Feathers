const { SandFeathers } = require('../../dist/SandFeathers')
const { expect } = require('chai')

describe('Query hook should operate correctly', () => {
  it('Query hook succeeds when valid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const queryHook = hooks.before.all[0]
    const context = { query: { message: 'hello :)' } }
    return expect(queryHook(context)).to.equal(context)
  })
  it('Query hook throws errors when invalid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const queryHook = hooks.before.all[0]
    expect(() => {
      queryHook({ query: { message: 12 } })
    }).to.throw()
  })
  it('Query hook throws errors when unspecified data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const queryHook = hooks.before.all[0]
    expect(() => {
      queryHook({ query: { message: 'hello :)', color: 'orange' } })
    }).to.throw()
  })
  it('Query hook throws no errors when a valid id is provided by default', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const queryHook = hooks.before.all[0]
    expect(() => {
      queryHook({ query: { message: 'hello :)', _id: '123456789012' } })
    }).to.not.throw()
  })
})
