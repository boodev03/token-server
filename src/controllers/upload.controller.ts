import { Request, Response } from 'express';
import multer from 'multer';
import r2Service from '../services/r2.service';

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    },
});

class UploadController {
    // Upload single image
    uploadImage = upload.single('image');

    async handleImageUpload(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
                return;
            }

            // Validate file
            const validation = r2Service.validateFile(req.file);
            if (!validation.isValid) {
                res.status(400).json({
                    success: false,
                    message: validation.error
                });
                return;
            }

            // Upload to R2
            const fileUrl = await r2Service.uploadFile(
                req.file.buffer,
                req.file.originalname,
                req.file.mimetype
            );

            res.json({
                success: true,
                message: 'File uploaded successfully',
                data: {
                    url: fileUrl,
                    filename: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                }
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to upload file',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    // Generate presigned URL for direct upload
    async generateUploadUrl(req: Request, res: Response): Promise<void> {
        try {
            const { fileName, contentType } = req.body;

            if (!fileName || !contentType) {
                res.status(400).json({
                    success: false,
                    message: 'fileName and contentType are required'
                });
                return;
            }

            const result = await r2Service.generatePresignedUploadUrl(fileName, contentType);

            res.json({
                success: true,
                message: 'Upload URL generated successfully',
                data: result
            });
        } catch (error) {
            console.error('Generate URL error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to generate upload URL',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    // Delete image
    async deleteImage(req: Request, res: Response): Promise<void> {
        try {
            const { fileUrl } = req.body;

            if (!fileUrl) {
                res.status(400).json({
                    success: false,
                    message: 'fileUrl is required'
                });
                return;
            }

            const deleted = await r2Service.deleteFile(fileUrl);

            if (deleted) {
                res.json({
                    success: true,
                    message: 'File deleted successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'File not found or failed to delete'
                });
            }
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete file',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}

export default new UploadController();