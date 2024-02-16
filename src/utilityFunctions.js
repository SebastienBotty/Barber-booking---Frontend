export const convertDecimalToTime= (decimalTime) =>{
    // Séparer la partie entière et décimale
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    
    // Formater le résultat
    const formattedTime = `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
}