const { SandFeathers } = require('../../dist/SandFeathers')
const chai = require('chai')
const { expect } = chai
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Find hook should operate correctly', () => {
  it('Find hook succeeds when valid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const findHook = hooks.after.find[0]
    const context = { result: { data: [{ message: 'hello :)', _id: '123456789012' }] } }
    expect(findHook(context)).to.equal(context) // Should resolve and return the context object
  })
  it('Find hook throws errors when invalid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: 12 })
    const hooks = sandFeathers.hooks
    const findHook = hooks.before.create[0]
    expect(() => {
      findHook({ data: { message: 12 } })
    }).to.throw()
  })
  it('Find hook throws errors when unspecified data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const findHook = hooks.before.create[0]
    expect(() => {
      findHook({ data: { message: 'hello :)', color: 'orange' } })
    }).to.throw()
  })
  it('Find hook throws no errors when a valid id is provided by default', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const findHook = hooks.before.create[0]
    expect(() => {
      findHook({ data: { message: 'hello :)', _id: '123456789012' } })
    }).to.not.throw()
  })
})
