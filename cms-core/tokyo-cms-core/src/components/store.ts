import { createStore } from '@stencil/store';

//https://stenciljs.com/docs/stencil-store

const { state, onChange } = createStore({
  lang: '',
  appId: '',
  labels: {},
  langs: []
})

onChange('lang', value => { state.lang = value })
onChange('appId', value => { state.appId = value })
onChange('labels', value => { state.labels = value })
onChange('langs', value => { state.langs = value })

export { state };

