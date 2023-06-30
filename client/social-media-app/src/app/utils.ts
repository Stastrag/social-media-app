import jwt_decode from 'jwt-decode';

export function getUserIdByJwtToken(): string | null {
  const token = localStorage.getItem('userToken');
  if (token) {
    const tokenPayload = jwt_decode(token) as { id: string };
    const userId = tokenPayload.id;
    return userId;
  }
  return null;
}
