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