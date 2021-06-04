//Загрузка теста
function LoadTest(result) {
  result = true;
  fetch("test.json")
    //   .then(response => response.json())
    .then(function (response) {
      let res = response;
      if (res.ok) {
        //   console.log(response.json());
        localStorage.setItem("save", JSON.stringify(res.json()));
        PrintLog("Load done", "su");
        result = false;
      } else {
        PrintLog("Not loaded", "er");
      }
    });
}

async function aLoadTest(url) {
  let response = await fetch(url);
  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    localStorage.setItem("save", JSON.stringify(json));
    PrintLog("Load done", "su");
    return true
  } else {
    PrintLog("Ошибка HTTP: " + response.status, "er");
    return false
  }
}

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
