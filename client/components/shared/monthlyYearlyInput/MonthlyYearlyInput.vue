<template>
  <div style="margin-bottom: 25px">
    <label class="bold-label">Monthly Price (in cents, meaning:
      {{ value.monthlyPrice / 100 }} Euros)</label>
    <b-form-input
      type="number"
      :value="value.monthlyPrice"
      @input="onMonthlyChange"
      style="margin-bottom: 15px"
    />
    <label class="bold-label">Yearly Price (in cents, meaning: {{ value.yearlyPrice / 100 }} Euros and
      {{ value.yearlyPrice / 1200 }} Euros per month)</label>
    <b-form-input
      type="number"
      :value="value.yearlyPrice"
      @input="onYearlyChange"
    />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";
import { Prop } from "vue-property-decorator";
import { MonthlyYearlyValue } from "./models";
import { ReactivityUtils } from "~/utils/ReactivityUtils";

@Component({})
export default class MonthlyYearlyInput extends mixins(TypedStoreMixin) {
  @Prop({ required: true })
  public value!: MonthlyYearlyValue;

  private getCopy() {
    return ReactivityUtils.getUnReactified(this.value);
  }

  onMonthlyChange(val: string) {
    const copy = this.getCopy();

    copy.monthlyPrice = parseInt(val);

    this.$emit("input", copy);
  }

  onYearlyChange(val: string) {
    const copy = this.getCopy();

    copy.yearlyPrice = parseInt(val);

    this.$emit("input", copy);
  }
}
</script>

<style lang="scss" scoped></style>
