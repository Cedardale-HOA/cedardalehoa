import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xwrx4h71',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: false,
  }
})
