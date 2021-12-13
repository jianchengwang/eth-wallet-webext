import { useLocalStorage } from '@vueuse/core'

import { Account } from '~/scripts/types/Account'
import { DEFAULT_NETWORKS } from '~/scripts/constants/index'
export const storageDemo = useLocalStorage('webext-demo', 'Storage Demo', { listenToStorageChanges: true })

export const networks = useLocalStorage('networks', DEFAULT_NETWORKS, { listenToStorageChanges: true })
export const currentNetwork = useLocalStorage('currentNetwork', DEFAULT_NETWORKS[0], { listenToStorageChanges: true })
const emptyAccount: Account[] = [];
export const accounts = useLocalStorage('accounts', emptyAccount, { listenToStorageChanges: true })
export const currentAccount = useLocalStorage('currentAccount', {}, { listenToStorageChanges: true })
export const tokens = useLocalStorage('tokens', [], { listenToStorageChanges: true })
export const unlocked = useLocalStorage('unlocked', false, { listenToStorageChanges: true })
export const showMenuDrop = useLocalStorage('showMenuDrop', false, { listenToStorageChanges: true })
export const networkDropdown = useLocalStorage('networkDropdown', false, { listenToStorageChanges: true })
