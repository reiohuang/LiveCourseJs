/**
 * Vue 說明
 * 不加上 const app，這邊不加上 const app = new Vue 並沒有任何影響。
 */
new Vue({
  el: 'app', // Vue 綁定在 app。
  /**
   * Vue data 說明
   * @param products 放置 AJAX 回來的產品資料
   * @param pagination 放置分頁資料
   * @param tempProduct 暫存資料，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
   * @param isNew 用於判斷接下來的行為是新增產品或編輯產品
   * @param status 用於切換上傳圖片時的大小 icon，主要是增加使用者體驗。
   * @param user 底下分別有 token 的放置處，但主要必須注意 uuid 需改成自己的。
   */
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    isNew: false,
    status: {
      fileUploading: false,
    },
    user: {
      token: '', // token 存哪裡都可以
      uuid: 'c764053a-9bb3-4f83-a21e-7be061c39c38',
    },
  },
  /**
   * 生命週期 Created
   * 主要用於取得 token，若沒有使用者或沒有 token 則返回到登入畫面，若有則執行「取得全部產品」的方法。
   */
  created() {
    // 取得 token 的 cookies
    // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 若無法取得 token 則返回 Login 畫面
    if (this.user.token === '') {
      window.location = 'Login.html'; // 轉址到 Login 頁面
    }
    // 執行取得全部產品的行為
    this.getProducts();
  },
  methods: {
    /**
     * 取得全部產品
     * @param page 頁碼，預設直式第一頁
     */
    getProducts(page = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      // 預設帶入 token，作為預設值做發送，之後每次發送時皆會把這個 token 帶上。
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((response) => {
        this.products = response.data.data; // 取得產品列表(對應遠端取回的資料)
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
      });
    },
    /**
     * 開啟 Modal 視窗
     * @param isNew 判斷目前是否為新增(true)或是編輯(false)
     * @param item 物件，主要用於傳入要編輯或是刪除的產品資料
     */
    openModal(isNew, item) { },
    /**
     * 取得「單一」詳細產品資料
     * @param id 主要是傳入產品的 ID
     */
    getProduct(id) { },
    /**
     * 上傳產品資料
     * 透過 this.isNew 的狀態將會切換新增產品或編輯產品
     * 附註新增為 「post」，編輯則是「patch」，patch 必須傳入產品 ID
     */
    updateProduct() { },
    /**
     * 上傳圖片
     * 詳細教學可參考影音：https://courses.hexschool.com/courses/javascript1/lectures/22245852
     */
    uploadFile() { },
    /**
     * 刪除產品
     * 透過在 openModal 傳入的 this.tempProduct，並撈取 this.tempProduct.id 來刪除產品。
     * 主要是因為在 delModal 會使用到產品的一些資訊，因此會需要拷貝一整份過來。
     */
    delProduct() {
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

      // 預設帶入 token，作為預設值做發送，之後每次發送時皆會把這個 token 帶上。
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(url).then(() => {
        $('delProductModal').modal('hide'); // 刪除成功後關閉 Modal
        this.getProducts(); // 重新取得全部資料
      });
    },
  },
})