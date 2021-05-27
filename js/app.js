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
  },
  methods: {
    Save: function () {
      localStorage.setItem("save", JSON.stringify(this.oTest));
    },
    loadSave: function () {
      var localData = JSON.parse(localStorage.getItem("save"));
      if (localData != null) {
        this.oTest = localData;
        return true;
      } else {
        return false;
      }
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
      //   this.oTest = [
      //     {
      //       id: 1,
      //       question: "Сколько лет создателю?",
      //       answer: null,
      //     },
      //     {
      //       id: 4,
      //       question: "Его любимый язык программирования?",
      //       radio: ["php", "js", "golang"],
      //       answer: null,
      //     },
      //     {
      //       id: 5,
      //       question: "Где он работал/работает?",
      //       chekeds: ["АО НПФ СИГМА", "ORIJINX"],
      //       answer: [],
      //     },
      //   ];
      //   this.currentTime = 65;
      console.log("No save");
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
  computed: {},
});
