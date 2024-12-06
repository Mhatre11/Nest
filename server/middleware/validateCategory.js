export const validateCategory = (req, res, next) => {
    const { name, description } = req.body;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Category name must be at least 2 characters long'
        });
    }

    // Validate description if provided
    if (description && (typeof description !== 'string' || description.trim().length < 10)) {
        return res.status(400).json({
            success: false,
            message: 'Category description must be at least 10 characters long'
        });
    }

    // If image is required but not provided
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Category image is required'
        });
    }

    next();
};
