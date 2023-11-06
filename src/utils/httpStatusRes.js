const resStatus = {
  NOT_FOUND: 404,
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

const httpResStatus = (status) => resStatus[status] || resStatus.INTERNAL_SERVER_ERROR;

module.exports = httpResStatus;