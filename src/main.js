const MapsShort = new Vue({
  el: '#app',
  data: {
    api: 'https://script.google.com/macros/s/AKfycbz7NvKd6AUcH29GPb-yfe9FrIuR9--ikNB-8meXF58bEh7VTGGr/exec',
    link: '',
    result: '',
    error: null
  },
  methods: {
    submit() {
      let beShortData = new FormData();
      beShortData.append("maps", this.link);
      fetch(this.api, {
        method: 'POST',
        body: beShortData
      }).then(res => res.json())
        .then(result => {
          this.result = result.shortLink;
          this.error = null;
          return this.result;
        })
        .then(result => {
          // 存一份資料到 Google Sheet
          let saveData = new FormData();
          saveData.append('entry.1156946266', result);
          saveData.append('entry.922598949', this.link);
          fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyFKOOwZvIgF2Mh4pQ4x7QsGZpXGe9M-iB2C9p2rMDd58DBg/formResponse', {
            method: 'POST',
            body: saveData
          })
        })
        .catch(err => {
          this.error = err.message
        });
    }
  },
})