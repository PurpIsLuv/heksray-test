<template>
  <div class="index">
    <v-row>
      <v-text-field
        placeholder="Поиск"
        outlined
        clearable
        v-model="search"
      ></v-text-field>
      <v-btn fab dark color="success" class="ml-2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-chip-group v-model="selectedTags" row multiple>
        <v-chip v-for="(tag, index) in tags" :key="index" filter outlined>
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row wrap>
      <v-card
        v-for="article in filtredArticleList"
        :key="article.id"
        width="400px"
        class="ma-1"
      >
        <v-card-title>{{ article.title }}</v-card-title>
        <v-card-subtitle class="px-2">
          <v-chip
            v-for="(tag, index) in article.tags"
            :key="index"
            class="ma-1"
          >
            {{ tag }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text class="article__text">{{ article.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success">В топ</v-btn>
          <v-btn color="primary">Изменить</v-btn>
          <v-btn color="error">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedTags: [],
      tags: ['All', 'top', 'new', 'funny'],
      search: ''
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.list
    }),
    filtredArticleList() {
      if (this.search) {
        return this.articleList.filter((article) => {
          const search = this.search.toLowerCase()
          const text = article.text.toLowerCase()
          const title = article.title.toLowerCase()
          return text.includes(search) || title.includes(search)
        })
      } else {
        return this.articleList
      }
    }
  }
}
</script>

<style lang="scss">
.index {
  padding: 20px 0;
}

.article {
  &__text {
    height: 150px;
    overflow-y: auto;
  }
}
</style>
