import { validate, ValidationError } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';

interface ValidationOptions {
    skipMissingProperties?: boolean;
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
}

// Custom validation middleware
export const validateDto = (
    dtoClass: any,
    target: 'body' | 'params' | 'query' = 'body',
    options: ValidationOptions = {}
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        (async () => {
            try {
                const validationOptions = {
                    skipMissingProperties: false,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    ...options
                };

                // Transform plain object to class instance
                const dto = plainToInstance(dtoClass, req[target], {
                    enableImplicitConversion: true,
                    excludeExtraneousValues: false
                });

                // Validate the DTO
                const errors: ValidationError[] = await validate(dto, validationOptions);

                if (errors.length > 0) {
                    // Format error messages
                    const errorMessages = formatValidationErrors(errors);

                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: errorMessages
                    });
                }

                // Only replace if it's not query (since query is read-only)
                if (target !== 'query') {
                    (req as any)[target] = dto;
                }

                next();
            } catch (error) {
                console.error('Validation middleware error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal validation error',
                    error: process.env.NODE_ENV === 'development' ? error : 'Unknown error'
                });
            }
        })();
    };
};

// Format validation errors for better readability
const formatValidationErrors = (errors: ValidationError[]): any[] => {
    const formattedErrors: any[] = [];

    const processError = (error: ValidationError, parentPath = '') => {
        const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;

        if (error.constraints) {
            formattedErrors.push({
                field: propertyPath,
                value: error.value,
                messages: Object.values(error.constraints)
            });
        }

        if (error.children && error.children.length > 0) {
            error.children.forEach(childError => {
                processError(childError, propertyPath);
            });
        }
    };

    errors.forEach(error => processError(error));
    return formattedErrors;
};

// Middleware for multiple validations (body + params + query)
export const validateMultiple = (...validations: ReturnType<typeof validateDto>[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        let currentIndex = 0;

        const runNextValidation = (): void => {
            if (currentIndex >= validations.length) {
                return next();
            }

            const currentValidation = validations[currentIndex];
            currentIndex++;

            currentValidation(req, res, (error?: any) => {
                if (error) {
                    return next(error);
                }
                if (res.headersSent) {
                    return; // Response already sent (validation failed)
                }
                runNextValidation();
            });
        };

        runNextValidation();
    };
};