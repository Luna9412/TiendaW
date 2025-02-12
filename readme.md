# NOTAS DEL PROYECTO
- Tener en cuenta si no corre el node js habilitar ejecución de scripts en win 11
- Ejecutamos la consola en modo administrador: Set-ExecutionPolicy Unrestricted
- Otra opcion es: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


========================================================

- Usaremos 2 arquitecturas origentada a servicios (API REST) para el backend
- Internamente usaremos MVC (Tenga en cuenta que las vistas se reemplazan por rutas)

1. Creamos las carpetas para el MVC (controllers, model, routes)
2. Instalamos los paquetes base: npm i nodemon express cors mongoose

* Documentación de Mongo
- [MongoDB documentación](https://www.mongodb.com/docs/manual/reference/method/)
- Mongoose (Librería que interactua entre node js y mongoDB): https://mongoosejs.com/docs/