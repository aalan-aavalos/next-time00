# NextTime
## Descripcion del proyecto 
El proyecto consiste en el desarrollo de una aplicación web que permita gestionar el registro de empleados y sus asignaciones (rol) en una empresa con de más de 4,000 trabajadores. La aplicación esta diseñada utilizando la biblioteca de React con el framework de Next, y se integrará con una librería de Gantt para la visualización de los horarios de manera eficiente y amigable.

El objetivo de la aplicación es optimizar la gestión del personal, permitiendo registrar los datos de los empleados, sus contratos laborales, horarios de trabajo, asignaciones a diferentes sedes y áreas, así como también la solicitud de vacaciones la ultima semana de cada mes y la programación de periodos de training. Todo esto con el fin de facilitar la planificación de recursos humanos y asegurar una adecuada distribución de tareas.

Características Clave del Proyecto:

Registro de Empleados: La aplicación permitirá a los administradores registrar nuevos empleados, así como también realizar modificaciones en la información de los existentes, como datos personales, contrato laboral, y documentos asociados.

Gestión de Horarios: Los empleados podrán solicitar el horario de trabajo deseado para el próximo mes(habilitandose una semana antes), tomando en cuenta los turnos disponibles según su contrato. El sistema generará automáticamente el horario mensual basándose en las preferencias del empleado y evitando conflictos con periodos de vacaciones o training.

Visualización de Horarios en formato Gantt: La aplicación utilizará una librería de Gantt para mostrar de manera visual y estructurada los horarios de trabajo de los empleados, facilitando así la comprensión y planificación de las asignaciones, esta se podra visualizar por medio de el envio de un correo.

Gestión de Vacaciones: Los empleados podrán solicitar vacaciones a través de la aplicación, y los administradores podrán aprobar o rechazar dichas solicitudes, manteniendo un control centralizado de los periodos de ausencia, se les mandara un correo con el estatus de su peticion.

Gestión de Training: Los administradores podrán programar periodos de training para los empleados, los cuales serán integrados automáticamente en el calendario de trabajo, evitando asignaciones conflictivas.

Roles de Usuario: La aplicación contará con diferentes roles de usuario, como administradores con privilegios para gestionar empleados y horarios, y empleados con acceso limitado para ver su propio horario y solicitar vacaciones.

Carga Masiva de Empleados: Se implementará la funcionalidad de carga masiva de empleados mediante archivos en formatos .xlsx, .json, y/o .csv, lo que permitirá una rápida incorporación de nuevos trabajadores a la base de datos.

## Lista de requisitos priorizada del proyecto refinada
Historias de usuario
HU-1
Como super administrador, quiero añadir sedes y áreas de trabajo para ampliar las opciones en caso de que surjan nuevas sedes o áreas.
Pantalla donde haya opciones y campos para agregar esas sedes y áreas
HU-2
Como super administrador, quiero registrar nuevos administradores para gestionar eficientemente los roles y responsabilidades dentro del sistema.
HU-3
Como super administrador, quiero registrar y editar información de los empleados para mantener actualizada la base de datos de empleados y sus roles.
HU-4
Como super administrador, quiero editar los horarios para adaptar eficientemente los tiempos de trabajo según las necesidades de los usuarios.
HU-5
Como super administrador, quiero aceptar horarios para poder garantizar un control eficiente de los tiempos de trabajo de los empleados y asegurar la correcta operación de la aplicación.
HU-6
Como super Administrador, quiero poder aceptar periodo de vacaciones de los empleados  para tener un mejor control de las vacaciones dadas en cada sede y las fechas asignadas, controlando las fechas(vacaciones rechazadas debido a los días que hay training )
HU-7
Como super Administrador, quiero administrar tokens generados para los usuarios, para poder tener un control total del los permisos temporales que se les otorgan a los usuarios con respecto a los tokens 
HU-8
Como super administrador, quiero visualizar todos los horarios mediante un gráfico de Gantt,quiero tener la capacidad de visualizar todos los horarios de manera eficiente y comprensible a través de un gráfico de Gantt. Esto me permitirá tener una visión clara y detallada de las actividades programadas en un periodo de tiempo específico.
HU-9
Como super administrador,quiero cargar una gran cantidad de usuarios al sistema por medio de varios formatos.Esto me permitirá agregar múltiples usuarios simultáneamente, ahorrando tiempo y esfuerzo en el proceso de incorporación de nuevos usuarios al sistema.
HU-10
Con el fin de gestionar los datos y usuarios provenientes de distintas sedes y gestionar las planeaciones futuras→,necesito una funcionalidad que me permita gestionar de manera eficiente los datos y usuarios provenientes de distintas sedes, con el objetivo de facilitar la planificación y gestión de actividades futuras
HU-11
Como super administrador quiero los permisos necesarios para poder cambiar a los empleados de sede o área para que de esta manera se puedan realizar cambios en caso de que sea necesario tomando en cuenta las necesidades de la empresa y la comodidad del empleado.
HU-12
Como administrador, quiero los permisos necesarios para agregar nuevos empleados con el propósito de que al contratar nueva gente pueda registrarlos.

HU-13
Como administrador, quiero poder aceptar las solicitudes tanto de horarios del turno como de vacaciones con el fin de tener un control sobre los permisos de los empleados.
HU-14
Como administrador, quiero que el sistema me permita registrar periodos de training dentro de los calendarios de los empleados con el fin de especificar fechas para capacitaciones.
HU-15
Como administrador, quiero los permisos necesarios para poder hacer modificaciones en los horarios de los empleados con la finalidad de poder atender diferentes tintos de situaciones en las que se requiera hacer cambios en los horarios ya sean problemas por la 
empresa o del empleado.
HU-16
Como administrador, quiero tener la capacidad de mover a los trabajadores a distintas áreas de trabajo para tener la facilidad de cambiar de área a algún usuario en caso de ser requerido.
HU-17
Como usuario, quiero ver los horarios de todos los días del mes asignado, ver los periodos de training y verlos de forma gráfica para tener una visualización de manera gráfica futuras planeaciones.
HU-18
Como usuario, quiero poder solicitar un cambio de turno para el próximo mes, una semana antes de que acabe el mes actual para poder adaptarme a los horarios.
HU-19
Como usuario, quiero poder solicitar vacaciones a través de la aplicación dentro de los plazos disponibles para tener un control de las vacaciones disponibles.
HU-20
Como usuario, quiero acceder a toda mi información como horarios, periodos de training, solicitudes de cambio de área o sede, solicitudes de vacaciones todo a través de un token generado y recibido por correo o mensaje sms para poder visualizar y acceder de una forma fácil y segura.




## Instalacion
 `npm install`
## Uso
 `npm run dev`
 ## Creacion de componentes o paginas
 - Crear una carpeta con el nombre de la ruta, dentro de esta crear un archivo `.jsx` con el nombre
 
