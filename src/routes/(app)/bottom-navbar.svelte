<script lang="ts">
  import TablerBuildingBank from "~icons/tabler/building-bank";
  import TablerPlus from "~icons/tabler/plus";
  import TablerMenuDeep from "~icons/tabler/menu-deep";
  import TablerChartDonutFilled from "~icons/tabler/chart-donut-filled";
  import TablerPigFilled from "~icons/tabler/pig-filled";
</script>

<div id="bottom-bar" class="root">
  <div class="content">
    <a href="/home" class="item group">
      <TablerBuildingBank />
    </a>
    <a href="/budget" class="item group">
      <TablerPigFilled />
    </a>
    <button class="item group">
      <TablerPlus />
    </button>
    <a href="/charts" class="item group">
      <TablerChartDonutFilled />
    </a>
    <a href="/menu" class="item group">
      <TablerMenuDeep />
    </a>
  </div>
</div>

<style lang="postcss">
  @reference '../../app.css';
  .root {
    @apply w-full bg-white;
    @apply dark:bg-primary/5;
  }
  .content {
    @apply grid h-full max-w-lg grid-cols-5 mx-auto;
  }
  .item {
    @apply inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50;
    @apply dark:hover:bg-gray-800;
  }
  :global(#bottom-bar .item svg) {
    @apply size-6 text-gray-500 group-hover:text-primary;
    @apply dark:text-gray-400 dark:group-hover:text-primary;
  }
</style>
