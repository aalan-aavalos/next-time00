# NextTime

## Integrantes
1. Alan de Jesus Avalos Negrete
2. Josué Miguel Ortiz Meza
3. Karime Alejandra Caballero Campos
4. Fernando Moncada Juárez


## Descripcion del proyecto 
El proyecto consiste en el desarrollo de una aplicación web que permita gestionar el registro de empleados y sus asignaciones (rol) en una empresa con de más de 4,000 trabajadores. La aplicación esta diseñada utilizando la biblioteca de React con el framework de Next, y se integrará con una librería de Gantt para la visualización de los horarios de manera eficiente y amigable.

El objetivo de la aplicación es optimizar la gestión del personal, permitiendo registrar los datos de los empleados, sus contratos laborales, horarios de trabajo, asignaciones a diferentes sedes y áreas, así como también la solicitud de vacaciones la ultima semana de cada mes y la programación de periodos de training. Todo esto con el fin de facilitar la planificación de recursos humanos y asegurar una adecuada distribución de tareas.

Características Clave del Proyecto:

1. Registro de Empleados: La aplicación permitirá a los administradores registrar nuevos empleados, así como también realizar modificaciones en la información de los existentes, como datos personales, contrato laboral, y documentos asociados.
2. Gestión de Horarios: Los empleados podrán solicitar el horario de trabajo deseado para el próximo mes(habilitandose una semana antes), tomando en cuenta los turnos disponibles según su contrato. El sistema generará automáticamente el horario mensual basándose en las preferencias del empleado y evitando conflictos con periodos de vacaciones o training.
3. Visualización de Horarios en formato Gantt: La aplicación utilizará una librería de Gantt para mostrar de manera visual y estructurada los horarios de trabajo de los empleados, facilitando así la comprensión y planificación de las asignaciones, esta se podra visualizar por medio de el envio de un correo.
4. Gestión de Vacaciones: Los empleados podrán solicitar vacaciones a través de la aplicación, y los administradores podrán aprobar o rechazar dichas solicitudes, manteniendo un control centralizado de los periodos de ausencia, se les mandara un correo con el estatus de su peticion.
5. Gestión de Training: Los administradores podrán programar periodos de training para los empleados, los cuales serán integrados automáticamente en el calendario de trabajo, evitando asignaciones conflictivas.
6. Roles de Usuario: La aplicación contará con diferentes roles de usuario, como administradores con privilegios para gestionar empleados y horarios, y empleados con acceso limitado para ver su propio horario y solicitar vacaciones.
7. Carga Masiva de Empleados: Se implementará la funcionalidad de carga masiva de empleados mediante archivos en formatos .xlsx, .json, y/o .csv, lo que permitirá una rápida incorporación de nuevos trabajadores a la base de datos.

## Lista de requisitos priorizada del proyecto refinada


### Historias de usuario y criterios de aceptación:

[![image](https://github.com/aalan-aavalos/next-time00/assets/137373510/73776d8a-e1b5-435d-a6c3-cb095630aaa2)](https://docs.google.com/document/d/1HPNxobW4rAUxpRBAwvDVttRNTLNKap02ttYNccn9-JQ/edit?usp=sharing)

link = https://docs.google.com/document/d/1HPNxobW4rAUxpRBAwvDVttRNTLNKap02ttYNccn9-JQ/edit?usp=sharing
### Diagrama de casos de Uso 
[![image](https://github.com/aalan-aavalos/next-time00/assets/137373510/5da9c4c2-2921-4bf7-8ca7-ac5ac041d85d)](https://docs.google.com/document/d/1ewmWOIntUtVSd-hdrq5G7CGpYuB8hd9r5KkVcQqRxZs/edit?usp=sharing)

link = https://docs.google.com/document/d/1ewmWOIntUtVSd-hdrq5G7CGpYuB8hd9r5KkVcQqRxZs/edit?usp=sharing 

### Diagrama de Actividades 
[![image](https://github.com/aalan-aavalos/next-time00/assets/137373510/0ad8cc48-e436-4428-b6ef-a3cf5a36f8a2)](https://docs.google.com/document/d/1w43kBwHU73Po9fwfCAL6qOy-r0bqMPrx3i-bh_yAgTU/edit?usp=sharing)

### Vistas de Usuario 


link = https://docs.google.com/document/d/1w43kBwHU73Po9fwfCAL6qOy-r0bqMPrx3i-bh_yAgTU/edit?usp=sharing
## Diagrama de Clases o modelo de la base de datos refinada


#### 1. Diagrama de clase o interfaces (Atributos o características, métodos) con relaciones entre clases 
#### 2. Modelo de la base de datos relacional o no relacional
#### 3. Estándar de la base de datos
#### 4 . Estándar de programación

[![image](https://github.com/aalan-aavalos/next-time00/assets/137373510/833f3a6a-6173-43a9-819d-58b0ebe24381)](https://docs.google.com/document/d/1ZXpi4wHfdCOIrhPTsFtNnE1EwB2f49Evh99Cj0NlXzs/edit?usp=sharing)


## Instalacion
 `npm install`
## Uso
 `npm run dev`
 ## Creacion de componentes o paginas
 - Crear una carpeta con el nombre de la ruta, dentro de esta crear un archivo `.jsx` con el nombre
 
