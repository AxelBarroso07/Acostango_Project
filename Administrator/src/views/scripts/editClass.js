const formClassEdit = document.querySelector("#formClassEdit")

formClassEdit.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = formClassEdit.dataset.id
    const title = formClassEdit.querySelector("#title").value
    const description = formClassEdit.querySelector("#description").value
    const day = formClassEdit.querySelector("#day").value
    const timeStart = formClassEdit.querySelector("#time_start").value
    const timeFinish = formClassEdit.querySelector("#time_finish").value
    const workshop = formClassEdit.querySelector("#workshop").value
    
    console.log("info from formClassEdit:", id, title, description, day, timeStart, timeFinish, workshop)

})