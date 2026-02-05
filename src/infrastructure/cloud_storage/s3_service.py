from aiobotocore.session import get_session
from contextlib import asynccontextmanager
from botocore.config import Config
from fastapi import UploadFile

from src.config.s3_service_settings import settings
from src.infrastructure.log.logger import logger

class S3Client:
    def __init__(self):
        self.config = {
            "aws_access_key_id": settings.ACCESS_KEY,
            "aws_secret_access_key": settings.SECRET_KEY,
            "endpoint_url": settings.ENDPOINT_URL
        }
        self.bucket_name = settings.BUCKET_NAME
        self.session = get_session()
        
    @asynccontextmanager
    async def get_client(self):
        botocore_config = Config(
            request_checksum_calculation="when_required"
        )
        async with self.session.create_client(
            "s3", config=botocore_config, **self.config
        ) as client:
            yield client
            
    async def upload_photo_file(self, file: UploadFile):
        
        try:    
            file_content = await file.read()
            
            if not file.filename or not file.filename.strip() or not file_content:
                logger.error("Имя файла или содержание файла является пустым")
                raise ValueError("Имя файла или содержание файла является пустым")
            
            async with self.get_client() as s3:
                await s3.put_object(
                    Bucket=s3client.bucket_name,
                    Key=file.filename,
                    Body=file_content 
                )
                
            file_url = f"https://69ef73c9-213a-4522-92a6-a6c848f627f7.selstorage.ru/{file.filename}"
            logger.info("Файл успешно загружен")
            
            return file_url
        finally:
            await file.close()
            

s3client = S3Client()
