import { valid, resolveFormat, reconstructFormat, sanitize, ANY } from 'sandhands'
import autoBind from 'auto-bind'
import { ObjectID } from 'mongodb'

const optionsFormat = {
  _: {
    allowIDs: Boolean
  },
  allOptional: true
}

const defaultOptions = {
  allowIDs: true
}

class SandFeathers {
  constructor(format, handlerOptions) {
    this.handlerOptions = { ...defaultOptions, ...handlerOptions }
    sanitize(this.handlerOptions, optionsFormat)
    this.resolvedFormat = resolveFormat(format)
    if (
      !valid(this.resolvedFormat, {
        _: {
          format: Object
        },
        strict: false
      })
    )
      throw new Error('Please supply an object for the format')
    if (this.resolvedFormat.format === Object) {
      this.resolvedFormat.format = {}
      this.resolvedFormat.options.strict = false
    }
    if (this.handlerOptions.allowIDs && !this.resolvedFormat.format.hasOwnProperty('_id')) {
      // Automatically append the format for the ID if it is not strictly assigned
      this.resolvedFormat.format._id = { _: ANY, validate: value => ObjectID.isValid(value) }
    }
    this.format = reconstructFormat(this.resolvedFormat)
    this.queryFormat = { ...this.resolvedFormat, options: { ...this.resolvedFormat.options } }
    this.queryFormat.options.allOptional = true
    this.queryFormat = reconstructFormat(this.queryFormat)
    autoBind(this)
  }
  get hooks() {
    return {
      before: {
        all: [this.queryable],
        create: [this.uploadable],
        patch: [this.patchable],
        update: [this.uploadable]
      },
      after: {
        find: [this.arrayReturnable],
        get: [this.returnable]
      }
    }
  }
  queryable(context) {
    sanitize(context.query, this.queryFormat)
    return context
  }
  uploadable(context) {
    sanitize(context.data, this.format)
    return context
  }
  patchable(context) {
    sanitize(context.data, this.queryFormat)
  }
  returnable(context) {
    if (context.hasOwnProperty('result')) sanitize(context.result, this.format)
  }
  arrayReturnable(context) {
    if (context.hasOwnProperty('result')) {
      context.result.data.forEach(datum => {
        sanitize(datum, this.format)
      })
    }
  }
}

export default SandFeathers
