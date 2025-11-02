# 00154324_practica8_secci-n1

### ¿Cuál es la diferencia entre autenticación y autorización?
**Autenticación (Authentication):**
- Verifica **QUIÉN ERES** - identifica al usuario
- Ejemplo: Login con email y contraseña
- En esta API: Endpoint `/signin` que valida credenciales

**Autorización (Authorization):**
- Verifica **QUÉ PUEDES HACER** - permisos del usuario
- Ejemplo: Acceder a rutas protegidas con token JWT
- En esta API: Middleware `verifyToken` que protege rutas CRUD

### ¿Cuál es la función del token JWT en la guía?
En mi implementación, el token JWT funciona cuando hago login en /signin, recibo un token. Este token lo uso en el header Authorization: Bearer [token] para acceder a todas las rutas de usuarios (/users, /users/:id). Sin el token, el sistema me devuelve error 403. Con el token, puedo hacer todas las operaciones CRUD de forma segura.
