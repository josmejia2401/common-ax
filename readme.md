# CommonAx o common-ax
Es una librería que define varios utilidades comunes en proyectos TypeScript (TS) y Javascript. Este librería tiene algunas funcionalidades que permiten el uso de AWS V3.

## Funciones
- _BaseModel.toObject_: Convierte un objeto a un objecto que pueda entender DynamoDb. Se debe heredar de la clase BaseMode.

    ### Sintaxis
    > BaseModel.toObject()

    ### Valor devuelto
    Un objeto compatible con DynamoDb. Este objeto puede ser usado para insertar registros en una tabla.

- _BaseModel.toQuery_: Devuelve un objeto que puede ser usado para realizar un query en la base de datos. Se debe heredar de la clase BaseMode.

    ### Sintaxis
    > BaseModel.toQuery()

    ### Valor devuelto
    Un objeto compatible con DynamoDb. Este objeto puede ser usado para buscar registros en una tabla.

- _BaseModel.toScan_: Devuelve un objeto que puede ser usado para realizar un query en la base de datos. Se debe heredar de la clase BaseMode.

    ### Sintaxis
    > BaseModel.toScan(string);

    | Atributo | Tipo | Requerido  | Descripción |
    | ------ | ------ | ------ | ------ |
    | conditional | String | No | Condicional para realizar la busqueda. Valores soportados: and y or. Por defecto es and. |

    ### Valor devuelto
    Un objeto compatible con DynamoDb. Este objeto puede ser usado para buscar registros en una tabla.

## Nuevas Características y/o cambios
- Mejoras en custom-error, ahora permite headers

## Instalación
Se requiere tener instalado [Node.js](https://nodejs.org/) v7+ para ejecutar.

```sh
npm install --save-dev common-ax
```

## Ejemplos #1 CRUD AWS _DYNAMODB_
```ts
// Ejemplo #1: Eliminar registro en aws dynamo
import { DynamoDb, BaseModel, MetadataDynamoResponse } from "common-ax";

//Se crea la clase que herede de BaseModel.
class UserModel extends BaseModel {
    public static readonly NAME_TABLE = "NOMBRE_DE_TABLA";
    public id: string;
    public username: string;
    public password: string;
    constructor(jsonData: any) {
        super();
        if (jsonData && jsonData.id) {
            this.id = jsonData.id;
        }
        if (jsonData && jsonData.username) {
            this.username = jsonData.username;
        }
        if (jsonData && jsonData.password) {
            this.password = jsonData.password;
        }
    }
}

//Se crea la instancia de aws dynamoDB.
const dynamoDb = DynamoDb.getInstance();
//Se realiza la conexion.
dynamoDb.connect();

//Se crea un metodo que realice la operacion de eliminación en dynamo.
async eliminar(input: UserModel): Promise<MetadataDynamoResponse> {
    const payload = {
        "Key": input.toObject()
    }
    const result = await dynamoDb.getOperation().delete(UserModel.NAME_TABLE, payload) as MetadataDynamoResponse;
    return result;
}

//Se crea un metodo que realice la operacion de actualizar en dynamo.
async actualizar(input: UserModel): Promise<MetadataDynamoResponse> {
    const result = await dynamoDb.getOperation().update(UserModel.NAME_TABLE, input.toUpdate()) as MetadataDynamoResponse;
    return result;
}

//Se crea un metodo que realice la operacion de insertar en dynamo.
async insertar(input: UserModel): Promise<MetadataDynamoResponse> {
    const result = await dynamoDb.getOperation().insert(UserModel.NAME_TABLE, input.toObject()) as MetadataDynamoResponse;
    return result;
}

//Se crea un metodo que realice la operacion de consultar por id en dynamo.
async consultarPorId(input: UserModel): Promise<any[]> {
    const results: any[] = await dynamoDb.getOperation().getById(UserModel.NAME_TABLE, input.toQuery());
    return result;
}

//Se crea un metodo que realice la operacion de consultar por filtros (or) en dynamo.
async consultarPorFiltrosOr(input: UserModel): Promise<any[]> {
    const results: any[] = await dynamoDb.getOperation().getByFilter(UserModel.NAME_TABLE, input.toDynamoScan('or'));
    return result;
}

//Se crea un metodo que realice la operacion de consultar por filtros (and) en dynamo.
async consultarPorFiltrosAnd(input: UserModel): Promise<any[]> {
    const results: any[] = await dynamoDb.getOperation().getByFilter(UserModel.NAME_TABLE, input.toDynamoScan('and'));
    return result;
}
```

## Ejemplos #2 Validaciones
```ts
// Ejemplo #1: Eliminar registro en aws dynamo
import { GeneralValidation, ObjectValidation } from "common-ax";

//isEmpty con string
console.log(GeneralValidation.isEmpty("string"));
//Salida
//false
console.log(GeneralValidation.isEmpty(""));
//Salida
//true

//isEmpty con array
console.log(GeneralValidation.isEmpty(["dato1"]));
//Salida
//false
console.log(GeneralValidation.isEmpty([]));
//Salida
//true

const obj = {"campo1": "valor1", "campo2": "valor2"};
console.log(ObjectValidation.objectValidate(obj, "campo1"));
//Salida
//Sin errores

console.log(ObjectValidation.objectValidate(obj, "campo3"));
//Salida
//Error: message: The field campo3 not found

```

## Pruebas
Ejecutar el comando:

```sh
npm test --maxWorkers=4
```

## License
MIT

## Otros
- Repositorio en Git: https://github.com/josmejia2401/common-ax
- Repositorio en Npm: https://www.npmjs.com/~josmejia.2401

**_Siempre gratis, siempre libre_**