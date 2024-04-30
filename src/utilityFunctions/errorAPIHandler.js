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

export const errorPostBarberHandler = (message) =>{
    switch(true){
        case message.includes('Path `name` is required'):
            return 'Veuillez entrer un nom'    
    default:
        return "Erreur innatendue"        
    }
}   