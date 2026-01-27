from secure_python_utils import PasswordService

from src.infrastructure.log import logger

class HashService:
    @staticmethod
    def password_hash(password: str) -> str | None:
        try:    
            password_hash = PasswordService.hash(password)
            logger.info("Пароль успешно захеширован")
            return password_hash
        except Exception as e:
            logger.warning(f"Ошибка при хешировании пароля: {e}")
            return None
        
    @staticmethod
    def verify_password(
        stored_hash: str,
        password: str
    ) -> bool:
        try:
            if PasswordService.verify(
                stored_hash,
                password
            ):
                logger.info("Пароли совпадают")
                return True
            else:
                logger.info("Пароли не совпадают")
                return False
            
        except Exception as e:
            logger.warning(f"Ошибка при верификации пароля: {e}")
            return False
    
        
    
            
        