# Challenge Koibanx

API realizada como parte del challenge Back End de Koibanx. La misma cuenta con validaciones de formularios, test unitarios, manejador de errores, etc...

## Comandos para correr el proyecto.
  -----------------   ------------------------------------------------------
| Comando            | Descripcion                                            |
| -----------------  | ------------------------------------------------------ |
| npm i              | Instalar las dependecias del proyecto                  |
| mongod             | Conectarse a Mongo localmente                          |
| npm start          | Para correr el proyecto                                |
| nodemon            | Para correr el proyecto en desarrollo                  |
| npm test           | Para ejecutar los test unitarios                       |
  -----------------   ------------------------------------------------------
## Como probar la API

La Api fue probada en Postman. Para poder probar la Api se deberá ejecutar el archivo Koibanx.postman_collection.json con Postman.
Para realizar pedidos a la Api, se deberá ejecutar la ruta POST Login User, la cual nos devolverá un token. El cual copiaremos e insertaremos 
en los headers en la propiedad Authorization para hacer pedidos a las demas rutas.
