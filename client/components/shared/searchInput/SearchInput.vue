<template>
  <div class="search-input">
    <i class="search-icon fal fa-search"></i>
    <b-form-input
      type="text"
      placeholder="Find..."
      v-model="searchTerm"
      @input="onInput"
      @keyup.enter.native="onSearch"
      @blur="onBlur"
      @focus="onFocus"
      class="search-input-input"
    ></b-form-input>
    <!-- TOOPT: Here include a CustomSelect -->
    <b-dropdown
      v-if="categories.length > 0"
      text="Dropdown"
      class="category-select"
      variant="default"
    >
      <template v-slot:button-content>
        <span
          class="category-selected-text"
          :class="{ 'category-selected-text--focussed': isFocussed }"
          >{{ selectedCategoryName }}</span>
        <span class="fal fa-angle-down category-selected-caret"></span>
      </template>
      <perfect-scrollbar class="category-scrollbar">
        <b-dropdown-item
          v-for="cat of categories"
          :key="cat.value"
          @click="onCategorySelect(cat)"
          :active="selectedCategory === cat.value"
          >{{ cat.text }}</b-dropdown-item>
      </perfect-scrollbar>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";
import { Prop, Watch } from "vue-property-decorator";
import { SeachInputSearchEvent, SearchInputCategory } from "./models";

@Component({})
export default class SearchInput extends mixins(TypedStoreMixin) {
  @Prop({ required: false, default: () => [] })
  public categories!: SearchInputCategory[];

  @Prop({ required: false, default: null })
  public selectedCategory!: string | null;

  @Prop({ required: false, default: null })
  public initialValue!: string;

  @Prop({ required: false, default: false })
  public searchOnKeyup!: boolean;

  activeSelectedCategory: string | null = null;

  selectedCategoryName: string | null = null;

  searchTerm = "";

  isFocussed = false;

  @Watch("selectedCategory", { immediate: true, deep: false })
  onChangeSelectedCategory(val: string | null) {
    this.activeSelectedCategory = val;
    this.updateSelectedCatName();
  }

  created() {
    if (this.initialValue) {
      this.searchTerm = this.initialValue;
    }
  }

  onInput() {
    if (this.searchOnKeyup) {
      this.emitSearchEvent();
    }
  }

  onSearch() {
    this.emitSearchEvent();
  }

  onBlur() {
    this.emitSearchEvent();
    this.isFocussed = false;
  }

  onCategorySelect(cat: SearchInputCategory) {
    this.activeSelectedCategory = cat.value;
    this.updateSelectedCatName();
    this.emitSearchEvent();
  }

  private emitSearchEvent() {
    const event: SeachInputSearchEvent = {
      query: this.searchTerm,
      category: this.activeSelectedCategory,
    };

    this.$emit("search", event);
  }

  private updateSelectedCatName() {
    const selectedCat = this.categories.find(
      (cat) => cat.value === this.activeSelectedCategory
    );

    this.selectedCategoryName = selectedCat ? selectedCat.text : null;
  }

  onFocus() {
    this.isFocussed = true;
  }
}
</script>

 <style lang="scss" scoped>
.search-input {
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;

  .search-icon {
    position: absolute;
    font-size: 14px;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
  }

  .search-input-input {
    border: none !important;
    padding-left: 40px;
    color: #555;
    box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.1) !important;
  }
}

/deep/ {
  .dropdown-toggle {
    background-color: transparent;
    border-color: transparent !important;
    box-shadow: none !important;

    &:focus {
      background-color: transparent;
    }

    &:hover {
      background-color: #f9f9f9;
    }

    &::after {
      display: none !important;
    }
  }

  .dropdown.show {
    .dropdown-toggle {
      background-color: #f9f9f9;
    }
  }

  .category-selected-text {
    transition: width 0.3s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    color: #444;
    width: 100px;

    &.category-selected-text--focussed {
      width: 60px;
    }
  }

  .category-selected-caret {
    margin-left: 7px;
    color: #555;
  }
}

.category-scrollbar {
  max-height: 250px;
}
</style>
