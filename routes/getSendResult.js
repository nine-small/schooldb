exports.getErr = function (err = "server internal error", code = 500) {
    return {
        code,
        msg: err
    }
}

exports.getResult = function (data) {
    return {
        code: 0,
        msg: "success",
        data
    }
}

exports.asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            res.send(exports.getResult(result))
        } catch (err) {
            next(err);
        }
    }
}