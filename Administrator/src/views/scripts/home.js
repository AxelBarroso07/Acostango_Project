const host = 'back.acostango.at'
const protocol = 'https'

function showHide(action, modalId) { // show hide modal considering action and modalId

    const dialog = document.getElementById(modalId) // get modal by id
    // console.log(modalId)

    if (action === true) {
        dialog.style.display = 'block' // if the action is true, show the modal
    } else if(action === false) {
        dialog.style.display = 'none' // else hide the modal
        dialog.close()
    }
}

function hideModal(modalId, idCalendar, originalTitle) { // hide modal and close it
    const dialog = document.getElementById(modalId) // get modal by id

    if (dialog) {
        const titleInput = document.getElementById('editTitle_' + idCalendar) // get input by id of the title
        if (titleInput) {
            titleInput.value = originalTitle // set the value of the input with the original title
        }

        dialog.style.display = 'none' // hide the modal if it exists
        dialog.close() // close the modal if it exists
    }
}

function editClass(idCalendarDB) { // show the modal to edit the class
    // console.log("idCalendar:", idCalendarDB)

    const dialog = document.getElementById('editFields_' + idCalendarDB) // get the modal by id
    if (dialog) {
        dialog.style.display = 'block' // show the modal if it exists
    }
}

function confirmEdit(idCalendarDB, titleDB, descriptionDB, timeStartDB, timeFinishDB) { // confirm the changes in the class

    const dialog = document.getElementById('editFields_' + idCalendarDB) // get the modal by id

    const newTitle = document.getElementById('editTitle_' + idCalendarDB).value
    const newDescription = document.getElementById('editDescription_' + idCalendarDB).value
    const newTimeStart = document.getElementById('editTimeStart_' + idCalendarDB).value
    const newTimeFinish = document.getElementById('editTimeFinish_' + idCalendarDB).value // get the values of the inputs in the modal

    // console.log(newTimeStart)
    // console.log(newDescription)
    // console.log(newTimeFinish)

    const newData = {}

    if (dialog) {
        dialog.close() // close the modal if it exists
    }

    if (newTitle !== titleDB) {
        newData.newTitle = newTitle // if the new title is different from the original, set the new title
    }
    if (newTimeStart !== timeStartDB) {
        newData.newTimeStart = newTimeStart // if the new time start is different from the original, set the new time start
    }
    if (newDescription !== descriptionDB) {
        newData.newDescription = newDescription // if the new description is different from the original, set the new description
    }
    if (newTimeFinish !== timeFinishDB) {
        newData.newTimeFinish = newTimeFinish // if the new time finish is different from the original, set the new time finish
    }
    
    if(Object.keys(newData).length > 0) {
        // Realizar la solicitud de fetch con los datos del formulario
        fetch(`${protocol}://${host}/editClass/${idCalendarDB}`, { // fetch the url with the id of the class
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // set the headers
            },
            body: JSON.stringify({
                newData // send the new data to the server
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log("Cambios confirmados:", data)
            dialog.style.display = 'none' // hide the modal if it exists
            dialog.close() // close the modal if it exists
            // console.log(window.location.href)
            // location.reload();
        })
        .catch(error => {
            console.log("Error al confirmar cambios:", error.message)
        })
    } else {
        console.log("Cambia algún dato")
    }
}

async function deleteClass(idCalendar) {
    
    
    console.log("idCalendar from deleteClass()", idCalendar);
    
    fetch(`${protocol}://${host}/deleteClass/${idCalendar}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log("Row deleted:", data)
        location.reload();
    })
    .catch(error => {
        console.log("Error to delete row:", error)
    })
}

async function deleteEvent(idCalendar) { 
    fetch(`${protocol}://${host}/deleteEvent/${idCalendar}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log("Row deleted:", data)
        location.reload();
    })
    .catch(error => {
        console.log("Error to delete row:", error)
    })
}

async function createClass(formData) {
    try {
        const response = await fetch(`${protocol}://${host}/newClass`, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            console.log("error in response.ok /newClass")
        }

        const result = await response.json()
        console.log('Class created before return:', result)
        return result;
    } catch (error) {
        console.error('Error to insert new class:', error)
    }
}