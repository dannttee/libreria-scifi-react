Librería Sci‑Fi Terror – APIs e Integración
Aplicación web de e‑commerce que conecta un frontend en React con un backend Spring Boot y una base de datos relacional. La solución implementa comunicación REST para gestionar usuarios, productos, pedidos y pagos, cumpliendo el objetivo de integrar lógica de negocio, persistencia y seguridad en una misma plataforma.​​

Arquitectura general
La arquitectura se compone de tres capas principales:​

Frontend web (este repositorio): SPA en React que maneja navegación, carrito de compras, checkout y visualización de compras realizadas.

Backend principal (Spring Boot): expone APIs REST versionadas, conecta con la base de datos relacional y centraliza la lógica de negocio (usuarios, productos, pedidos).​​

Microservicio de pagos: servicio independiente responsable de procesar pagos y registrar el estado de cada transacción asociada a un pedido.​

La comunicación entre frontend y backend se realiza mediante llamadas fetch/axios a endpoints HTTP protegidos según corresponda (por ejemplo, rutas de registro / login y operaciones de compra).​​

APIs consumidas desde el frontend
El frontend consume tres grupos de endpoints, documentados también en Swagger en el backend:​

Servicio de usuarios

Operaciones típicas: registro, inicio de sesión y obtención de datos básicos del cliente autenticado.

La respuesta del login se utiliza para guardar la sesión del usuario en el frontend (por ejemplo, token o datos mínimos de perfil).

Servicio de productos

Permite listar productos disponibles, ver detalle de un producto y utilizarlos para armar el carrito de compras en React.​

El frontend usa estas respuestas para renderizar catálogos, fichas y subtotal en el carrito.

Servicio de pedidos y pagos

Al confirmar la compra en el componente Comprar.jsx, el frontend crea un pedido y guarda su identificador (pedidoId) junto con el resumen de la compra en localStorage.

Luego se llama al microservicio de pagos, por ejemplo:

POST /api/v1/pagos/procesar/{pedidoId}?monto={total}&metodoPago={metodo}

GET /api/v1/pagos/pedido/{pedidoId} para consultar el detalle del pago y mostrarlo en la pantalla de pago exitoso.
Estas rutas siguen el patrón recomendado por Spring Boot para ejecutar y consultar operaciones de negocio mediante HTTP.​

Flujo de integración frontend–backend
El flujo principal de la aplicación es el proceso de compra de un cliente:​

El usuario navega por el catálogo (servicio de productos) y agrega ítems al carrito mantenido en el estado de React y en localStorage.

En la vista de checkout, el usuario completa sus datos personales y de despacho; el frontend valida campos obligatorios y correo con dominios permitidos.

Al confirmar, el frontend crea un pedido en el backend, calcula el total y guarda en localStorage un objeto de compra con pedidoId, datos del cliente, dirección, productos y monto total.

Con el mismo pedidoId se invoca al microservicio de pagos para procesar el pago y registrar la transacción.

Finalmente, la pantalla de pago exitoso lee la última compra desde localStorage, consulta al microservicio el detalle del pago y muestra al usuario tanto la información local (resumen de pedido) como la información oficial registrada en backend.

Este diseño asegura que el identificador de pedido sea consistente entre frontend, backend principal y microservicio de pagos, lo que facilita trazabilidad y pruebas.​

Pruebas y verificación de la comunicación
Para validar la integración se utilizaron las siguientes estrategias:​

Swagger / OpenAPI: el backend expone la documentación de los endpoints REST, lo que permite probar las rutas de usuarios, productos, pedidos y pagos directamente desde la interfaz web de Swagger.​

Herramientas del navegador (pestaña Network): durante una compra se inspeccionan las peticiones POST y GET hacia los endpoints de pedidos y pagos, verificando URLs, parámetros, códigos de estado HTTP y cuerpos de respuesta.

Pruebas funcionales end‑to‑end: se recorrió el flujo completo (registro / login, navegación por productos, carrito, checkout, pago y visualización de compra realizada) confirmando que los datos mostrados en React coinciden con los registrados en la base de datos a través del backend.

Implementacion de API meteorologico para los pedidos
