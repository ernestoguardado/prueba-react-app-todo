import React from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({ agregarTodo }) => {
  const initialState = {
    nombre: "",
    descripcion: "",
    estado: "",
    prioridad: false,
  };

  const [inputs, handleChange, reset] = useFormulario(initialState);

  const { nombre, descripcion, estado, prioridad } = inputs;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      // console.log("no coloque esto en blanco");
      e.target[0].focus();
      Swal.fire({
        title: "Error!",
        text: "No deje el nombre en blanco ",
        icon: "error",
      });

      return;
    }
    if (!descripcion.trim()) {
      // console.log("no coloque esto en blanco");
      Swal.fire({
        title: "Error!",
        text: "No deje la descropcion en blanco ",
        icon: "error",
      });

      return;
    }
    Swal.fire({
      title: "Exito!",
      text: "Tarea agregada",
      icon: "success",
    });

    agregarTodo({
      nombre: nombre,
      descripcion: descripcion,
      estado: estado === "finalizado" ? false : true,
      prioridad: prioridad,
      id: uuidv4(),
    });

    // console.log(todo);
    reset();
  };

  return (
    <>
      <h3>Agregar TODO</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nombre"
          name="nombre"
          value={nombre}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          type="text"
          placeholder="ingrese descripción"
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <select
          name="estado"
          value={estado}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="pendiente">pendiente</option>
          <option value="finalizado">finalizado</option>
        </select>

        <div className="form-check">
          <input
            type="checkbox"
            name="prioridad"
            id="idCheckbox"
            checked={prioridad}
            onChange={handleChange}
            className="form-check-input mb-2"
          />

          <label htmlFor="idCheckbox" className="form-check-label">
            Dar prioridad
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Formulario;
