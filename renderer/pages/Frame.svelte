<script lang="ts">
    import { onMount } from 'svelte';
    import Info from '../components/Info.svelte';

    const images = [
        'IMG_0187',
        'IMG_0382',
        'IMG_0412',
        'IMG_0427',
        'IMG_2456',
    ]

    let pool: string[] = [];
    const getRandom = () => {
        if (pool.length === 0) pool = [...images]; 
        const index = Math.floor(Math.random() * pool.length);
        const selected = pool.splice(index, 1)[0];
        return `/${selected}.avif`;
    }

    const load = async (url: string) => {
        const image = new Image();
        image.src = url;
        try {
            await image.decode();
        } catch {
            console.error(`Failed to load image: ${url}`);
            load(url);
        };
    }

    let cancelled = false;
    let front = getRandom();
    let back = '';
    let showFront = true;

    const loop = async () => {
        while (!cancelled) {
            const next = getRandom();
            showFront ? back = next : front = next;

            await Promise.all([
                load(next),
                new Promise(resolve => setTimeout(resolve, 3000))
            ]);
            showFront = !showFront;
        };
    }

    onMount(() => {
        const init = async () => {
            await load(front);
            loop();
        };
        init();

        return () => cancelled = true;
    });

    const metadata = {
        takenAt: new Date('2024-05-12T10:30:00Z'),
        location: {
            latitude: 37.7749,
            longitude: -122.4194
        },
        camera: {
            make: 'Apple',
            model: 'iPhone 16 Pro',
        }
    };
</script>

<Info metadata={metadata}/>
<div style="background-image: url({front}); opacity: {showFront ? 1 : 0}" class="frame"></div>
<div style="background-image: url({back}); opacity: {showFront ? 0 : 1}" class="frame"></div>

<style>
    .frame {
        position: fixed;
        inset: 0;
        background-size: cover;
    }
</style>
