<script lang="ts">
    import { Router, Route } from 'svelte-tiny-router';
    import Settings from './pages/Settings.svelte'
    import Frame from './pages/Frame.svelte'
</script>

<main>
    <Router>
        <Route path="/" component={Settings} />
        <Route path="/frame" component={Frame} />
    </Router>
</main>

<style>
    main {
        position: fixed;
        inset: 0;
        background: white;
        clip-path: inset(0 round 1rem);
    }
</style>
