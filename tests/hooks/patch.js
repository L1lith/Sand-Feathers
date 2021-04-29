const { SandFeathers } = require('../../dist/SandFeathers')
const { expect } = require('chai')

describe('Patch hook should operate correctly', () => {
  it('Patch hook succeeds when valid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const patchHook = hooks.before.patch[0]
    const context = { data: { _id: '123456789012', message: 'hello :)' } }
    return expect(patchHook(context)).to.equal(context)
  })
  it('Patch hook throws errors when invalid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const patchHook = hooks.before.patch[0]
    expect(() => {
      patchHook({ data: { _id: '123456789012', message: 12 } })
    }).to.throw()
  })
  it('Patch hook throws errors when unspecified data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const patchHook = hooks.before.patch[0]
    expect(() => {
      patchHook({ data: { _id: '123456789012', message: 'hello :)', color: 'orange' } })
    }).to.throw()
  })
  it('Patch hook throws errors when no id is provided by default', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const patchHook = hooks.before.patch[0]
    expect(() => {
      patchHook({ data: { message: 'hello :)' } })
    }).to.throw()
  })
})
