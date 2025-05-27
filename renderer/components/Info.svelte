<script lang="ts">
    let { metadata }: { metadata: Metadata } = $props();
    const date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
    }).format(metadata.takenAt);
</script>

<a href="/">
    <div id="background">
        <h3>{date}, Ottawa</h3>
        <p>{metadata.camera.make} {metadata.camera.model}</p>
    </div>
</a>

<style>
    #background {
        display:flex;
        flex-direction: column;
        gap: .5rem;
        padding: 1rem 1.5rem;
        border-radius: .75rem;
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        z-index: 1;
        color: white;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(18px) saturate(180%);
        border: .0625rem solid rgba(209, 213, 219, 0.3);
    }
</style>
