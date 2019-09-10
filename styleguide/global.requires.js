import Vue from 'vue'
import * as VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  inject: false,
  locale: 'pt_BR',
  fieldsBagName: 'validationFields',
})

Vue.mixin({
  data() {
    return {
      idDemo: '2',
      nameDemo: 'Nome exemplo',
      labelDemo: 'Label exemplo',
      valueDemo: '2'
    }
  }
})
