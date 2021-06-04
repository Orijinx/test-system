let app = new Vue({
  el: "#app",
  data: {
    oTest: null,
    currentTime: null,
    timer: null,
    Status: null,
    tStatus: null,
    toast: null,
    soundNot: new Audio(),
    loading: null,
  },
  methods: {
    Save: function () {
      localStorage.setItem("save", JSON.stringify(this.oTest));
    },
    loadSave: function () {
      var localData = JSON.parse(localStorage.getItem("save"));
      if (localData != null) {
        this.oTest = localData;
        this.isLoading = false;
        return true;
      } else {
        return false;
      }
    },
    LoadingTest: async function (url) {
      let response = await fetch(url);
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
        this.oTest = json;
        this.StopLoading();
        PrintLog("Load done", "su");
      } else {
        PrintLog("Ошибка HTTP: " + response.status, "er");
      }
    },
    StopLoading() {
      clearInterval(this.loading);
    },
    ClearForm: function () {
      this.oTest.forEach((item) => {
        item.answer = "";
      });
      localStorage.clear("save");
    },
    StartTimer() {
      if (this.currentTime != null) {
        this.timer = setInterval(() => {
          this.currentTime--;
        }, 1000);
      }
    },
    StopTimer() {
      clearTimeout(this.timer);
    },

    clearStatus() {
      this.Status = null;
    },
    SetStatus(text, type, timeout) {
      this.Status = { text: text, type: type };
      this.tStatus = setTimeout(() => this.clearStatus(), timeout);
    },
    StartToast() {
      $("#toast").toast("show");
    },
  },
  created() {
    if (this.loadSave()) {
      console.log("Save is load");
    } else {
      this.loading = setInterval(() => {
        this.LoadingTest("js/test.json");
      }, 3000);
    }
  },
  mounted() {
    if (this.currentTime != null) {
      this.StartTimer();
    }
  },
  destroyed() {
    this.StopTimer();
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.StopTimer();
        this.SetStatus("Время вышло", "", 5000);
      } else if (time == 60) {
        this.SetStatus("Осталась 1 минута", "alert", 5000);
      }
    },
    Status: function (val) {
      if (val != null) {
        this.soundNot.src = "assets/sounds/toast.mp3";
        this.soundNot.play();
        $("#toast").toast("show");
      }
    },
  },
  computed: {
    isLoading: function () {
      if (this.oTest != null) {
        return false;
      } else {
        return true;
      }
    },
  },
});
