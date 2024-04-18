"use client";

import React, { useCallback, useEffect, useState } from "react";

import { DateTime } from "luxon";
import "gantt-schedule-timeline-calendar/dist/style.css";

let GSTC, gstc, state;

// Creo una funcion para saber cuantos dias tiene el mes actual
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Creo la funcion para generar los turnos a objtos separados por todo el mes
function generarObjetos(eCorreo, turno) {
  const date = new Date();

  const month = date.getMonth();
  const year = date.getFullYear();

  const daysPerMonth = daysInMonth(year, month + 1);

  // Obtengo los dias de trabajo y dias libres
  const [daysOnStr, daysOffStr] = turno.split("/");

  // Los convierto a entero
  const daysOn = parseInt(daysOnStr);
  const daysOff = parseInt(daysOffStr);

  // calculo la jornado total
  const journey = daysOn + daysOff;

  // Creo el arreglo que va a guardar los turnos
  const daysOfMonth = [];

  // Itero desde el 0 hasta el total de dias del mes
  for (let i = 0; i < daysPerMonth; i++) {
    // Si el modulo de el dia [i] sobre la jornada es menor o igual a los dias de trbajao menos 1 el tipo es trabajo
    // Esta constante es para saber si se desncansa o no ya que si le pasas los dias de desancaso y de traajo te  lo calcula
    const tipo = i % journey <= daysOn - 1 ? "trabalo" : "descanso";
    // Crea un objeto con los datos
    daysOfMonth.push({
      eCorreo: eCorreo,
      tipo: tipo,
      turno: turno,
      fechaI: new Date(year, month, i + 1, 2, 0, 0).toISOString(),
      fechaF: new Date(year, month, i + 1, 23, 59, 59).toISOString(),
    });
  }

  return daysOfMonth;
}

