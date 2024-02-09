        let tareas = [
            { id: 1, descripcion: "Hacer la compra", completada: false },
            { id: 2, descripcion: "Estudiar para el examen", completada: false },
            { id: 3, descripcion: "Llamar a Juan", completada: false }
        ];

        function addTask() {
            let nuevaTarea = document.getElementById("nuevaTarea").value;
          
            if (nuevaTarea) {
              tareas.push({
                id: tareas.length + 1,
                descripcion: nuevaTarea,
                completada: false,
              });
          
              actualizaLista();
          
              document.getElementById("nuevaTarea").value = "";
            } else {
              alert("¡Debes ingresar una descripción para la tarea!");
            }
        }
        
        function actualizaLista() {
            let tbody = document.querySelector("table tbody");
            tbody.innerHTML = "";
        
            tareas.forEach((tarea) => {
                let tr = document.createElement("tr");
            
                let tdId = document.createElement("td");
                tdId.textContent = tarea.id;
            
                let tdDescripcion = document.createElement("td");
                tdDescripcion.textContent = tarea.descripcion;
            
                let tdCheckbox = document.createElement("td");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `checkbox_${tarea.id}`;
                checkbox.checked = tarea.completada;
                checkbox.addEventListener("change", () => {
                    let idTarea = tarea.id;
                    let tareaSeleccionada = tareas.find(t => t.id === idTarea);
                    tareaSeleccionada.completada = checkbox.checked;
                    if (checkbox.checked) {
                        tdDescripcion.style.textDecoration = "line-through";
                    } else {
                        tdDescripcion.style.textDecoration = "none";
                    }
                    actualizaContadores();
                });
            
                let tdEliminar = document.createElement("td");
                let btnEliminar = document.createElement("button");
                btnEliminar.textContent = "X";
                btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
                btnEliminar.addEventListener("click", () => {
                    eliminaTarea(tarea.id);
                });
            
                tdCheckbox.appendChild(checkbox);
            
                tr.appendChild(tdId);
                tr.appendChild(tdDescripcion);
                tr.appendChild(tdCheckbox);
                tdEliminar.appendChild(btnEliminar);
                tr.appendChild(tdEliminar);
            
                if (tarea.completada) {
                    checkbox.checked = true;
                    tdDescripcion.style.textDecoration = "line-through";
                    tr.classList.add("completed");
                }
            
                tbody.appendChild(tr);
            });
            
        
            actualizaContadores();
        }
        
        function eliminaTarea(idTarea) {
            tareas = tareas.filter(tarea => tarea.id !== idTarea);
            actualizaLista();
        }
        
        function actualizaContadores() {
            let totalTareas = document.getElementById("totalTareas");
            let tareasCompletadas = document.getElementById("tareasCompletadas");
        
            totalTareas.textContent = tareas.length;
            tareasCompletadas.textContent = tareas.filter((tarea) => tarea.completada).length;
        }
        
      