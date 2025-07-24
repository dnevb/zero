<script lang="ts">
  import TablerBuildingBank from "~icons/tabler/building-bank";
  import TablerPlus from "~icons/tabler/plus";
  import TablerMenuDeep from "~icons/tabler/menu-deep";
  import TablerClipboardListFilled from "~icons/tabler/clipboard-list-filled";
  import TablerPigFilled from "~icons/tabler/pig-filled";
  import { Button, buttonVariants } from "$lib/components/ui/button";

  const itemStyles = buttonVariants({
    variant: "ghost",
    class: "flex-col gap-1 h-auto",
  });
</script>

<nav class="flex gap-4 justify-center items-center bg-primary/5 p-2">
  <a class={itemStyles} href="/home">
    <TablerBuildingBank />
    <p>Home</p>
  </a>
  <a class={itemStyles} href="/records">
    <TablerMenuDeep />
    <p>Records</p>
  </a>
  <Button size='icon' class='rounded-full'>
    <TablerPlus />
  </Button>
  <a class={itemStyles} href="/budgets">
    <TablerPigFilled />
    <p>Budget</p>
  </a>
  <a class={itemStyles} href="/menu">
    <TablerClipboardListFilled />
    <p>Menu</p>
  </a>
</nav>
