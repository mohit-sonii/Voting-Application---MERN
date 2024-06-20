
// inherit the default Error class functionalities and functions
class handleError extends Error {
     // defines the constructor function that initializes the new instance of 'ApiError'.it accepts three arguments one is error which will pass when it gets called, a default message and a statusCode
     constructor(error, message, statusCode, stack = '') {
          // it initialize the message property of teh Error class with the provided message
          super(message)
          // this.message = message //already done in super but just for clearification
          this.success = false
          this.statusCode = statusCode
          this.error = error
          this.data = null
          if (stack) this.stack = stack //if any stack is provided
          else Error.captureStackTrace(this, this.constructor) // if not then the stack trace will include the point where the ApiError was instantiated
     }
}

export { handleError }