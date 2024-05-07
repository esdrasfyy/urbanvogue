function formatPhoneNumber(phoneNumber: string): string {
    const cleanedNumber: string = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length < 2) {
        return cleanedNumber; // Retorna o número sem formatação
    }

    let formattedNumber: string = cleanedNumber;

    if (formattedNumber.length >= 2 && (formattedNumber.startsWith('353') || formattedNumber.startsWith('35'))) {
        formattedNumber = `+353 ${formattedNumber.substring(3)}`;
    } else if (formattedNumber.length >= 2) {
        formattedNumber = `+${formattedNumber.substring(0, 2)} ${formattedNumber.substring(2)}`;
    }

    return formattedNumber;
}
export {formatPhoneNumber}