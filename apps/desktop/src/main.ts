import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { usePreferencesStore } from './stores/preferences';
import { initializeTheme } from '@sonar-room/features/app-shell';
import '@sonar-room/ui/styles.css';
import './styles.css';

const pinia = createPinia();
const app = createApp(App);

usePreferencesStore(pinia).initialize(initializeTheme());
app.use(pinia);
app.use(router);
app.mount('#app');