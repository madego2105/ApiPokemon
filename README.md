# ApiPokemon
> _Creado por María Desirée González Manzanero_

>Proyecto final FPII DAM - Junio 2023


En este proyecto se recoge:
- Una API basada en Pokémon a modo de pokédex hecha en TypeScript (transpilada 
a JavaScript), con Node.js y Express.js
- Frontend para visulizar la API creado con React
- Documentación de la API creada con Swagger 
- Testeo de la API con Postman

Para poder ejecutar el proyecto en local, se debe hacer del siguiente modo.

# Levantar el servicio de la API 

Para poder levantar el servicio de la API en local se debe abrir la terminal del IDE,
y partir de la raíz del proyecto. Para construir el proyecto, lo primero que se 
debe hacer es crear la distribución, que genera el código de JavaScript transpilado, 
es decir, el código de TypeScript convertido a JavaScript para poder ejecutarse con 
Node.js. Solo debe ejecutarse en el caso de que sea la primera vez que se transpila 
el código de TypeScript o si se han realizado cambios en el mismo, si ninguna de 
estas dos casuísticas se cumple, se puede obviar ejecutarlo, ya que ya estaría hecha 
la ‘traducción’ del código. Se hace con el comando:

``` npx tsc ```


Una vez hecho esto, ya se puede ejecutar el siguiente comando para levantar el servicio
de la API en local:

``` node dist/index.js ```

# Listado de consultas

El listado de consultas que se pueden hacer es:
- Por nombre:
http://localhost:3000/name/{pokemonName}/
- Por ID:
http://localhost:3000/id/{id}/
- Por tipo:
http://localhost:3000/type/{pokemonType}/
- Listado de legendarios (true/false):
http://localhost:3000/legendary/{boolean}/
- El que tiene mayor valor:
http://localhost:3000/highest/{columnName}/
- El que tiene menor valor:
http://localhost:3000/lowest/{columnName}/
- Por generación:
http://localhost:3000/generation/{num}/


# Levantar el servicio de la aplicación (frontend)

Para poder levantar el servicio en local se debe abrir una nueva terminal (teniendo 
dos abiertas y en funcionamiento) en el IDE y apuntar a la carpeta de ‘frontend’, 
para ello se utilizará el siguiente comando:

``` cd ./src/frontend/ ```

Tras esto, se debe ejecutar el siguiente comando solo en el caso de que sea la 
primera vez que se ejecuta en la máquina o si se han realizado cambios en el 
código, ya que se encarga de construir de nuevo toda la aplicación, si ninguna 
de estas dos casuísticas se cumple, se puede obviar ejecutarlo (ya que ya estaría 
construida).

``` npm run build ```

Por último, se utiliza el siguiente comando para levantar el servicio.

``` nom run start ```

# Ejecución de pruebas de Postman con Newman

Se utiliza Newman para ejecutar los tests de la API. Se debe abrir el CMD
(no la PowerShell de Windows), navegar hasta la ruta donde se encuentra los archivos 
JSON relativos a Postman ejecutar el siguiente comando:

``` newman run api.json -e environment.json ```

