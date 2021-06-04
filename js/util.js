//Форматированный вывод информации в консоль
function PrintLog(msg, status) {
  let now = new Date();

  switch (status) {
    case "er": {
      console.log(
        "%c [" + now.getHours() + ":" + now.getMinutes() + "]" + " " + msg,
        "color: #C70039"
      );
      break;
    }

    case "su": {
      console.log(
        "%c [" + now.getHours() + ":" + now.getMinutes() + "]" + " " + msg,
        "color: #43FF00"
      );
      break;
    }
    case "war": {
      console.log(
        "%c [" + now.getHours() + ":" + now.getMinutes() + "]" + " " + msg,
        "color: #FFC300"
      );
      break;
    }

    default: {
      console.log(
        "[" + now.getHours() + ":" + now.getMinutes() + "]" + " " + msg
      );
      break;
    }
  }
}
