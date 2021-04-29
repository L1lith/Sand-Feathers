const { expect } = require('chai')
const { SandFeathers } = require('../dist/SandFeathers')

const baseKeys = ['before', 'after'] // Defining the expected Object structure
const keyMaps = {
  before: ['all', 'create', 'patch', 'update'],
  after: ['find', 'get']
}

describe('The SandFeathers class should function correctly', () => {
  it('The library exports the SandFeathers class', () => {
    //expect(SandFeathersLib).to.have.a.property('SandFeathers')
    expect(SandFeathers).to.be.a('function')
  })
  it('SandFeathers can be initialized successfully with a basic format', () => {
    expect(() => {
      SandFeathers({ message: String })
    }).not.to.throw(TypeError)
  })
  it('SandFeathers provides the right set of hooks', () => {
    const sandFeathers = new SandFeathers({ message: String })
    const hooks = sandFeathers.hooks
    expect(hooks).to.be.a('object')
    expect(Object.keys(hooks).sort()).to.deep.equal(baseKeys.sort())
    baseKeys.forEach(baseKey => {
      const hookSet = hooks[baseKey]
      expect(hookSet).to.be.a('object')
      expect(Object.keys(hooks[baseKey]).sort()).to.deep.equal(keyMaps[baseKey].sort())
      Object.values(hookSet).forEach(hooks => {
        expect(hooks).to.be.a('array')
        hooks.forEach(hook => {
          expect(hook).to.be.a('function')
        })
      })
    })
  })
})