export default function GanttPage() {
  const [datosUsrs, setDatosUsrs] = useState([]);
  const [datosActivity, setatosActivity] = useState([]);

  console.log("Uno", datosActivity);
  // Traer datos de usuario
  useEffect(() => {
    const loadDataUsers = async () => {
      try {
        const usersResponse = await fetch("/api/usrs");

        if (!usersResponse.ok) {
          throw new Error("Error al obtener los datos");
        }

        const usersData = await usersResponse.json();

        setDatosUsrs(usersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadDataUsers();
  }, []);

  // Traer datos de las actividades
  useEffect(() => {
    const loadDataActivity = async () => {
      try {
        const activityResponse = await fetch("/api/actividades");

        if (!activityResponse.ok) {
          throw new Error("Error al obtener los datos");
        }

        const activityData = await activityResponse.json();

        setatosActivity(activityData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadDataActivity();
  }, []);

  // Aqui ejecuto la funcion por cada actividad del arreglo que sea turno

  console.log("Dos", datosActivity);
  // Funcion para inicializar la libreria
  async function initializeGSTC(element) {
    GSTC = (await import("gantt-schedule-timeline-calendar")).default;

    // Plugin de linea del timepo
    const TimelinePointer = (
      await import(
        "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js"
      )
    ).Plugin;

    // Plugin para poder seleccionar los items
    const Selection = (
      await import(
        "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js"
      )
    ).Plugin;

    // Plugin para mover los items
    const ItemMovement = (
      await import(
        "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js"
      )
    ).Plugin;

    // Congifuguracion para mover los items de arriba a abajo (a los lados no se puede)
    const itemMovementOptions = {
      events: {
        onMove({ items }) {
          // items before the current movement
          return items.before.map((beforeMovementItem, index) => {
            // item data after move
            const afterMovementItem = items.after[index];

            // clone item to prevent bugs
            const myItem = GSTC.api.merge({}, afterMovementItem);

            // Solo permite el movimiento vertical
            myItem.time.start = beforeMovementItem.time.start;
            myItem.time.end = beforeMovementItem.time.end;
            return myItem;
          });
        },
      },
    };

    // Función para generar los items
    function generateRows() {
      /**
       * @type { import("gantt-schedule-timeline-calendar").Rows }
       */
      const rows = {};

      datosUsrs.forEach((data) => {
        const id = GSTC.api.GSTCID(data.eCorreo); // Usamos eCorreo como identificador de la fila
        rows[id] = {
          id,
          label: `${data.eNombre} ${data.eApeP} ${data.eApeM}`, // Cambiar a la propiedad deseada para la etiqueta de la fila
        };
      });

      return rows;
    }

    // Funcion para generar los items utilizando datos de la base de datos
    function generateItems() {
      const items = {};

      datosActivity.forEach((data) => {
        if (data.tipo === "turno") {
          const items = generarObjetos(data.eCorreo, data.turno);
          // Aqui vuelvo a iterar para meter al arreglo cada activiada generada con la funcion
          items.forEach((item) => {
            datosActivity.push(item);
          });
        }
      });
      
      // Itera en todos los objetos del arreglo que recibe de la base de datos
      datosActivity.forEach((data, i) => {
        let startDate = new Date(data.fechaI);
        let endDate = new Date(data.fechaF);

        let luxonStartDate = DateTime.fromJSDate(startDate);
        let luxonEndDate = DateTime.fromJSDate(endDate);

        const id = GSTC.api.GSTCID(i.toString());
        const rowId = GSTC.api.GSTCID(data.eCorreo);

        // Verifico el tipo para saber el;color de la actividad
        let color;
        switch (data.tipo) {
          case "vacacion":
            color = "blue";
            break;
          case "training":
            color = "red";
            break;
          case "trabalo":
            color = "green";
            break;
          case "descanso":
            color = "orange";
            break;
          default:
            break;
        }

        // Genero los items normalmente
        items[id] = {
          id,
          label:
            data.tipo === "turno"
              ? `${data.tipo} : ${data.motivo}`
              : `${data.tipo}`,
          rowId,
          time: {
            start: luxonStartDate.valueOf(),
            end: luxonEndDate.valueOf(),
          },
          style: {
            backgroundColor: color,
          },
        };
      });
      return items;
    }

    /**
     * Configuración de gantt-schedule-timeline-calendar
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */

    const config = {
      // Licencia generada, esta debe especificar la url dond ese va especificar cuando se usa (PORT=3001)
      licenseKey:
        // esta es la que funciona bien en 3000 y host
        //"====BEGIN LICENSE KEY====\ncZ55O7rPbNDOyVUVvAERSUz3DOG6de5guknU4A2MdRES8fWIO/l+3CeLAVwTWhpqfrD4hi6uMd70ONgxxw5QpSijDMyet42cUgxtnbp4GaW9YwrAlPuoGILT93DzUs3bWumBL9Y1OlXiEVSgKBmAPWSPuNBBjz0bBBeYf2Cv2b+5bXMNr7fqQfybtubff2d4n1eyQxiDlIJkcj/fn492IkjJsBLi0EWHBgzD1KzjHKTS1WhvJ0Q/97PVFGi2HfvyYhqMpwoHRCZz1/UCeS7PZC5PgsV6YXUV7T2ronedpG/LMuXRFEoaBeVm5k4nCt18O0PGtZQxZLp0MmwOQZtJ+g==||U2FsdGVkX18GEtHZRyEr9mFMAbgWWOoYcOvzzquaHgguU58/DprZPdkOmI8y7TvZ5Qp6zAWm7NERhQ06GWxzSfQVxckupwyKKxQVzKyPmJc=\nKd01Nr88reSrXyJlsQ/OI8dKMlUJDXoc/9ti5pdx4WCNyyXCWBlWmTzbgOMyZ1YIK9QR1SC0R003HWlikG1f+x91ElgeZpJwJ5wNCMfvGsDf3MQTDEygPlKIAvM4RdIBzkGof2aek4EVIKEaqbu/L38AZyQSkv2QOVcvka1NhabiQGkillyRf33VgKSr8Z7Zfuvj7+VK2XduksL4mIsUqPXraIdTxLZp3IzIC9Cqs6axn/axtHjhw9vg0fGlYrD1aDMxJGg7ZDee7UVgFVybIYQWVg9VygXehudrzdsaDC+U3fJ0br8shYoSpdFqgFTRPBgv7F/i48tzxsbRkRrzjQ==\n====END LICENSE KEY===="
        // esta funciona bien en 3001
        //Hola
        "====BEGIN LICENSE KEY====\ncZ55O7rPbNDOyVUVvAERSUz3DOG6de5guknU4A2MdRES8fWIO/l+3CeLAVwTWhpqfrD4hi6uMd70ONgxxw5QpSijDMyet42cUgxtnbp4GaW9YwrAlPuoGILT93DzUs3bWumBL9Y1OlXiEVSgKBmAPWSPuNBBjz0bBBeYf2Cv2b+5bXMNr7fqQfybtubff2d4n1eyQxiDlIJkcj/fn492IkjJsBLi0EWHBgzD1KzjHKTS1WhvJ0Q/97PVFGi2HfvyYhqMpwoHRCZz1/UCeS7PZC5PgsV6YXUV7T2ronedpG/LMuXRFEoaBeVm5k4nCt18O0PGtZQxZLp0MmwOQZtJ+g==||U2FsdGVkX18GEtHZRyEr9mFMAbgWWOoYcOvzzquaHgguU58/DprZPdkOmI8y7TvZ5Qp6zAWm7NERhQ06GWxzSfQVxckupwyKKxQVzKyPmJc=\nKd01Nr88reSrXyJlsQ/OI8dKMlUJDXoc/9ti5pdx4WCNyyXCWBlWmTzbgOMyZ1YIK9QR1SC0R003HWlikG1f+x91ElgeZpJwJ5wNCMfvGsDf3MQTDEygPlKIAvM4RdIBzkGof2aek4EVIKEaqbu/L38AZyQSkv2QOVcvka1NhabiQGkillyRf33VgKSr8Z7Zfuvj7+VK2XduksL4mIsUqPXraIdTxLZp3IzIC9Cqs6axn/axtHjhw9vg0fGlYrD1aDMxJGg7ZDee7UVgFVybIYQWVg9VygXehudrzdsaDC+U3fJ0br8shYoSpdFqgFTRPBgv7F/i48tzxsbRkRrzjQ==\n====END LICENSE KEY====",
      // Plugins a utilizar ya importandos anteriormente
      plugins: [
        TimelinePointer(),
        //Selection(),
        //ItemMovement(itemMovementOptions), // Se agrega la configuracion creada
      ],
      list: {
        columns: {
          data: {
            // Columnas de la tabla lateral
            [GSTC.api.GSTCID("id")]: {
              id: GSTC.api.GSTCID("id"),
              width: 200,
              data: ({ row }) => GSTC.api.sourceID(row.id),
              header: {
                content: "Correo",
              },
            },
            [GSTC.api.GSTCID("label")]: {
              id: GSTC.api.GSTCID("label"),
              width: 200,
              data: "label",
              header: {
                content: "Nombre",
              },
            },
          },
        },
        // Filas a utilizar
        rows: generateRows(),
      },
      chart: {
        // Items generados
        items: generateItems(),
      },
    };

    state = GSTC.api.stateFromConfig(config);

    gstc = GSTC({
      element,
      state,
    });
  }

  const callback = (element) => {
    if (element) initializeGSTC(element);
  };

  useEffect(() => {
    return () => {
      if (gstc) {
        gstc.destroy();
      }
    };
  });

  function updateFirstRow() {
    if (!GSTC || !state) return;
    state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
      row.label = "Changed dynamically";
      return row;
    });
  }

  return (
    <div className="container">
      {/* <button onClick={updateFirstRow}>Change row 1 label</button> */}
      <hr />
      <div id="gstc" ref={callback}></div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
