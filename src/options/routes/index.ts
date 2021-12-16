import { createRouter, createWebHashHistory } from "vue-router";

import Main from "~/options/views/Main.vue"

import Welecome from "~/options/views/login/Welcome.vue"
import Guide from "~/options/views/login/Guide.vue"
import WalletCreate from "~/options/views/login/WalletCreate.vue"
import WalletImport from "~/options/views/login/WalletImport.vue"

import Unlock from "~/components/Unlock/Unlock.vue"

import Settings from "~/options/views/settings/Settings.vue"
import SettingsAccountDetail from "~/options/views/settings/AccountDetail.vue"
import SettingsNetworks from "~/options/views/settings/Networks.vue"
import SettingsNetworksUpdate from "~/options/views/settings/NetworksUpdate.vue"
import SettingsNetworksAdd from "~/options/views/settings/NetworksAdd.vue"
import SettingsTokensAdd from "~/options/views/settings/TokensAdd.vue"
import SettingsAbout from "~/options/views/settings/About.vue"

import { unlocked, accounts } from "~/logic"

const routes = [
  { path: '/', component: Main },

  { path: '/welcome', component: Welecome },
  { path: '/guide', component: Guide },
  { path: '/walletCreate', component: WalletCreate },
  { path: '/walletImport', component: WalletImport },

  { path: '/unlock', component: Unlock },

  {
    path: '/settings', component: Settings, children: [
      {
        path: "",
        redirect: '/settings/accountDetail'
      },
      {
        path: "accountDetail",
        component: SettingsAccountDetail,
      },
      {
        path: 'networks',
        component: SettingsNetworks,
        children: [
          {
            path: "",
            component: SettingsNetworksUpdate,
          },
          {
            path: "add-network",
            component: SettingsNetworksAdd,
          }

        ]
      },
      {
        path: "add-token",
        component: SettingsTokensAdd,
      },
      {
        path: "about",
        component: SettingsAbout,
      }

    ],
  },
]

const Router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 路由拦截器，判断是否是第一次使用，判断是否已经登陆
Router.beforeEach((to, from, next) => {
  if (to.path == '/welcome' || to.path == '/guide' || to.path == '/walletCreate' || to.path == '/walletImport') {
    next()
  }
  if (accounts.value.length == 0) {
    next('/welcome')
  } else if (!unlocked.value) {
    next('/unlock')
  } else {
    next()
  }
})

export { Router }