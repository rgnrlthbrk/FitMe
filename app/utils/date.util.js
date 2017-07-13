module.exports = {
  getCurrentDate : () => {
    let today = new Date(),
        dd    = today.getDate(),
        mm    = today.getMonth() + 1, //January is 0!
        yyyy  = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

};