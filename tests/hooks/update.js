const { SandFeathers } = require('../../dist/SandFeathers')
const { expect } = require('chai')

const id = '123456789012'

describe('Update hook should operate correctly', () => {
  it('Update hook succeeds when valid data is passed', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    const updateHook = hooks.before.update[0]
    const context = { data: { message: 'hello :)', _id: id } }
    return expect(updateHook(context)).to.equal(context)
  })
  // it('Create hook throws errors when invalid data is passed', () => {
  //   const sandFeathers = new SandFeathers({ message: String })
  //   const hooks = sandFeathers.hooks
  //   const createHook = hooks.before.create[0]
  //   expect(() => {
  //     createHook({ data: { message: 12 } })
  //   }).to.throw()
  // })
  // it('Create hook throws errors when unspecified data is passed', () => {
  //   const sandFeathers = new SandFeathers({ message: String })
  //   const hooks = sandFeathers.hooks
  //   const createHook = hooks.before.create[0]
  //   expect(() => {
  //     createHook({ data: { message: 'hello :)', color: 'orange' } })
  //   }).to.throw()
  // })
  // it('Create hook throws errors when a valid id is provided by default', () => {
  //   const sandFeathers = new SandFeathers({ message: String })
  //   const hooks = sandFeathers.hooks
  //   const createHook = hooks.before.create[0]
  //   expect(() => {
  //     createHook({ data: { message: 'hello :)', color: 'orange', _id: '123456789012' } })
  //   }).to.throw()
  // })
})
