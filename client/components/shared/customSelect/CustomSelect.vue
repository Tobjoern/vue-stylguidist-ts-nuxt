<template>
  <b-dropdown
    class="custom-dropdown-select"
    :class="{ 'custom-dropdown-select--full-width': isFullWidth }"
    :text="innerText"
    :no-caret="true"
    :block="true"
    :toggle-class="'custom-select'"
    :variant="'default'"
    :disabled="isDisabled"
  >
    <div class="select-search-holder">
      <SearchInput
        v-if="isSearchable"
        @search="onSearch"
        :searchOnKeyup="true"
      ></SearchInput>
    </div>
    <perfect-scrollbar class="custom-select-scrollbar">
      <template v-if="!isMultiSelect">
        <template v-for="(item, index) of filteredItems">
          <b-dropdown-item
            v-if="!item.isHeader"
            :key="index"
            :active="item.value === innerValue"
            @click="onSelect(item)"
          >
            {{ item.title }}
          </b-dropdown-item>
          <b-dropdown-header v-else :key="index">{{
            item.title
          }}</b-dropdown-header>
        </template>
      </template>
      <template v-else>
        <!-- Based on this: https://github.com/bootstrap-vue/bootstrap-vue/issues/1628 -->
        <b-form-checkbox-group
          stacked
          :checked="innerMultiValue"
          name="options"
          :options="multiOptions"
          class="cb-group"
          @change="onInputMultiVal"
        />
      </template>
    </perfect-scrollbar>
  </b-dropdown>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";
import { Prop, Watch } from "vue-property-decorator";
import { CustomSelectItem } from "./CustomSelectItem";
import { ReactivityUtils } from "~/utils/ReactivityUtils";
import SearchInput from "../searchInput/SearchInput.vue";
import { SeachInputSearchEvent } from "../searchInput/models";

@Component({
  components: {
    SearchInput,
  },
})
export default class CustomSelect extends mixins(TypedStoreMixin) {
  @Prop({ required: true })
  public items!: CustomSelectItem[];

  @Prop({ required: true })
  public value!: string;

  @Prop({ required: false, default: () => [] })
  public multiValue!: string[];

  @Prop({ required: false, default: false })
  public isMultiSelect!: boolean;

  @Prop({ required: false, default: false })
  public isDisabled!: boolean;

  @Prop({ required: false, default: false })
  public isSearchable!: boolean;

  @Prop({ required: false, default: false })
  public isFullWidth!: boolean;

  innerValue = this.value;

  innerMultiValue: string[] = [] as any;

  innerText = "";

  searchValue = "";

  get filteredItems() {
    const searchValue = this.searchValue.toLowerCase();

    if (searchValue.length < 1) {
      return this.items;
    } else {
      return this.items.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
      );
    }
  }

  get multiOptions() {
    const options: { text: string, value: string }[] = [];

    const searchValue = this.searchValue.toLowerCase();

    this.items.forEach((item) => {
      if (!item.isHeader) {
        if (
          searchValue.length < 1 ||
          item.title.toLowerCase().includes(searchValue)
        ) {
          options.push({
            text: item.title,
            value: item.value,
          });
        }
      }
    });

    return options;
  }

  onSearch(event: SeachInputSearchEvent) {
    this.searchValue = event.query;
  }

  @Watch("value", { immediate: true })
  onValueChange(val: string) {
    this.innerValue = val;
  }

  @Watch("multiValue", { immediate: true, deep: true })
  onMutliValueChange(val: string[]) {
    this.innerMultiValue = ReactivityUtils.getUnReactified(val);
  }

  @Watch("items", { immediate: false, deep: true })
  onItemsChange() {
    this.updateInnerText();
  }

  @Watch("innerValue", { immediate: true })
  onInnerValueChange(val: string) {
    this.updateInnerText();
  }

  @Watch("innerMultiValue", { immediate: false, deep: true })
  onInnerMultiValueChange() {
    this.updateInnerText();
  }

  onInputMultiVal(val: string[]) {
    // when nothing is selected, the value is [null]
    if (!val || val[0] == null) {
      val = [];
    }

    const setTo = ReactivityUtils.getUnReactified(val);

    this.innerMultiValue = ReactivityUtils.getUnReactified(val);

    setTimeout(() => {
      const items = this.items.filter((item) => setTo.includes(item.value));

      // this timeout is needed, because of weird bootstrap behaviour
      this.innerMultiValue = setTo;

      this.$emit("multiSelect", ReactivityUtils.getUnReactified(items));
    });
  }

  private updateInnerText() {
    if (!this.isMultiSelect) {
      const item = this.items.find((item) => item.value === this.innerValue);

      if (item) {
        this.innerText = item.title;
      } else {
        this.innerText = "-";
      }
    } else {
      const text = this.items
        .filter((item) => this.innerMultiValue.includes(item.value))
        .map((item) => item.title)
        .join(", ");

      this.innerText = text ? text : "-";
    }
  }

  onSelect(item: CustomSelectItem) {
    if (!this.isMultiSelect) {
      this.innerValue = item.value;
      this.$emit("select", ReactivityUtils.getUnReactified(item));
    }
  }
}
</script>

 <style lang="scss" scoped>
/deep/ {
  .custom-control-label,
  .custom-control-input {
    cursor: pointer;
  }
}

.custom-select-scrollbar {
  max-height: 250px;
}

.select-search-holder {
  padding: 0px 12px;
}

.cb-group {
  padding: 12px 12px;
}
</style>
