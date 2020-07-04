var obj = {
  data: {
    uuid: 'c764053a-9bb3-4f83-a21e-7be061c39c38', //請填入自己的 UUID
    products: [], //固定路徑
  },
  getData: function () {
    var vm = this;
    var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;

    axios.get(url)
      //成功
      .then(function (response) {
        vm.data.products = response.data.data; //將取得的陣列放入products
        vm.render();
      })
      //失敗
      .catch(function (err) { console.log('資料錯誤', err) });
  },
  //畫面渲染
  render: function () {
    var app = document.getElementById('app');
    var products = this.data.products;
    var str = '';
    products.forEach(function (item) {
      str += `
      <div class="card">
      <img src="${ item.imageUrl[0]}" class="card-img-top">
      <div class="card-body">
      <h5 class="card-title">${ item.title}</h5>
      <p class="card-text">${ item.content}</p>
      <p class="card-text-price">原價: $${ item.origin_price}</p>
      <p class="card-text-special">特價: $${ item.price}</p>
      </div>
      </div>`;
    });
    app.innerHTML = str;
  }
}

obj.getData();