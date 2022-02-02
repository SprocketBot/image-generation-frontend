<script lang="ts">
    import { page } from "$app/stores";
</script>

<header>
    <img src="/img/Sprocket_Logo.png" alt="Sprocket Logo" />
    <h1>Image Generation Utility</h1>
    <nav>
        <a href="/" class:current={$page.path === "/"}>
            Create Template
        </a>
        <a href="/generate" class:current={$page.path === "/generate"}>
            Generate Image
        </a>
    </nav>
</header>

<style lang="postcss">
    header {
        @apply px-4 py-2;
    }
    header img {
        @apply w-2/3 m-auto;
    }
    header h1 {
        @apply text-3xl font-bold text-center mt-2;
    }
    header nav {
        @apply text-xl mt-2 border-b-2 border-solid border-primary-500 pb-2 flex items-center justify-center;
    }
    header nav a {
        @apply ml-2 text-primary-500 hover:text-primary-300;
    }
    a.current {
        @apply border-b-2 border-primary-500 hover:text-primary-500 cursor-default pointer-events-none;
    }
</style>
