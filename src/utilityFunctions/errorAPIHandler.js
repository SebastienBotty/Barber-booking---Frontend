export const errorPostAppointmentHandler = (message) =>{
  
    switch(true){
        case message.includes('E1100'):
            return "Rdv indisponible, rafraichissez la page."

        case message.includes("Date dépassée"):
            return "Date dépassée"
        default:
            return "Erreur innatendue"
    }
}