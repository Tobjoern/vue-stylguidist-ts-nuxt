<template>
  <div>
    <notifications group="default" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";

// This component should be included, in every page!
// In it are things, like: notifications, the file manager etc.
@Component({
  components: {},
})
export default class GlobalPortals extends mixins(TypedStoreMixin) {}
</script>

 <style lang="scss" scoped>
</style>
