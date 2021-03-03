<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamation, faSpinnerThird } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { camelCase } from 'lodash';

library.add(faExclamation, faSpinnerThird);

export default {
  name: 'FontAwesomeDynamicIcon',
  props: FontAwesomeIcon.props,
  data() {
    return {
      fetched: null,
      fetchedIcon: null,
      iconTypes: {
        fas: 'solid',
        far: 'regular',
        fal: 'light',
      },
    };
  },
  computed: {
    iconDefinition() {
      if (this.fetchedIcon) {
        return this.fetchedIcon;
      }

      if (library.definitions[this.iconPrefix] && library.definitions[this.iconPrefix][this.iconName]) {
        return {
          icon: library.definitions[this.iconPrefix][this.iconName],
          iconName: this.iconName,
          prefix: this.iconPrefix,
        };
      }

      return null;
    },
    iconFileName() {
      return camelCase(`fa-${this.iconName}`);
    },
    iconName() {
      return Array.isArray(this.icon) ? this.icon[1] : this.icon;
    },
    iconPrefix() {
      return Array.isArray(this.icon) ? this.icon[0] : 'fas';
    },
    iconType() {
      return this.iconTypes[this.iconPrefix];
    },
  },
  methods: {
    fetchIcon() {
      this.fetched = false;
      return import(/* webpackChunkName: "fonts/[request]" */
      `@fortawesome/free-${this.iconType}-svg-icons/${this.iconFileName}.js`)
        .then((response) => {
          this.fetched = true;

          if (response && response.definition) {
            this.fetchedIcon = response.definition;
            library.add(response.definition);
          }
        })
        .catch(() => {
          this.fetched = true;
        });
    },
  },
  created() {
    if (!this.iconDefinition) {
      this.fetchIcon();
    }
  },
  watch: {
    icon() {
      if (!this.iconDefinition) {
        this.fetchIcon();
      }
    },
  },
  render() {
    if (!this.iconDefinition) {
      if (!this.fetched) {
        return this.$createElement(FontAwesomeIcon, {
          props: {
            spin: true,
            icon: faSpinnerThird,
          },
        });
      }

      return this.$createElement(FontAwesomeIcon, {
        props: {
          icon: faExclamation,
        },
      });
    }

    return this.$createElement(FontAwesomeIcon, {
      props: {
        ...this.$options.propsData,
        icon: this.iconDefinition,
      },
    });
  },
};
</script>