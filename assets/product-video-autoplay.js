const startProductVideos = () => {
  document.querySelectorAll('media-gallery').forEach((gallery) => {
    const activeItem = gallery.querySelector('.product__media-item.is-active')
    const deferred = activeItem && activeItem.querySelector('deferred-media')
    if (deferred && typeof deferred.loadContent === 'function') deferred.loadContent(false)
  })
}

const bindVideoGallery = () => {
  document.querySelectorAll('.ou-video-gallery').forEach((button) => {
    if (button.dataset.bound === 'true') return
    button.dataset.bound = 'true'
    button.addEventListener('click', () => {
      const gallery = button.closest('media-gallery')
      const target = button.dataset.mediaTarget
      if (gallery && typeof gallery.setActiveMedia === 'function' && target) {
        gallery.setActiveMedia(target, false)
      }
    })
  })
}

const bootProductVideo = () => {
  customElements.whenDefined('media-gallery').then(() => {
    customElements.whenDefined('deferred-media').then(() => {
      startProductVideos()
      bindVideoGallery()
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootProductVideo)
} else {
  bootProductVideo()
}

document.addEventListener('shopify:section:load', bootProductVideo)
