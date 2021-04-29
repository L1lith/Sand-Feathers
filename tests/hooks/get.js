const { SandFeathers } = require('../../dist/SandFeathers')
const { expect } = require('chai')

const id = '123456789012'

describe('Get hook should operate correctly', () => {
  it('Get hook succeeds when valid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const getHook = hooks.after.get[0]
    const context = { result: { message: 'hello :)', _id: id } }
    return expect(getHook(context)).to.equal(context)
  })
  it('Get hook throws errors when invalid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const getHook = hooks.after.get[0]
    expect(() => {
      getHook({ data: { message: 12 } })
    }).to.throw()
  })
  it('Get hook throws errors when unspecified data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const getHook = hooks.after.get[0]
    expect(() => {
      getHook({ data: { message: 'hello :)', color: 'orange' } })
    }).to.throw()
  })
  it('Get hook throws errors when an invalid ID is provided by default', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const getHook = hooks.after.get[0]
    expect(() => {
      getHook({ data: { message: 'hello :)', _id: true } })
    }).to.throw()
  })
})
