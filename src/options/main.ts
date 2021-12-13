import { createApp } from 'vue'
import App from './Options.vue'
import '../styles'

import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet).mount('#app')
