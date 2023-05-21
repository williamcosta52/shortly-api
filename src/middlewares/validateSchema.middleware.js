export function validateSchema(schema){
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(422).send(error.details.map((e) => e.message));
        }
        next();
    };
}
export function validateUrl(urlSchema){
    return (req, res, next) => {
        const { url } = req.body;
        const validation = urlSchema.validate(
            {
                url: url
            }
        );
        if (validation.error){
            const errors = validation.error.details.map((d) => d.message);
			return res.status(422).send(errors);
        }
        next();
    }
}