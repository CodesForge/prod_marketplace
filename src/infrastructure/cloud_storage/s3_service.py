from aiobotocore.session import get_session
from contextlib import asynccontextmanager
from botocore.config import Config
from src.config.s3_service_settings import settings

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
            
    async def upload_file(self, file_path, object_name = None):
        if object_name is None:
            object_name = file_path.split("/")[-1]
            
        async with self.get_client() as client:
            with open(file_path, "rb") as file:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=object_name,
                    Body=file
                )

s3client = S3Client()
