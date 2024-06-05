
const CustomizeService = {

  printDate(date) {
    try {
      const fecha = new Date(date);
      const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const fechaFormat = fecha.toLocaleDateString(process.env.REACT_APP_LANGUAGE, opciones);
      return fechaFormat
    } catch (error) {
      console.error('Error printing date:', error);
      throw error;
    }
  },

  printMoney(cantidad) {
    const formatter = new Intl.NumberFormat(process.env.REACT_APP_LANGUAGE, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(cantidad);
  },

  getClassScore(vote_average){
    if(vote_average > 7){
      return 'bg-green-300';
    }else if(vote_average > 5){
      return 'bg-yellow-300';
    }else if(vote_average > 0){
      return 'bg-red-300 text-white';
    }else{
      return 'hidden';
    }
  },

  formatTime(minutes) {
    if(minutes == 0){
      return "--";
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;  
    const formattedMins = hours > 0 ? mins.toString().padStart(2, '0') : mins.toString();
    return `${hours > 0 ? hours + 'h ' : '' }${formattedMins}min`;
  }
}

export default CustomizeService;