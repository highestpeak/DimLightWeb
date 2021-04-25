<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/">DimLight</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- left nav items -->
        <b-navbar-nav>
          <template v-for="(menuItem, index) in menu">
            <b-nav-item
              :key="index"
              v-if="menuItem.hasOwnProperty('subMenu') === false"
              :to="menuItem.to"
              :active="menuItem.active"
              @click="handleMenuClick(menuItem, null)"
            >
              {{ menuItem.text }}
            </b-nav-item>

            <!-- contains submenu -->
            <b-nav-item-dropdown
              v-else
              :key="index"
              :text="menuItem.text"
              :class="menuItem.active?'show':''"
              right
            >
              <b-dropdown-item
                v-for="(subMenuItem, subIndex) in menuItem.subMenu"
                :key="subIndex"
                :to="subMenuItem.to"
                :active="subMenuItem.active"
                @click="handleMenuClick(subMenuItem, menuItem)"
              >
                {{ subMenuItem.text }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
        <!-- left nav items -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> </b-navbar-nav
        ><!-- Right aligned nav items -->
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "MyNavbar",
  data() {
    return {
      menu: [
        {
          text: "Feed",
          active: true,
          subMenu: [
            { to: "/feed/list", text: "Feeds", active: true },
            { to: "/feed/new", text: "New Feed", active: false },
            { to: "/feed/tag", text: "Tag", active: false },
            // { to: "/feed/diagram", text: "View Diagram", active: false },
          ],
        },
        { to: "/feed/topic", text: "Topic", active: false },
        {
          text: "Task",
          active: false,
          subMenu: [
            { to: "/task/list", text: "Tasks", active: false },
            { to: "/task/new", text: "New Task", active: false },
            // { to: "/task/scenario", text: "Scenario", active: false },
            { to: "/task/diagram", text: "View Diagram", active: false },
          ],
        },
        // { to: "/task", text: "Task", active: false },
        { to: "/event", text: "Events", active: false },
        { to: "/test", text: "Test", active: false },
        // { to: "/readable", text: "Readable", active: false },
      ],
      currActiveMenuItem: null,
      currActiveRootMenu: null,
    };
  },
  created() {
    this.currActiveMenuItem = this.menu[0];
    this.currActiveRootMenu = this.menu[0].subMenu[0];
  },
  methods: {
    handleMenuClick: function (nextMenuItem, rootMenuItem) {
      // todo: 处理 task 和 process
      if(this.currActiveMenuItem===nextMenuItem){
        return
      }

      nextMenuItem.active = true;
      this.currActiveMenuItem.active = false;
      this.currActiveMenuItem = nextMenuItem;

      if(this.currActiveRootMenu!==null){
        this.currActiveRootMenu.active=false
        this.currActiveRootMenu=null
      }

      if (rootMenuItem !== null) {
        rootMenuItem.active = true;
        this.currActiveRootMenu = rootMenuItem
      }
    },
  },
};
</script>

<style>
</style>