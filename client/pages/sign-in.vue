<template>
  <div class="page-holder">
    <h2>Hello World!</h2>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";

@Component({
  layout: "empty-with-globals",
})
export default class SignInPage extends mixins(TypedStoreMixin) {
  processing = false;

  staySignedIn = false;

  loginErrorMessage: string | null = null;

  submit() {
    this.processing = true;
  }
}
</script>

 <style lang="scss" scoped>
</style>
