import z from "zod";

export const getErrorMessage = (err) => {
    let error = null;

    if (err.name === 'ZodError') {
        const errors = z.flattenError(err).fieldErrors;

        error = Object.values(errors).flat().at(0);
    } else if (err.name === 'PrismaClientKnownRequestError') {
        switch (err.code) {
            case 'P2002':
                error = 'Unique constraint error';
                break;  
            default:
                error = 'Database error';
        }
    } else {
        error = err || 'An unexpected error occurred';
    }

    return error;
}