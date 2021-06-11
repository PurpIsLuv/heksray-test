<template>
  <v-card width="400px" class="ma-1">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle class="px-2">
      <v-chip v-for="(tag, index) in tags" :key="index" class="ma-1">
        {{ tag }}
      </v-chip>
    </v-card-subtitle>
    <v-card-text class="article__text">{{ text }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success">В топ</v-btn>
      <v-btn color="primary" @click="$emit('change', id)">Изменить</v-btn>
      <v-btn color="error" @click="deleteArticle(id)">Удалить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    tags: {
      type: Array,
      default: () => [],
      required: true
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    id: {
      type: Number,
      default: -1,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      deleteArticle: 'DELETE_ARTICLE'
    })
  }
}
</script>
