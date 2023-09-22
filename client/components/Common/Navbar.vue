<template>
  <b-navbar type="dark">
    <b-navbar-brand :to="'/admin'">Admin Area</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="user-dropdown">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>{{ userName }}</template>
          <b-dropdown-item :to="'/logout'">
            <i class="fal fa-sign-out dropdown-item-icon"></i>Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component";

import TypedStoreMixin from "~/mixins/typed-store";

@Component({})
export default class Navbar extends mixins(TypedStoreMixin) {
  get user() {
    return this.typedStore.user.currentUser;
  }

  get userName() {
    return this.user.fullName;
  }

  requestGoBack() {
    this.$router.go(-1);
  }
}
</script>

 <style lang="scss" scoped>
.navbar {
  z-index: 999;
  // background-image: radial-gradient(
  //   circle farthest-corner at 10% 20%,
  //   rgb(17, 215, 232) 0%,
  //   rgba(152, 70, 242, 1) 100.2%
  // ) !important;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    #3797e8 0%,
    #9846f2 100.2%
  ) !important;
  // box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.2) !important;
  box-shadow: none !important;

  /deep/ {
    .nav-link {
      color: #fff !important;

      &:hover {
        color: #fff !important;
      }
    }

    .user-dropdown .nav-link {
      font-size: 15px;
    }

    .main-links {
      .nav-link {
        transition: background-color 0.4s;
        // background-color: red;
        margin-right: 5px;
        padding: 8px 10px;
        border-radius: 6px;
        font-weight: 600;
        display: flex;
        align-items: center;

        i {
          margin-right: 7px;
          font-size: 15px;
        }

        &.nuxt-link-active,
        &[aria-expanded="true"] {
          background-color: rgba(17, 23, 29, 0.07);
        }

        &:hover {
          background-color: rgba(17, 23, 29, 0.1);
        }

        &:active {
          background-color: rgba(17, 23, 29, 0.15);
        }
      }
    }
  }
}
</style>
