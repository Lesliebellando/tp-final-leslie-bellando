# 🐾 CURL API - TP Intermedio

Guía completa de todos los endpoints con ejemplos de cURL listos para usar.

## 🔑 REEMPLAZOS NECESARIOS

Antes de ejecutar los curls, reemplaza estos valores:

- `{{TOKEN}}` → El token JWT que obtienes en Login
- `{{ID_MASCOTA}}` → El `_id` de una mascota (ej: `64a1b2c3d4e5f6g7h8i9j0k1`)
- `{{ID_REGISTRO}}` → El `_id` de un registro médico

**Base URL:** `http://localhost:3000/api`

---

## 🔐 AUTENTICACIÓN

### 1. Registrar usuario (POST /auth/register)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "VetUser",
    "email": "vet@correo.com",
    "password": "Password123!"
  }'
```

**Respuesta:** Devuelve los datos del usuario creado

---

### 2. Login (POST /auth/login)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vet@correo.com",
    "password": "Password123!"
  }'
```

## **Respuesta:** Devuelve `{"token": "eyJhbGc..."}` - Copia este token para usarlo en los siguientes endpoints

## 🐶 MASCOTAS

### 3. Crear mascota (POST /pets)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "nombre": "Toby",
    "especie": "Perro",
    "raza": "Golden Retriever",
    "fechaNacimiento": "2021-08-15",
    "nombreDueno": "Carlos Rodriguez",
    "telefonoDueno": "3796789012"
  }'
```

**Parámetros obligatorios:**

- `nombre` (string, min 2 caracteres)
- `especie` (string)
- `nombreDueno` (string, min 3 caracteres)
- `telefonoDueno` (string)

**Parámetros opcionales:**

- `raza` (string)
- `fechaNacimiento` (date, formato: YYYY-MM-DD)

---

### 4. Listar todas las mascotas (GET /pets)

**Requiere:** Autenticación

```bash
curl -X GET http://localhost:3000/api/pets \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

### 5. Ver mascota por ID (GET /pets/:id)

**Requiere:** Autenticación

```bash
curl -X GET http://localhost:3000/api/pets/{{ID_MASCOTA}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

### 6. Actualizar mascota (PUT /pets/:id)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X PUT http://localhost:3000/api/pets/{{ID_MASCOTA}} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "nombre": "Toby",
    "especie": "Perro",
    "raza": "Golden Retriever",
    "fechaNacimiento": "2021-08-15",
    "nombreDueno": "Carlos Rodriguez",
    "telefonoDueno": "3796789999"
  }'
```

## Enviar todos los campos

### 7. Eliminar mascota (DELETE /pets/:id)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X DELETE http://localhost:3000/api/pets/{{ID_MASCOTA}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

## 📋 REGISTROS MÉDICOS

### 8. Crear registro médico (POST /medical-records)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X POST http://localhost:3000/api/medical-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "petId": "{{ID_MASCOTA}}",
    "descripcion": "Paciente presenta decaimiento. Se realiza control de temperatura y signos vitales.",
    "fecha": "2026-02-04"
  }'
```

**Parámetros obligatorios:**

- `petId` (string, debe ser un ObjectId válido)
- `descripcion` (string, entre 10 y 500 caracteres)

**Parámetros opcionales:**

- `fecha` (date, formato: YYYY-MM-DD, default: fecha actual)

---

### 9. Ver registros de una mascota (GET /medical-records/pet/:petId)

**Requiere:** Autenticación

```bash
curl -X GET http://localhost:3000/api/medical-records/pet/{{ID_MASCOTA}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

### 10. Ver registro médico por ID (GET /medical-records/:id)

**Requiere:** Autenticación

```bash
curl -X GET http://localhost:3000/api/medical-records/{{ID_REGISTRO}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

### 11. Actualizar registro médico (PUT /medical-records/:id)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X PUT http://localhost:3000/api/medical-records/{{ID_REGISTRO}} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "descripcion": "Actualización: El paciente respondió bien al tratamiento. Mejoró significativamente.",
    "fecha": "2026-02-04"
  }'
```

**Parámetros opcionales (actualizar):**

- `descripcion` (string, entre 10 y 500 caracteres)
- `fecha` (date, formato: YYYY-MM-DD)

---

### 12. Eliminar registro médico (DELETE /medical-records/:id)

**Requiere:** Autenticación | **Rol:** Admin

```bash
curl -X DELETE http://localhost:3000/api/medical-records/{{ID_REGISTRO}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

## 📝 EJEMPLO DE FLUJO COMPLETO

### Paso 1: Registrarse

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "DrVet",
    "email": "drvet@hospital.com",
    "password": "SecurePass123!"
  }'
```

### Paso 2: Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "drvet@hospital.com",
    "password": "SecurePass123!"
  }'
```

**Copiar el token de la respuesta**

### Paso 3: Crear mascota (reemplaza {{TOKEN}} con tu token)

```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "nombre": "Rocky",
    "especie": "Perro",
    "raza": "Boxer",
    "fechaNacimiento": "2022-01-12",
    "nombreDueno": "Sofia Martinez",
    "telefonoDueno": "3795554321"
  }'
```

**Copiar el `_id` de la respuesta como {{ID_MASCOTA}}**

### Paso 4: Crear registro médico

```bash
curl -X POST http://localhost:3000/api/medical-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "petId": "{{ID_MASCOTA}}",
    "descripcion": "Primera revisión: Perro de 2 años en excelente estado de salud. Vacunación al día. Se recomienda revisión anual.",
    "fecha": "2026-02-04"
  }'
```

### Paso 5: Ver historial de la mascota

```bash
curl -X GET http://localhost:3000/api/medical-records/pet/{{ID_MASCOTA}} \
  -H "Authorization: Bearer {{TOKEN}}"
```

---

## ✅ CHECKLIST

- [ ] Registré usuario
- [ ] Hice login (copié el token)
- [ ] Creé mascota (copié el ID)
- [ ] Obtuve todas las mascotas
- [ ] Vi mascota por ID
- [ ] Actualizé mascota
- [ ] Creé registro médico
- [ ] Obtuve registros de una mascota
- [ ] Actualicé registro médico
- [ ] Eliminé registro médico
- [ ] Eliminé mascota

---

## 🔍 CÓDIGOS HTTP ESPERADOS

| Operación              | Código | Descripción                  |
| ---------------------- | ------ | ---------------------------- |
| POST (crear)           | 201    | Creado exitosamente          |
| GET (leer)             | 200    | OK                           |
| PUT (actualizar)       | 200    | Actualizado exitosamente     |
| DELETE                 | 200    | Eliminado exitosamente       |
| Error de autenticación | 401    | Token inválido o faltante    |
| Error de autorización  | 403    | Sin permisos (no eres admin) |
| No encontrado          | 404    | Recurso no existe            |
| Validación fallida     | 400    | Parámetros inválidos         |
| Error del servidor     | 500    | Error interno                |

---

**Última actualización:** 4 de febrero, 2026
