<template>
  <vueJsonEditor :value="editingValue" @input="onInput"></vueJsonEditor>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";
import { Prop, Watch } from "vue-property-decorator";
const vueJsonEditor = require("vue-json-editor").default;

@Component({
  components: {
    vueJsonEditor
  }
})
export default class JsonEditor extends mixins(TypedStoreMixin) {
  @Prop({ required: true })
  public value!: any;

  editingValue = null;

  editingValueMirror = null

  @Watch("value", { deep: true, immediate: true })
  onValueChange(val: any) {
    const editingValueJson = this.editingValueMirror

    if (editingValueJson !== null) {
      const editingValueString = JSON.stringify(editingValueJson);

      const valString = JSON.stringify(val);

      if (editingValueString !== valString) {
        this.editingValue = val
        this.editingValueMirror = val
      }
    } else {
      this.editingValue = val
      this.editingValueMirror = val
    }
  }

  onInput(val: any) {
    this.editingValueMirror = val

    this.$emit('input', val)
  }
}
</script>

 <style lang="scss" scoped>
</style>
