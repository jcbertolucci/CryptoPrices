<template>
  <v-alert outline color="error" icon="warning" error dismissible @input="onClose" :value="true">
    {{text}}
  </v-alert>
</template>

<script>
  export default {
    props:[
      'text'
    ],
    methods: {
      onClose() {
        this.$emit('dismissed')
      }
    },
    created(){
    }

  }
</script>
