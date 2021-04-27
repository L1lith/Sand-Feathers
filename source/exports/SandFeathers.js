import { valid, resolveFormat, reconstructFormat, sanitize, ANY } from 'sandhands'
import autoBind from 'auto-bind'
import { ObjectID } from 'mongodb'
import clone from 'clone'

const optionsFormat = {
  _: {
    allowIDQueries: Boolean
  },
  allOptional: true
}

const defaultOptions = {
  allowIDQueries: true
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
    this.format = reconstructFormat(resolvedFormat)
    this.queryFormat = clone(resolvedFormat)
    this.queryFormat.options.allOptional = true
    if (this.handlerOptions.allowIDQueries && !this.queryFormat.format.hasOwnProperty('_id')) {
      // Automatically append the format for the ID if it is not strictly assigned
      this.queryFormat.format._id = { _: ANY, validate: value => ObjectID.isValid(value) }
    }
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
