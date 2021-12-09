import { createApp } from 'vue'
import App from './Popup.vue'
import '../styles'

import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet).mount('#app')
