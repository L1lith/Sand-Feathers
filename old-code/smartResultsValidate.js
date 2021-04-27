function smartResultsValidate(context, sanitationArgs) {
  const data = context.result
  if (context.method === 'find') {
    data.data.forEach(datum => {
      sanitize(datum, ...sanitationArgs)
    })
  } else {
    sanitize(data, ...sanitationArgs)
  }
}

export default smartResultsValidate
