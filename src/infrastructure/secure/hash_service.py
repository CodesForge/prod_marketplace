from secure_python_utils import PasswordService

from src.infrastructure.log.logger import logger

class HashService:
    """Password hashing and verification helpers.

    Wraps `PasswordService` and provides convenience methods for hashing and
    verifying passwords.
    """
    @staticmethod
    def password_hash(password: str) -> str | None:
        """Hash a plaintext password.

        Returns:
            The hashed password string, or `None` if hashing fails.
        """
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
        """Verify a plaintext password against a stored hash.

        Returns:
            True if the password matches the stored hash, otherwise False.
        """
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
