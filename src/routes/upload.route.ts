import { Router } from 'express';
import uploadController from '../controllers/upload.controller';

const router = Router();

// Generate presigned URL for direct upload
router.post('/presigned-url', uploadController.generateUploadUrl);

// Delete image
router.delete('/image', uploadController.deleteImage);

export default router;