// -列出產品,顯示產品列表
// -新增／編輯產品
//   -產生元件
// -刪除 

/**
 * Vue 說明
 * 不加上 const app，這邊不加上 const app = new Vue 並沒有任何影響。
 */
new Vue({
  el: '#app', // Vue 綁定在 app。
  /**
   * Vue data 說明
   * @param products 放置產品資料
   * @param tempProduct 暫存資料，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
   */
  // 定義資料項目與型別，data包含已存在資料以及暫存資料區，用v-for讀資料
  data: {
    products: [
      {
        id: 1586934917210,
        unit: '單位',
        category: 'villa',
        title: '獨棟歐式庭園',
        origin_price: 6000,
        price: 5000,
        description: '想玩就玩',
        content: '眺覽護國神山，是踏青休憩的絕佳去處。',
        enabled: true,
        imageUrl: 'https://images.unsplash.com/photo-1570057633712-870fa818fa15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      },
      {
        id: 1196934917910,
        unit: '單位',
        category: '主機',
        title: 'PS5 Wifi',
        origin_price: 29999,
        description: '次世代超強規格',
        content: '我也想要換一台 PS5 Wifi',
        price: 9487,
        is_enabled: 0,
        imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
    ],
    // 暫存/新增區: 避免直接動到儲存data，拷貝一份暫存防止被更改
    tempProduct: {
      imageUrl: [],
    }, // products 用陣列中括號可存「多筆」資料，tempProduct 用大括號最多只會有「一筆」暫存資料
  },
  methods: {
    /**
     * 開啟 Modal 視窗，有三種打開視窗的情境：新增鈕、修改鈕、刪除鈕
     * @param isNew 判斷目前是否為新增(true)或是編輯(false)
     * @param item 物件，主要用於傳入要編輯或是刪除的產品資料
     */
    openModal(isNew, item) {
      switch (isNew) {
        // 新增產品
        case 'new':
          // 新增之前必須先清除原有可能暫存的資料，以免編輯的資料留存
          this.tempProduct = {};
          // 切換狀態為 true 代表新增
          this.isNew = true;
          // 切換完畢並清空資料後開啟 Modal
          $('#productModal').modal('show');
          break;
        // 修改產品
        case 'edit':
          // 由於目前範本僅有一層物件，因此使用淺拷貝。將點擊的產品複製一份出來加入物件
          this.tempProduct = Object.assign({}, item);
          // 開啟 Modal
          $('#productModal').modal('show');
          break;
        // 刪除產品
        case 'delete':
          // 由於目前範本僅有一層物件，因此使用淺拷貝。將點擊的產品複製一份出來加入物件
          this.tempProduct = Object.assign({}, item);
          // 拷貝完畢後開啟 Modal
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    /**
     * 更新產品資料，綁定在‘確認’按鈕
     */
    updateProduct() {
      // 按下確認鍵的瞬間，判斷 id 是否存在，存在則更新，不存在就是新資料
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          // 如果 products 裡面某個商品(item)的 id 等於 tempProduct 裡的 id，則更新為 tempProduct 裡的資料
          if (item.id === id) {
            this.products[i] = this.tempProduct; // 將 tempProduct 裡的資料更新覆蓋到 products
          }
        });
      // 不存在 id，用時間做為新 id 寫入 tempProduct 再將它 push 到 products
      } else {
        // Unix Timestamp
        const id = new Date().getTime();
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }
      // 完成後清空 tempProduct 以放入下筆資料
      this.tempProduct = {};
      // 新增成功後關閉 Modal
      $('#productModal').modal('hide');
    },
    /**
     * 刪除產品
     * 透過在 openModal 傳入的 this.tempProduct，並撈取 this.tempProduct.id 來刪除產品。
     */
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#delProductModal').modal('hide'); //刪除成功後關閉 Modal
    },
  },
})