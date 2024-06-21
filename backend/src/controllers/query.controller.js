import { Query } from "../models/query.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { handleError } from "../utils/handleError.util.js";
import { apiResponse } from "../utils/response.util.js";



export const formData = asyncHandler(async (req, res) => {
     const { username, phone, email, message, district, state, queryType } = req.body
     if ([username, phone, email, message, district, state, queryType].some((field) => String(field)?.trim() === "")) {
          throw new handleError(400, 'Details are incomplete');
      }
     const alreadySent = await Query.findOne({ email: email })
     if (alreadySent) throw new handleError(400, 'You cannot sent query with the same email')

     const saveQuery = await Query.create({
          username,
          phone,
          email,
          district,
          state,
          queryType,
          message
     })
     return res.status(200).json(new apiResponse(
          200,
          "Query Sent Successfully",
               saveQuery
     ))
})