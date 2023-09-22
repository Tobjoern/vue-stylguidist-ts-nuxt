<template>
  <nuxt />
</template>

<script>
import Component, { mixins } from "nuxt-class-component";
import TypedStoreMixin from "~/mixins/typed-store";
import { Watch } from "nuxt-property-decorator";

@Component
export default class EmptyLayout extends mixins(TypedStoreMixin) {

}
</script>

<style lang="scss">

</style>
