function showHide(nameForm, action) {
    let data = {}

    if (action === 'show') {
        document.getElementById(nameForm).style.display = 'block'

        if (!document.getElementById(nameForm).hasSubmitEvent) {
                document.getElementById(nameForm).addEventListener("submit", async e => {
                    e.preventDefault()

                    const formData = new FormData(document.getElementById(nameForm))
                    console.log('Form Data Entries:', [...formData.entries()])

                    try {
                        const createdClass = await createClass(formData)
                        console.log('Class created:', createdClass)
                    } catch (error) {
                        console.error('Error creating class:', error)
                    }
                })
            }

            // Marcamos el evento como true para que no se repita el envío varias veces
            document.getElementById(nameForm).hasSubmitEvent = true
    } else if (action === 'hide') {
        document.getElementById(nameForm).style.display = 'none'
    }
}

function booleanParse(boolean) {
    return boolean === true || boolean === "true"
}

function hideModal(modalId, idCalendar, originalTitle) {
    const dialog = document.getElementById(modalId)
    if (dialog) {
        const titleInput = document.getElementById('editTitle_' + idCalendar)
        if (titleInput) {
            titleInput.value = originalTitle
        }

        dialog.style.display = 'none'
        dialog.close()
    }
}

function editClass(idCalendarDB) {
    // console.log("idCalendar:", idCalendarDB)

    const dialog = document.getElementById('editFields_' + idCalendarDB)
    if (dialog) {
        dialog.style.display = 'block'
    }
}

function confirmEdit(idCalendarDB, titleDB, timeStartDB, timeFinishDB) {
    const dialog = document.getElementById('editFields_' + idCalendarDB)

    const newTitle = document.getElementById('editTitle_' + idCalendarDB).value
    const newTimeStart = document.getElementById('editTimeStart_' + idCalendarDB).value
    const newTimeFinish = document.getElementById('editTimeFinish_' + idCalendarDB).value

    console.log(newTimeStart)
    console.log(newTimeFinish)

    const port = process.env.PORT
    const host = process.env.DB_HOST

    const newData = {}

    if (dialog) {
        dialog.close()
    }

    if (newTitle !== titleDB) {
        newData.newTitle = newTitle
    }
    if (newTimeStart !== timeStartDB) {
        newData.newTimeStart = newTimeStart
    }
    if (newTimeFinish !== timeFinishDB) {
        newData.newTimeFinish = newTimeFinish
    }
    
    if(Object.keys(newData).length > 0) {
        // Realizar la solicitud de fetch con los datos del formulario
        fetch(`http://${host}:${port}/editClass/${idCalendarDB}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newData
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Cambios confirmados:", data)
            dialog.style.display = 'none'
            dialog.close()
            // console.log(window.location.href)
            location.reload();
        })
        .catch(error => {
            console.log("Error al confirmar cambios:", error)
        })
    } else {
        console.log("Cambia algún dato")
    }
}

function deleteClass(idCalendar) {
    const port = process.env.PORT;
    const host = process.env.DB_HOST;

    console.log("idCalendar from deleteClass()", idCalendar);
    
    fetch(`http://${host}:${port}/deleteClass/${idCalendar}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log("Registro eliminado:", data)
        location.reload();
    })
    .catch(error => {
        console.log("Error al eliminar el registro:", error)
    })
}

async function createClass(formData) {
    let port = 0
    let host = ''

    try {
        const response = await fetch(`/config`, {
            'method': 'GET',
            'headers' : {
                'Content-Type': 'application/json'
            }
        })
        
        if(response.ok) {
            const config = await response.json()
            // console.log("config", config)

            port = parseInt(config.PORT)
            host = config.DB_HOST.toString()
        } else {
            console.log('Error en config.ok de fetch /config')
        }
    } catch(error) {
        console.log('Error en try fetch /config. error:', error)
    }

    console.log("data from createClass():", formData)

    try {
        const response = await fetch(`http://${host}:${port}/newClass`, {
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
