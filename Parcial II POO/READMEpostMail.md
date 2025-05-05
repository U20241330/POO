# 📦 POSTMAIL API

## 📌 Descripción
Esta API permite gestionar envíos, administrar créditos de usuarios y registrar productos asociados a los envíos. Los usuarios pueden comprar créditos para realizar envíos y consultar su saldo disponible.

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**  
```bash
git clone https://github.com/u20241330/POO.git
cd postmail-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar MongoDB**

Asegurarse de que MongoDB esté corriendo en `localhost:27017`.  
Se utilizan las colecciones `usuarios` y `envios`.

4. **Iniciar el servidor**
```bash
node server.js
```

---

## 📡 Endpoints de la API

### ✅ Consultar créditos de un usuario  
📌 `GET /api/usuario/:id/credito`  
🔹 Obtiene el número de créditos disponibles para envíos.

**Ejemplo de uso:**
```
GET http://localhost:3000/api/usuario/u2025/credito
```

**Respuesta esperada:**
```json
{
  "credito": 30
}
```

---

### ✅ Comprar créditos para envíos  
📌 `POST /api/usuario/:id/comprar-creditos`  
🔹 Permite al usuario comprar créditos según paquetes predefinidos.

**Ejemplo de uso:**
```
POST http://localhost:3000/api/usuario/u2025/comprar-creditos
```

**Cuerpo JSON:**
```json
{
  "paquete": "40"
}
```

**Respuesta esperada:**
```json
{
  "mensaje": "Créditos añadidos exitosamente",
  "nuevoCredito": 70
}
```

---

### ✅ Registrar un envío  
📌 `POST /api/envios`  
🔹 Crea un nuevo envío y descuenta créditos del usuario.

**Ejemplo de uso:**
```
POST http://localhost:3000/api/envios
```

**Cuerpo JSON:**
```json
{
  "usuarioId": "u2025",
  "nombre": "Vitelio Smith",
  "direccion": "Calle Principal #298",
  "telefono": "555-633339",
  "referencia": "Portón negro",
  "observacion": "Entregar antes de las 8 PM",
  "producto": {
    "descripcion": "Documentos importantes",
    "peso": 9,
    "bultos": 4,
    "fecha_entrega": "2025-05-07"
  }
}
```

**Respuesta esperada:**
```json
{
  "mensaje": "Envío registrado",
  "envio": { ... }
}
```

---

### ✅ Consultar envíos por usuario  
📌 `GET /api/envios/:usuarioId`  
🔹 Devuelve la lista de envíos registrados por el usuario.

**Ejemplo de uso:**
```
GET http://localhost:3000/api/envios/u2025
```

**Respuesta esperada:**
```json
[
  {
    "_id": "68182e807ca54f142771b114",
    "usuarioId": "u2025",
    "nombre": "Smith",
    "direccion": "Calle Principal #123",
    "telefono": "555-6789",
    "producto": { ... }
  }
]
```

---

### ✅ Eliminar un envío y reembolsar créditos  
📌 `DELETE /api/envios/:envioId`  
🔹 Borra un envío y devuelve créditos al usuario.

**Ejemplo de uso:**
```
DELETE http://localhost:3000/api/envios/68182e807ca54f142771b114
```

**Respuesta esperada:**
```json
{
  "mensaje": "Envío eliminado y crédito reembolsado"
}
```

---

## 📌 Consideraciones finales

✅ Los créditos representan envíos disponibles.  
✅ El costo de cada envío depende de peso y bultos.  
✅ Los créditos se descuentan correctamente en cada transacción.  
✅ Los envíos pueden ser consultados, eliminados y registrados con facilidad.
