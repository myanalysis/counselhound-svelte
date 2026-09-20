<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let { lat, lon, label }: { lat: number; lon: number; label: string } = $props();

  let mapEl: HTMLDivElement;
  let map: any;
  let marker: any;

  onMount(async () => {
    const L = (await import('leaflet')).default;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false }).setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    marker = L.marker([lat, lon]).addTo(map).bindPopup(label).openPopup();
  });

  $effect(() => {
    if (map && marker) {
      map.setView([lat, lon], 15);
      marker.setLatLng([lat, lon]);
      marker.setPopupContent(label);
      marker.openPopup();
    }
  });

  onDestroy(() => { if (map) map.remove(); });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
</svelte:head>

<div bind:this={mapEl} style="height:100%;width:100%;"></div>
