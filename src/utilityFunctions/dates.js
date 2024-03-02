export const createDateFromTimeString = (date,timeString) =>{
    // Séparer l'heure et les minutes en utilisant la méthode split()
    const [heureStr, minutesStr] = timeString.split('h');

    // Convertir les chaînes de caractères en nombres
    const heureNum = parseInt(heureStr, 10);
    const minutesNum = parseInt(minutesStr, 10);

    // Créer une nouvelle instance de Date avec l'heure et les minutes spécifiées
    date.setHours(heureNum+1);
    date.setMinutes(minutesNum);

    const ISOStringDate = new Date(date).toISOString()
    
    return ISOStringDate;
}

export const convertDecimalToTime= (decimalTime) =>{
    // Séparer la partie entière et décimale
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    
    // Formater le résultat
    const formattedTime = `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
}

export const convertToStartOfDay = (date) =>{
  
        // Extraire l'année, le mois et le jour de la date donnée
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
    
        // Créer une nouvelle instance de Date avec l'année, le mois et le jour, et l'heure à minuit
        const startOfDay = new Date(year, month, day);
        
        return startOfDay;


}

// Convert hours from date type to xxhxx   (hours and minutes)
export const  formatTimeText = (dateProps) =>{
    const date = new Date(dateProps)
    // Récupérer les heures et les minutes de la date
    const hours = date.getHours()-1;
    const minutes = date.getMinutes();

    // Ajouter un zéro devant les minutes si elles sont inférieures à 10
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    // Récupérer le reste de la date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0, donc ajouter 1
    const day = date.getDate();

    // Formater la date en format "YYYY-MM-DD"
    const dateFormatted = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;

    // Retourner l'heure et le reste de la date formatés
    return {date:dateFormatted, hour:`${hours}h${minutesFormatted}`};
}


export const resetSecondsAndMs = (date) =>{
    if (!(date instanceof Date)) {
        throw new Error('La valeur passée en paramètre n\'est pas une instance de Date.');
    }

    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}



