export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral',
    },
    navigationMenu: {
      slots: {
        linkLabelExternalIcon: '-rotate-90 translate-y-1 ms-1'
      }
    },
    dropdownMenu: {
      slots: {
        itemLabelExternalIcon: '-rotate-90 translate-y-1 ms-1',
      }
    }
  },
})
