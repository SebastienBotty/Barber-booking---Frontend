export const errorMsgHandler = (message) =>{
    console.log("gg")
    const msgToReturn = ""
    console.log(message.includes("E"))
    switch(true){
        case message.includes('E1100'):
            msgToReturn= "Ce rendez-vous est déja pris."

        case message.includes("Date dépassée"):
            msgToReturn= "Cette date est déja passée"
            
    }
    console.log(msgToReturn)
    return msgToReturn
}