import { valid, resolveFormat, reconstructFormat, sanitize, ANY } from 'sandhands'
import autoBind from 'auto-bind'
import clone from 'clone'
import ObjectID from './ObjectID'

const optionsFormat = {
  _: {
    autoAddID: Boolean,
    allowIDUpload: Boolean,
    requirePatchID: Boolean
  },
  allOptional: true
}

const defaultOptions = {
  autoAddID: true,
  requirePatchID: true
}

class SandFeathers {
  constructor(format, handlerOptions) {
    this.handlerOptions = { ...defaultOptions, ...handlerOptions }
    sanitize(this.handlerOptions, optionsFormat)
    let resolvedFormat = resolveFormat(format)
    if (
      !valid(resolvedFormat, {
        _: {
          format: Object
        },
        strict: false
      })
    )
      throw new Error('Please supply an object for the format')
    if (resolvedFormat.format === Object) {
      resolvedFormat.format = {}
      resolvedFormat.options.strict = false
    }
    if (this.handlerOptions.autoAddID === true && !resolvedFormat.format.hasOwnProperty('_id')) {
      // Automatically append the format for the ID if it is not strictly assigned
      resolvedFormat.format._id = ObjectID
    }
    this.format = reconstructFormat(resolvedFormat)
    this.createFormat = clone(resolvedFormat)
    if (this.handlerOptions.allowIDUpload === false) {
      delete this.createFormat.format._id
    } else {
      if (!this.createFormat.options.hasOwnProperty('optionalProps'))
        this.createFormat.options.optionalProps = []
      if (!this.createFormat.options.optionalProps.includes('_id'))
        this.createFormat.options.optionalProps.push('_id')
    }
    this.createFormat = reconstructFormat(this.createFormat)
    this.queryFormat = clone(resolvedFormat)
    this.queryFormat.options.allOptional = true
    this.queryFormat = reconstructFormat(this.queryFormat)
    autoBind(this)
  }
  get hooks() {
    return {
      before: {
        all: [this.queryable],
        create: [this.create],
        patch: [this.patch],
        update: [this.handlerOptions.allowIDUpload !== false ? this.update : this.disabled]
      },
      after: {
        find: [this.find],
        get: [this.get]
      }
    }
  }
  queryable(context) {
    if (context.hasOwnProperty('query')) sanitize(context.query, this.queryFormat)
    return context
  }
  update(context) {
    sanitize(context.data, this.format)
    return context
  }
  create(context) {
    sanitize(context.data, this.createFormat)
    return context
  }
  patch(context) {
    sanitize(context.data, this.queryFormat)
    if (this.handlerOptions.requirePatchID === true && !context.data.hasOwnProperty('_id'))
      throw new Error('ID is required to patch')
    return context
  }
  get(context) {
    sanitize(context.result, this.format)
    return context
  }
  find(context) {
    context.result.data.forEach(datum => {
      sanitize(datum, this.format)
    })
    return context
  }
  disabled() {
    throw new Error('This method has been disabled!')
  }
}

export default SandFeathers
