import { createRouter, createWebHashHistory } from "vue-router";
import MusicRoute from "../routes/MusicRoute.vue";
import ProviderManagementRoute from "../routes/ProviderManagementRoute.vue";
import { AppShellLayout } from "@sonar-room/features/app-shell";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppShellLayout,
      children: [
        {
          path: "",
          redirect: { name: "providers" },
        },
        {
          path: "providers",
          name: "providers",
          component: ProviderManagementRoute,
        },
        {
          path: "music",
          name: "music",
          component: MusicRoute,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: { name: "providers" },
    },
  ],
});