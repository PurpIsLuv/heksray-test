<template>
  <v-dialog v-model="currentValue" width="400px">
    <v-card>
      <v-card-title>Статья</v-card-title>
      <v-card-text>
        <v-text-field label="Название" v-model="currentTitle" />
        <v-textarea
          label="Текст"
          v-model="currentText"
          no-resize
          auto-grow
          rows="1"
        />
        <v-combobox label="Тэги" v-model="currentTags" multiple chips />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveHandler">Сохранить</v-btn>
        <v-btn v-if="isEdit" color="error" @click="currentValue = false">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentValue: false,
      currentTitle: '',
      currentText: '',
      currentTags: []
    }
  },
  watch: {
    currentValue(v) {
      this.$emit('update:isVisible', v)
    },
    isVisible(v) {
      this.currentValue = v

      if (v && this.isEdit) {
        this.currentTitle = this.data?.title || ''
        this.currentText = this.data?.text || ''
        this.currentTags = JSON.parse(JSON.stringify(this.data?.tags)) || []
      } else {
        this.removeFormData()
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.data?.id
    }
  },
  methods: {
    ...mapMutations({
      addArticle: 'ADD_ARTICLE',
      changeArticle: 'CHANGE_ARTICLE'
    }),
    saveHandler() {
      if (this.isEdit) {
        this.changeArticle({
          id: this.data.id,
          title: this.currentTitle,
          text: this.currentText,
          tags: JSON.parse(JSON.stringify(this.currentTags))
        })
      } else {
        this.addArticle({
          title: this.currentTitle,
          text: this.currentText,
          tags: JSON.parse(JSON.stringify(this.currentTags))
        })
      }
      this.currentValue = false
    },
    removeFormData() {
      this.currentTitle = ''
      this.currentText = ''
      this.currentTags = []
    }
  }
}
</script>
