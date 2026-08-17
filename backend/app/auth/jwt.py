import os
from datetime import timezone, timedelta, datetime
from jose import jwt, JWTError

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TOKEN_EXPIRE = 60

def create_access_token(data: dict):
    payload = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE)

    payload.update({
        "exp": expire
    })

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def decode_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        employee_id = payload.get("sub")

        if employee_id is None:
            return None

        return int(employee_id)


    except JWTError as e:
        print("JWT ERROR:", e)
        return None


    except ValueError as e:
        print("VALUE ERROR:", e)
        return None