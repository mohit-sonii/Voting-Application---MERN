// response.util.js

class apiResponse {
     constructor(statusCode, message = "success", data) {
          this.statusCode = statusCode;
          this.message = message;
          this.data = data;
          this.success = statusCode < 400;
     }
}

export { apiResponse };
