import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

dotenv.config();

class R2Service {
    private s3Client: S3Client;
    private bucketName: string;
    private publicUrl: string;

    constructor() {
        this.bucketName = process.env.R2_BUCKET_NAME || 'token-images';
        this.publicUrl = process.env.R2_PUBLIC_URL || '';

        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
                accountId: process.env.R2_ACCOUNT_ID || '',
            },
        });
    }

    // Upload file to R2
    async uploadFile(file: Buffer, fileName: string, contentType: string): Promise<string> {
        try {
            const fileExtension = path.extname(fileName);
            const uniqueFileName = `${uuidv4()}${fileExtension}`;
            const key = `tokens/${uniqueFileName}`;

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file,
                ContentType: contentType,
                CacheControl: 'public, max-age=31536000', // 1 year cache
            });

            await this.s3Client.send(command);

            // Return public URL
            return `${this.publicUrl}/${key}`;
        } catch (error) {
            console.error('Error uploading file to R2:', error);
            throw new Error('Failed to upload file');
        }
    }

    // Delete file from R2
    async deleteFile(fileUrl: string): Promise<boolean> {
        try {
            // Extract key from URL
            const key = fileUrl.replace(`${this.publicUrl}/`, '');

            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            await this.s3Client.send(command);
            return true;
        } catch (error) {
            console.error('Error deleting file from R2:', error);
            return false;
        }
    }

    // Generate presigned URL for direct upload from frontend
    async generatePresignedUploadUrl(fileName: string, contentType: string): Promise<{
        uploadUrl: string;
        fileUrl: string;
        key: string;
    }> {
        try {
            const fileExtension = path.extname(fileName);
            const uniqueFileName = `${uuidv4()}${fileExtension}`;
            const key = `tokens/${uniqueFileName}`;

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                ContentType: contentType,
            });

            const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 }); // 1 hour
            const fileUrl = `${this.publicUrl}/${key}`;

            return {
                uploadUrl,
                fileUrl,
                key
            };
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            throw new Error('Failed to generate upload URL');
        }
    }

    // Validate file type and size
    validateFile(file: Express.Multer.File): { isValid: boolean; error?: string } {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.mimetype)) {
            return {
                isValid: false,
                error: 'Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.'
            };
        }

        if (file.size > maxSize) {
            return {
                isValid: false,
                error: 'File size too large. Maximum size is 5MB.'
            };
        }

        return { isValid: true };
    }
}

export default new R2Service();