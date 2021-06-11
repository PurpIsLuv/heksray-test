<template>
  <div class="index">
    <v-row>
      <v-text-field
        placeholder="Поиск"
        outlined
        clearable
        v-model="search"
      ></v-text-field>
      <v-btn fab dark color="success" class="ml-2" @click="createArticle">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-chip-group v-model="selectedTags" row multiple>
        <v-chip filter outlined @click="allTagHandler">Все</v-chip>
        <v-chip
          v-for="(tag, index) in tagList"
          :key="index"
          filter
          outlined
          @click="tagHandler"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row v-if="filtredArticleList && filtredArticleList.length" wrap>
      <article-card
        v-for="article in filtredArticleList"
        :key="article.id"
        :title="article.title"
        :id="article.id"
        :text="article.text"
        :tags="article.tags"
        @change="changeArticle"
      />
    </v-row>
    <v-row v-else>
      <h3>Не найдено</h3>
    </v-row>
    <article-form :is-visible.sync="articleForm" :data="articleFormData" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ArticleCard from '@/components/ArticleCard'
import ArticleForm from '@/components/ArticleForm'

export default {
  components: { ArticleCard, ArticleForm },
  data() {
    return {
      selectedTags: [0],
      search: '',
      articleForm: false,
      articleFormData: undefined
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.list
    }),
    ...mapGetters({
      tagList: 'getTagList'
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
  },
  methods: {
    createArticle() {
      this.articleForm = true
      this.articleFormData = undefined
    },
    changeArticle(id) {
      this.articleForm = true
      this.articleFormData = this.articleList.find(
        (article) => article.id === id
      )
    },
    allTagHandler() {
      this.selectedTags.splice(0, this.selectedTags.length)
    },
    tagHandler() {
      const allTagIndex = this.selectedTags.findIndex((tag) => tag === 0)
      if (allTagIndex != -1) {
        this.selectedTags.splice(allTagIndex, 1)
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
