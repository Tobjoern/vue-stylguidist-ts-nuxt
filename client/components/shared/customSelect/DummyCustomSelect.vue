<template>
  <button class="dummy-select-wrapper">
    <CustomSelect :items="options" :value="val"></CustomSelect>
    <div class="dummy-select-overlay"></div>
  </button>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";
import CustomSelect from "./CustomSelect.vue";
import { Prop } from "vue-property-decorator";
import { CustomSelectItem } from "./CustomSelectItem";

// A select component, which only shows the value passed in via props
// On click no select is actually opened, but the click event is emitted
@Component({
  components: {
    CustomSelect,
  },
})
export default class DummyCustomSelect extends mixins(TypedStoreMixin) {
  @Prop({ required: true })
  public title!: string;

  val = "dummy-value";

  get options(): CustomSelectItem[] {
    return [
      {
        title: this.title,
        value: this.val,
      },
    ];
  }
}
</script>

 <style lang="scss" scoped>
.dummy-select-wrapper {
  position: relative;
  display: block;
  padding: 0;
  border: none !important;
  background-color: transparent !important;
  width: 100%;

  .dummy-select-overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
