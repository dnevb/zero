<script lang="ts">
  import BottomBar from './bottom-navbar.svelte'
</script>

<div class='flex flex-col h-screen overflow-hidden'>
  <main class='flex-1'>
    <slot />
  </main>
  <BottomBar />
</div>
