/* global KEEP */

KEEP.initModeToggle = () => {
  KEEP.utils.modeToggle = {
    themeModeToggleBtn: document.querySelector('.tool-toggle-theme-mode'),
    iconDom: document.querySelector('.tool-toggle-theme-mode i'),

    enableLightMode() {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
      this.iconDom.className = 'fas fa-moon'
      KEEP.themeInfo.styleStatus.isDark = false
      KEEP.themeInfo.styleStatus.isAutoTheme = this.isAutoTheme()
      KEEP.setStyleStatus()
    },

    enableDarkMode() {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
      this.iconDom.className = 'fas fa-sun'
      KEEP.themeInfo.styleStatus.isDark = true
      KEEP.themeInfo.styleStatus.isAutoTheme = this.isAutoTheme()
      KEEP.setStyleStatus()
    },

    isDarkPrefersColorScheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    isAutoTheme() {
      return KEEP.themeInfo.styleStatus.isDark === this.isDarkPrefersColorScheme()
    },

    initModeStatus() {
      const styleStatus = KEEP.getStyleStatus()

      if (styleStatus && !styleStatus.isAutoTheme) {
        styleStatus.isDark ? this.enableDarkMode() : this.enableLightMode()
      } else {
        this.isDarkPrefersColorScheme() ? this.enableDarkMode() : this.enableLightMode()
      }
    },

    initModeToggleButton() {
      this.themeModeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark-mode')
        isDark ? this.enableLightMode() : this.enableDarkMode()
      })
    },

    initModeAutoTrigger() {
      if(window.matchMedia){ //guard
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          e.matches ? this.enableDarkMode() : this.enableLightMode()
        })
      }
    }
  }

  KEEP.utils.modeToggle.initModeStatus()
  KEEP.utils.modeToggle.initModeToggleButton()
  KEEP.utils.modeToggle.initModeAutoTrigger()
}
