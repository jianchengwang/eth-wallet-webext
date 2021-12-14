import { createApp } from 'vue'
import App from './Options.vue'

import { Router } from "./routes"

import '../styles'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Router).use(Varlet).mount('#app')
