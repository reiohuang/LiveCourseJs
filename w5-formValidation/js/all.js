// 全域註冊 input 驗證元件
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 全域註冊表單驗證元件
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 全域註冊 VueLoading 元件
Vue.component('loading', VueLoading);
// 匯入中文語系檔案
import zh_TW from "./js/zh_TW.js";
// 載入語系設定檔案到 VeeValidate，使用 import zh_TW 多國語系
VeeValidate.localize('tw', zh_TW);

//自定義設定檔案，依據不同驗證狀態，設定對應的 className，bootstrap 驗證綠色/紅色樣式
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

new Vue({
  el: '#app',
  data: {
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    }

  },
});