<template>
  <div class="index">
    <v-row>
      <v-text-field placeholder="Поиск" outlined clearable></v-text-field>
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
      <v-card v-for="card in cards" :key="card.id" width="400px" class="ma-1">
        <v-card-title>{{ card.title }}</v-card-title>
        <v-card-subtitle class="px-2">
          <v-chip v-for="(tag, index) in card.tags" :key="index" class="ma-1">
            {{ tag }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text>{{ card.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">В топ</v-btn>
          <v-btn color="error">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTags: [],
      tags: ['All', 'top', 'new', 'funny'],
      cards: [
        {
          id: 1,
          title: 'Title',
          tags: ['All', 'top'],
          text: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.'
        },
        {
          id: 2,
          title: 'Title',
          tags: ['All', 'top'],
          text: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.'
        },
        {
          id: 3,
          title: 'Title',
          tags: ['All', 'top'],
          text: 'Greyhound divisively hello coldly wonderfully marginally far upon excluding.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.index {
  padding: 20px 0;
}
</style>
