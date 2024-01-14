const validate = (schema) => async(req, res, next) => {
    try{

        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();

    } catch(err){
        res.status(400).json(
            err.error
        )
    }
}

module.exports = validate;