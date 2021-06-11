<template>
  <default-layout>
    <v-main>
      <router-view />
    </v-main>
  </default-layout>
</template>

<script>
import defaultLayout from "@/layouts/default";

export default {
  name: "App",
  components: { defaultLayout },
};
</script>
