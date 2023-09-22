<template>
  <div style="width: 100%; height: 100%">
    <nuxt />
    <GlobalPortals></GlobalPortals>
  </div>
</template>

<script>
import Component, { mixins } from "nuxt-class-component";
import TypedStoreMixin from "~/mixins/typed-store";
import { Watch } from "nuxt-property-decorator";
import GlobalPortals from "../components/Common/GlobalPortals.vue";

@Component({
  components: {
    GlobalPortals
  }
})
export default class EmptyLayout extends mixins(TypedStoreMixin) {

}
</script>

<style lang="scss">

</style>
