function remove_from_array_by_value(arr, val) {
    let ret = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != val) {
            ret.push(arr[i]);
        }
    }
    return ret;
}





// initial objects:

let initial_cell = {
    id: 0,
    column_id: 0,
    description: "first temp",
};

let columns = [
    {
        id: 0, 
        name: "Todo",
        cells: [initial_cell],
    },
];

let cell_count = 1;





// listeners:


// add todo
let add_todo_input = document.getElementById("add_todo_input");
let add_todo_button = document.getElementById("add_todo_button");
add_todo_button.addEventListener("click", () => {
    let new_cell_id = cell_count;

    columns[0].cells.push({
        id: new_cell_id,
        column_id: 0,
        description: add_todo_input.value,
    });

    add_todo_input.value = "";
    cell_count ++;
    render_columns(columns);
});


function update_all_listeners() {

    // button_in_cell 
    for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < columns[i].cells.length; j++) {
            let cell = columns[i].cells[j];
            for (let k = 0; k <= columns.length; k++) {
                let button_in_cell = document.getElementById("cell_" + cell.id.toString() + ",column_" + k.toString());
                button_in_cell.addEventListener("click", () => {
                    columns[i].cells = remove_from_array_by_value(columns[i].cells, cell);
                    if (k != columns.length) {
                        columns[k].cells.push(cell);
                    }
                    render_columns(columns);
                });
            }
        }
    }

    // add column
    let add_column_button = document.getElementById("add_column_button");
    add_column_button.addEventListener("click", () => {
        let new_column_name = prompt("New column's name?");
        columns.push({
            id: columns.length, 
            name: new_column_name,
            cells: [],
        });
        render_columns(columns);
    });

}




// rendering:


function render_button_in_cell(cell_id, column_id, button_text) {
    let dom = document.createElement("button");
    dom.setAttribute("class", "cell_button");
    dom.setAttribute("id", "cell_"+cell_id.toString() + ",column_"+column_id.toString());
    dom.innerHTML = button_text;

    return dom;
}


function render_cell(cell, columns) {
    let dom = document.createElement("li");
    dom.setAttribute("class", "cell");
    dom.setAttribute("id", "cell_" + cell.id.toString());

    let cell_description = document.createElement("span");
    cell_description.setAttribute("class", "cell_description");
    cell_description.innerHTML = cell.description;
    dom.appendChild(cell_description);

    let buttons = document.createElement("ul");
    buttons.setAttribute("class", "buttons");
    for (let i = 0; i < columns.length; i++) {
        let button_in_cell = render_button_in_cell(cell.id, i, columns[i].name);
        buttons.appendChild(button_in_cell);
    }
    let remove_button_in_cell = render_button_in_cell(cell.id, columns.length, "Remove");
    buttons.appendChild(remove_button_in_cell);
    dom.appendChild(buttons);
    
    return dom;
}


function render_column(column, columns) {
    let dom = document.createElement("li");
    dom.setAttribute("class", "column");
    dom.setAttribute("id", "column_" + column.id.toString());
    
    let column_title = document.createElement("span");
    column_title.setAttribute("class", "column_title");
    column_title.innerHTML = column.name;
    dom.appendChild(column_title);

    let cells = document.createElement("ul");
    cells.setAttribute("class", "cells");

    for (let i = 0; i < column.cells.length; i++) {
        let cell = render_cell(column.cells[i], columns);
        cells.appendChild(cell);
    }
    dom.appendChild(cells);

    return dom;
}


function render_columns(columns) {
    let dom = document.getElementById("columns");
    dom.innerHTML = "";

    for (let i = 0; i < columns.length; i++) {
        let column = render_column(columns[i], columns);
        dom.appendChild(column);
    }

    let add_column_button = document.createElement("button");
    add_column_button.setAttribute("id", "add_column_button");
    add_column_button.innerHTML = "+";
    dom.appendChild(add_column_button);

    update_all_listeners();
    return dom;
}





render_columns(columns);