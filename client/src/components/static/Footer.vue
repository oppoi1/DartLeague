<template>
  <v-footer height="auto" color="teal darken-3">
    <v-card class="flex" flat tile>
      <v-card-title class="teal darken-3">
        <strong class="subheading white--text">
          Visit us on social networks!
        </strong>
        <v-spacer></v-spacer>
        <p class="white--text"> Todo: Add Icons </p>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
          <v-icon size="24px"> {{ icon }} </v-icon>
        </v-btn>

      </v-card-title>
      <v-card-actions class="grey darken-3 justify-center white--text">
        &copy;2019 - <strong> Wannemueller </strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
 data () {
   return {
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
   }
 }
}
</script>

<style scoped>

</style>
